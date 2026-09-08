/* Deploy Manager 3D city bundle. Source: client/city3d.js. Three.js is MIT licensed. */
var DeployManager3D=(()=>{var ol=Object.defineProperty;var um=Object.getOwnPropertyDescriptor;var dm=Object.getOwnPropertyNames;var fm=Object.prototype.hasOwnProperty;var pm=(s,e)=>{for(var t in e)ol(s,t,{get:e[t],enumerable:!0})},mm=(s,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of dm(e))!fm.call(s,i)&&i!==t&&ol(s,i,{get:()=>e[i],enumerable:!(n=um(e,i))||n.enumerable});return s};var gm=s=>mm(ol({},"__esModule",{value:!0}),s);var eM={};pm(eM,{AMBIENT_DELIVERY_COUNT:()=>Cu,ASSET_URLS:()=>jc,CAMERA_HOME:()=>Ta,CITY_METRICS:()=>Qt,City3D:()=>sl,GHOST_MODEL_KEYS:()=>Jc,HIGHWAY_APPROACH:()=>Nt,HIGHWAY_SIGN_ROTATION:()=>qp,HIGHWAY_TRAFFIC_PROFILES:()=>Yp,OCEAN_WAVE_SETTINGS:()=>cp,RAIL_APPROACH:()=>Gt,REDUCED_MOTION_FRAME_MS:()=>Xp,ROAD_ASSET_METRICS:()=>An,ROAD_TILE_ROTATIONS:()=>Wv,TERRAIN_CONFIG:()=>dn,TRAIN_TRAFFIC_PROFILE:()=>Qc,WATER_TRAFFIC_PROFILES:()=>bs,chooseAmbientDeliveryTargets:()=>Jp,chooseBuildingKey:()=>Kp,createCity3D:()=>Qv,createHighwaySignTransform:()=>Qp,createPerimeterBands:()=>jp,createPlotLayout:()=>$p,createStreetAccess:()=>Ca,createStreetRoutePoints:()=>nl,createTerrainContext:()=>im,createTransitCurves:()=>em,oceanWaveHeightAt:()=>Ma,streetCurve:()=>Au,terrainFbmAt:()=>yr,terrainHeightAt:()=>Ra,vegetationDensityAt:()=>el});var Gi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Wi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Td=0,Ql=1,Ad=2;var ms=1,Rd=2,rr=3,Nn=0,an=1,Ft=2,Qn=0,ss=1,eh=2,th=3,nh=4,Cd=5;var Fi=100,Pd=101,Id=102,Ld=103,Dd=104,Nd=200,Ud=201,Fd=202,Od=203,co=204,lo=205,Bd=206,zd=207,kd=208,Hd=209,Vd=210,Gd=211,Wd=212,Xd=213,qd=214,ho=0,uo=1,fo=2,rs=3,po=4,mo=5,go=6,xo=7,Ho=0,Yd=1,Zd=2,Bn=0,ih=1,sh=2,rh=3,ah=4,oh=5,ch=6,aa=7,Bl="attached",Kd="detached",lh=300,Xi=301,gs=302,Vo=303,Go=304,oa=306,Oi=1e3,Sn=1001,Hs=1002,Rt=1003,Wo=1004;var xs=1005;var Ct=1006,ar=1007;var zn=1008;var hn=1009,hh=1010,uh=1011,or=1012,Xo=1013,kn=1014,_n=1015,ei=1016,qo=1017,Yo=1018,cr=1020,dh=35902,fh=35899,ph=1021,mh=1022,yn=1023,Xn=1026,qi=1027,Zo=1028,Ko=1029,Yi=1030,$o=1031;var jo=1033,ca=33776,la=33777,ha=33778,ua=33779,Jo=35840,Qo=35841,ec=35842,tc=35843,nc=36196,ic=37492,sc=37496,rc=37488,ac=37489,da=37490,oc=37491,cc=37808,lc=37809,hc=37810,uc=37811,dc=37812,fc=37813,pc=37814,mc=37815,gc=37816,xc=37817,_c=37818,yc=37819,vc=37820,Mc=37821,bc=36492,Sc=36494,Ec=36495,wc=36283,Tc=36284,fa=36285,Ac=36286;var as=2300,os=2301,oo=2302,zl=2303,kl=2400,Hl=2401,Vl=2402,$d=2500;var gh=0,pa=1,lr=2,jd=3200;var ma=0,Jd=1,Si="",yt="srgb",tn="srgb-linear",Ir="linear",at="srgb";var ns=7680;var Gl=519,Qd=512,ef=513,tf=514,Rc=515,nf=516,sf=517,Cc=518,rf=519,_o=35044;var xh="300 es",Ln=2e3,Vs=2001;function xm(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function _m(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Gs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function af(){let s=Gs("canvas");return s.style.display="block",s}var zu={},Ws=null;function Lr(...s){let e="THREE."+s.shift();Ws?Ws("log",e,...s):console.log(e,...s)}function of(s){let e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Ae(...s){s=of(s);let e="THREE."+s.shift();if(Ws)Ws("warn",e,...s);else{let t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function ze(...s){s=of(s);let e="THREE."+s.shift();if(Ws)Ws("error",e,...s);else{let t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function is(...s){let e=s.join(" ");e in zu||(zu[e]=!0,Ae(...s))}function cf(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var lf={[ho]:uo,[fo]:go,[po]:xo,[rs]:mo,[uo]:ho,[go]:fo,[xo]:po,[mo]:rs},Un=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}},Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ku=1234567,zs=Math.PI/180,cs=180/Math.PI;function Dn(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Zt[s&255]+Zt[s>>8&255]+Zt[s>>16&255]+Zt[s>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[t&63|128]+Zt[t>>8&255]+"-"+Zt[t>>16&255]+Zt[t>>24&255]+Zt[n&255]+Zt[n>>8&255]+Zt[n>>16&255]+Zt[n>>24&255]).toLowerCase()}function We(s,e,t){return Math.max(e,Math.min(t,s))}function _h(s,e){return(s%e+e)%e}function ym(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function vm(s,e,t){return s!==e?(t-s)/(e-s):0}function Rr(s,e,t){return(1-t)*s+t*e}function Mm(s,e,t,n){return Rr(s,e,1-Math.exp(-t*n))}function bm(s,e=1){return e-Math.abs(_h(s,e*2)-e)}function Sm(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Em(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function wm(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Tm(s,e){return s+Math.random()*(e-s)}function Am(s){return s*(.5-Math.random())}function Rm(s){s!==void 0&&(ku=s);let e=ku+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Cm(s){return s*zs}function Pm(s){return s*cs}function Im(s){return(s&s-1)===0&&s!==0}function Lm(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Dm(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Nm(s,e,t,n,i){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),p=a((n-e)/2);switch(i){case"XYX":s.set(o*h,c*u,c*d,o*l);break;case"YZY":s.set(c*d,o*h,c*u,o*l);break;case"ZXZ":s.set(c*u,c*d,o*h,o*l);break;case"XZX":s.set(o*h,c*p,c*f,o*l);break;case"YXY":s.set(c*f,o*h,c*p,o*l);break;case"ZYZ":s.set(c*p,c*f,o*h,o*l);break;default:Ae("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function In(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ct(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Ze={DEG2RAD:zs,RAD2DEG:cs,generateUUID:Dn,clamp:We,euclideanModulo:_h,mapLinear:ym,inverseLerp:vm,lerp:Rr,damp:Mm,pingpong:bm,smoothstep:Sm,smootherstep:Em,randInt:wm,randFloat:Tm,randFloatSpread:Am,seededRandom:Rm,degToRad:Cm,radToDeg:Pm,isPowerOfTwo:Im,ceilPowerOfTwo:Lm,floorPowerOfTwo:Dm,setQuaternionFromProperEuler:Nm,normalize:ct,denormalize:In},oe=class s{static{s.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},$t=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=r[a+0],f=r[a+1],p=r[a+2],x=r[a+3];if(u!==x||c!==d||l!==f||h!==p){let m=c*d+l*f+h*p+u*x;m<0&&(d=-d,f=-f,p=-p,x=-x,m=-m);let g=1-o;if(m<.9995){let M=Math.acos(m),b=Math.sin(M);g=Math.sin(g*M)/b,o=Math.sin(o*M)/b,c=c*g+d*o,l=l*g+f*o,h=h*g+p*o,u=u*g+x*o}else{c=c*g+d*o,l=l*g+f*o,h=h*g+p*o,u=u*g+x*o;let M=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=M,l*=M,h*=M,u*=M}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=r[a],d=r[a+1],f=r[a+2],p=r[a+3];return e[t]=o*p+h*u+c*f-l*d,e[t+1]=c*p+h*d+l*u-o*f,e[t+2]=l*p+h*f+o*d-c*u,e[t+3]=h*p-o*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(r/2),d=c(n/2),f=c(i/2),p=c(r/2);switch(a){case"XYZ":this._x=d*h*u+l*f*p,this._y=l*f*u-d*h*p,this._z=l*h*p+d*f*u,this._w=l*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+l*f*p,this._y=l*f*u-d*h*p,this._z=l*h*p-d*f*u,this._w=l*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-l*f*p,this._y=l*f*u+d*h*p,this._z=l*h*p+d*f*u,this._w=l*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-l*f*p,this._y=l*f*u+d*h*p,this._z=l*h*p-d*f*u,this._w=l*h*u+d*f*p;break;case"YZX":this._x=d*h*u+l*f*p,this._y=l*f*u+d*h*p,this._z=l*h*p-d*f*u,this._w=l*h*u-d*f*p;break;case"XZY":this._x=d*h*u-l*f*p,this._y=l*f*u-d*h*p,this._z=l*h*p+d*f*u,this._w=l*h*u+d*f*p;break;default:Ae("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-i)*f}else if(n>o&&n>u){let f=2*Math.sqrt(1+n-o-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+l)/f}else if(o>u){let f=2*Math.sqrt(1+o-n-u);this._w=(r-l)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(We(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-r*c,this._y=i*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},T=class s{static{s.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Hu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Hu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-r*i),u=2*(r*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=i+c*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return cl.copy(this).projectOnVector(e),this.sub(cl)}reflect(e){return this.sub(cl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},cl=new T,Hu=new $t,He=class s{static{s.prototype.isMatrix3=!0}constructor(e,t,n,i,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l)}set(e,t,n,i,r,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],x=i[0],m=i[3],g=i[6],M=i[1],b=i[4],_=i[7],S=i[2],E=i[5],R=i[8];return r[0]=a*x+o*M+c*S,r[3]=a*m+o*b+c*E,r[6]=a*g+o*_+c*R,r[1]=l*x+h*M+u*S,r[4]=l*m+h*b+u*E,r[7]=l*g+h*_+u*R,r[2]=d*x+f*M+p*S,r[5]=d*m+f*b+p*E,r[8]=d*g+f*_+p*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+i*r*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*r,f=l*r-a*c,p=t*u+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/p;return e[0]=u*x,e[1]=(i*l-h*n)*x,e[2]=(o*n-i*a)*x,e[3]=d*x,e[4]=(h*t-i*c)*x,e[5]=(i*r-o*t)*x,e[6]=f*x,e[7]=(n*c-l*t)*x,e[8]=(a*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return is("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ll.makeScale(e,t)),this}rotate(e){return is("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ll.makeRotation(-e)),this}translate(e,t){return is("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ll.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},ll=new He,Vu=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Gu=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Um(){let s={enabled:!0,workingColorSpace:tn,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===at&&(i.r=fi(i.r),i.g=fi(i.g),i.b=fi(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===at&&(i.r=ks(i.r),i.g=ks(i.g),i.b=ks(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Si?Ir:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return is("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return is("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[tn]:{primaries:e,whitePoint:n,transfer:Ir,toXYZ:Vu,fromXYZ:Gu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:yt},outputColorSpaceConfig:{drawingBufferColorSpace:yt}},[yt]:{primaries:e,whitePoint:n,transfer:at,toXYZ:Vu,fromXYZ:Gu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:yt}}}),s}var Ye=Um();function fi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ks(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var ws,yo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ws===void 0&&(ws=Gs("canvas")),ws.width=e.width,ws.height=e.height;let i=ws.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ws}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Gs("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=fi(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(fi(t[n]/255)*255):t[n]=fi(t[n]);return{data:t,width:e.width,height:e.height}}else return Ae("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Fm=0,Xs=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fm++}),this.uuid=Dn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(hl(i[a].image)):r.push(hl(i[a]))}else r=hl(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function hl(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?yo.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Ae("Texture: Unable to serialize Texture."),{})}var Om=0,ul=new T,Ut=class s extends Un{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=Sn,i=Sn,r=Ct,a=zn,o=yn,c=hn,l=s.DEFAULT_ANISOTROPY,h=Si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Om++}),this.uuid=Dn(),this.name="",this.source=new Xs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new oe(0,0),this.repeat=new oe(1,1),this.center=new oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ul).x}get height(){return this.source.getSize(ul).y}get depth(){return this.source.getSize(ul).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ae(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Ae(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==lh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Oi:e.x=e.x-Math.floor(e.x);break;case Sn:e.x=e.x<0?0:1;break;case Hs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Oi:e.y=e.y-Math.floor(e.y);break;case Sn:e.y=e.y<0?0:1;break;case Hs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=lh;Ut.DEFAULT_ANISOTROPY=1;var lt=class s{static{s.prototype.isVector4=!0}constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],p=c[9],x=c[2],m=c[6],g=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(p+m)<.1&&Math.abs(l+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let b=(l+1)/2,_=(f+1)/2,S=(g+1)/2,E=(h+d)/4,R=(u+x)/4,y=(p+m)/4;return b>_&&b>S?b<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(b),i=E/n,r=R/n):_>S?_<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(_),n=E/i,r=y/i):S<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(S),n=R/r,i=y/r),this.set(n,i,r,t),this}let M=Math.sqrt((m-p)*(m-p)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(m-p)/M,this.y=(u-x)/M,this.z=(d-h)/M,this.w=Math.acos((l+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this.w=We(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this.w=We(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},vo=class extends Un{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ct,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new lt(0,0,e,t),this.scissorTest=!1,this.viewport=new lt(0,0,e,t),this.textures=[];let i={width:e,height:t,depth:n.depth},r=new Ut(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Ct,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Xs(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},gn=class extends vo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Dr=class extends Ut{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=Sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Mo=class extends Ut{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=Sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ke=class s{static{s.prototype.isMatrix4=!0}constructor(e,t,n,i,r,a,o,c,l,h,u,d,f,p,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l,h,u,d,f,p,x,m)}set(e,t,n,i,r,a,o,c,l,h,u,d,f,p,x,m){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=r,g[5]=a,g[9]=o,g[13]=c,g[2]=l,g[6]=h,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=x,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,i=1/Ts.setFromMatrixColumn(e,0).length(),r=1/Ts.setFromMatrixColumn(e,1).length(),a=1/Ts.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=a*h,f=a*u,p=o*h,x=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+p*l,t[5]=d-x*l,t[9]=-o*c,t[2]=x-d*l,t[6]=p+f*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*h,f=c*u,p=l*h,x=l*u;t[0]=d+x*o,t[4]=p*o-f,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-p,t[6]=x+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*h,f=c*u,p=l*h,x=l*u;t[0]=d-x*o,t[4]=-a*u,t[8]=p+f*o,t[1]=f+p*o,t[5]=a*h,t[9]=x-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*h,f=a*u,p=o*h,x=o*u;t[0]=c*h,t[4]=p*l-f,t[8]=d*l+x,t[1]=c*u,t[5]=x*l+d,t[9]=f*l-p,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,f=a*l,p=o*c,x=o*l;t[0]=c*h,t[4]=x-d*u,t[8]=p*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=f*u+p,t[10]=d-x*u}else if(e.order==="XZY"){let d=a*c,f=a*l,p=o*c,x=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+x,t[5]=a*h,t[9]=f*u-p,t[2]=p*u-f,t[6]=o*h,t[10]=x*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Bm,e,zm)}lookAt(e,t,n){let i=this.elements;return pn.subVectors(e,t),pn.lengthSq()===0&&(pn.z=1),pn.normalize(),Pi.crossVectors(n,pn),Pi.lengthSq()===0&&(Math.abs(n.z)===1?pn.x+=1e-4:pn.z+=1e-4,pn.normalize(),Pi.crossVectors(n,pn)),Pi.normalize(),La.crossVectors(pn,Pi),i[0]=Pi.x,i[4]=La.x,i[8]=pn.x,i[1]=Pi.y,i[5]=La.y,i[9]=pn.y,i[2]=Pi.z,i[6]=La.z,i[10]=pn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],x=n[6],m=n[10],g=n[14],M=n[3],b=n[7],_=n[11],S=n[15],E=i[0],R=i[4],y=i[8],A=i[12],P=i[1],I=i[5],L=i[9],V=i[13],q=i[2],O=i[6],X=i[10],W=i[14],Q=i[3],ne=i[7],ae=i[11],he=i[15];return r[0]=a*E+o*P+c*q+l*Q,r[4]=a*R+o*I+c*O+l*ne,r[8]=a*y+o*L+c*X+l*ae,r[12]=a*A+o*V+c*W+l*he,r[1]=h*E+u*P+d*q+f*Q,r[5]=h*R+u*I+d*O+f*ne,r[9]=h*y+u*L+d*X+f*ae,r[13]=h*A+u*V+d*W+f*he,r[2]=p*E+x*P+m*q+g*Q,r[6]=p*R+x*I+m*O+g*ne,r[10]=p*y+x*L+m*X+g*ae,r[14]=p*A+x*V+m*W+g*he,r[3]=M*E+b*P+_*q+S*Q,r[7]=M*R+b*I+_*O+S*ne,r[11]=M*y+b*L+_*X+S*ae,r[15]=M*A+b*V+_*W+S*he,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],p=e[3],x=e[7],m=e[11],g=e[15],M=c*f-l*d,b=o*f-l*u,_=o*d-c*u,S=a*f-l*h,E=a*d-c*h,R=a*u-o*h;return t*(x*M-m*b+g*_)-n*(p*M-m*S+g*E)+i*(p*b-x*S+g*R)-r*(p*_-x*E+m*R)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-n*(r*h-o*c)+i*(r*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],p=e[12],x=e[13],m=e[14],g=e[15],M=t*o-n*a,b=t*c-i*a,_=t*l-r*a,S=n*c-i*o,E=n*l-r*o,R=i*l-r*c,y=h*x-u*p,A=h*m-d*p,P=h*g-f*p,I=u*m-d*x,L=u*g-f*x,V=d*g-f*m,q=M*V-b*L+_*I+S*P-E*A+R*y;if(q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/q;return e[0]=(o*V-c*L+l*I)*O,e[1]=(i*L-n*V-r*I)*O,e[2]=(x*R-m*E+g*S)*O,e[3]=(d*E-u*R-f*S)*O,e[4]=(c*P-a*V-l*A)*O,e[5]=(t*V-i*P+r*A)*O,e[6]=(m*_-p*R-g*b)*O,e[7]=(h*R-d*_+f*b)*O,e[8]=(a*L-o*P+l*y)*O,e[9]=(n*P-t*L-r*y)*O,e[10]=(p*E-x*_+g*M)*O,e[11]=(u*_-h*E-f*M)*O,e[12]=(o*A-a*I-c*y)*O,e[13]=(t*I-n*A+i*y)*O,e[14]=(x*b-p*S-m*M)*O,e[15]=(h*S-u*b+d*M)*O,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,u=o+o,d=r*l,f=r*h,p=r*u,x=a*h,m=a*u,g=o*u,M=c*l,b=c*h,_=c*u,S=n.x,E=n.y,R=n.z;return i[0]=(1-(x+g))*S,i[1]=(f+_)*S,i[2]=(p-b)*S,i[3]=0,i[4]=(f-_)*E,i[5]=(1-(d+g))*E,i[6]=(m+M)*E,i[7]=0,i[8]=(p+b)*R,i[9]=(m-M)*R,i[10]=(1-(d+x))*R,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Ts.set(i[0],i[1],i[2]).length(),o=Ts.set(i[4],i[5],i[6]).length(),c=Ts.set(i[8],i[9],i[10]).length();r<0&&(a=-a),Rn.copy(this);let l=1/a,h=1/o,u=1/c;return Rn.elements[0]*=l,Rn.elements[1]*=l,Rn.elements[2]*=l,Rn.elements[4]*=h,Rn.elements[5]*=h,Rn.elements[6]*=h,Rn.elements[8]*=u,Rn.elements[9]*=u,Rn.elements[10]*=u,t.setFromRotationMatrix(Rn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,i,r,a,o=Ln,c=!1){let l=this.elements,h=2*r/(t-e),u=2*r/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i),p,x;if(c)p=r/(a-r),x=a*r/(a-r);else if(o===Ln)p=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Vs)p=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=Ln,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i),p,x;if(c)p=1/(a-r),x=a/(a-r);else if(o===Ln)p=-2/(a-r),x=-(a+r)/(a-r);else if(o===Vs)p=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ts=new T,Rn=new ke,Bm=new T(0,0,0),zm=new T(1,1,1),Pi=new T,La=new T,pn=new T,Wu=new ke,Xu=new $t,qn=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-We(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(We(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-We(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(We(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-We(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ae("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Wu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Wu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Xu.setFromEuler(this),this.setFromQuaternion(Xu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};qn.DEFAULT_ORDER="XYZ";var qs=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},km=0,qu=new T,As=new $t,ai=new ke,Da=new T,vr=new T,Hm=new T,Vm=new $t,Yu=new T(1,0,0),Zu=new T(0,1,0),Ku=new T(0,0,1),$u={type:"added"},Gm={type:"removed"},Rs={type:"childadded",child:null},dl={type:"childremoved",child:null},$e=class s extends Un{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:km++}),this.uuid=Dn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new T,t=new qn,n=new $t,i=new T(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ke},normalMatrix:{value:new He}}),this.matrix=new ke,this.matrixWorld=new ke,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new qs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return As.setFromAxisAngle(e,t),this.quaternion.multiply(As),this}rotateOnWorldAxis(e,t){return As.setFromAxisAngle(e,t),this.quaternion.premultiply(As),this}rotateX(e){return this.rotateOnAxis(Yu,e)}rotateY(e){return this.rotateOnAxis(Zu,e)}rotateZ(e){return this.rotateOnAxis(Ku,e)}translateOnAxis(e,t){return qu.copy(e).applyQuaternion(this.quaternion),this.position.add(qu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Yu,e)}translateY(e){return this.translateOnAxis(Zu,e)}translateZ(e){return this.translateOnAxis(Ku,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ai.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Da.copy(e):Da.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),vr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ai.lookAt(vr,Da,this.up):ai.lookAt(Da,vr,this.up),this.quaternion.setFromRotationMatrix(ai),i&&(ai.extractRotation(i.matrixWorld),As.setFromRotationMatrix(ai),this.quaternion.premultiply(As.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ze("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent($u),Rs.child=e,this.dispatchEvent(Rs),Rs.child=null):ze("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Gm),dl.child=e,this.dispatchEvent(dl),dl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ai.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ai.multiply(e.parent.matrixWorld)),e.applyMatrix4(ai),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent($u),Rs.child=e,this.dispatchEvent(Rs),Rs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vr,e,Hm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vr,Vm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,i=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*i,r[13]+=n-r[1]*t-r[5]*n-r[9]*i,r[14]+=i-r[2]*t-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};$e.DEFAULT_UP=new T(0,1,0);$e.DEFAULT_MATRIX_AUTO_UPDATE=!0;$e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ke=class extends $e{constructor(){super(),this.isGroup=!0,this.type="Group"}},Wm={type:"move"},Ys=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,n),g=this._getHandJoint(l,x);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;l.inputState.pinching&&d>f+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Wm)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ke;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},hf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ii={h:0,s:0,l:0},Na={h:0,s:0,l:0};function fl(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var we=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ye.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Ye.workingColorSpace){if(e=_h(e,1),t=We(t,0,1),n=We(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=fl(a,r,e+1/3),this.g=fl(a,r,e),this.b=fl(a,r,e-1/3)}return Ye.colorSpaceToWorking(this,i),this}setStyle(e,t=yt){function n(r){r!==void 0&&parseFloat(r)<1&&Ae("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ae("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ae("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yt){let n=hf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ae("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=fi(e.r),this.g=fi(e.g),this.b=fi(e.b),this}copyLinearToSRGB(e){return this.r=ks(e.r),this.g=ks(e.g),this.b=ks(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yt){return Ye.workingToColorSpace(Kt.copy(this),e),Math.round(We(Kt.r*255,0,255))*65536+Math.round(We(Kt.g*255,0,255))*256+Math.round(We(Kt.b*255,0,255))}getHexString(e=yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.workingToColorSpace(Kt.copy(this),t);let n=Kt.r,i=Kt.g,r=Kt.b,a=Math.max(n,i,r),o=Math.min(n,i,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-r)/u+(i<r?6:0);break;case i:c=(r-n)/u+2;break;case r:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ye.workingColorSpace){return Ye.workingToColorSpace(Kt.copy(this),t),e.r=Kt.r,e.g=Kt.g,e.b=Kt.b,e}getStyle(e=yt){Ye.workingToColorSpace(Kt.copy(this),e);let t=Kt.r,n=Kt.g,i=Kt.b;return e!==yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Ii),this.setHSL(Ii.h+e,Ii.s+t,Ii.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ii),e.getHSL(Na);let n=Rr(Ii.h,Na.h,t),i=Rr(Ii.s,Na.s,t),r=Rr(Ii.l,Na.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Kt=new we;we.NAMES=hf;var Nr=class extends $e{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qn,this.environmentIntensity=1,this.environmentRotation=new qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Cn=new T,oi=new T,pl=new T,ci=new T,Cs=new T,Ps=new T,ju=new T,ml=new T,gl=new T,xl=new T,_l=new lt,yl=new lt,vl=new lt,di=class s{constructor(e=new T,t=new T,n=new T){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Cn.subVectors(e,t),i.cross(Cn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Cn.subVectors(i,t),oi.subVectors(n,t),pl.subVectors(e,t);let a=Cn.dot(Cn),o=Cn.dot(oi),c=Cn.dot(pl),l=oi.dot(oi),h=oi.dot(pl),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(l*c-o*h)*d,p=(a*h-o*c)*d;return r.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ci)===null?!1:ci.x>=0&&ci.y>=0&&ci.x+ci.y<=1}static getInterpolation(e,t,n,i,r,a,o,c){return this.getBarycoord(e,t,n,i,ci)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ci.x),c.addScaledVector(a,ci.y),c.addScaledVector(o,ci.z),c)}static getInterpolatedAttribute(e,t,n,i,r,a){return _l.setScalar(0),yl.setScalar(0),vl.setScalar(0),_l.fromBufferAttribute(e,t),yl.fromBufferAttribute(e,n),vl.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(_l,r.x),a.addScaledVector(yl,r.y),a.addScaledVector(vl,r.z),a}static isFrontFacing(e,t,n,i){return Cn.subVectors(n,t),oi.subVectors(e,t),Cn.cross(oi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Cn.subVectors(this.c,this.b),oi.subVectors(this.a,this.b),Cn.cross(oi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,a,o;Cs.subVectors(i,n),Ps.subVectors(r,n),ml.subVectors(e,n);let c=Cs.dot(ml),l=Ps.dot(ml);if(c<=0&&l<=0)return t.copy(n);gl.subVectors(e,i);let h=Cs.dot(gl),u=Ps.dot(gl);if(h>=0&&u<=h)return t.copy(i);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(Cs,a);xl.subVectors(e,r);let f=Cs.dot(xl),p=Ps.dot(xl);if(p>=0&&f<=p)return t.copy(r);let x=f*l-c*p;if(x<=0&&l>=0&&p<=0)return o=l/(l-p),t.copy(n).addScaledVector(Ps,o);let m=h*p-f*u;if(m<=0&&u-h>=0&&f-p>=0)return ju.subVectors(r,i),o=(u-h)/(u-h+(f-p)),t.copy(i).addScaledVector(ju,o);let g=1/(m+x+d);return a=x*g,o=d*g,t.copy(n).addScaledVector(Cs,a).addScaledVector(Ps,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Et=class{constructor(e=new T(1/0,1/0,1/0),t=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Pn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Pn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Pn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Pn):Pn.fromBufferAttribute(r,a),Pn.applyMatrix4(e.matrixWorld),this.expandByPoint(Pn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ua.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ua.copy(n.boundingBox)),Ua.applyMatrix4(e.matrixWorld),this.union(Ua)}let i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Pn),Pn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Mr),Fa.subVectors(this.max,Mr),Is.subVectors(e.a,Mr),Ls.subVectors(e.b,Mr),Ds.subVectors(e.c,Mr),Li.subVectors(Ls,Is),Di.subVectors(Ds,Ls),Ji.subVectors(Is,Ds);let t=[0,-Li.z,Li.y,0,-Di.z,Di.y,0,-Ji.z,Ji.y,Li.z,0,-Li.x,Di.z,0,-Di.x,Ji.z,0,-Ji.x,-Li.y,Li.x,0,-Di.y,Di.x,0,-Ji.y,Ji.x,0];return!Ml(t,Is,Ls,Ds,Fa)||(t=[1,0,0,0,1,0,0,0,1],!Ml(t,Is,Ls,Ds,Fa))?!1:(Oa.crossVectors(Li,Di),t=[Oa.x,Oa.y,Oa.z],Ml(t,Is,Ls,Ds,Fa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Pn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Pn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(li),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},li=[new T,new T,new T,new T,new T,new T,new T,new T],Pn=new T,Ua=new Et,Is=new T,Ls=new T,Ds=new T,Li=new T,Di=new T,Ji=new T,Mr=new T,Fa=new T,Oa=new T,Qi=new T;function Ml(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Qi.fromArray(s,r);let o=i.x*Math.abs(Qi.x)+i.y*Math.abs(Qi.y)+i.z*Math.abs(Qi.z),c=e.dot(Qi),l=t.dot(Qi),h=n.dot(Qi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Dt=new T,Ba=new oe,Xm=0,At=class extends Un{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Xm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=_o,this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ba.fromBufferAttribute(this,t),Ba.applyMatrix3(e),this.setXY(t,Ba.x,Ba.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix3(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=In(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ct(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=In(t,this.array)),t}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=In(t,this.array)),t}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=In(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=In(t,this.array)),t}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),i=ct(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),i=ct(i,this.array),r=ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==_o&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var Ur=class extends At{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Fr=class extends At{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Oe=class extends At{constructor(e,t,n){super(new Float32Array(e),t,n)}},qm=new Et,br=new T,bl=new T,jt=class{constructor(e=new T,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):qm.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;br.subVectors(e,this.center);let t=br.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(br,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(bl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(br.copy(e.center).add(bl)),this.expandByPoint(br.copy(e.center).sub(bl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Ym=0,Mn=new ke,Sl=new $e,Ns=new T,mn=new Et,Sr=new Et,Ht=new T,Qe=class s extends Un{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ym++}),this.uuid=Dn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(xm(e)?Fr:Ur)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new He().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Mn.makeRotationFromQuaternion(e),this.applyMatrix4(Mn),this}rotateX(e){return Mn.makeRotationX(e),this.applyMatrix4(Mn),this}rotateY(e){return Mn.makeRotationY(e),this.applyMatrix4(Mn),this}rotateZ(e){return Mn.makeRotationZ(e),this.applyMatrix4(Mn),this}translate(e,t,n){return Mn.makeTranslation(e,t,n),this.applyMatrix4(Mn),this}scale(e,t,n){return Mn.makeScale(e,t,n),this.applyMatrix4(Mn),this}lookAt(e){return Sl.lookAt(e),Sl.updateMatrix(),this.applyMatrix4(Sl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ns).negate(),this.translate(Ns.x,Ns.y,Ns.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Oe(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&Ae("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Et);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ze("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];mn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ht.addVectors(this.boundingBox.min,mn.min),this.boundingBox.expandByPoint(Ht),Ht.addVectors(this.boundingBox.max,mn.max),this.boundingBox.expandByPoint(Ht)):(this.boundingBox.expandByPoint(mn.min),this.boundingBox.expandByPoint(mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ze('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ze("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new T,1/0);return}if(e){let n=this.boundingSphere.center;if(mn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Sr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ht.addVectors(mn.min,Sr.min),mn.expandByPoint(Ht),Ht.addVectors(mn.max,Sr.max),mn.expandByPoint(Ht)):(mn.expandByPoint(Sr.min),mn.expandByPoint(Sr.max))}mn.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)Ht.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Ht));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Ht.fromBufferAttribute(o,l),c&&(Ns.fromBufferAttribute(e,l),Ht.add(Ns)),i=Math.max(i,n.distanceToSquared(Ht))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&ze('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ze("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new At(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let y=0;y<n.count;y++)o[y]=new T,c[y]=new T;let l=new T,h=new T,u=new T,d=new oe,f=new oe,p=new oe,x=new T,m=new T;function g(y,A,P){l.fromBufferAttribute(n,y),h.fromBufferAttribute(n,A),u.fromBufferAttribute(n,P),d.fromBufferAttribute(r,y),f.fromBufferAttribute(r,A),p.fromBufferAttribute(r,P),h.sub(l),u.sub(l),f.sub(d),p.sub(d);let I=1/(f.x*p.y-p.x*f.y);isFinite(I)&&(x.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(I),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(I),o[y].add(x),o[A].add(x),o[P].add(x),c[y].add(m),c[A].add(m),c[P].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let y=0,A=M.length;y<A;++y){let P=M[y],I=P.start,L=P.count;for(let V=I,q=I+L;V<q;V+=3)g(e.getX(V+0),e.getX(V+1),e.getX(V+2))}let b=new T,_=new T,S=new T,E=new T;function R(y){S.fromBufferAttribute(i,y),E.copy(S);let A=o[y];b.copy(A),b.sub(S.multiplyScalar(S.dot(A))).normalize(),_.crossVectors(E,A);let I=_.dot(c[y])<0?-1:1;a.setXYZW(y,b.x,b.y,b.z,I)}for(let y=0,A=M.length;y<A;++y){let P=M[y],I=P.start,L=P.count;for(let V=I,q=I+L;V<q;V+=3)R(e.getX(V+0)),R(e.getX(V+1)),R(e.getX(V+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new At(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new T,r=new T,a=new T,o=new T,c=new T,l=new T,h=new T,u=new T;if(e)for(let d=0,f=e.count;d<f;d+=3){let p=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,p),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,p),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ht.fromBufferAttribute(e,t),Ht.normalize(),e.setXYZ(t,Ht.x,Ht.y,Ht.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h),f=0,p=0;for(let x=0,m=c.length;x<m;x++){o.isInterleavedBufferAttribute?f=c[x]*o.data.stride+o.offset:f=c[x]*h;for(let g=0;g<h;g++)d[p++]=l[f++]}return new At(d,h,u)}if(this.index===null)return Ae("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let o in i){let c=i[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){let d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(i[c]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Zs=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=_o,this.updateRanges=[],this.version=0,this.uuid=Dn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},en=new T,Ks=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyMatrix4(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyNormalMatrix(e),this.setXYZ(t,en.x,en.y,en.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.transformDirection(e),this.setXYZ(t,en.x,en.y,en.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=In(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ct(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=In(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=In(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=In(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=In(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),i=ct(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),i=ct(i,this.array),r=ct(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Lr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new At(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Lr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Zm=0,nn=class extends Un{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Zm++}),this.uuid=Dn(),this.name="",this.type="Material",this.blending=ss,this.side=Nn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=co,this.blendDst=lo,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new we(0,0,0),this.blendAlpha=0,this.depthFunc=rs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ns,this.stencilZFail=ns,this.stencilZPass=ns,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ae(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Ae(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ss&&(n.blending=this.blending),this.side!==Nn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==co&&(n.blendSrc=this.blendSrc),this.blendDst!==lo&&(n.blendDst=this.blendDst),this.blendEquation!==Fi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==rs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Gl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ns&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ns&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ns&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new we().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new oe().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new oe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var hi=new T,El=new T,za=new T,Ni=new T,wl=new T,ka=new T,Tl=new T,Yn=class{constructor(e=new T,t=new T(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=hi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(hi.copy(this.origin).addScaledVector(this.direction,t),hi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){El.copy(e).add(t).multiplyScalar(.5),za.copy(t).sub(e).normalize(),Ni.copy(this.origin).sub(El);let r=e.distanceTo(t)*.5,a=-this.direction.dot(za),o=Ni.dot(this.direction),c=-Ni.dot(za),l=Ni.lengthSq(),h=Math.abs(1-a*a),u,d,f,p;if(h>0)if(u=a*c-o,d=a*o-c,p=r*h,u>=0)if(d>=-p)if(d<=p){let x=1/h;u*=x,d*=x,f=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d<=-p?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=p?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(El).addScaledVector(za,d),f}intersectSphere(e,t){hi.subVectors(e.center,this.origin);let n=hi.dot(this.direction),i=hi.dot(hi)-n*n,r=e.radius*e.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,hi)!==null}intersectTriangle(e,t,n,i,r){wl.subVectors(t,e),ka.subVectors(n,e),Tl.crossVectors(wl,ka);let a=this.direction.dot(Tl),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ni.subVectors(this.origin,e);let c=o*this.direction.dot(ka.crossVectors(Ni,ka));if(c<0)return null;let l=o*this.direction.dot(wl.cross(Ni));if(l<0||c+l>a)return null;let h=-o*Ni.dot(Tl);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},xt=class extends nn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=Ho,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Ju=new ke,es=new Yn,Ha=new jt,Qu=new T,Va=new T,Ga=new T,Wa=new T,Al=new T,Xa=new T,ed=new T,qa=new T,Pe=class extends $e{constructor(e=new Qe,t=new xt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(r&&o){Xa.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],u=r[c];h!==0&&(Al.fromBufferAttribute(u,e),a?Xa.addScaledVector(Al,h):Xa.addScaledVector(Al.sub(t),h))}t.add(Xa)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ha.copy(n.boundingSphere),Ha.applyMatrix4(r),es.copy(e.ray).recast(e.near),!(Ha.containsPoint(es.origin)===!1&&(es.intersectSphere(Ha,Qu)===null||es.origin.distanceToSquared(Qu)>(e.far-e.near)**2))&&(Ju.copy(r).invert(),es.copy(e.ray).applyMatrix4(Ju),!(n.boundingBox!==null&&es.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,es)))}_computeIntersections(e,t,n){let i,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,x=d.length;p<x;p++){let m=d[p],g=a[m.materialIndex],M=Math.max(m.start,f.start),b=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let _=M,S=b;_<S;_+=3){let E=o.getX(_),R=o.getX(_+1),y=o.getX(_+2);i=Ya(this,g,e,n,l,h,u,E,R,y),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=p,g=x;m<g;m+=3){let M=o.getX(m),b=o.getX(m+1),_=o.getX(m+2);i=Ya(this,a,e,n,l,h,u,M,b,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let p=0,x=d.length;p<x;p++){let m=d[p],g=a[m.materialIndex],M=Math.max(m.start,f.start),b=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let _=M,S=b;_<S;_+=3){let E=_,R=_+1,y=_+2;i=Ya(this,g,e,n,l,h,u,E,R,y),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let m=p,g=x;m<g;m+=3){let M=m,b=m+1,_=m+2;i=Ya(this,a,e,n,l,h,u,M,b,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}};function Km(s,e,t,n,i,r,a,o){let c;if(e.side===an?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,e.side===Nn,o),c===null)return null;qa.copy(o),qa.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(qa);return l<t.near||l>t.far?null:{distance:l,point:qa.clone(),object:s}}function Ya(s,e,t,n,i,r,a,o,c,l){s.getVertexPosition(o,Va),s.getVertexPosition(c,Ga),s.getVertexPosition(l,Wa);let h=Km(s,e,t,n,Va,Ga,Wa,ed);if(h){let u=new T;di.getBarycoord(ed,Va,Ga,Wa,u),i&&(h.uv=di.getInterpolatedAttribute(i,o,c,l,u,new oe)),r&&(h.uv1=di.getInterpolatedAttribute(r,o,c,l,u,new oe)),a&&(h.normal=di.getInterpolatedAttribute(a,o,c,l,u,new T),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new T,materialIndex:0};di.getNormal(Va,Ga,Wa,d.normal),h.face=d,h.barycoord=u}return h}var Er=new lt,td=new lt,nd=new lt,$m=new lt,id=new ke,Za=new T,Rl=new jt,sd=new ke,Cl=new Yn,Or=class extends Pe{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Bl,this.bindMatrix=new ke,this.bindMatrixInverse=new ke,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Et),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Za),this.boundingBox.expandByPoint(Za)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new jt),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Za),this.boundingSphere.expandByPoint(Za)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Rl.copy(this.boundingSphere),Rl.applyMatrix4(i),e.ray.intersectsSphere(Rl)!==!1&&(sd.copy(i).invert(),Cl.copy(e.ray).applyMatrix4(sd),!(this.boundingBox!==null&&Cl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Cl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new lt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Bl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Kd?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ae("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;td.fromBufferAttribute(i.attributes.skinIndex,e),nd.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Er.copy(t),t.set(0,0,0,0)):(Er.set(...t,1),t.set(0,0,0)),Er.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=nd.getComponent(r);if(a!==0){let o=td.getComponent(r);id.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector($m.copy(Er).applyMatrix4(id),a)}}return t.isVector4&&(t.w=Er.w),t.applyMatrix4(this.bindMatrixInverse)}},$s=class extends $e{constructor(){super(),this.isBone=!0,this.type="Bone"}},js=class extends Ut{constructor(e=null,t=1,n=1,i,r,a,o,c,l=Rt,h=Rt,u,d){super(null,a,o,c,l,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},rd=new ke,jm=new ke,Br=class s{constructor(e=[],t=[]){this.uuid=Dn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ae("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new ke)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new ke;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:jm;rd.multiplyMatrices(o,t[r]),rd.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new js(t,e,e,yn,_n);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],a=t[r];a===void 0&&(Ae("Skeleton: No bone found with UUID:",r),a=new $s),this.bones.push(a),this.boneInverses.push(new ke().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},Bi=class extends At{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Us=new ke,ad=new ke,Ka=[],od=new Et,Jm=new ke,wr=new Pe,Tr=new jt,Pt=class extends Pe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Bi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Jm)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Et),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Us),od.copy(e.boundingBox).applyMatrix4(Us),this.boundingBox.union(od)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new jt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Us),Tr.copy(e.boundingSphere).applyMatrix4(Us),this.boundingSphere.union(Tr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(wr.geometry=this.geometry,wr.material=this.material,wr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Tr.copy(this.boundingSphere),Tr.applyMatrix4(n),e.ray.intersectsSphere(Tr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Us),ad.multiplyMatrices(n,Us),wr.matrixWorld=ad,wr.raycast(e,Ka);for(let a=0,o=Ka.length;a<o;a++){let c=Ka[a];c.instanceId=r,c.object=this,t.push(c)}Ka.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Bi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new js(new Float32Array(i*this.count),i,this.count,Zo,_n));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Pl=new T,Qm=new T,eg=new He,bn=class{constructor(e=new T(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Pl.subVectors(n,t).cross(Qm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta(Pl),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||eg.getNormalMatrix(e),i=this.coplanarPoint(Pl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},ts=new jt,tg=new oe(.5,.5),$a=new T,zi=class{constructor(e=new bn,t=new bn,n=new bn,i=new bn,r=new bn,a=new bn){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ln,n=!1){let i=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],u=r[5],d=r[6],f=r[7],p=r[8],x=r[9],m=r[10],g=r[11],M=r[12],b=r[13],_=r[14],S=r[15];if(i[0].setComponents(l-a,f-h,g-p,S-M).normalize(),i[1].setComponents(l+a,f+h,g+p,S+M).normalize(),i[2].setComponents(l+o,f+u,g+x,S+b).normalize(),i[3].setComponents(l-o,f-u,g-x,S-b).normalize(),n)i[4].setComponents(c,d,m,_).normalize(),i[5].setComponents(l-c,f-d,g-m,S-_).normalize();else if(i[4].setComponents(l-c,f-d,g-m,S-_).normalize(),t===Ln)i[5].setComponents(l+c,f+d,g+m,S+_).normalize();else if(t===Vs)i[5].setComponents(c,d,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ts.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ts.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ts)}intersectsSprite(e){ts.center.set(0,0,0);let t=tg.distanceTo(e.center);return ts.radius=.7071067811865476+t,ts.applyMatrix4(e.matrixWorld),this.intersectsSphere(ts)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if($a.x=i.normal.x>0?e.max.x:e.min.x,$a.y=i.normal.y>0?e.max.y:e.min.y,$a.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint($a)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var xn=class extends nn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new we(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},bo=new T,So=new T,cd=new ke,Ar=new Yn,ja=new jt,Il=new T,ld=new T,pi=class extends $e{constructor(e=new Qe,t=new xn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)bo.fromBufferAttribute(t,i-1),So.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=bo.distanceTo(So);e.setAttribute("lineDistance",new Oe(n,1))}else Ae("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ja.copy(n.boundingSphere),ja.applyMatrix4(i),ja.radius+=r,e.ray.intersectsSphere(ja)===!1)return;cd.copy(i).invert(),Ar.copy(e.ray).applyMatrix4(cd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let x=f,m=p-1;x<m;x+=l){let g=h.getX(x),M=h.getX(x+1),b=Ja(this,e,Ar,c,g,M,x);b&&t.push(b)}if(this.isLineLoop){let x=h.getX(p-1),m=h.getX(f),g=Ja(this,e,Ar,c,x,m,p-1);g&&t.push(g)}}else{let f=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let x=f,m=p-1;x<m;x+=l){let g=Ja(this,e,Ar,c,x,x+1,x);g&&t.push(g)}if(this.isLineLoop){let x=Ja(this,e,Ar,c,p-1,f,p-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Ja(s,e,t,n,i,r,a){let o=s.geometry.attributes.position;if(bo.fromBufferAttribute(o,i),So.fromBufferAttribute(o,r),t.distanceSqToSegment(bo,So,Il,ld)>n)return;Il.applyMatrix4(s.matrixWorld);let l=e.ray.origin.distanceTo(Il);if(!(l<e.near||l>e.far))return{distance:l,point:ld.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}var hd=new T,ud=new T,Zn=class extends pi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)hd.fromBufferAttribute(t,i),ud.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+hd.distanceTo(ud);e.setAttribute("lineDistance",new Oe(n,1))}else Ae("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},ls=class extends pi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Js=class extends nn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new we(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},dd=new ke,Wl=new Yn,Qa=new jt,eo=new T,zr=class extends $e{constructor(e=new Qe,t=new Js){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Qa.copy(n.boundingSphere),Qa.applyMatrix4(i),Qa.radius+=r,e.ray.intersectsSphere(Qa)===!1)return;dd.copy(i).invert(),Wl.copy(e.ray).applyMatrix4(dd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){let d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let p=d,x=f;p<x;p++){let m=l.getX(p);eo.fromBufferAttribute(u,m),fd(eo,m,c,i,e,t,this)}}else{let d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let p=d,x=f;p<x;p++)eo.fromBufferAttribute(u,p),fd(eo,p,c,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function fd(s,e,t,n,i,r,a){let o=Wl.distanceSqToPoint(s);if(o<t){let c=new T;Wl.closestPointToPoint(s,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var kr=class extends Ut{constructor(e=[],t=Xi,n,i,r,a,o,c,l,h){super(e,t,n,i,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Hr=class extends Ut{constructor(e,t,n,i,r,a,o,c,l){super(e,t,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var mi=class extends Ut{constructor(e,t,n=kn,i,r,a,o=Rt,c=Rt,l,h=Xn,u=1){if(h!==Xn&&h!==qi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,i,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Xs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Eo=class extends mi{constructor(e,t=kn,n=Xi,i,r,a=Rt,o=Rt,c,l=Xn){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,i,r,a,o,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Vr=class extends Ut{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},vt=class s extends Qe{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],u=[],d=0,f=0;p("z","y","x",-1,-1,n,t,e,a,r,0),p("z","y","x",1,-1,n,t,-e,a,r,1),p("x","z","y",1,1,e,n,t,i,a,2),p("x","z","y",1,-1,e,n,-t,i,a,3),p("x","y","z",1,-1,e,t,n,i,r,4),p("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Oe(l,3)),this.setAttribute("normal",new Oe(h,3)),this.setAttribute("uv",new Oe(u,2));function p(x,m,g,M,b,_,S,E,R,y,A){let P=_/R,I=S/y,L=_/2,V=S/2,q=E/2,O=R+1,X=y+1,W=0,Q=0,ne=new T;for(let ae=0;ae<X;ae++){let he=ae*I-V;for(let ve=0;ve<O;ve++){let Je=ve*P-L;ne[x]=Je*M,ne[m]=he*b,ne[g]=q,l.push(ne.x,ne.y,ne.z),ne[x]=0,ne[m]=0,ne[g]=E>0?1:-1,h.push(ne.x,ne.y,ne.z),u.push(ve/R),u.push(1-ae/y),W+=1}}for(let ae=0;ae<y;ae++)for(let he=0;he<R;he++){let ve=d+he+O*ae,Je=d+he+O*(ae+1),_t=d+(he+1)+O*(ae+1),et=d+(he+1)+O*ae;c.push(ve,Je,et),c.push(Je,_t,et),Q+=6}o.addGroup(f,Q,A),f+=Q,d+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},hs=class s extends Qe{constructor(e=1,t=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));let a=[],o=[],c=[],l=[],h=t/2,u=Math.PI/2*e,d=t,f=2*u+d,p=n*2+r,x=i+1,m=new T,g=new T;for(let M=0;M<=p;M++){let b=0,_=0,S=0,E=0;if(M<=n){let A=M/n,P=A*Math.PI/2;_=-h-e*Math.cos(P),S=e*Math.sin(P),E=-e*Math.cos(P),b=A*u}else if(M<=n+r){let A=(M-n)/r;_=-h+A*t,S=e,E=0,b=u+A*d}else{let A=(M-n-r)/n,P=A*Math.PI/2;_=h+e*Math.sin(P),S=e*Math.cos(P),E=e*Math.sin(P),b=u+d+A*u}let R=Math.max(0,Math.min(1,b/f)),y=0;M===0?y=.5/i:M===p&&(y=-.5/i);for(let A=0;A<=i;A++){let P=A/i,I=P*Math.PI*2,L=Math.sin(I),V=Math.cos(I);g.x=-S*V,g.y=_,g.z=S*L,o.push(g.x,g.y,g.z),m.set(-S*V,E,S*L),m.normalize(),c.push(m.x,m.y,m.z),l.push(P+y,R)}if(M>0){let A=(M-1)*x;for(let P=0;P<i;P++){let I=A+P,L=A+P+1,V=M*x+P,q=M*x+P+1;a.push(I,L,V),a.push(L,q,V)}}}this.setIndex(a),this.setAttribute("position",new Oe(o,3)),this.setAttribute("normal",new Oe(c,3)),this.setAttribute("uv",new Oe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Gr=class s extends Qe{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],a=[],o=[],c=[],l=new T,h=new oe;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=n+u/t*i;l.x=e*Math.cos(f),l.y=e*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Oe(a,3)),this.setAttribute("normal",new Oe(o,3)),this.setAttribute("uv",new Oe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Kn=class s extends Qe{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],d=[],f=[],p=0,x=[],m=n/2,g=0;M(),a===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new Oe(u,3)),this.setAttribute("normal",new Oe(d,3)),this.setAttribute("uv",new Oe(f,2));function M(){let _=new T,S=new T,E=0,R=(t-e)/n;for(let y=0;y<=r;y++){let A=[],P=y/r,I=P*(t-e)+e;for(let L=0;L<=i;L++){let V=L/i,q=V*c+o,O=Math.sin(q),X=Math.cos(q);S.x=I*O,S.y=-P*n+m,S.z=I*X,u.push(S.x,S.y,S.z),_.set(O,R,X).normalize(),d.push(_.x,_.y,_.z),f.push(V,1-P),A.push(p++)}x.push(A)}for(let y=0;y<i;y++)for(let A=0;A<r;A++){let P=x[A][y],I=x[A+1][y],L=x[A+1][y+1],V=x[A][y+1];(e>0||A!==0)&&(h.push(P,I,V),E+=3),(t>0||A!==r-1)&&(h.push(I,L,V),E+=3)}l.addGroup(g,E,0),g+=E}function b(_){let S=p,E=new oe,R=new T,y=0,A=_===!0?e:t,P=_===!0?1:-1;for(let L=1;L<=i;L++)u.push(0,m*P,0),d.push(0,P,0),f.push(.5,.5),p++;let I=p;for(let L=0;L<=i;L++){let q=L/i*c+o,O=Math.cos(q),X=Math.sin(q);R.x=A*X,R.y=m*P,R.z=A*O,u.push(R.x,R.y,R.z),d.push(0,P,0),E.x=O*.5+.5,E.y=X*.5*P+.5,f.push(E.x,E.y),p++}for(let L=0;L<i;L++){let V=S+L,q=I+L;_===!0?h.push(q,q+1,V):h.push(q+1,q,V),y+=3}l.addGroup(g,y,_===!0?1:2),g+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},gi=class s extends Kn{constructor(e=1,t=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Wr=class s extends Qe{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let r=[],a=[];o(i),l(n),h(),this.setAttribute("position",new Oe(r,3)),this.setAttribute("normal",new Oe(r.slice(),3)),this.setAttribute("uv",new Oe(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(M){let b=new T,_=new T,S=new T;for(let E=0;E<t.length;E+=3)f(t[E+0],b),f(t[E+1],_),f(t[E+2],S),c(b,_,S,M)}function c(M,b,_,S){let E=S+1,R=[];for(let y=0;y<=E;y++){R[y]=[];let A=M.clone().lerp(_,y/E),P=b.clone().lerp(_,y/E),I=E-y;for(let L=0;L<=I;L++)L===0&&y===E?R[y][L]=A:R[y][L]=A.clone().lerp(P,L/I)}for(let y=0;y<E;y++)for(let A=0;A<2*(E-y)-1;A++){let P=Math.floor(A/2);A%2===0?(d(R[y][P+1]),d(R[y+1][P]),d(R[y][P])):(d(R[y][P+1]),d(R[y+1][P+1]),d(R[y+1][P]))}}function l(M){let b=new T;for(let _=0;_<r.length;_+=3)b.x=r[_+0],b.y=r[_+1],b.z=r[_+2],b.normalize().multiplyScalar(M),r[_+0]=b.x,r[_+1]=b.y,r[_+2]=b.z}function h(){let M=new T;for(let b=0;b<r.length;b+=3){M.x=r[b+0],M.y=r[b+1],M.z=r[b+2];let _=m(M)/2/Math.PI+.5,S=g(M)/Math.PI+.5;a.push(_,1-S)}p(),u()}function u(){for(let M=0;M<a.length;M+=6){let b=a[M+0],_=a[M+2],S=a[M+4],E=Math.max(b,_,S),R=Math.min(b,_,S);E>.9&&R<.1&&(b<.2&&(a[M+0]+=1),_<.2&&(a[M+2]+=1),S<.2&&(a[M+4]+=1))}}function d(M){r.push(M.x,M.y,M.z)}function f(M,b){let _=M*3;b.x=e[_+0],b.y=e[_+1],b.z=e[_+2]}function p(){let M=new T,b=new T,_=new T,S=new T,E=new oe,R=new oe,y=new oe;for(let A=0,P=0;A<r.length;A+=9,P+=6){M.set(r[A+0],r[A+1],r[A+2]),b.set(r[A+3],r[A+4],r[A+5]),_.set(r[A+6],r[A+7],r[A+8]),E.set(a[P+0],a[P+1]),R.set(a[P+2],a[P+3]),y.set(a[P+4],a[P+5]),S.copy(M).add(b).add(_).divideScalar(3);let I=m(S);x(E,P+0,M,I),x(R,P+2,b,I),x(y,P+4,_,I)}}function x(M,b,_,S){S<0&&M.x===1&&(a[b]=M.x-1),_.x===0&&_.z===0&&(a[b]=S/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function g(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.vertices,e.indices,e.radius,e.detail)}},Xr=class s extends Wr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},to=new T,no=new T,Ll=new T,io=new di,Qs=class extends Qe{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),r=Math.cos(zs*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let p=0;p<c;p+=3){a?(l[0]=a.getX(p),l[1]=a.getX(p+1),l[2]=a.getX(p+2)):(l[0]=p,l[1]=p+1,l[2]=p+2);let{a:x,b:m,c:g}=io;if(x.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),g.fromBufferAttribute(o,l[2]),io.getNormal(Ll),u[0]=`${Math.round(x.x*i)},${Math.round(x.y*i)},${Math.round(x.z*i)}`,u[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,u[2]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let M=0;M<3;M++){let b=(M+1)%3,_=u[M],S=u[b],E=io[h[M]],R=io[h[b]],y=`${_}_${S}`,A=`${S}_${_}`;A in d&&d[A]?(Ll.dot(d[A].normal)<=r&&(f.push(E.x,E.y,E.z),f.push(R.x,R.y,R.z)),d[A]=null):y in d||(d[y]={index0:l[M],index1:l[b],normal:Ll.clone()})}}for(let p in d)if(d[p]){let{index0:x,index1:m}=d[p];to.fromBufferAttribute(o,x),no.fromBufferAttribute(o,m),f.push(to.x,to.y,to.z),f.push(no.x,no.y,no.z)}this.setAttribute("position",new Oe(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},sn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ae("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(i=Math.floor(o+(c-o)/2),l=n[i]-a,l<0)o=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===a)return i/(r-1);let h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),o=this.getPoint(r),c=t||(a.isVector2?new oe:new T);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new T,i=[],r=[],a=[],o=new T,c=new ke;for(let f=0;f<=e;f++){let p=f/e;i[f]=this.getTangentAt(p,new T)}r[0]=new T,a[0]=new T;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(We(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,p))}a[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(We(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let p=1;p<=e;p++)r[p].applyMatrix4(c.makeRotationAxis(i[p],f*p)),a[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},qr=class extends sn{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new oe){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);let o=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},wo=class extends qr{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function yh(){let s=0,e=0,t=0,n=0;function i(r,a,o,c){s=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){i(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,u){let d=(a-r)/l-(o-r)/(l+h)+(o-a)/h,f=(o-a)/h-(c-a)/(h+u)+(c-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(r){let a=r*r,o=a*r;return s+e*r+t*a+n*o}}}var pd=new T,md=new T,Dl=new yh,Nl=new yh,Ul=new yh,wn=class extends sn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new T){let n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=i[(o-1)%r]:(md.subVectors(i[0],i[1]).add(i[0]),l=md);let u=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(pd.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=pd),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(l.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),p<1e-4&&(p=x),m<1e-4&&(m=x),Dl.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,p,x,m),Nl.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,p,x,m),Ul.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,p,x,m)}else this.curveType==="catmullrom"&&(Dl.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),Nl.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),Ul.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(Dl.calc(c),Nl.calc(c),Ul.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new T().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function gd(s,e,t,n,i){let r=(n-e)*.5,a=(i-t)*.5,o=s*s,c=s*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*s+t}function ng(s,e){let t=1-s;return t*t*e}function ig(s,e){return 2*(1-s)*s*e}function sg(s,e){return s*s*e}function Cr(s,e,t,n){return ng(s,e)+ig(s,t)+sg(s,n)}function rg(s,e){let t=1-s;return t*t*t*e}function ag(s,e){let t=1-s;return 3*t*t*s*e}function og(s,e){return 3*(1-s)*s*s*e}function cg(s,e){return s*s*s*e}function Pr(s,e,t,n,i){return rg(s,e)+ag(s,t)+og(s,n)+cg(s,i)}var To=class extends sn{constructor(e=new oe,t=new oe,n=new oe,i=new oe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new oe){let n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Pr(e,i.x,r.x,a.x,o.x),Pr(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Fn=class extends sn{constructor(e=new T,t=new T,n=new T,i=new T){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new T){let n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Pr(e,i.x,r.x,a.x,o.x),Pr(e,i.y,r.y,a.y,o.y),Pr(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ao=class extends sn{constructor(e=new oe,t=new oe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new oe){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new oe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Xt=class extends sn{constructor(e=new T,t=new T){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new T){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new T){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ro=class extends sn{constructor(e=new oe,t=new oe,n=new oe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new oe){let n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(Cr(e,i.x,r.x,a.x),Cr(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},us=class extends sn{constructor(e=new T,t=new T,n=new T){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new T){let n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(Cr(e,i.x,r.x,a.x),Cr(e,i.y,r.y,a.y),Cr(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Co=class extends sn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new oe){let n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(gd(o,c.x,l.x,h.x,u.x),gd(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new oe().fromArray(i))}return this}},Xl=Object.freeze({__proto__:null,ArcCurve:wo,CatmullRomCurve3:wn,CubicBezierCurve:To,CubicBezierCurve3:Fn,EllipseCurve:qr,LineCurve:Ao,LineCurve3:Xt,QuadraticBezierCurve:Ro,QuadraticBezierCurve3:us,SplineCurve:Co}),xi=class extends sn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Xl[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let a=i[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let a=r[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new Xl[i.type]().fromJSON(i))}return this}};var ki=class s extends Wr{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},ds=class s extends Qe{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,d=t/c,f=[],p=[],x=[],m=[];for(let g=0;g<h;g++){let M=g*d-a;for(let b=0;b<l;b++){let _=b*u-r;p.push(_,-M,0),x.push(0,0,1),m.push(b/o),m.push(1-g/c)}}for(let g=0;g<c;g++)for(let M=0;M<o;M++){let b=M+l*g,_=M+l*(g+1),S=M+1+l*(g+1),E=M+1+l*g;f.push(b,_,E),f.push(_,S,E)}this.setIndex(f),this.setAttribute("position",new Oe(p,3)),this.setAttribute("normal",new Oe(x,3)),this.setAttribute("uv",new Oe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},er=class s extends Qe{constructor(e=.5,t=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);let o=[],c=[],l=[],h=[],u=e,d=(t-e)/i,f=new T,p=new oe;for(let x=0;x<=i;x++){for(let m=0;m<=n;m++){let g=r+m/n*a;f.x=u*Math.cos(g),f.y=u*Math.sin(g),c.push(f.x,f.y,f.z),l.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,h.push(p.x,p.y)}u+=d}for(let x=0;x<i;x++){let m=x*(n+1);for(let g=0;g<n;g++){let M=g+m,b=M,_=M+n+1,S=M+n+2,E=M+1;o.push(b,_,E),o.push(_,S,E)}}this.setIndex(o),this.setAttribute("position",new Oe(c,3)),this.setAttribute("normal",new Oe(l,3)),this.setAttribute("uv",new Oe(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var On=class s extends Qe{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new T,d=new T,f=[],p=[],x=[],m=[];for(let g=0;g<=n;g++){let M=[],b=g/n,_=a+b*o,S=e*Math.cos(_),E=Math.sqrt(e*e-S*S),R=0;g===0&&a===0?R=.5/t:g===n&&c===Math.PI&&(R=-.5/t);for(let y=0;y<=t;y++){let A=y/t,P=i+A*r;u.x=-E*Math.cos(P),u.y=S,u.z=E*Math.sin(P),p.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),m.push(A+R,1-b),M.push(l++)}h.push(M)}for(let g=0;g<n;g++)for(let M=0;M<t;M++){let b=h[g][M+1],_=h[g][M],S=h[g+1][M],E=h[g+1][M+1];(g!==0||a>0)&&f.push(b,_,E),(g!==n-1||c<Math.PI)&&f.push(_,S,E)}this.setIndex(f),this.setAttribute("position",new Oe(p,3)),this.setAttribute("normal",new Oe(x,3)),this.setAttribute("uv",new Oe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var fs=class s extends Qe{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);let c=[],l=[],h=[],u=[],d=new T,f=new T,p=new T;for(let x=0;x<=n;x++){let m=a+x/n*o;for(let g=0;g<=i;g++){let M=g/i*r;f.x=(e+t*Math.cos(m))*Math.cos(M),f.y=(e+t*Math.cos(m))*Math.sin(M),f.z=t*Math.sin(m),l.push(f.x,f.y,f.z),d.x=e*Math.cos(M),d.y=e*Math.sin(M),p.subVectors(f,d).normalize(),h.push(p.x,p.y,p.z),u.push(g/i),u.push(x/n)}}for(let x=1;x<=n;x++)for(let m=1;m<=i;m++){let g=(i+1)*x+m-1,M=(i+1)*(x-1)+m-1,b=(i+1)*(x-1)+m,_=(i+1)*x+m;c.push(g,M,_),c.push(M,b,_)}this.setIndex(c),this.setAttribute("position",new Oe(l,3)),this.setAttribute("normal",new Oe(h,3)),this.setAttribute("uv",new Oe(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Yr=class s extends Qe{constructor(e=new us(new T(-1,-1,0),new T(-1,1,0),new T(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new T,c=new T,l=new oe,h=new T,u=[],d=[],f=[],p=[];x(),this.setIndex(p),this.setAttribute("position",new Oe(u,3)),this.setAttribute("normal",new Oe(d,3)),this.setAttribute("uv",new Oe(f,2));function x(){for(let b=0;b<t;b++)m(b);m(r===!1?t:0),M(),g()}function m(b){h=e.getPointAt(b/t,h);let _=a.normals[b],S=a.binormals[b];for(let E=0;E<=i;E++){let R=E/i*Math.PI*2,y=Math.sin(R),A=-Math.cos(R);c.x=A*_.x+y*S.x,c.y=A*_.y+y*S.y,c.z=A*_.z+y*S.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,u.push(o.x,o.y,o.z)}}function g(){for(let b=1;b<=t;b++)for(let _=1;_<=i;_++){let S=(i+1)*(b-1)+(_-1),E=(i+1)*b+(_-1),R=(i+1)*b+_,y=(i+1)*(b-1)+_;p.push(S,E,y),p.push(E,R,y)}}function M(){for(let b=0;b<=t;b++)for(let _=0;_<=i;_++)l.x=b/t,l.y=_/i,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new s(new Xl[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function _s(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];if(xd(i))i.isRenderTargetTexture?(Ae("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(xd(i[0])){let r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();e[t][n]=r}else e[t][n]=i.slice();else e[t][n]=i}}return e}function Jt(s){let e={};for(let t=0;t<s.length;t++){let n=_s(s[t]);for(let i in n)e[i]=n[i]}return e}function xd(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function lg(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function vh(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}var uf={clone:_s,merge:Jt},hg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ug=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,rn=class extends nn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hg,this.fragmentShader=ug,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=_s(e.uniforms),this.uniformsGroups=lg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new we().setHex(i.value);break;case"v2":this.uniforms[n].value=new oe().fromArray(i.value);break;case"v3":this.uniforms[n].value=new T().fromArray(i.value);break;case"v4":this.uniforms[n].value=new lt().fromArray(i.value);break;case"m3":this.uniforms[n].value=new He().fromArray(i.value);break;case"m4":this.uniforms[n].value=new ke().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Po=class extends rn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},it=class extends nn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new we(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ma,this.normalScale=new oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},cn=class extends it{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new oe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return We(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new we(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new we(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new we(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Zr=class extends nn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ma,this.normalScale=new oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=Ho,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Io=class extends nn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=jd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Lo=class extends nn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var tr=class extends xn{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function so(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function dg(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function _d(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let c=0;c!==e;++c)i[a++]=s[o+c]}return i}function fg(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}var $n=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Do=class extends $n{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:kl,endingEnd:kl}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,a=e+1,o=i[r],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Hl:r=e,o=2*t-n;break;case Vl:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Hl:a=e,c=2*n-t;break;case Vl:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),x=p*p,m=x*p,g=-d*m+2*d*x-d*p,M=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*p+1,b=(-1-f)*m+(1.5+f)*x+.5*p,_=f*m-f*x;for(let S=0;S!==o;++S)r[S]=g*a[h+S]+M*a[l+S]+b*a[c+S]+_*a[u+S];return r}},No=class extends $n{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[l+d]*u+a[c+d]*h;return r}},Uo=class extends $n{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Fo=class extends $n{interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this.inTangents,u=this.outTangents;if(!h||!u){let p=(n-t)/(i-t),x=1-p;for(let m=0;m!==o;++m)r[m]=a[l+m]*x+a[c+m]*p;return r}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let x=a[l+p],m=a[c+p],g=f*d+p*2,M=u[g],b=u[g+1],_=e*d+p*2,S=h[_],E=h[_+1],R=(n-t)/(i-t),y,A,P,I,L;for(let V=0;V<8;V++){y=R*R,A=y*R,P=1-R,I=P*P,L=I*P;let O=L*t+3*I*R*M+3*P*y*S+A*i-n;if(Math.abs(O)<1e-10)break;let X=3*I*(M-t)+6*P*R*(S-M)+3*y*(i-S);if(Math.abs(X)<1e-10)break;R=R-O/X,R=Math.max(0,Math.min(1,R))}r[p]=L*x+3*I*R*b+3*P*y*E+A*m}return r}},ln=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=so(t,this.TimeBufferType),this.values=so(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:so(e.times,Array),values:so(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Uo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new No(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Do(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Fo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case as:t=this.InterpolantFactoryMethodDiscrete;break;case os:t=this.InterpolantFactoryMethodLinear;break;case oo:t=this.InterpolantFactoryMethodSmooth;break;case zl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ae("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return as;case this.InterpolantFactoryMethodLinear:return os;case this.InterpolantFactoryMethodSmooth:return oo;case this.InterpolantFactoryMethodBezier:return zl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(ze("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(ze("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){ze("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){ze("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&_m(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){ze("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===oo,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(i)c=!0;else{let u=o*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){let x=t[u+p];if(x!==t[d+p]||x!==t[f+p]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};ln.prototype.ValueTypeName="";ln.prototype.TimeBufferType=Float32Array;ln.prototype.ValueBufferType=Float32Array;ln.prototype.DefaultInterpolation=os;var _i=class extends ln{constructor(e,t,n){super(e,t,n)}};_i.prototype.ValueTypeName="bool";_i.prototype.ValueBufferType=Array;_i.prototype.DefaultInterpolation=as;_i.prototype.InterpolantFactoryMethodLinear=void 0;_i.prototype.InterpolantFactoryMethodSmooth=void 0;var Kr=class extends ln{constructor(e,t,n,i){super(e,t,n,i)}};Kr.prototype.ValueTypeName="color";var yi=class extends ln{constructor(e,t,n,i){super(e,t,n,i)}};yi.prototype.ValueTypeName="number";var Oo=class extends $n{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let h=l+o;l!==h;l+=4)$t.slerpFlat(r,0,a,l-o,a,l,c);return r}},vi=class extends ln{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Oo(this.times,this.values,this.getValueSize(),e)}};vi.prototype.ValueTypeName="quaternion";vi.prototype.InterpolantFactoryMethodSmooth=void 0;var Mi=class extends ln{constructor(e,t,n){super(e,t,n)}};Mi.prototype.ValueTypeName="string";Mi.prototype.ValueBufferType=Array;Mi.prototype.DefaultInterpolation=as;Mi.prototype.InterpolantFactoryMethodLinear=void 0;Mi.prototype.InterpolantFactoryMethodSmooth=void 0;var Hi=class extends ln{constructor(e,t,n,i){super(e,t,n,i)}};Hi.prototype.ValueTypeName="vector";var $r=class{constructor(e="",t=-1,n=[],i=$d){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Dn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(mg(n[a]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(ln.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);let h=dg(c);c=_d(c,1,h),l=_d(l,1,h),!i&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new yi(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],h=l.name.match(r);if(h&&h.length>1){let u=h[1],d=i[u];d||(i[u]=d=[]),d.push(l)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function pg(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return yi;case"vector":case"vector2":case"vector3":case"vector4":return Hi;case"color":return Kr;case"quaternion":return vi;case"bool":case"boolean":return _i;case"string":return Mi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function mg(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=pg(s.type);if(s.times===void 0){let t=[],n=[];fg(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}var En={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(yd(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!yd(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function yd(s){try{let e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var nr=class{constructor(e,t,n){let i=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let f=l[u],p=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},df=new nr,jn=class{constructor(e){this.manager=e!==void 0?e:df,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};jn.DEFAULT_MATERIAL_NAME="__DEFAULT";var ui={},ql=class extends Error{constructor(e,t){super(e),this.response=t}},ir=class extends jn{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=En.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(ui[e]!==void 0){ui[e].push({onLoad:t,onProgress:n,onError:i});return}ui[e]=[],ui[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Ae("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=ui[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0,x=0,m=new ReadableStream({start(g){M();function M(){u.read().then(({done:b,value:_})=>{if(b)g.close();else{x+=_.byteLength;let S=new ProgressEvent("progress",{lengthComputable:p,loaded:x,total:f});for(let E=0,R=h.length;E<R;E++){let y=h[E];y.onProgress&&y.onProgress(S)}g.enqueue(_),M()}},b=>{g.error(b)})}}});return new Response(m)}else throw new ql(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(p=>f.decode(p))}}}).then(l=>{En.add(`file:${e}`,l);let h=ui[e];delete ui[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{let h=ui[e];if(h===void 0)throw this.manager.itemError(e),l;delete ui[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Fs=new WeakMap,Bo=class extends jn{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=En.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=Fs.get(a);u===void 0&&(u=[],Fs.set(a,u)),u.push({onLoad:t,onError:i})}return a}let o=Gs("img");function c(){h(),t&&t(this);let u=Fs.get(this)||[];for(let d=0;d<u.length;d++){let f=u[d];f.onLoad&&f.onLoad(this)}Fs.delete(this),r.manager.itemEnd(e)}function l(u){h(),i&&i(u),En.remove(`image:${e}`);let d=Fs.get(this)||[];for(let f=0;f<d.length;f++){let p=d[f];p.onError&&p.onError(u)}Fs.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),En.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}};var jr=class extends jn{constructor(e){super(e)}load(e,t,n,i){let r=new Ut,a=new Bo(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},ps=class extends $e{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new we(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Jr=class extends ps{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy($e.DEFAULT_UP),this.updateMatrix(),this.groundColor=new we(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Fl=new ke,vd=new T,Md=new T,Qr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new oe(512,512),this.mapType=hn,this.map=null,this.mapPass=null,this.matrix=new ke,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new zi,this._frameExtents=new oe(1,1),this._viewportCount=1,this._viewports=[new lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;vd.setFromMatrixPosition(e.matrixWorld),t.position.copy(vd),Md.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Md),t.updateMatrixWorld(),Fl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fl,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Vs||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Fl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},ro=new T,ao=new $t,Wn=new T,ea=class extends $e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ke,this.projectionMatrix=new ke,this.projectionMatrixInverse=new ke,this.coordinateSystem=Ln,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ro,ao,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ro,ao,Wn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(ro,ao,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ro,ao,Wn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ui=new T,bd=new oe,Sd=new oe,Vt=class extends ea{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=cs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(zs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return cs*2*Math.atan(Math.tan(zs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z),Ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z)}getViewSize(e,t){return this.getViewBounds(e,bd,Sd),t.subVectors(Sd,bd)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(zs*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Yl=class extends Qr{constructor(){super(new Vt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=cs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},ta=class extends ps{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy($e.DEFAULT_UP),this.updateMatrix(),this.target=new $e,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Yl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Zl=class extends Qr{constructor(){super(new Vt(90,1,.5,500)),this.isPointLightShadow=!0}},na=class extends ps{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Zl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Jn=class extends ea{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Kl=class extends Qr{constructor(){super(new Jn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Vi=class extends ps{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy($e.DEFAULT_UP),this.updateMatrix(),this.target=new $e,this.shadow=new Kl}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var bi=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Ol=new WeakMap,ia=class extends jn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ae("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ae("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=En.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{Ol.has(a)===!0?(i&&i(Ol.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(l),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){En.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e)}).catch(function(l){i&&i(l),Ol.set(c,l),En.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});En.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Os=-90,Bs=1,zo=class extends $e{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Vt(Os,Bs,e,t);i.layers=this.layers,this.add(i);let r=new Vt(Os,Bs,e,t);r.layers=this.layers,this.add(r);let a=new Vt(Os,Bs,e,t);a.layers=this.layers,this.add(a);let o=new Vt(Os,Bs,e,t);o.layers=this.layers,this.add(o);let c=new Vt(Os,Bs,e,t);c.layers=this.layers,this.add(c);let l=new Vt(Os,Bs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===Ln)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Vs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},ko=class extends Vt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Mh="\\[\\]\\.:\\/",gg=new RegExp("["+Mh+"]","g"),bh="[^"+Mh+"]",xg="[^"+Mh.replace("\\.","")+"]",_g=/((?:WC+[\/:])*)/.source.replace("WC",bh),yg=/(WCOD+)?/.source.replace("WCOD",xg),vg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",bh),Mg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",bh),bg=new RegExp("^"+_g+yg+vg+Mg+"$"),Sg=["material","materials","bones","map"],$l=class{constructor(e,t,n){let i=n||pt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},pt=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(gg,"")}static parseTrackName(e){let t=bg.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);Sg.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ae("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){ze("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){ze("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){ze("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){ze("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){ze("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){ze("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){ze("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[i];if(a===void 0){let l=t.nodeName;ze("PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){ze("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){ze("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};pt.Composite=$l;pt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};pt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};pt.prototype.GetterByBindingType=[pt.prototype._getValue_direct,pt.prototype._getValue_array,pt.prototype._getValue_arrayElement,pt.prototype._getValue_toArray];pt.prototype.SetterByBindingTypeAndVersioning=[[pt.prototype._setValue_direct,pt.prototype._setValue_direct_setNeedsUpdate,pt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_array,pt.prototype._setValue_array_setNeedsUpdate,pt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_arrayElement,pt.prototype._setValue_arrayElement_setNeedsUpdate,pt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_fromArray,pt.prototype._setValue_fromArray_setNeedsUpdate,pt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var nM=new Float32Array(1);var Ed=new ke,sa=class{constructor(e,t,n=0,i=1/0){this.ray=new Yn(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new qs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):ze("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ed.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ed),this}intersectObject(e,t=!0,n=[]){return jl(e,this,n,t),n.sort(wd),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)jl(e[i],this,n,t);return n.sort(wd),n}};function wd(s,e){return s.distance-e.distance}function jl(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let a=0,o=r.length;a<o;a++)jl(r[a],e,t,!0)}}var sr=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=We(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(We(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Jl=class s{static{s.prototype.isMatrix2=!0}constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}};var ra=class extends Un{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Ae("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Sh(s,e,t,n){let i=Eg(n);switch(t){case ph:return s*e;case Zo:return s*e/i.components*i.byteLength;case Ko:return s*e/i.components*i.byteLength;case Yi:return s*e*2/i.components*i.byteLength;case $o:return s*e*2/i.components*i.byteLength;case mh:return s*e*3/i.components*i.byteLength;case yn:return s*e*4/i.components*i.byteLength;case jo:return s*e*4/i.components*i.byteLength;case ca:case la:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case ha:case ua:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Qo:case tc:return Math.max(s,16)*Math.max(e,8)/4;case Jo:case ec:return Math.max(s,8)*Math.max(e,8)/2;case nc:case ic:case rc:case ac:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case sc:case da:case oc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case cc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case lc:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case hc:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case uc:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case dc:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case fc:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case pc:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case mc:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case gc:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case xc:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case _c:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case yc:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case vc:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Mc:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case bc:case Sc:case Ec:return Math.ceil(s/4)*Math.ceil(e/4)*16;case wc:case Tc:return Math.ceil(s/4)*Math.ceil(e/4)*8;case fa:case Ac:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Eg(s){switch(s){case hn:case hh:return{byteLength:1,components:1};case or:case uh:case ei:return{byteLength:2,components:1};case qo:case Yo:return{byteLength:2,components:4};case kn:case Xo:case _n:return{byteLength:4,components:1};case dh:case fh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window<"u"&&(window.__THREE__?Ae("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function Uf(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&s!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Tg(s){let e=new WeakMap;function t(o,c){let l=o.array,h=o.usage,u=l.byteLength,d=s.createBuffer();s.bindBuffer(c,d),s.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=s.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=s.SHORT;else if(l instanceof Uint32Array)f=s.UNSIGNED_INT;else if(l instanceof Int32Array)f=s.INT;else if(l instanceof Int8Array)f=s.BYTE;else if(l instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){let h=c.array,u=c.updateRanges;if(s.bindBuffer(l,o),u.length===0)s.bufferSubData(l,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){let p=u[d],x=u[f];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){let x=u[f];s.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(s.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:r,update:a}}var Ag=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Rg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Cg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Pg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ig=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Lg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Dg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ng=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ug=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Fg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Og=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Bg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,kg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Hg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Vg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Gg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Wg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Yg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Zg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Kg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,$g=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,jg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Jg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Qg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,e0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,t0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,n0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,i0="gl_FragColor = linearToOutputTexel( gl_FragColor );",s0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,r0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,a0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,o0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,c0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,l0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,h0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,u0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,d0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,f0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,p0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,m0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,g0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,x0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,y0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,v0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,M0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,b0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,S0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,E0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,w0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,T0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,A0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,R0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,C0=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,P0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,I0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,L0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,D0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,N0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,U0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,F0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,O0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,B0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,z0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,k0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,H0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,V0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,G0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,W0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,X0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,q0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Y0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Z0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,K0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,$0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,j0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,J0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Q0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ex=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,tx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,nx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,ix=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,sx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ax=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ox=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,hx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ux=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,dx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,fx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,px=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,mx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,gx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,xx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_x=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,yx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Mx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,bx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Sx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ex=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Tx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Ax=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Rx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Px=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ix=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Nx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ux=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Fx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Ox=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Bx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,kx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Hx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Vx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,qx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Zx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Kx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$x=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Jx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,e_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,t_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,n_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,i_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,s_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,r_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,a_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xe={alphahash_fragment:Ag,alphahash_pars_fragment:Rg,alphamap_fragment:Cg,alphamap_pars_fragment:Pg,alphatest_fragment:Ig,alphatest_pars_fragment:Lg,aomap_fragment:Dg,aomap_pars_fragment:Ng,batching_pars_vertex:Ug,batching_vertex:Fg,begin_vertex:Og,beginnormal_vertex:Bg,bsdfs:zg,iridescence_fragment:kg,bumpmap_pars_fragment:Hg,clipping_planes_fragment:Vg,clipping_planes_pars_fragment:Gg,clipping_planes_pars_vertex:Wg,clipping_planes_vertex:Xg,color_fragment:qg,color_pars_fragment:Yg,color_pars_vertex:Zg,color_vertex:Kg,common:$g,cube_uv_reflection_fragment:jg,defaultnormal_vertex:Jg,displacementmap_pars_vertex:Qg,displacementmap_vertex:e0,emissivemap_fragment:t0,emissivemap_pars_fragment:n0,colorspace_fragment:i0,colorspace_pars_fragment:s0,envmap_fragment:r0,envmap_common_pars_fragment:a0,envmap_pars_fragment:o0,envmap_pars_vertex:c0,envmap_physical_pars_fragment:y0,envmap_vertex:l0,fog_vertex:h0,fog_pars_vertex:u0,fog_fragment:d0,fog_pars_fragment:f0,gradientmap_pars_fragment:p0,lightmap_pars_fragment:m0,lights_lambert_fragment:g0,lights_lambert_pars_fragment:x0,lights_pars_begin:_0,lights_toon_fragment:v0,lights_toon_pars_fragment:M0,lights_phong_fragment:b0,lights_phong_pars_fragment:S0,lights_physical_fragment:E0,lights_physical_pars_fragment:w0,lights_fragment_begin:T0,lights_fragment_maps:A0,lights_fragment_end:R0,lightprobes_pars_fragment:C0,logdepthbuf_fragment:P0,logdepthbuf_pars_fragment:I0,logdepthbuf_pars_vertex:L0,logdepthbuf_vertex:D0,map_fragment:N0,map_pars_fragment:U0,map_particle_fragment:F0,map_particle_pars_fragment:O0,metalnessmap_fragment:B0,metalnessmap_pars_fragment:z0,morphinstance_vertex:k0,morphcolor_vertex:H0,morphnormal_vertex:V0,morphtarget_pars_vertex:G0,morphtarget_vertex:W0,normal_fragment_begin:X0,normal_fragment_maps:q0,normal_pars_fragment:Y0,normal_pars_vertex:Z0,normal_vertex:K0,normalmap_pars_fragment:$0,clearcoat_normal_fragment_begin:j0,clearcoat_normal_fragment_maps:J0,clearcoat_pars_fragment:Q0,iridescence_pars_fragment:ex,opaque_fragment:tx,packing:nx,premultiplied_alpha_fragment:ix,project_vertex:sx,dithering_fragment:rx,dithering_pars_fragment:ax,roughnessmap_fragment:ox,roughnessmap_pars_fragment:cx,shadowmap_pars_fragment:lx,shadowmap_pars_vertex:hx,shadowmap_vertex:ux,shadowmask_pars_fragment:dx,skinbase_vertex:fx,skinning_pars_vertex:px,skinning_vertex:mx,skinnormal_vertex:gx,specularmap_fragment:xx,specularmap_pars_fragment:_x,tonemapping_fragment:yx,tonemapping_pars_fragment:vx,transmission_fragment:Mx,transmission_pars_fragment:bx,uv_pars_fragment:Sx,uv_pars_vertex:Ex,uv_vertex:wx,worldpos_vertex:Tx,background_vert:Ax,background_frag:Rx,backgroundCube_vert:Cx,backgroundCube_frag:Px,cube_vert:Ix,cube_frag:Lx,depth_vert:Dx,depth_frag:Nx,distance_vert:Ux,distance_frag:Fx,equirect_vert:Ox,equirect_frag:Bx,linedashed_vert:zx,linedashed_frag:kx,meshbasic_vert:Hx,meshbasic_frag:Vx,meshlambert_vert:Gx,meshlambert_frag:Wx,meshmatcap_vert:Xx,meshmatcap_frag:qx,meshnormal_vert:Yx,meshnormal_frag:Zx,meshphong_vert:Kx,meshphong_frag:$x,meshphysical_vert:jx,meshphysical_frag:Jx,meshtoon_vert:Qx,meshtoon_frag:e_,points_vert:t_,points_frag:n_,shadow_vert:i_,shadow_frag:s_,sprite_vert:r_,sprite_frag:a_},me={common:{diffuse:{value:new we(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new we(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new T},probesMax:{value:new T},probesResolution:{value:new T}},points:{diffuse:{value:new we(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new we(16777215)},opacity:{value:1},center:{value:new oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},ni={basic:{uniforms:Jt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:Jt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new we(0)},envMapIntensity:{value:1}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:Jt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new we(0)},specular:{value:new we(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:Jt([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new we(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:Jt([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new we(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:Jt([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:Jt([me.points,me.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:Jt([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:Jt([me.common,me.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:Jt([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:Jt([me.sprite,me.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distance:{uniforms:Jt([me.common,me.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distance_vert,fragmentShader:Xe.distance_frag},shadow:{uniforms:Jt([me.lights,me.fog,{color:{value:new we(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};ni.physical={uniforms:Jt([ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new we(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new we(0)},specularColor:{value:new we(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};var Pc={r:0,b:0,g:0},o_=new ke,Ff=new He;Ff.set(-1,0,0,0,1,0,0,0,1);function c_(s,e,t,n,i,r){let a=new we(0),o=i===!0?0:1,c,l,h=null,u=0,d=null;function f(M){let b=M.isScene===!0?M.background:null;if(b&&b.isTexture){let _=M.backgroundBlurriness>0;b=e.get(b,_)}return b}function p(M){let b=!1,_=f(M);_===null?m(a,o):_&&_.isColor&&(m(_,1),b=!0);let S=s.xr.getEnvironmentBlendMode();S==="additive"?t.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function x(M,b){let _=f(b);_&&(_.isCubeTexture||_.mapping===oa)?(l===void 0&&(l=new Pe(new vt(1,1,1),new rn({name:"BackgroundCubeMaterial",uniforms:_s(ni.backgroundCube.uniforms),vertexShader:ni.backgroundCube.vertexShader,fragmentShader:ni.backgroundCube.fragmentShader,side:an,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(S,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=_,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(o_.makeRotationFromEuler(b.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Ff),l.material.toneMapped=Ye.getTransfer(_.colorSpace)!==at,(h!==_||u!==_.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=_,u=_.version,d=s.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new Pe(new ds(2,2),new rn({name:"BackgroundMaterial",uniforms:_s(ni.background.uniforms),vertexShader:ni.background.vertexShader,fragmentShader:ni.background.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=Ye.getTransfer(_.colorSpace)!==at,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||u!==_.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,h=_,u=_.version,d=s.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function m(M,b){M.getRGB(Pc,vh(s)),t.buffers.color.setClear(Pc.r,Pc.g,Pc.b,b,r)}function g(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,b=1){a.set(M),o=b,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,m(a,o)},render:p,addToRenderList:x,dispose:g}}function l_(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,a=!1;function o(I,L,V,q,O){let X=!1,W=u(I,q,V,L);r!==W&&(r=W,l(r.object)),X=f(I,q,V,O),X&&p(I,q,V,O),O!==null&&e.update(O,s.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,_(I,L,V,q),O!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function c(){return s.createVertexArray()}function l(I){return s.bindVertexArray(I)}function h(I){return s.deleteVertexArray(I)}function u(I,L,V,q){let O=q.wireframe===!0,X=n[L.id];X===void 0&&(X={},n[L.id]=X);let W=I.isInstancedMesh===!0?I.id:0,Q=X[W];Q===void 0&&(Q={},X[W]=Q);let ne=Q[V.id];ne===void 0&&(ne={},Q[V.id]=ne);let ae=ne[O];return ae===void 0&&(ae=d(c()),ne[O]=ae),ae}function d(I){let L=[],V=[],q=[];for(let O=0;O<t;O++)L[O]=0,V[O]=0,q[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:V,attributeDivisors:q,object:I,attributes:{},index:null}}function f(I,L,V,q){let O=r.attributes,X=L.attributes,W=0,Q=V.getAttributes();for(let ne in Q)if(Q[ne].location>=0){let he=O[ne],ve=X[ne];if(ve===void 0&&(ne==="instanceMatrix"&&I.instanceMatrix&&(ve=I.instanceMatrix),ne==="instanceColor"&&I.instanceColor&&(ve=I.instanceColor)),he===void 0||he.attribute!==ve||ve&&he.data!==ve.data)return!0;W++}return r.attributesNum!==W||r.index!==q}function p(I,L,V,q){let O={},X=L.attributes,W=0,Q=V.getAttributes();for(let ne in Q)if(Q[ne].location>=0){let he=X[ne];he===void 0&&(ne==="instanceMatrix"&&I.instanceMatrix&&(he=I.instanceMatrix),ne==="instanceColor"&&I.instanceColor&&(he=I.instanceColor));let ve={};ve.attribute=he,he&&he.data&&(ve.data=he.data),O[ne]=ve,W++}r.attributes=O,r.attributesNum=W,r.index=q}function x(){let I=r.newAttributes;for(let L=0,V=I.length;L<V;L++)I[L]=0}function m(I){g(I,0)}function g(I,L){let V=r.newAttributes,q=r.enabledAttributes,O=r.attributeDivisors;V[I]=1,q[I]===0&&(s.enableVertexAttribArray(I),q[I]=1),O[I]!==L&&(s.vertexAttribDivisor(I,L),O[I]=L)}function M(){let I=r.newAttributes,L=r.enabledAttributes;for(let V=0,q=L.length;V<q;V++)L[V]!==I[V]&&(s.disableVertexAttribArray(V),L[V]=0)}function b(I,L,V,q,O,X,W){W===!0?s.vertexAttribIPointer(I,L,V,O,X):s.vertexAttribPointer(I,L,V,q,O,X)}function _(I,L,V,q){x();let O=q.attributes,X=V.getAttributes(),W=L.defaultAttributeValues;for(let Q in X){let ne=X[Q];if(ne.location>=0){let ae=O[Q];if(ae===void 0&&(Q==="instanceMatrix"&&I.instanceMatrix&&(ae=I.instanceMatrix),Q==="instanceColor"&&I.instanceColor&&(ae=I.instanceColor)),ae!==void 0){let he=ae.normalized,ve=ae.itemSize,Je=e.get(ae);if(Je===void 0)continue;let _t=Je.buffer,et=Je.type,$=Je.bytesPerElement,re=et===s.INT||et===s.UNSIGNED_INT||ae.gpuType===Xo;if(ae.isInterleavedBufferAttribute){let ie=ae.data,k=ie.stride,Z=ae.offset;if(ie.isInstancedInterleavedBuffer){for(let ee=0;ee<ne.locationSize;ee++)g(ne.location+ee,ie.meshPerAttribute);I.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let ee=0;ee<ne.locationSize;ee++)m(ne.location+ee);s.bindBuffer(s.ARRAY_BUFFER,_t);for(let ee=0;ee<ne.locationSize;ee++)b(ne.location+ee,ve/ne.locationSize,et,he,k*$,(Z+ve/ne.locationSize*ee)*$,re)}else{if(ae.isInstancedBufferAttribute){for(let ie=0;ie<ne.locationSize;ie++)g(ne.location+ie,ae.meshPerAttribute);I.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let ie=0;ie<ne.locationSize;ie++)m(ne.location+ie);s.bindBuffer(s.ARRAY_BUFFER,_t);for(let ie=0;ie<ne.locationSize;ie++)b(ne.location+ie,ve/ne.locationSize,et,he,ve*$,ve/ne.locationSize*ie*$,re)}}else if(W!==void 0){let he=W[Q];if(he!==void 0)switch(he.length){case 2:s.vertexAttrib2fv(ne.location,he);break;case 3:s.vertexAttrib3fv(ne.location,he);break;case 4:s.vertexAttrib4fv(ne.location,he);break;default:s.vertexAttrib1fv(ne.location,he)}}}}M()}function S(){A();for(let I in n){let L=n[I];for(let V in L){let q=L[V];for(let O in q){let X=q[O];for(let W in X)h(X[W].object),delete X[W];delete q[O]}}delete n[I]}}function E(I){if(n[I.id]===void 0)return;let L=n[I.id];for(let V in L){let q=L[V];for(let O in q){let X=q[O];for(let W in X)h(X[W].object),delete X[W];delete q[O]}}delete n[I.id]}function R(I){for(let L in n){let V=n[L];for(let q in V){let O=V[q];if(O[I.id]===void 0)continue;let X=O[I.id];for(let W in X)h(X[W].object),delete X[W];delete O[I.id]}}}function y(I){for(let L in n){let V=n[L],q=I.isInstancedMesh===!0?I.id:0,O=V[q];if(O!==void 0){for(let X in O){let W=O[X];for(let Q in W)h(W[Q].object),delete W[Q];delete O[X]}delete V[q],Object.keys(V).length===0&&delete n[L]}}}function A(){P(),a=!0,r!==i&&(r=i,l(r.object))}function P(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:A,resetDefaultState:P,dispose:S,releaseStatesOfGeometry:E,releaseStatesOfObject:y,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:m,disableUnusedAttributes:M}}function h_(s,e,t){let n;function i(c){n=c}function r(c,l){s.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,h){h!==0&&(s.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let d=0;for(let f=0;f<h;f++)d+=l[f];t.update(d,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function u_(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(R){return!(R!==yn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){let y=R===ei&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==hn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==_n&&!y)}function c(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(Ae("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ae("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),M=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),b=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),S=s.getParameter(s.MAX_SAMPLES),E=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:M,maxVaryings:b,maxFragmentUniforms:_,maxSamples:S,samples:E}}function d_(s){let e=this,t=null,n=0,i=!1,r=!1,a=new bn,o=new He,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let p=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,g=s.get(u);if(!i||p===null||p.length===0||r&&!m)r?h(null):l();else{let M=r?0:n,b=M*4,_=g.clippingState||null;c.value=_,_=h(p,d,b,f);for(let S=0;S!==b;++S)_[S]=t[S];g.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,p){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=c.value,p!==!0||m===null){let g=f+x*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<g)&&(m=new Float32Array(g));for(let b=0,_=f;b!==x;++b,_+=4)a.copy(u[b]).applyMatrix4(M,o),a.normal.toArray(m,_),m[_+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}var Zi=4,ff=[.125,.215,.35,.446,.526,.582],ys=20,f_=256,ga=new Jn,pf=new we,Eh=null,wh=0,Th=0,Ah=!1,p_=new T,Lc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,r={}){let{size:a=256,position:o=p_}=r;Eh=this._renderer.getRenderTarget(),wh=this._renderer.getActiveCubeFace(),Th=this._renderer.getActiveMipmapLevel(),Ah=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Eh,wh,Th),this._renderer.xr.enabled=Ah,e.scissorTest=!1,hr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Xi||e.mapping===gs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Eh=this._renderer.getRenderTarget(),wh=this._renderer.getActiveCubeFace(),Th=this._renderer.getActiveMipmapLevel(),Ah=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ct,minFilter:Ct,generateMipmaps:!1,type:ei,format:yn,colorSpace:tn,depthBuffer:!1},i=mf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=mf(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=m_(r)),this._blurMaterial=x_(r,e,t),this._ggxMaterial=g_(r,e,t)}return i}_compileMaterial(e){let t=new Pe(new Qe,e);this._renderer.compile(t,ga)}_sceneToCubeUV(e,t,n,i,r){let c=new Vt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(pf),u.toneMapping=Bn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Pe(new vt,new xt({name:"PMREM.Background",side:an,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,m=x.material,g=!1,M=e.background;M?M.isColor&&(m.color.copy(M),e.background=null,g=!0):(m.color.copy(pf),g=!0);for(let b=0;b<6;b++){let _=b%3;_===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[b],r.y,r.z)):_===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[b]));let S=this._cubeSize;hr(i,_*S,b>2?S:0,S,S),u.setRenderTarget(i),g&&u.render(x,c),u.render(e,c)}u.toneMapping=f,u.autoClear=d,e.background=M}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Xi||e.mapping===gs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=xf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gf());let r=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;hr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,ga)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let i=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),d=0+l*1.25,f=u*d,{_lodMax:p}=this,x=this._sizeLods[n],m=3*x*(n>p-Zi?n-p+Zi:0),g=4*(this._cubeSize-x);c.envMap.value=e.texture,c.roughness.value=f,c.mipInt.value=p-t,hr(r,m,g,3*x,2*x),i.setRenderTarget(r),i.render(o,ga),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=p-n,hr(e,m,g,3*x,2*x),i.setRenderTarget(e),i.render(o,ga)}_blur(e,t,n,i,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&ze("blur direction must be either latitudinal or longitudinal!");let h=3,u=this._lodMeshes[i];u.material=l;let d=l.uniforms,f=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ys-1),x=r/p,m=isFinite(r)?1+Math.floor(h*x):ys;m>ys&&Ae(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ys}`);let g=[],M=0;for(let R=0;R<ys;++R){let y=R/x,A=Math.exp(-y*y/2);g.push(A),R===0?M+=A:R<m&&(M+=2*A)}for(let R=0;R<g.length;R++)g[R]=g[R]/M;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=g,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:b}=this;d.dTheta.value=p,d.mipInt.value=b-n;let _=this._sizeLods[i],S=3*_*(i>b-Zi?i-b+Zi:0),E=4*(this._cubeSize-_);hr(t,S,E,3*_,2*_),c.setRenderTarget(t),c.render(u,ga)}};function m_(s){let e=[],t=[],n=[],i=s,r=s-Zi+1+ff.length;for(let a=0;a<r;a++){let o=Math.pow(2,i);e.push(o);let c=1/o;a>s-Zi?c=ff[a-s+Zi-1]:a===0&&(c=0),t.push(c);let l=1/(o-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,p=6,x=3,m=2,g=1,M=new Float32Array(x*p*f),b=new Float32Array(m*p*f),_=new Float32Array(g*p*f);for(let E=0;E<f;E++){let R=E%3*2/3-1,y=E>2?0:-1,A=[R,y,0,R+2/3,y,0,R+2/3,y+1,0,R,y,0,R+2/3,y+1,0,R,y+1,0];M.set(A,x*p*E),b.set(d,m*p*E);let P=[E,E,E,E,E,E];_.set(P,g*p*E)}let S=new Qe;S.setAttribute("position",new At(M,x)),S.setAttribute("uv",new At(b,m)),S.setAttribute("faceIndex",new At(_,g)),n.push(new Pe(S,null)),i>Zi&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function mf(s,e,t){let n=new gn(s,e,t);return n.texture.mapping=oa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function hr(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function g_(s,e,t){return new rn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:f_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Uc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function x_(s,e,t){let n=new Float32Array(ys),i=new T(0,1,0);return new rn({name:"SphericalGaussianBlur",defines:{n:ys,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Uc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function gf(){return new rn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Uc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function xf(){return new rn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Uc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function Uc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var Dc=class extends gn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new kr(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new vt(5,5,5),r=new rn({name:"CubemapFromEquirect",uniforms:_s(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:an,blending:Qn});r.uniforms.tEquirect.value=t;let a=new Pe(i,r),o=t.minFilter;return t.minFilter===zn&&(t.minFilter=Ct),new zo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}};function __(s){let e=new WeakMap,t=new WeakMap,n=null;function i(d,f=!1){return d==null?null:f?a(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===Vo||f===Go)if(e.has(d)){let p=e.get(d).texture;return o(p,d.mapping)}else{let p=d.image;if(p&&p.height>0){let x=new Dc(p.height);return x.fromEquirectangularTexture(s,d),e.set(d,x),d.addEventListener("dispose",l),o(x.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){let f=d.mapping,p=f===Vo||f===Go,x=f===Xi||f===gs;if(p||x){let m=t.get(d),g=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==g)return n===null&&(n=new Lc(s)),m=p?n.fromEquirectangular(d,m):n.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{let M=d.image;return p&&M&&M.height>0||x&&M&&c(M)?(n===null&&(n=new Lc(s)),m=p?n.fromEquirectangular(d):n.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",h),m.texture):null}}}return d}function o(d,f){return f===Vo?d.mapping=Xi:f===Go&&(d.mapping=gs),d}function c(d){let f=0,p=6;for(let x=0;x<p;x++)d[x]!==void 0&&f++;return f===p}function l(d){let f=d.target;f.removeEventListener("dispose",l);let p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:u}}function y_(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i=s.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&is("WebGLRenderer: "+n+" extension not supported."),i}}}function v_(s,e,t,n){let i={},r=new WeakMap;function a(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let p in d.attributes)e.remove(d.attributes[p]);d.removeEventListener("dispose",a),delete i[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function c(u){let d=u.attributes;for(let f in d)e.update(d[f],s.ARRAY_BUFFER)}function l(u){let d=[],f=u.index,p=u.attributes.position,x=0;if(p===void 0)return;if(f!==null){let M=f.array;x=f.version;for(let b=0,_=M.length;b<_;b+=3){let S=M[b+0],E=M[b+1],R=M[b+2];d.push(S,E,E,R,R,S)}}else{let M=p.array;x=p.version;for(let b=0,_=M.length/3-1;b<_;b+=3){let S=b+0,E=b+1,R=b+2;d.push(S,E,E,R,R,S)}}let m=new(p.count>=65535?Fr:Ur)(d,1);m.version=x;let g=r.get(u);g&&e.remove(g),r.set(u,m)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function M_(s,e,t){let n;function i(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function c(u,d){s.drawElements(n,d,r,u*a),t.update(d,n,1)}function l(u,d,f){f!==0&&(s.drawElementsInstanced(n,d,r,u*a,f),t.update(d,n,f))}function h(u,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,f);let x=0;for(let m=0;m<f;m++)x+=d[m];t.update(x,n,1)}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function b_(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:ze("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function S_(s,e,t){let n=new WeakMap,i=new lt;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(o);if(d===void 0||d.count!==u){let A=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",A)};d!==void 0&&d.texture.dispose();let f=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],b=0;f===!0&&(b=1),p===!0&&(b=2),x===!0&&(b=3);let _=o.attributes.position.count*b,S=1;_>e.maxTextureSize&&(S=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let E=new Float32Array(_*S*4*u),R=new Dr(E,_,S,u);R.type=_n,R.needsUpdate=!0;let y=b*4;for(let P=0;P<u;P++){let I=m[P],L=g[P],V=M[P],q=_*S*4*P;for(let O=0;O<I.count;O++){let X=O*y;f===!0&&(i.fromBufferAttribute(I,O),E[q+X+0]=i.x,E[q+X+1]=i.y,E[q+X+2]=i.z,E[q+X+3]=0),p===!0&&(i.fromBufferAttribute(L,O),E[q+X+4]=i.x,E[q+X+5]=i.y,E[q+X+6]=i.z,E[q+X+7]=0),x===!0&&(i.fromBufferAttribute(V,O),E[q+X+8]=i.x,E[q+X+9]=i.y,E[q+X+10]=i.z,E[q+X+11]=V.itemSize===4?i.w:1)}}d={count:u,texture:R,size:new oe(_,S)},n.set(o,d),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let f=0;for(let x=0;x<l.length;x++)f+=l[x];let p=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(s,"morphTargetBaseInfluence",p),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function E_(s,e,t,n,i){let r=new WeakMap;function a(l){let h=i.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let f=l.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function o(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var w_={[ih]:"LINEAR_TONE_MAPPING",[sh]:"REINHARD_TONE_MAPPING",[rh]:"CINEON_TONE_MAPPING",[ah]:"ACES_FILMIC_TONE_MAPPING",[ch]:"AGX_TONE_MAPPING",[aa]:"NEUTRAL_TONE_MAPPING",[oh]:"CUSTOM_TONE_MAPPING"};function T_(s,e,t,n,i,r){let a=new gn(e,t,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,depthTexture:i?new mi(e,t):void 0}),o=new gn(e,t,{type:ei,depthBuffer:!1,stencilBuffer:!1}),c=new Qe;c.setAttribute("position",new Oe([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Oe([0,2,0,0,2,0],2));let l=new Po({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new Pe(c,l),u=new Jn(-1,1,1,-1,0,1),d=null,f=null,p=!1,x,m=null,g=[],M=!1;this.setSize=function(b,_){a.setSize(b,_),o.setSize(b,_);for(let S=0;S<g.length;S++){let E=g[S];E.setSize&&E.setSize(b,_)}},this.setEffects=function(b){g=b,M=g.length>0&&g[0].isRenderPass===!0;let _=a.width,S=a.height;for(let E=0;E<g.length;E++){let R=g[E];R.setSize&&R.setSize(_,S)}},this.begin=function(b,_){if(p||b.toneMapping===Bn&&g.length===0)return!1;if(m=_,_!==null){let S=_.width,E=_.height;(a.width!==S||a.height!==E)&&this.setSize(S,E)}return M===!1&&b.setRenderTarget(a),x=b.toneMapping,b.toneMapping=Bn,!0},this.hasRenderPass=function(){return M},this.end=function(b,_){b.toneMapping=x,p=!0;let S=a,E=o;for(let R=0;R<g.length;R++){let y=g[R];if(y.enabled!==!1&&(y.render(b,E,S,_),y.needsSwap!==!1)){let A=S;S=E,E=A}}if(d!==b.outputColorSpace||f!==b.toneMapping){d=b.outputColorSpace,f=b.toneMapping,l.defines={},Ye.getTransfer(d)===at&&(l.defines.SRGB_TRANSFER="");let R=w_[f];R&&(l.defines[R]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=S.texture,b.setRenderTarget(m),b.render(h,u),m=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),c.dispose(),l.dispose()}}var Of=new Ut,Ph=new mi(1,1),Bf=new Dr,zf=new Mo,kf=new kr,_f=[],yf=[],vf=new Float32Array(16),Mf=new Float32Array(9),bf=new Float32Array(4);function dr(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=_f[i];if(r===void 0&&(r=new Float32Array(i),_f[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Ot(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Bt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Fc(s,e){let t=yf[e];t===void 0&&(t=new Int32Array(e),yf[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function A_(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function R_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;s.uniform2fv(this.addr,e),Bt(t,e)}}function C_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ot(t,e))return;s.uniform3fv(this.addr,e),Bt(t,e)}}function P_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;s.uniform4fv(this.addr,e),Bt(t,e)}}function I_(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ot(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Bt(t,e)}else{if(Ot(t,n))return;bf.set(n),s.uniformMatrix2fv(this.addr,!1,bf),Bt(t,n)}}function L_(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ot(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Bt(t,e)}else{if(Ot(t,n))return;Mf.set(n),s.uniformMatrix3fv(this.addr,!1,Mf),Bt(t,n)}}function D_(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ot(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Bt(t,e)}else{if(Ot(t,n))return;vf.set(n),s.uniformMatrix4fv(this.addr,!1,vf),Bt(t,n)}}function N_(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function U_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;s.uniform2iv(this.addr,e),Bt(t,e)}}function F_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ot(t,e))return;s.uniform3iv(this.addr,e),Bt(t,e)}}function O_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;s.uniform4iv(this.addr,e),Bt(t,e)}}function B_(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function z_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;s.uniform2uiv(this.addr,e),Bt(t,e)}}function k_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ot(t,e))return;s.uniform3uiv(this.addr,e),Bt(t,e)}}function H_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;s.uniform4uiv(this.addr,e),Bt(t,e)}}function V_(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Ph.compareFunction=t.isReversedDepthBuffer()?Cc:Rc,r=Ph):r=Of,t.setTexture2D(e||r,i)}function G_(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||zf,i)}function W_(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||kf,i)}function X_(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Bf,i)}function q_(s){switch(s){case 5126:return A_;case 35664:return R_;case 35665:return C_;case 35666:return P_;case 35674:return I_;case 35675:return L_;case 35676:return D_;case 5124:case 35670:return N_;case 35667:case 35671:return U_;case 35668:case 35672:return F_;case 35669:case 35673:return O_;case 5125:return B_;case 36294:return z_;case 36295:return k_;case 36296:return H_;case 35678:case 36198:case 36298:case 36306:case 35682:return V_;case 35679:case 36299:case 36307:return G_;case 35680:case 36300:case 36308:case 36293:return W_;case 36289:case 36303:case 36311:case 36292:return X_}}function Y_(s,e){s.uniform1fv(this.addr,e)}function Z_(s,e){let t=dr(e,this.size,2);s.uniform2fv(this.addr,t)}function K_(s,e){let t=dr(e,this.size,3);s.uniform3fv(this.addr,t)}function $_(s,e){let t=dr(e,this.size,4);s.uniform4fv(this.addr,t)}function j_(s,e){let t=dr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function J_(s,e){let t=dr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Q_(s,e){let t=dr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function ey(s,e){s.uniform1iv(this.addr,e)}function ty(s,e){s.uniform2iv(this.addr,e)}function ny(s,e){s.uniform3iv(this.addr,e)}function iy(s,e){s.uniform4iv(this.addr,e)}function sy(s,e){s.uniform1uiv(this.addr,e)}function ry(s,e){s.uniform2uiv(this.addr,e)}function ay(s,e){s.uniform3uiv(this.addr,e)}function oy(s,e){s.uniform4uiv(this.addr,e)}function cy(s,e,t){let n=this.cache,i=e.length,r=Fc(t,i);Ot(n,r)||(s.uniform1iv(this.addr,r),Bt(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Ph:a=Of;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,r[o])}function ly(s,e,t){let n=this.cache,i=e.length,r=Fc(t,i);Ot(n,r)||(s.uniform1iv(this.addr,r),Bt(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||zf,r[a])}function hy(s,e,t){let n=this.cache,i=e.length,r=Fc(t,i);Ot(n,r)||(s.uniform1iv(this.addr,r),Bt(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||kf,r[a])}function uy(s,e,t){let n=this.cache,i=e.length,r=Fc(t,i);Ot(n,r)||(s.uniform1iv(this.addr,r),Bt(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Bf,r[a])}function dy(s){switch(s){case 5126:return Y_;case 35664:return Z_;case 35665:return K_;case 35666:return $_;case 35674:return j_;case 35675:return J_;case 35676:return Q_;case 5124:case 35670:return ey;case 35667:case 35671:return ty;case 35668:case 35672:return ny;case 35669:case 35673:return iy;case 5125:return sy;case 36294:return ry;case 36295:return ay;case 36296:return oy;case 35678:case 36198:case 36298:case 36306:case 35682:return cy;case 35679:case 36299:case 36307:return ly;case 35680:case 36300:case 36308:case 36293:return hy;case 36289:case 36303:case 36311:case 36292:return uy}}var Ih=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=q_(t.type)}},Lh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=dy(t.type)}},Dh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(e,t[o.id],n)}}},Rh=/(\w+)(\])?(\[|\.)?/g;function Sf(s,e){s.seq.push(e),s.map[e.id]=e}function fy(s,e,t){let n=s.name,i=n.length;for(Rh.lastIndex=0;;){let r=Rh.exec(n),a=Rh.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){Sf(t,l===void 0?new Ih(o,s,e):new Lh(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new Dh(o),Sf(t,u)),t=u}}}var ur=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);fy(o,c,this)}let i=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function Ef(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var py=37297,my=0;function gy(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var wf=new He;function xy(s){Ye._getMatrix(wf,Ye.workingColorSpace,s);let e=`mat3( ${wf.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(s)){case Ir:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return Ae("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Tf(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+gy(s.getShaderSource(e),o)}else return r}function _y(s,e){let t=xy(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var yy={[ih]:"Linear",[sh]:"Reinhard",[rh]:"Cineon",[ah]:"ACESFilmic",[ch]:"AgX",[aa]:"Neutral",[oh]:"Custom"};function vy(s,e){let t=yy[e];return t===void 0?(Ae("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Ic=new T;function My(){Ye.getLuminanceCoefficients(Ic);let s=Ic.x.toFixed(4),e=Ic.y.toFixed(4),t=Ic.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function by(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_a).join(`
`)}function Sy(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ey(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function _a(s){return s!==""}function Af(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Rf(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var wy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nh(s){return s.replace(wy,Ay)}var Ty=new Map;function Ay(s,e){let t=Xe[e];if(t===void 0){let n=Ty.get(e);if(n!==void 0)t=Xe[n],Ae('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Nh(t)}var Ry=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cf(s){return s.replace(Ry,Cy)}function Cy(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Pf(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Py={[ms]:"SHADOWMAP_TYPE_PCF",[rr]:"SHADOWMAP_TYPE_VSM"};function Iy(s){return Py[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Ly={[Xi]:"ENVMAP_TYPE_CUBE",[gs]:"ENVMAP_TYPE_CUBE",[oa]:"ENVMAP_TYPE_CUBE_UV"};function Dy(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":Ly[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var Ny={[gs]:"ENVMAP_MODE_REFRACTION"};function Uy(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":Ny[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Fy={[Ho]:"ENVMAP_BLENDING_MULTIPLY",[Yd]:"ENVMAP_BLENDING_MIX",[Zd]:"ENVMAP_BLENDING_ADD"};function Oy(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":Fy[s.combine]||"ENVMAP_BLENDING_NONE"}function By(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function zy(s,e,t,n){let i=s.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=Iy(t),l=Dy(t),h=Uy(t),u=Oy(t),d=By(t),f=by(t),p=Sy(r),x=i.createProgram(),m,g,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(_a).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(_a).join(`
`),g.length>0&&(g+=`
`)):(m=[Pf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_a).join(`
`),g=[Pf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Bn?"#define TONE_MAPPING":"",t.toneMapping!==Bn?Xe.tonemapping_pars_fragment:"",t.toneMapping!==Bn?vy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,_y("linearToOutputTexel",t.outputColorSpace),My(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(_a).join(`
`)),a=Nh(a),a=Af(a,t),a=Rf(a,t),o=Nh(o),o=Af(o,t),o=Rf(o,t),a=Cf(a),o=Cf(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===xh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===xh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let b=M+m+a,_=M+g+o,S=Ef(i,i.VERTEX_SHADER,b),E=Ef(i,i.FRAGMENT_SHADER,_);i.attachShader(x,S),i.attachShader(x,E),t.index0AttributeName!==void 0?i.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function R(I){if(s.debug.checkShaderErrors){let L=i.getProgramInfoLog(x)||"",V=i.getShaderInfoLog(S)||"",q=i.getShaderInfoLog(E)||"",O=L.trim(),X=V.trim(),W=q.trim(),Q=!0,ne=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(Q=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,x,S,E);else{let ae=Tf(i,S,"vertex"),he=Tf(i,E,"fragment");ze("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+O+`
`+ae+`
`+he)}else O!==""?Ae("WebGLProgram: Program Info Log:",O):(X===""||W==="")&&(ne=!1);ne&&(I.diagnostics={runnable:Q,programLog:O,vertexShader:{log:X,prefix:m},fragmentShader:{log:W,prefix:g}})}i.deleteShader(S),i.deleteShader(E),y=new ur(i,x),A=Ey(i,x)}let y;this.getUniforms=function(){return y===void 0&&R(this),y};let A;this.getAttributes=function(){return A===void 0&&R(this),A};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=i.getProgramParameter(x,py)),P},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=my++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=S,this.fragmentShader=E,this}var ky=0,Uh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Fh(e),t.set(e,n)),n}},Fh=class{constructor(e){this.id=ky++,this.code=e,this.usedTimes=0}};function Hy(s){return s===Yi||s===da||s===fa}function Vy(s,e,t,n,i,r){let a=new qs,o=new Uh,c=new Set,l=[],h=new Map,u=n.logarithmicDepthBuffer,d=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(y){return c.add(y),y===0?"uv":`uv${y}`}function x(y,A,P,I,L,V){let q=I.fog,O=L.geometry,X=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?I.environment:null,W=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,Q=e.get(y.envMap||X,W),ne=Q&&Q.mapping===oa?Q.image.height:null,ae=f[y.type];y.precision!==null&&(d=n.getMaxPrecision(y.precision),d!==y.precision&&Ae("WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));let he=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ve=he!==void 0?he.length:0,Je=0;O.morphAttributes.position!==void 0&&(Je=1),O.morphAttributes.normal!==void 0&&(Je=2),O.morphAttributes.color!==void 0&&(Je=3);let _t,et,$,re;if(ae){let Te=ni[ae];_t=Te.vertexShader,et=Te.fragmentShader}else{_t=y.vertexShader,et=y.fragmentShader;let Te=o.getVertexShaderStage(y),bt=o.getFragmentShaderStage(y);o.update(y,Te,bt),$=Te.id,re=bt.id}let ie=s.getRenderTarget(),k=s.state.buffers.depth.getReversed(),Z=L.isInstancedMesh===!0,ee=L.isBatchedMesh===!0,Ee=!!y.map,xe=!!y.matcap,Se=!!Q,Ue=!!y.aoMap,Re=!!y.lightMap,rt=!!y.bumpMap&&y.wireframe===!1,tt=!!y.normalMap,kt=!!y.displacementMap,Wt=!!y.emissiveMap,Mt=!!y.metalnessMap,Lt=!!y.roughnessMap,N=y.anisotropy>0,on=y.clearcoat>0,ot=y.dispersion>0,C=y.iridescence>0,v=y.sheen>0,F=y.transmission>0,H=N&&!!y.anisotropyMap,Y=on&&!!y.clearcoatMap,se=on&&!!y.clearcoatNormalMap,le=on&&!!y.clearcoatRoughnessMap,K=C&&!!y.iridescenceMap,J=C&&!!y.iridescenceThicknessMap,ue=v&&!!y.sheenColorMap,Le=v&&!!y.sheenRoughnessMap,pe=!!y.specularMap,de=!!y.specularColorMap,Fe=!!y.specularIntensityMap,Be=F&&!!y.transmissionMap,Ve=F&&!!y.thicknessMap,D=!!y.gradientMap,ce=!!y.alphaMap,j=y.alphaTest>0,fe=!!y.alphaHash,ye=!!y.extensions,te=Bn;y.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(te=s.toneMapping);let Ie={shaderID:ae,shaderType:y.type,shaderName:y.name,vertexShader:_t,fragmentShader:et,defines:y.defines,customVertexShaderID:$,customFragmentShaderID:re,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:ee,batchingColor:ee&&L._colorsTexture!==null,instancing:Z,instancingColor:Z&&L.instanceColor!==null,instancingMorph:Z&&L.morphTexture!==null,outputColorSpace:ie===null?s.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Ye.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Ee,matcap:xe,envMap:Se,envMapMode:Se&&Q.mapping,envMapCubeUVHeight:ne,aoMap:Ue,lightMap:Re,bumpMap:rt,normalMap:tt,displacementMap:kt,emissiveMap:Wt,normalMapObjectSpace:tt&&y.normalMapType===Jd,normalMapTangentSpace:tt&&y.normalMapType===ma,packedNormalMap:tt&&y.normalMapType===ma&&Hy(y.normalMap.format),metalnessMap:Mt,roughnessMap:Lt,anisotropy:N,anisotropyMap:H,clearcoat:on,clearcoatMap:Y,clearcoatNormalMap:se,clearcoatRoughnessMap:le,dispersion:ot,iridescence:C,iridescenceMap:K,iridescenceThicknessMap:J,sheen:v,sheenColorMap:ue,sheenRoughnessMap:Le,specularMap:pe,specularColorMap:de,specularIntensityMap:Fe,transmission:F,transmissionMap:Be,thicknessMap:Ve,gradientMap:D,opaque:y.transparent===!1&&y.blending===ss&&y.alphaToCoverage===!1,alphaMap:ce,alphaTest:j,alphaHash:fe,combine:y.combine,mapUv:Ee&&p(y.map.channel),aoMapUv:Ue&&p(y.aoMap.channel),lightMapUv:Re&&p(y.lightMap.channel),bumpMapUv:rt&&p(y.bumpMap.channel),normalMapUv:tt&&p(y.normalMap.channel),displacementMapUv:kt&&p(y.displacementMap.channel),emissiveMapUv:Wt&&p(y.emissiveMap.channel),metalnessMapUv:Mt&&p(y.metalnessMap.channel),roughnessMapUv:Lt&&p(y.roughnessMap.channel),anisotropyMapUv:H&&p(y.anisotropyMap.channel),clearcoatMapUv:Y&&p(y.clearcoatMap.channel),clearcoatNormalMapUv:se&&p(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:le&&p(y.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&p(y.iridescenceMap.channel),iridescenceThicknessMapUv:J&&p(y.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&p(y.sheenColorMap.channel),sheenRoughnessMapUv:Le&&p(y.sheenRoughnessMap.channel),specularMapUv:pe&&p(y.specularMap.channel),specularColorMapUv:de&&p(y.specularColorMap.channel),specularIntensityMapUv:Fe&&p(y.specularIntensityMap.channel),transmissionMapUv:Be&&p(y.transmissionMap.channel),thicknessMapUv:Ve&&p(y.thicknessMap.channel),alphaMapUv:ce&&p(y.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(tt||N),vertexNormals:!!O.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!O.attributes.uv&&(Ee||ce),fog:!!q,useFog:y.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||O.attributes.normal===void 0&&tt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:k,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:ve,morphTextureStride:Je,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:V.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:te,decodeVideoTexture:Ee&&y.map.isVideoTexture===!0&&Ye.getTransfer(y.map.colorSpace)===at,decodeVideoTextureEmissive:Wt&&y.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(y.emissiveMap.colorSpace)===at,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ft,flipSided:y.side===an,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ye&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ye&&y.extensions.multiDraw===!0||ee)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ie.vertexUv1s=c.has(1),Ie.vertexUv2s=c.has(2),Ie.vertexUv3s=c.has(3),c.clear(),Ie}function m(y){let A=[];if(y.shaderID?A.push(y.shaderID):(A.push(y.customVertexShaderID),A.push(y.customFragmentShaderID)),y.defines!==void 0)for(let P in y.defines)A.push(P),A.push(y.defines[P]);return y.isRawShaderMaterial===!1&&(g(A,y),M(A,y),A.push(s.outputColorSpace)),A.push(y.customProgramCacheKey),A.join()}function g(y,A){y.push(A.precision),y.push(A.outputColorSpace),y.push(A.envMapMode),y.push(A.envMapCubeUVHeight),y.push(A.mapUv),y.push(A.alphaMapUv),y.push(A.lightMapUv),y.push(A.aoMapUv),y.push(A.bumpMapUv),y.push(A.normalMapUv),y.push(A.displacementMapUv),y.push(A.emissiveMapUv),y.push(A.metalnessMapUv),y.push(A.roughnessMapUv),y.push(A.anisotropyMapUv),y.push(A.clearcoatMapUv),y.push(A.clearcoatNormalMapUv),y.push(A.clearcoatRoughnessMapUv),y.push(A.iridescenceMapUv),y.push(A.iridescenceThicknessMapUv),y.push(A.sheenColorMapUv),y.push(A.sheenRoughnessMapUv),y.push(A.specularMapUv),y.push(A.specularColorMapUv),y.push(A.specularIntensityMapUv),y.push(A.transmissionMapUv),y.push(A.thicknessMapUv),y.push(A.combine),y.push(A.fogExp2),y.push(A.sizeAttenuation),y.push(A.morphTargetsCount),y.push(A.morphAttributeCount),y.push(A.numDirLights),y.push(A.numPointLights),y.push(A.numSpotLights),y.push(A.numSpotLightMaps),y.push(A.numHemiLights),y.push(A.numRectAreaLights),y.push(A.numDirLightShadows),y.push(A.numPointLightShadows),y.push(A.numSpotLightShadows),y.push(A.numSpotLightShadowsWithMaps),y.push(A.numLightProbes),y.push(A.shadowMapType),y.push(A.toneMapping),y.push(A.numClippingPlanes),y.push(A.numClipIntersection),y.push(A.depthPacking)}function M(y,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function b(y){let A=f[y.type],P;if(A){let I=ni[A];P=uf.clone(I.uniforms)}else P=y.uniforms;return P}function _(y,A){let P=h.get(A);return P!==void 0?++P.usedTimes:(P=new zy(s,A,y,i),l.push(P),h.set(A,P)),P}function S(y){if(--y.usedTimes===0){let A=l.indexOf(y);l[A]=l[l.length-1],l.pop(),h.delete(y.cacheKey),y.destroy()}}function E(y){o.remove(y)}function R(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:b,acquireProgram:_,releaseProgram:S,releaseShaderCache:E,programs:l,dispose:R}}function Gy(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function Wy(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function If(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Lf(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,p,x,m,g){let M=s[e];return M===void 0?(M={id:d.id,object:d,geometry:f,material:p,materialVariant:a(d),groupOrder:x,renderOrder:d.renderOrder,z:m,group:g},s[e]=M):(M.id=d.id,M.object=d,M.geometry=f,M.material=p,M.materialVariant=a(d),M.groupOrder=x,M.renderOrder=d.renderOrder,M.z=m,M.group=g),e++,M}function c(d,f,p,x,m,g){let M=o(d,f,p,x,m,g);p.transmission>0?n.push(M):p.transparent===!0?i.push(M):t.push(M)}function l(d,f,p,x,m,g){let M=o(d,f,p,x,m,g);p.transmission>0?n.unshift(M):p.transparent===!0?i.unshift(M):t.unshift(M)}function h(d,f,p){t.length>1&&t.sort(d||Wy),n.length>1&&n.sort(f||If),i.length>1&&i.sort(f||If),p&&(t.reverse(),n.reverse(),i.reverse())}function u(){for(let d=e,f=s.length;d<f;d++){let p=s[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:c,unshift:l,finish:u,sort:h}}function Xy(){let s=new WeakMap;function e(n,i){let r=s.get(n),a;return r===void 0?(a=new Lf,s.set(n,[a])):i>=r.length?(a=new Lf,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function qy(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new T,color:new we};break;case"SpotLight":t={position:new T,direction:new T,color:new we,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new T,color:new we,distance:0,decay:0};break;case"HemisphereLight":t={direction:new T,skyColor:new we,groundColor:new we};break;case"RectAreaLight":t={color:new we,position:new T,halfWidth:new T,halfHeight:new T};break}return s[e.id]=t,t}}}function Yy(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var Zy=0;function Ky(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function $y(s){let e=new qy,t=Yy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new T);let i=new T,r=new ke,a=new ke;function o(l){let h=0,u=0,d=0;for(let A=0;A<9;A++)n.probe[A].set(0,0,0);let f=0,p=0,x=0,m=0,g=0,M=0,b=0,_=0,S=0,E=0,R=0;l.sort(Ky);for(let A=0,P=l.length;A<P;A++){let I=l[A],L=I.color,V=I.intensity,q=I.distance,O=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Yi?O=I.shadow.map.texture:O=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=L.r*V,u+=L.g*V,d+=L.b*V;else if(I.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(I.sh.coefficients[X],V);R++}else if(I.isDirectionalLight){let X=e.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let W=I.shadow,Q=t.get(I);Q.shadowIntensity=W.intensity,Q.shadowBias=W.bias,Q.shadowNormalBias=W.normalBias,Q.shadowRadius=W.radius,Q.shadowMapSize=W.mapSize,n.directionalShadow[f]=Q,n.directionalShadowMap[f]=O,n.directionalShadowMatrix[f]=I.shadow.matrix,M++}n.directional[f]=X,f++}else if(I.isSpotLight){let X=e.get(I);X.position.setFromMatrixPosition(I.matrixWorld),X.color.copy(L).multiplyScalar(V),X.distance=q,X.coneCos=Math.cos(I.angle),X.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),X.decay=I.decay,n.spot[x]=X;let W=I.shadow;if(I.map&&(n.spotLightMap[S]=I.map,S++,W.updateMatrices(I),I.castShadow&&E++),n.spotLightMatrix[x]=W.matrix,I.castShadow){let Q=t.get(I);Q.shadowIntensity=W.intensity,Q.shadowBias=W.bias,Q.shadowNormalBias=W.normalBias,Q.shadowRadius=W.radius,Q.shadowMapSize=W.mapSize,n.spotShadow[x]=Q,n.spotShadowMap[x]=O,_++}x++}else if(I.isRectAreaLight){let X=e.get(I);X.color.copy(L).multiplyScalar(V),X.halfWidth.set(I.width*.5,0,0),X.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=X,m++}else if(I.isPointLight){let X=e.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),X.distance=I.distance,X.decay=I.decay,I.castShadow){let W=I.shadow,Q=t.get(I);Q.shadowIntensity=W.intensity,Q.shadowBias=W.bias,Q.shadowNormalBias=W.normalBias,Q.shadowRadius=W.radius,Q.shadowMapSize=W.mapSize,Q.shadowCameraNear=W.camera.near,Q.shadowCameraFar=W.camera.far,n.pointShadow[p]=Q,n.pointShadowMap[p]=O,n.pointShadowMatrix[p]=I.shadow.matrix,b++}n.point[p]=X,p++}else if(I.isHemisphereLight){let X=e.get(I);X.skyColor.copy(I.color).multiplyScalar(V),X.groundColor.copy(I.groundColor).multiplyScalar(V),n.hemi[g]=X,g++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=me.LTC_FLOAT_1,n.rectAreaLTC2=me.LTC_FLOAT_2):(n.rectAreaLTC1=me.LTC_HALF_1,n.rectAreaLTC2=me.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let y=n.hash;(y.directionalLength!==f||y.pointLength!==p||y.spotLength!==x||y.rectAreaLength!==m||y.hemiLength!==g||y.numDirectionalShadows!==M||y.numPointShadows!==b||y.numSpotShadows!==_||y.numSpotMaps!==S||y.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=m,n.point.length=p,n.hemi.length=g,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=_+S-E,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=R,y.directionalLength=f,y.pointLength=p,y.spotLength=x,y.rectAreaLength=m,y.hemiLength=g,y.numDirectionalShadows=M,y.numPointShadows=b,y.numSpotShadows=_,y.numSpotMaps=S,y.numLightProbes=R,n.version=Zy++)}function c(l,h){let u=0,d=0,f=0,p=0,x=0,m=h.matrixWorldInverse;for(let g=0,M=l.length;g<M;g++){let b=l[g];if(b.isDirectionalLight){let _=n.directional[u];_.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),u++}else if(b.isSpotLight){let _=n.spot[f];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),f++}else if(b.isRectAreaLight){let _=n.rectArea[p];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(m),a.identity(),r.copy(b.matrixWorld),r.premultiply(m),a.extractRotation(r),_.halfWidth.set(b.width*.5,0,0),_.halfHeight.set(0,b.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),p++}else if(b.isPointLight){let _=n.point[d];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(m),d++}else if(b.isHemisphereLight){let _=n.hemi[x];_.direction.setFromMatrixPosition(b.matrixWorld),_.direction.transformDirection(m),x++}}}return{setup:o,setupView:c,state:n}}function Df(s){let e=new $y(s),t=[],n=[],i=[];function r(d){u.camera=d,t.length=0,n.length=0,i.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function c(d){i.push(d)}function l(){e.setup(t)}function h(d){e.setupView(t,d)}let u={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function jy(s){let e=new WeakMap;function t(i,r=0){let a=e.get(i),o;return a===void 0?(o=new Df(s),e.set(i,[o])):r>=a.length?(o=new Df(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var Jy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Qy=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ev=[new T(1,0,0),new T(-1,0,0),new T(0,1,0),new T(0,-1,0),new T(0,0,1),new T(0,0,-1)],tv=[new T(0,-1,0),new T(0,-1,0),new T(0,0,1),new T(0,0,-1),new T(0,-1,0),new T(0,-1,0)],Nf=new ke,xa=new T,Ch=new T;function nv(s,e,t){let n=new zi,i=new oe,r=new oe,a=new lt,o=new Io,c=new Lo,l={},h=t.maxTextureSize,u={[Nn]:an,[an]:Nn,[Ft]:Ft},d=new rn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new oe},radius:{value:4}},vertexShader:Jy,fragmentShader:Qy}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let p=new Qe;p.setAttribute("position",new At(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Pe(p,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ms;let g=this.type;this.render=function(E,R,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===Rd&&(Ae("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=ms);let A=s.getRenderTarget(),P=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),L=s.state;L.setBlending(Qn),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let V=g!==this.type;V&&R.traverse(function(q){q.material&&(Array.isArray(q.material)?q.material.forEach(O=>O.needsUpdate=!0):q.material.needsUpdate=!0)});for(let q=0,O=E.length;q<O;q++){let X=E[q],W=X.shadow;if(W===void 0){Ae("WebGLShadowMap:",X,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);let Q=W.getFrameExtents();i.multiply(Q),r.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/Q.x),i.x=r.x*Q.x,W.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/Q.y),i.y=r.y*Q.y,W.mapSize.y=r.y));let ne=s.state.buffers.depth.getReversed();if(W.camera._reversedDepth=ne,W.map===null||V===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===rr){if(X.isPointLight){Ae("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new gn(i.x,i.y,{format:Yi,type:ei,minFilter:Ct,magFilter:Ct,generateMipmaps:!1}),W.map.texture.name=X.name+".shadowMap",W.map.depthTexture=new mi(i.x,i.y,_n),W.map.depthTexture.name=X.name+".shadowMapDepth",W.map.depthTexture.format=Xn,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Rt,W.map.depthTexture.magFilter=Rt}else X.isPointLight?(W.map=new Dc(i.x),W.map.depthTexture=new Eo(i.x,kn)):(W.map=new gn(i.x,i.y),W.map.depthTexture=new mi(i.x,i.y,kn)),W.map.depthTexture.name=X.name+".shadowMap",W.map.depthTexture.format=Xn,this.type===ms?(W.map.depthTexture.compareFunction=ne?Cc:Rc,W.map.depthTexture.minFilter=Ct,W.map.depthTexture.magFilter=Ct):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Rt,W.map.depthTexture.magFilter=Rt);W.camera.updateProjectionMatrix()}let ae=W.map.isWebGLCubeRenderTarget?6:1;for(let he=0;he<ae;he++){if(W.map.isWebGLCubeRenderTarget)s.setRenderTarget(W.map,he),s.clear();else{he===0&&(s.setRenderTarget(W.map),s.clear());let ve=W.getViewport(he);a.set(r.x*ve.x,r.y*ve.y,r.x*ve.z,r.y*ve.w),L.viewport(a)}if(X.isPointLight){let ve=W.camera,Je=W.matrix,_t=X.distance||ve.far;_t!==ve.far&&(ve.far=_t,ve.updateProjectionMatrix()),xa.setFromMatrixPosition(X.matrixWorld),ve.position.copy(xa),Ch.copy(ve.position),Ch.add(ev[he]),ve.up.copy(tv[he]),ve.lookAt(Ch),ve.updateMatrixWorld(),Je.makeTranslation(-xa.x,-xa.y,-xa.z),Nf.multiplyMatrices(ve.projectionMatrix,ve.matrixWorldInverse),W._frustum.setFromProjectionMatrix(Nf,ve.coordinateSystem,ve.reversedDepth)}else W.updateMatrices(X);n=W.getFrustum(),_(R,y,W.camera,X,this.type)}W.isPointLightShadow!==!0&&this.type===rr&&M(W,y),W.needsUpdate=!1}g=this.type,m.needsUpdate=!1,s.setRenderTarget(A,P,I)};function M(E,R){let y=e.update(x);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new gn(i.x,i.y,{format:Yi,type:ei})),d.uniforms.shadow_pass.value=E.map.depthTexture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,s.setRenderTarget(E.mapPass),s.clear(),s.renderBufferDirect(R,null,y,d,x,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,s.setRenderTarget(E.map),s.clear(),s.renderBufferDirect(R,null,y,f,x,null)}function b(E,R,y,A){let P=null,I=y.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(I!==void 0)P=I;else if(P=y.isPointLight===!0?c:o,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let L=P.uuid,V=R.uuid,q=l[L];q===void 0&&(q={},l[L]=q);let O=q[V];O===void 0&&(O=P.clone(),q[V]=O,R.addEventListener("dispose",S)),P=O}if(P.visible=R.visible,P.wireframe=R.wireframe,A===rr?P.side=R.shadowSide!==null?R.shadowSide:R.side:P.side=R.shadowSide!==null?R.shadowSide:u[R.side],P.alphaMap=R.alphaMap,P.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,P.map=R.map,P.clipShadows=R.clipShadows,P.clippingPlanes=R.clippingPlanes,P.clipIntersection=R.clipIntersection,P.displacementMap=R.displacementMap,P.displacementScale=R.displacementScale,P.displacementBias=R.displacementBias,P.wireframeLinewidth=R.wireframeLinewidth,P.linewidth=R.linewidth,y.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let L=s.properties.get(P);L.light=y}return P}function _(E,R,y,A,P){if(E.visible===!1)return;if(E.layers.test(R.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&P===rr)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,E.matrixWorld);let V=e.update(E),q=E.material;if(Array.isArray(q)){let O=V.groups;for(let X=0,W=O.length;X<W;X++){let Q=O[X],ne=q[Q.materialIndex];if(ne&&ne.visible){let ae=b(E,ne,A,P);E.onBeforeShadow(s,E,R,y,V,ae,Q),s.renderBufferDirect(y,null,V,ae,E,Q),E.onAfterShadow(s,E,R,y,V,ae,Q)}}}else if(q.visible){let O=b(E,q,A,P);E.onBeforeShadow(s,E,R,y,V,O,null),s.renderBufferDirect(y,null,V,O,E,null),E.onAfterShadow(s,E,R,y,V,O,null)}}let L=E.children;for(let V=0,q=L.length;V<q;V++)_(L[V],R,y,A,P)}function S(E){E.target.removeEventListener("dispose",S);for(let y in l){let A=l[y],P=E.target.uuid;P in A&&(A[P].dispose(),delete A[P])}}}function iv(s,e){function t(){let D=!1,ce=new lt,j=null,fe=new lt(0,0,0,0);return{setMask:function(ye){j!==ye&&!D&&(s.colorMask(ye,ye,ye,ye),j=ye)},setLocked:function(ye){D=ye},setClear:function(ye,te,Ie,Te,bt){bt===!0&&(ye*=Te,te*=Te,Ie*=Te),ce.set(ye,te,Ie,Te),fe.equals(ce)===!1&&(s.clearColor(ye,te,Ie,Te),fe.copy(ce))},reset:function(){D=!1,j=null,fe.set(-1,0,0,0)}}}function n(){let D=!1,ce=!1,j=null,fe=null,ye=null;return{setReversed:function(te){if(ce!==te){let Ie=e.get("EXT_clip_control");te?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT),ce=te;let Te=ye;ye=null,this.setClear(Te)}},getReversed:function(){return ce},setTest:function(te){te?ie(s.DEPTH_TEST):k(s.DEPTH_TEST)},setMask:function(te){j!==te&&!D&&(s.depthMask(te),j=te)},setFunc:function(te){if(ce&&(te=lf[te]),fe!==te){switch(te){case ho:s.depthFunc(s.NEVER);break;case uo:s.depthFunc(s.ALWAYS);break;case fo:s.depthFunc(s.LESS);break;case rs:s.depthFunc(s.LEQUAL);break;case po:s.depthFunc(s.EQUAL);break;case mo:s.depthFunc(s.GEQUAL);break;case go:s.depthFunc(s.GREATER);break;case xo:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}fe=te}},setLocked:function(te){D=te},setClear:function(te){ye!==te&&(ye=te,ce&&(te=1-te),s.clearDepth(te))},reset:function(){D=!1,j=null,fe=null,ye=null,ce=!1}}}function i(){let D=!1,ce=null,j=null,fe=null,ye=null,te=null,Ie=null,Te=null,bt=null;return{setTest:function(mt){D||(mt?ie(s.STENCIL_TEST):k(s.STENCIL_TEST))},setMask:function(mt){ce!==mt&&!D&&(s.stencilMask(mt),ce=mt)},setFunc:function(mt,Hn,Vn){(j!==mt||fe!==Hn||ye!==Vn)&&(s.stencilFunc(mt,Hn,Vn),j=mt,fe=Hn,ye=Vn)},setOp:function(mt,Hn,Vn){(te!==mt||Ie!==Hn||Te!==Vn)&&(s.stencilOp(mt,Hn,Vn),te=mt,Ie=Hn,Te=Vn)},setLocked:function(mt){D=mt},setClear:function(mt){bt!==mt&&(s.clearStencil(mt),bt=mt)},reset:function(){D=!1,ce=null,j=null,fe=null,ye=null,te=null,Ie=null,Te=null,bt=null}}}let r=new t,a=new n,o=new i,c=new WeakMap,l=new WeakMap,h={},u={},d={},f=new WeakMap,p=[],x=null,m=!1,g=null,M=null,b=null,_=null,S=null,E=null,R=null,y=new we(0,0,0),A=0,P=!1,I=null,L=null,V=null,q=null,O=null,X=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,Q=0,ne=s.getParameter(s.VERSION);ne.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(ne)[1]),W=Q>=1):ne.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),W=Q>=2);let ae=null,he={},ve=s.getParameter(s.SCISSOR_BOX),Je=s.getParameter(s.VIEWPORT),_t=new lt().fromArray(ve),et=new lt().fromArray(Je);function $(D,ce,j,fe){let ye=new Uint8Array(4),te=s.createTexture();s.bindTexture(D,te),s.texParameteri(D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(D,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ie=0;Ie<j;Ie++)D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY?s.texImage3D(ce,0,s.RGBA,1,1,fe,0,s.RGBA,s.UNSIGNED_BYTE,ye):s.texImage2D(ce+Ie,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ye);return te}let re={};re[s.TEXTURE_2D]=$(s.TEXTURE_2D,s.TEXTURE_2D,1),re[s.TEXTURE_CUBE_MAP]=$(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[s.TEXTURE_2D_ARRAY]=$(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),re[s.TEXTURE_3D]=$(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ie(s.DEPTH_TEST),a.setFunc(rs),rt(!1),tt(Ql),ie(s.CULL_FACE),Ue(Qn);function ie(D){h[D]!==!0&&(s.enable(D),h[D]=!0)}function k(D){h[D]!==!1&&(s.disable(D),h[D]=!1)}function Z(D,ce){return d[D]!==ce?(s.bindFramebuffer(D,ce),d[D]=ce,D===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=ce),D===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=ce),!0):!1}function ee(D,ce){let j=p,fe=!1;if(D){j=f.get(ce),j===void 0&&(j=[],f.set(ce,j));let ye=D.textures;if(j.length!==ye.length||j[0]!==s.COLOR_ATTACHMENT0){for(let te=0,Ie=ye.length;te<Ie;te++)j[te]=s.COLOR_ATTACHMENT0+te;j.length=ye.length,fe=!0}}else j[0]!==s.BACK&&(j[0]=s.BACK,fe=!0);fe&&s.drawBuffers(j)}function Ee(D){return x!==D?(s.useProgram(D),x=D,!0):!1}let xe={[Fi]:s.FUNC_ADD,[Pd]:s.FUNC_SUBTRACT,[Id]:s.FUNC_REVERSE_SUBTRACT};xe[Ld]=s.MIN,xe[Dd]=s.MAX;let Se={[Nd]:s.ZERO,[Ud]:s.ONE,[Fd]:s.SRC_COLOR,[co]:s.SRC_ALPHA,[Vd]:s.SRC_ALPHA_SATURATE,[kd]:s.DST_COLOR,[Bd]:s.DST_ALPHA,[Od]:s.ONE_MINUS_SRC_COLOR,[lo]:s.ONE_MINUS_SRC_ALPHA,[Hd]:s.ONE_MINUS_DST_COLOR,[zd]:s.ONE_MINUS_DST_ALPHA,[Gd]:s.CONSTANT_COLOR,[Wd]:s.ONE_MINUS_CONSTANT_COLOR,[Xd]:s.CONSTANT_ALPHA,[qd]:s.ONE_MINUS_CONSTANT_ALPHA};function Ue(D,ce,j,fe,ye,te,Ie,Te,bt,mt){if(D===Qn){m===!0&&(k(s.BLEND),m=!1);return}if(m===!1&&(ie(s.BLEND),m=!0),D!==Cd){if(D!==g||mt!==P){if((M!==Fi||S!==Fi)&&(s.blendEquation(s.FUNC_ADD),M=Fi,S=Fi),mt)switch(D){case ss:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case eh:s.blendFunc(s.ONE,s.ONE);break;case th:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case nh:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:ze("WebGLState: Invalid blending: ",D);break}else switch(D){case ss:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case eh:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case th:ze("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case nh:ze("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ze("WebGLState: Invalid blending: ",D);break}b=null,_=null,E=null,R=null,y.set(0,0,0),A=0,g=D,P=mt}return}ye=ye||ce,te=te||j,Ie=Ie||fe,(ce!==M||ye!==S)&&(s.blendEquationSeparate(xe[ce],xe[ye]),M=ce,S=ye),(j!==b||fe!==_||te!==E||Ie!==R)&&(s.blendFuncSeparate(Se[j],Se[fe],Se[te],Se[Ie]),b=j,_=fe,E=te,R=Ie),(Te.equals(y)===!1||bt!==A)&&(s.blendColor(Te.r,Te.g,Te.b,bt),y.copy(Te),A=bt),g=D,P=!1}function Re(D,ce){D.side===Ft?k(s.CULL_FACE):ie(s.CULL_FACE);let j=D.side===an;ce&&(j=!j),rt(j),D.blending===ss&&D.transparent===!1?Ue(Qn):Ue(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let fe=D.stencilWrite;o.setTest(fe),fe&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Wt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ie(s.SAMPLE_ALPHA_TO_COVERAGE):k(s.SAMPLE_ALPHA_TO_COVERAGE)}function rt(D){I!==D&&(D?s.frontFace(s.CW):s.frontFace(s.CCW),I=D)}function tt(D){D!==Td?(ie(s.CULL_FACE),D!==L&&(D===Ql?s.cullFace(s.BACK):D===Ad?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):k(s.CULL_FACE),L=D}function kt(D){D!==V&&(W&&s.lineWidth(D),V=D)}function Wt(D,ce,j){D?(ie(s.POLYGON_OFFSET_FILL),(q!==ce||O!==j)&&(q=ce,O=j,a.getReversed()&&(ce=-ce),s.polygonOffset(ce,j))):k(s.POLYGON_OFFSET_FILL)}function Mt(D){D?ie(s.SCISSOR_TEST):k(s.SCISSOR_TEST)}function Lt(D){D===void 0&&(D=s.TEXTURE0+X-1),ae!==D&&(s.activeTexture(D),ae=D)}function N(D,ce,j){j===void 0&&(ae===null?j=s.TEXTURE0+X-1:j=ae);let fe=he[j];fe===void 0&&(fe={type:void 0,texture:void 0},he[j]=fe),(fe.type!==D||fe.texture!==ce)&&(ae!==j&&(s.activeTexture(j),ae=j),s.bindTexture(D,ce||re[D]),fe.type=D,fe.texture=ce)}function on(){let D=he[ae];D!==void 0&&D.type!==void 0&&(s.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function ot(){try{s.compressedTexImage2D(...arguments)}catch(D){ze("WebGLState:",D)}}function C(){try{s.compressedTexImage3D(...arguments)}catch(D){ze("WebGLState:",D)}}function v(){try{s.texSubImage2D(...arguments)}catch(D){ze("WebGLState:",D)}}function F(){try{s.texSubImage3D(...arguments)}catch(D){ze("WebGLState:",D)}}function H(){try{s.compressedTexSubImage2D(...arguments)}catch(D){ze("WebGLState:",D)}}function Y(){try{s.compressedTexSubImage3D(...arguments)}catch(D){ze("WebGLState:",D)}}function se(){try{s.texStorage2D(...arguments)}catch(D){ze("WebGLState:",D)}}function le(){try{s.texStorage3D(...arguments)}catch(D){ze("WebGLState:",D)}}function K(){try{s.texImage2D(...arguments)}catch(D){ze("WebGLState:",D)}}function J(){try{s.texImage3D(...arguments)}catch(D){ze("WebGLState:",D)}}function ue(D){return u[D]!==void 0?u[D]:s.getParameter(D)}function Le(D,ce){u[D]!==ce&&(s.pixelStorei(D,ce),u[D]=ce)}function pe(D){_t.equals(D)===!1&&(s.scissor(D.x,D.y,D.z,D.w),_t.copy(D))}function de(D){et.equals(D)===!1&&(s.viewport(D.x,D.y,D.z,D.w),et.copy(D))}function Fe(D,ce){let j=l.get(ce);j===void 0&&(j=new WeakMap,l.set(ce,j));let fe=j.get(D);fe===void 0&&(fe=s.getUniformBlockIndex(ce,D.name),j.set(D,fe))}function Be(D,ce){let fe=l.get(ce).get(D);c.get(ce)!==fe&&(s.uniformBlockBinding(ce,fe,D.__bindingPointIndex),c.set(ce,fe))}function Ve(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},u={},ae=null,he={},d={},f=new WeakMap,p=[],x=null,m=!1,g=null,M=null,b=null,_=null,S=null,E=null,R=null,y=new we(0,0,0),A=0,P=!1,I=null,L=null,V=null,q=null,O=null,_t.set(0,0,s.canvas.width,s.canvas.height),et.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ie,disable:k,bindFramebuffer:Z,drawBuffers:ee,useProgram:Ee,setBlending:Ue,setMaterial:Re,setFlipSided:rt,setCullFace:tt,setLineWidth:kt,setPolygonOffset:Wt,setScissorTest:Mt,activeTexture:Lt,bindTexture:N,unbindTexture:on,compressedTexImage2D:ot,compressedTexImage3D:C,texImage2D:K,texImage3D:J,pixelStorei:Le,getParameter:ue,updateUBOMapping:Fe,uniformBlockBinding:Be,texStorage2D:se,texStorage3D:le,texSubImage2D:v,texSubImage3D:F,compressedTexSubImage2D:H,compressedTexSubImage3D:Y,scissor:pe,viewport:de,reset:Ve}}function sv(s,e,t,n,i,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new oe,h=new WeakMap,u=new Set,d,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(C,v){return p?new OffscreenCanvas(C,v):Gs("canvas")}function m(C,v,F){let H=1,Y=ot(C);if((Y.width>F||Y.height>F)&&(H=F/Math.max(Y.width,Y.height)),H<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let se=Math.floor(H*Y.width),le=Math.floor(H*Y.height);d===void 0&&(d=x(se,le));let K=v?x(se,le):d;return K.width=se,K.height=le,K.getContext("2d").drawImage(C,0,0,se,le),Ae("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+se+"x"+le+")."),K}else return"data"in C&&Ae("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),C;return C}function g(C){return C.generateMipmaps}function M(C){s.generateMipmap(C)}function b(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function _(C,v,F,H,Y,se=!1){if(C!==null){if(s[C]!==void 0)return s[C];Ae("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let le;H&&(le=e.get("EXT_texture_norm16"),le||Ae("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=v;if(v===s.RED&&(F===s.FLOAT&&(K=s.R32F),F===s.HALF_FLOAT&&(K=s.R16F),F===s.UNSIGNED_BYTE&&(K=s.R8),F===s.UNSIGNED_SHORT&&le&&(K=le.R16_EXT),F===s.SHORT&&le&&(K=le.R16_SNORM_EXT)),v===s.RED_INTEGER&&(F===s.UNSIGNED_BYTE&&(K=s.R8UI),F===s.UNSIGNED_SHORT&&(K=s.R16UI),F===s.UNSIGNED_INT&&(K=s.R32UI),F===s.BYTE&&(K=s.R8I),F===s.SHORT&&(K=s.R16I),F===s.INT&&(K=s.R32I)),v===s.RG&&(F===s.FLOAT&&(K=s.RG32F),F===s.HALF_FLOAT&&(K=s.RG16F),F===s.UNSIGNED_BYTE&&(K=s.RG8),F===s.UNSIGNED_SHORT&&le&&(K=le.RG16_EXT),F===s.SHORT&&le&&(K=le.RG16_SNORM_EXT)),v===s.RG_INTEGER&&(F===s.UNSIGNED_BYTE&&(K=s.RG8UI),F===s.UNSIGNED_SHORT&&(K=s.RG16UI),F===s.UNSIGNED_INT&&(K=s.RG32UI),F===s.BYTE&&(K=s.RG8I),F===s.SHORT&&(K=s.RG16I),F===s.INT&&(K=s.RG32I)),v===s.RGB_INTEGER&&(F===s.UNSIGNED_BYTE&&(K=s.RGB8UI),F===s.UNSIGNED_SHORT&&(K=s.RGB16UI),F===s.UNSIGNED_INT&&(K=s.RGB32UI),F===s.BYTE&&(K=s.RGB8I),F===s.SHORT&&(K=s.RGB16I),F===s.INT&&(K=s.RGB32I)),v===s.RGBA_INTEGER&&(F===s.UNSIGNED_BYTE&&(K=s.RGBA8UI),F===s.UNSIGNED_SHORT&&(K=s.RGBA16UI),F===s.UNSIGNED_INT&&(K=s.RGBA32UI),F===s.BYTE&&(K=s.RGBA8I),F===s.SHORT&&(K=s.RGBA16I),F===s.INT&&(K=s.RGBA32I)),v===s.RGB&&(F===s.UNSIGNED_SHORT&&le&&(K=le.RGB16_EXT),F===s.SHORT&&le&&(K=le.RGB16_SNORM_EXT),F===s.UNSIGNED_INT_5_9_9_9_REV&&(K=s.RGB9_E5),F===s.UNSIGNED_INT_10F_11F_11F_REV&&(K=s.R11F_G11F_B10F)),v===s.RGBA){let J=se?Ir:Ye.getTransfer(Y);F===s.FLOAT&&(K=s.RGBA32F),F===s.HALF_FLOAT&&(K=s.RGBA16F),F===s.UNSIGNED_BYTE&&(K=J===at?s.SRGB8_ALPHA8:s.RGBA8),F===s.UNSIGNED_SHORT&&le&&(K=le.RGBA16_EXT),F===s.SHORT&&le&&(K=le.RGBA16_SNORM_EXT),F===s.UNSIGNED_SHORT_4_4_4_4&&(K=s.RGBA4),F===s.UNSIGNED_SHORT_5_5_5_1&&(K=s.RGB5_A1)}return(K===s.R16F||K===s.R32F||K===s.RG16F||K===s.RG32F||K===s.RGBA16F||K===s.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function S(C,v){let F;return C?v===null||v===kn||v===cr?F=s.DEPTH24_STENCIL8:v===_n?F=s.DEPTH32F_STENCIL8:v===or&&(F=s.DEPTH24_STENCIL8,Ae("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===kn||v===cr?F=s.DEPTH_COMPONENT24:v===_n?F=s.DEPTH_COMPONENT32F:v===or&&(F=s.DEPTH_COMPONENT16),F}function E(C,v){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==Rt&&C.minFilter!==Ct?Math.log2(Math.max(v.width,v.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?v.mipmaps.length:1}function R(C){let v=C.target;v.removeEventListener("dispose",R),A(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&u.delete(v)}function y(C){let v=C.target;v.removeEventListener("dispose",y),I(v)}function A(C){let v=n.get(C);if(v.__webglInit===void 0)return;let F=C.source,H=f.get(F);if(H){let Y=H[v.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&P(C),Object.keys(H).length===0&&f.delete(F)}n.remove(C)}function P(C){let v=n.get(C);s.deleteTexture(v.__webglTexture);let F=C.source,H=f.get(F);delete H[v.__cacheKey],a.memory.textures--}function I(C){let v=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(v.__webglFramebuffer[H]))for(let Y=0;Y<v.__webglFramebuffer[H].length;Y++)s.deleteFramebuffer(v.__webglFramebuffer[H][Y]);else s.deleteFramebuffer(v.__webglFramebuffer[H]);v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer[H])}else{if(Array.isArray(v.__webglFramebuffer))for(let H=0;H<v.__webglFramebuffer.length;H++)s.deleteFramebuffer(v.__webglFramebuffer[H]);else s.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&s.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let H=0;H<v.__webglColorRenderbuffer.length;H++)v.__webglColorRenderbuffer[H]&&s.deleteRenderbuffer(v.__webglColorRenderbuffer[H]);v.__webglDepthRenderbuffer&&s.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let F=C.textures;for(let H=0,Y=F.length;H<Y;H++){let se=n.get(F[H]);se.__webglTexture&&(s.deleteTexture(se.__webglTexture),a.memory.textures--),n.remove(F[H])}n.remove(C)}let L=0;function V(){L=0}function q(){return L}function O(C){L=C}function X(){let C=L;return C>=i.maxTextures&&Ae("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),L+=1,C}function W(C){let v=[];return v.push(C.wrapS),v.push(C.wrapT),v.push(C.wrapR||0),v.push(C.magFilter),v.push(C.minFilter),v.push(C.anisotropy),v.push(C.internalFormat),v.push(C.format),v.push(C.type),v.push(C.generateMipmaps),v.push(C.premultiplyAlpha),v.push(C.flipY),v.push(C.unpackAlignment),v.push(C.colorSpace),v.join()}function Q(C,v){let F=n.get(C);if(C.isVideoTexture&&N(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&F.__version!==C.version){let H=C.image;if(H===null)Ae("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)Ae("WebGLRenderer: Texture marked for update but image is incomplete");else{k(F,C,v);return}}else C.isExternalTexture&&(F.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,F.__webglTexture,s.TEXTURE0+v)}function ne(C,v){let F=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&F.__version!==C.version){k(F,C,v);return}else C.isExternalTexture&&(F.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,F.__webglTexture,s.TEXTURE0+v)}function ae(C,v){let F=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&F.__version!==C.version){k(F,C,v);return}t.bindTexture(s.TEXTURE_3D,F.__webglTexture,s.TEXTURE0+v)}function he(C,v){let F=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&F.__version!==C.version){Z(F,C,v);return}t.bindTexture(s.TEXTURE_CUBE_MAP,F.__webglTexture,s.TEXTURE0+v)}let ve={[Oi]:s.REPEAT,[Sn]:s.CLAMP_TO_EDGE,[Hs]:s.MIRRORED_REPEAT},Je={[Rt]:s.NEAREST,[Wo]:s.NEAREST_MIPMAP_NEAREST,[xs]:s.NEAREST_MIPMAP_LINEAR,[Ct]:s.LINEAR,[ar]:s.LINEAR_MIPMAP_NEAREST,[zn]:s.LINEAR_MIPMAP_LINEAR},_t={[Qd]:s.NEVER,[rf]:s.ALWAYS,[ef]:s.LESS,[Rc]:s.LEQUAL,[tf]:s.EQUAL,[Cc]:s.GEQUAL,[nf]:s.GREATER,[sf]:s.NOTEQUAL};function et(C,v){if(v.type===_n&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Ct||v.magFilter===ar||v.magFilter===xs||v.magFilter===zn||v.minFilter===Ct||v.minFilter===ar||v.minFilter===xs||v.minFilter===zn)&&Ae("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,ve[v.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,ve[v.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,ve[v.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,Je[v.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,Je[v.minFilter]),v.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,_t[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Rt||v.minFilter!==xs&&v.minFilter!==zn||v.type===_n&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let F=e.get("EXT_texture_filter_anisotropic");s.texParameterf(C,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,i.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function $(C,v){let F=!1;C.__webglInit===void 0&&(C.__webglInit=!0,v.addEventListener("dispose",R));let H=v.source,Y=f.get(H);Y===void 0&&(Y={},f.set(H,Y));let se=W(v);if(se!==C.__cacheKey){Y[se]===void 0&&(Y[se]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,F=!0),Y[se].usedTimes++;let le=Y[C.__cacheKey];le!==void 0&&(Y[C.__cacheKey].usedTimes--,le.usedTimes===0&&P(v)),C.__cacheKey=se,C.__webglTexture=Y[se].texture}return F}function re(C,v,F){return Math.floor(Math.floor(C/F)/v)}function ie(C,v,F,H){let se=C.updateRanges;if(se.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,v.width,v.height,F,H,v.data);else{se.sort((Le,pe)=>Le.start-pe.start);let le=0;for(let Le=1;Le<se.length;Le++){let pe=se[le],de=se[Le],Fe=pe.start+pe.count,Be=re(de.start,v.width,4),Ve=re(pe.start,v.width,4);de.start<=Fe+1&&Be===Ve&&re(de.start+de.count-1,v.width,4)===Be?pe.count=Math.max(pe.count,de.start+de.count-pe.start):(++le,se[le]=de)}se.length=le+1;let K=t.getParameter(s.UNPACK_ROW_LENGTH),J=t.getParameter(s.UNPACK_SKIP_PIXELS),ue=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,v.width);for(let Le=0,pe=se.length;Le<pe;Le++){let de=se[Le],Fe=Math.floor(de.start/4),Be=Math.ceil(de.count/4),Ve=Fe%v.width,D=Math.floor(Fe/v.width),ce=Be,j=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,Ve),t.pixelStorei(s.UNPACK_SKIP_ROWS,D),t.texSubImage2D(s.TEXTURE_2D,0,Ve,D,ce,j,F,H,v.data)}C.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,K),t.pixelStorei(s.UNPACK_SKIP_PIXELS,J),t.pixelStorei(s.UNPACK_SKIP_ROWS,ue)}}function k(C,v,F){let H=s.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(H=s.TEXTURE_2D_ARRAY),v.isData3DTexture&&(H=s.TEXTURE_3D);let Y=$(C,v),se=v.source;t.bindTexture(H,C.__webglTexture,s.TEXTURE0+F);let le=n.get(se);if(se.version!==le.__version||Y===!0){if(t.activeTexture(s.TEXTURE0+F),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let j=Ye.getPrimaries(Ye.workingColorSpace),fe=v.colorSpace===Si?null:Ye.getPrimaries(v.colorSpace),ye=v.colorSpace===Si||j===fe?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye)}t.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment);let J=m(v.image,!1,i.maxTextureSize);J=on(v,J);let ue=r.convert(v.format,v.colorSpace),Le=r.convert(v.type),pe=_(v.internalFormat,ue,Le,v.normalized,v.colorSpace,v.isVideoTexture);et(H,v);let de,Fe=v.mipmaps,Be=v.isVideoTexture!==!0,Ve=le.__version===void 0||Y===!0,D=se.dataReady,ce=E(v,J);if(v.isDepthTexture)pe=S(v.format===qi,v.type),Ve&&(Be?t.texStorage2D(s.TEXTURE_2D,1,pe,J.width,J.height):t.texImage2D(s.TEXTURE_2D,0,pe,J.width,J.height,0,ue,Le,null));else if(v.isDataTexture)if(Fe.length>0){Be&&Ve&&t.texStorage2D(s.TEXTURE_2D,ce,pe,Fe[0].width,Fe[0].height);for(let j=0,fe=Fe.length;j<fe;j++)de=Fe[j],Be?D&&t.texSubImage2D(s.TEXTURE_2D,j,0,0,de.width,de.height,ue,Le,de.data):t.texImage2D(s.TEXTURE_2D,j,pe,de.width,de.height,0,ue,Le,de.data);v.generateMipmaps=!1}else Be?(Ve&&t.texStorage2D(s.TEXTURE_2D,ce,pe,J.width,J.height),D&&ie(v,J,ue,Le)):t.texImage2D(s.TEXTURE_2D,0,pe,J.width,J.height,0,ue,Le,J.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Be&&Ve&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ce,pe,Fe[0].width,Fe[0].height,J.depth);for(let j=0,fe=Fe.length;j<fe;j++)if(de=Fe[j],v.format!==yn)if(ue!==null)if(Be){if(D)if(v.layerUpdates.size>0){let ye=Sh(de.width,de.height,v.format,v.type);for(let te of v.layerUpdates){let Ie=de.data.subarray(te*ye/de.data.BYTES_PER_ELEMENT,(te+1)*ye/de.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,te,de.width,de.height,1,ue,Ie)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,0,de.width,de.height,J.depth,ue,de.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,j,pe,de.width,de.height,J.depth,0,de.data,0,0);else Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Be?D&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,0,de.width,de.height,J.depth,ue,Le,de.data):t.texImage3D(s.TEXTURE_2D_ARRAY,j,pe,de.width,de.height,J.depth,0,ue,Le,de.data)}else{Be&&Ve&&t.texStorage2D(s.TEXTURE_2D,ce,pe,Fe[0].width,Fe[0].height);for(let j=0,fe=Fe.length;j<fe;j++)de=Fe[j],v.format!==yn?ue!==null?Be?D&&t.compressedTexSubImage2D(s.TEXTURE_2D,j,0,0,de.width,de.height,ue,de.data):t.compressedTexImage2D(s.TEXTURE_2D,j,pe,de.width,de.height,0,de.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Be?D&&t.texSubImage2D(s.TEXTURE_2D,j,0,0,de.width,de.height,ue,Le,de.data):t.texImage2D(s.TEXTURE_2D,j,pe,de.width,de.height,0,ue,Le,de.data)}else if(v.isDataArrayTexture)if(Be){if(Ve&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ce,pe,J.width,J.height,J.depth),D)if(v.layerUpdates.size>0){let j=Sh(J.width,J.height,v.format,v.type);for(let fe of v.layerUpdates){let ye=J.data.subarray(fe*j/J.data.BYTES_PER_ELEMENT,(fe+1)*j/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,fe,J.width,J.height,1,ue,Le,ye)}v.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,ue,Le,J.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,pe,J.width,J.height,J.depth,0,ue,Le,J.data);else if(v.isData3DTexture)Be?(Ve&&t.texStorage3D(s.TEXTURE_3D,ce,pe,J.width,J.height,J.depth),D&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,ue,Le,J.data)):t.texImage3D(s.TEXTURE_3D,0,pe,J.width,J.height,J.depth,0,ue,Le,J.data);else if(v.isFramebufferTexture){if(Ve)if(Be)t.texStorage2D(s.TEXTURE_2D,ce,pe,J.width,J.height);else{let j=J.width,fe=J.height;for(let ye=0;ye<ce;ye++)t.texImage2D(s.TEXTURE_2D,ye,pe,j,fe,0,ue,Le,null),j>>=1,fe>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in s){let j=s.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),J.parentNode!==j){j.appendChild(J),u.add(v),j.onpaint=fe=>{let ye=fe.changedElements;for(let te of u)ye.includes(te.image)&&(te.needsUpdate=!0)},j.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,J);else{let ye=s.RGBA,te=s.RGBA,Ie=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,ye,te,Ie,J)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Fe.length>0){if(Be&&Ve){let j=ot(Fe[0]);t.texStorage2D(s.TEXTURE_2D,ce,pe,j.width,j.height)}for(let j=0,fe=Fe.length;j<fe;j++)de=Fe[j],Be?D&&t.texSubImage2D(s.TEXTURE_2D,j,0,0,ue,Le,de):t.texImage2D(s.TEXTURE_2D,j,pe,ue,Le,de);v.generateMipmaps=!1}else if(Be){if(Ve){let j=ot(J);t.texStorage2D(s.TEXTURE_2D,ce,pe,j.width,j.height)}D&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ue,Le,J)}else t.texImage2D(s.TEXTURE_2D,0,pe,ue,Le,J);g(v)&&M(H),le.__version=se.version,v.onUpdate&&v.onUpdate(v)}C.__version=v.version}function Z(C,v,F){if(v.image.length!==6)return;let H=$(C,v),Y=v.source;t.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+F);let se=n.get(Y);if(Y.version!==se.__version||H===!0){t.activeTexture(s.TEXTURE0+F);let le=Ye.getPrimaries(Ye.workingColorSpace),K=v.colorSpace===Si?null:Ye.getPrimaries(v.colorSpace),J=v.colorSpace===Si||le===K?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);let ue=v.isCompressedTexture||v.image[0].isCompressedTexture,Le=v.image[0]&&v.image[0].isDataTexture,pe=[];for(let te=0;te<6;te++)!ue&&!Le?pe[te]=m(v.image[te],!0,i.maxCubemapSize):pe[te]=Le?v.image[te].image:v.image[te],pe[te]=on(v,pe[te]);let de=pe[0],Fe=r.convert(v.format,v.colorSpace),Be=r.convert(v.type),Ve=_(v.internalFormat,Fe,Be,v.normalized,v.colorSpace),D=v.isVideoTexture!==!0,ce=se.__version===void 0||H===!0,j=Y.dataReady,fe=E(v,de);et(s.TEXTURE_CUBE_MAP,v);let ye;if(ue){D&&ce&&t.texStorage2D(s.TEXTURE_CUBE_MAP,fe,Ve,de.width,de.height);for(let te=0;te<6;te++){ye=pe[te].mipmaps;for(let Ie=0;Ie<ye.length;Ie++){let Te=ye[Ie];v.format!==yn?Fe!==null?D?j&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ie,0,0,Te.width,Te.height,Fe,Te.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ie,Ve,Te.width,Te.height,0,Te.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?j&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ie,0,0,Te.width,Te.height,Fe,Be,Te.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ie,Ve,Te.width,Te.height,0,Fe,Be,Te.data)}}}else{if(ye=v.mipmaps,D&&ce){ye.length>0&&fe++;let te=ot(pe[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,fe,Ve,te.width,te.height)}for(let te=0;te<6;te++)if(Le){D?j&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,pe[te].width,pe[te].height,Fe,Be,pe[te].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ve,pe[te].width,pe[te].height,0,Fe,Be,pe[te].data);for(let Ie=0;Ie<ye.length;Ie++){let bt=ye[Ie].image[te].image;D?j&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ie+1,0,0,bt.width,bt.height,Fe,Be,bt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ie+1,Ve,bt.width,bt.height,0,Fe,Be,bt.data)}}else{D?j&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Fe,Be,pe[te]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ve,Fe,Be,pe[te]);for(let Ie=0;Ie<ye.length;Ie++){let Te=ye[Ie];D?j&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ie+1,0,0,Fe,Be,Te.image[te]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ie+1,Ve,Fe,Be,Te.image[te])}}}g(v)&&M(s.TEXTURE_CUBE_MAP),se.__version=Y.version,v.onUpdate&&v.onUpdate(v)}C.__version=v.version}function ee(C,v,F,H,Y,se){let le=r.convert(F.format,F.colorSpace),K=r.convert(F.type),J=_(F.internalFormat,le,K,F.normalized,F.colorSpace),ue=n.get(v),Le=n.get(F);if(Le.__renderTarget=v,!ue.__hasExternalTextures){let pe=Math.max(1,v.width>>se),de=Math.max(1,v.height>>se);Y===s.TEXTURE_3D||Y===s.TEXTURE_2D_ARRAY?t.texImage3D(Y,se,J,pe,de,v.depth,0,le,K,null):t.texImage2D(Y,se,J,pe,de,0,le,K,null)}t.bindFramebuffer(s.FRAMEBUFFER,C),Lt(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,H,Y,Le.__webglTexture,0,Mt(v)):(Y===s.TEXTURE_2D||Y>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,H,Y,Le.__webglTexture,se),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ee(C,v,F){if(s.bindRenderbuffer(s.RENDERBUFFER,C),v.depthBuffer){let H=v.depthTexture,Y=H&&H.isDepthTexture?H.type:null,se=S(v.stencilBuffer,Y),le=v.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;Lt(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Mt(v),se,v.width,v.height):F?s.renderbufferStorageMultisample(s.RENDERBUFFER,Mt(v),se,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,se,v.width,v.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,le,s.RENDERBUFFER,C)}else{let H=v.textures;for(let Y=0;Y<H.length;Y++){let se=H[Y],le=r.convert(se.format,se.colorSpace),K=r.convert(se.type),J=_(se.internalFormat,le,K,se.normalized,se.colorSpace);Lt(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Mt(v),J,v.width,v.height):F?s.renderbufferStorageMultisample(s.RENDERBUFFER,Mt(v),J,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,J,v.width,v.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function xe(C,v,F){let H=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,C),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Y=n.get(v.depthTexture);if(Y.__renderTarget=v,(!Y.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),H){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,v.depthTexture.addEventListener("dispose",R)),Y.__webglTexture===void 0){Y.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,Y.__webglTexture),et(s.TEXTURE_CUBE_MAP,v.depthTexture);let ue=r.convert(v.depthTexture.format),Le=r.convert(v.depthTexture.type),pe;v.depthTexture.format===Xn?pe=s.DEPTH_COMPONENT24:v.depthTexture.format===qi&&(pe=s.DEPTH24_STENCIL8);for(let de=0;de<6;de++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,pe,v.width,v.height,0,ue,Le,null)}}else Q(v.depthTexture,0);let se=Y.__webglTexture,le=Mt(v),K=H?s.TEXTURE_CUBE_MAP_POSITIVE_X+F:s.TEXTURE_2D,J=v.depthTexture.format===qi?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(v.depthTexture.format===Xn)Lt(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,J,K,se,0,le):s.framebufferTexture2D(s.FRAMEBUFFER,J,K,se,0);else if(v.depthTexture.format===qi)Lt(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,J,K,se,0,le):s.framebufferTexture2D(s.FRAMEBUFFER,J,K,se,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Se(C){let v=n.get(C),F=C.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==C.depthTexture){let H=C.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),H){let Y=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,H.removeEventListener("dispose",Y)};H.addEventListener("dispose",Y),v.__depthDisposeCallback=Y}v.__boundDepthTexture=H}if(C.depthTexture&&!v.__autoAllocateDepthBuffer)if(F)for(let H=0;H<6;H++)xe(v.__webglFramebuffer[H],C,H);else{let H=C.texture.mipmaps;H&&H.length>0?xe(v.__webglFramebuffer[0],C,0):xe(v.__webglFramebuffer,C,0)}else if(F){v.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(t.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[H]),v.__webglDepthbuffer[H]===void 0)v.__webglDepthbuffer[H]=s.createRenderbuffer(),Ee(v.__webglDepthbuffer[H],C,!1);else{let Y=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,se=v.__webglDepthbuffer[H];s.bindRenderbuffer(s.RENDERBUFFER,se),s.framebufferRenderbuffer(s.FRAMEBUFFER,Y,s.RENDERBUFFER,se)}}else{let H=C.texture.mipmaps;if(H&&H.length>0?t.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=s.createRenderbuffer(),Ee(v.__webglDepthbuffer,C,!1);else{let Y=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,se=v.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,se),s.framebufferRenderbuffer(s.FRAMEBUFFER,Y,s.RENDERBUFFER,se)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ue(C,v,F){let H=n.get(C);v!==void 0&&ee(H.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),F!==void 0&&Se(C)}function Re(C){let v=C.texture,F=n.get(C),H=n.get(v);C.addEventListener("dispose",y);let Y=C.textures,se=C.isWebGLCubeRenderTarget===!0,le=Y.length>1;if(le||(H.__webglTexture===void 0&&(H.__webglTexture=s.createTexture()),H.__version=v.version,a.memory.textures++),se){F.__webglFramebuffer=[];for(let K=0;K<6;K++)if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer[K]=[];for(let J=0;J<v.mipmaps.length;J++)F.__webglFramebuffer[K][J]=s.createFramebuffer()}else F.__webglFramebuffer[K]=s.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer=[];for(let K=0;K<v.mipmaps.length;K++)F.__webglFramebuffer[K]=s.createFramebuffer()}else F.__webglFramebuffer=s.createFramebuffer();if(le)for(let K=0,J=Y.length;K<J;K++){let ue=n.get(Y[K]);ue.__webglTexture===void 0&&(ue.__webglTexture=s.createTexture(),a.memory.textures++)}if(C.samples>0&&Lt(C)===!1){F.__webglMultisampledFramebuffer=s.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let K=0;K<Y.length;K++){let J=Y[K];F.__webglColorRenderbuffer[K]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,F.__webglColorRenderbuffer[K]);let ue=r.convert(J.format,J.colorSpace),Le=r.convert(J.type),pe=_(J.internalFormat,ue,Le,J.normalized,J.colorSpace,C.isXRRenderTarget===!0),de=Mt(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,de,pe,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+K,s.RENDERBUFFER,F.__webglColorRenderbuffer[K])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(F.__webglDepthRenderbuffer=s.createRenderbuffer(),Ee(F.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(se){t.bindTexture(s.TEXTURE_CUBE_MAP,H.__webglTexture),et(s.TEXTURE_CUBE_MAP,v);for(let K=0;K<6;K++)if(v.mipmaps&&v.mipmaps.length>0)for(let J=0;J<v.mipmaps.length;J++)ee(F.__webglFramebuffer[K][J],C,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+K,J);else ee(F.__webglFramebuffer[K],C,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);g(v)&&M(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(le){for(let K=0,J=Y.length;K<J;K++){let ue=Y[K],Le=n.get(ue),pe=s.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(pe=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(pe,Le.__webglTexture),et(pe,ue),ee(F.__webglFramebuffer,C,ue,s.COLOR_ATTACHMENT0+K,pe,0),g(ue)&&M(pe)}t.unbindTexture()}else{let K=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(K=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(K,H.__webglTexture),et(K,v),v.mipmaps&&v.mipmaps.length>0)for(let J=0;J<v.mipmaps.length;J++)ee(F.__webglFramebuffer[J],C,v,s.COLOR_ATTACHMENT0,K,J);else ee(F.__webglFramebuffer,C,v,s.COLOR_ATTACHMENT0,K,0);g(v)&&M(K),t.unbindTexture()}C.depthBuffer&&Se(C)}function rt(C){let v=C.textures;for(let F=0,H=v.length;F<H;F++){let Y=v[F];if(g(Y)){let se=b(C),le=n.get(Y).__webglTexture;t.bindTexture(se,le),M(se),t.unbindTexture()}}}let tt=[],kt=[];function Wt(C){if(C.samples>0){if(Lt(C)===!1){let v=C.textures,F=C.width,H=C.height,Y=s.COLOR_BUFFER_BIT,se=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,le=n.get(C),K=v.length>1;if(K)for(let ue=0;ue<v.length;ue++)t.bindFramebuffer(s.FRAMEBUFFER,le.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ue,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,le.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ue,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer);let J=C.texture.mipmaps;J&&J.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,le.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let ue=0;ue<v.length;ue++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Y|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Y|=s.STENCIL_BUFFER_BIT)),K){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,le.__webglColorRenderbuffer[ue]);let Le=n.get(v[ue]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Le,0)}s.blitFramebuffer(0,0,F,H,0,0,F,H,Y,s.NEAREST),c===!0&&(tt.length=0,kt.length=0,tt.push(s.COLOR_ATTACHMENT0+ue),C.depthBuffer&&C.resolveDepthBuffer===!1&&(tt.push(se),kt.push(se),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,kt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,tt))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),K)for(let ue=0;ue<v.length;ue++){t.bindFramebuffer(s.FRAMEBUFFER,le.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ue,s.RENDERBUFFER,le.__webglColorRenderbuffer[ue]);let Le=n.get(v[ue]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,le.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ue,s.TEXTURE_2D,Le,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){let v=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[v])}}}function Mt(C){return Math.min(i.maxSamples,C.samples)}function Lt(C){let v=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function N(C){let v=a.render.frame;h.get(C)!==v&&(h.set(C,v),C.update())}function on(C,v){let F=C.colorSpace,H=C.format,Y=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||F!==tn&&F!==Si&&(Ye.getTransfer(F)===at?(H!==yn||Y!==hn)&&Ae("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ze("WebGLTextures: Unsupported texture color space:",F)),v}function ot(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=X,this.resetTextureUnits=V,this.getTextureUnits=q,this.setTextureUnits=O,this.setTexture2D=Q,this.setTexture2DArray=ne,this.setTexture3D=ae,this.setTextureCube=he,this.rebindTextures=Ue,this.setupRenderTarget=Re,this.updateRenderTargetMipmap=rt,this.updateMultisampleRenderTarget=Wt,this.setupDepthRenderbuffer=Se,this.setupFrameBufferTexture=ee,this.useMultisampledRTT=Lt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function rv(s,e){function t(n,i=Si){let r,a=Ye.getTransfer(i);if(n===hn)return s.UNSIGNED_BYTE;if(n===qo)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Yo)return s.UNSIGNED_SHORT_5_5_5_1;if(n===dh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===fh)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===hh)return s.BYTE;if(n===uh)return s.SHORT;if(n===or)return s.UNSIGNED_SHORT;if(n===Xo)return s.INT;if(n===kn)return s.UNSIGNED_INT;if(n===_n)return s.FLOAT;if(n===ei)return s.HALF_FLOAT;if(n===ph)return s.ALPHA;if(n===mh)return s.RGB;if(n===yn)return s.RGBA;if(n===Xn)return s.DEPTH_COMPONENT;if(n===qi)return s.DEPTH_STENCIL;if(n===Zo)return s.RED;if(n===Ko)return s.RED_INTEGER;if(n===Yi)return s.RG;if(n===$o)return s.RG_INTEGER;if(n===jo)return s.RGBA_INTEGER;if(n===ca||n===la||n===ha||n===ua)if(a===at)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ca)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===la)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ua)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ca)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===la)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ha)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ua)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Jo||n===Qo||n===ec||n===tc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Jo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Qo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ec)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===tc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===nc||n===ic||n===sc||n===rc||n===ac||n===da||n===oc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===nc||n===ic)return a===at?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===sc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===rc)return r.COMPRESSED_R11_EAC;if(n===ac)return r.COMPRESSED_SIGNED_R11_EAC;if(n===da)return r.COMPRESSED_RG11_EAC;if(n===oc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===cc||n===lc||n===hc||n===uc||n===dc||n===fc||n===pc||n===mc||n===gc||n===xc||n===_c||n===yc||n===vc||n===Mc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===cc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===lc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===hc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===uc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===dc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===fc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===pc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===mc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===gc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===xc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===_c)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===yc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===vc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Mc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===bc||n===Sc||n===Ec)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===bc)return a===at?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Sc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ec)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===wc||n===Tc||n===fa||n===Ac)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===wc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Tc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===fa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ac)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===cr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var av=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ov=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Oh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Vr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new rn({vertexShader:av,fragmentShader:ov,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Pe(new ds(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Bh=class extends Un{constructor(e,t){super();let n=this,i=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,p=null,x=typeof XRWebGLBinding<"u",m=new Oh,g={},M=t.getContextAttributes(),b=null,_=null,S=[],E=[],R=new oe,y=null,A=new Vt;A.viewport=new lt;let P=new Vt;P.viewport=new lt;let I=[A,P],L=new ko,V=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let re=S[$];return re===void 0&&(re=new Ys,S[$]=re),re.getTargetRaySpace()},this.getControllerGrip=function($){let re=S[$];return re===void 0&&(re=new Ys,S[$]=re),re.getGripSpace()},this.getHand=function($){let re=S[$];return re===void 0&&(re=new Ys,S[$]=re),re.getHandSpace()};function O($){let re=E.indexOf($.inputSource);if(re===-1)return;let ie=S[re];ie!==void 0&&(ie.update($.inputSource,$.frame,l||a),ie.dispatchEvent({type:$.type,data:$.inputSource}))}function X(){i.removeEventListener("select",O),i.removeEventListener("selectstart",O),i.removeEventListener("selectend",O),i.removeEventListener("squeeze",O),i.removeEventListener("squeezestart",O),i.removeEventListener("squeezeend",O),i.removeEventListener("end",X),i.removeEventListener("inputsourceschange",W);for(let $=0;$<S.length;$++){let re=E[$];re!==null&&(E[$]=null,S[$].disconnect(re))}V=null,q=null,m.reset();for(let $ in g)delete g[$];e.setRenderTarget(b),f=null,d=null,u=null,i=null,_=null,et.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&Ae("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&Ae("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(b=e.getRenderTarget(),i.addEventListener("select",O),i.addEventListener("selectstart",O),i.addEventListener("selectend",O),i.addEventListener("squeeze",O),i.addEventListener("squeezestart",O),i.addEventListener("squeezeend",O),i.addEventListener("end",X),i.addEventListener("inputsourceschange",W),M.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ie=null,k=null,Z=null;M.depth&&(Z=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=M.stencil?qi:Xn,k=M.stencil?cr:kn);let ee={colorFormat:t.RGBA8,depthFormat:Z,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(ee),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),_=new gn(d.textureWidth,d.textureHeight,{format:yn,type:hn,depthTexture:new mi(d.textureWidth,d.textureHeight,k,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let ie={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,ie),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new gn(f.framebufferWidth,f.framebufferHeight,{format:yn,type:hn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),et.setContext(i),et.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function W($){for(let re=0;re<$.removed.length;re++){let ie=$.removed[re],k=E.indexOf(ie);k>=0&&(E[k]=null,S[k].disconnect(ie))}for(let re=0;re<$.added.length;re++){let ie=$.added[re],k=E.indexOf(ie);if(k===-1){for(let ee=0;ee<S.length;ee++)if(ee>=E.length){E.push(ie),k=ee;break}else if(E[ee]===null){E[ee]=ie,k=ee;break}if(k===-1)break}let Z=S[k];Z&&Z.connect(ie)}}let Q=new T,ne=new T;function ae($,re,ie){Q.setFromMatrixPosition(re.matrixWorld),ne.setFromMatrixPosition(ie.matrixWorld);let k=Q.distanceTo(ne),Z=re.projectionMatrix.elements,ee=ie.projectionMatrix.elements,Ee=Z[14]/(Z[10]-1),xe=Z[14]/(Z[10]+1),Se=(Z[9]+1)/Z[5],Ue=(Z[9]-1)/Z[5],Re=(Z[8]-1)/Z[0],rt=(ee[8]+1)/ee[0],tt=Ee*Re,kt=Ee*rt,Wt=k/(-Re+rt),Mt=Wt*-Re;if(re.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Mt),$.translateZ(Wt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Z[10]===-1)$.projectionMatrix.copy(re.projectionMatrix),$.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{let Lt=Ee+Wt,N=xe+Wt,on=tt-Mt,ot=kt+(k-Mt),C=Se*xe/N*Lt,v=Ue*xe/N*Lt;$.projectionMatrix.makePerspective(on,ot,C,v,Lt,N),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function he($,re){re===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(re.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let re=$.near,ie=$.far;m.texture!==null&&(m.depthNear>0&&(re=m.depthNear),m.depthFar>0&&(ie=m.depthFar)),L.near=P.near=A.near=re,L.far=P.far=A.far=ie,(V!==L.near||q!==L.far)&&(i.updateRenderState({depthNear:L.near,depthFar:L.far}),V=L.near,q=L.far),L.layers.mask=$.layers.mask|6,A.layers.mask=L.layers.mask&-5,P.layers.mask=L.layers.mask&-3;let k=$.parent,Z=L.cameras;he(L,k);for(let ee=0;ee<Z.length;ee++)he(Z[ee],k);Z.length===2?ae(L,A,P):L.projectionMatrix.copy(A.projectionMatrix),ve($,L,k)};function ve($,re,ie){ie===null?$.matrix.copy(re.matrixWorld):($.matrix.copy(ie.matrixWorld),$.matrix.invert(),$.matrix.multiply(re.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(re.projectionMatrix),$.projectionMatrixInverse.copy(re.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=cs*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function($){c=$,d!==null&&(d.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(L)},this.getCameraTexture=function($){return g[$]};let Je=null;function _t($,re){if(h=re.getViewerPose(l||a),p=re,h!==null){let ie=h.views;f!==null&&(e.setRenderTargetFramebuffer(_,f.framebuffer),e.setRenderTarget(_));let k=!1;ie.length!==L.cameras.length&&(L.cameras.length=0,k=!0);for(let xe=0;xe<ie.length;xe++){let Se=ie[xe],Ue=null;if(f!==null)Ue=f.getViewport(Se);else{let rt=u.getViewSubImage(d,Se);Ue=rt.viewport,xe===0&&(e.setRenderTargetTextures(_,rt.colorTexture,rt.depthStencilTexture),e.setRenderTarget(_))}let Re=I[xe];Re===void 0&&(Re=new Vt,Re.layers.enable(xe),Re.viewport=new lt,I[xe]=Re),Re.matrix.fromArray(Se.transform.matrix),Re.matrix.decompose(Re.position,Re.quaternion,Re.scale),Re.projectionMatrix.fromArray(Se.projectionMatrix),Re.projectionMatrixInverse.copy(Re.projectionMatrix).invert(),Re.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),xe===0&&(L.matrix.copy(Re.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),k===!0&&L.cameras.push(Re)}let Z=i.enabledFeatures;if(Z&&Z.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&x){u=n.getBinding();let xe=u.getDepthInformation(ie[0]);xe&&xe.isValid&&xe.texture&&m.init(xe,i.renderState)}if(Z&&Z.includes("camera-access")&&x){e.state.unbindTexture(),u=n.getBinding();for(let xe=0;xe<ie.length;xe++){let Se=ie[xe].camera;if(Se){let Ue=g[Se];Ue||(Ue=new Vr,g[Se]=Ue);let Re=u.getCameraImage(Se);Ue.sourceTexture=Re}}}}for(let ie=0;ie<S.length;ie++){let k=E[ie],Z=S[ie];k!==null&&Z!==void 0&&Z.update(k,re,l||a)}Je&&Je($,re),re.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:re}),p=null}let et=new Uf;et.setAnimationLoop(_t),this.setAnimationLoop=function($){Je=$},this.dispose=function(){}}},cv=new ke,Hf=new He;Hf.set(-1,0,0,0,1,0,0,0,1);function lv(s,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,vh(s)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function i(m,g,M,b,_){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),u(m,g)):g.isMeshPhongMaterial?(r(m,g),h(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),d(m,g),g.isMeshPhysicalMaterial&&f(m,g,_)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),x(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?c(m,g,M,b):g.isSpriteMaterial?l(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===an&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===an&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let M=e.get(g),b=M.envMap,_=M.envMapRotation;b&&(m.envMap.value=b,m.envMapRotation.value.setFromMatrix4(cv.makeRotationFromEuler(_)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Hf),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function c(m,g,M,b){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*M,m.scale.value=b*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function l(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function u(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function d(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function f(m,g,M){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===an&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function x(m,g){let M=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function hv(s,e,t,n){let i={},r={},a=[],o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,S){let E=S.program;n.uniformBlockBinding(_,E)}function l(_,S){let E=i[_.id];E===void 0&&(m(_),E=h(_),i[_.id]=E,_.addEventListener("dispose",M));let R=S.program;n.updateUBOMapping(_,R);let y=e.render.frame;r[_.id]!==y&&(d(_),r[_.id]=y)}function h(_){let S=u();_.__bindingPointIndex=S;let E=s.createBuffer(),R=_.__size,y=_.usage;return s.bindBuffer(s.UNIFORM_BUFFER,E),s.bufferData(s.UNIFORM_BUFFER,R,y),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,S,E),E}function u(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return ze("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(_){let S=i[_.id],E=_.uniforms,R=_.__cache;s.bindBuffer(s.UNIFORM_BUFFER,S);for(let y=0,A=E.length;y<A;y++){let P=E[y];if(Array.isArray(P))for(let I=0,L=P.length;I<L;I++)f(P[I],y,I,R);else f(P,y,0,R)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(_,S,E,R){if(x(_,S,E,R)===!0){let y=_.__offset,A=_.value;if(Array.isArray(A)){let P=0;for(let I=0;I<A.length;I++){let L=A[I],V=g(L);p(L,_.__data,P),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(P+=V.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(A,_.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,y,_.__data)}}function p(_,S,E){typeof _=="number"||typeof _=="boolean"?S[0]=_:_.isMatrix3?(S[0]=_.elements[0],S[1]=_.elements[1],S[2]=_.elements[2],S[3]=0,S[4]=_.elements[3],S[5]=_.elements[4],S[6]=_.elements[5],S[7]=0,S[8]=_.elements[6],S[9]=_.elements[7],S[10]=_.elements[8],S[11]=0):ArrayBuffer.isView(_)?S.set(new _.constructor(_.buffer,_.byteOffset,S.length)):_.toArray(S,E)}function x(_,S,E,R){let y=_.value,A=S+"_"+E;if(R[A]===void 0)return typeof y=="number"||typeof y=="boolean"?R[A]=y:ArrayBuffer.isView(y)?R[A]=y.slice():R[A]=y.clone(),!0;{let P=R[A];if(typeof y=="number"||typeof y=="boolean"){if(P!==y)return R[A]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(P.equals(y)===!1)return P.copy(y),!0}}return!1}function m(_){let S=_.uniforms,E=0,R=16;for(let A=0,P=S.length;A<P;A++){let I=Array.isArray(S[A])?S[A]:[S[A]];for(let L=0,V=I.length;L<V;L++){let q=I[L],O=Array.isArray(q.value)?q.value:[q.value];for(let X=0,W=O.length;X<W;X++){let Q=O[X],ne=g(Q),ae=E%R,he=ae%ne.boundary,ve=ae+he;E+=he,ve!==0&&R-ve<ne.storage&&(E+=R-ve),q.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=E,E+=ne.storage}}}let y=E%R;return y>0&&(E+=R-y),_.__size=E,_.__cache={},this}function g(_){let S={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(S.boundary=4,S.storage=4):_.isVector2?(S.boundary=8,S.storage=8):_.isVector3||_.isColor?(S.boundary=16,S.storage=12):_.isVector4?(S.boundary=16,S.storage=16):_.isMatrix3?(S.boundary=48,S.storage=48):_.isMatrix4?(S.boundary=64,S.storage=64):_.isTexture?Ae("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(S.boundary=16,S.storage=_.byteLength):Ae("WebGLRenderer: Unsupported uniform value type.",_),S}function M(_){let S=_.target;S.removeEventListener("dispose",M);let E=a.indexOf(S.__bindingPointIndex);a.splice(E,1),s.deleteBuffer(i[S.id]),delete i[S.id],delete r[S.id]}function b(){for(let _ in i)s.deleteBuffer(i[_]);a=[],i={},r={}}return{bind:c,update:l,dispose:b}}var uv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ti=null;function dv(){return ti===null&&(ti=new js(uv,16,16,Yi,ei),ti.name="DFG_LUT",ti.minFilter=Ct,ti.magFilter=Ct,ti.wrapS=Sn,ti.wrapT=Sn,ti.generateMipmaps=!1,ti.needsUpdate=!0),ti}var Nc=class{constructor(e={}){let{canvas:t=af(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=hn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let x=f,m=new Set([jo,$o,Ko]),g=new Set([hn,kn,or,cr,qo,Yo]),M=new Uint32Array(4),b=new Int32Array(4),_=new T,S=null,E=null,R=[],y=[],A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,I=!1,L=null,V=null,q=null,O=null;this._outputColorSpace=yt;let X=0,W=0,Q=null,ne=-1,ae=null,he=new lt,ve=new lt,Je=null,_t=new we(0),et=0,$=t.width,re=t.height,ie=1,k=null,Z=null,ee=new lt(0,0,$,re),Ee=new lt(0,0,$,re),xe=!1,Se=new zi,Ue=!1,Re=!1,rt=new ke,tt=new T,kt=new lt,Wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Mt=!1;function Lt(){return Q===null?ie:1}let N=n;function on(w,U){return t.getContext(w,U)}try{let w={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"185"}`),t.addEventListener("webglcontextlost",bt,!1),t.addEventListener("webglcontextrestored",mt,!1),t.addEventListener("webglcontextcreationerror",Hn,!1),N===null){let U="webgl2";if(N=on(U,w),N===null)throw on(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(w){throw ze("WebGLRenderer: "+w.message),w}let ot,C,v,F,H,Y,se,le,K,J,ue,Le,pe,de,Fe,Be,Ve,D,ce,j,fe,ye,te;function Ie(){ot=new y_(N),ot.init(),fe=new rv(N,ot),C=new u_(N,ot,e,fe),v=new iv(N,ot),C.reversedDepthBuffer&&d&&v.buffers.depth.setReversed(!0),V=N.createFramebuffer(),q=N.createFramebuffer(),O=N.createFramebuffer(),F=new b_(N),H=new Gy,Y=new sv(N,ot,v,H,C,fe,F),se=new __(P),le=new Tg(N),ye=new l_(N,le),K=new v_(N,le,F,ye),J=new E_(N,K,le,ye,F),D=new S_(N,C,Y),Fe=new d_(H),ue=new Vy(P,se,ot,C,ye,Fe),Le=new lv(P,H),pe=new Xy,de=new jy(ot),Ve=new c_(P,se,v,J,p,c),Be=new nv(P,J,C),te=new hv(N,F,C,v),ce=new h_(N,ot,F),j=new M_(N,ot,F),F.programs=ue.programs,P.capabilities=C,P.extensions=ot,P.properties=H,P.renderLists=pe,P.shadowMap=Be,P.state=v,P.info=F}Ie(),x!==hn&&(A=new T_(x,t.width,t.height,o,i,r));let Te=new Bh(P,N);this.xr=Te,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let w=ot.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=ot.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(w){w!==void 0&&(ie=w,this.setSize($,re,!1))},this.getSize=function(w){return w.set($,re)},this.setSize=function(w,U,G=!0){if(Te.isPresenting){Ae("WebGLRenderer: Can't change size while VR device is presenting.");return}$=w,re=U,t.width=Math.floor(w*ie),t.height=Math.floor(U*ie),G===!0&&(t.style.width=w+"px",t.style.height=U+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,w,U)},this.getDrawingBufferSize=function(w){return w.set($*ie,re*ie).floor()},this.setDrawingBufferSize=function(w,U,G){$=w,re=U,ie=G,t.width=Math.floor(w*G),t.height=Math.floor(U*G),this.setViewport(0,0,w,U)},this.setEffects=function(w){if(x===hn){ze("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let U=0;U<w.length;U++)if(w[U].isOutputPass===!0){Ae("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(he)},this.getViewport=function(w){return w.copy(ee)},this.setViewport=function(w,U,G,B){w.isVector4?ee.set(w.x,w.y,w.z,w.w):ee.set(w,U,G,B),v.viewport(he.copy(ee).multiplyScalar(ie).round())},this.getScissor=function(w){return w.copy(Ee)},this.setScissor=function(w,U,G,B){w.isVector4?Ee.set(w.x,w.y,w.z,w.w):Ee.set(w,U,G,B),v.scissor(ve.copy(Ee).multiplyScalar(ie).round())},this.getScissorTest=function(){return xe},this.setScissorTest=function(w){v.setScissorTest(xe=w)},this.setOpaqueSort=function(w){k=w},this.setTransparentSort=function(w){Z=w},this.getClearColor=function(w){return w.copy(Ve.getClearColor())},this.setClearColor=function(){Ve.setClearColor(...arguments)},this.getClearAlpha=function(){return Ve.getClearAlpha()},this.setClearAlpha=function(){Ve.setClearAlpha(...arguments)},this.clear=function(w=!0,U=!0,G=!0){let B=0;if(w){let z=!1;if(Q!==null){let _e=Q.texture.format;z=m.has(_e)}if(z){let _e=Q.texture.type,be=g.has(_e),ge=Ve.getClearColor(),Ce=Ve.getClearAlpha(),De=ge.r,Ge=ge.g,qe=ge.b;be?(M[0]=De,M[1]=Ge,M[2]=qe,M[3]=Ce,N.clearBufferuiv(N.COLOR,0,M)):(b[0]=De,b[1]=Ge,b[2]=qe,b[3]=Ce,N.clearBufferiv(N.COLOR,0,b))}else B|=N.COLOR_BUFFER_BIT}U&&(B|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(B|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B!==0&&N.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),L=w},this.dispose=function(){t.removeEventListener("webglcontextlost",bt,!1),t.removeEventListener("webglcontextrestored",mt,!1),t.removeEventListener("webglcontextcreationerror",Hn,!1),Ve.dispose(),pe.dispose(),de.dispose(),H.dispose(),se.dispose(),J.dispose(),ye.dispose(),te.dispose(),ue.dispose(),Te.dispose(),Te.removeEventListener("sessionstart",Iu),Te.removeEventListener("sessionend",Lu),ji.stop()};function bt(w){w.preventDefault(),Lr("WebGLRenderer: Context Lost."),I=!0}function mt(){Lr("WebGLRenderer: Context Restored."),I=!1;let w=F.autoReset,U=Be.enabled,G=Be.autoUpdate,B=Be.needsUpdate,z=Be.type;Ie(),F.autoReset=w,Be.enabled=U,Be.autoUpdate=G,Be.needsUpdate=B,Be.type=z}function Hn(w){ze("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Vn(w){let U=w.target;U.removeEventListener("dispose",Vn),sm(U)}function sm(w){rm(w),H.remove(w)}function rm(w){let U=H.get(w).programs;U!==void 0&&(U.forEach(function(G){ue.releaseProgram(G)}),w.isShaderMaterial&&ue.releaseShaderCache(w))}this.renderBufferDirect=function(w,U,G,B,z,_e){U===null&&(U=Wt);let be=z.isMesh&&z.matrixWorld.determinantAffine()<0,ge=cm(w,U,G,B,z);v.setMaterial(B,be);let Ce=G.index,De=1;if(B.wireframe===!0){if(Ce=K.getWireframeAttribute(G),Ce===void 0)return;De=2}let Ge=G.drawRange,qe=G.attributes.position,Ne=Ge.start*De,ht=(Ge.start+Ge.count)*De;_e!==null&&(Ne=Math.max(Ne,_e.start*De),ht=Math.min(ht,(_e.start+_e.count)*De)),Ce!==null?(Ne=Math.max(Ne,0),ht=Math.min(ht,Ce.count)):qe!=null&&(Ne=Math.max(Ne,0),ht=Math.min(ht,qe.count));let wt=ht-Ne;if(wt<0||wt===1/0)return;ye.setup(z,B,ge,G,Ce);let St,dt=ce;if(Ce!==null&&(St=le.get(Ce),dt=j,dt.setIndex(St)),z.isMesh)B.wireframe===!0?(v.setLineWidth(B.wireframeLinewidth*Lt()),dt.setMode(N.LINES)):dt.setMode(N.TRIANGLES);else if(z.isLine){let Yt=B.linewidth;Yt===void 0&&(Yt=1),v.setLineWidth(Yt*Lt()),z.isLineSegments?dt.setMode(N.LINES):z.isLineLoop?dt.setMode(N.LINE_LOOP):dt.setMode(N.LINE_STRIP)}else z.isPoints?dt.setMode(N.POINTS):z.isSprite&&dt.setMode(N.TRIANGLES);if(z.isBatchedMesh)if(ot.get("WEBGL_multi_draw"))dt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{let Yt=z._multiDrawStarts,Me=z._multiDrawCounts,fn=z._multiDrawCount,nt=Ce?le.get(Ce).bytesPerElement:1,vn=H.get(B).currentProgram.getUniforms();for(let Gn=0;Gn<fn;Gn++)vn.setValue(N,"_gl_DrawID",Gn),dt.render(Yt[Gn]/nt,Me[Gn])}else if(z.isInstancedMesh)dt.renderInstances(Ne,wt,z.count);else if(G.isInstancedBufferGeometry){let Yt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Me=Math.min(G.instanceCount,Yt);dt.renderInstances(Ne,wt,Me)}else dt.render(Ne,wt)};function Pu(w,U,G){w.transparent===!0&&w.side===Ft&&w.forceSinglePass===!1?(w.side=an,w.needsUpdate=!0,Ia(w,U,G),w.side=Nn,w.needsUpdate=!0,Ia(w,U,G),w.side=Ft):Ia(w,U,G)}this.compile=function(w,U,G=null){G===null&&(G=w),E=de.get(G),E.init(U),y.push(E),G.traverseVisible(function(z){z.isLight&&z.layers.test(U.layers)&&(E.pushLight(z),z.castShadow&&E.pushShadow(z))}),w!==G&&w.traverseVisible(function(z){z.isLight&&z.layers.test(U.layers)&&(E.pushLight(z),z.castShadow&&E.pushShadow(z))}),E.setupLights();let B=new Set;return w.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;let _e=z.material;if(_e)if(Array.isArray(_e))for(let be=0;be<_e.length;be++){let ge=_e[be];Pu(ge,G,z),B.add(ge)}else Pu(_e,G,z),B.add(_e)}),E=y.pop(),B},this.compileAsync=function(w,U,G=null){let B=this.compile(w,U,G);return new Promise(z=>{function _e(){if(B.forEach(function(be){H.get(be).currentProgram.isReady()&&B.delete(be)}),B.size===0){z(w);return}setTimeout(_e,10)}ot.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let rl=null;function am(w){rl&&rl(w)}function Iu(){ji.stop()}function Lu(){ji.start()}let ji=new Uf;ji.setAnimationLoop(am),typeof self<"u"&&ji.setContext(self),this.setAnimationLoop=function(w){rl=w,Te.setAnimationLoop(w),w===null?ji.stop():ji.start()},Te.addEventListener("sessionstart",Iu),Te.addEventListener("sessionend",Lu),this.render=function(w,U){if(U!==void 0&&U.isCamera!==!0){ze("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;L!==null&&L.renderStart(w,U);let G=Te.enabled===!0&&Te.isPresenting===!0,B=A!==null&&(Q===null||G)&&A.begin(P,Q);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Te.enabled===!0&&Te.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Te.cameraAutoUpdate===!0&&Te.updateCamera(U),U=Te.getCamera()),w.isScene===!0&&w.onBeforeRender(P,w,U,Q),E=de.get(w,y.length),E.init(U),E.state.textureUnits=Y.getTextureUnits(),y.push(E),rt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Se.setFromProjectionMatrix(rt,Ln,U.reversedDepth),Re=this.localClippingEnabled,Ue=Fe.init(this.clippingPlanes,Re),S=pe.get(w,R.length),S.init(),R.push(S),Te.enabled===!0&&Te.isPresenting===!0){let be=P.xr.getDepthSensingMesh();be!==null&&al(be,U,-1/0,P.sortObjects)}al(w,U,0,P.sortObjects),S.finish(),P.sortObjects===!0&&S.sort(k,Z,U.reversedDepth),Mt=Te.enabled===!1||Te.isPresenting===!1||Te.hasDepthSensing()===!1,Mt&&Ve.addToRenderList(S,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ue===!0&&Fe.beginShadows();let z=E.state.shadowsArray;if(Be.render(z,w,U),Ue===!0&&Fe.endShadows(),(B&&A.hasRenderPass())===!1){let be=S.opaque,ge=S.transmissive;if(E.setupLights(),U.isArrayCamera){let Ce=U.cameras;if(ge.length>0)for(let De=0,Ge=Ce.length;De<Ge;De++){let qe=Ce[De];Nu(be,ge,w,qe)}Mt&&Ve.render(w);for(let De=0,Ge=Ce.length;De<Ge;De++){let qe=Ce[De];Du(S,w,qe,qe.viewport)}}else ge.length>0&&Nu(be,ge,w,U),Mt&&Ve.render(w),Du(S,w,U)}Q!==null&&W===0&&(Y.updateMultisampleRenderTarget(Q),Y.updateRenderTargetMipmap(Q)),B&&A.end(P),w.isScene===!0&&w.onAfterRender(P,w,U),ye.resetDefaultState(),ne=-1,ae=null,y.pop(),y.length>0?(E=y[y.length-1],Y.setTextureUnits(E.state.textureUnits),Ue===!0&&Fe.setGlobalState(P.clippingPlanes,E.state.camera)):E=null,R.pop(),R.length>0?S=R[R.length-1]:S=null,L!==null&&L.renderEnd()};function al(w,U,G,B){if(w.visible===!1)return;if(w.layers.test(U.layers)){if(w.isGroup)G=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(U);else if(w.isLightProbeGrid)E.pushLightProbeGrid(w);else if(w.isLight)E.pushLight(w),w.castShadow&&E.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Se.intersectsSprite(w)){B&&kt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(rt);let be=J.update(w),ge=w.material;ge.visible&&S.push(w,be,ge,G,kt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Se.intersectsObject(w))){let be=J.update(w),ge=w.material;if(B&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),kt.copy(w.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),kt.copy(be.boundingSphere.center)),kt.applyMatrix4(w.matrixWorld).applyMatrix4(rt)),Array.isArray(ge)){let Ce=be.groups;for(let De=0,Ge=Ce.length;De<Ge;De++){let qe=Ce[De],Ne=ge[qe.materialIndex];Ne&&Ne.visible&&S.push(w,be,Ne,G,kt.z,qe)}}else ge.visible&&S.push(w,be,ge,G,kt.z,null)}}let _e=w.children;for(let be=0,ge=_e.length;be<ge;be++)al(_e[be],U,G,B)}function Du(w,U,G,B){let{opaque:z,transmissive:_e,transparent:be}=w;E.setupLightsView(G),Ue===!0&&Fe.setGlobalState(P.clippingPlanes,G),B&&v.viewport(he.copy(B)),z.length>0&&Pa(z,U,G),_e.length>0&&Pa(_e,U,G),be.length>0&&Pa(be,U,G),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function Nu(w,U,G,B){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[B.id]===void 0){let Ne=ot.has("EXT_color_buffer_half_float")||ot.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[B.id]=new gn(1,1,{generateMipmaps:!0,type:Ne?ei:hn,minFilter:zn,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ye.workingColorSpace})}let _e=E.state.transmissionRenderTarget[B.id],be=B.viewport||he;_e.setSize(be.z*P.transmissionResolutionScale,be.w*P.transmissionResolutionScale);let ge=P.getRenderTarget(),Ce=P.getActiveCubeFace(),De=P.getActiveMipmapLevel();P.setRenderTarget(_e),P.getClearColor(_t),et=P.getClearAlpha(),et<1&&P.setClearColor(16777215,.5),P.clear(),Mt&&Ve.render(G);let Ge=P.toneMapping;P.toneMapping=Bn;let qe=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),E.setupLightsView(B),Ue===!0&&Fe.setGlobalState(P.clippingPlanes,B),Pa(w,G,B),Y.updateMultisampleRenderTarget(_e),Y.updateRenderTargetMipmap(_e),ot.has("WEBGL_multisampled_render_to_texture")===!1){let Ne=!1;for(let ht=0,wt=U.length;ht<wt;ht++){let St=U[ht],{object:dt,geometry:Yt,material:Me,group:fn}=St;if(Me.side===Ft&&dt.layers.test(B.layers)){let nt=Me.side;Me.side=an,Me.needsUpdate=!0,Uu(dt,G,B,Yt,Me,fn),Me.side=nt,Me.needsUpdate=!0,Ne=!0}}Ne===!0&&(Y.updateMultisampleRenderTarget(_e),Y.updateRenderTargetMipmap(_e))}P.setRenderTarget(ge,Ce,De),P.setClearColor(_t,et),qe!==void 0&&(B.viewport=qe),P.toneMapping=Ge}function Pa(w,U,G){let B=U.isScene===!0?U.overrideMaterial:null;for(let z=0,_e=w.length;z<_e;z++){let be=w[z],{object:ge,geometry:Ce,group:De}=be,Ge=be.material;Ge.allowOverride===!0&&B!==null&&(Ge=B),ge.layers.test(G.layers)&&Uu(ge,U,G,Ce,Ge,De)}}function Uu(w,U,G,B,z,_e){w.onBeforeRender(P,U,G,B,z,_e),w.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),z.onBeforeRender(P,U,G,B,w,_e),z.transparent===!0&&z.side===Ft&&z.forceSinglePass===!1?(z.side=an,z.needsUpdate=!0,P.renderBufferDirect(G,U,B,z,w,_e),z.side=Nn,z.needsUpdate=!0,P.renderBufferDirect(G,U,B,z,w,_e),z.side=Ft):P.renderBufferDirect(G,U,B,z,w,_e),w.onAfterRender(P,U,G,B,z,_e)}function Ia(w,U,G){U.isScene!==!0&&(U=Wt);let B=H.get(w),z=E.state.lights,_e=E.state.shadowsArray,be=z.state.version,ge=ue.getParameters(w,z.state,_e,U,G,E.state.lightProbeGridArray),Ce=ue.getProgramCacheKey(ge),De=B.programs;B.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?U.environment:null,B.fog=U.fog;let Ge=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;B.envMap=se.get(w.envMap||B.environment,Ge),B.envMapRotation=B.environment!==null&&w.envMap===null?U.environmentRotation:w.envMapRotation,De===void 0&&(w.addEventListener("dispose",Vn),De=new Map,B.programs=De);let qe=De.get(Ce);if(qe!==void 0){if(B.currentProgram===qe&&B.lightsStateVersion===be)return Ou(w,ge),qe}else ge.uniforms=ue.getUniforms(w),L!==null&&w.isNodeMaterial&&L.build(w,G,ge),w.onBeforeCompile(ge,P),qe=ue.acquireProgram(ge,Ce),De.set(Ce,qe),B.uniforms=ge.uniforms;let Ne=B.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ne.clippingPlanes=Fe.uniform),Ou(w,ge),B.needsLights=hm(w),B.lightsStateVersion=be,B.needsLights&&(Ne.ambientLightColor.value=z.state.ambient,Ne.lightProbe.value=z.state.probe,Ne.directionalLights.value=z.state.directional,Ne.directionalLightShadows.value=z.state.directionalShadow,Ne.spotLights.value=z.state.spot,Ne.spotLightShadows.value=z.state.spotShadow,Ne.rectAreaLights.value=z.state.rectArea,Ne.ltc_1.value=z.state.rectAreaLTC1,Ne.ltc_2.value=z.state.rectAreaLTC2,Ne.pointLights.value=z.state.point,Ne.pointLightShadows.value=z.state.pointShadow,Ne.hemisphereLights.value=z.state.hemi,Ne.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Ne.spotLightMatrix.value=z.state.spotLightMatrix,Ne.spotLightMap.value=z.state.spotLightMap,Ne.pointShadowMatrix.value=z.state.pointShadowMatrix),B.lightProbeGrid=E.state.lightProbeGridArray.length>0,B.currentProgram=qe,B.uniformsList=null,qe}function Fu(w){if(w.uniformsList===null){let U=w.currentProgram.getUniforms();w.uniformsList=ur.seqWithValue(U.seq,w.uniforms)}return w.uniformsList}function Ou(w,U){let G=H.get(w);G.outputColorSpace=U.outputColorSpace,G.batching=U.batching,G.batchingColor=U.batchingColor,G.instancing=U.instancing,G.instancingColor=U.instancingColor,G.instancingMorph=U.instancingMorph,G.skinning=U.skinning,G.morphTargets=U.morphTargets,G.morphNormals=U.morphNormals,G.morphColors=U.morphColors,G.morphTargetsCount=U.morphTargetsCount,G.numClippingPlanes=U.numClippingPlanes,G.numIntersection=U.numClipIntersection,G.vertexAlphas=U.vertexAlphas,G.vertexTangents=U.vertexTangents,G.toneMapping=U.toneMapping}function om(w,U){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;_.setFromMatrixPosition(U.matrixWorld);for(let G=0,B=w.length;G<B;G++){let z=w[G];if(z.texture!==null&&z.boundingBox.containsPoint(_))return z}return null}function cm(w,U,G,B,z){U.isScene!==!0&&(U=Wt),Y.resetTextureUnits();let _e=U.fog,be=B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial?U.environment:null,ge=Q===null?P.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Ye.workingColorSpace,Ce=B.isMeshStandardMaterial||B.isMeshLambertMaterial&&!B.envMap||B.isMeshPhongMaterial&&!B.envMap,De=se.get(B.envMap||be,Ce),Ge=B.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,qe=!!G.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Ne=!!G.morphAttributes.position,ht=!!G.morphAttributes.normal,wt=!!G.morphAttributes.color,St=Bn;B.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(St=P.toneMapping);let dt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Yt=dt!==void 0?dt.length:0,Me=H.get(B),fn=E.state.lights;if(Ue===!0&&(Re===!0||w!==ae)){let gt=w===ae&&B.id===ne;Fe.setState(B,w,gt)}let nt=!1;B.version===Me.__version?(Me.needsLights&&Me.lightsStateVersion!==fn.state.version||Me.outputColorSpace!==ge||z.isBatchedMesh&&Me.batching===!1||!z.isBatchedMesh&&Me.batching===!0||z.isBatchedMesh&&Me.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Me.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Me.instancing===!1||!z.isInstancedMesh&&Me.instancing===!0||z.isSkinnedMesh&&Me.skinning===!1||!z.isSkinnedMesh&&Me.skinning===!0||z.isInstancedMesh&&Me.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Me.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Me.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Me.instancingMorph===!1&&z.morphTexture!==null||Me.envMap!==De||B.fog===!0&&Me.fog!==_e||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==Fe.numPlanes||Me.numIntersection!==Fe.numIntersection)||Me.vertexAlphas!==Ge||Me.vertexTangents!==qe||Me.morphTargets!==Ne||Me.morphNormals!==ht||Me.morphColors!==wt||Me.toneMapping!==St||Me.morphTargetsCount!==Yt||!!Me.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(nt=!0):(nt=!0,Me.__version=B.version);let vn=Me.currentProgram;nt===!0&&(vn=Ia(B,U,z),L&&B.isNodeMaterial&&L.onUpdateProgram(B,vn,Me));let Gn=!1,Ai=!1,Ss=!1,ft=vn.getUniforms(),Tt=Me.uniforms;if(v.useProgram(vn.program)&&(Gn=!0,Ai=!0,Ss=!0),B.id!==ne&&(ne=B.id,Ai=!0),Me.needsLights){let gt=om(E.state.lightProbeGridArray,z);Me.lightProbeGrid!==gt&&(Me.lightProbeGrid=gt,Ai=!0)}if(Gn||ae!==w){v.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),ft.setValue(N,"projectionMatrix",w.projectionMatrix),ft.setValue(N,"viewMatrix",w.matrixWorldInverse);let Ci=ft.map.cameraPosition;Ci!==void 0&&Ci.setValue(N,tt.setFromMatrixPosition(w.matrixWorld)),C.logarithmicDepthBuffer&&ft.setValue(N,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ft.setValue(N,"isOrthographic",w.isOrthographicCamera===!0),ae!==w&&(ae=w,Ai=!0,Ss=!0)}if(Me.needsLights&&(fn.state.directionalShadowMap.length>0&&ft.setValue(N,"directionalShadowMap",fn.state.directionalShadowMap,Y),fn.state.spotShadowMap.length>0&&ft.setValue(N,"spotShadowMap",fn.state.spotShadowMap,Y),fn.state.pointShadowMap.length>0&&ft.setValue(N,"pointShadowMap",fn.state.pointShadowMap,Y)),z.isSkinnedMesh){ft.setOptional(N,z,"bindMatrix"),ft.setOptional(N,z,"bindMatrixInverse");let gt=z.skeleton;gt&&(gt.boneTexture===null&&gt.computeBoneTexture(),ft.setValue(N,"boneTexture",gt.boneTexture,Y))}z.isBatchedMesh&&(ft.setOptional(N,z,"batchingTexture"),ft.setValue(N,"batchingTexture",z._matricesTexture,Y),ft.setOptional(N,z,"batchingIdTexture"),ft.setValue(N,"batchingIdTexture",z._indirectTexture,Y),ft.setOptional(N,z,"batchingColorTexture"),z._colorsTexture!==null&&ft.setValue(N,"batchingColorTexture",z._colorsTexture,Y));let Ri=G.morphAttributes;if((Ri.position!==void 0||Ri.normal!==void 0||Ri.color!==void 0)&&D.update(z,G,vn),(Ai||Me.receiveShadow!==z.receiveShadow)&&(Me.receiveShadow=z.receiveShadow,ft.setValue(N,"receiveShadow",z.receiveShadow)),(B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial)&&B.envMap===null&&U.environment!==null&&(Tt.envMapIntensity.value=U.environmentIntensity),Tt.dfgLUT!==void 0&&(Tt.dfgLUT.value=dv()),Ai){if(ft.setValue(N,"toneMappingExposure",P.toneMappingExposure),Me.needsLights&&lm(Tt,Ss),_e&&B.fog===!0&&Le.refreshFogUniforms(Tt,_e),Le.refreshMaterialUniforms(Tt,B,ie,re,E.state.transmissionRenderTarget[w.id]),Me.needsLights&&Me.lightProbeGrid){let gt=Me.lightProbeGrid;Tt.probesSH.value=gt.texture,Tt.probesMin.value.copy(gt.boundingBox.min),Tt.probesMax.value.copy(gt.boundingBox.max),Tt.probesResolution.value.copy(gt.resolution)}ur.upload(N,Fu(Me),Tt,Y)}if(B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(ur.upload(N,Fu(Me),Tt,Y),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ft.setValue(N,"center",z.center),ft.setValue(N,"modelViewMatrix",z.modelViewMatrix),ft.setValue(N,"normalMatrix",z.normalMatrix),ft.setValue(N,"modelMatrix",z.matrixWorld),B.uniformsGroups!==void 0){let gt=B.uniformsGroups;for(let Ci=0,Es=gt.length;Ci<Es;Ci++){let Bu=gt[Ci];te.update(Bu,vn),te.bind(Bu,vn)}}return vn}function lm(w,U){w.ambientLightColor.needsUpdate=U,w.lightProbe.needsUpdate=U,w.directionalLights.needsUpdate=U,w.directionalLightShadows.needsUpdate=U,w.pointLights.needsUpdate=U,w.pointLightShadows.needsUpdate=U,w.spotLights.needsUpdate=U,w.spotLightShadows.needsUpdate=U,w.rectAreaLights.needsUpdate=U,w.hemisphereLights.needsUpdate=U}function hm(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(w,U,G){let B=H.get(w);B.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),H.get(w.texture).__webglTexture=U,H.get(w.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:G,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,U){let G=H.get(w);G.__webglFramebuffer=U,G.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(w,U=0,G=0){Q=w,X=U,W=G;let B=null,z=!1,_e=!1;if(w){let ge=H.get(w);if(ge.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(N.FRAMEBUFFER,ge.__webglFramebuffer),he.copy(w.viewport),ve.copy(w.scissor),Je=w.scissorTest,v.viewport(he),v.scissor(ve),v.setScissorTest(Je),ne=-1;return}else if(ge.__webglFramebuffer===void 0)Y.setupRenderTarget(w);else if(ge.__hasExternalTextures)Y.rebindTextures(w,H.get(w.texture).__webglTexture,H.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let Ge=w.depthTexture;if(ge.__boundDepthTexture!==Ge){if(Ge!==null&&H.has(Ge)&&(w.width!==Ge.image.width||w.height!==Ge.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(w)}}let Ce=w.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(_e=!0);let De=H.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(De[U])?B=De[U][G]:B=De[U],z=!0):w.samples>0&&Y.useMultisampledRTT(w)===!1?B=H.get(w).__webglMultisampledFramebuffer:Array.isArray(De)?B=De[G]:B=De,he.copy(w.viewport),ve.copy(w.scissor),Je=w.scissorTest}else he.copy(ee).multiplyScalar(ie).floor(),ve.copy(Ee).multiplyScalar(ie).floor(),Je=xe;if(G!==0&&(B=V),v.bindFramebuffer(N.FRAMEBUFFER,B)&&v.drawBuffers(w,B),v.viewport(he),v.scissor(ve),v.setScissorTest(Je),z){let ge=H.get(w.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+U,ge.__webglTexture,G)}else if(_e){let ge=U;for(let Ce=0;Ce<w.textures.length;Ce++){let De=H.get(w.textures[Ce]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Ce,De.__webglTexture,G,ge)}}else if(w!==null&&G!==0){let ge=H.get(w.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ge.__webglTexture,G)}ne=-1},this.readRenderTargetPixels=function(w,U,G,B,z,_e,be,ge=0){if(!(w&&w.isWebGLRenderTarget)){ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=H.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&be!==void 0&&(Ce=Ce[be]),Ce){v.bindFramebuffer(N.FRAMEBUFFER,Ce);try{let De=w.textures[ge],Ge=De.format,qe=De.type;if(w.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ge),!C.textureFormatReadable(Ge)){ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!C.textureTypeReadable(qe)){ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=w.width-B&&G>=0&&G<=w.height-z&&N.readPixels(U,G,B,z,fe.convert(Ge),fe.convert(qe),_e)}finally{let De=Q!==null?H.get(Q).__webglFramebuffer:null;v.bindFramebuffer(N.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(w,U,G,B,z,_e,be,ge=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=H.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&be!==void 0&&(Ce=Ce[be]),Ce)if(U>=0&&U<=w.width-B&&G>=0&&G<=w.height-z){v.bindFramebuffer(N.FRAMEBUFFER,Ce);let De=w.textures[ge],Ge=De.format,qe=De.type;if(w.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ge),!C.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!C.textureTypeReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ne=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Ne),N.bufferData(N.PIXEL_PACK_BUFFER,_e.byteLength,N.STREAM_READ),N.readPixels(U,G,B,z,fe.convert(Ge),fe.convert(qe),0);let ht=Q!==null?H.get(Q).__webglFramebuffer:null;v.bindFramebuffer(N.FRAMEBUFFER,ht);let wt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await cf(N,wt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Ne),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,_e),N.deleteBuffer(Ne),N.deleteSync(wt),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,U=null,G=0){let B=Math.pow(2,-G),z=Math.floor(w.image.width*B),_e=Math.floor(w.image.height*B),be=U!==null?U.x:0,ge=U!==null?U.y:0;Y.setTexture2D(w,0),N.copyTexSubImage2D(N.TEXTURE_2D,G,0,0,be,ge,z,_e),v.unbindTexture()},this.copyTextureToTexture=function(w,U,G=null,B=null,z=0,_e=0){let be,ge,Ce,De,Ge,qe,Ne,ht,wt,St=w.isCompressedTexture?w.mipmaps[_e]:w.image;if(G!==null)be=G.max.x-G.min.x,ge=G.max.y-G.min.y,Ce=G.isBox3?G.max.z-G.min.z:1,De=G.min.x,Ge=G.min.y,qe=G.isBox3?G.min.z:0;else{let Tt=Math.pow(2,-z);be=Math.floor(St.width*Tt),ge=Math.floor(St.height*Tt),w.isDataArrayTexture?Ce=St.depth:w.isData3DTexture?Ce=Math.floor(St.depth*Tt):Ce=1,De=0,Ge=0,qe=0}B!==null?(Ne=B.x,ht=B.y,wt=B.z):(Ne=0,ht=0,wt=0);let dt=fe.convert(U.format),Yt=fe.convert(U.type),Me;U.isData3DTexture?(Y.setTexture3D(U,0),Me=N.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Y.setTexture2DArray(U,0),Me=N.TEXTURE_2D_ARRAY):(Y.setTexture2D(U,0),Me=N.TEXTURE_2D),v.activeTexture(N.TEXTURE0),v.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,U.flipY),v.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),v.pixelStorei(N.UNPACK_ALIGNMENT,U.unpackAlignment);let fn=v.getParameter(N.UNPACK_ROW_LENGTH),nt=v.getParameter(N.UNPACK_IMAGE_HEIGHT),vn=v.getParameter(N.UNPACK_SKIP_PIXELS),Gn=v.getParameter(N.UNPACK_SKIP_ROWS),Ai=v.getParameter(N.UNPACK_SKIP_IMAGES);v.pixelStorei(N.UNPACK_ROW_LENGTH,St.width),v.pixelStorei(N.UNPACK_IMAGE_HEIGHT,St.height),v.pixelStorei(N.UNPACK_SKIP_PIXELS,De),v.pixelStorei(N.UNPACK_SKIP_ROWS,Ge),v.pixelStorei(N.UNPACK_SKIP_IMAGES,qe);let Ss=w.isDataArrayTexture||w.isData3DTexture,ft=U.isDataArrayTexture||U.isData3DTexture;if(w.isDepthTexture){let Tt=H.get(w),Ri=H.get(U),gt=H.get(Tt.__renderTarget),Ci=H.get(Ri.__renderTarget);v.bindFramebuffer(N.READ_FRAMEBUFFER,gt.__webglFramebuffer),v.bindFramebuffer(N.DRAW_FRAMEBUFFER,Ci.__webglFramebuffer);for(let Es=0;Es<Ce;Es++)Ss&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,H.get(w).__webglTexture,z,qe+Es),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,H.get(U).__webglTexture,_e,wt+Es)),N.blitFramebuffer(De,Ge,be,ge,Ne,ht,be,ge,N.DEPTH_BUFFER_BIT,N.NEAREST);v.bindFramebuffer(N.READ_FRAMEBUFFER,null),v.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(z!==0||w.isRenderTargetTexture||H.has(w)){let Tt=H.get(w),Ri=H.get(U);v.bindFramebuffer(N.READ_FRAMEBUFFER,q),v.bindFramebuffer(N.DRAW_FRAMEBUFFER,O);for(let gt=0;gt<Ce;gt++)Ss?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Tt.__webglTexture,z,qe+gt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Tt.__webglTexture,z),ft?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ri.__webglTexture,_e,wt+gt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ri.__webglTexture,_e),z!==0?N.blitFramebuffer(De,Ge,be,ge,Ne,ht,be,ge,N.COLOR_BUFFER_BIT,N.NEAREST):ft?N.copyTexSubImage3D(Me,_e,Ne,ht,wt+gt,De,Ge,be,ge):N.copyTexSubImage2D(Me,_e,Ne,ht,De,Ge,be,ge);v.bindFramebuffer(N.READ_FRAMEBUFFER,null),v.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else ft?w.isDataTexture||w.isData3DTexture?N.texSubImage3D(Me,_e,Ne,ht,wt,be,ge,Ce,dt,Yt,St.data):U.isCompressedArrayTexture?N.compressedTexSubImage3D(Me,_e,Ne,ht,wt,be,ge,Ce,dt,St.data):N.texSubImage3D(Me,_e,Ne,ht,wt,be,ge,Ce,dt,Yt,St):w.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,_e,Ne,ht,be,ge,dt,Yt,St.data):w.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,_e,Ne,ht,St.width,St.height,dt,St.data):N.texSubImage2D(N.TEXTURE_2D,_e,Ne,ht,be,ge,dt,Yt,St);v.pixelStorei(N.UNPACK_ROW_LENGTH,fn),v.pixelStorei(N.UNPACK_IMAGE_HEIGHT,nt),v.pixelStorei(N.UNPACK_SKIP_PIXELS,vn),v.pixelStorei(N.UNPACK_SKIP_ROWS,Gn),v.pixelStorei(N.UNPACK_SKIP_IMAGES,Ai),_e===0&&U.generateMipmaps&&N.generateMipmap(Me),v.unbindTexture()},this.initRenderTarget=function(w){H.get(w).__webglFramebuffer===void 0&&Y.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?Y.setTextureCube(w,0):w.isData3DTexture?Y.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?Y.setTexture2DArray(w,0):Y.setTexture2D(w,0),v.unbindTexture()},this.resetState=function(){X=0,W=0,Q=null,v.reset(),ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}};function Gf(s,e=!1){let t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,c=new Qe,l=0;for(let h=0;h<s.length;++h){let u=s[h],d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(u.morphAttributes[f])}if(e){let f;if(t)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(t){let h=0,u=[];for(let d=0;d<s.length;++d){let f=s[d].index;for(let p=0;p<f.count;++p)u.push(f.getX(p)+h);h+=s[d].attributes.position.count}c.setIndex(u)}for(let h in r){let u=Vf(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in a){let u=a[h][0].length;if(u!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let x=0;x<a[h].length;++x)f.push(a[h][x][d]);let p=Vf(f);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(p)}}}return c}function Vf(s){let e,t,n,i=-1,r=0;for(let l=0;l<s.length;++l){let h=s[l];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let a=new e(r),o=new At(a,t,n),c=0;for(let l=0;l<s.length;++l){let h=s[l];if(h.isInterleavedBufferAttribute){let u=c/t;for(let d=0,f=h.count;d<f;d++)for(let p=0;p<t;p++){let x=h.getComponent(d,p);o.setComponent(d+u,p,x)}}else a.set(h.array,c);c+=h.count*t}return i!==void 0&&(o.gpuType=i),o}function zh(s,e){if(e===gh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===lr||e===pa){let t=s.getIndex();if(t===null){let a=[],o=s.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===lr)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}function Wf(s){let e=new Map,t=new Map,n=s.clone();return Xf(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let r=i,a=e.get(i),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Xf(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)Xf(s.children[n],e.children[n],t)}var Oc=class extends jn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new qh(t)}),this.register(function(t){return new Yh(t)}),this.register(function(t){return new nu(t)}),this.register(function(t){return new iu(t)}),this.register(function(t){return new su(t)}),this.register(function(t){return new Kh(t)}),this.register(function(t){return new $h(t)}),this.register(function(t){return new jh(t)}),this.register(function(t){return new Jh(t)}),this.register(function(t){return new Xh(t)}),this.register(function(t){return new Qh(t)}),this.register(function(t){return new Zh(t)}),this.register(function(t){return new tu(t)}),this.register(function(t){return new eu(t)}),this.register(function(t){return new Gh(t)}),this.register(function(t){return new Bc(t,je.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Bc(t,je.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new ru(t)})}load(e,t,n,i){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=bi.extractUrlBase(e);a=bi.resolveURL(l,this.path)}else a=bi.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new ir(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===$f){try{a[je.KHR_BINARY_GLTF]=new au(e)}catch(u){i&&i(u);return}r=JSON.parse(a[je.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new fu(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case je.KHR_MATERIALS_UNLIT:a[u]=new Wh;break;case je.KHR_DRACO_MESH_COMPRESSION:a[u]=new ou(r,this.dracoLoader);break;case je.KHR_TEXTURE_TRANSFORM:a[u]=new cu;break;case je.KHR_MESH_QUANTIZATION:a[u]=new lu;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function fv(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}function It(s,e,t){let n=s.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var je={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Gh=class{constructor(e){this.parser=e,this.name=je.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new we(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],tn);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Vi(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new na(h),l.distance=u;break;case"spot":l=new ta(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),ii(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},Wh=class{constructor(){this.name=je.KHR_MATERIALS_UNLIT}getMaterialType(){return xt}extendParams(e,t,n){let i=[];e.color=new we(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],tn),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,yt))}return Promise.all(i)}},Xh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=It(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},qh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return It(this.parser,e,this.name)!==null?cn:null}extendMaterialParams(e,t){let n=It(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new oe(r,r)}return Promise.all(i)}},Yh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_DISPERSION}getMaterialType(e){return It(this.parser,e,this.name)!==null?cn:null}extendMaterialParams(e,t){let n=It(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},Zh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return It(this.parser,e,this.name)!==null?cn:null}extendMaterialParams(e,t){let n=It(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}},Kh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_SHEEN}getMaterialType(e){return It(this.parser,e,this.name)!==null?cn:null}extendMaterialParams(e,t){let n=It(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(t.sheenColor=new we(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],tn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,yt)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}},$h=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return It(this.parser,e,this.name)!==null?cn:null}extendMaterialParams(e,t){let n=It(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}},jh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_VOLUME}getMaterialType(e){return It(this.parser,e,this.name)!==null?cn:null}extendMaterialParams(e,t){let n=It(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new we().setRGB(r[0],r[1],r[2],tn),Promise.all(i)}},Jh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_IOR}getMaterialType(e){return It(this.parser,e,this.name)!==null?cn:null}extendMaterialParams(e,t){let n=It(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},Qh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_SPECULAR}getMaterialType(e){return It(this.parser,e,this.name)!==null?cn:null}extendMaterialParams(e,t){let n=It(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new we().setRGB(r[0],r[1],r[2],tn),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,yt)),Promise.all(i)}},eu=class{constructor(e){this.parser=e,this.name=je.EXT_MATERIALS_BUMP}getMaterialType(e){return It(this.parser,e,this.name)!==null?cn:null}extendMaterialParams(e,t){let n=It(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}},tu=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return It(this.parser,e,this.name)!==null?cn:null}extendMaterialParams(e,t){let n=It(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}},nu=class{constructor(e){this.parser=e,this.name=je.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},iu=class{constructor(e){this.parser=e,this.name=je.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},su=class{constructor(e){this.parser=e,this.name=je.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},Bc=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){let f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}},ru=class{constructor(e){this.name=je.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==Tn.TRIANGLES&&l.mode!==Tn.TRIANGLE_STRIP&&l.mode!==Tn.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,f=[];for(let p of u){let x=new ke,m=new T,g=new $t,M=new T(1,1,1),b=new Pt(p.geometry,p.material,d);for(let _=0;_<d;_++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,_),c.ROTATION&&g.fromBufferAttribute(c.ROTATION,_),c.SCALE&&M.fromBufferAttribute(c.SCALE,_),b.setMatrixAt(_,x.compose(m,g,M));for(let _ in c)if(_==="_COLOR_0"){let S=c[_];b.instanceColor=new Bi(S.array,S.itemSize,S.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&p.geometry.setAttribute(_,c[_]);$e.prototype.copy.call(b,p),this.parser.assignFinalMaterial(b),f.push(b)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},$f="glTF",ya=12,qf={JSON:1313821514,BIN:5130562},au=class{constructor(e){this.name=je.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,ya),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==$f)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-ya,r=new DataView(e,ya),a=0;for(;a<i;){let o=r.getUint32(a,!0);a+=4;let c=r.getUint32(a,!0);if(a+=4,c===qf.JSON){let l=new Uint8Array(e,ya+a,o);this.content=n.decode(l)}else if(c===qf.BIN){let l=ya+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},ou=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=je.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let h in a){let u=uu[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=uu[h]||h.toLowerCase();if(a[h]!==void 0){let d=n.accessors[e.attributes[h]],f=fr[d.componentType];l[u]=f.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(let p in f.attributes){let x=f.attributes[p],m=c[p];m!==void 0&&(x.normalized=m)}u(f)},o,l,tn,d)})})}},cu=class{constructor(){this.name=je.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},lu=class{constructor(){this.name=je.KHR_MESH_QUANTIZATION}},zc=class extends $n{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,p=e*l,x=p-l,m=-2*f+3*d,g=f-d,M=1-m,b=g-d+u;for(let _=0;_!==o;_++){let S=a[x+_+o],E=a[x+_+c]*h,R=a[p+_+o],y=a[p+_]*h;r[_]=M*S+b*E+m*R+g*y}return r}},pv=new $t,hu=class extends zc{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return pv.fromArray(r).normalize().toArray(r),r}},Tn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},fr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Yf={9728:Rt,9729:Ct,9984:Wo,9985:ar,9986:xs,9987:zn},Zf={33071:Sn,33648:Hs,10497:Oi},kh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},uu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ki={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},mv={CUBICSPLINE:void 0,LINEAR:os,STEP:as},Hh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function gv(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new it({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Nn})),s.DefaultMaterial}function vs(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ii(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function xv(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;a.push(d)}if(i){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;o.push(d)}if(r){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],d=l[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function _v(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function yv(s){let e,t=s.extensions&&s.extensions[je.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Vh(t.attributes):e=s.indices+":"+Vh(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+Vh(s.targets[n]);return e}function Vh(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function du(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function vv(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var Mv=new ke,fu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new fv,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?this.textureLoader=new jr(this.options.manager):this.textureLoader=new ia(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ir(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return vs(r,o,i),ii(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,h]of a.children.entries())r(h,o.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[je.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,a){n.load(bi.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let a=kh[i.type],o=fr[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new At(l,a,c))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],c=kh[i.type],l=fr[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0,x,m;if(f&&f!==u){let g=Math.floor(d/f),M="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+g+":"+i.count,b=t.cache.get(M);b||(x=new l(o,g*f,i.count*f/h),b=new Zs(x,f/h),t.cache.add(M,b)),m=new Ks(b,c,d%f/h,p)}else o===null?x=new l(i.count*c):x=new l(o,d,i.count*c),m=new At(x,c,p);if(i.sparse!==void 0){let g=kh.SCALAR,M=fr[i.sparse.indices.componentType],b=i.sparse.indices.byteOffset||0,_=i.sparse.values.byteOffset||0,S=new M(a[1],b,i.sparse.count*g),E=new l(a[2],_,i.sparse.count*c);o!==null&&(m=new At(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let R=0,y=S.length;R<y;R++){let A=S[R];if(m.setX(A,E[R*c]),c>=2&&m.setY(A,E[R*c+1]),c>=3&&m.setZ(A,E[R*c+2]),c>=4&&m.setW(A,E[R*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=p}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let i=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let d=(r.samplers||{})[a.sampler]||{};return h.magFilter=Yf[d.magFilter]||Ct,h.minFilter=Yf[d.minFilter]||zn,h.wrapS=Zf[d.wrapS]||Oi,h.wrapT=Zf[d.wrapT]||Oi,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Rt&&h.minFilter!==Ct,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=i.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(u){l=!0;let d=new Blob([u],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(d,f){let p=d;t.isImageBitmapLoader===!0&&(p=function(x){let m=new Ut(x);m.needsUpdate=!0,d(m)}),t.load(bi.resolveURL(u,r.path),p,void 0,f)})}).then(function(u){return l===!0&&o.revokeObjectURL(c),ii(u,a),u.userData.mimeType=a.mimeType||vv(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[je.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[je.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=r.associations.get(a);a=r.extensions[je.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Js,nn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new xn,nn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return it}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],a,o={},c=r.extensions||{},l=[];if(c[je.KHR_MATERIALS_UNLIT]){let u=i[je.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),l.push(u.extendParams(o,r,t))}else{let u=r.pbrMetallicRoughness||{};if(o.color=new we(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],tn),o.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",u.baseColorTexture,yt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Ft);let h=r.alphaMode||Hh.OPAQUE;if(h===Hh.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Hh.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==xt&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new oe(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==xt&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==xt){let u=r.emissiveFactor;o.emissive=new we().setRGB(u[0],u[1],u[2],tn)}return r.emissiveTexture!==void 0&&a!==xt&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,yt)),Promise.all(l).then(function(){let u=new a(o);return r.name&&(u.name=r.name),ii(u,r),t.associations.set(u,{materials:e}),r.extensions&&vs(i,u,r),u})}createUniqueName(e){let t=pt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[je.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return Kf(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],h=yv(l),u=i[h];if(u)a.push(u.promise);else{let d;l.extensions&&l.extensions[je.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=Kf(new Qe,l,t),i[h]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let h=a[c].material===void 0?gv(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let f=0,p=h.length;f<p;f++){let x=h[f],m=a[f],g,M=l[f];if(m.mode===Tn.TRIANGLES||m.mode===Tn.TRIANGLE_STRIP||m.mode===Tn.TRIANGLE_FAN||m.mode===void 0)g=r.isSkinnedMesh===!0?new Or(x,M):new Pe(x,M),g.isSkinnedMesh===!0&&g.normalizeSkinWeights(),m.mode===Tn.TRIANGLE_STRIP?g.geometry=zh(g.geometry,pa):m.mode===Tn.TRIANGLE_FAN&&(g.geometry=zh(g.geometry,lr));else if(m.mode===Tn.LINES)g=new Zn(x,M);else if(m.mode===Tn.LINE_STRIP)g=new pi(x,M);else if(m.mode===Tn.LINE_LOOP)g=new ls(x,M);else if(m.mode===Tn.POINTS)g=new zr(x,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(g.geometry.morphAttributes).length>0&&_v(g,r),g.name=t.createUniqueName(r.name||"mesh_"+e),ii(g,r),m.extensions&&vs(i,g,m),t.assignFinalMaterial(g),u.push(g)}for(let f=0,p=u.length;f<p;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&vs(i,u[0],r),u[0];let d=new Ke;r.extensions&&vs(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,p=u.length;f<p;f++)d.add(u[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Vt(Ze.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Jn(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ii(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),a=i,o=[],c=[];for(let l=0,h=a.length;l<h;l++){let u=a[l];if(u){o.push(u);let d=new ke;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Br(o,c)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){let f=i.channels[u],p=i.samplers[f.sampler],x=f.target,m=x.node,g=i.parameters!==void 0?i.parameters[p.input]:p.input,M=i.parameters!==void 0?i.parameters[p.output]:p.output;x.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",g)),c.push(this.getDependency("accessor",M)),l.push(p),h.push(x))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let d=u[0],f=u[1],p=u[2],x=u[3],m=u[4],g=[];for(let b=0,_=d.length;b<_;b++){let S=d[b],E=f[b],R=p[b],y=x[b],A=m[b];if(S===void 0)continue;S.updateMatrix&&S.updateMatrix();let P=n._createAnimationTracks(S,E,R,y,A);if(P)for(let I=0;I<P.length;I++)g.push(P[I])}let M=new $r(r,void 0,g);return ii(M,i),M})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));let c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){let h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Mv)});for(let f=0,p=u.length;f<p;f++)h.add(u[f]);if(h.userData.pivot!==void 0&&u.length>0){let f=h.userData.pivot,p=u[0];h.pivot=new T().fromArray(f),h.position.x-=f[0],h.position.y-=f[1],h.position.z-=f[2],p.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(r.isBone===!0?h=new $s:l.length>1?h=new Ke:l.length===1?h=l[0]:h=new $e,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=a),ii(h,r),r.extensions&&vs(n,h,r),r.matrix!==void 0){let u=new ke;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){let u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new Ke;n.name&&(r.name=i.createUniqueName(n.name)),ii(r,n),n.extensions&&vs(t,r,n);let a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,u=c.length;h<u;h++){let d=c[h];d.parent!==null?r.add(Wf(d)):r.add(d)}let l=h=>{let u=new Map;for(let[d,f]of i.associations)(d instanceof nn||d instanceof Ut)&&u.set(d,f);return h.traverse(d=>{let f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){let a=[],o=e.name?e.name:e.uuid,c=[];function l(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}Ki[r.path]===Ki.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(o);let h;switch(Ki[r.path]){case Ki.weights:h=yi;break;case Ki.rotation:h=vi;break;case Ki.translation:case Ki.scale:h=Hi;break;default:n.itemSize===1?h=yi:h=Hi;break}let u=i.interpolation!==void 0?mv[i.interpolation]:os,d=this._getArrayFromAccessor(n);for(let f=0,p=c.length;f<p;f++){let x=new h(c[f]+"."+Ki[r.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),a.push(x)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=du(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof vi?hu:zc;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function bv(s,e,t){let n=e.attributes,i=new Et;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new T(c[0],c[1],c[2]),new T(l[0],l[1],l[2])),o.normalized){let h=du(fr[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new T,c=new T;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],f=d.min,p=d.max;if(f!==void 0&&p!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(p[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(p[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(p[2]))),d.normalized){let x=du(fr[d.componentType]);c.multiplyScalar(x)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;let a=new jt;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function Kf(s,e,t){let n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){s.setAttribute(o,c)})}for(let a in n){let o=uu[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){let a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return Ye.workingColorSpace!==tn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ye.workingColorSpace}" not supported.`),ii(s,e),bv(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?xv(s,e.targets,t):s})}var jf={type:"change"},mu={type:"start"},Qf={type:"end"},kc=new Yn,Jf=new bn,Sv=Math.cos(70*Ze.DEG2RAD),zt=new T,un=2*Math.PI,ut={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},pu=1e-6,Hc=class extends ra{constructor(e,t=null){super(e,t),this.state=ut.NONE,this.target=new T,this.cursor=new T,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Gi.ROTATE,MIDDLE:Gi.DOLLY,RIGHT:Gi.PAN},this.touches={ONE:Wi.ROTATE,TWO:Wi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new T,this._lastQuaternion=new $t,this._lastTargetPosition=new T,this._quat=new $t().setFromUnitVectors(e.up,new T(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new sr,this._sphericalDelta=new sr,this._scale=1,this._panOffset=new T,this._rotateStart=new oe,this._rotateEnd=new oe,this._rotateDelta=new oe,this._panStart=new oe,this._panEnd=new oe,this._panDelta=new oe,this._dollyStart=new oe,this._dollyEnd=new oe,this._dollyDelta=new oe,this._dollyDirection=new T,this._mouse=new oe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=wv.bind(this),this._onPointerDown=Ev.bind(this),this._onPointerUp=Tv.bind(this),this._onContextMenu=Dv.bind(this),this._onMouseWheel=Cv.bind(this),this._onKeyDown=Pv.bind(this),this._onTouchStart=Iv.bind(this),this._onTouchMove=Lv.bind(this),this._onMouseDown=Av.bind(this),this._onMouseMove=Rv.bind(this),this._interceptControlDown=Nv.bind(this),this._interceptControlUp=Uv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(jf),this.update(),this.state=ut.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;zt.copy(t).sub(this.target),zt.applyQuaternion(this._quat),this._spherical.setFromVector3(zt),this.autoRotate&&this.state===ut.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=un:n>Math.PI&&(n-=un),i<-Math.PI?i+=un:i>Math.PI&&(i-=un),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(zt.setFromSpherical(this._spherical),zt.applyQuaternion(this._quatInverse),t.copy(this.target).add(zt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=zt.length();a=this._clampDistance(o*this._scale);let c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let o=new T(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new T(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=zt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(kc.origin.copy(this.object.position),kc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(kc.direction))<Sv?this.object.lookAt(this.target):(Jf.setFromNormalAndCoplanarPoint(this.object.up,this.target),kc.intersectPlane(Jf,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>pu||8*(1-this._lastQuaternion.dot(this.object.quaternion))>pu||this._lastTargetPosition.distanceToSquared(this.target)>pu?(this.dispatchEvent(jf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?un/60*this.autoRotateSpeed*e:un/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){zt.setFromMatrixColumn(t,0),zt.multiplyScalar(-e),this._panOffset.add(zt)}_panUp(e,t){this.screenSpacePanning===!0?zt.setFromMatrixColumn(t,1):(zt.setFromMatrixColumn(t,0),zt.crossVectors(this.object.up,zt)),zt.multiplyScalar(e),this._panOffset.add(zt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let i=this.object.position;zt.copy(i).sub(this.target);let r=zt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),i=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=i/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(un*this._rotateDelta.x/t.clientHeight),this._rotateUp(un*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(un*this._rotateDelta.x/t.clientHeight),this._rotateUp(un*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new oe,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Ev(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function wv(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function Tv(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Qf),this.state=ut.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Av(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Gi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=ut.DOLLY;break;case Gi.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=ut.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=ut.ROTATE}break;case Gi.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=ut.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=ut.PAN}break;default:this.state=ut.NONE}this.state!==ut.NONE&&this.dispatchEvent(mu)}function Rv(s){switch(this.state){case ut.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case ut.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case ut.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function Cv(s){this.enabled===!1||this.enableZoom===!1||this.state!==ut.NONE||(s.preventDefault(),this.dispatchEvent(mu),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(Qf))}function Pv(s){this.enabled!==!1&&this._handleKeyDown(s)}function Iv(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Wi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=ut.TOUCH_ROTATE;break;case Wi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=ut.TOUCH_PAN;break;default:this.state=ut.NONE}break;case 2:switch(this.touches.TWO){case Wi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=ut.TOUCH_DOLLY_PAN;break;case Wi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=ut.TOUCH_DOLLY_ROTATE;break;default:this.state=ut.NONE}break;default:this.state=ut.NONE}this.state!==ut.NONE&&this.dispatchEvent(mu)}function Lv(s){switch(this._trackPointer(s),this.state){case ut.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case ut.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case ut.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case ut.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=ut.NONE}}function Dv(s){this.enabled!==!1&&s.preventDefault()}function Nv(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Uv(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var va=class extends $e{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new oe(.5,.5),this.addEventListener("removed",function(){this.traverse(function(t){t.element&&t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this}},pr=new T,ep=new ke,tp=new ke,np=new T,ip=new T,Vc=class{constructor(e={}){let t=this,n,i,r,a,o={objects:new WeakMap},c=e.element!==void 0?e.element:document.createElement("div");c.style.overflow="hidden",this.domElement=c,this.sortObjects=!0,this.getSize=function(){return{width:n,height:i}},this.render=function(p,x){p.matrixWorldAutoUpdate===!0&&p.updateMatrixWorld(),x.parent===null&&x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),ep.copy(x.matrixWorldInverse),tp.multiplyMatrices(x.projectionMatrix,ep),h(p,p,x),this.sortObjects&&f(p)},this.setSize=function(p,x){n=p,i=x,r=n/2,a=i/2,c.style.width=p+"px",c.style.height=x+"px"};function l(p){p.isCSS2DObject&&(p.element.style.display="none");for(let x=0,m=p.children.length;x<m;x++)l(p.children[x])}function h(p,x,m){if(p.visible===!1){l(p);return}if(p.isCSS2DObject){pr.setFromMatrixPosition(p.matrixWorld),pr.applyMatrix4(tp);let g=pr.z>=-1&&pr.z<=1&&p.layers.test(m.layers)===!0,M=p.element;M.style.display=g===!0?"":"none",g===!0&&(p.onBeforeRender(t,x,m),M.style.transform="translate("+-100*p.center.x+"%,"+-100*p.center.y+"%)translate("+(pr.x*r+r)+"px,"+(-pr.y*a+a)+"px)",M.parentNode!==c&&c.appendChild(M),p.onAfterRender(t,x,m));let b={distanceToCameraSquared:u(m,p)};o.objects.set(p,b)}for(let g=0,M=p.children.length;g<M;g++)h(p.children[g],x,m)}function u(p,x){return np.setFromMatrixPosition(p.matrixWorld),ip.setFromMatrixPosition(x.matrixWorld),np.distanceToSquared(ip)}function d(p){let x=[];return p.traverseVisible(function(m){m.isCSS2DObject&&x.push(m)}),x}function f(p){let x=d(p).sort(function(g,M){if(g.renderOrder!==M.renderOrder)return M.renderOrder-g.renderOrder;let b=o.objects.get(g).distanceToCameraSquared,_=o.objects.get(M).distanceToCameraSquared;return b-_}),m=x.length;for(let g=0,M=x.length;g<M;g++)x[g].element.style.zIndex=m-g}}};function sp(s,e=1.05,t=.86){let n=s.minX-e,i=s.maxX+e,r=s.minZ-e,a=s.maxZ+e,o=t,c=o*.5522847498,l=(f,p)=>new T(f,.145,p),h=new xi,u=(f,p)=>h.add(new Xt(l(...f),l(...p))),d=(f,p,x,m)=>h.add(new Fn(l(...f),l(...p),l(...x),l(...m)));return u([n+o,r],[i-o,r]),d([i-o,r],[i-o+c,r],[i,r+o-c],[i,r+o]),u([i,r+o],[i,a-o]),d([i,a-o],[i,a-o+c],[i-o+c,a],[i-o,a]),u([i-o,a],[n+o,a]),d([n+o,a],[n+o-c,a],[n,a-o+c],[n,a-o]),u([n,a-o],[n,r+o]),d([n,r+o],[n,r+o-c],[n+o-c,r],[n+o,r]),h}function Ms(s,e,t,n=1.72,i=n){s.updateMatrixWorld(!0);let r;s.traverse(S=>{S.isMesh&&!r&&(r=S)});let a=r.geometry.index?r.geometry.toNonIndexed():r.geometry.clone();a.applyMatrix4(r.matrixWorld),a.computeBoundingBox();let o=a.boundingBox,c=o.max.x-o.min.x,l=(o.max.z+o.min.z)/2,h=o.max.z-o.min.z,u=a.getAttribute("position"),d=a.getAttribute("uv"),f=a.getAttribute("normal"),p=[],x=[],m=[],g=Math.max(1,Math.ceil(t/i)),M=t/g;for(let S=0;S<g;S++)for(let E=0;E<u.count;E+=3)if(!(Math.abs(f.getX(E))>.99&&Math.abs(f.getX(E+1))>.99&&Math.abs(f.getX(E+2))>.99))for(let R=0;R<3;R++){let y=E+R,A=(S+(u.getX(y)-o.min.x)/c)*M,P=e(A),I=e(Math.min(t,A+.005)).sub(e(Math.max(0,A-.005))).normalize(),L=new T(-I.z,0,I.x);P.addScaledVector(L,(u.getZ(y)-l)/h*n),P.y+=(u.getY(y)-o.min.y)/h*n,p.push(P.x,P.y,P.z);let V=I.clone().multiplyScalar(f.getX(y)).addScaledVector(L,f.getZ(y));V.y=f.getY(y),V.normalize(),m.push(V.x,V.y,V.z),x.push(d.getX(y),d.getY(y))}a.dispose();let b=new Qe;b.setAttribute("position",new Oe(p,3)),b.setAttribute("normal",new Oe(m,3)),b.setAttribute("uv",new Oe(x,2)),b.computeBoundingSphere();let _=new Pe(b,r.material);return _.name="continuous-authored-road",_.receiveShadow=!0,_}var gu=.72;function Gc(s,e,t,{phase:n=0}={}){let i=new Ke;i.name="continuous-rail-corridor";let r=Math.max(2,Math.ceil((t-e)/.6)),a=[[],[],[]],o=[],c=[[],[],[]];for(let p=0;p<=r;p++){let x=Ze.lerp(e,t,p/r),m=s(x),g=s(x+.005).sub(s(x-.005)).normalize(),M=new T(-g.z,0,g.x);for(let b=0;b<3;b++){let _=b===0?0:b===1?-.43:.43,S=b===0?.74:.055,E=b===0?0:.11;for(let R of[-S,S]){let y=m.clone().addScaledVector(M,_+R);y.y+=E,a[b].push(y.x,y.y,y.z),c[b].push(0,1,0)}}if(p<r){let b=p*2;o.push(b,b+1,b+2,b+1,b+3,b+2)}}let l=[new it({color:7630947,roughness:1}),new it({color:3423037,metalness:.35,roughness:.55})];for(let p of l)p.userData.streamOwned=!0;a.forEach((p,x)=>{let m=new Qe;m.setAttribute("position",new Oe(p,3)),m.setAttribute("normal",new Oe(c[x],3)),m.setIndex(o);let g=new Pe(m,l[x?1:0]);g.receiveShadow=!0,i.add(g)});let h=Math.ceil((e+n)/gu),u=Math.ceil((t+n)/gu),d=new Pt(new vt(1.26,.08,.16),new it({color:9069895,roughness:1}),Math.max(0,u-h));d.material.userData.streamOwned=!0;let f=new $e;for(let p=h;p<u;p++){let x=p*gu-n,m=s(x),g=s(x+.005).sub(s(x-.005));f.position.copy(m),f.position.y+=.055,f.rotation.y=Math.atan2(g.x,g.z),f.updateMatrix(),d.setMatrixAt(p-h,f.matrix)}return d.receiveShadow=!0,i.add(d),i}var op=Object.freeze(Array.from({length:14},(s,e)=>{let t=15.7/1.49**e,n=e<2?[2.65,1.9][e]:2.6+Math.sin(e*2.399963)*.45,i=Math.PI*2/t;return Object.freeze({k:i,amplitude:.115/1.53**e,dx:Math.cos(n),dz:Math.sin(n),omega:Math.sqrt(2.1*i),phase:e*2.399963})})),cp=Object.freeze({vertexIterations:8,fragmentIterations:14});function si(s,e){return e+Math.sin(s*.042+.42)*.66+Math.sin(s*.119-.8)*.3}var rp=`
  uniform float uShoreX;
  float coastX(float z) { return uShoreX + sin(z * 0.042 + 0.42) * 0.66 + sin(z * 0.119 - 0.8) * 0.3; }
`,Fv=op.map((s,e)=>`
  #if OCEAN_WAVE_COUNT > ${e}
  {
    vec2 direction = vec2(${s.dx.toFixed(9)}, ${s.dz.toFixed(9)});
    float k = ${s.k.toFixed(9)};
    #ifdef WATER_FRAGMENT
    if (${e}.0 < uDetail && pixelWidth * k < 1.2) {
    #endif
    float phase = dot(p, direction) * k - time * ${s.omega.toFixed(9)} + ${s.phase.toFixed(9)};
    float amplitude = ${s.amplitude.toFixed(9)};
    #ifdef WATER_FRAGMENT
      amplitude *= 1.0 - smoothstep(0.4, 1.2, pixelWidth * k);
    #endif
    result += vec3(amplitude * sin(phase), amplitude * k * cos(phase) * direction);
    #ifdef WATER_FRAGMENT
    }
    #endif
  }
  #endif
`).join(`
`),ap=`
  vec3 sampleOcean(vec2 p, float time, float pixelWidth) {
    vec3 result = vec3(0.0);
    ${Fv}
    float distance = p.x - coastX(p.y);
    float blend = clamp(distance / 4.0, 0.0, 1.0);
    float envelope = blend * blend * (3.0 - 2.0 * blend);
    float derivative = (distance > 0.0 && distance < 4.0) ? 6.0 * blend * (1.0 - blend) / 4.0 : 0.0;
    float coastSlope = 0.66 * 0.042 * cos(p.y * 0.042 + 0.42) + 0.3 * 0.119 * cos(p.y * 0.119 - 0.8);
    return vec3(result.x * envelope, result.yz * envelope + result.x * derivative * vec2(1.0, -coastSlope));
  }
`;function Ma(s,e,t=0,n=8,i=-1/0){let r=0;for(let o of op.slice(0,n))r+=o.amplitude*Math.sin((s*o.dx+e*o.dz)*o.k-t*o.omega+o.phase);let a=Ze.clamp((s-si(e,i))/4,0,1);return a===0?0:r*a*a*(3-2*a)}function lp(s,e=14){return new rn({uniforms:{uTime:{value:0},uShoreX:{value:s},uDetail:{value:e},uViewDirection:{value:new T(-1,1,-1).normalize()},uSunDirection:{value:new T(-18,31,20).normalize()}},vertexShader:`
      uniform float uTime;
      varying vec3 vWorldPosition;
      ${rp}
      #define OCEAN_WAVE_COUNT 8
      ${ap}
      void main() {
        vec3 p = position;
        p.y += sampleOcean(p.xz, uTime, 0.0).x;
        vWorldPosition = p;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,fragmentShader:`
      uniform float uTime;
      uniform float uDetail;
      uniform vec3 uViewDirection;
      uniform vec3 uSunDirection;
      varying vec3 vWorldPosition;
      ${rp}
      #define WATER_FRAGMENT
      #define OCEAN_WAVE_COUNT ${e<=4?4:14}
      ${ap}
      void main() {
        vec2 p = vWorldPosition.xz;
        float footprint = max(length(dFdx(p)), length(dFdy(p)));
        vec3 wave = sampleOcean(p, uTime, footprint);
        vec3 normal = normalize(vec3(-wave.y, 1.0, -wave.z));
        vec3 view = normalize(uViewDirection);
        float facing = max(dot(normal, view), 0.001);
        float fresnel = 0.0204 + 0.9796 * pow(1.0 - facing, 5.0);
        float distance = max(0.0, p.x - coastX(p.y));
        float depth = max(0.02, 0.08 + distance * 0.32 + wave.x);
        vec3 transmittance = exp(-vec3(0.42, 0.095, 0.065) * depth / max(0.4, facing));
        vec3 seabed = vec3(0.43, 0.52, 0.31);
        vec3 deep = vec3(0.009, 0.105, 0.19);
        vec3 refracted = mix(deep, seabed, transmittance);
        // The reflection is a broad sky gradient, not a painted white stripe.
        vec3 reflectedDirection = reflect(-view, normal);
        vec3 sky = mix(vec3(0.59, 0.71, 0.68), vec3(0.22, 0.45, 0.56), clamp(reflectedDirection.y, 0.0, 1.0));
        vec3 halfVector = normalize(view + uSunDirection);
        float nh = max(dot(normal, halfVector), 0.0);
        float roughness = 0.19 + footprint * 0.025;
        float alpha2 = pow(roughness, 4.0);
        float denominator = nh * nh * (alpha2 - 1.0) + 1.0;
        float distribution = alpha2 / (3.14159265 * denominator * denominator);
        float sun = min(1.5, distribution * 0.02) * max(dot(normal, uSunDirection), 0.0);
        vec3 color = mix(refracted, sky, fresnel) + vec3(1.0, 0.88, 0.67) * sun;
        // Sparse, narrow wind-crest glints; avoid broad height-based color
        // patches, which read as clouds instead of a reflective water surface.
        float crest = smoothstep(0.16, 0.27, length(wave.yz));
        float broken = smoothstep(0.03, 0.11, wave.x);
        float ripple = crest * broken * smoothstep(1.0,5.0,distance) * (1.0-smoothstep(0.25,0.9,footprint));
        color += vec3(0.25,0.37,0.39) * ripple * 0.24;
        // Thin, broken incoming wash, confined to shallow water. Slow diagonal
        // variation prevents every beach point from breaking in lockstep.
        float washPhase = distance * 3.3 + uTime * 0.85 + sin(p.y * 0.37) * 0.7;
        float wash = pow(max(0.0, sin(washPhase)), 14.0);
        float fragments = smoothstep(-0.35, 0.45, sin(p.y * 1.17 + sin(p.y * 0.23) * 2.0));
        float foam = wash * fragments * (1.0 - smoothstep(0.25, 1.8, distance)) * smoothstep(0.0, 0.15, distance);
        color = mix(color, vec3(0.82, 0.88, 0.77), foam * 0.64);
        gl_FragColor = vec4(color, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `})}var _u=Ze.clamp,wi=Ze.lerp,xu=120;function Ov(s,e){return new class extends sn{getPoint(t,n=new T){let i=wi(s.z-62,s.z-1.8,t),r=s.x+2.6-si(s.z-1.8,e);return n.set(si(i,e)+wi(4.4,r,qt(t,.65,1)),.02,i)}}}function qt(s,e,t){let n=_u((s-e)/(t-e),0,1);return n*n*(3-2*n)}function Bv(s){let e=(s%xu+xu)%xu;return{t:e,phase:e<24?"arriving":e<46?"unloading":e<74?"delivering":e<106?"returning":"waiting",inbound:qt(e,0,24),outbound:qt(e,50,80),lift:qt(e,26,32),swing:qt(e,32,39),lower:qt(e,39,45),truckOut:qt(e,48,69),truckBack:qt(e,78,100)}}function hp(s,e,t,n=0){let r=e/1.2,a=8+r,o=((s+n*a)%a+a)%a,c=_u((o-8)/r,0,1);return{distance:(t+(.5-.5*Math.cos(c*Math.PI))*e)%e,dwelling:o<8,dwellProgress:_u(o/8,0,1),travelTime:Math.max(0,o-8),period:a}}function up(s,e){s.traverse(t=>{if(!t.isMesh)return;let n=(Array.isArray(t.material)?t.material:[t.material]).map(i=>{let r=i.clone();return delete r.userData.deployManagerSharedAsset,r.onBeforeCompile=a=>{a.uniforms.cityDusk=e,a.fragmentShader=`uniform float cityDusk;
`+a.fragmentShader,a.fragmentShader=a.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
          float windowMask = step(diffuseColor.r * 1.12, diffuseColor.b) * step(diffuseColor.g * 0.95, diffuseColor.b) * (1.0-step(0.32,max(diffuseColor.r,max(diffuseColor.g,diffuseColor.b))));
          totalEmissiveRadiance += vec3(0.65,0.28,0.055) * windowMask * cityDusk;
        `)},r.customProgramCacheKey=()=>"village-windows-v1",r});t.material=Array.isArray(t.material)?n:n[0]})}function dp(s){let e=new Ke;e.name="service-unavailable-barrier";let t=new it({color:14120765,roughness:1});for(let i of[-.65,.65]){let r=new Pe(new gi(.14,.42,5),t);r.position.set(i,.21,-2.12),e.add(r)}let n=new Pe(new vt(1.15,.18,.07),new it({color:15655087}));n.position.set(0,.32,-2.12),e.add(n);for(let i=0;i<4;i++){let r=new Pe(new vt(.12,.18,.075),t);r.position.set(-.42+i*.28,.32,-2.12),r.rotation.z=-.35,e.add(r)}e.visible=!1,s.add(e),s.userData.healthBarrier=e}async function fp(s,e,t,n){let[i,r]=await Promise.all([s.cloneAsset("watercraft/fishing",{width:.85,depth:1.85,height:1.1}),s.cloneAsset("cars/delivery",{width:.68,depth:1.4,height:.8})]);if(n!==s.worldGeneration)return;let a=new Ke;a.name="ambient-port-shift",e.add(a),s.storyActors.push(a),a.add(i,r);let o=new it({color:15054415,roughness:.85}),c=new Ke;c.position.set(t.x-.1,0,t.z-1.8),a.add(c);let l=new Pe(new vt(4,.12,.12),o);l.position.set(1.2,3,0),c.add(l);let h=new Pe(new vt(.48,.36,.35),new it({color:5138791}));h.position.set(-.5,2.85,0),c.add(h);let u=new Pe(new Kn(.014,.014,1,5),new it({color:4017997}));a.add(u);let d=new Pe(new vt(.4,.38,.4),new it({color:12158280}));a.add(d);let f=new Ke,p=new Pe(new hs(.065,.17,2,5),new it({color:14791244}));p.position.y=.2,f.add(p);let x=new Pe(new On(.066,6,4),new it({color:13738362}));x.position.y=.4,f.add(x),a.add(f);let m=Ov(t,s.perimeter.coast.shoreX);s.portLife={actors:a,boat:i,truck:r,boom:c,cable:u,crate:d,courier:f,route:m,harbor:t}}function pp(s,e,t){if(!s)return;let{boat:n,truck:i,boom:r,cable:a,crate:o,courier:c,route:l,harbor:h}=s,u=Bv(e),d=u.t<50?u.inbound:1-u.outbound,f=l.getPointAt(d),p=l.getTangentAt(Math.min(.9999,d));n.position.copy(f),n.position.y+=t(f.x,f.z,e),n.rotation.y=Math.atan2(p.x,p.z)+(u.t>=50?Math.PI:0);let x=wi(h.x-2.55,-11,u.t<74?u.truckOut:1-u.truckBack);if(i.position.set(x,.2,h.z+(u.t>=78&&u.t<100?.42:-.42)),i.rotation.y=u.t>=78&&u.t<100?Math.PI/2:-Math.PI/2,u.t>=74&&u.t<78){let b=(u.t-74)/4;i.position.set(-11-.8*Math.sin(b*Math.PI),.2,h.z-.42*Math.cos(b*Math.PI)),i.rotation.y=Math.atan2(-.8*Math.cos(b*Math.PI),.42*Math.sin(b*Math.PI))}if(u.t>=100&&u.t<106){let b=qt(u.t,100,106);i.position.set(h.x-2.55+.8*Math.sin(b*Math.PI),.2,h.z+.42*Math.cos(b*Math.PI)),i.rotation.y=Math.atan2(.8*Math.cos(b*Math.PI),-.42*Math.sin(b*Math.PI))}i.position.y+=.17*qt(i.position.x,h.x-2.5,h.x-1.5);let m=new T(h.x-2.55,.96,h.z-.42),g=new T(h.x+2.6,.93,h.z-1.8),M=g.clone().lerp(m,u.swing);M.y=wi(.93,2.55,u.lift)-u.lower*1.59,u.t<26&&(M.y=wi(2.55,.93,qt(u.t,24,26))),u.t>=46&&(M.y=wi(.96,2.55,qt(u.t,46,48))),u.t>=48&&M.lerp(g.clone().setY(2.55),qt(u.t,48,56)),r.rotation.y=-Math.atan2(M.z-r.position.z,M.x-r.position.x),a.position.set(M.x,(3+M.y)/2,M.z),a.scale.y=3-M.y,o.visible=u.t<110,u.t<26?o.position.copy(n.position).add(new T(0,.72,0)):u.t<46?o.position.copy(M).add(new T(0,-.19,0)):u.t<70?o.position.copy(i.position).add(new T(0,.57,0)):o.position.set(wi(-11,-11.6,qt(u.t,70,74)),wi(.77,.35,qt(u.t,70,74)),wi(h.z-.42,h.z+2.7,qt(u.t,70,74))),c.visible=u.t>=70&&u.t<78,c.position.set(o.position.x+.2,.18,o.position.z),c.scale.setScalar(1-qt(u.t,76,78)),s.phase=u.phase}function mp(s,e,t){let n=new Qe;n.setAttribute("position",new Oe([0,0,0,.32,.04,-.04,.1,0,.12],3)),n.computeVertexNormals();let i=new Pt(n,new xt({color:16249048,side:Ft}),12);i.boundingSphere=new jt(new T(t.x+4,6.6,t.z-4),7),i.name="harbor-gulls",e.add(i),s.storyActors.push(i),s.gulls={wings:i,harbor:t}}function gp(s,e){if(!s)return;let t=new $e,n=s.harbor;for(let i=0;i<6;i++)for(let r=0;r<2;r++){let a=e*(.065+i*.004)+i*1.17,o=3+i*.4;t.position.set(n.x+4+Math.cos(a)*o,6+i*.24+Math.sin(a*2)*.3,n.z-4+Math.sin(a)*o),t.rotation.set(0,-a,Math.sin(e*3+i)*.24*(r?1:-1)),t.scale.set(r?-1:1,1,1),t.updateMatrix(),s.wings.setMatrixAt(i*2+r,t.matrix)}s.wings.instanceMatrix.needsUpdate=!0}var zv=Object.freeze({"suburban/building-a":{offset:0,kind:"path"},"suburban/building-b":{offset:.18,kind:"driveway"},"suburban/building-d":{offset:-.16,kind:"driveway"},"suburban/building-e":{offset:0,kind:"path"},"suburban/building-h":{offset:0,kind:"path"},"suburban/building-r":{offset:0,kind:"path"}});function xp(s,e,t){let n=zv[s.key]??{offset:0,kind:"path"},i=Math.sign(e-s.z),r={x:s.x+n.offset*(t.max.x-t.min.x)*Math.cos(s.rotation),z:i>0?t.max.z+.025:t.min.z-.025},a={x:-11.5,z:e,radius:1.65},o;if(s.x<-10.5){let c=r.x-a.x,l=r.z-a.z,h=Math.hypot(c,l);o={x:a.x+c/h*a.radius,z:a.z+l/h*a.radius}}else o={x:r.x,z:e-i*.86};return{start:r,end:o,kind:n.kind,width:n.kind==="driveway"?.95:.42}}function yu(s,e){let{bounds:t,rail:n,highway:i}=s,r=t.maxZ+9,o={x:(m=>e.getPoint(Ze.clamp((m-s.coast.minZ)/s.coast.length,0,1)).x)(r),z:r,width:5.4,depth:9.8},c=[[0,t.maxZ],[0,r]],l=[-8,-3.7,4.2,8.4].map((m,g)=>({x:m,z:r+(g<2?-3.2:3.3),radius:2.25,key:["suburban/building-b","suburban/building-d","suburban/building-e","suburban/building-a"][g],rotation:g<2?0:Math.PI}));l.push({x:-12,z:r-4,radius:2.25,key:"suburban/building-h",rotation:0},{x:-12,z:r+4.2,radius:2.25,key:"suburban/building-r",rotation:Math.PI},{x:-7.6,z:r+4.2,radius:2.25,key:"suburban/building-b",rotation:Math.PI});let h=[[-11.5,r],[o.x-2.8,r]],u={x:n.x+1.6,z:0,radius:1,length:10.5},d=t.minX-2.4,f=s.streets?.edges.filter(({a:m,b:g})=>m.x===g.x&&Math.abs((m.z+g.z)/2)<u.length/2).map(({a:m,b:g})=>({x:m.x,z:(m.z+g.z)/2})).sort((m,g)=>m.x-g.x||Math.abs(m.z)-Math.abs(g.z)||m.z-g.z)[0],p=f?{width:1.05,crossing:f,walk:[[t.minX-1.98,f.z],[f.x-.86,f.z]]}:null,x=[[[u.x+.55,-3],[d,-3],[d,r],[-13.4,r]],[[-9.9,r-1.14],[o.x-2.8,r-1.14]],[[-9.9,r+1.14],[o.x-2.8,r+1.14]],...p?[p.walk]:[]];return{harbor:o,houses:l,station:u,walks:x,cityAccess:p,roads:[c,h,[[0,i.z],[0,t.minZ]]],pads:[...l,...[-4,0,4].map(m=>({x:u.x,z:m,radius:1})),{x:-11.5,z:r,radius:2},{x:o.x-1.65,z:o.z,radius:4.8}]}}function ba(s,e,t){return t?Math.min(...t.pads.map(n=>Math.hypot(s-n.x,e-n.z)-n.radius)):1/0}function _p(s,e){if(!s.length||e<=0)return;let t=s.map(n=>{let i=n.curve.getLength(),r=n.distance??n.offset*i,a=Math.sign(n.speed),o=i;for(let l of s){if(n===l)continue;let h=(a*((l.distance??l.offset*i)-r)%i+i)%i;o=Math.min(o,Math.max(0,h-(n.vehicleLength+l.vehicleLength)/2-.55))}let c=Math.min(n.cruiseSpeed*Math.min(e,.1),o);return((r+a*c)%i+i)%i});s.forEach((n,i)=>{n.distance=t[i]})}async function yp(s,e,{heightAt:t,siteDistance:n}){let i=new Ke;i.name="coastal-region-scenery",s.world.add(i);let r=s.regionalPlan,{harbor:a,station:o}=r,c=new Map,l=k=>(c.has(k)||c.set(k,new it({color:k,roughness:.9})),c.get(k)),h=(k,Z,ee,Ee,xe,Se,Ue,Re,rt=0)=>{let tt=new Pe(new vt(xe,Se,Ue),l(Re));return tt.name=k,tt.position.set(Z,ee,Ee),tt.rotation.y=rt,tt.castShadow=Se>.15,tt.receiveShadow=!0,i.add(tt),tt},u=(k,Z,ee,Ee)=>{let xe=new T().subVectors(Z,k),Se=new Pe(new Kn(ee,ee,xe.length(),6),l(Ee));return Se.position.copy(k).add(Z).multiplyScalar(.5),Se.quaternion.setFromUnitVectors(new T(0,1,0),xe.normalize()),Se.castShadow=!0,i.add(Se),Se},d=(k,Z=.15)=>new wn(k.map(([ee,Ee])=>new T(ee,Z,Ee)),!1,"centripetal"),f=(k,Z,ee,Ee=.15)=>{for(let xe=1;xe<k.length;xe+=1){let[Se,Ue]=k[xe-1],[Re,rt]=k[xe];h("regional-road",(Se+Re)/2,Ee,(Ue+rt)/2,Z,.07,Math.hypot(Re-Se,rt-Ue)+Z,ee,Math.atan2(Re-Se,rt-Ue))}},p=(k,Z,ee,Ee,xe=.16)=>h("private-frontage",(k.x+Z.x)/2,xe,(k.z+Z.z)/2,ee,.04,Math.hypot(Z.x-k.x,Z.z-k.z),Ee,Math.atan2(Z.x-k.x,Z.z-k.z)),x=[],m=(k,Z,ee,Ee,xe,Se,Ue,Re=0)=>{let rt=s.cloneAsset(k,{width:xe,depth:Se,height:Ue}).then(tt=>e!==s.worldGeneration?null:(tt.position.set(Z,ee,Ee),tt.rotation.y=Re,tt.name=`regional:${k}`,i.add(tt),tt));return x.push(rt),rt},g=new Pt(new vt(.06,.4,.06),l(11452084),240);g.name="highway-guardrail-posts";let M=new $e,b=0;for(let k of[-1.22,1.22]){let Z=[],ee=()=>{if(Z.length>1){let Ee=new Pe(new Yr(new wn(Z),Z.length*2,.045,4,!1),l(12964033));Ee.name="continuous-highway-guardrail",i.add(Ee)}Z=[]};for(let Ee=0;Ee<=230;Ee+=1){let xe=Ee/230,Se=s.highwayCurve.getPointAt(xe),Ue=s.highwayCurve.getTangentAt(Math.min(xe,.9999)),Re=Se.clone().addScaledVector(new T(-Ue.z,0,Ue.x).normalize(),k);if(Re.y=.63,Math.abs(Re.x)<1.5&&Math.abs(Re.z-s.highwayZ)<2){ee();continue}Z.push(Re),Ee%2===0&&(M.position.set(Re.x,.43,Re.z),M.updateMatrix(),g.setMatrixAt(b++,M.matrix))}ee()}g.count=b,g.instanceMatrix.needsUpdate=!0,i.add(g);let _=s.highwayZ;h("town-junction-asphalt",0,.205,_+.1,3.25,.06,2.2,5462631),h("town-entry-stop-line",.4,.225,_+1.64,.6,.018,.09,15986127);for(let k of[-1.25,1.25])h("junction-corner-island",k,.25,_+1.37,.5,.18,.55,12962236);let S=(k,Z,ee,Ee)=>{let xe=document.createElement("canvas");xe.width=256,xe.height=128;let Se=xe.getContext("2d");Se.fillStyle=Z,Se.fillRect(0,0,256,128),Se.strokeStyle="#f6f0d9",Se.lineWidth=6,Se.strokeRect(6,6,244,116),Se.fillStyle="#fff9df",Se.font="bold 48px sans-serif",Se.textAlign="center",Se.textBaseline="middle",Se.fillText(k,128,65);let Ue=new Hr(xe);Ue.colorSpace=yt,Ue.userData.cityGenerated=!0;let Re=new Pe(new ds(ee,Ee),new xt({map:Ue,side:Ft}));return i.add(Re),Re},E=-1.16;u(new T(E,.2,_+1.8),new T(E,1.32,_+1.8),.035,7440253);let R=new Pe(new Kn(.26,.26,.045,8),l(12078136));R.rotation.x=Math.PI/2,R.position.set(E,1.34,_+1.8),i.add(R),S("STOP","#b84c38",.34,.16).position.set(E,1.34,_+1.83);let A=S("CITY  \u2192","#266e64",1.05,.48);A.position.set(-3.9,1.25,_-1.55),A.rotation.y=-Math.PI/2,u(new T(-3.9,.2,_-1.55),new T(-3.9,1.5,_-1.55),.035,7440253);let P=s.layout.streets.junctions.filter(k=>k.signaled),I=new Ke;I.name="four-sided-hover-signals",I.position.y=2.85,i.add(I);let L=new $e,V=new Pt(new vt(.5,.64,.5),l(2505784),P.length),q=new Pt(new fs(.35,.018,5,16),new xt({color:8182723}),P.length);P.forEach((k,Z)=>{L.position.set(k.x,0,k.z),L.rotation.set(0,0,0),L.updateMatrix(),V.setMatrixAt(Z,L.matrix),L.position.y=-.36,L.rotation.x=Math.PI/2,L.updateMatrix(),q.setMatrixAt(Z,L.matrix)}),I.add(V,q);let O=[];for(let k of["x","z"])for(let Z=0;Z<3;Z++){let ee=[15297359,15186513,5493927][Z],Ee=new Pt(new On(.065,6,5),new xt({color:ee}),P.length*2);P.forEach((xe,Se)=>[-1,1].forEach((Ue,Re)=>{L.position.set(xe.x+(k==="x"?Ue*.27:0),.2-Z*.2,xe.z+(k==="z"?Ue*.27:0)),L.rotation.set(0,0,0),L.updateMatrix(),Ee.setMatrixAt(Se*2+Re,L.matrix)})),I.add(Ee),O.push({mesh:Ee,hex:ee,axis:k,color:["red","amber","green"][Z]})}s.signalFixtures.push({group:I,lamps:O}),s.stage.dataset.signalJunctions=String(P.length);let X=await s.cloneAsset("roads/straight",{width:1,depth:1,exact:!0});if(e!==s.worldGeneration)return;for(let k of r.roads)for(let Z=1;Z<k.length;Z++){let ee=new Xt(new T(k[Z-1][0],.15,k[Z-1][1]),new T(k[Z][0],.15,k[Z][1])),Ee=ee.getLength();i.add(Ms(X,xe=>ee.getPointAt(xe/Ee),Ee,1.72))}m("roads/crossroad",0,.17,a.z,1.72,1.72,.2);for(let[k,Z,ee]of[[1.9,.14,12962260],[1.65,.19,5462631]]){let Ee=new Pe(new Gr(k,40),l(ee));Ee.rotation.x=-Math.PI/2,Ee.position.set(-11.5,Z,a.z),Ee.receiveShadow=!0,i.add(Ee)}for(let k of r.houses){h("village-garden",k.x,.05,k.z,3.65,.2,4,10465912),x.push(m(k.key,k.x,.17,k.z,2.65,2.7,2.8,k.rotation).then(Z=>{if(!Z)return;up(Z,s.windowDusk);let ee=xp(k,a.z,new Et().setFromObject(Z));p(ee.start,ee.end,ee.width,ee.kind==="driveway"?10922660:14208690),h("entrance-step",ee.start.x,.2,ee.start.z,ee.width,.08,.25,13945776)}));for(let Z of[-1.7,1.7])h("garden-hedge",k.x+Z,.38,k.z,.22,.5,3.2,5667922);m("suburban/tree-small",k.x-1.05,.16,k.z-1.3,.8,.8,1.8)}for(let k of r.walks)for(let Z=1;Z<k.length;Z++)p({x:k[Z-1][0],z:k[Z-1][1]},{x:k[Z][0],z:k[Z][1]},k===r.cityAccess?.walk?r.cityAccess.width:.45,14208690,.145);h("station-platform",o.x,.28,o.z,1.2,.45,o.length,12960944),h("platform-safety-line",o.x-.44,.512,0,.07,.012,10.2,16043877);for(let k of[-3.6,-1.2,1.2,3.6])h("station-canopy-post",o.x+.34,1.15,k,.07,1.5,.07,3497562),h("platform-bench",o.x+.17,.77,k+.35,.34,.12,.65,10119243);h("station-canopy",o.x+.06,1.94,0,1.42,.15,8.8,4426368),h("station-canopy-ridge",o.x+.06,2.05,0,.22,.12,8.8,15591115);let W=s.bounds.minX-1.98;h("station-forecourt",(o.x+.6+W)/2,.135,0,W-o.x-.6,.16,11.6,14143927),h("station-ramp-landing",(o.x+.12+W)/2,.135,5.55,W-o.x+.2,.16,.65,14143927);let Q=new Pe(new vt(.65,.08,2.4),l(12960944));if(Q.name="station-access-ramp",Q.position.set(o.x+.12,.32,4.4),Q.rotation.x=.13,i.add(Q),r.cityAccess){let{crossing:k,width:Z}=r.cityAccess;for(let ee=0;ee<7;ee++)h("station-pedestrian-crossing",k.x-.6+ee*.2,.183,k.z,.12,.012,Z,15328718)}h("harbor-quay",a.x-.55,.12,a.z,2.9,.48,a.depth,12106149),h("quay-coping",a.x+.84,.39,a.z,.16,.12,a.depth,15326909);for(let k of[a.z-3.5,a.z+3.5]){h("timber-pier",a.x+2.3,.28,k,3.5,.2,.78,10188884);for(let Z=a.x+.7;Z<a.x+4.1;Z+=.48)h("pier-plank",Z,.388,k,.035,.014,.76,7822403);for(let Z of[a.x+1,a.x+3.8])for(let ee of[-.32,.32])u(new T(Z,-.35,k+ee),new T(Z,.64,k+ee),.075,7102800)}for(let k=0;k<7;k+=1){let Z=a.z-4.1+k*1.36;h("quay-fender",a.x+.95,.16,Z,.14,.33,.3,3556676),u(new T(a.x+.62,.36,Z),new T(a.x+.62,.61,Z),.07,3822932)}m("industrial/building-p",a.x-2.1,.15,a.z-2.7,2,2.2,2.5,Math.PI/2);let ne=S("PORT 443","#266e64",1.45,.5);ne.position.set(a.x-3.13,1.05,a.z-2.7),ne.rotation.y=-Math.PI/2,m("industrial/container-a",a.x-1.1,.37,a.z+2.3,.85,1.6,.9),m("industrial/container-b",a.x-2.2,.37,a.z+2.2,.85,1.6,.9),h("crane-base",a.x-.1,.55,a.z-1.8,.55,.38,.55,5138791),u(new T(a.x-.1,.7,a.z-1.8),new T(a.x-.1,3,a.z-1.8),.085,15317329),x.push(fp(s,i,a,e)),mp(s,i,a),m("watercraft/sail",a.x+2.3,.02,a.z+2.2,.85,1.75,2.1,Math.PI/2);for(let k of[-5.4,5.4])m("watercraft/buoy",a.x+5.5,.02,a.z+k,.38,.38,.75);let ae=a.z+7.5,he=s.coastlineCurve.getPoint((ae-s.perimeter.coast.minZ)/s.perimeter.coast.length).x-1.25;f([[a.x-1.3,a.z+4.5],[he,ae]],.5,13219725,.18);let ve=new Pe(new Kn(.32,.57,2.7,10),l(15918792));ve.position.set(he,1.3,ae),ve.castShadow=!0,i.add(ve);let Je=new Pe(new gi(.63,.52,10),l(11885380));Je.position.set(he,3.18,ae),Je.castShadow=!0,i.add(Je),h("lighthouse-lantern",he,2.78,ae,.55,.45,.55,16041829),h("lighthouse-door",he-.5,.39,ae,.05,.6,.3,4352102);let _t=[[[o.x+.08,-4.7],[o.x+.08,4.7],.53],[[a.x-.05,a.z-4.5],[a.x-.05,a.z+4.5],.37],[[-9.5,a.z+1.15],[a.x-3.5,a.z+1.15],.18]];for(let k=0;k<12;k+=1){let[Z,ee,Ee]=_t[k%_t.length],xe=new Ke;xe.name="ambient-pedestrian";let Se=new Pe(new hs(.065,.17,2,5),l([14457428,4685202,10180178,15785906][k%4]));Se.position.y=.2;let Ue=new Pe(new On(.067,6,4),l(k%2?11040341:14989195));Ue.position.y=.39,xe.add(Se,Ue),i.add(xe);let Re=d(k%2?[ee,Z]:[Z,ee],Ee);s.motion.push({object:xe,curve:Re,speed:.012+k*.001,...k%3===0?{stationPassenger:{x:o.x-.43,boardX:s.railX+.35,z:-2+k/3*1.6}}:{},offset:k*.233%1,pingPong:!0,bob:.01})}for(let[k,Z]of["watercraft/sail","watercraft/speed"].entries()){let ee=a.x+14+k*5,Ee=await m(Z,ee,.03,a.z,1.05,2.35,2.65);if(!Ee||e!==s.worldGeneration)return;let xe=d([[ee,-27],[ee+2,-8],[ee-1,15],[ee+3,38],[ee+7,64]],.02);s.motion.push({object:Ee,curve:xe,speed:k?-.017:.0055,offset:k?.4:.25,rotationOffset:k?Math.PI:0,wrap:!0,surface:"ocean",bob:.025})}let et=240,$=new Pt(new Xr(1,0),l(9017225),et);$.name="instanced-coastal-and-hillside-rocks",$.receiveShadow=!0,$.castShadow=!0;let re=new $e,ie=0;for(let k=0;k<1600&&ie<et;k+=1){let Z=rt=>(Math.sin(k*71.13+rt*93.7)*43147.18%1+1)%1,ee=Ze.lerp(s.bounds.minZ-34,s.bounds.maxZ+43,Z(1)),Ee=s.coastlineCurve.getPoint((ee-s.perimeter.coast.minZ)/s.perimeter.coast.length).x,xe=k%3===0,Se=xe?Ee-Z(2)*1.5:Ze.lerp(s.bounds.minX-34,Ee-5,Z(2));if(n(Se,ee)<2||ba(Se,ee,r)<1.5)continue;let Ue=t(Se,ee),Re=xe?.2+Z(3)*.45:.2+Z(3)*.85;re.position.set(Se,Ue+Re*.12,ee),re.scale.set(Re*1.4,Re*.6,Re),re.rotation.set(Z(4)*.6,Z(5)*Math.PI,Z(6)*.5),re.updateMatrix(),$.setMatrixAt(ie++,re.matrix)}$.count=ie,$.instanceMatrix.needsUpdate=!0,i.add($),await Promise.all(x)}var mr=32;function Mp(s){return["highway","rail"].flatMap(e=>[0,1].map(t=>{let n=s[e].getPointAt(t),i=s[e].getTangentAt(t?.999999:1e-6).multiplyScalar(t?1:-1).normalize();return{kind:e,end:t,origin:n,direction:i}}))}function Wc(s,e){let t=Math.max(0,e),n=s.origin.clone().addScaledVector(s.direction,t),i=4*(1-Math.cos(t/48));return s.kind==="highway"?n.x-=i:n.z+=i,n}function Sa(s,e,t){let n=1/0;for(let i of t??[]){let r=(s-i.origin.x)*i.direction.x+(e-i.origin.z)*i.direction.z;if(r<-2)continue;let a=Wc(i,r);n=Math.min(n,Math.hypot(a.x-s,a.z-e))}return n}function kv(s,e,t=mr){let n=[];for(let i=Math.floor((s.x-e)/t);i<=Math.floor((s.x+e)/t);i+=1)for(let r=Math.floor((s.z-e)/t);r<=Math.floor((s.z+e)/t);r+=1)n.push(`${i}:${r}`);return n}function vp(s,e,t,{shoreX:n,heightAt:i,colorAt:r},a=24){let o=mr,c=[],l=[],h=[];for(let f=0;f<=a;f+=1){let p=e*o+f/a*o,x=si(p,n),m=t?Math.max(s*o,x):s*o,g=t?(s+1)*o:Math.min((s+1)*o,x);for(let M=0;M<=a;M+=1){let b=Ze.lerp(m,Math.max(m,g),M/a);c.push(b,t?0:i(b,p),p);let _=t?new we:r(b,p);if(l.push(_.r,_.g,_.b),M<a&&f<a){let S=f*(a+1)+M,E=S+a+1;h.push(S,E,S+1,S+1,E,E+1)}}}let u=new Qe;u.setAttribute("position",new Oe(c,3)),u.setAttribute("color",new Oe(l,3)),u.setIndex(h);let d=[];for(let f=0;f<c.length;f+=3){let p=c[f],x=c[f+2],m=.12,g=t?new T(0,1,0):new T(i(p-m,x)-i(p+m,x),2*m,i(p,x-m)-i(p,x+m)).normalize();d.push(g.x,g.y,g.z)}return u.setAttribute("normal",new Oe(d,3)),u.computeBoundingSphere(),u}var Xc=class{constructor({world:e,waterMaterial:t,roadModel:n,treeModel:i,context:r,heightAt:a,colorAt:o,siteDistance:c,resolution:l=24,treeCount:h=45}){this.resolution=l,this.treeCount=h,Object.assign(this,{world:e,waterMaterial:t,roadModel:n,treeModel:i,context:r,heightAt:a,colorAt:o,siteDistance:c}),this.chunks=new Map,this.routes=new Map,this.terrainMaterial=new it({vertexColors:!0,roughness:1}),this.disposed=!1}update(e,t,{frustum:n=null,deferred:i=!1}={}){if(this.disposed)return;let r=new Set(kv(e,t).filter(o=>{if(!n)return!0;let[c,l]=o.split(":").map(Number);return n.intersectsBox(new Et(new T(c*32-5,-1,l*32-5),new T((c+1)*32+5,9,(l+1)*32+5)))}));for(let[o,c]of this.chunks)r.has(o)||(this.release(c),this.chunks.delete(o));this.pending=[...r].filter(o=>!this.chunks.has(o)).sort((o,c)=>{let l=h=>{let[u,d]=h.split(":").map(Number);return Math.hypot((u+.5)*32-e.x,(d+.5)*32-e.z)};return l(o)-l(c)});let a=new Set;this.pendingRoutes=[];for(let[o,c]of this.context.continuations.entries()){let l=(e.x-c.origin.x)*c.direction.x+(e.z-c.origin.z)*c.direction.z,h=Wc(c,l);if(!(Math.hypot(h.x-e.x,h.z-e.z)>t+45))for(let u=Math.max(0,Math.floor((l-t-12)/32));u<=Math.max(-1,Math.floor((l+t+12)/32));u+=1){let d=`${o}:${u}`;a.add(d),this.routes.has(d)||this.pendingRoutes.push({key:d,route:c,chunk:u})}}for(let[o,c]of this.routes)a.has(o)||(this.release(c),this.routes.delete(o));i||this.drain(1/0)}drain(e=1){if(!this.disposed)for(let t=0;t<e;t++)if(this.pending?.length)this.buildSurfaceChunk(this.pending.shift());else if(this.pendingRoutes?.length){let{key:n,route:i,chunk:r}=this.pendingRoutes.shift(),a=this.buildRouteChunk(i,r);this.world.add(a),this.routes.set(n,a)}else break}get pendingCount(){return(this.pending?.length??0)+(this.pendingRoutes?.length??0)}buildSurfaceChunk(e){let[t,n]=e.split(":").map(Number),i=new Ke;i.name=`world-chunk:${e}`;let r=t*mr,a=r+mr,o={shoreX:this.context.perimeter.coast.shoreX,heightAt:this.heightAt,colorAt:this.colorAt};if(r<o.shoreX+1){let c=new Pe(vp(t,n,!1,o,this.resolution),this.terrainMaterial);c.name="analytic-rolling-terrain",c.receiveShadow=!0,i.add(c)}if(a>o.shoreX-1){let c=new Pe(vp(t,n,!0,o,this.resolution),this.waterMaterial);c.name="open-ocean-boundary",i.add(c)}if(r<o.shoreX-2){let c=[];for(let l=0;l<this.treeCount;l+=1){let h=p=>(Math.sin(t*127.1+n*311.7+l*71.3+p)*43758.5453%1+1)%1,u=r+h(1)*mr,d=(n+h(3))*mr,f=this.context.perimeter.bounds;u>f.minX-32&&u<f.maxX+2&&d>f.minZ-30&&d<f.maxZ+38||u>si(d,o.shoreX)-2||this.siteDistance(u,d)<3.4||c.push({x:u,z:d,scale:.8+h(4)*.7})}this.treeModel.updateMatrixWorld(!0),this.treeModel.traverse(l=>{if(!l.isMesh)return;let h=new Pt(l.geometry,l.material,c.length);h.userData.streamBorrowed=!0;let u=new $e;c.forEach((d,f)=>{u.position.set(d.x,this.heightAt(d.x,d.z),d.z),u.scale.setScalar(d.scale),u.updateMatrix(),h.setMatrixAt(f,u.matrix.clone().multiply(l.matrixWorld))}),h.castShadow=!0,i.add(h)})}this.world.add(i),this.chunks.set(e,i)}buildRouteChunk(e,t){let n=t*32,i=n+32;if(e.kind==="rail"){let a=e.end?this.context.railLength:0;return Gc(o=>Wc(e,o),n,i,{phase:a})}let r=new Ke;return r.name=`endless-highway:${t}`,r.add(Ms(this.roadModel,a=>{let o=Wc(e,n+a);return o.y=.145,o},32,2.28)),r}release(e){this.world.remove(e);let t=new Set;e.traverse(n=>{n.isInstancedMesh&&n.dispose(),n.geometry&&!n.userData.streamBorrowed&&n.geometry.dispose(),n.material?.userData.streamOwned&&t.add(n.material)});for(let n of t)n.dispose()}dispose(){this.disposed=!0,this.pending=[],this.pendingRoutes=[];for(let e of[...this.chunks.values(),...this.routes.values()])this.release(e);this.chunks.clear(),this.routes.clear(),this.terrainMaterial.dispose()}};function Ea(s,e=[]){let t=new Set(e.filter(Boolean)),n=new Map,i=new Map;s.updateMatrixWorld(!0);let r=s.matrixWorld.clone().invert();s.traverse(o=>{if(!o.isMesh&&!o.isLineSegments||o.isInstancedMesh||Array.isArray(o.material)||o.material.transparent&&!o.isLineSegments)return;for(let h=o;h;h=h.parent)if(t.has(h))return;if(o.isLineSegments&&o.material.isLineBasicMaterial&&!o.material.map){let h=o.material,u=[h.color.getHex(),h.opacity,h.transparent,h.depthTest,h.depthWrite,h.blending,h.linewidth,h.toneMapped].join(":");i.has(u)||i.set(u,h),o.material=i.get(u)}let l=`${o.name.includes("tree")?`${Math.floor(o.matrixWorld.elements[12]/16)}:${Math.floor(o.matrixWorld.elements[14]/16)}`:""}:${o.isLineSegments?"line":"mesh"}:${o.material.id}:${o.castShadow}:${o.receiveShadow}:${Object.keys(o.geometry.attributes).sort().join(",")}`;n.has(l)||n.set(l,[]),n.get(l).push(o)});let a=0;for(let o of n.values()){if(o.length<2)continue;let c=o[0],l=c.isMesh&&o.every(u=>u.geometry===c.geometry),h;if(l)h=new Pt(c.geometry,c.material,o.length),o.forEach((u,d)=>h.setMatrixAt(d,r.clone().multiply(u.matrixWorld)));else{let u=o.map(f=>(f.geometry.index?f.geometry.toNonIndexed():f.geometry.clone()).applyMatrix4(r.clone().multiply(f.matrixWorld))),d=Gf(u);for(let f of u)f.dispose();if(!d)continue;h=c.isLineSegments?new Zn(d,c.material):new Pe(d,c.material)}h.name="batched-static-scenery",h.castShadow=c.castShadow,h.receiveShadow=c.receiveShadow;for(let u of o){for(let d of[...u.children])t.has(d)&&s.attach(d);u.parent?.remove(u)}if(s.add(h),a+=o.length-1,!l)for(let u of new Set(o.map(d=>d.geometry)))u.userData.deployManagerSharedAsset||u.dispose()}return a}var qc=Object.freeze({x:-6.97,z:-6.97}),Hv=[-6.97,0,6.97].flatMap(s=>[-6.97,0,6.97].map(e=>({x:s,z:e,key:`${s}:${e}`})));function vu(s){let e=(s%18+18)%18;return e<6?{x:"green",z:"red"}:e<8?{x:"amber",z:"red"}:e<9?{x:"red",z:"red"}:e<15?{x:"red",z:"green"}:e<17?{x:"red",z:"amber"}:{x:"red",z:"red"}}function ri(s,e){let t=s.curve.getLength(),n=s.once?Ze.clamp(e/t,0,.999999):(e/t%1+1)%1,i=s.curve.getPointAt(n),r=s.curve.getTangentAt(Math.min(.999999,n));return s.speed<0&&r.negate(),{x:i.x,z:i.z,dx:r.x,dz:r.z,halfLength:(s.bodyLength??1.5)/2,halfWidth:(s.bodyWidth??.7)/2}}function gr(s,e,t=.04){let n=[[s.dx,s.dz],[-s.dz,s.dx],[e.dx,e.dz],[-e.dz,e.dx]];for(let[i,r]of n){let a=o=>Math.abs(o.dx*i+o.dz*r)*o.halfLength+Math.abs(-o.dz*i+o.dx*r)*o.halfWidth;if(Math.abs((s.x-e.x)*i+(s.z-e.z)*r)>=a(s)+a(e)+t)return!1}return!0}function Mu(s,e=.42){let t=Array.from({length:Math.max(100,Math.ceil(s.getLength()*4))},(i,r)=>r),n=t.length;return new wn(t.map(i=>{let r=i/(n-1),a=s.getPointAt(r),o=s.getTangentAt(Math.min(r,.999999));return a.addScaledVector(new T(-o.z,0,o.x).normalize(),e)}),!1,"centripetal")}function bu(s,e,t,n=[],i=Hv){if(e>.05){let h=Math.ceil(Math.min(e,.25)/.05),u=Math.min(e,.25)/h;for(let d=0;d<h;d++)bu(s,u,t-(h-1-d)*u,n,i);return}let r=[];for(let h of s){if(h.cityDistance===void 0){let u=h.curve.getLength();for(let d=0;d<100;d++){let f=(h.offset*u+d*u/100)%u,p=ri(h,f);if(i.every(x=>Math.hypot(p.x-x.x,p.z-x.z)>2.3)&&r.every(x=>!gr(p,ri(x,x.cityDistance),.12))){h.cityDistance=f;break}}}h.cityDistance!==void 0&&r.push(h)}let a=vu(t),o=new Map(r.map(h=>[h,ri(h,h.cityDistance)])),c=new Map,l=new Map;for(let h of r){let u=o.get(h);if(h.junction){let m=Math.hypot(u.x-h.junction.x,u.z-h.junction.z);m<1.7&&(h.enteredJunction=!0),h.enteredJunction&&m>2.45||!h.enteredJunction&&m>4.2?(h.junction=null,h.enteredJunction=!1):c.set(h.junction.key,h)}let d=Math.abs(u.dx)>Math.abs(u.dz)?"x":"z",f=d==="x"?"z":"x",p=Math.sign(d==="x"?u.dx:u.dz),x=i.map(m=>({...m,axis:d,along:(u[d]-m[d])*p,across:Math.abs(u[f]-m[f])})).filter(m=>m.along<-.9&&m.along>-3.7&&m.across<1.05).sort((m,g)=>g.along-m.along)[0];x&&l.set(h,x)}for(let h of[...r].sort((u,d)=>+!!d.once-+!!u.once)){let u=l.get(h);!u||h.junction||c.has(u.key)||(u.signaled??(u.x===qc.x&&u.z===qc.z))&&a[u.axis]!=="green"||(h.junction=u,h.enteredJunction=!1,c.set(u.key,h))}for(let h of r){h.reverseRemaining>0&&t>(h.recoveryUntil??1/0)&&(h.reverseRemaining=0,h.yieldUntil=t+1,h.blockedSeconds=0);let u=h.cityDistance,d=o.get(h),f=Math.abs(d.dx)>Math.abs(d.dz)?"x":"z",p=Math.min(e,.05)*(h.cruiseSpeed??.9)*Math.sign(h.speed);h.reverseRemaining>0?p=-Math.sign(h.speed)*Math.min(h.reverseRemaining,Math.min(e,.05)*.6):(h.yieldUntil??0)>t&&(p=0);let x=l.get(h);if(x&&c.get(x.key)!==h&&!(h.reverseRemaining>0)&&(p=Math.sign(p)*Math.min(Math.abs(p),Math.max(0,-2.45-x.along))),x&&(x.signaled??(x.x===qc.x&&x.z===qc.z))&&!h.enteredJunction&&!(h.reverseRemaining>0)&&a[f]!=="green"){let S=Math.max(0,-1.25-x.along-d.halfLength);p=Math.sign(p)*Math.min(Math.abs(p),S)}let g=h.once?Math.min(h.curve.getLength()-.001,u+p):u+p,M=[...n,...r.filter(S=>S!==h).map(S=>o.get(S))],b=[.5,1].map(S=>ri(h,u+(g-u)*S)),_=b.every(S=>M.every(E=>!gr(S,E)));_&&(h.cityDistance=g,o.set(h,b[1]),h.reverseRemaining>0&&(h.reverseRemaining-=Math.abs(p),h.reverseRemaining<.001&&(h.reverseRemaining=0,h.yieldUntil=t+2))),h.blockedSeconds=_?0:(h.blockedSeconds??0)+e,h.waiting=!_||Math.abs(p)<1e-6}if(!r.some(h=>h.reverseRemaining>0||(h.yieldUntil??0)>t))for(let h of[...r].reverse()){if(h.once||!(h.blockedSeconds>2)||t-(h.lastRecovered??-1/0)<8)continue;let u=ri(h,h.cityDistance-Math.sign(h.speed)*.05);if(r.every(d=>d===h||!gr(u,o.get(d)))){h.reverseRemaining=.9,h.blockedSeconds=0,h.recoveryUntil=t+3,h.lastRecovered=t;break}}}var Yc=class{constructor(){this.pointers=new Set,this.candidate=null}down(e){e.pointerType==="mouse"&&e.button!==0||(this.pointers.add(e.pointerId),this.pointers.size===1?this.candidate={x:e.clientX,y:e.clientY,target:e.target,moved:!1,multi:!1}:this.candidate&&(this.candidate.multi=!0))}move(e){this.candidate&&this.pointers.has(e.pointerId)&&Math.hypot(e.clientX-this.candidate.x,e.clientY-this.candidate.y)>5&&(this.candidate.moved=!0)}up(e,t=!1){if(!this.pointers.has(e.pointerId)||(this.move(e),this.pointers.delete(e.pointerId),t&&this.candidate&&(this.candidate.moved=!0),this.pointers.size))return null;let n=this.candidate;return this.candidate=null,n?{...n,tap:!n.moved&&!n.multi}:null}};function bp(s,e,t,n,i,r){let a=(o,c,l)=>Math.max(c,Math.min(o,Math.max(c,l)));return{x:a(s,12+t/2,i-12-t/2),y:a(e,68+n,r-132)}}function Sp({width:s,coarsePointer:e=!1}){let t=s<700||e;return{compact:t,maxPixelRatio:t?1:1.5,frameMs:t?1e3/30:0,shadows:!t,surfaceResolution:t?8:24,treeCount:t?6:45,waterDetail:t?4:14}}function Su(s,e,t,n){let i=s.compact?65e4:3e6;return Math.min(n,s.maxPixelRatio,Math.sqrt(i/Math.max(1,e*t)))}var Ep=Object.freeze(Object.fromEntries([...["c","f","i","k","p","u"].map(s=>[`town/house-${s}`,`suburban/building-type-${s}.glb`]),["town/planter","suburban/planter.glb"],["town/stones","suburban/path-stones-long.glb"],["town/fence","suburban/fence-low.glb"],["town/parasol-a","commercial/detail-parasol-a.glb"],["town/parasol-b","commercial/detail-parasol-b.glb"],["town/awning","commercial/detail-awning.glb"]].map(([s,e])=>[s,`/assets/kenney/${e}`])));function wp(s){let e=2166136261;for(let t of String(s))e=Math.imul(e^t.codePointAt(0),16777619);return e>>>0}function Tp(s){if(s.kind==="datastore")return"reservoir";if(s.id==="deploy-manager")return"townhall";if(s.id==="caddy"||/valet|auth|gateway/.test(s.id))return"gatehouse";if(s.id==="docker"||s.id==="git")return"workshop";let e=`${s.id} ${s.name} ${s.serviceKind??""}`.toLowerCase();return/galaxy|space|observatory/.test(e)?"observatory":/fish|aquarium|water/.test(e)?"aquarium":/bird|aviary|bonsai|garden/.test(e)?"conservatory":/herald|castle/.test(e)?"castle":/worm|celegans|elegans|lab|agar/.test(e)?"laboratory":/animat|frame|studio|art/.test(e)?"studio":/hell|factory|build|worker/.test(e)?"workshop":"village"}function Vv(s){let e=wp(s.id),t=Tp(s),n=["c","f","i","k","p","u"][e%6],i=Math.abs(s.x??0)>Math.abs(s.z??0)?s.x>0?-Math.PI/2:Math.PI/2:s.z>0?Math.PI:0,r={townhall:"commercial/skyscraper-e",gatehouse:"commercial/building-a",workshop:s.modelKey?.startsWith("industrial/")?s.modelKey:"industrial/building-p",observatory:"commercial/building-n",aquarium:"suburban/building-h",conservatory:"suburban/building-r",castle:"town/house-u",laboratory:"industrial/building-c",studio:"town/house-i",village:`town/house-${n}`,reservoir:"industrial/tank"};return{seed:e,district:t,house:n,rotation:i,buildingKey:r[t],height:s.id==="deploy-manager"?6.4:4.4,props:["town/planter","town/stones","town/fence",e%2?"town/parasol-a":"town/parasol-b"]}}function Ap(s,e=3){return(s.activeCells??s.cells).filter(n=>!s.occupiedCellKeys.has(`${n.col}:${n.row}`)).slice(e,e+2).map(n=>{let i=[...s.entities].sort((c,l)=>Math.hypot(c.x-n.x,c.z-n.z)-Math.hypot(l.x-n.x,l.z-n.z)||c.id.localeCompare(l.id))[0],r=wp(`park:${n.x}:${n.z}`),a=i?Tp(i):"village",o=a==="conservatory"?1:a==="aquarium"?0:r%5;return{cell:n,seed:r,variant:o,neighbor:i?.id??null}})}function Gv(s,e,t=.12){return s.minX<e.maxX+t&&s.maxX>e.minX-t&&s.minZ<e.maxZ+t&&s.maxZ>e.minZ-t}function Rp(s){let e=new Et().setFromObject(s);return{minX:e.min.x,maxX:e.max.x,minZ:e.min.z,maxZ:e.max.z}}async function Zc(s,e,t,n,i=!1){let r=await e(t.key,{width:t.w,depth:t.d,height:t.h});r.position.set(t.x,0,t.z),r.rotation.y=t.rotation??0;let a=Rp(r);if(!(a.minX>=-2.45&&a.maxX<=2.45&&a.minZ>=-2.45&&a.maxZ<=2.45)||n.some(c=>Gv(a,c))){if(i)throw new Error(`Building ${t.key} does not fit its reserved plot`);return null}return s.add(r),n.push({...a,key:t.key}),r}async function Cp(s,e){let t=Vv(s),n=new Ke,i=[];n.name=`campus:${s.id}:${t.buildingKey}`;let r=await Zc(n,e,{key:t.buildingKey,w:3.25,d:2.85,h:t.height,x:0,z:-.35},i,!0),o={minX:-.42,maxX:.42,minZ:Rp(r).maxZ+.14,maxZ:2.45,key:"reserved entrance"};i.push(o);let c=[{key:"town/fence",w:3.6,d:.12,h:.46,x:0,z:-2.27},{key:"suburban/tree-small",w:.55,d:.55,h:1.45,x:-2.08,z:-.7},{key:"suburban/tree-small",w:.55,d:.55,h:1.2,x:2.08,z:.25},{key:t.props[3],w:.95,d:.95,h:1.1,x:1.55,z:1.72},{key:"town/planter",w:.6,d:.5,h:.58,x:-1.5,z:1.8}];s.id==="docker"&&c.splice(3,1,{key:"industrial/container-a",w:.85,d:.9,h:.65,x:1.55,z:1.72});for(let l of c)await Zc(n,e,l,i);return n.userData={district:t.district,buildingKey:t.buildingKey,footprints:i},Ea(n),n.rotation.y=t.rotation,n}async function Pp(s,e,t){let n=new Ke,i=[];n.name=`kenney-garden:${s.col}:${s.row}`,await Zc(n,t,{key:"town/stones",w:.6,d:4.6,h:.08,x:0,z:0},i,!0);let r=e===2||e===4?[{key:e===2?"town/house-f":"town/house-c",w:1.6,d:2.5,h:2.8,x:-1.3,z:-.4},{key:e===2?"town/house-p":"town/house-k",w:1.6,d:2.5,h:2.8,x:1.3,z:-.4},{key:"town/planter",w:.65,d:.5,h:.5,x:-1.3,z:1.9},{key:"suburban/tree-small",w:.75,d:.75,h:1.4,x:1.3,z:1.9}]:e%2===0?[{key:"suburban/tree",w:1.1,d:1.1,h:2.2,x:-1.3,z:-1.1},{key:"suburban/tree-small",w:.85,d:.85,h:1.5,x:1.35,z:1.15},{key:"town/parasol-a",w:1,d:1,h:1.1,x:1.35,z:-1.15},{key:"town/planter",w:.8,d:.5,h:.6,x:-1.3,z:1.25}]:[-1.35,1.35].flatMap(a=>[-1.3,0,1.3].map(o=>({key:e===3?"suburban/tree-small":"town/planter",w:.8,d:.72,h:e===3?1.5:.65,x:a,z:o})));for(let a of r)await Zc(n,t,a,i);return n.userData.footprints=i,Ea(n),n.position.set(s.x,.12,s.z),n}var Eu=s=>`${Math.round(s.x*1e4)}:${Math.round(s.z*1e4)}`;function wu({x:s,z:e}){return{x:s+Math.floor((e+.5)/2),z:e}}function Ip(s,e){let t=s.filter(i=>e.has(`${i.col}:${i.row}`)),n=s.filter(i=>!e.has(`${i.col}:${i.row}`));return n.sort((i,r)=>{let a=o=>Math.min(...t.map(c=>Math.abs(o.col-c.col)+Math.abs(o.row-c.row)));return a(i)-a(r)||r.row+r.col-(i.row+i.col)||i.col-r.col}),[...t,...n.slice(0,5)]}function Lp(s,e,t){let n=new Map,i=new Map,r=l=>{let h=Eu(l);return n.has(h)||n.set(h,{x:Math.round(l.x*1e4)/1e4,z:Math.round(l.z*1e4)/1e4,key:h,neighbors:new Set}),n.get(h)},a=(l,h)=>{l=r(l),h=r(h),l.neighbors.add(h.key),h.neighbors.add(l.key);let u=[l.key,h.key].sort().join("/");i.set(u,{a:l,b:h})};for(let l of s){let h=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([u,d])=>({x:l.x+u*e/2,z:l.z+d*e/2}));h.forEach((u,d)=>a(u,h[(d+1)%4]))}let o=l=>(l-t/2)*e;for(let l=0;l<t;l++)a({x:0,z:o(l)},{x:0,z:o(l+1)});for(let l of s){let h=l.z+(l.z<0?1:-1)*e/2,u=l.x+(l.x<0?1:-1)*e/2;for(;Math.abs(u)>.001;){let d=u-Math.sign(u)*e;a({x:u,z:h},{x:d,z:h}),u=d}}let c=[...n.values()].filter(l=>l.neighbors.size>=3).map(l=>({...l,signaled:l.neighbors.size===4}));return{nodes:n,edges:[...i.values()],junctions:c}}function Dp(s,e,t){let n=Eu(e),i=Eu(t),r=[n],a=new Map([[n,null]]);for(let c=0;c<r.length&&!a.has(i);c++)for(let l of s.nodes.get(r[c])?.neighbors??[])a.has(l)||(a.set(l,r[c]),r.push(l));if(!a.has(i))throw new Error("Disconnected town street");let o=[];for(let c=i;c!==null;c=a.get(c)){let l=s.nodes.get(c);o.push({x:l.x,z:l.z})}return o.reverse()}function Np(s,e){let t=[...s.neighbors].map(a=>e.nodes.get(a)).map(a=>[Math.sign(a.x-s.x),Math.sign(a.z-s.z)]),n=(a,o)=>t.some(c=>c[0]===a&&c[1]===o),i="roads/crossroad",r=0;return t.length===2?n(-1,0)&&n(1,0)?i="roads/straight":n(0,-1)&&n(0,1)?(i="roads/straight",r=Math.PI/2):(i="roads/bend",r=n(-1,0)?n(0,1)?0:-Math.PI/2:n(0,1)?Math.PI/2:Math.PI):t.length===3?(i="roads/intersection",r=n(0,-1)?n(-1,0)?n(0,1)?-Math.PI/2:Math.PI:Math.PI/2:0):t.length===1&&(i="roads/end",r=n(1,0)?0:n(0,-1)?Math.PI/2:n(-1,0)?Math.PI:-Math.PI/2,Math.abs(s.x)<.001&&(i="roads/straight",r=Math.PI/2)),{key:i,rotation:r}}var wa=Object.freeze([Object.freeze({x:-.5,z:-.5}),Object.freeze({x:.5,z:-.5}),Object.freeze({x:-.5,z:.5}),Object.freeze({x:.5,z:.5})]);function Up(s){let e=Math.round(s*2);return Number.isFinite(s)&&Math.abs(s)<=31.5&&Math.abs(s*2-e)<1e-4&&Math.abs(e)%2===1}function Fp(s){if(!s||typeof s!="object")return null;let e=Number(s.x),t=Number(s.z);return Up(e)&&Up(t)?{x:e,z:t}:null}function Op(s){let e=Math.max(0,Math.floor(Number(s)||0)),t=[];for(let n=4;t.length<e&&n<=64;n+=2){let i=(n-1)/2;for(let r=0;r<n;r+=1)for(let a=0;a<n;a+=1){let o=a-i,c=r-i,l=n===4||Math.max(Math.abs(o),Math.abs(c))===i,h=Math.abs(o)===.5&&Math.abs(c)===.5;if(l&&!h&&t.push({x:o,z:c}),t.length>=e)return t}}return t}function Bp(s=[]){let e=s.reduce((t,n)=>Math.max(t,Math.abs(n.x),Math.abs(n.z)),1.5);return Math.max(4,Math.ceil(e+.5)*2)}En.enabled=!1;var st=Object.freeze({ink:1513490,inkSoft:3688010,paper:15196093,paperLight:16183513,paperDark:13221777,teal:2062965,tealBright:4765096,rust:11947563,rustBright:15696724,road:5462631,roadEdge:12962260,sand:14206607,waterShallow:6469552,waterDeep:2318192,waterFoam:15659224,hillLight:9547384,hillDark:5602659,healthy:3119988,checking:13870382,unhealthy:12799285,unknown:7501422}),jc=Object.freeze({...Ep,"industrial/building-c":"/assets/kenney/industrial/building-c.glb","industrial/building-e":"/assets/kenney/industrial/building-e.glb","industrial/building-m":"/assets/kenney/industrial/building-m.glb","industrial/building-p":"/assets/kenney/industrial/building-p.glb","industrial/container-a":"/assets/kenney/industrial/shipping-container-a.glb","industrial/container-b":"/assets/kenney/industrial/shipping-container-b.glb","industrial/tank":"/assets/kenney/industrial/detail-tank-large.glb","commercial/building-a":"/assets/kenney/commercial/building-a.glb","commercial/building-f":"/assets/kenney/commercial/building-f.glb","commercial/building-j":"/assets/kenney/commercial/building-j.glb","commercial/building-k":"/assets/kenney/commercial/building-k.glb","commercial/building-n":"/assets/kenney/commercial/building-n.glb","commercial/skyscraper-e":"/assets/kenney/commercial/building-skyscraper-e.glb","suburban/building-a":"/assets/kenney/suburban/building-type-a.glb","suburban/building-h":"/assets/kenney/suburban/building-type-h.glb","suburban/building-n":"/assets/kenney/suburban/building-type-n.glb","suburban/building-r":"/assets/kenney/suburban/building-type-r.glb","suburban/tree":"/assets/kenney/suburban/tree-large.glb","suburban/tree-small":"/assets/kenney/suburban/tree-small.glb","suburban/building-b":"/assets/kenney/suburban/building-type-b.glb","suburban/building-d":"/assets/kenney/suburban/building-type-d.glb","suburban/building-e":"/assets/kenney/suburban/building-type-e.glb","roads/bend":"/assets/kenney/roads/road-bend.glb","roads/curve":"/assets/kenney/roads/road-curve.glb","roads/straight":"/assets/kenney/roads/road-straight.glb","roads/crossroad":"/assets/kenney/roads/road-crossroad.glb","roads/intersection":"/assets/kenney/roads/road-intersection.glb","roads/end":"/assets/kenney/roads/road-end.glb","roads/traffic-light":"/assets/kenney/roads/traffic-light-object-vertical.glb","roads/highway-sign":"/assets/kenney/roads/sign-highway.glb","cars/delivery":"/assets/kenney/cars/delivery.glb","cars/sedan":"/assets/kenney/cars/sedan.glb","cars/taxi":"/assets/kenney/cars/taxi.glb","cars/truck":"/assets/kenney/cars/truck.glb","trains/track":"/assets/kenney/trains/railroad-straight.glb","trains/track-corner":"/assets/kenney/trains/railroad-corner-large.glb","trains/engine":"/assets/kenney/trains/train-diesel-a.glb","trains/passenger-a":"/assets/kenney/trains/train-electric-city-a.glb","trains/passenger-b":"/assets/kenney/trains/train-electric-city-b.glb","trains/passenger-c":"/assets/kenney/trains/train-electric-city-c.glb","trains/regional-engine":"/assets/kenney/trains/train-diesel-b.glb","trains/regional-coach":"/assets/kenney/trains/train-locomotive-passenger-a.glb","trains/carriage":"/assets/kenney/trains/train-carriage-container-blue.glb","trains/carriage-coal":"/assets/kenney/trains/train-carriage-coal.glb","watercraft/tug":"/assets/kenney/watercraft/boat-tug-a.glb","watercraft/cargo":"/assets/kenney/watercraft/ship-cargo-a.glb","watercraft/sail":"/assets/kenney/watercraft/boat-sail-a.glb","watercraft/fishing":"/assets/kenney/watercraft/boat-fishing-small.glb","watercraft/speed":"/assets/kenney/watercraft/boat-speed-a.glb","watercraft/buoy":"/assets/kenney/watercraft/buoy.glb"}),Qt=Object.freeze({lotSize:5.25,roadWidth:1.72,pitch:6.97}),Wv=Object.freeze({horizontal:0,vertical:Math.PI/2}),Jc=Object.freeze(["suburban/building-n","commercial/building-a","industrial/building-p"]),Cu=3,Xp=500,qp=0,An=Object.freeze({tileScale:2.28,curveExtent:2,curveRadius:1.5,bendExtent:1,bendRadius:.5}),Nt=Object.freeze({leftTurn:An.curveRadius*An.tileScale,rightTurn:An.bendRadius*An.tileScale,leg:48,curveFit:An.curveExtent*An.tileScale,bendFit:An.bendExtent*An.tileScale}),Gt=Object.freeze({assetScale:1.48,turn:4*1.48,leg:48,cornerFit:4.48727*1.48}),dn=Object.freeze({baseY:-.075,segmentsX:164,segmentsZ:152,octaves:6,baseFrequency:.052,lacunarity:2.03,persistence:.51,heightScale:4.8,treeCount:170,grassCount:2600}),Ta=Object.freeze({position:Object.freeze([-31,28,-31]),target:Object.freeze([-1.5,.7,0])}),Yp=Object.freeze([{key:"cars/sedan",lane:-.5,speed:.028,offset:.04,variance:.006,frequency:.29},{key:"cars/taxi",lane:-.5,speed:.024,offset:.39,variance:.005,frequency:.23},{key:"cars/truck",lane:-.5,speed:.018,offset:.72,variance:.004,frequency:.2},{key:"cars/sedan",lane:.5,speed:-.026,offset:.13,variance:.005,frequency:.27},{key:"cars/taxi",lane:.5,speed:-.031,offset:.49,variance:.006,frequency:.31},{key:"cars/delivery",lane:.5,speed:-.02,offset:.81,variance:.004,frequency:.19}].map(Object.freeze)),Qc=Object.freeze({speed:.0082,variance:.007,frequency:.2}),bs=Object.freeze([{speed:.0115,variance:.008,frequency:.22},{speed:-.0068,variance:.006,frequency:.17}].map(Object.freeze)),Zp=Object.freeze([{id:"git",name:"Git push dock",code:"GIT",kind:"control",modelKey:"industrial/building-p"},{id:"deploy-manager",name:"Deploy Manager",code:"DM",kind:"control",modelKey:"commercial/skyscraper-e"},{id:"caddy",name:"Caddy gate",code:"TLS",kind:"control",modelKey:"commercial/building-a"},{id:"docker",name:"Container yard",code:"CTR",kind:"control",modelKey:"industrial/building-e"}]),Xv=Object.freeze({"galaxy-menu":"commercial/building-n",portfolio:"commercial/building-f",aquarium:"suburban/building-h",birds:"suburban/building-r",celegans:"industrial/building-c",continuity:"commercial/building-j",conspiracy:"commercial/building-k",androidhell:"industrial/building-m"}),zp=Object.freeze(["commercial/building-f","commercial/building-j","commercial/building-k","commercial/building-n","suburban/building-a","suburban/building-h","suburban/building-n","suburban/building-r","industrial/building-c","industrial/building-m"]);function Ti(s){let e=2166136261;for(let t of String(s))e^=t.codePointAt(0),e=Math.imul(e,16777619);return e>>>0}function Kp(s){return Xv[s]??zp[Ti(s)%zp.length]}function $p(s={}){let e=Array.isArray(s.routes)?s.routes:[],t=Array.isArray(s.datastores)?s.datastores:[],n=e.map((_,S)=>({..._,id:_.id,name:_.name??_.id,code:String(S+1).padStart(2,"0"),kind:"route",serviceKind:_.kind,modelKey:Kp(_.id)})),i=t.map(_=>({..._,id:_.id,name:_.name??_.id,code:"DB",kind:"datastore",modelKey:"industrial/tank"})),r=[...n,...i],a=new Set(wa.map(({x:_,z:S})=>`${_}:${S}`)),o=Op(r.length+64),c=0,l=new Map;for(let _ of r){let S=Fp(_.plot);!S||a.has(`${S.x}:${S.z}`)||(a.add(`${S.x}:${S.z}`),l.set(_,S))}let h=r.filter(_=>!l.has(_)).sort((_,S)=>_.id.localeCompare(S.id));for(let _ of h){let S=null;for(;!S;){let E=o[c++];if(!E)throw new Error("city exhausted its stable plot address space");a.has(`${E.x}:${E.z}`)||(S=E)}a.add(`${S.x}:${S.z}`),l.set(_,S)}let u=r.map(_=>({..._,plot:l.get(_)})),d=[...wa,...u.map(({plot:_})=>_)],f=Bp(d.map(wu)),p=(f-1)/2,x=[];for(let _=0;_<f;_+=1)for(let S=0;S<f;S+=1)x.push({col:S,row:_,x:(S-p)*Qt.pitch,z:(_-p)*Qt.pitch});let m=_=>{let{x:S,z:E}=wu(_);return x.find(R=>R.col===S+p&&R.row===E+p)},g=[...Zp.map((_,S)=>({..._,plot:wa[S],cell:m(wa[S])})),...u.map(_=>({..._,cell:m(_.plot)}))],M=new Set(g.map(({cell:_})=>`${_.col}:${_.row}`)),b=Ip(x,M);return{size:f,cells:x,activeCells:b,streets:Lp(b,Qt.pitch,f),occupiedCellKeys:M,entities:g.map(({cell:_,...S})=>({...S,..._})),extent:f*Qt.lotSize+(f-1)*Qt.roadWidth}}function jp(s){let{lotSize:e,pitch:t}=Qt,n=-((s.size-1)*t)/2,i=-n,r={minX:n-e/2,maxX:i+e/2,minZ:n-e/2,maxZ:i+e/2};s.activeCells&&(r.activeCells=s.activeCells);let a=2.28,o=1.48,c=r.minZ-4.4,l=r.minX-5.1,h=c+4.4,u=r.maxZ+5.2,d=r.maxX+3.35,f=d+50,p=l+3.8,x=d-Nt.rightTurn-3,m={axis:"x",x:(p+x)/2,z:c,length:x-p,width:a,minX:p,maxX:x,minZ:c-a/2,maxZ:c+a/2},g={axis:"z",x:l,z:(h+u)/2,length:u-h,width:o,minX:l-o/2,maxX:l+o/2,minZ:h,maxZ:u},M=Math.min(m.minX-Nt.leftTurn,g.minX-Gt.turn-Gt.leg,r.minX)-30,b=Math.min(m.minZ-Nt.leftTurn-Nt.leg,g.minZ-Gt.turn,r.minZ)-30,_=Math.max(g.maxZ+Gt.turn+Gt.leg,r.maxZ)+30,S={axis:"z",x:(d+f)/2,z:(b+_)/2,length:_-b,width:f-d,minX:d-.9,maxX:f,minZ:b,maxZ:_,shoreX:d,oceanX:f},E={minX:M,maxX:d+.82,minZ:b,maxZ:_};return E.x=(E.minX+E.maxX)/2,E.z=(E.minZ+E.maxZ)/2,E.width=E.maxX-E.minX,E.depth=E.maxZ-E.minZ,{bounds:r,highway:m,rail:g,coast:S,ground:E,streets:s.streets}}function Jp(s,e=Cu){let t=s.entities.filter(i=>i.kind==="route"),n=Math.min(Math.max(0,e),t.length);return Array.from({length:n},(i,r)=>t[Math.floor(r*t.length/n)])}function Qp(s){return{x:s.highway.minX+(0-s.highway.minX)*.48,z:s.highway.z,rotation:qp}}function em(s){let e=s.highway,t=s.rail,n=s.coast,i=.5522847498,r=new T(e.minX-Nt.leftTurn,.16,e.z-Nt.leftTurn-Nt.leg),a=new T(e.minX-Nt.leftTurn,.16,e.z-Nt.leftTurn),o=new T(e.minX,.16,e.z),c=new T(e.maxX,.16,e.z),l=new T(e.maxX+Nt.rightTurn,.16,e.z-Nt.rightTurn),h=new T(l.x,.16,l.z-Nt.leg),u=[new Xt(r,a),new Xt(o,c),new Xt(l,h)],d=[new Fn(a,a.clone().add(new T(0,0,Nt.leftTurn*i)),o.clone().add(new T(-Nt.leftTurn*i,0,0)),o),new Fn(c,c.clone().add(new T(Nt.rightTurn*i,0,0)),l.clone().add(new T(0,0,Nt.rightTurn*i)),l)],f=new xi;f.add(u[0]),f.add(d[0]),f.add(u[1]),f.add(d[1]),f.add(u[2]);let p=new T(t.x-Gt.turn-Gt.leg,.24,t.minZ-Gt.turn),x=new T(t.x-Gt.turn,.24,t.minZ-Gt.turn),m=new T(t.x,.24,t.minZ),g=new T(t.x,.24,t.maxZ),M=new T(t.x-Gt.turn,.24,t.maxZ+Gt.turn),b=new T(M.x-Gt.leg,.24,M.z),_=[new Xt(p,x),new Xt(m,g),new Xt(M,b)],S=[new Fn(x,x.clone().add(new T(Gt.turn*i,0,0)),m.clone().add(new T(0,0,-Gt.turn*i)),m),new Fn(g,g.clone().add(new T(0,0,Gt.turn*i)),M.clone().add(new T(Gt.turn*i,0,0)),M)],E=new xi;E.add(_[0]),E.add(S[0]),E.add(_[1]),E.add(S[1]),E.add(_[2]);let R=new wn(Array.from({length:129},(y,A)=>{let P=A/128,I=Ze.lerp(n.minZ,n.maxZ,P);return new T(si(I,n.shoreX),.045,I)}),!1,"centripetal",.42);return{highway:f,highwayStraights:u,highwayCorners:d,highwayAssets:[{key:"roads/curve",x:e.minX-An.tileScale,z:e.z-An.tileScale/2,rotation:Math.PI,fit:Nt.curveFit},{key:"roads/bend",x:e.maxX+Nt.rightTurn,z:e.z,rotation:-Math.PI/2,fit:Nt.bendFit}],rail:E,railStraights:_,railCorners:S,railAssets:[{x:t.x,z:t.minZ,rotation:-Math.PI/2},{x:t.x,z:t.maxZ,rotation:0}],coastline:R,shippingLanes:[il(R,-7.2,96),il(R,-11.2,96)]}}function tm(s){let e=String(s??"unknown").toLowerCase();return["healthy","online","steady","ok","ready"].includes(e)?"healthy":["deploying","active","building"].includes(e)?"deploying":["checking","starting","pending","queued"].includes(e)?"checking":["unhealthy","offline","failed","error"].includes(e)?"unhealthy":"unknown"}function kp(s){return{healthy:st.healthy,deploying:st.rustBright,checking:st.checking,unhealthy:st.unhealthy,unknown:st.unknown}[tm(s)]}function qv(s,e){s.traverse(t=>{t.isMesh&&(t.userData.entityId=e)})}function Yv(s,e="",t=!0,n=null,i=new Map){let r=[];s.traverse(a=>{a.isMesh&&r.push(a)});for(let a of r){a.castShadow=!0,a.receiveShadow=!0,a.geometry.userData.deployManagerSharedAsset=!0;let o=Array.isArray(a.material)?a.material:[a.material];if(a.material=o.map(c=>{if(c.userData.deployManagerSharedAsset=!0,"roughness"in c&&(c.roughness=Math.max(.72,c.roughness??.72)),"metalness"in c&&(c.metalness=Math.min(.16,c.metalness??.05)),!t&&c.isMeshStandardMaterial){let l=n&&c.map?JSON.stringify([n,c.color.toArray(),c.transparent,c.opacity,c.alphaTest,c.side,c.vertexColors,c.map.offset.toArray(),c.map.repeat.toArray(),c.map.rotation,c.map.wrapS,c.map.wrapT,c.map.minFilter,c.map.magFilter]):null;if(l&&i.has(l))return i.get(l);let h=new Zr({color:c.color,map:c.map,transparent:c.transparent,opacity:c.opacity,alphaTest:c.alphaTest,side:c.side,vertexColors:c.vertexColors});return h.userData.deployManagerSharedAsset=!0,l&&i.set(l,h),h}return c}),Array.isArray(a.material)||([a.material]=a.material),a.material.length===1&&(a.material=a.material[0]),t&&!e.startsWith("roads/")&&!e.startsWith("trains/track")&&a.geometry?.attributes?.position?.count<25e3){let c=new Zn(new Qs(a.geometry,32),new xn({color:st.ink,transparent:!0,opacity:.24}));c.geometry.userData.deployManagerSharedAsset=!0,c.material.userData.deployManagerSharedAsset=!0,c.name="ink-outline",c.castShadow=!1,c.raycast=()=>{},a.add(c)}}return s}function xr(s,{includeShared:e=!1,includeTextures:t=!1}={}){let n=new Set,i=new Set,r=new Set;s?.traverse?.(a=>{a.isInstancedMesh&&a.dispose(),a.element?.remove?.(),a.geometry&&(e||!a.geometry.userData?.deployManagerSharedAsset)&&n.add(a.geometry);let o=Array.isArray(a.material)?a.material:[a.material];for(let c of o)if(!(!c||!e&&c.userData?.deployManagerSharedAsset)){i.add(c);for(let l of Object.values(c))l?.isTexture&&(t||l.userData.cityGenerated)&&r.add(l)}});for(let a of n)a.dispose();for(let a of i)a.dispose();for(let a of r)a.dispose()}function $i(s,e,t){let n=Ze.clamp((t-s)/Math.max(1e-4,e-s),0,1);return n*n*(3-2*n)}function Zv(s,e){let t=Math.imul(s,374761393)^Math.imul(e,668265263)^1821285621;t=Math.imul(t^t>>>13,1274126177);let n=((t^t>>>16)>>>0)/4294967296*Math.PI*2;return[Math.cos(n),Math.sin(n)]}function Kv(s,e){let t=Math.floor(s),n=Math.floor(e),i=t+1,r=n+1,a=s-t,o=e-n,c=a*a*a*(a*(a*6-15)+10),l=o*o*o*(o*(o*6-15)+10),h=(f,p)=>{let[x,m]=Zv(f,p);return x*(s-f)+m*(e-p)},u=Ze.lerp(h(t,n),h(i,n),c),d=Ze.lerp(h(t,r),h(i,r),c);return Ze.lerp(u,d,l)*1.41421356237}function yr(s,e){let t=s*dn.baseFrequency+1.73,n=e*dn.baseFrequency-2.41,i=1,r=0,a=0;for(let o=0;o<dn.octaves;o+=1){r+=Kv(t,n)*i,a+=i;let c=.57+o*.071,l=Math.cos(c),h=Math.sin(c),u=t*dn.lacunarity,d=n*dn.lacunarity;t=u*l-d*h+7.13+o*1.37,n=u*h+d*l-4.79+o*.83,i*=dn.persistence}return r/Math.max(a,1e-4)}function el(s,e){let t=yr(s*.47-31.7,e*.47+18.9)*.5+.5,n=yr(s*.91+64.3,e*.91-52.1)*.5+.5;return $i(.34,.78,t*.72+n*.28)}var Hp=new WeakMap;function $v(s,e,t=[]){let n=Hp.get(t);if(!n){let o=t.map(l=>l.x??l[0]),c=t.map(l=>l.z??l[1]);n={minX:Math.min(...o),maxX:Math.max(...o),minZ:Math.min(...c),maxZ:Math.max(...c)},Hp.set(t,n)}let i=Math.max(n.minX-s,0,s-n.maxX),r=Math.max(n.minZ-e,0,e-n.maxZ);if(i>8||r>8)return Math.hypot(i,r);let a=1/0;for(let o=1;o<t.length;o+=1){let c=t[o-1],l=t[o],h=c.x??c[0],u=c.z??c[1],d=l.x??l[0],f=l.z??l[1],p=d-h,x=f-u,m=p*p+x*x,g=m>0?Ze.clamp(((s-h)*p+(e-u)*x)/m,0,1):0,M=s-(h+p*g),b=e-(u+x*g);a=Math.min(a,M*M+b*b)}return Math.sqrt(a)}function Aa(s,e,t=[]){let n=1/0;for(let i of t)n=Math.min(n,$v(s,e,i));return n}function _r(s,e,t){if(t.activeCells){let o=1/0;for(let c of t.activeCells)o=Math.min(o,Math.hypot(Math.max(0,Math.abs(s-c.x)-Qt.pitch/2),Math.max(0,Math.abs(e-c.z)-Qt.pitch/2)));return o}let n=(t.minX+t.maxX)/2,i=(t.minZ+t.maxZ)/2,r=Math.max(0,Math.abs(s-n)-(t.maxX-t.minX)/2),a=Math.max(0,Math.abs(e-i)-(t.maxZ-t.minZ)/2);return Math.hypot(r,a)}function nm(s,e){let t=e?.perimeter?.coast??e?.coast;return t?si(s,t.shoreX):1/0}function im(s,e,t,n){let i=yu(s,n);return{perimeter:s,coastline:n,regionalPlan:i,railLength:t.getLength(),continuations:Mp({highway:e,rail:t}),flatCorridors:[e,t].filter(Boolean).map(r=>r.getSpacedPoints(128)).concat(i.roads,i.walks,s.streets?s.streets.edges.map(({a:r,b:a})=>[r,a]):[sp(s.bounds).getSpacedPoints(96)]),bounds:{minX:s.ground.minX,maxX:s.ground.maxX,minZ:s.ground.minZ,maxZ:s.ground.maxZ}}}function Ra(s,e,t){let n=t?.perimeter??t;if(!n?.bounds||!n?.ground||!n?.coast)return dn.baseY;let i=n.bounds,r=_r(s,e,i),a=$i(.45,8.6,r),o=nm(e,t?.perimeter?t:n)-s,c=$i(.3,6.4,o),l=1,h=Math.min(Aa(s,e,t?.flatCorridors),Sa(s,e,t?.continuations)),u=Number.isFinite(h)?$i(.9,6.8,h-(t?.surfacePadding??0)):1,d=yr(s,e),f=yr(s+73.4,e-41.7),p=Ze.clamp(d*.72+f*.28,-1,1)*.5+.5,x=yr(s*.38+d*4,e*.38+f*4),m=Math.max(0,1-Math.abs(x*2.6)),g=$i(3.5,19,r),M=dn.heightScale*(.04+p*.3+m**2*g*.75)*a*c*l,b=(.13+p*.035)*a*c*l,_=$i(0,3.2,ba(s,e,t?.regionalPlan)),S=Ze.lerp(b,M,u)*_;return dn.baseY+S}function jv(s,e={}){let t=s.clone(!0),n=new Et().setFromObject(t),i=n.getSize(new T),r=n.getCenter(new T);e.preserveOrigin||(t.position.x-=r.x),t.position.y-=n.min.y,e.preserveOrigin||(t.position.z-=r.z);let a=e.width??4.2,o=e.depth??4.2,c=e.height??5.2,l=new Ke;if(l.add(t),Number.isFinite(e.scale))l.scale.setScalar(e.scale);else if(e.exact)l.scale.set(a/Math.max(i.x,.001),Math.min(a/Math.max(i.x,.001),o/Math.max(i.z,.001)),o/Math.max(i.z,.001));else{let h=Math.min(a/Math.max(i.x,.001),o/Math.max(i.z,.001),c/Math.max(i.y,.001));l.scale.setScalar(h)}return l}function Tu(s,e,t,n,i=.28){let r=new vt(e.x,e.y,e.z),a=new Pe(r,n);a.position.copy(t),a.receiveShadow=!0,a.castShadow=e.y>.2,s.add(a);let o=new Zn(new Qs(r),new xn({color:st.ink,transparent:!0,opacity:i}));return o.position.copy(t),s.add(o),a}function tl(s,e){let t=new Qe().setFromPoints(s),n=new pi(t,e);return e.isLineDashedMaterial&&n.computeLineDistances(),n}function Vp(s,{length:e=2.8,width:t=.78}={}){let n=new Ke;n.name="procedural-boat-wake";let i=new xn({color:st.waterFoam,transparent:!0,opacity:.48,depthWrite:!1});for(let r of[-1,1]){let a=tl([new T(r*.16,.08,-.42),new T(r*t*.46,.065,-e*.52),new T(r*t,.045,-e)],i);a.raycast=()=>{},n.add(a)}s.add(n)}function Kc(s,e){return-((e.size-1)*Qt.pitch)/2+Qt.pitch/2+s*Qt.pitch}function $c(s,e,t){let n=[s-1,s].filter(r=>r>=0&&r<t-1);if(e<s&&n.includes(s-1))return s-1;if(e>s&&n.includes(s))return s;let i=(t-2)/2;return n.sort((r,a)=>Math.abs(r-i)-Math.abs(a-i)||r-a)[0]}function Ca(s,e,t,n){if(!s||!e||!t||t.size<2)return null;let i=Math.abs(e.col-s.col),r=Math.abs(e.row-s.row),o=(n??(i>=r?"vertical":"horizontal"))==="vertical"?["vertical","horizontal"]:["horizontal","vertical"];for(let c of o){if(c==="vertical"){let d=$c(s.col,e.col,t.size),f=$c(s.row,e.row,t.size);if(d===void 0||f===void 0)continue;let p=Kc(d,t);return{axis:c,curb:{x:p,z:s.z},node:{x:p,z:Kc(f,t)}}}let l=$c(s.row,e.row,t.size),h=$c(s.col,e.col,t.size);if(l===void 0||h===void 0)continue;let u=Kc(l,t);return{axis:c,curb:{x:s.x,z:u},node:{x:Kc(h,t),z:u}}}return null}function Gp(s,e){return Math.abs(s.x-e.x)<.001&&Math.abs(s.z-e.z)<.001}function nl(s,e,t,n={}){let i=n.startAccess??Ca(s,e,t),r=n.endAccess??Ca(e,s,t);if(!i||!r)return[];if(t.streets){let o=[i.curb,...Dp(t.streets,i.node,r.node),r.curb];return o.filter((c,l)=>l===0||!Gp(c,o[l-1]))}let a=[i.curb,i.node];if(i.node.x!==r.node.x&&i.node.z!==r.node.z){let o=(Ti(`${s.id}:${e.id}`)&1)===0;a.push(o?{x:r.node.x,z:i.node.z}:{x:i.node.x,z:r.node.z})}return a.push(r.node,r.curb),a.filter((o,c)=>c===0||!Gp(o,a[c-1]))}function Au(s,e=.34){let t=s.map(a=>new T(a.x,e,a.z));if(t.length<2)return null;let n=new xi,i=t[0].clone(),r=a=>{i.distanceToSquared(a)>1e-6&&n.add(new Xt(i.clone(),a.clone())),i=a.clone()};for(let a=1;a<t.length-1;a+=1){let o=t[a-1],c=t[a],l=t[a+1],h=c.clone().sub(o),u=l.clone().sub(c),d=h.length(),f=u.length();if(!d||!f)continue;if(h.normalize(),u.normalize(),Math.abs(h.dot(u))>.999){r(c);continue}let p=Math.min(Qt.roadWidth*.22,d*.34,f*.34),x=c.clone().addScaledVector(h,-p),m=c.clone().addScaledVector(u,p);r(x),n.add(new us(x,c.clone(),m)),i=m}return r(t.at(-1)),n}function il(s,e,t=80){let n=[];for(let i=0;i<=t;i+=1){let r=i/t,a=s.getPointAt(r),o=s.getTangentAt(Math.min(.9999,r)).normalize(),c=new T(-o.z,0,o.x).normalize();n.push(a.clone().addScaledVector(c,e))}return new wn(n,!1,"centripetal",.4)}function Wp(s,e){let t=Math.sin(e*(s.speedFrequency??.31)+(s.speedPhase??s.offset*9))*(s.speedVariance??0),n=s.offset+e*Math.abs(s.speed)+t;return n-=Math.floor(n),s.speed<0?1-n:n}function Jv(s){let e=document.createElement("button");e.type="button",e.className="city3d-label",e.dataset.entity=s.id,e.dataset.kind=s.kind,e.setAttribute("aria-label",`Show details for ${s.name}`),e.setAttribute("aria-controls","selection-details");let t=document.createElement("span");t.className="city3d-label-code",t.textContent=s.code;let n=document.createElement("span");n.className="city3d-label-name",n.textContent=s.name;let i=document.createElement("span");return i.className="city3d-label-state",i.setAttribute("aria-hidden","true"),e.append(t,n,i),e}var Ru=class{constructor(e,t){this.stage=e,this.error=t;let n=e?.querySelector(".city3d-loading");n&&(n.classList.add("is-error"),n.textContent="3D city unavailable in this browser.")}setTopology(){return Promise.resolve(!1)}setStatuses(){}setLiveDeployments(){}handleReleaseEvent(){return Promise.resolve(!1)}select(){}fit(){}zoom(){}setVisible(){}resetSimulation(){}destroy(){}simulateDeployment(){return Promise.resolve(!1)}},sl=class{constructor({stage:e,onSelect:t=()=>{},onNavigate:n=()=>{},onActivate:i=()=>{}}={}){if(!e)throw new Error("City3D requires a stage element");this.stage=e,this.renderPolicy=Sp({width:e.clientWidth,coarsePointer:window.matchMedia("(pointer: coarse)").matches}),this.stage.dataset.renderProfile=this.renderPolicy.compact?"mobile":"desktop",this.onSelect=t,this.onNavigate=n,this.onActivate=i,this.loading=e.querySelector(".city3d-loading"),this.assetCache=new Map,this.mobileMaterialCache=new Map,this.loadedAssets=new Set,this.entityGroups=new Map,this.pickables=[],this.motion=[],this.signalMotion=[],this.smoke=[],this.ambientCouriers=[],this.signalFixtures=[],this.activeDelivery=null,this.trains=[],this.waterMaterial=null,this.terrainContext=null,delete this.stage.dataset.ambientUpdates,this.positions=new Map,this.layoutEntities=new Map,this.worldGeneration=0,this.simulationGeneration=0,this.selectedId="deploy-manager",this.liveAppIds=new Set,this.visible=!0,this.motionPreference=window.matchMedia("(prefers-reduced-motion: reduce)"),this.reducedMotion=this.motionPreference.matches,this.lastReducedMotionFrame=-1/0,this.stage.dataset.motion=this.reducedMotion?"reduced":"full",this.onMotionPreferenceChange=a=>{this.reducedMotion=a.matches,this.lastReducedMotionFrame=-1/0,this.stage.dataset.motion=this.reducedMotion?"reduced":"full",this.renderer&&(this.renderer.shadowMap.autoUpdate=!1,this.renderer.shadowMap.needsUpdate=!0)},this.motionPreference.addEventListener?.("change",this.onMotionPreferenceChange),this.startedAt=performance.now(),this.pointerStart=null,this.topology={routes:[],datastores:[]},this.destroyed=!1,this.hasFitted=!1,this.currentLiveJobId=null,this.currentLivePhase=null,this.releaseEventChain=Promise.resolve(!0),this.scene=new Nr,this.scene.background=new we(st.paper),this.camera=new Jn(-20,20,14,-14,.1,1e3),this.camera.position.set(...Ta.position),this.camera.lookAt(0,0,0),this.renderer=new Nc({antialias:!this.renderPolicy.compact,powerPreference:"default"}),this.renderer.setPixelRatio(Su(this.renderPolicy,e.clientWidth,e.clientHeight,window.devicePixelRatio||1)),this.renderer.outputColorSpace=yt,this.renderer.toneMapping=aa,this.renderer.toneMappingExposure=.94,this.renderer.shadowMap.enabled=this.renderPolicy.shadows,this.renderer.shadowMap.type=ms,this.renderer.shadowMap.autoUpdate=!1,this.renderer.shadowMap.needsUpdate=!0,this.renderer.domElement.className="city3d-canvas",this.renderer.domElement.setAttribute("aria-label","Interactive 3D map of the Deploy Manager release city"),this.renderer.domElement.setAttribute("aria-describedby","city-instructions"),this.renderer.domElement.setAttribute("role","application"),this.renderer.domElement.tabIndex=0,this.labelRenderer=new Vc,this.labelRenderer.domElement.className="city3d-label-layer",e.prepend(this.renderer.domElement),e.append(this.labelRenderer.domElement),this.controls=new Hc(this.camera,e),this.controls.enableDamping=!0,this.controls.dampingFactor=.075,this.controls.enablePan=!0,this.controls.screenSpacePanning=!1,this.controls.enableRotate=!0,this.controls.minPolarAngle=Math.PI*.22,this.controls.maxPolarAngle=Math.PI*.43,this.controls.minZoom=.56,this.controls.maxZoom=2.7,this.controls.target.set(...Ta.target),this.homeAzimuth=Math.atan2(this.camera.position.x-this.controls.target.x,this.camera.position.z-this.controls.target.z),this.onControlsChange=()=>{this.updateCompass(),this.labelsDirty=!0},this.controls.addEventListener("change",this.onControlsChange);let r=new nr;r.onProgress=(a,o,c)=>{this.loading&&(this.loading.textContent=`ASSEMBLING CITY \xB7 ${o}/${c}`)},this.loader=new Oc(r),this.world=new Ke,this.world.name="procedural-city",this.scene.add(this.world),this.addLights(),this.createSelectionMarker(),this.raycaster=new sa,this.pointer=new oe,this.bindInput(),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),this.resize(),this.updateCompass(),this.animate()}addLights(){let e=new Jr(16775133,5333350,1.35);this.scene.add(e);let t=new Vi(16773327,2.4);t.position.set(-18,31,20),t.castShadow=!0,t.shadow.mapSize.set(2048,2048),t.shadow.camera.left=-34,t.shadow.camera.right=34,t.shadow.camera.top=34,t.shadow.camera.bottom=-34,t.shadow.camera.near=1,t.shadow.camera.far=90,t.shadow.bias=-35e-5,this.scene.add(t);let n=new Vi(8570818,.5);n.position.set(20,11,-20),this.scene.add(n)}createSelectionMarker(){let e=new er(2.46,2.55,48),t=new xt({color:st.rustBright,transparent:!0,opacity:.9,depthWrite:!1,side:Ft});this.selectionMarker=new Pe(e,t),this.selectionMarker.rotation.x=-Math.PI/2,this.selectionMarker.position.y=.24,this.selectionMarker.visible=!1,this.scene.add(this.selectionMarker)}bindInput(){this.tapGesture=new Yc;let e=c=>{clearTimeout(this.tapFallbackTimer),this.tapGesture.down(c)},t=c=>{let l=this.tapGesture.up(c);if(!l)return;if(!l.tap){this.pendingLabelTap=null,this.pendingGhostTap=null,this.suppressGhostClickUntil=performance.now()+400;return}let h=l.target?.closest?.(".city3d-label");if(h){this.pendingLabelTap={label:h,at:performance.now()},this.tapFallbackTimer=setTimeout(()=>{this.pendingLabelTap=null,this.onSelect(h.dataset.entity,{reveal:!0})},350);return}if(l.target?.closest?.(".city3d-ghost-link")){this.suppressGhostClickUntil=0;let d=l.target.closest(".city3d-ghost-link");this.pendingGhostTap={link:d,at:performance.now()},this.tapFallbackTimer=setTimeout(()=>{this.pendingGhostTap=null;let f=document.querySelector("#build-city-dialog");f&&!f.open&&(d.focus({preventScroll:!0}),f.showModal())},350);return}let u=l.target?.closest?.(".city3d-label")?.dataset.entity??this.entityAtPointer(c);u&&this.onSelect(u)},n=c=>{this.tapGesture.up(c,!0),this.pendingLabelTap=null,this.pendingGhostTap=null,this.suppressGhostClickUntil=performance.now()+400},i=c=>{let l=c.target.closest?.(".city3d-label"),h=this.pendingLabelTap;if(this.pendingLabelTap=null,l){clearTimeout(this.tapFallbackTimer),c.preventDefault(),(c.detail===0||h?.label===l&&performance.now()-h.at<1e3)&&this.onSelect(l.dataset.entity,{reveal:!0});return}let u=this.pendingGhostTap;if(this.pendingGhostTap=null,!u||performance.now()-u.at>1e3)return;if(clearTimeout(this.tapFallbackTimer),c.preventDefault(),c.stopPropagation(),c.ctrlKey||c.metaKey||c.shiftKey||c.altKey){window.open(u.link.href,"_blank","noopener,noreferrer");return}let d=document.querySelector("#build-city-dialog");d&&!d.open&&(u.link.focus({preventScroll:!0}),d.showModal())},r=c=>{if(this.tapGesture.move(c),c.pointerType==="touch")return;let l=!!this.entityAtPointer(c);this.renderer.domElement.classList.toggle("is-over-entity",l)},a=()=>this.renderer.domElement.classList.remove("is-over-entity"),o=c=>{c.target===this.renderer.domElement&&(c.key==="ArrowLeft"||c.key==="ArrowUp"?(c.preventDefault(),this.onNavigate(-1)):c.key==="ArrowRight"||c.key==="ArrowDown"?(c.preventDefault(),this.onNavigate(1)):c.key==="Enter"?(c.preventDefault(),this.onActivate()):c.key==="Home"&&(c.preventDefault(),this.fit()))};this.inputHandlers={pointerdown:e,pointerup:t,pointercancel:n,pointermove:r,pointerleave:a,keydown:o,click:i};for(let[c,l]of Object.entries(this.inputHandlers))this.stage.addEventListener(c,l)}entityAtPointer(e){let t=this.renderer.domElement.getBoundingClientRect();return this.pointer.x=(e.clientX-t.left)/t.width*2-1,this.pointer.y=-((e.clientY-t.top)/t.height)*2+1,this.raycaster.setFromCamera(this.pointer,this.camera),this.raycaster.intersectObjects(this.pickables,!0).find(i=>i.object.userData.entityId)?.object.userData.entityId??null}updateCompass(){this.stage.dataset.cameraZoom=this.camera.zoom.toFixed(3);let e=Math.atan2(this.camera.position.x-this.controls.target.x,this.camera.position.z-this.controls.target.z),t=24-Ze.radToDeg(e-this.homeAzimuth);this.stage.style.setProperty("--north-rotation",`${t.toFixed(2)}deg`)}resize(){this.labelsDirty=!0;let e=Math.max(1,this.stage.clientWidth),t=Math.max(1,this.stage.clientHeight),n=Su(this.renderPolicy,e,t,window.devicePixelRatio||1);this.renderer.getPixelRatio()!==n&&this.renderer.setPixelRatio(n);let i=e/t,r=i<.8&&this.layout?Math.max(this.baseFrustum??39,(this.layout.extent*1.5+6)/i):this.baseFrustum??39;this.camera.left=-(r*i)/2,this.camera.right=r*i/2,this.camera.top=r/2,this.camera.bottom=-r/2,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1),this.labelRenderer.setSize(e,t)}async loadAsset(e){if(!jc[e])throw new Error(`Unknown city asset: ${e}`);return this.assetCache.has(e)||this.assetCache.set(e,this.loader.loadAsync(jc[e]).then(t=>{this.loadedAssets.add(e);let n=t.parser.json.images,i=n?.length===1&&n[0].uri?new URL(n[0].uri,new URL(jc[e],location.href)).href:null;return Yv(t.scene,e,!this.renderPolicy.compact,i,this.mobileMaterialCache)})),this.assetCache.get(e)}async cloneAsset(e,t){return jv(await this.loadAsset(e),t)}clearWorld(){this.storyActors=[],this.portLife=null,this.gulls=null,this.stationService=null,this.windowDusk={value:.45},this.signalFixtures=[],this.activeDelivery=null,this.worldStream?.dispose(),this.worldStream=null,this.lastStreamKey=null,this.waterMaterial?.dispose(),this.worldGeneration+=1,this.scene.remove(this.world),xr(this.world),this.world=new Ke,this.world.name="procedural-city",this.scene.add(this.world),this.entityGroups.clear(),this.pickables=[],this.motion=[],this.signalMotion=[],this.smoke=[],this.ambientCouriers=[],this.trains=[],this.waterMaterial=null,this.terrainContext=null,this.positions.clear(),delete this.stage.dataset.ambientUpdates,this.layoutEntities.clear(),this.deliveryTruck=null,this.deliveryHome=null,this.deliveryAccess=null,this.deliveryHomeRotation=0,this.releasePacket=null}setTopology(e){return this.topology=e??{routes:[],datastores:[]},this.rebuild()}async rebuild(){this.resetSimulation(),this.clearWorld();let e=this.worldGeneration,t=$p(this.topology);this.layout=t,this.baseFrustum=Math.max(41,t.extent+21),this.resize(),this.loading&&(this.loading.hidden=!1,this.loading.classList.remove("is-error"),this.loading.textContent="ASSEMBLING CITY \xB7 0/0"),this.buildGround(t),this.buildConnections(t);let n=[this.buildInfiniteWorld(e),this.buildRoadDetails(t,e),...t.entities.map(a=>this.addEntity(a,e)),this.buildAmbientWorld(t,e)],i=await Promise.allSettled(n);if(e!==this.worldGeneration)return!1;let r=i.filter(a=>a.status==="rejected");return this.stage.dataset.townDistricts=[...this.entityGroups.values()].map(a=>a.userData.modelRoot?.userData.district).filter(Boolean).sort().join(","),this.stage.dataset.batchedDrawsSaved=String(Ea(this.world,[...this.entityGroups.values(),...this.motion.map(a=>a.object),...this.trains.flatMap(a=>a.cars),...this.signalMotion.map(a=>a.object),...this.smoke.map(a=>a.puff),this.deliveryTruck,this.releasePacket,...(this.signalFixtures??[]).map(a=>a.group),...this.storyActors??[],...this.worldStream?.chunks.values()??[],...this.worldStream?.routes.values()??[]])),this.stage.dataset.loadedAssets=[...this.loadedAssets].sort().join(","),this.renderer.shadowMap.needsUpdate=!0,this.loading&&(this.loading.hidden=!0,r.length?this.stage.dataset.assetWarnings=String(r.length):delete this.stage.dataset.assetWarnings),this.setStatuses(this.topology),this.setLiveDeployments([...this.liveAppIds]),this.select(this.selectedId),this.hasFitted||(this.fit(),this.hasFitted=!0),r.length===0}buildGround(e){let{lotSize:t}=Qt;this.perimeter=jp(e),this.bounds=this.perimeter.bounds,this.highwayZ=this.perimeter.highway.z,this.highwayMinX=this.perimeter.highway.minX,this.highwayMaxX=this.perimeter.highway.maxX,this.railX=this.perimeter.rail.x,this.railMinZ=this.perimeter.rail.minZ,this.railMaxZ=this.perimeter.rail.maxZ,this.transitCurves=em(this.perimeter),this.highwayCurve=this.transitCurves.highway,this.highwayStraights=this.transitCurves.highwayStraights,this.highwayAssets=this.transitCurves.highwayAssets,this.railCurve=this.transitCurves.rail,this.railStraights=this.transitCurves.railStraights,this.railAssets=this.transitCurves.railAssets,this.coastlineCurve=this.transitCurves.coastline,this.shippingLanes=this.transitCurves.shippingLanes,this.regionalPlan=yu(this.perimeter,this.coastlineCurve),this.addTerrain();let n=new it({color:10008705,roughness:.98}),i=new it({color:8891769,roughness:1});for(let r of e.activeCells){let a=e.occupiedCellKeys.has(`${r.col}:${r.row}`);Tu(this.world,new T(t,.06,t),new T(r.x,0,r.z),a?n:i,.04)}this.waterMaterial=lp(this.perimeter.coast.shoreX,this.renderPolicy.waterDetail),this.addProceduralRail()}addTerrain(){this.terrainContext=im(this.perimeter,this.highwayCurve,this.railCurve,this.coastlineCurve),this.terrainContext.surfacePadding=this.renderPolicy.compact?32/this.renderPolicy.surfaceResolution*Math.SQRT2:0,this.addTerrainGrass()}async buildInfiniteWorld(e){let[t,n]=await Promise.all([this.cloneAsset("roads/straight",{width:2.2857142857142856,depth:2.28,exact:!0}),this.cloneAsset("suburban/tree",{width:1.3,depth:1.3,height:2.8})]);if(e===this.worldGeneration)for(this.worldStream=new Xc({resolution:this.renderPolicy.surfaceResolution,treeCount:this.renderPolicy.treeCount,world:this.world,waterMaterial:this.waterMaterial,roadModel:t,treeModel:n,context:this.terrainContext,heightAt:(i,r)=>Ra(i,r,this.terrainContext),colorAt:(i,r)=>{let a=nm(r,this.terrainContext)-i,o=_r(i,r,this.bounds);return new we(st.paperDark).lerp(new we(st.hillLight).lerp(new we(st.hillDark),el(i,r)*.52),$i(.75,4.8,o)).lerp(new we(st.sand),1-$i(.15,1.7,a))},siteDistance:(i,r)=>Math.min(_r(i,r,this.bounds),Aa(i,r,this.terrainContext.flatCorridors),Sa(i,r,this.terrainContext.continuations))}),this.updateWorldStream();this.worldStream?.pendingCount&&e===this.worldGeneration;)await new Promise(i=>requestAnimationFrame(i))}updateWorldStream(){if(!this.worldStream)return;let e=(this.camera.right-this.camera.left)/(2*this.camera.zoom),t=(this.camera.top-this.camera.bottom)/(2*this.camera.zoom),n=this.controls.getPolarAngle(),i=Math.ceil(Math.hypot(e,t/Math.cos(n))+20),r=`${Math.floor(this.controls.target.x/8)}:${Math.floor(this.controls.target.z/8)}:${Math.ceil(i/8)}:${Math.round(this.controls.getAzimuthalAngle()*16)}`;if(r===this.lastStreamKey)return;this.lastStreamKey=r,this.camera.updateMatrixWorld(!0);let a=new zi().setFromProjectionMatrix(new ke().multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse));this.worldStream.update(this.controls.target,Math.ceil(i/8)*8,{frustum:a,deferred:!0}),this.stage.dataset.worldChunks=String(this.worldStream.chunks.size),this.stage.dataset.transportChunks=String(this.worldStream.routes.size),this.stage.dataset.worldCenter=`${Math.round(this.controls.target.x)},${Math.round(this.controls.target.z)}`,this.renderer.shadowMap.needsUpdate=!0}addTerrainGrass(){let e=this.terrainContext;if(!e)return;let t=new gi(.055,.34,3,1);t.translate(0,.17,0);let n=new it({color:st.hillLight,roughness:1,flatShading:!0}),i=new Pt(t,n,dn.grassCount);i.name="instanced-whole-domain-grass",i.castShadow=!1,i.receiveShadow=!0,i.raycast=()=>{},i.frustumCulled=!1;let r=new $e,a=new we(st.hillLight),o=new we(st.hillDark),c=0;for(let l=0;l<18e3&&c<dn.grassCount;l+=1){let h=(Math.sin(l*78.233+1.17)*43758.5453%1+1)%1,u=(Math.sin(l*39.417+7.31)*24634.6345%1+1)%1,d=e.coastline.getPoint(u),f=Ze.lerp(e.bounds.minX+2.8,d.x-2.05,h),p=d.z,x=_r(f,p,e.perimeter.bounds),m=Aa(f,p,e.flatCorridors),g=Math.min(f-e.bounds.minX,p-e.bounds.minZ,e.bounds.maxZ-p),M=Ra(f,p,e),b=el(f,p),_=Ti(`grass-density:${l}`)%1e3/1e3;if(x<3.1||m<2.65||Sa(f,p,e.continuations)<2||ba(f,p,this.regionalPlan)<1.2||g<10.8||M<dn.baseY+.2||_>.18+b*.78)continue;let S=.58+b*.42+Ti(`grass:${l}`)%45/100;r.position.set(f,M-.015,p),r.rotation.set(0,Ti(`grass-yaw:${l}`)%6283/1e3,0),r.scale.set(S,S*(.88+l%7*.035),S),r.updateMatrix(),i.setMatrixAt(c,r.matrix),i.setColorAt(c,a.clone().lerp(o,.12+b*.58)),c+=1}i.count=c,i.instanceMatrix.needsUpdate=!0,i.instanceColor&&(i.instanceColor.needsUpdate=!0),this.world.add(i)}addProceduralRail(){let e=this.railCurve.getLength();this.world.add(Gc(t=>this.railCurve.getPointAt(Ze.clamp(t/e,0,1)),0,e))}buildConnections(e){for(let r of e.entities)this.positions.set(r.id,new T(r.x,.3,r.z)),this.layoutEntities.set(r.id,r);let t=new xn({color:st.teal,transparent:!0,opacity:.72});for(let r of this.topology.routes??[]){let a=this.streetCurveBetween("caddy",r.id,.34);if(!a)continue;this.world.add(tl(a.getPoints(26),t));let o=new Pe(new ki(.12,0),new xt({color:st.tealBright}));o.castShadow=!0,this.world.add(o),this.signalMotion.push({object:o,curve:a,speed:.035+Ti(r.id)%15/1e3,offset:Ti(r.id)%100/100})}let n=new xn({color:st.rust,transparent:!0,opacity:.86});this.releaseCurves={gitToManager:this.streetCurveBetween("git","deploy-manager",.48),managerToDocker:this.streetCurveBetween("deploy-manager","docker",.48)};for(let r of Object.values(this.releaseCurves))r&&this.world.add(tl(r.getPoints(20),n));let i=new tr({color:st.rust,dashSize:.35,gapSize:.24,transparent:!0,opacity:.75});for(let r of this.topology.datastores??[])for(let a of r.connectedTo??[]){let o=this.streetCurveBetween(r.id,a,.28);o&&this.world.add(tl(o.getPoints(20),i))}}streetCurveBetween(e,t,n=.34,i={}){let r=this.layoutEntities.get(e),a=this.layoutEntities.get(t);return!r||!a||!this.layout?null:Au(nl(r,a,this.layout,i),n)}async buildRoadDetails(e,t){let{roadWidth:n}=Qt,i=[],r=await this.cloneAsset("roads/straight",{width:1,depth:1,exact:!0});if(t!==this.worldGeneration)return;for(let{a:o,b:c}of e.streets.edges){let l=new T(c.x-o.x,0,c.z-o.z).normalize(),h=new T(o.x,.15,o.z).addScaledVector(l,n/2),u=new T(c.x,.15,c.z).addScaledVector(l,-n/2),d=new Xt(h,u),f=d.getLength();this.world.add(Ms(r,p=>d.getPointAt(p/f),f,n))}for(let o of e.streets.nodes.values()){let{key:c,rotation:l}=Np(o,e.streets);i.push(this.placeAsset(c,{x:o.x,z:o.z,y:.16,rotation:l,fit:{width:n,depth:n,height:.2,exact:!0}},t))}let a=Qp(this.perimeter);i.push(this.placeAsset("roads/highway-sign",{x:a.x,y:.18,z:a.z,rotation:a.rotation,fit:{width:5,depth:4.5,height:4.2}},t)),i.push(this.addHighwayRoadAssets(t)),await Promise.all(i)}async addHighwayRoadAssets(e){let t=this.highwayStraights.map(i=>this.placeTransitAssetRun("roads/straight",i,{crossWidth:this.perimeter.highway.width,maxSegmentLength:2.28,y:.145,localAxis:"x"},e)),n=this.highwayAssets.map(i=>this.placeAsset(i.key,{x:i.x,y:.145,z:i.z,rotation:i.rotation,fit:{scale:An.tileScale}},e));await Promise.all([...t,...n])}async placeTransitAssetRun(e,t,n,i){if(e==="roads/straight"){let c=await this.cloneAsset(e,{width:1,depth:1,exact:!0});if(i!==this.worldGeneration)return;let l=t.getLength();this.world.add(Ms(c,h=>{let u=t.getPointAt(h/l);return u.y=n.y,u},l,n.crossWidth));return}let r=t.getLength(),a=Math.max(1,Math.ceil(r/n.maxSegmentLength)),o=r/a;await Promise.all(Array.from({length:a},async(c,l)=>{let h=n.localAxis==="x"?{width:o,depth:n.crossWidth,height:.24,exact:!0}:{width:n.crossWidth,depth:o,height:.32,exact:!0},u=await this.cloneAsset(e,h);if(i!==this.worldGeneration)return;let d=(l+.5)/a,f=t.getPointAt(d),p=t.getTangentAt(d);u.name=`${e}:segment-${l+1}`,u.position.copy(f),u.position.y=n.y,u.rotation.y=n.localAxis==="x"?-Math.atan2(p.z,p.x):Math.atan2(p.x,p.z),this.world.add(u)}))}async placeAsset(e,t,n){let i=await this.cloneAsset(e,t.fit);return n!==this.worldGeneration?null:(i.position.set(t.x,t.y??.12,t.z),i.rotation.y=t.rotation??0,this.world.add(i),i)}async addEntity(e,t){let n=await Cp(e,(d,f)=>this.cloneAsset(d,f));if(t!==this.worldGeneration){xr(n);return}let i=new Ke;i.name=`entity:${e.id}`,i.position.set(e.x,.17,e.z),i.userData={entityId:e.id,appId:e.appId,status:e.status,modelRoot:n},n.position.y=.02,i.add(n);let r=new Et().setFromObject(i),a=Math.max(2.1,r.max.y-i.position.y),o=Jv(e),c=document.createElement("div");c.className="city3d-label-anchor",c.append(o);let l=new va(c);l.center.set(.5,1);let h=e.col===0?.72:e.col===this.layout.size-1?-.72:0;l.position.set(h,a+.62,0),i.add(l);let u=new Pe(new ki(.18,0),new xt({color:kp(e.status),transparent:!0,opacity:.96}));u.position.set(0,a+.28,0),i.add(u),i.userData.beacon=u,i.userData.labelElement=o,i.userData.baseScale=n.scale.clone(),i.userData.height=a,qv(i,e.id),i.traverse(d=>{d.isMesh&&d!==u&&this.pickables.push(d)}),this.world.add(i),this.entityGroups.set(e.id,i),dp(i),i.userData.healthBarrier.rotation.y=n.rotation.y+Math.PI,(e.modelKey.startsWith("industrial/building-e")||e.modelKey.startsWith("industrial/building-m"))&&this.addSmoke(i,a)}async addDockerCargo(e,t){let[n,i]=await Promise.all([this.cloneAsset("industrial/container-a",{width:1.12,depth:1.72,height:.95}),this.cloneAsset("industrial/container-b",{width:1.12,depth:1.72,height:.95})]);t===this.worldGeneration&&(n.position.set(-1.34,.12,1.25),i.position.set(.18,.12,1.25),n.rotation.y=i.rotation.y=Math.PI/2,e.add(n,i),e.userData.yardContainers=[n,i])}addSmoke(e,t){let n=new xt({color:12567485,transparent:!0,opacity:.28,depthWrite:!1});for(let i=0;i<4;i+=1){let r=new Pe(new On(.16+i*.035,8,6),n.clone());r.position.set(.54,t*.72+i*.34,-.32),e.add(r),this.smoke.push({puff:r,baseX:r.position.x,baseY:r.position.y,phase:i/4})}}async buildAmbientWorld(e,t){let n=e.activeCells.filter(r=>!e.occupiedCellKeys.has(`${r.col}:${r.row}`)),i=Ap(e,Jc.length);for(let{cell:r,variant:a,neighbor:o}of i){let c=await Pp(r,a,(l,h)=>this.cloneAsset(l,h));if(c.userData.neighbor=o,t!==this.worldGeneration){xr(c);return}this.world.add(c)}this.stage.dataset.pocketParks=String(i.length),await Promise.all([this.addGhostTown(n,t),this.addTerrainTrees(t),this.addHighwayTraffic(t),this.addRailTraffic(t),this.addWaterTraffic(t),this.addDeliveryTruck(t),this.addAmbientDeliveryLoops(t),yp(this,t,{heightAt:(r,a)=>Ra(r,a,this.terrainContext),siteDistance:(r,a)=>Math.min(_r(r,a,this.bounds),Aa(r,a,this.terrainContext.flatCorridors))})])}async addGhostTown(e,t){let n=e.slice(0,Jc.length),i=await Promise.all(n.map(async(l,h)=>{let u=await this.cloneAsset(Jc[h],{width:3.65,depth:3.65,height:h===1?5.1:4.25});return{cell:l,ghost:u,index:h}}));if(t!==this.worldGeneration)return;for(let{cell:l,ghost:h,index:u}of i){let d=Qt.lotSize*.39,f=new ls(new Qe().setFromPoints([new T(-d,0,-d),new T(d,0,-d),new T(d,0,d),new T(-d,0,d)]),new tr({color:u===1?st.rust:st.teal,dashSize:.34,gapSize:.22,transparent:!0,opacity:.72}));f.name=`future-foundation:${u+1}`,f.position.set(l.x,.23,l.z),f.computeLineDistances(),f.raycast=()=>{},this.world.add(f),h.name=`ghost-plot:${u+1}`,h.position.set(l.x,.14,l.z),h.traverse(p=>{if(p.isLineSegments){p.material=p.material.clone(),delete p.material.userData.deployManagerSharedAsset,p.material.transparent=!0,p.material.opacity=.13,p.material.depthWrite=!1;return}if(!p.isMesh)return;let m=(Array.isArray(p.material)?p.material:[p.material]).map(g=>{let M=g.clone();return delete M.userData.deployManagerSharedAsset,M.transparent=!0,M.opacity=.18,M.depthWrite=!1,M});p.material=Array.isArray(p.material)?m:m[0],p.castShadow=!1,p.receiveShadow=!1,p.raycast=()=>{}}),this.world.add(h)}if(!i.length)return;let r=i[Math.floor(i.length/2)],a=document.createElement("a");a.className="city3d-ghost-link",a.href="https://github.com/YesterdaysLemon/deploy-manager",a.target="_blank",a.rel="noreferrer",a.textContent="BUILD YOUR OWN CITY \u2197",a.setAttribute("aria-label","Build your own city \u2014 setup options"),a.addEventListener("click",l=>{if(clearTimeout(this.tapFallbackTimer),l.ctrlKey||l.metaKey||l.shiftKey||l.altKey)return;let h=document.querySelector("#build-city-dialog");h?.showModal&&(l.preventDefault(),l.stopPropagation(),performance.now()>(this.suppressGhostClickUntil??0)&&!h.open&&h.showModal())});let o=document.createElement("div");o.className="city3d-ghost-anchor",o.append(a);let c=new va(o);c.center.set(.5,1),c.onAfterRender=(l,h,u)=>{if(this.stage.clientWidth>700)return;let d=new T().setFromMatrixPosition(c.matrixWorld).project(u),f=bp((d.x+1)*this.stage.clientWidth/2,(1-d.y)*this.stage.clientHeight/2,o.offsetWidth,o.offsetHeight,this.stage.clientWidth,this.stage.clientHeight);o.style.transform=`translate(-50%, -100%) translate(${f.x}px, ${f.y}px)`},c.position.set(r.cell.x,5.7,r.cell.z),this.world.add(c)}async addTerrainTrees(e){let t=[],n=this.terrainContext;if(!n)return;for(let r=0;r<6e3&&t.length<dn.treeCount;r+=1){let a=(Math.sin(r*91.731+.43)*43758.5453%1+1)%1,o=(Math.sin(r*47.173+2.17)*24634.6345%1+1)%1,c=n.coastline.getPoint(o),l=Ze.lerp(n.perimeter.bounds.minX-32,c.x-3.2,a),h=Ze.lerp(n.perimeter.bounds.minZ-30,n.perimeter.bounds.maxZ+38,o),u=Ra(l,h,n),d=el(l,h),f=Ti(`tree-density:${r}`)%1e3/1e3,p=Math.min(l-n.bounds.minX,h-n.bounds.minZ,n.bounds.maxZ-h);u<.42||_r(l,h,n.perimeter.bounds)<2.8||Aa(l,h,n.flatCorridors)<2.3||Sa(l,h,n.continuations)<3.4||ba(l,h,this.regionalPlan)<1.3||p<11.4||f>.2+d**1.15||t.some(x=>Math.hypot(x.x-l,x.z-h)<1.15)||t.push({x:l,y:u,z:h,height:1.9+d*1.3+r*37%9*.13})}let i=await Promise.all(t.map(async(r,a)=>{let o=await this.cloneAsset(a%3?"suburban/tree":"suburban/tree-small",{width:r.height*.65,depth:r.height*.65,height:r.height});return o.name=`terrain-tree:${a+1}`,o.position.set(r.x,r.y-.04,r.z),o.rotation.y=Ti(`terrain-tree:${a}`)%628/100,o}));if(e===this.worldGeneration)for(let r of i)r&&this.world.add(r)}async addHighwayTraffic(e){let t=new Map([[-.5,il(this.highwayCurve,-.5,96)],[.5,il(this.highwayCurve,.5,96)]]);await Promise.all(Yp.map(async(n,i)=>{let r=n.key==="cars/truck",a=await this.cloneAsset(n.key,{width:r?1.08:.96,depth:r?2.12:1.82,height:r?1.08:.9});e===this.worldGeneration&&(this.world.add(a),this.motion.push({object:a,curve:t.get(n.lane),speed:n.speed,offset:n.offset,rotationOffset:n.speed<0?Math.PI:0,speedVariance:n.variance,speedFrequency:n.frequency,speedPhase:i*1.37,wrap:!0,trafficLane:n.lane,vehicleLength:r?2.12:1.82,cruiseSpeed:Math.abs(n.speed)*80}))}))}async addRailTraffic(e){let t=this.railCurve.getLength(),[n,i,r,a]=await Promise.all([this.cloneAsset("trains/engine",{width:1.34,depth:3.05,height:1.68}),this.cloneAsset("trains/carriage",{width:1.3,depth:2.9,height:1.55}),this.cloneAsset("trains/carriage-coal",{width:1.32,depth:2.9,height:1.5}),this.cloneAsset("trains/carriage",{width:1.3,depth:2.9,height:1.55})]);if(e!==this.worldGeneration)return;let o=[n,i,r,a];for(let u of o)this.world.add(u);this.trains.push({cars:o,curve:this.railCurve,speed:Qc.speed,offset:.36,speedVariance:Qc.variance,speedFrequency:Qc.frequency,speedPhase:.8,carGap:3.08/t});let c=await Promise.all([this.cloneAsset("trains/regional-engine",{width:1.18,depth:2.5,height:1.45}),this.cloneAsset("trains/regional-coach",{width:1.18,depth:2.65,height:1.4}),this.cloneAsset("trains/regional-coach",{width:1.18,depth:2.65,height:1.4})]);if(e!==this.worldGeneration)return;for(let u of c)this.world.add(u);this.trains.push({...this.trains[this.trains.length-1],cars:c,carGap:2.8/t,offset:.76});let l=0,h=1/0;for(let u=0;u<=1e3;u++){let d=this.railCurve.getPointAt(u/1e3),f=Math.hypot(d.x-this.railX,d.z-3);f<h&&(h=f,l=u/1e3)}this.trains[this.trains.length-2].timetable={stationDistance:l*t,phase:.56,passenger:!1},this.trains[this.trains.length-1].timetable={stationDistance:l*t,phase:0,passenger:!0}}async addWaterTraffic(e){let[t,n]=await Promise.all([this.cloneAsset("watercraft/tug",{width:1.42,depth:2.65,height:1.65}),this.cloneAsset("watercraft/cargo",{width:2.4,depth:4.65,height:2.25})]);e===this.worldGeneration&&(Vp(t,{length:2.35,width:.62}),Vp(n,{length:4.1,width:1.08}),this.world.add(n,t),this.motion.push({object:t,curve:this.shippingLanes[0],speed:bs[0].speed,offset:.47,rotationOffset:0,speedVariance:bs[0].variance,speedFrequency:bs[0].frequency,speedPhase:.4,wrap:!0,bob:.035,surface:"ocean"}),this.motion.push({object:n,curve:this.shippingLanes[1],speed:bs[1].speed,offset:.56,rotationOffset:Math.PI,speedVariance:bs[1].variance,speedFrequency:bs[1].frequency,speedPhase:2.1,wrap:!0,bob:.018,surface:"ocean"}))}async addDeliveryTruck(e){let t=await this.cloneAsset("cars/delivery",{width:.7,depth:1.5,height:.95});if(e!==this.worldGeneration)return;let n=this.layoutEntities.get("docker"),i=this.layoutEntities.get("caddy")??this.layoutEntities.get("deploy-manager");this.deliveryAccess=Ca(n,i,this.layout,"vertical");let r=this.deliveryAccess?.curb??this.positions.get("docker")??new T,a=this.deliveryAccess?.node??r;t.position.set(r.x,.26,r.z),t.rotation.y=Math.atan2(a.x-r.x,a.z-r.z),this.world.add(t),this.deliveryTruck=t,this.deliveryHome=t.position.clone(),this.deliveryHomeRotation=t.rotation.y}async addAmbientDeliveryLoops(e){let t=this.layoutEntities.get("docker"),n=Jp(this.layout);if(!t||n.length===0)return;let i=Ca(t,n[0],this.layout,"horizontal"),r=["cars/delivery","cars/truck","cars/delivery"];await Promise.all(n.map(async(a,o)=>{let c=await this.cloneAsset(r[o],{width:.7,depth:1.5,height:o===1?1.02:.98});if(e!==this.worldGeneration)return;let l=nl(t,a,this.layout,{startAccess:i}),h=nl(a,t,this.layout,{endAccess:i}),u=[...l,...h.slice(1)],d=Mu(Au(u,.255),.42),f=new Ke;f.name=`ambient-update:${a.id}`,f.add(c);let p=new Pe(new ki(.13,0),new xt({color:o===1?st.tealBright:st.rustBright}));p.position.y=1.02,f.add(p),this.world.add(f),this.motion.push({object:f,cityVehicle:!0,bodyWidth:.7,bodyLength:1.5,cruiseSpeed:.85+o*.12,curve:d,speed:.0115+o*.0017,offset:o/Cu,rotationOffset:0,speedVariance:.003+o*7e-4,speedFrequency:.18+o*.035,speedPhase:o*1.9,wrap:!0}),this.ambientCouriers.push(f)})),e===this.worldGeneration&&(this.stage.dataset.ambientUpdates=String(this.ambientCouriers.length))}setStatuses(e=this.topology){let t=new Map([...Zp.map(n=>[n.id,e.host?.status??"healthy"]),...(e.routes??[]).map(n=>[n.id,n.status]),...(e.datastores??[]).map(n=>[n.id,n.status])]);for(let[n,i]of this.entityGroups){let r=tm(t.get(n));i.userData.status=r,i.userData.healthBarrier&&(i.userData.healthBarrier.visible=r==="unhealthy"),i.userData.beacon?.material.color.setHex(kp(r)),i.userData.labelElement&&(i.userData.labelElement.dataset.status=r)}this.stage.dataset.closedServices=String([...this.entityGroups.values()].filter(n=>n.userData.healthBarrier?.visible).length)}setLiveDeployments(e=[]){this.liveAppIds=new Set(e);for(let t of this.entityGroups.values())t.userData.live=this.liveAppIds.has(t.userData.appId)||this.liveAppIds.size>0&&["deploy-manager","docker"].includes(t.userData.entityId),t.userData.labelElement?.classList.toggle("is-live",t.userData.live)}observeSelfUpdate(e){if(!e?.id||e.id===this.lastObservedReceipt)return;this.lastObservedReceipt=e.id,this.stage.dataset.observedRelease=e.release;let t=this.entityGroups.get("deploy-manager");if(!t)return;let n=new Pe(new er(2.12,2.32,40),new xt({color:14924899,side:Ft,transparent:!0,opacity:.8}));n.name="verified-city-release-stamp",n.rotation.x=-Math.PI/2,n.position.y=.24,t.add(n),setTimeout(()=>{n.removeFromParent(),n.geometry.dispose(),n.material.dispose()},4e3)}select(e){this.labelsDirty=!0,this.selectedId=e;for(let[n,i]of this.entityGroups)i.userData.labelElement?.classList.toggle("is-selected",n===e);let t=this.entityGroups.get(e);this.selectionMarker.visible=!!t,t&&this.selectionMarker.position.set(t.position.x,.26,t.position.z)}setVisible(e){this.visible=!!e,this.stage.classList.toggle("is-visible",this.visible),this.visible&&this.resize()}fit(){this.camera.position.set(...Ta.position),this.controls.target.set(...Ta.target),this.camera.zoom=1,this.camera.updateProjectionMatrix(),this.controls.update()}zoom(e){this.camera.zoom=Ze.clamp(this.camera.zoom/e,this.controls.minZoom,this.controls.maxZoom),this.camera.updateProjectionMatrix()}resetSimulation(){this.simulationGeneration+=1,this.releasePacket&&(this.releasePacket.visible=!1),this.deliveryTruck&&this.deliveryHome&&(this.deliveryTruck.position.copy(this.deliveryHome),this.deliveryTruck.rotation.y=this.deliveryHomeRotation,this.deliveryTruck.visible=!0);for(let e of this.entityGroups.values())e.userData.modelRoot?.scale.copy(e.userData.baseScale??new T(1,1,1)),e.userData.labelElement?.classList.remove("is-simulating");this.simulatedHighlight=null}async delay(e,t){let n=this.reducedMotion?0:e;return new Promise(i=>{window.setTimeout(()=>i(t===this.simulationGeneration),n)})}async tween(e,t,n){if(this.reducedMotion)return t!==this.simulationGeneration?!1:(n(1),!0);let i=e,r=performance.now();return new Promise(a=>{let o=c=>{if(t!==this.simulationGeneration){a(!1);return}let l=Math.min(1,(c-r)/Math.max(1,i));try{n(l)}catch(h){console.error("City animation frame failed",h),a(!1);return}l<1?requestAnimationFrame(o):a(!0)};requestAnimationFrame(o)})}async moveAlong(e,t,n,i){if(!e||!t)return!1;if(e===this.deliveryTruck&&!this.reducedMotion){e.visible=!0;let r={object:e,curve:Mu(t,.42),once:!0,cityVehicle:!0,cityDistance:0,offset:0,speed:1,bodyWidth:.7,bodyLength:1.5,cruiseSpeed:2},a=this.motion.filter(o=>o.cityVehicle);for(;i===this.simulationGeneration&&a.some(o=>o.cityDistance!==void 0&&gr(ri(r,0),ri(o,o.cityDistance)));)await new Promise(o=>requestAnimationFrame(o));if(i!==this.simulationGeneration)return!1;for(this.activeDelivery=r;i===this.simulationGeneration&&r.cityDistance<r.curve.getLength()-.02;)await new Promise(o=>requestAnimationFrame(o));return this.activeDelivery===r&&(this.activeDelivery=null),i===this.simulationGeneration}return e.visible=!0,this.tween(n,i,r=>{let a=r<.5?2*r*r:1-(-2*r+2)**2/2,o=t.getPointAt(a),c=t.getTangentAt(Math.min(.999,a));e.position.copy(o),e.rotation.y=Math.atan2(c.x,c.z)})}ensureReleasePacket(){return this.releasePacket?this.releasePacket:(this.releasePacket=new Pe(new ki(.29,0),new it({color:st.rustBright,emissive:st.rust,emissiveIntensity:.55,roughness:.55})),this.releasePacket.castShadow=!0,this.world.add(this.releasePacket),this.releasePacket)}setSimulationHighlight(e){this.simulatedHighlight=e;for(let[t,n]of this.entityGroups)n.userData.labelElement?.classList.toggle("is-simulating",t===e)}async rebuildEntity(e,t){let n=this.entityGroups.get(e),i=n?.userData.modelRoot;if(!n||!i)return!1;let r=new Ke;r.position.set(n.position.x,.68,n.position.z);let a=new xt({color:st.paperLight,transparent:!0,opacity:.72,depthWrite:!1}),o=new xt({color:st.rustBright}),c=[];for(let m=0;m<9;m+=1){let g=new Pe(new On(.18+m%3*.065,7,5),a.clone());g.position.set(Math.cos(m)*1.2,.2,Math.sin(m*1.7)*1.2),r.add(g),c.push({object:g,angle:m*1.7,height:.8+m%4*.32,radius:1+m%3*.25})}for(let m=0;m<6;m+=1){let g=new Pe(new vt(.08,.34,.08),o);r.add(g),c.push({object:g,angle:m*Math.PI/3,height:1.5+m%2*.5,radius:.8,spin:!0})}let l=new Ke;Tu(l,new T(.12,.75,.12),new T(0,0,0),new it({color:st.paperDark})),Tu(l,new T(.62,.2,.2),new T(0,.36,0),new it({color:st.rust})),l.scale.setScalar(1.35);let h=new Ke,u=new it({color:st.teal,roughness:.68,metalness:.12}),d=new Pe(new fs(.22,.07,7,12),u),f=new Pe(new vt(.13,.84,.13),u);f.position.y=-.45,h.add(d,f),h.scale.setScalar(1.25),r.add(l),r.add(h),this.world.add(r);let p=n.userData.baseScale??new T(1,1,1),x=await this.tween(1650,t,m=>{let g=m<.38?1-m/.38*.9:.1+(m-.38)/.62*.9,M=m>.78?Math.sin((m-.78)*Math.PI*5)*(1-m)*.24:0;i.scale.set(p.x,p.y*Math.max(.08,g+M),p.z);let b=Math.sin(m*Math.PI);for(let _ of c)_.object.position.x=Math.cos(_.angle+m*2.8)*_.radius*b,_.object.position.z=Math.sin(_.angle+m*2.8)*_.radius*b,_.object.position.y=.25+_.height*b,_.object.material.opacity=Math.max(0,b*.85),_.spin&&(_.object.rotation.z=m*Math.PI*5);l.position.set(-1.35*b,.4+2.2*b,.85*b),l.rotation.z=-.6+m*Math.PI*4,h.position.set(1.3*b,.55+2.45*b,-.9*b),h.rotation.set(m*Math.PI*2.5,.5,.6-m*Math.PI*4.5)});return this.world.remove(r),xr(r),i.scale.copy(p),x}async simulateDeployment(e,t=()=>{}){this.resetSimulation();let n=this.simulationGeneration,i=this.positions.get(e),r=this.positions.get("docker");if(!i||!r||!this.deliveryTruck)return!1;let a=this.ensureReleasePacket(),o=h=>{n===this.simulationGeneration&&t(h)};if(o("incoming"),!await this.moveAlong(a,this.releaseCurves.gitToManager,1250,n)||(this.setSimulationHighlight("deploy-manager"),o("build"),!await this.delay(850,n))||(o("candidate"),!await this.moveAlong(a,this.releaseCurves.managerToDocker,900,n))||(this.setSimulationHighlight("docker"),o("promote"),!await this.delay(820,n)))return!1;a.visible=!1;let c=this.streetCurveBetween("docker",e,.31,{startAccess:this.deliveryAccess});if(o("deliver"),!await this.moveAlong(this.deliveryTruck,c,1780,n)||(this.setSimulationHighlight(e),o("rebuild"),!await this.rebuildEntity(e,n))||(o("verify"),!await this.delay(700,n)))return!1;let l=this.streetCurveBetween(e,"docker",.31,{endAccess:this.deliveryAccess});return o("return"),await this.moveAlong(this.deliveryTruck,l,1320,n)?(o("complete"),this.resetSimulation(),!0):!1}handleReleaseEvent(e){return this.releaseEventChain=this.releaseEventChain.then(()=>this.animateReleaseEvent(e)).catch(t=>(console.error("Unable to render factual release event",t),!1)),this.releaseEventChain}async animateReleaseEvent({jobId:e,targetId:t,phase:n,status:i}){if(this.destroyed||!e||!t)return!1;this.currentLiveJobId!==e&&(this.resetSimulation(),this.currentLiveJobId=e,this.currentLivePhase=null,this.liveTruckAtTarget=!1);let r=this.simulationGeneration;if(!this.positions.get(t))return!1;let o=this.ensureReleasePacket();if(["accepted","queued","starting"].includes(n)){this.currentLivePhase=n;let c=this.releaseCurves.gitToManager?.getPointAt(0);return c&&o.position.copy(c),o.visible=!0,this.setSimulationHighlight("git"),!0}if(n==="fetch")return this.currentLivePhase=n,o.visible=!0,this.setSimulationHighlight("deploy-manager"),this.moveAlong(o,this.releaseCurves.gitToManager,820,r);if(n==="build")return this.currentLivePhase=n,this.setSimulationHighlight("deploy-manager"),this.delay(480,r);if(n==="candidate"){this.currentLivePhase=n,o.visible=!0;let c=this.releaseCurves.managerToDocker?.getPointAt(0);return c&&o.position.copy(c),this.setSimulationHighlight("docker"),this.moveAlong(o,this.releaseCurves.managerToDocker,720,r)}if(n==="promote"){this.currentLivePhase=n,o.visible=!1,this.setSimulationHighlight(t);let c=this.streetCurveBetween("docker",t,.31,{startAccess:this.deliveryAccess});return!this.liveTruckAtTarget&&!await this.moveAlong(this.deliveryTruck,c,1180,r)?!1:(this.liveTruckAtTarget=!0,this.rebuildEntity(t,r))}if(n==="verify")return this.currentLivePhase=n,this.setSimulationHighlight(t),this.delay(540,r);if(n==="rollback"){let c=this.currentLivePhase==="rollback";if(this.currentLivePhase=n,this.setSimulationHighlight(t),!this.liveTruckAtTarget){let h=this.streetCurveBetween("docker",t,.31,{startAccess:this.deliveryAccess});if(!await this.moveAlong(this.deliveryTruck,h,760,r))return!1;this.liveTruckAtTarget=!0}let l=c?!0:await this.rebuildEntity(t,r);if(i==="rolled-back"){let h=this.streetCurveBetween(t,"docker",.31,{endAccess:this.deliveryAccess});await this.moveAlong(this.deliveryTruck,h,820,r),this.resetSimulation(),this.currentLiveJobId=null,this.currentLivePhase=null,this.liveTruckAtTarget=!1}return l}if(["complete","failed","interrupted"].includes(n)||["succeeded","failed","rolled-back","interrupted"].includes(i)){if(this.liveTruckAtTarget){let c=this.streetCurveBetween(t,"docker",.31,{endAccess:this.deliveryAccess});await this.moveAlong(this.deliveryTruck,c,820,r)}return this.resetSimulation(),this.currentLiveJobId=null,this.currentLivePhase=null,this.liveTruckAtTarget=!1,!0}return!1}animate(e=performance.now()){if(this.destroyed||(this.animationFrame=requestAnimationFrame(h=>this.animate(h)),!this.visible||document.hidden))return;let t=this.renderPolicy.frameMs;if(e-(this.lastBudgetFrame??-1/0)<t-.5)return;if(this.lastBudgetFrame=e,document.querySelector("#build-city-dialog")?.open){if(e-(this.lastDialogFrame??0)<250)return;this.lastDialogFrame=e}if(this.worldStream?.pendingCount&&(this.worldStream.drain(1),this.stage.dataset.worldChunks=String(this.worldStream.chunks.size),this.stage.dataset.streamPending=String(this.worldStream.pendingCount),this.renderer.shadowMap.needsUpdate=!0),this.reducedMotion&&e-this.lastReducedMotionFrame<Xp)return;this.reducedMotion&&(this.lastReducedMotionFrame=e);let n=(e-this.startedAt)/1e3,i=this.reducedMotion?0:n;this.controls.update();let r=(this.camera.top-this.camera.bottom)/(2*this.camera.zoom)*Math.tan(this.controls.getPolarAngle())+30,a=this.camera.position.clone().sub(this.controls.target);a.length()<r&&(this.camera.position.copy(this.controls.target).add(a.setLength(r)),this.camera.updateMatrixWorld(!0),this.lastStreamKey=null),this.waterMaterial&&(this.waterMaterial.uniforms.uTime.value=i,this.waterMaterial.uniforms.uViewDirection.value.copy(this.camera.position).sub(this.controls.target).normalize(),this.waterMaterial.uniforms.uDetail.value=Math.min(this.renderPolicy.waterDetail,this.controls.getPolarAngle()>1.12||this.camera.zoom<.8?8:14)),this.updateWorldStream();let o=this.reducedMotion?0:Math.min(.1,(e-(this.lastTrafficFrame??e))/1e3);this.lastTrafficFrame=e;for(let h of[-.5,.5])_p(this.motion.filter(u=>u.trafficLane===h),o);let c=this.motion.filter(h=>h.cityVehicle);if(this.activeDelivery&&c.push(this.activeDelivery),bu(c,o,i,[],this.layout?.streets.junctions??[]),e-(this.lastTrafficAudit??0)>1e3){let h=0;for(let u=0;u<c.length;u++)for(let d=u+1;d<c.length;d++)gr(ri(c[u],c[u].cityDistance),ri(c[d],c[d].cityDistance),0)&&h++;this.stage.dataset.trafficConflicts=String(h),this.stage.dataset.trafficWaiting=String(c.filter(u=>u.waiting).length),this.lastTrafficAudit=e}for(let h of this.signalFixtures??[]){let u=vu(i);h.group.position.y=2.85+(this.reducedMotion?0:Math.sin(i*1.2)*.045);for(let d of h.lamps){let f=u[d.axis]===d.color;d.mesh.material.color.setHex(f?d.hex:2505784)}}for(let h of[...this.motion,...this.activeDelivery?[this.activeDelivery]:[]]){if(h.cityVehicle&&h.cityDistance===void 0){h.object.visible=!1;continue}h.cityVehicle&&(h.object.visible=!0);let u=h.pingPong?(h.offset+i*h.speed)%2:null,d=h.cityVehicle?h.once?Math.min(.999999,h.cityDistance/h.curve.getLength()):(h.cityDistance/h.curve.getLength()%1+1)%1:u!==null?u<=1?u:2-u:h.trafficLane!==void 0?(h.distance??h.offset*h.curve.getLength())/h.curve.getLength():Wp(h,i),f=h.curve.getPointAt(d),p=h.curve.getTangentAt(Math.min(.999,d));h.object.position.copy(f),h.surface==="ocean"&&(h.object.position.y+=Ma(f.x,f.z,i,8,this.perimeter.coast.shoreX)),h.bob&&(h.object.position.y+=Math.sin(i*2.1+h.offset*8)*h.bob),h.object.rotation.y=Math.atan2(p.x,p.z)+(h.rotationOffset??0)+(u>1?Math.PI:0)}for(let h of this.trains){let u=h.timetable?hp(i,h.curve.getLength(),h.timetable.stationDistance,h.timetable.phase):null,d=u?u.distance/h.curve.getLength():Wp(h,i);h.timetable?.passenger&&(this.stationService=u),h.cars.forEach((f,p)=>{let x=d-p*h.carGap;x-=Math.floor(x);let m=h.curve.getPointAt(x),g=h.curve.getTangentAt(Math.min(.999,x));f.position.copy(m),f.rotation.y=Math.atan2(g.x,g.z)})}for(let h of this.motion.filter(u=>u.stationPassenger)){let u=this.stationService,d=h.stationPassenger,f=u?.dwelling?Ze.smoothstep(u.dwellProgress,.12,.8):0;h.object.position.set(Ze.lerp(d.x,d.boardX,f),Ze.lerp(.53,.68,f),d.z),h.object.scale.setScalar(u?.dwelling?1-Ze.smoothstep(u.dwellProgress,.72,.95):Math.min(1,(u?.travelTime??0)/4))}this.windowDusk&&(this.windowDusk.value=this.reducedMotion?.45:.25+.65*(.5-.5*Math.cos(i*Math.PI*2/720))),pp(this.portLife,i,(h,u,d)=>Ma(h,u,d,8,this.perimeter.coast.shoreX)),gp(this.gulls,i),this.portLife&&this.stage.dataset.harborPhase!==this.portLife.phase&&(this.stage.dataset.harborPhase=this.portLife.phase);let l=this.stationService?.dwelling?"boarding":"travelling";this.stage.dataset.stationPhase!==l&&(this.stage.dataset.stationPhase=l);for(let h of this.signalMotion){let u=h.offset+i*h.speed;u-=Math.floor(u),h.object.position.copy(h.curve.getPointAt(u)),h.object.position.y+=.08+Math.sin(i*4+h.offset*9)*.04}for(let h of this.smoke){h.puff.visible=h.puff.parent?.userData.status!=="unhealthy";let u=(i*.16+h.phase)%1;h.puff.position.y=h.baseY+u*1.35,h.puff.position.x=h.baseX+Math.sin(i*.8+h.phase*6)*.08,h.puff.scale.setScalar(.72+u*1.08),h.puff.material.opacity=h.puff.parent?.userData.status==="unhealthy"?0:Math.sin(u*Math.PI)*.3}if(this.selectionMarker.visible){let h=this.reducedMotion?1:1+Math.sin(n*3.2)*.035;this.selectionMarker.scale.setScalar(h),this.selectionMarker.material.opacity=this.reducedMotion?.82:.7+Math.sin(n*3.2)*.18}for(let h of this.entityGroups.values()){if(!h.userData.beacon)continue;let u=this.reducedMotion?h.userData.live?1.34:1:h.userData.live?1.2+Math.sin(n*6)*.36:1+Math.sin(n*2.4+h.position.x)*.08;h.userData.beacon.scale.setScalar(u)}this.renderPolicy.shadows&&!this.reducedMotion&&e-(this.lastShadowFrame??0)>=100&&(this.renderer.shadowMap.needsUpdate=!0,this.lastShadowFrame=e),this.renderer.render(this.scene,this.camera),e-(this.lastRenderAudit??0)>1e3&&(this.stage.dataset.drawCalls=String(this.renderer.info.render.calls),this.stage.dataset.triangles=String(this.renderer.info.render.triangles),this.stage.dataset.frameBudget=String(Math.round(t)),this.lastRenderAudit=e),(this.labelsDirty||!this.lastLabelFrame)&&(this.labelRenderer.render(this.scene,this.camera),this.lastLabelFrame=e,this.labelsDirty=!1)}destroy(){if(!this.destroyed){this.destroyed=!0,cancelAnimationFrame(this.animationFrame),clearTimeout(this.tapFallbackTimer),this.resizeObserver?.disconnect(),this.motionPreference?.removeEventListener?.("change",this.onMotionPreferenceChange),this.controls?.removeEventListener("change",this.onControlsChange),this.controls?.dispose();for(let[e,t]of Object.entries(this.inputHandlers??{}))this.stage.removeEventListener(e,t);this.clearWorld(),this.scene.remove(this.selectionMarker),xr(this.selectionMarker);for(let e of this.assetCache.values())Promise.resolve(e).then(t=>xr(t,{includeShared:!0,includeTextures:!0})).catch(()=>{});this.assetCache.clear(),this.mobileMaterialCache.clear(),this.renderer.dispose(),this.renderer.domElement.remove(),this.labelRenderer.domElement.remove()}}};function Qv(s){try{return new sl(s)}catch(e){return console.error("Unable to initialize the 3D city",e),new Ru(s?.stage,e)}}return gm(eM);})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
