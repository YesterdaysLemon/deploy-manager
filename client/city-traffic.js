import * as THREE from "three";
export const SIGNAL_JUNCTION=Object.freeze({x:-6.97,z:-6.97});
const JUNCTIONS=[-6.97,0,6.97].flatMap(x=>[-6.97,0,6.97].map(z=>({x,z,key:`${x}:${z}`})));

// Fixed geographic offsets survive rebuilding and topology polling. Adjacent
// streets advance by different amounts instead of switching the whole town.
export function signalOffset(junction) {
  return ((Math.round(junction.x/6.97)*5+Math.round(junction.z/6.97)*7)%18+18)%18;
}

export function signalPhase(time, junction = null) {
  const localTime=time+(junction?signalOffset(junction):0);
  const phase = ((localTime % 18) + 18) % 18;
  if (phase < 6) return {x:"green",z:"red"};
  if (phase < 8) return {x:"amber",z:"red"};
  if (phase < 9) return {x:"red",z:"red"};
  if (phase < 15) return {x:"red",z:"green"};
  if (phase < 17) return {x:"red",z:"amber"};
  return {x:"red",z:"red"};
}

export function vehiclePose(item, distance) {
  const length=item.curve.getLength(),progress=item.once ? THREE.MathUtils.clamp(distance/length,0,.999999) : ((distance/length)%1+1)%1;
  const p=item.curve.getPointAt(progress),t=item.curve.getTangentAt(Math.min(.999999,progress));
  if(item.speed<0)t.negate();
  return {x:p.x,z:p.z,dx:t.x,dz:t.z,halfLength:(item.bodyLength??1.5)/2,halfWidth:(item.bodyWidth??.7)/2};
}

export function vehiclesOverlap(a,b,margin=.04) {
  const axes=[[a.dx,a.dz],[-a.dz,a.dx],[b.dx,b.dz],[-b.dz,b.dx]];
  for(const [x,z] of axes) {
    const project=p=>Math.abs(p.dx*x+p.dz*z)*p.halfLength+Math.abs(-p.dz*x+p.dx*z)*p.halfWidth;
    if(Math.abs((a.x-b.x)*x+(a.z-b.z)*z)>=project(a)+project(b)+margin)return false;
  }
  return true;
}

export function laneCurve(centerline, offset=.42) {
  const points=Array.from({length:Math.max(100,Math.ceil(centerline.getLength()*4))},(_,i)=>i);
  const count=points.length;
  return new THREE.CatmullRomCurve3(points.map(i=> {
    const t=i/(count-1),p=centerline.getPointAt(t),v=centerline.getTangentAt(Math.min(t,.999999));
    return p.addScaledVector(new THREE.Vector3(-v.z,0,v.x).normalize(),offset);
  }),false,"centripetal");
}

