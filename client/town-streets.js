// Streets follow the inhabited blocks. Logical service addresses stay fixed;
// unused corners belong to the landscape instead of becoming another grid.
const key = p => `${Math.round(p.x*10000)}:${Math.round(p.z*10000)}`;

// Two-row terraces stagger across the landscape. This is a fixed mapping of
// a logical address, so polling, reordering and new services cannot move it.
export function displayPlotAddress({x,z}) {
  return {x:x+Math.floor((z+.5)/2),z};
}

export function selectTownCells(cells, occupied) {
  const built = cells.filter(c => occupied.has(`${c.col}:${c.row}`));
  const vacant = cells.filter(c => !occupied.has(`${c.col}:${c.row}`));
  vacant.sort((a,b) => {
    const distance = c => Math.min(...built.map(p => Math.abs(c.col-p.col)+Math.abs(c.row-p.row)));
    return distance(a)-distance(b) || (b.row+b.col)-(a.row+a.col) || a.col-b.col;
  });
  return [...built, ...vacant.slice(0,5)];
}

export function createTownStreets(cells, pitch, size) {
  const nodes = new Map(), edges = new Map();
  const node = p => {const id=key(p);if(!nodes.has(id))nodes.set(id,{x:Math.round(p.x*10000)/10000,z:Math.round(p.z*10000)/10000,key:id,neighbors:new Set()});return nodes.get(id);};
  const connect = (a,b) => {
    a=node(a);b=node(b);a.neighbors.add(b.key);b.neighbors.add(a.key);
    const id=[a.key,b.key].sort().join('/');edges.set(id,{a,b});
  };
  for(const c of cells) {
    const corners=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([x,z])=>({x:c.x+x*pitch/2,z:c.z+z*pitch/2}));
    corners.forEach((p,i)=>connect(p,corners[(i+1)%4]));
  }
  // The north/south main street connects harbor, highway and every district.
  // Connecting each district through grid intersections never crosses a plot.
  const grid = i => (i-size/2)*pitch;
  for(let i=0;i<size;i++)connect({x:0,z:grid(i)},{x:0,z:grid(i+1)});
  for(const c of cells) {
    const z=c.z+(c.z<0?1:-1)*pitch/2;
    let x=c.x+(c.x<0?1:-1)*pitch/2;
    while(Math.abs(x)>.001) {
      const next=x-Math.sign(x)*pitch;
      connect({x,z},{x:next,z});x=next;
    }
  }
  const junctions=[...nodes.values()].filter(n=>n.neighbors.size>=3).map(n=>({...n,signaled:n.neighbors.size===4}));
  return {nodes,edges:[...edges.values()],junctions};
}

export function streetNodePath(network, start, end) {
  const from=key(start),to=key(end),queue=[from],previous=new Map([[from,null]]);
  for(let i=0;i<queue.length && !previous.has(to);i++) {
    for(const next of network.nodes.get(queue[i])?.neighbors??[]) {
      if(previous.has(next))continue;
      previous.set(next,queue[i]);queue.push(next);
    }
  }
  if(!previous.has(to))throw new Error('Disconnected town street');
  const result=[];
  for(let id=to;id!==null;id=previous.get(id)){const p=network.nodes.get(id);result.push({x:p.x,z:p.z});}
  return result.reverse();
}


export function streetTile(node,network) {
  const directions=[...node.neighbors].map(id=>network.nodes.get(id)).map(p=>[Math.sign(p.x-node.x),Math.sign(p.z-node.z)]);
  const has=(x,z)=>directions.some(d=>d[0]===x && d[1]===z);
  let key="roads/crossroad",rotation=0;
  if(directions.length===2) {
    if(has(-1,0)&&has(1,0))key="roads/straight";
    else if(has(0,-1)&&has(0,1)){key="roads/straight";rotation=Math.PI/2;}
    else {key="roads/bend";rotation=has(-1,0)?(has(0,1)?0:-Math.PI/2):(has(0,1)?Math.PI/2:Math.PI);}
  } else if(directions.length===3) {
    // Authored T connects west/east/+z; its closed side is -z.
    key="roads/intersection";
    rotation=!has(0,-1)?0:!has(-1,0)?Math.PI/2:!has(0,1)?Math.PI:-Math.PI/2;
  } else if(directions.length===1) {
    key="roads/end";rotation=has(1,0)?0:has(0,-1)?Math.PI/2:has(-1,0)?Math.PI:-Math.PI/2;
    // Main-street portals continue into the regional highway/harbor road.
    if(Math.abs(node.x)<.001){key="roads/straight";rotation=Math.PI/2;}
  }
  return {key,rotation};
}