export function advanceCityTraffic(items, delta, time, obstacles=[], junctions=JUNCTIONS) {
  // Slow frames advance through bounded collision steps instead of slowing
  // traffic to half speed or jumping over a stop line.
  if(delta>.05) {
    const steps=Math.ceil(Math.min(delta,.25)/.05),step=Math.min(delta,.25)/steps;
    for(let i=0;i<steps;i++)advanceCityTraffic(items,step,time-(steps-1-i)*step,obstacles,junctions);
    return;
  }
  const active=[];
  // Spawn into free road space instead of allowing initially overlapping loops.
  for(const item of items) {
    if(item.cityDistance===undefined) {
      const length=item.curve.getLength();
      for(let i=0;i<100;i++) {
        const distance=(item.offset*length+i*length/100)%length,pose=vehiclePose(item,distance);
        if(junctions.every(j=>Math.hypot(pose.x-j.x,pose.z-j.z)>2.3) && active.every(other=>!vehiclesOverlap(pose,vehiclePose(other,other.cityDistance),.12))) {item.cityDistance=distance;break;}
      }
    }
    if(item.cityDistance!==undefined)active.push(item);
  }
  const poses=new Map(active.map(item=>[item,vehiclePose(item,item.cityDistance)]));
  const owners=new Map(),approaches=new Map();
  for(const item of active) {
    const pose=poses.get(item);
    if(item.junction) {
      const distance=Math.hypot(pose.x-item.junction.x,pose.z-item.junction.z);
      if(distance<1.7)item.enteredJunction=true;
      if((item.enteredJunction && distance>2.45) || (!item.enteredJunction && distance>4.2)) {item.junction=null;item.enteredJunction=false;}
      else owners.set(item.junction.key,item);
    }
    const axis=Math.abs(pose.dx)>Math.abs(pose.dz)?"x":"z",cross=axis==="x"?"z":"x",sign=Math.sign(axis==="x"?pose.dx:pose.dz);
    const candidate=junctions.map(j=>({...j,axis,along:(pose[axis]-j[axis])*sign,across:Math.abs(pose[cross]-j[cross])}))
      .filter(j=>j.along<-.9 && j.along>-3.7 && j.across<1.05).sort((a,b)=>b.along-a.along)[0];
    if(candidate)approaches.set(item,candidate);
  }
  // Reserve the whole turn before entering, rather than letting opposing cars
  // meet safely nose-to-nose inside the crossing with no room to finish a turn.
  for(const item of [...active].sort((a,b)=>Number(Boolean(b.once))-Number(Boolean(a.once)))) {
    const approach=approaches.get(item);
    if(!approach || item.junction || owners.has(approach.key))continue;
    const signaled=approach.signaled ?? (approach.x===SIGNAL_JUNCTION.x && approach.z===SIGNAL_JUNCTION.z);
    if(signaled && signalPhase(time,approach)[approach.axis]!=="green")continue;
    item.junction=approach;item.enteredJunction=false;owners.set(approach.key,item);
  }
  for(const item of active) {
    if(item.reverseRemaining>0 && time>(item.recoveryUntil??Infinity)) {item.reverseRemaining=0;item.yieldUntil=time+1;item.blockedSeconds=0;}
    const old=item.cityDistance,pose=poses.get(item);
    const axis=Math.abs(pose.dx)>Math.abs(pose.dz)?"x":"z";
    let step=Math.min(delta,.05)*(item.cruiseSpeed??.9)*Math.sign(item.speed);
    if(item.reverseRemaining>0)step=-Math.sign(item.speed)*Math.min(item.reverseRemaining,Math.min(delta,.05)*.6);
    else if((item.yieldUntil??0)>time)step=0;
    const approach=approaches.get(item);
    if(approach && owners.get(approach.key)!==item && !(item.reverseRemaining>0)) {
      step=Math.sign(step)*Math.min(Math.abs(step),Math.max(0,-2.45-approach.along));
    }
    // A reserved crossing may clear after amber; newcomers wait at the line.
    const signaled=approach && (approach.signaled ?? (approach.x===SIGNAL_JUNCTION.x && approach.z===SIGNAL_JUNCTION.z));
    if(signaled && !item.enteredJunction && !(item.reverseRemaining>0) && signalPhase(time,approach)[axis]!=="green") {
      const gap=Math.max(0,-1.25-approach.along-pose.halfLength);
      step=Math.sign(step)*Math.min(Math.abs(step),gap);
    }
    const proposed=item.once ? Math.min(item.curve.getLength()-.001,old+step) : old+step;
    const blockers=[...obstacles,...active.filter(other=>other!==item).map(other=>poses.get(other))];
    const samples=[.5,1].map(t=>vehiclePose(item,old+(proposed-old)*t));
    const safe=samples.every(sample=>blockers.every(other=>!vehiclesOverlap(sample,other)));
    if(safe){
      item.cityDistance=proposed;poses.set(item,samples[1]);
      if(item.reverseRemaining>0){item.reverseRemaining-=Math.abs(step);if(item.reverseRemaining<.001){item.reverseRemaining=0;item.yieldUntil=time+2;}}
    }
    item.blockedSeconds=!safe ? (item.blockedSeconds??0)+delta : 0;
    item.waiting=!safe || Math.abs(step)<1e-6;
  }
  // Tight depot turns can meet another vehicle nose-to-nose. One ambient
  // vehicle backs into verified free space, then yields; never teleport or
  // disable its collision box to resolve the queue. Deliveries retain priority.
  if(!active.some(item=>item.reverseRemaining>0 || (item.yieldUntil??0)>time)) {
    for(const item of [...active].reverse()) {
      if(item.once || !(item.blockedSeconds>2) || time-(item.lastRecovered??-Infinity)<8)continue;
      const candidate=vehiclePose(item,item.cityDistance-Math.sign(item.speed)*.05);
      if(active.every(other=>other===item || !vehiclesOverlap(candidate,poses.get(other)))) {
        item.reverseRemaining=.9;item.blockedSeconds=0;item.recoveryUntil=time+3;item.lastRecovered=time;break;
      }
    }
  }
}
