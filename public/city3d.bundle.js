/* Deploy Manager 3D city bundle. Source: client/city3d.js. Three.js is MIT licensed. */
var DeployManager3D=(()=>{var il=Object.defineProperty;var jp=Object.getOwnPropertyDescriptor;var Jp=Object.getOwnPropertyNames;var Qp=Object.prototype.hasOwnProperty;var em=(s,e)=>{for(var t in e)il(s,t,{get:e[t],enumerable:!0})},tm=(s,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Jp(e))!Qp.call(s,i)&&i!==t&&il(s,i,{get:()=>e[i],enumerable:!(n=jp(e,i))||n.enumerable});return s};var nm=s=>tm(il({},"__esModule",{value:!0}),s);var Ov={};em(Ov,{AMBIENT_DELIVERY_COUNT:()=>Tu,ASSET_URLS:()=>vu,CAMERA_HOME:()=>Ta,CITY_METRICS:()=>vn,City3D:()=>el,GHOST_MODEL_KEYS:()=>bu,HIGHWAY_APPROACH:()=>Lt,HIGHWAY_SIGN_ROTATION:()=>Lp,HIGHWAY_TRAFFIC_PROFILES:()=>Dp,OCEAN_WAVE_SETTINGS:()=>rp,RAIL_APPROACH:()=>Gt,REDUCED_MOTION_FRAME_MS:()=>Ip,ROAD_ASSET_METRICS:()=>An,ROAD_TILE_ROTATIONS:()=>Mu,TERRAIN_CONFIG:()=>un,TRAIN_TRAFFIC_PROFILE:()=>Kc,WATER_TRAFFIC_PROFILES:()=>Es,chooseAmbientDeliveryTargets:()=>Bp,chooseBuildingKey:()=>Up,createCity3D:()=>Fv,createHighwaySignTransform:()=>zp,createPerimeterBands:()=>Op,createPlotLayout:()=>Fp,createStreetAccess:()=>Ra,createStreetRoutePoints:()=>Jc,createTerrainContext:()=>Gp,createTransitCurves:()=>kp,oceanWaveHeightAt:()=>Ma,streetCurve:()=>Su,terrainFbmAt:()=>vr,terrainHeightAt:()=>Aa,vegetationDensityAt:()=>$c});var Vi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Gi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},bd=0,Kl=1,Sd=2;var gs=1,Ed=2,or=3,Nn=0,sn=1,Ut=2,Jn=0,rs=1,$l=2,jl=3,Jl=4,Td=5;var Ui=100,wd=101,Ad=102,Rd=103,Cd=104,Pd=200,Id=201,Ld=202,Dd=203,oo=204,co=205,Nd=206,Ud=207,Fd=208,Od=209,Bd=210,zd=211,kd=212,Hd=213,Vd=214,lo=0,ho=1,uo=2,as=3,fo=4,po=5,mo=6,go=7,Ql=0,Gd=1,Wd=2,Bn=0,eh=1,th=2,nh=3,ih=4,sh=5,rh=6,aa=7,Nl="attached",Xd="detached",ah=300,Wi=301,xs=302,ko=303,Ho=304,oa=306,Fi=1e3,En=1001,Gs=1002,Tt=1003,Vo=1004;var _s=1005;var wt=1006,cr=1007;var zn=1008;var ln=1009,oh=1010,ch=1011,lr=1012,Go=1013,kn=1014,_n=1015,Qn=1016,Wo=1017,Xo=1018,hr=1020,lh=35902,hh=35899,uh=1021,dh=1022,yn=1023,Xn=1026,Xi=1027,qo=1028,Yo=1029,qi=1030,Zo=1031;var Ko=1033,ca=33776,la=33777,ha=33778,ua=33779,$o=35840,jo=35841,Jo=35842,Qo=35843,ec=36196,tc=37492,nc=37496,ic=37488,sc=37489,da=37490,rc=37491,ac=37808,oc=37809,cc=37810,lc=37811,hc=37812,uc=37813,dc=37814,fc=37815,pc=37816,mc=37817,gc=37818,xc=37819,_c=37820,yc=37821,vc=36492,Mc=36494,bc=36495,Sc=36283,Ec=36284,fa=36285,Tc=36286;var os=2300,cs=2301,ao=2302,Ul=2303,Fl=2400,Ol=2401,Bl=2402,qd=2500;var fh=0,pa=1,ur=2,Yd=3200;var wc=0,Zd=1,Si="",xt="srgb",en="srgb-linear",Lr="linear",rt="srgb";var is=7680;var zl=519,Kd=512,$d=513,jd=514,Ac=515,Jd=516,Qd=517,Rc=518,ef=519,xo=35044;var ph="300 es",Ln=2e3,Ws=2001;function im(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function sm(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Xs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function tf(){let s=Xs("canvas");return s.style.display="block",s}var Uu={},qs=null;function Dr(...s){let e="THREE."+s.shift();qs?qs("log",e,...s):console.log(e,...s)}function nf(s){let e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Ee(...s){s=nf(s);let e="THREE."+s.shift();if(qs)qs("warn",e,...s);else{let t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function Oe(...s){s=nf(s);let e="THREE."+s.shift();if(qs)qs("error",e,...s);else{let t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function ss(...s){let e=s.join(" ");e in Uu||(Uu[e]=!0,Ee(...s))}function sf(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var rf={[lo]:ho,[uo]:mo,[fo]:go,[as]:po,[ho]:lo,[mo]:uo,[go]:fo,[po]:as},Un=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}},Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Fu=1234567,Hs=Math.PI/180,ls=180/Math.PI;function Dn(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Zt[s&255]+Zt[s>>8&255]+Zt[s>>16&255]+Zt[s>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[t&63|128]+Zt[t>>8&255]+"-"+Zt[t>>16&255]+Zt[t>>24&255]+Zt[n&255]+Zt[n>>8&255]+Zt[n>>16&255]+Zt[n>>24&255]).toLowerCase()}function We(s,e,t){return Math.max(e,Math.min(t,s))}function mh(s,e){return(s%e+e)%e}function rm(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function am(s,e,t){return s!==e?(t-s)/(e-s):0}function Cr(s,e,t){return(1-t)*s+t*e}function om(s,e,t,n){return Cr(s,e,1-Math.exp(-t*n))}function cm(s,e=1){return e-Math.abs(mh(s,e*2)-e)}function lm(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function hm(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function um(s,e){return s+Math.floor(Math.random()*(e-s+1))}function dm(s,e){return s+Math.random()*(e-s)}function fm(s){return s*(.5-Math.random())}function pm(s){s!==void 0&&(Fu=s);let e=Fu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function mm(s){return s*Hs}function gm(s){return s*ls}function xm(s){return(s&s-1)===0&&s!==0}function _m(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function ym(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function vm(s,e,t,n,i){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),p=a((n-e)/2);switch(i){case"XYX":s.set(o*h,l*u,l*d,o*c);break;case"YZY":s.set(l*d,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*d,o*h,o*c);break;case"XZX":s.set(o*h,l*p,l*f,o*c);break;case"YXY":s.set(l*f,o*h,l*p,o*c);break;case"ZYZ":s.set(l*p,l*f,o*h,o*c);break;default:Ee("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function In(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ot(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Ze={DEG2RAD:Hs,RAD2DEG:ls,generateUUID:Dn,clamp:We,euclideanModulo:mh,mapLinear:rm,inverseLerp:am,lerp:Cr,damp:om,pingpong:cm,smoothstep:lm,smootherstep:hm,randInt:um,randFloat:dm,randFloatSpread:fm,seededRandom:pm,degToRad:mm,radToDeg:gm,isPowerOfTwo:xm,ceilPowerOfTwo:_m,floorPowerOfTwo:ym,setQuaternionFromProperEuler:vm,normalize:ot,denormalize:In},oe=class s{static{s.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},$t=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=r[a+0],f=r[a+1],p=r[a+2],x=r[a+3];if(u!==x||l!==d||c!==f||h!==p){let g=l*d+c*f+h*p+u*x;g<0&&(d=-d,f=-f,p=-p,x=-x,g=-g);let m=1-o;if(g<.9995){let _=Math.acos(g),b=Math.sin(_);m=Math.sin(m*_)/b,o=Math.sin(o*_)/b,l=l*m+d*o,c=c*m+f*o,h=h*m+p*o,u=u*m+x*o}else{l=l*m+d*o,c=c*m+f*o,h=h*m+p*o,u=u*m+x*o;let _=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=_,c*=_,h*=_,u*=_}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],d=r[a+1],f=r[a+2],p=r[a+3];return e[t]=o*p+h*u+l*f-c*d,e[t+1]=l*p+h*d+c*u-o*f,e[t+2]=c*p+h*f+o*d-l*u,e[t+3]=h*p-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),d=l(n/2),f=l(i/2),p=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"YZX":this._x=d*h*u+c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u-d*f*p;break;case"XZY":this._x=d*h*u-c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u+d*f*p;break;default:Ee("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){let f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>u){let f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(We(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},T=class s{static{s.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ou.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ou.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-r*i),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=i+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return sl.copy(this).projectOnVector(e),this.sub(sl)}reflect(e){return this.sub(sl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},sl=new T,Ou=new $t,He=class s{static{s.prototype.isMatrix3=!0}constructor(e,t,n,i,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c)}set(e,t,n,i,r,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],x=i[0],g=i[3],m=i[6],_=i[1],b=i[4],y=i[7],w=i[2],S=i[5],R=i[8];return r[0]=a*x+o*_+l*w,r[3]=a*g+o*b+l*S,r[6]=a*m+o*y+l*R,r[1]=c*x+h*_+u*w,r[4]=c*g+h*b+u*S,r[7]=c*m+h*y+u*R,r[2]=d*x+f*_+p*w,r[5]=d*g+f*b+p*S,r[8]=d*m+f*y+p*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,p=t*u+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/p;return e[0]=u*x,e[1]=(i*c-h*n)*x,e[2]=(o*n-i*a)*x,e[3]=d*x,e[4]=(h*t-i*l)*x,e[5]=(i*r-o*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(a*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return ss("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(rl.makeScale(e,t)),this}rotate(e){return ss("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(rl.makeRotation(-e)),this}translate(e,t){return ss("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(rl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},rl=new He,Bu=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zu=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Mm(){let s={enabled:!0,workingColorSpace:en,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===rt&&(i.r=di(i.r),i.g=di(i.g),i.b=di(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===rt&&(i.r=Vs(i.r),i.g=Vs(i.g),i.b=Vs(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Si?Lr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return ss("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return ss("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[en]:{primaries:e,whitePoint:n,transfer:Lr,toXYZ:Bu,fromXYZ:zu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:xt},outputColorSpaceConfig:{drawingBufferColorSpace:xt}},[xt]:{primaries:e,whitePoint:n,transfer:rt,toXYZ:Bu,fromXYZ:zu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:xt}}}),s}var Ye=Mm();function di(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Vs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var As,_o=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{As===void 0&&(As=Xs("canvas")),As.width=e.width,As.height=e.height;let i=As.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=As}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Xs("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=di(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(di(t[n]/255)*255):t[n]=di(t[n]);return{data:t,width:e.width,height:e.height}}else return Ee("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},bm=0,Ys=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:bm++}),this.uuid=Dn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(al(i[a].image)):r.push(al(i[a]))}else r=al(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function al(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?_o.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Ee("Texture: Unable to serialize Texture."),{})}var Sm=0,ol=new T,Nt=class s extends Un{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=En,i=En,r=wt,a=zn,o=yn,l=ln,c=s.DEFAULT_ANISOTROPY,h=Si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Sm++}),this.uuid=Dn(),this.name="",this.source=new Ys(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new oe(0,0),this.repeat=new oe(1,1),this.center=new oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ol).x}get height(){return this.source.getSize(ol).y}get depth(){return this.source.getSize(ol).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ee(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Ee(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ah)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Fi:e.x=e.x-Math.floor(e.x);break;case En:e.x=e.x<0?0:1;break;case Gs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Fi:e.y=e.y-Math.floor(e.y);break;case En:e.y=e.y<0?0:1;break;case Gs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Nt.DEFAULT_IMAGE=null;Nt.DEFAULT_MAPPING=ah;Nt.DEFAULT_ANISOTROPY=1;var ct=class s{static{s.prototype.isVector4=!0}constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],p=l[9],x=l[2],g=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let b=(c+1)/2,y=(f+1)/2,w=(m+1)/2,S=(h+d)/4,R=(u+x)/4,v=(p+g)/4;return b>y&&b>w?b<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(b),i=S/n,r=R/n):y>w?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=S/i,r=v/i):w<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(w),n=R/r,i=v/r),this.set(n,i,r,t),this}let _=Math.sqrt((g-p)*(g-p)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(g-p)/_,this.y=(u-x)/_,this.z=(d-h)/_,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this.w=We(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this.w=We(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},yo=class extends Un{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ct(0,0,e,t),this.scissorTest=!1,this.viewport=new ct(0,0,e,t),this.textures=[];let i={width:e,height:t,depth:n.depth},r=new Nt(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:wt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Ys(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},mn=class extends yo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Nr=class extends Nt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Tt,this.minFilter=Tt,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var vo=class extends Nt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Tt,this.minFilter=Tt,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Be=class s{static{s.prototype.isMatrix4=!0}constructor(e,t,n,i,r,a,o,l,c,h,u,d,f,p,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c,h,u,d,f,p,x,g)}set(e,t,n,i,r,a,o,l,c,h,u,d,f,p,x,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=p,m[11]=x,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,i=1/Rs.setFromMatrixColumn(e,0).length(),r=1/Rs.setFromMatrixColumn(e,1).length(),a=1/Rs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=a*h,f=a*u,p=o*h,x=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+p*c,t[5]=d-x*c,t[9]=-o*l,t[2]=x-d*c,t[6]=p+f*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,p=c*h,x=c*u;t[0]=d+x*o,t[4]=p*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-p,t[6]=x+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,p=c*h,x=c*u;t[0]=d-x*o,t[4]=-a*u,t[8]=p+f*o,t[1]=f+p*o,t[5]=a*h,t[9]=x-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*h,f=a*u,p=o*h,x=o*u;t[0]=l*h,t[4]=p*c-f,t[8]=d*c+x,t[1]=l*u,t[5]=x*c+d,t[9]=f*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,f=a*c,p=o*l,x=o*c;t[0]=l*h,t[4]=x-d*u,t[8]=p*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+p,t[10]=d-x*u}else if(e.order==="XZY"){let d=a*l,f=a*c,p=o*l,x=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+x,t[5]=a*h,t[9]=f*u-p,t[2]=p*u-f,t[6]=o*h,t[10]=x*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Em,e,Tm)}lookAt(e,t,n){let i=this.elements;return fn.subVectors(e,t),fn.lengthSq()===0&&(fn.z=1),fn.normalize(),Ci.crossVectors(n,fn),Ci.lengthSq()===0&&(Math.abs(n.z)===1?fn.x+=1e-4:fn.z+=1e-4,fn.normalize(),Ci.crossVectors(n,fn)),Ci.normalize(),Ia.crossVectors(fn,Ci),i[0]=Ci.x,i[4]=Ia.x,i[8]=fn.x,i[1]=Ci.y,i[5]=Ia.y,i[9]=fn.y,i[2]=Ci.z,i[6]=Ia.z,i[10]=fn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],x=n[6],g=n[10],m=n[14],_=n[3],b=n[7],y=n[11],w=n[15],S=i[0],R=i[4],v=i[8],A=i[12],P=i[1],I=i[5],L=i[9],W=i[13],Y=i[2],z=i[6],X=i[10],q=i[14],Q=i[3],ne=i[7],ce=i[11],fe=i[15];return r[0]=a*S+o*P+l*Y+c*Q,r[4]=a*R+o*I+l*z+c*ne,r[8]=a*v+o*L+l*X+c*ce,r[12]=a*A+o*W+l*q+c*fe,r[1]=h*S+u*P+d*Y+f*Q,r[5]=h*R+u*I+d*z+f*ne,r[9]=h*v+u*L+d*X+f*ce,r[13]=h*A+u*W+d*q+f*fe,r[2]=p*S+x*P+g*Y+m*Q,r[6]=p*R+x*I+g*z+m*ne,r[10]=p*v+x*L+g*X+m*ce,r[14]=p*A+x*W+g*q+m*fe,r[3]=_*S+b*P+y*Y+w*Q,r[7]=_*R+b*I+y*z+w*ne,r[11]=_*v+b*L+y*X+w*ce,r[15]=_*A+b*W+y*q+w*fe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],p=e[3],x=e[7],g=e[11],m=e[15],_=l*f-c*d,b=o*f-c*u,y=o*d-l*u,w=a*f-c*h,S=a*d-l*h,R=a*u-o*h;return t*(x*_-g*b+m*y)-n*(p*_-g*w+m*S)+i*(p*b-x*w+m*R)-r*(p*y-x*S+g*R)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(r*h-o*l)+i*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],p=e[12],x=e[13],g=e[14],m=e[15],_=t*o-n*a,b=t*l-i*a,y=t*c-r*a,w=n*l-i*o,S=n*c-r*o,R=i*c-r*l,v=h*x-u*p,A=h*g-d*p,P=h*m-f*p,I=u*g-d*x,L=u*m-f*x,W=d*m-f*g,Y=_*W-b*L+y*I+w*P-S*A+R*v;if(Y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/Y;return e[0]=(o*W-l*L+c*I)*z,e[1]=(i*L-n*W-r*I)*z,e[2]=(x*R-g*S+m*w)*z,e[3]=(d*S-u*R-f*w)*z,e[4]=(l*P-a*W-c*A)*z,e[5]=(t*W-i*P+r*A)*z,e[6]=(g*y-p*R-m*b)*z,e[7]=(h*R-d*y+f*b)*z,e[8]=(a*L-o*P+c*v)*z,e[9]=(n*P-t*L-r*v)*z,e[10]=(p*S-x*y+m*_)*z,e[11]=(u*y-h*S-f*_)*z,e[12]=(o*A-a*I-l*v)*z,e[13]=(t*I-n*A+i*v)*z,e[14]=(x*b-p*w-g*_)*z,e[15]=(h*w-u*b+d*_)*z,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,p=r*u,x=a*h,g=a*u,m=o*u,_=l*c,b=l*h,y=l*u,w=n.x,S=n.y,R=n.z;return i[0]=(1-(x+m))*w,i[1]=(f+y)*w,i[2]=(p-b)*w,i[3]=0,i[4]=(f-y)*S,i[5]=(1-(d+m))*S,i[6]=(g+_)*S,i[7]=0,i[8]=(p+b)*R,i[9]=(g-_)*R,i[10]=(1-(d+x))*R,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Rs.set(i[0],i[1],i[2]).length(),o=Rs.set(i[4],i[5],i[6]).length(),l=Rs.set(i[8],i[9],i[10]).length();r<0&&(a=-a),Rn.copy(this);let c=1/a,h=1/o,u=1/l;return Rn.elements[0]*=c,Rn.elements[1]*=c,Rn.elements[2]*=c,Rn.elements[4]*=h,Rn.elements[5]*=h,Rn.elements[6]*=h,Rn.elements[8]*=u,Rn.elements[9]*=u,Rn.elements[10]*=u,t.setFromRotationMatrix(Rn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,i,r,a,o=Ln,l=!1){let c=this.elements,h=2*r/(t-e),u=2*r/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i),p,x;if(l)p=r/(a-r),x=a*r/(a-r);else if(o===Ln)p=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Ws)p=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=Ln,l=!1){let c=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i),p,x;if(l)p=1/(a-r),x=a/(a-r);else if(o===Ln)p=-2/(a-r),x=-(a+r)/(a-r);else if(o===Ws)p=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Rs=new T,Rn=new Be,Em=new T(0,0,0),Tm=new T(1,1,1),Ci=new T,Ia=new T,fn=new T,ku=new Be,Hu=new $t,fi=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-We(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(We(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-We(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(We(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-We(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ee("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ku.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ku,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Hu.setFromEuler(this),this.setFromQuaternion(Hu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};fi.DEFAULT_ORDER="XYZ";var Zs=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},wm=0,Vu=new T,Cs=new $t,ri=new Be,La=new T,Mr=new T,Am=new T,Rm=new $t,Gu=new T(1,0,0),Wu=new T(0,1,0),Xu=new T(0,0,1),qu={type:"added"},Cm={type:"removed"},Ps={type:"childadded",child:null},cl={type:"childremoved",child:null},je=class s extends Un{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wm++}),this.uuid=Dn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new T,t=new fi,n=new $t,i=new T(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Be},normalMatrix:{value:new He}}),this.matrix=new Be,this.matrixWorld=new Be,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Zs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Cs.setFromAxisAngle(e,t),this.quaternion.multiply(Cs),this}rotateOnWorldAxis(e,t){return Cs.setFromAxisAngle(e,t),this.quaternion.premultiply(Cs),this}rotateX(e){return this.rotateOnAxis(Gu,e)}rotateY(e){return this.rotateOnAxis(Wu,e)}rotateZ(e){return this.rotateOnAxis(Xu,e)}translateOnAxis(e,t){return Vu.copy(e).applyQuaternion(this.quaternion),this.position.add(Vu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Gu,e)}translateY(e){return this.translateOnAxis(Wu,e)}translateZ(e){return this.translateOnAxis(Xu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ri.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?La.copy(e):La.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Mr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ri.lookAt(Mr,La,this.up):ri.lookAt(La,Mr,this.up),this.quaternion.setFromRotationMatrix(ri),i&&(ri.extractRotation(i.matrixWorld),Cs.setFromRotationMatrix(ri),this.quaternion.premultiply(Cs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Oe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(qu),Ps.child=e,this.dispatchEvent(Ps),Ps.child=null):Oe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Cm),cl.child=e,this.dispatchEvent(cl),cl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ri.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ri.multiply(e.parent.matrixWorld)),e.applyMatrix4(ri),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(qu),Ps.child=e,this.dispatchEvent(Ps),Ps.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,e,Am),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,Rm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,i=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*i,r[13]+=n-r[1]*t-r[5]*n-r[9]*i,r[14]+=i-r[2]*t-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};je.DEFAULT_UP=new T(0,1,0);je.DEFAULT_MATRIX_AUTO_UPDATE=!0;je.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Je=class extends je{constructor(){super(),this.isGroup=!0,this.type="Group"}},Pm={type:"move"},Ks=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Je,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Je,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Je,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let x of e.hand.values()){let g=t.getJointPose(x,n),m=this._getHandJoint(c,x);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Pm)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Je;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},af={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pi={h:0,s:0,l:0},Da={h:0,s:0,l:0};function ll(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var we=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=xt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ye.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Ye.workingColorSpace){if(e=mh(e,1),t=We(t,0,1),n=We(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=ll(a,r,e+1/3),this.g=ll(a,r,e),this.b=ll(a,r,e-1/3)}return Ye.colorSpaceToWorking(this,i),this}setStyle(e,t=xt){function n(r){r!==void 0&&parseFloat(r)<1&&Ee("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ee("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ee("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=xt){let n=af[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ee("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=di(e.r),this.g=di(e.g),this.b=di(e.b),this}copyLinearToSRGB(e){return this.r=Vs(e.r),this.g=Vs(e.g),this.b=Vs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=xt){return Ye.workingToColorSpace(Kt.copy(this),e),Math.round(We(Kt.r*255,0,255))*65536+Math.round(We(Kt.g*255,0,255))*256+Math.round(We(Kt.b*255,0,255))}getHexString(e=xt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.workingToColorSpace(Kt.copy(this),t);let n=Kt.r,i=Kt.g,r=Kt.b,a=Math.max(n,i,r),o=Math.min(n,i,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ye.workingColorSpace){return Ye.workingToColorSpace(Kt.copy(this),t),e.r=Kt.r,e.g=Kt.g,e.b=Kt.b,e}getStyle(e=xt){Ye.workingToColorSpace(Kt.copy(this),e);let t=Kt.r,n=Kt.g,i=Kt.b;return e!==xt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Pi),this.setHSL(Pi.h+e,Pi.s+t,Pi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Pi),e.getHSL(Da);let n=Cr(Pi.h,Da.h,t),i=Cr(Pi.s,Da.s,t),r=Cr(Pi.l,Da.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Kt=new we;we.NAMES=af;var Ur=class extends je{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fi,this.environmentIntensity=1,this.environmentRotation=new fi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Cn=new T,ai=new T,hl=new T,oi=new T,Is=new T,Ls=new T,Yu=new T,ul=new T,dl=new T,fl=new T,pl=new ct,ml=new ct,gl=new ct,ui=class s{constructor(e=new T,t=new T,n=new T){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Cn.subVectors(e,t),i.cross(Cn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Cn.subVectors(i,t),ai.subVectors(n,t),hl.subVectors(e,t);let a=Cn.dot(Cn),o=Cn.dot(ai),l=Cn.dot(hl),c=ai.dot(ai),h=ai.dot(hl),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-o*h)*d,p=(a*h-o*l)*d;return r.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,oi)===null?!1:oi.x>=0&&oi.y>=0&&oi.x+oi.y<=1}static getInterpolation(e,t,n,i,r,a,o,l){return this.getBarycoord(e,t,n,i,oi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,oi.x),l.addScaledVector(a,oi.y),l.addScaledVector(o,oi.z),l)}static getInterpolatedAttribute(e,t,n,i,r,a){return pl.setScalar(0),ml.setScalar(0),gl.setScalar(0),pl.fromBufferAttribute(e,t),ml.fromBufferAttribute(e,n),gl.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(pl,r.x),a.addScaledVector(ml,r.y),a.addScaledVector(gl,r.z),a}static isFrontFacing(e,t,n,i){return Cn.subVectors(n,t),ai.subVectors(e,t),Cn.cross(ai).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Cn.subVectors(this.c,this.b),ai.subVectors(this.a,this.b),Cn.cross(ai).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,a,o;Is.subVectors(i,n),Ls.subVectors(r,n),ul.subVectors(e,n);let l=Is.dot(ul),c=Ls.dot(ul);if(l<=0&&c<=0)return t.copy(n);dl.subVectors(e,i);let h=Is.dot(dl),u=Ls.dot(dl);if(h>=0&&u<=h)return t.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Is,a);fl.subVectors(e,r);let f=Is.dot(fl),p=Ls.dot(fl);if(p>=0&&f<=p)return t.copy(r);let x=f*c-l*p;if(x<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Ls,o);let g=h*p-f*u;if(g<=0&&u-h>=0&&f-p>=0)return Yu.subVectors(r,i),o=(u-h)/(u-h+(f-p)),t.copy(i).addScaledVector(Yu,o);let m=1/(g+x+d);return a=x*m,o=d*m,t.copy(n).addScaledVector(Is,a).addScaledVector(Ls,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},It=class{constructor(e=new T(1/0,1/0,1/0),t=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Pn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Pn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Pn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Pn):Pn.fromBufferAttribute(r,a),Pn.applyMatrix4(e.matrixWorld),this.expandByPoint(Pn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Na.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Na.copy(n.boundingBox)),Na.applyMatrix4(e.matrixWorld),this.union(Na)}let i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Pn),Pn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(br),Ua.subVectors(this.max,br),Ds.subVectors(e.a,br),Ns.subVectors(e.b,br),Us.subVectors(e.c,br),Ii.subVectors(Ns,Ds),Li.subVectors(Us,Ns),Qi.subVectors(Ds,Us);let t=[0,-Ii.z,Ii.y,0,-Li.z,Li.y,0,-Qi.z,Qi.y,Ii.z,0,-Ii.x,Li.z,0,-Li.x,Qi.z,0,-Qi.x,-Ii.y,Ii.x,0,-Li.y,Li.x,0,-Qi.y,Qi.x,0];return!xl(t,Ds,Ns,Us,Ua)||(t=[1,0,0,0,1,0,0,0,1],!xl(t,Ds,Ns,Us,Ua))?!1:(Fa.crossVectors(Ii,Li),t=[Fa.x,Fa.y,Fa.z],xl(t,Ds,Ns,Us,Ua))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Pn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Pn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ci),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ci=[new T,new T,new T,new T,new T,new T,new T,new T],Pn=new T,Na=new It,Ds=new T,Ns=new T,Us=new T,Ii=new T,Li=new T,Qi=new T,br=new T,Ua=new T,Fa=new T,es=new T;function xl(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){es.fromArray(s,r);let o=i.x*Math.abs(es.x)+i.y*Math.abs(es.y)+i.z*Math.abs(es.z),l=e.dot(es),c=t.dot(es),h=n.dot(es);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Pt=new T,Oa=new oe,Im=0,Et=class extends Un{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Im++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=xo,this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Oa.fromBufferAttribute(this,t),Oa.applyMatrix3(e),this.setXY(t,Oa.x,Oa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix3(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=In(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ot(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=In(t,this.array)),t}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=In(t,this.array)),t}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=In(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=In(t,this.array)),t}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array),r=ot(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==xo&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var Fr=class extends Et{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Or=class extends Et{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ue=class extends Et{constructor(e,t,n){super(new Float32Array(e),t,n)}},Lm=new It,Sr=new T,_l=new T,jt=class{constructor(e=new T,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Lm.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Sr.subVectors(e,this.center);let t=Sr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Sr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(_l.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Sr.copy(e.center).add(_l)),this.expandByPoint(Sr.copy(e.center).sub(_l))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Dm=0,bn=new Be,yl=new je,Fs=new T,pn=new It,Er=new It,kt=new T,et=class s extends Un{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Dm++}),this.uuid=Dn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(im(e)?Or:Fr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new He().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return bn.makeRotationFromQuaternion(e),this.applyMatrix4(bn),this}rotateX(e){return bn.makeRotationX(e),this.applyMatrix4(bn),this}rotateY(e){return bn.makeRotationY(e),this.applyMatrix4(bn),this}rotateZ(e){return bn.makeRotationZ(e),this.applyMatrix4(bn),this}translate(e,t,n){return bn.makeTranslation(e,t,n),this.applyMatrix4(bn),this}scale(e,t,n){return bn.makeScale(e,t,n),this.applyMatrix4(bn),this}lookAt(e){return yl.lookAt(e),yl.updateMatrix(),this.applyMatrix4(yl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fs).negate(),this.translate(Fs.x,Fs.y,Fs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ue(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&Ee("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new It);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Oe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];pn.setFromBufferAttribute(r),this.morphTargetsRelative?(kt.addVectors(this.boundingBox.min,pn.min),this.boundingBox.expandByPoint(kt),kt.addVectors(this.boundingBox.max,pn.max),this.boundingBox.expandByPoint(kt)):(this.boundingBox.expandByPoint(pn.min),this.boundingBox.expandByPoint(pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Oe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Oe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new T,1/0);return}if(e){let n=this.boundingSphere.center;if(pn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Er.setFromBufferAttribute(o),this.morphTargetsRelative?(kt.addVectors(pn.min,Er.min),pn.expandByPoint(kt),kt.addVectors(pn.max,Er.max),pn.expandByPoint(kt)):(pn.expandByPoint(Er.min),pn.expandByPoint(Er.max))}pn.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)kt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(kt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)kt.fromBufferAttribute(o,c),l&&(Fs.fromBufferAttribute(e,c),kt.add(Fs)),i=Math.max(i,n.distanceToSquared(kt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Oe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Oe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Et(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let v=0;v<n.count;v++)o[v]=new T,l[v]=new T;let c=new T,h=new T,u=new T,d=new oe,f=new oe,p=new oe,x=new T,g=new T;function m(v,A,P){c.fromBufferAttribute(n,v),h.fromBufferAttribute(n,A),u.fromBufferAttribute(n,P),d.fromBufferAttribute(r,v),f.fromBufferAttribute(r,A),p.fromBufferAttribute(r,P),h.sub(c),u.sub(c),f.sub(d),p.sub(d);let I=1/(f.x*p.y-p.x*f.y);isFinite(I)&&(x.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(I),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(I),o[v].add(x),o[A].add(x),o[P].add(x),l[v].add(g),l[A].add(g),l[P].add(g))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let v=0,A=_.length;v<A;++v){let P=_[v],I=P.start,L=P.count;for(let W=I,Y=I+L;W<Y;W+=3)m(e.getX(W+0),e.getX(W+1),e.getX(W+2))}let b=new T,y=new T,w=new T,S=new T;function R(v){w.fromBufferAttribute(i,v),S.copy(w);let A=o[v];b.copy(A),b.sub(w.multiplyScalar(w.dot(A))).normalize(),y.crossVectors(S,A);let I=y.dot(l[v])<0?-1:1;a.setXYZW(v,b.x,b.y,b.z,I)}for(let v=0,A=_.length;v<A;++v){let P=_[v],I=P.start,L=P.count;for(let W=I,Y=I+L;W<Y;W+=3)R(e.getX(W+0)),R(e.getX(W+1)),R(e.getX(W+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Et(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new T,r=new T,a=new T,o=new T,l=new T,c=new T,h=new T,u=new T;if(e)for(let d=0,f=e.count;d<f;d+=3){let p=e.getX(d+0),x=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,p),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)kt.fromBufferAttribute(e,t),kt.normalize(),e.setXYZ(t,kt.x,kt.y,kt.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),f=0,p=0;for(let x=0,g=l.length;x<g;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*h;for(let m=0;m<h;m++)d[p++]=c[f++]}return new Et(d,h,u)}if(this.index===null)return Ee("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},$s=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=xo,this.updateRanges=[],this.version=0,this.uuid=Dn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Qt=new T,js=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix4(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyNormalMatrix(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.transformDirection(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=In(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ot(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=In(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=In(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=In(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=In(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array),r=ot(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Dr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Et(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Dr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Nm=0,an=class extends Un{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Nm++}),this.uuid=Dn(),this.name="",this.type="Material",this.blending=rs,this.side=Nn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=oo,this.blendDst=co,this.blendEquation=Ui,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new we(0,0,0),this.blendAlpha=0,this.depthFunc=as,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=is,this.stencilZFail=is,this.stencilZPass=is,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ee(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Ee(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==rs&&(n.blending=this.blending),this.side!==Nn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==oo&&(n.blendSrc=this.blendSrc),this.blendDst!==co&&(n.blendDst=this.blendDst),this.blendEquation!==Ui&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==as&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==zl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==is&&(n.stencilFail=this.stencilFail),this.stencilZFail!==is&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==is&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new we().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new oe().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new oe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var li=new T,vl=new T,Ba=new T,Di=new T,Ml=new T,za=new T,bl=new T,qn=class{constructor(e=new T,t=new T(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,li)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=li.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(li.copy(this.origin).addScaledVector(this.direction,t),li.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){vl.copy(e).add(t).multiplyScalar(.5),Ba.copy(t).sub(e).normalize(),Di.copy(this.origin).sub(vl);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Ba),o=Di.dot(this.direction),l=-Di.dot(Ba),c=Di.lengthSq(),h=Math.abs(1-a*a),u,d,f,p;if(h>0)if(u=a*l-o,d=a*o-l,p=r*h,u>=0)if(d>=-p)if(d<=p){let x=1/h;u*=x,d*=x,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-p?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=p?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(vl).addScaledVector(Ba,d),f}intersectSphere(e,t){li.subVectors(e.center,this.origin);let n=li.dot(this.direction),i=li.dot(li)-n*n,r=e.radius*e.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,li)!==null}intersectTriangle(e,t,n,i,r){Ml.subVectors(t,e),za.subVectors(n,e),bl.crossVectors(Ml,za);let a=this.direction.dot(bl),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Di.subVectors(this.origin,e);let l=o*this.direction.dot(za.crossVectors(Di,za));if(l<0)return null;let c=o*this.direction.dot(Ml.cross(Di));if(c<0||l+c>a)return null;let h=-o*Di.dot(bl);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},gt=class extends an{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.combine=Ql,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Zu=new Be,ts=new qn,ka=new jt,Ku=new T,Ha=new T,Va=new T,Ga=new T,Sl=new T,Wa=new T,$u=new T,Xa=new T,be=class extends je{constructor(e=new et,t=new gt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(r&&o){Wa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&(Sl.fromBufferAttribute(u,e),a?Wa.addScaledVector(Sl,h):Wa.addScaledVector(Sl.sub(t),h))}t.add(Wa)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ka.copy(n.boundingSphere),ka.applyMatrix4(r),ts.copy(e.ray).recast(e.near),!(ka.containsPoint(ts.origin)===!1&&(ts.intersectSphere(ka,Ku)===null||ts.origin.distanceToSquared(Ku)>(e.far-e.near)**2))&&(Zu.copy(r).invert(),ts.copy(e.ray).applyMatrix4(Zu),!(n.boundingBox!==null&&ts.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ts)))}_computeIntersections(e,t,n){let i,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,x=d.length;p<x;p++){let g=d[p],m=a[g.materialIndex],_=Math.max(g.start,f.start),b=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let y=_,w=b;y<w;y+=3){let S=o.getX(y),R=o.getX(y+1),v=o.getX(y+2);i=qa(this,m,e,n,c,h,u,S,R,v),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let g=p,m=x;g<m;g+=3){let _=o.getX(g),b=o.getX(g+1),y=o.getX(g+2);i=qa(this,a,e,n,c,h,u,_,b,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,x=d.length;p<x;p++){let g=d[p],m=a[g.materialIndex],_=Math.max(g.start,f.start),b=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=_,w=b;y<w;y+=3){let S=y,R=y+1,v=y+2;i=qa(this,m,e,n,c,h,u,S,R,v),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let g=p,m=x;g<m;g+=3){let _=g,b=g+1,y=g+2;i=qa(this,a,e,n,c,h,u,_,b,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}};function Um(s,e,t,n,i,r,a,o){let l;if(e.side===sn?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,e.side===Nn,o),l===null)return null;Xa.copy(o),Xa.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(Xa);return c<t.near||c>t.far?null:{distance:c,point:Xa.clone(),object:s}}function qa(s,e,t,n,i,r,a,o,l,c){s.getVertexPosition(o,Ha),s.getVertexPosition(l,Va),s.getVertexPosition(c,Ga);let h=Um(s,e,t,n,Ha,Va,Ga,$u);if(h){let u=new T;ui.getBarycoord($u,Ha,Va,Ga,u),i&&(h.uv=ui.getInterpolatedAttribute(i,o,l,c,u,new oe)),r&&(h.uv1=ui.getInterpolatedAttribute(r,o,l,c,u,new oe)),a&&(h.normal=ui.getInterpolatedAttribute(a,o,l,c,u,new T),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new T,materialIndex:0};ui.getNormal(Ha,Va,Ga,d.normal),h.face=d,h.barycoord=u}return h}var Tr=new ct,ju=new ct,Ju=new ct,Fm=new ct,Qu=new Be,Ya=new T,El=new jt,ed=new Be,Tl=new qn,Br=class extends be{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Nl,this.bindMatrix=new Be,this.bindMatrixInverse=new Be,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new It),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ya),this.boundingBox.expandByPoint(Ya)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new jt),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ya),this.boundingSphere.expandByPoint(Ya)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),El.copy(this.boundingSphere),El.applyMatrix4(i),e.ray.intersectsSphere(El)!==!1&&(ed.copy(i).invert(),Tl.copy(e.ray).applyMatrix4(ed),!(this.boundingBox!==null&&Tl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Tl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new ct,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Nl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Xd?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ee("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;ju.fromBufferAttribute(i.attributes.skinIndex,e),Ju.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Tr.copy(t),t.set(0,0,0,0)):(Tr.set(...t,1),t.set(0,0,0)),Tr.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=Ju.getComponent(r);if(a!==0){let o=ju.getComponent(r);Qu.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Fm.copy(Tr).applyMatrix4(Qu),a)}}return t.isVector4&&(t.w=Tr.w),t.applyMatrix4(this.bindMatrixInverse)}},Js=class extends je{constructor(){super(),this.isBone=!0,this.type="Bone"}},Qs=class extends Nt{constructor(e=null,t=1,n=1,i,r,a,o,l,c=Tt,h=Tt,u,d){super(null,a,o,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},td=new Be,Om=new Be,zr=class s{constructor(e=[],t=[]){this.uuid=Dn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ee("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Be)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Be;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:Om;td.multiplyMatrices(o,t[r]),td.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Qs(t,e,e,yn,_n);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],a=t[r];a===void 0&&(Ee("Skeleton: No bone found with UUID:",r),a=new Js),this.bones.push(a),this.boneInverses.push(new Be().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},Oi=class extends Et{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Os=new Be,nd=new Be,Za=[],id=new It,Bm=new Be,wr=new be,Ar=new jt,Vt=class extends be{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Oi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Bm)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new It),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Os),id.copy(e.boundingBox).applyMatrix4(Os),this.boundingBox.union(id)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new jt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Os),Ar.copy(e.boundingSphere).applyMatrix4(Os),this.boundingSphere.union(Ar)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(wr.geometry=this.geometry,wr.material=this.material,wr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ar.copy(this.boundingSphere),Ar.applyMatrix4(n),e.ray.intersectsSphere(Ar)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Os),nd.multiplyMatrices(n,Os),wr.matrixWorld=nd,wr.raycast(e,Za);for(let a=0,o=Za.length;a<o;a++){let l=Za[a];l.instanceId=r,l.object=this,t.push(l)}Za.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Oi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Qs(new Float32Array(i*this.count),i,this.count,qo,_n));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},wl=new T,zm=new T,km=new He,Sn=class{constructor(e=new T(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=wl.subVectors(n,t).cross(zm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta(wl),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||km.getNormalMatrix(e),i=this.coplanarPoint(wl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},ns=new jt,Hm=new oe(.5,.5),Ka=new T,Bi=class{constructor(e=new Sn,t=new Sn,n=new Sn,i=new Sn,r=new Sn,a=new Sn){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ln,n=!1){let i=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],p=r[8],x=r[9],g=r[10],m=r[11],_=r[12],b=r[13],y=r[14],w=r[15];if(i[0].setComponents(c-a,f-h,m-p,w-_).normalize(),i[1].setComponents(c+a,f+h,m+p,w+_).normalize(),i[2].setComponents(c+o,f+u,m+x,w+b).normalize(),i[3].setComponents(c-o,f-u,m-x,w-b).normalize(),n)i[4].setComponents(l,d,g,y).normalize(),i[5].setComponents(c-l,f-d,m-g,w-y).normalize();else if(i[4].setComponents(c-l,f-d,m-g,w-y).normalize(),t===Ln)i[5].setComponents(c+l,f+d,m+g,w+y).normalize();else if(t===Ws)i[5].setComponents(l,d,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ns.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ns.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ns)}intersectsSprite(e){ns.center.set(0,0,0);let t=Hm.distanceTo(e.center);return ns.radius=.7071067811865476+t,ns.applyMatrix4(e.matrixWorld),this.intersectsSphere(ns)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Ka.x=i.normal.x>0?e.max.x:e.min.x,Ka.y=i.normal.y>0?e.max.y:e.min.y,Ka.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ka)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var gn=class extends an{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new we(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Mo=new T,bo=new T,sd=new Be,Rr=new qn,$a=new jt,Al=new T,rd=new T,pi=class extends je{constructor(e=new et,t=new gn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Mo.fromBufferAttribute(t,i-1),bo.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Mo.distanceTo(bo);e.setAttribute("lineDistance",new Ue(n,1))}else Ee("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),$a.copy(n.boundingSphere),$a.applyMatrix4(i),$a.radius+=r,e.ray.intersectsSphere($a)===!1)return;sd.copy(i).invert(),Rr.copy(e.ray).applyMatrix4(sd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let x=f,g=p-1;x<g;x+=c){let m=h.getX(x),_=h.getX(x+1),b=ja(this,e,Rr,l,m,_,x);b&&t.push(b)}if(this.isLineLoop){let x=h.getX(p-1),g=h.getX(f),m=ja(this,e,Rr,l,x,g,p-1);m&&t.push(m)}}else{let f=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let x=f,g=p-1;x<g;x+=c){let m=ja(this,e,Rr,l,x,x+1,x);m&&t.push(m)}if(this.isLineLoop){let x=ja(this,e,Rr,l,p-1,f,p-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function ja(s,e,t,n,i,r,a){let o=s.geometry.attributes.position;if(Mo.fromBufferAttribute(o,i),bo.fromBufferAttribute(o,r),t.distanceSqToSegment(Mo,bo,Al,rd)>n)return;Al.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(Al);if(!(c<e.near||c>e.far))return{distance:c,point:rd.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}var ad=new T,od=new T,Yn=class extends pi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)ad.fromBufferAttribute(t,i),od.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+ad.distanceTo(od);e.setAttribute("lineDistance",new Ue(n,1))}else Ee("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},hs=class extends pi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},er=class extends an{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new we(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},cd=new Be,kl=new qn,Ja=new jt,Qa=new T,kr=class extends je{constructor(e=new et,t=new er){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ja.copy(n.boundingSphere),Ja.applyMatrix4(i),Ja.radius+=r,e.ray.intersectsSphere(Ja)===!1)return;cd.copy(i).invert(),kl.copy(e.ray).applyMatrix4(cd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let p=d,x=f;p<x;p++){let g=c.getX(p);Qa.fromBufferAttribute(u,g),ld(Qa,g,l,i,e,t,this)}}else{let d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let p=d,x=f;p<x;p++)Qa.fromBufferAttribute(u,p),ld(Qa,p,l,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function ld(s,e,t,n,i,r,a){let o=kl.distanceSqToPoint(s);if(o<t){let l=new T;kl.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Hr=class extends Nt{constructor(e=[],t=Wi,n,i,r,a,o,l,c,h){super(e,t,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Vr=class extends Nt{constructor(e,t,n,i,r,a,o,l,c){super(e,t,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var mi=class extends Nt{constructor(e,t,n=kn,i,r,a,o=Tt,l=Tt,c,h=Xn,u=1){if(h!==Xn&&h!==Xi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ys(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},So=class extends mi{constructor(e,t=kn,n=Wi,i,r,a=Tt,o=Tt,l,c=Xn){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,i,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Gr=class extends Nt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},_t=class s extends et{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,f=0;p("z","y","x",-1,-1,n,t,e,a,r,0),p("z","y","x",1,-1,n,t,-e,a,r,1),p("x","z","y",1,1,e,n,t,i,a,2),p("x","z","y",1,-1,e,n,-t,i,a,3),p("x","y","z",1,-1,e,t,n,i,r,4),p("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Ue(c,3)),this.setAttribute("normal",new Ue(h,3)),this.setAttribute("uv",new Ue(u,2));function p(x,g,m,_,b,y,w,S,R,v,A){let P=y/R,I=w/v,L=y/2,W=w/2,Y=S/2,z=R+1,X=v+1,q=0,Q=0,ne=new T;for(let ce=0;ce<X;ce++){let fe=ce*I-W;for(let ve=0;ve<z;ve++){let nt=ve*P-L;ne[x]=nt*_,ne[g]=fe*b,ne[m]=Y,c.push(ne.x,ne.y,ne.z),ne[x]=0,ne[g]=0,ne[m]=S>0?1:-1,h.push(ne.x,ne.y,ne.z),u.push(ve/R),u.push(1-ce/v),q+=1}}for(let ce=0;ce<v;ce++)for(let fe=0;fe<R;fe++){let ve=d+fe+z*ce,nt=d+fe+z*(ce+1),st=d+(fe+1)+z*(ce+1),$e=d+(fe+1)+z*ce;l.push(ve,nt,$e),l.push(nt,st,$e),Q+=6}o.addGroup(f,Q,A),f+=Q,d+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},us=class s extends et{constructor(e=1,t=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));let a=[],o=[],l=[],c=[],h=t/2,u=Math.PI/2*e,d=t,f=2*u+d,p=n*2+r,x=i+1,g=new T,m=new T;for(let _=0;_<=p;_++){let b=0,y=0,w=0,S=0;if(_<=n){let A=_/n,P=A*Math.PI/2;y=-h-e*Math.cos(P),w=e*Math.sin(P),S=-e*Math.cos(P),b=A*u}else if(_<=n+r){let A=(_-n)/r;y=-h+A*t,w=e,S=0,b=u+A*d}else{let A=(_-n-r)/n,P=A*Math.PI/2;y=h+e*Math.sin(P),w=e*Math.cos(P),S=e*Math.sin(P),b=u+d+A*u}let R=Math.max(0,Math.min(1,b/f)),v=0;_===0?v=.5/i:_===p&&(v=-.5/i);for(let A=0;A<=i;A++){let P=A/i,I=P*Math.PI*2,L=Math.sin(I),W=Math.cos(I);m.x=-w*W,m.y=y,m.z=w*L,o.push(m.x,m.y,m.z),g.set(-w*W,S,w*L),g.normalize(),l.push(g.x,g.y,g.z),c.push(P+v,R)}if(_>0){let A=(_-1)*x;for(let P=0;P<i;P++){let I=A+P,L=A+P+1,W=_*x+P,Y=_*x+P+1;a.push(I,L,W),a.push(L,Y,W)}}}this.setIndex(a),this.setAttribute("position",new Ue(o,3)),this.setAttribute("normal",new Ue(l,3)),this.setAttribute("uv",new Ue(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Wr=class s extends et{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],a=[],o=[],l=[],c=new T,h=new oe;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=n+u/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Ue(a,3)),this.setAttribute("normal",new Ue(o,3)),this.setAttribute("uv",new Ue(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Zn=class s extends et{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],d=[],f=[],p=0,x=[],g=n/2,m=0;_(),a===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new Ue(u,3)),this.setAttribute("normal",new Ue(d,3)),this.setAttribute("uv",new Ue(f,2));function _(){let y=new T,w=new T,S=0,R=(t-e)/n;for(let v=0;v<=r;v++){let A=[],P=v/r,I=P*(t-e)+e;for(let L=0;L<=i;L++){let W=L/i,Y=W*l+o,z=Math.sin(Y),X=Math.cos(Y);w.x=I*z,w.y=-P*n+g,w.z=I*X,u.push(w.x,w.y,w.z),y.set(z,R,X).normalize(),d.push(y.x,y.y,y.z),f.push(W,1-P),A.push(p++)}x.push(A)}for(let v=0;v<i;v++)for(let A=0;A<r;A++){let P=x[A][v],I=x[A+1][v],L=x[A+1][v+1],W=x[A][v+1];(e>0||A!==0)&&(h.push(P,I,W),S+=3),(t>0||A!==r-1)&&(h.push(I,L,W),S+=3)}c.addGroup(m,S,0),m+=S}function b(y){let w=p,S=new oe,R=new T,v=0,A=y===!0?e:t,P=y===!0?1:-1;for(let L=1;L<=i;L++)u.push(0,g*P,0),d.push(0,P,0),f.push(.5,.5),p++;let I=p;for(let L=0;L<=i;L++){let Y=L/i*l+o,z=Math.cos(Y),X=Math.sin(Y);R.x=A*X,R.y=g*P,R.z=A*z,u.push(R.x,R.y,R.z),d.push(0,P,0),S.x=z*.5+.5,S.y=X*.5*P+.5,f.push(S.x,S.y),p++}for(let L=0;L<i;L++){let W=w+L,Y=I+L;y===!0?h.push(Y,Y+1,W):h.push(Y+1,Y,W),v+=3}c.addGroup(m,v,y===!0?1:2),m+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},gi=class s extends Zn{constructor(e=1,t=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Xr=class s extends et{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new Ue(r,3)),this.setAttribute("normal",new Ue(r.slice(),3)),this.setAttribute("uv",new Ue(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(_){let b=new T,y=new T,w=new T;for(let S=0;S<t.length;S+=3)f(t[S+0],b),f(t[S+1],y),f(t[S+2],w),l(b,y,w,_)}function l(_,b,y,w){let S=w+1,R=[];for(let v=0;v<=S;v++){R[v]=[];let A=_.clone().lerp(y,v/S),P=b.clone().lerp(y,v/S),I=S-v;for(let L=0;L<=I;L++)L===0&&v===S?R[v][L]=A:R[v][L]=A.clone().lerp(P,L/I)}for(let v=0;v<S;v++)for(let A=0;A<2*(S-v)-1;A++){let P=Math.floor(A/2);A%2===0?(d(R[v][P+1]),d(R[v+1][P]),d(R[v][P])):(d(R[v][P+1]),d(R[v+1][P+1]),d(R[v+1][P]))}}function c(_){let b=new T;for(let y=0;y<r.length;y+=3)b.x=r[y+0],b.y=r[y+1],b.z=r[y+2],b.normalize().multiplyScalar(_),r[y+0]=b.x,r[y+1]=b.y,r[y+2]=b.z}function h(){let _=new T;for(let b=0;b<r.length;b+=3){_.x=r[b+0],_.y=r[b+1],_.z=r[b+2];let y=g(_)/2/Math.PI+.5,w=m(_)/Math.PI+.5;a.push(y,1-w)}p(),u()}function u(){for(let _=0;_<a.length;_+=6){let b=a[_+0],y=a[_+2],w=a[_+4],S=Math.max(b,y,w),R=Math.min(b,y,w);S>.9&&R<.1&&(b<.2&&(a[_+0]+=1),y<.2&&(a[_+2]+=1),w<.2&&(a[_+4]+=1))}}function d(_){r.push(_.x,_.y,_.z)}function f(_,b){let y=_*3;b.x=e[y+0],b.y=e[y+1],b.z=e[y+2]}function p(){let _=new T,b=new T,y=new T,w=new T,S=new oe,R=new oe,v=new oe;for(let A=0,P=0;A<r.length;A+=9,P+=6){_.set(r[A+0],r[A+1],r[A+2]),b.set(r[A+3],r[A+4],r[A+5]),y.set(r[A+6],r[A+7],r[A+8]),S.set(a[P+0],a[P+1]),R.set(a[P+2],a[P+3]),v.set(a[P+4],a[P+5]),w.copy(_).add(b).add(y).divideScalar(3);let I=g(w);x(S,P+0,_,I),x(R,P+2,b,I),x(v,P+4,y,I)}}function x(_,b,y,w){w<0&&_.x===1&&(a[b]=_.x-1),y.x===0&&y.z===0&&(a[b]=w/2/Math.PI+.5)}function g(_){return Math.atan2(_.z,-_.x)}function m(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.vertices,e.indices,e.radius,e.detail)}},qr=class s extends Xr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},eo=new T,to=new T,Rl=new T,no=new ui,tr=class extends et{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),r=Math.cos(Hs*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let p=0;p<l;p+=3){a?(c[0]=a.getX(p),c[1]=a.getX(p+1),c[2]=a.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);let{a:x,b:g,c:m}=no;if(x.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),m.fromBufferAttribute(o,c[2]),no.getNormal(Rl),u[0]=`${Math.round(x.x*i)},${Math.round(x.y*i)},${Math.round(x.z*i)}`,u[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let _=0;_<3;_++){let b=(_+1)%3,y=u[_],w=u[b],S=no[h[_]],R=no[h[b]],v=`${y}_${w}`,A=`${w}_${y}`;A in d&&d[A]?(Rl.dot(d[A].normal)<=r&&(f.push(S.x,S.y,S.z),f.push(R.x,R.y,R.z)),d[A]=null):v in d||(d[v]={index0:c[_],index1:c[b],normal:Rl.clone()})}}for(let p in d)if(d[p]){let{index0:x,index1:g}=d[p];eo.fromBufferAttribute(o,x),to.fromBufferAttribute(o,g),f.push(eo.x,eo.y,eo.z),f.push(to.x,to.y,to.z)}this.setAttribute("position",new Ue(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},tn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ee("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);let h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),o=this.getPoint(r),l=t||(a.isVector2?new oe:new T);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new T,i=[],r=[],a=[],o=new T,l=new Be;for(let f=0;f<=e;f++){let p=f/e;i[f]=this.getTangentAt(p,new T)}r[0]=new T,a[0]=new T;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(We(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,p))}a[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(We(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let p=1;p<=e;p++)r[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),a[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Yr=class extends tn{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new oe){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Eo=class extends Yr{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function gh(){let s=0,e=0,t=0,n=0;function i(r,a,o,l){s=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(r){let a=r*r,o=a*r;return s+e*r+t*a+n*o}}}var hd=new T,ud=new T,Cl=new gh,Pl=new gh,Il=new gh,xn=class extends tn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new T){let n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(ud.subVectors(i[0],i[1]).add(i[0]),c=ud);let u=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(hd.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=hd),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),p<1e-4&&(p=x),g<1e-4&&(g=x),Cl.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,p,x,g),Pl.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,p,x,g),Il.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,p,x,g)}else this.curveType==="catmullrom"&&(Cl.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Pl.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Il.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Cl.calc(l),Pl.calc(l),Il.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new T().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function dd(s,e,t,n,i){let r=(n-e)*.5,a=(i-t)*.5,o=s*s,l=s*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*s+t}function Vm(s,e){let t=1-s;return t*t*e}function Gm(s,e){return 2*(1-s)*s*e}function Wm(s,e){return s*s*e}function Pr(s,e,t,n){return Vm(s,e)+Gm(s,t)+Wm(s,n)}function Xm(s,e){let t=1-s;return t*t*t*e}function qm(s,e){let t=1-s;return 3*t*t*s*e}function Ym(s,e){return 3*(1-s)*s*s*e}function Zm(s,e){return s*s*s*e}function Ir(s,e,t,n,i){return Xm(s,e)+qm(s,t)+Ym(s,n)+Zm(s,i)}var To=class extends tn{constructor(e=new oe,t=new oe,n=new oe,i=new oe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new oe){let n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ir(e,i.x,r.x,a.x,o.x),Ir(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Fn=class extends tn{constructor(e=new T,t=new T,n=new T,i=new T){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new T){let n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ir(e,i.x,r.x,a.x,o.x),Ir(e,i.y,r.y,a.y,o.y),Ir(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},wo=class extends tn{constructor(e=new oe,t=new oe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new oe){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new oe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Xt=class extends tn{constructor(e=new T,t=new T){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new T){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new T){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ao=class extends tn{constructor(e=new oe,t=new oe,n=new oe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new oe){let n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(Pr(e,i.x,r.x,a.x),Pr(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ds=class extends tn{constructor(e=new T,t=new T,n=new T){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new T){let n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(Pr(e,i.x,r.x,a.x),Pr(e,i.y,r.y,a.y),Pr(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ro=class extends tn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new oe){let n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(dd(o,l.x,c.x,h.x,u.x),dd(o,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new oe().fromArray(i))}return this}},Hl=Object.freeze({__proto__:null,ArcCurve:Eo,CatmullRomCurve3:xn,CubicBezierCurve:To,CubicBezierCurve3:Fn,EllipseCurve:Yr,LineCurve:wo,LineCurve3:Xt,QuadraticBezierCurve:Ao,QuadraticBezierCurve3:ds,SplineCurve:Ro}),xi=class extends tn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Hl[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let a=r[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new Hl[i.type]().fromJSON(i))}return this}};var zi=class s extends Xr{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},fs=class s extends et{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=e/o,d=t/l,f=[],p=[],x=[],g=[];for(let m=0;m<h;m++){let _=m*d-a;for(let b=0;b<c;b++){let y=b*u-r;p.push(y,-_,0),x.push(0,0,1),g.push(b/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let _=0;_<o;_++){let b=_+c*m,y=_+c*(m+1),w=_+1+c*(m+1),S=_+1+c*m;f.push(b,y,S),f.push(y,w,S)}this.setIndex(f),this.setAttribute("position",new Ue(p,3)),this.setAttribute("normal",new Ue(x,3)),this.setAttribute("uv",new Ue(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},nr=class s extends et{constructor(e=.5,t=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);let o=[],l=[],c=[],h=[],u=e,d=(t-e)/i,f=new T,p=new oe;for(let x=0;x<=i;x++){for(let g=0;g<=n;g++){let m=r+g/n*a;f.x=u*Math.cos(m),f.y=u*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,h.push(p.x,p.y)}u+=d}for(let x=0;x<i;x++){let g=x*(n+1);for(let m=0;m<n;m++){let _=m+g,b=_,y=_+n+1,w=_+n+2,S=_+1;o.push(b,y,S),o.push(y,w,S)}}this.setIndex(o),this.setAttribute("position",new Ue(l,3)),this.setAttribute("normal",new Ue(c,3)),this.setAttribute("uv",new Ue(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var On=class s extends et{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new T,d=new T,f=[],p=[],x=[],g=[];for(let m=0;m<=n;m++){let _=[],b=m/n,y=a+b*o,w=e*Math.cos(y),S=Math.sqrt(e*e-w*w),R=0;m===0&&a===0?R=.5/t:m===n&&l===Math.PI&&(R=-.5/t);for(let v=0;v<=t;v++){let A=v/t,P=i+A*r;u.x=-S*Math.cos(P),u.y=w,u.z=S*Math.sin(P),p.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),g.push(A+R,1-b),_.push(c++)}h.push(_)}for(let m=0;m<n;m++)for(let _=0;_<t;_++){let b=h[m][_+1],y=h[m][_],w=h[m+1][_],S=h[m+1][_+1];(m!==0||a>0)&&f.push(b,y,S),(m!==n-1||l<Math.PI)&&f.push(y,w,S)}this.setIndex(f),this.setAttribute("position",new Ue(p,3)),this.setAttribute("normal",new Ue(x,3)),this.setAttribute("uv",new Ue(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var ps=class s extends et{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);let l=[],c=[],h=[],u=[],d=new T,f=new T,p=new T;for(let x=0;x<=n;x++){let g=a+x/n*o;for(let m=0;m<=i;m++){let _=m/i*r;f.x=(e+t*Math.cos(g))*Math.cos(_),f.y=(e+t*Math.cos(g))*Math.sin(_),f.z=t*Math.sin(g),c.push(f.x,f.y,f.z),d.x=e*Math.cos(_),d.y=e*Math.sin(_),p.subVectors(f,d).normalize(),h.push(p.x,p.y,p.z),u.push(m/i),u.push(x/n)}}for(let x=1;x<=n;x++)for(let g=1;g<=i;g++){let m=(i+1)*x+g-1,_=(i+1)*(x-1)+g-1,b=(i+1)*(x-1)+g,y=(i+1)*x+g;l.push(m,_,y),l.push(_,b,y)}this.setIndex(l),this.setAttribute("position",new Ue(c,3)),this.setAttribute("normal",new Ue(h,3)),this.setAttribute("uv",new Ue(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Zr=class s extends et{constructor(e=new ds(new T(-1,-1,0),new T(-1,1,0),new T(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new T,l=new T,c=new oe,h=new T,u=[],d=[],f=[],p=[];x(),this.setIndex(p),this.setAttribute("position",new Ue(u,3)),this.setAttribute("normal",new Ue(d,3)),this.setAttribute("uv",new Ue(f,2));function x(){for(let b=0;b<t;b++)g(b);g(r===!1?t:0),_(),m()}function g(b){h=e.getPointAt(b/t,h);let y=a.normals[b],w=a.binormals[b];for(let S=0;S<=i;S++){let R=S/i*Math.PI*2,v=Math.sin(R),A=-Math.cos(R);l.x=A*y.x+v*w.x,l.y=A*y.y+v*w.y,l.z=A*y.z+v*w.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}function m(){for(let b=1;b<=t;b++)for(let y=1;y<=i;y++){let w=(i+1)*(b-1)+(y-1),S=(i+1)*b+(y-1),R=(i+1)*b+y,v=(i+1)*(b-1)+y;p.push(w,S,v),p.push(S,R,v)}}function _(){for(let b=0;b<=t;b++)for(let y=0;y<=i;y++)c.x=b/t,c.y=y/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new s(new Hl[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function ys(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];if(fd(i))i.isRenderTargetTexture?(Ee("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(fd(i[0])){let r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();e[t][n]=r}else e[t][n]=i.slice();else e[t][n]=i}}return e}function Jt(s){let e={};for(let t=0;t<s.length;t++){let n=ys(s[t]);for(let i in n)e[i]=n[i]}return e}function fd(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Km(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function xh(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}var of={clone:ys,merge:Jt},$m=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,jm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,nn=class extends an{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$m,this.fragmentShader=jm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ys(e.uniforms),this.uniformsGroups=Km(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new we().setHex(i.value);break;case"v2":this.uniforms[n].value=new oe().fromArray(i.value);break;case"v3":this.uniforms[n].value=new T().fromArray(i.value);break;case"v4":this.uniforms[n].value=new ct().fromArray(i.value);break;case"m3":this.uniforms[n].value=new He().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Be().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Co=class extends nn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},tt=class extends an{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new we(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wc,this.normalScale=new oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},on=class extends tt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new oe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return We(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new we(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new we(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new we(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Po=class extends an{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Yd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Io=class extends an{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var ir=class extends gn{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function io(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Jm(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function pd(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let l=0;l!==e;++l)i[a++]=s[o+l]}return i}function Qm(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}var Kn=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Lo=class extends Kn{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Fl,endingEnd:Fl}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,a=e+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ol:r=e,o=2*t-n;break;case Bl:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ol:a=e,l=2*n-t;break;case Bl:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),x=p*p,g=x*p,m=-d*g+2*d*x-d*p,_=(1+d)*g+(-1.5-2*d)*x+(-.5+d)*p+1,b=(-1-f)*g+(1.5+f)*x+.5*p,y=f*g-f*x;for(let w=0;w!==o;++w)r[w]=m*a[h+w]+_*a[c+w]+b*a[l+w]+y*a[u+w];return r}},Do=class extends Kn{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}},No=class extends Kn{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Uo=class extends Kn{interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,u=this.outTangents;if(!h||!u){let p=(n-t)/(i-t),x=1-p;for(let g=0;g!==o;++g)r[g]=a[c+g]*x+a[l+g]*p;return r}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let x=a[c+p],g=a[l+p],m=f*d+p*2,_=u[m],b=u[m+1],y=e*d+p*2,w=h[y],S=h[y+1],R=(n-t)/(i-t),v,A,P,I,L;for(let W=0;W<8;W++){v=R*R,A=v*R,P=1-R,I=P*P,L=I*P;let z=L*t+3*I*R*_+3*P*v*w+A*i-n;if(Math.abs(z)<1e-10)break;let X=3*I*(_-t)+6*P*R*(w-_)+3*v*(i-w);if(Math.abs(X)<1e-10)break;R=R-z/X,R=Math.max(0,Math.min(1,R))}r[p]=L*x+3*I*R*b+3*P*v*S+A*g}return r}},cn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=io(t,this.TimeBufferType),this.values=io(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:io(e.times,Array),values:io(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new No(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Do(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Lo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Uo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case os:t=this.InterpolantFactoryMethodDiscrete;break;case cs:t=this.InterpolantFactoryMethodLinear;break;case ao:t=this.InterpolantFactoryMethodSmooth;break;case Ul:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ee("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return os;case this.InterpolantFactoryMethodLinear:return cs;case this.InterpolantFactoryMethodSmooth:return ao;case this.InterpolantFactoryMethodBezier:return Ul}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Oe("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(Oe("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Oe("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Oe("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&sm(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){Oe("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ao,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(i)l=!0;else{let u=o*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){let x=t[u+p];if(x!==t[d+p]||x!==t[f+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};cn.prototype.ValueTypeName="";cn.prototype.TimeBufferType=Float32Array;cn.prototype.ValueBufferType=Float32Array;cn.prototype.DefaultInterpolation=cs;var _i=class extends cn{constructor(e,t,n){super(e,t,n)}};_i.prototype.ValueTypeName="bool";_i.prototype.ValueBufferType=Array;_i.prototype.DefaultInterpolation=os;_i.prototype.InterpolantFactoryMethodLinear=void 0;_i.prototype.InterpolantFactoryMethodSmooth=void 0;var Kr=class extends cn{constructor(e,t,n,i){super(e,t,n,i)}};Kr.prototype.ValueTypeName="color";var yi=class extends cn{constructor(e,t,n,i){super(e,t,n,i)}};yi.prototype.ValueTypeName="number";var Fo=class extends Kn{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t),c=e*o;for(let h=c+o;c!==h;c+=4)$t.slerpFlat(r,0,a,c-o,a,c,l);return r}},vi=class extends cn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Fo(this.times,this.values,this.getValueSize(),e)}};vi.prototype.ValueTypeName="quaternion";vi.prototype.InterpolantFactoryMethodSmooth=void 0;var Mi=class extends cn{constructor(e,t,n){super(e,t,n)}};Mi.prototype.ValueTypeName="string";Mi.prototype.ValueBufferType=Array;Mi.prototype.DefaultInterpolation=os;Mi.prototype.InterpolantFactoryMethodLinear=void 0;Mi.prototype.InterpolantFactoryMethodSmooth=void 0;var ki=class extends cn{constructor(e,t,n,i){super(e,t,n,i)}};ki.prototype.ValueTypeName="vector";var $r=class{constructor(e="",t=-1,n=[],i=qd){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Dn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(tg(n[a]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(cn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let h=Jm(l);l=pd(l,1,h),c=pd(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new yi(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],h=c.name.match(r);if(h&&h.length>1){let u=h[1],d=i[u];d||(i[u]=d=[]),d.push(c)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function eg(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return yi;case"vector":case"vector2":case"vector3":case"vector4":return ki;case"color":return Kr;case"quaternion":return vi;case"bool":case"boolean":return _i;case"string":return Mi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function tg(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=eg(s.type);if(s.times===void 0){let t=[],n=[];Qm(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}var Tn={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(md(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!md(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function md(s){try{let e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var sr=class{constructor(e,t,n){let i=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],p=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},cf=new sr,$n=class{constructor(e){this.manager=e!==void 0?e:cf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};$n.DEFAULT_MATERIAL_NAME="__DEFAULT";var hi={},Vl=class extends Error{constructor(e,t){super(e),this.response=t}},rr=class extends $n{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Tn.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(hi[e]!==void 0){hi[e].push({onLoad:t,onProgress:n,onError:i});return}hi[e]=[],hi[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Ee("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=hi[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0,x=0,g=new ReadableStream({start(m){_();function _(){u.read().then(({done:b,value:y})=>{if(b)m.close();else{x+=y.byteLength;let w=new ProgressEvent("progress",{lengthComputable:p,loaded:x,total:f});for(let S=0,R=h.length;S<R;S++){let v=h[S];v.onProgress&&v.onProgress(w)}m.enqueue(y),_()}},b=>{m.error(b)})}}});return new Response(g)}else throw new Vl(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{Tn.add(`file:${e}`,c);let h=hi[e];delete hi[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=hi[e];if(h===void 0)throw this.manager.itemError(e),c;delete hi[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Bs=new WeakMap,Oo=class extends $n{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Tn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=Bs.get(a);u===void 0&&(u=[],Bs.set(a,u)),u.push({onLoad:t,onError:i})}return a}let o=Xs("img");function l(){h(),t&&t(this);let u=Bs.get(this)||[];for(let d=0;d<u.length;d++){let f=u[d];f.onLoad&&f.onLoad(this)}Bs.delete(this),r.manager.itemEnd(e)}function c(u){h(),i&&i(u),Tn.remove(`image:${e}`);let d=Bs.get(this)||[];for(let f=0;f<d.length;f++){let p=d[f];p.onError&&p.onError(u)}Bs.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Tn.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}};var jr=class extends $n{constructor(e){super(e)}load(e,t,n,i){let r=new Nt,a=new Oo(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},ms=class extends je{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new we(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Jr=class extends ms{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(je.DEFAULT_UP),this.updateMatrix(),this.groundColor=new we(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Ll=new Be,gd=new T,xd=new T,Qr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new oe(512,512),this.mapType=ln,this.map=null,this.mapPass=null,this.matrix=new Be,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Bi,this._frameExtents=new oe(1,1),this._viewportCount=1,this._viewports=[new ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;gd.setFromMatrixPosition(e.matrixWorld),t.position.copy(gd),xd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xd),t.updateMatrixWorld(),Ll.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ll,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Ws||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ll)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},so=new T,ro=new $t,Wn=new T,ea=class extends je{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Be,this.projectionMatrix=new Be,this.projectionMatrixInverse=new Be,this.coordinateSystem=Ln,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(so,ro,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(so,ro,Wn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(so,ro,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(so,ro,Wn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ni=new T,_d=new oe,yd=new oe,Ht=class extends ea{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ls*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Hs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ls*2*Math.atan(Math.tan(Hs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ni.x,Ni.y).multiplyScalar(-e/Ni.z),Ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ni.x,Ni.y).multiplyScalar(-e/Ni.z)}getViewSize(e,t){return this.getViewBounds(e,_d,yd),t.subVectors(yd,_d)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Hs*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Gl=class extends Qr{constructor(){super(new Ht(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=ls*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},ta=class extends ms{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(je.DEFAULT_UP),this.updateMatrix(),this.target=new je,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Gl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Wl=class extends Qr{constructor(){super(new Ht(90,1,.5,500)),this.isPointLightShadow=!0}},na=class extends ms{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Wl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},jn=class extends ea{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Xl=class extends Qr{constructor(){super(new jn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Hi=class extends ms{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(je.DEFAULT_UP),this.updateMatrix(),this.target=new je,this.shadow=new Xl}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var bi=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Dl=new WeakMap,ia=class extends $n{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ee("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ee("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Tn.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{Dl.has(a)===!0?(i&&i(Dl.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){Tn.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e)}).catch(function(c){i&&i(c),Dl.set(l,c),Tn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Tn.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var zs=-90,ks=1,Bo=class extends je{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Ht(zs,ks,e,t);i.layers=this.layers,this.add(i);let r=new Ht(zs,ks,e,t);r.layers=this.layers,this.add(r);let a=new Ht(zs,ks,e,t);a.layers=this.layers,this.add(a);let o=new Ht(zs,ks,e,t);o.layers=this.layers,this.add(o);let l=new Ht(zs,ks,e,t);l.layers=this.layers,this.add(l);let c=new Ht(zs,ks,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Ln)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ws)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},zo=class extends Ht{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var _h="\\[\\]\\.:\\/",ng=new RegExp("["+_h+"]","g"),yh="[^"+_h+"]",ig="[^"+_h.replace("\\.","")+"]",sg=/((?:WC+[\/:])*)/.source.replace("WC",yh),rg=/(WCOD+)?/.source.replace("WCOD",ig),ag=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",yh),og=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",yh),cg=new RegExp("^"+sg+rg+ag+og+"$"),lg=["material","materials","bones","map"],ql=class{constructor(e,t,n){let i=n||ft.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ft=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(ng,"")}static parseTrackName(e){let t=cg.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);lg.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ee("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Oe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Oe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Oe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Oe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Oe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Oe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Oe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[i];if(a===void 0){let c=t.nodeName;Oe("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Oe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Oe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ft.Composite=ql;ft.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ft.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ft.prototype.GetterByBindingType=[ft.prototype._getValue_direct,ft.prototype._getValue_array,ft.prototype._getValue_arrayElement,ft.prototype._getValue_toArray];ft.prototype.SetterByBindingTypeAndVersioning=[[ft.prototype._setValue_direct,ft.prototype._setValue_direct_setNeedsUpdate,ft.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_array,ft.prototype._setValue_array_setNeedsUpdate,ft.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_arrayElement,ft.prototype._setValue_arrayElement_setNeedsUpdate,ft.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_fromArray,ft.prototype._setValue_fromArray_setNeedsUpdate,ft.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var zv=new Float32Array(1);var vd=new Be,sa=class{constructor(e,t,n=0,i=1/0){this.ray=new qn(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Zs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Oe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return vd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(vd),this}intersectObject(e,t=!0,n=[]){return Yl(e,this,n,t),n.sort(Md),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)Yl(e[i],this,n,t);return n.sort(Md),n}};function Md(s,e){return s.distance-e.distance}function Yl(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let a=0,o=r.length;a<o;a++)Yl(r[a],e,t,!0)}}var ar=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=We(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(We(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Zl=class s{static{s.prototype.isMatrix2=!0}constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}};var ra=class extends Un{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Ee("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function vh(s,e,t,n){let i=hg(n);switch(t){case uh:return s*e;case qo:return s*e/i.components*i.byteLength;case Yo:return s*e/i.components*i.byteLength;case qi:return s*e*2/i.components*i.byteLength;case Zo:return s*e*2/i.components*i.byteLength;case dh:return s*e*3/i.components*i.byteLength;case yn:return s*e*4/i.components*i.byteLength;case Ko:return s*e*4/i.components*i.byteLength;case ca:case la:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case ha:case ua:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case jo:case Qo:return Math.max(s,16)*Math.max(e,8)/4;case $o:case Jo:return Math.max(s,8)*Math.max(e,8)/2;case ec:case tc:case ic:case sc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case nc:case da:case rc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ac:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case oc:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case cc:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case lc:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case hc:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case uc:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case dc:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case fc:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case pc:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case mc:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case gc:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case xc:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case _c:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case yc:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case vc:case Mc:case bc:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Sc:case Ec:return Math.ceil(s/4)*Math.ceil(e/4)*8;case fa:case Tc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function hg(s){switch(s){case ln:case oh:return{byteLength:1,components:1};case lr:case ch:case Qn:return{byteLength:2,components:1};case Wo:case Xo:return{byteLength:2,components:4};case kn:case Go:case _n:return{byteLength:4,components:1};case lh:case hh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window<"u"&&(window.__THREE__?Ee("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function If(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&s!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function dg(s){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){let h=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){let p=u[d],x=u[f];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){let x=u[f];s.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(s.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var fg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pg=`#ifdef USE_ALPHAHASH
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
#endif`,mg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,_g=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yg=`#ifdef USE_AOMAP
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
#endif`,vg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Mg=`#ifdef USE_BATCHING
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
#endif`,bg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Sg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Eg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Tg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,wg=`#ifdef USE_IRIDESCENCE
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
#endif`,Ag=`#ifdef USE_BUMPMAP
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
#endif`,Rg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Cg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ig=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Lg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Dg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Ng=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ug=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Fg=`#define PI 3.141592653589793
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
} // validated`,Og=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Bg=`vec3 transformedNormal = objectNormal;
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
#endif`,zg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Vg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xg=`#ifdef USE_ENVMAP
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
#endif`,qg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Yg=`#ifdef USE_ENVMAP
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
#endif`,Zg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Kg=`#ifdef USE_ENVMAP
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
#endif`,$g=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,jg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Jg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,e0=`#ifdef USE_GRADIENTMAP
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
}`,t0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,n0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,i0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,s0=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,r0=`#ifdef USE_ENVMAP
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
#endif`,a0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,o0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,c0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,l0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,h0=`PhysicalMaterial material;
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
#endif`,u0=`uniform sampler2D dfgLUT;
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
}`,d0=`
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
#endif`,f0=`#if defined( RE_IndirectDiffuse )
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
#endif`,p0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,m0=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,g0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,x0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,y0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,v0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,M0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,b0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,S0=`#if defined( USE_POINTS_UV )
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
#endif`,E0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,T0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,w0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,A0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,R0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,C0=`#ifdef USE_MORPHTARGETS
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
#endif`,P0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,I0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,L0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,D0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,N0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,U0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,F0=`#ifdef USE_NORMALMAP
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
#endif`,O0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,B0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,z0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,k0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,H0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,V0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,G0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,W0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,X0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,q0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Y0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Z0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,K0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,j0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,J0=`float getShadowMask() {
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
}`,Q0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ex=`#ifdef USE_SKINNING
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
#endif`,tx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,nx=`#ifdef USE_SKINNING
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
#endif`,ix=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ax=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ox=`#ifdef USE_TRANSMISSION
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
#endif`,cx=`#ifdef USE_TRANSMISSION
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
#endif`,lx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ux=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,fx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,px=`uniform sampler2D t2D;
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
}`,mx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,xx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_x=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yx=`#include <common>
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
}`,vx=`#if DEPTH_PACKING == 3200
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
}`,Mx=`#define DISTANCE
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
}`,bx=`#define DISTANCE
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
}`,Sx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ex=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tx=`uniform float scale;
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
}`,wx=`uniform vec3 diffuse;
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
}`,Ax=`#include <common>
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
}`,Rx=`uniform vec3 diffuse;
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
}`,Cx=`#define LAMBERT
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
}`,Px=`#define LAMBERT
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
}`,Ix=`#define MATCAP
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
}`,Lx=`#define MATCAP
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
}`,Dx=`#define NORMAL
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
}`,Nx=`#define NORMAL
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
}`,Ux=`#define PHONG
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
}`,Fx=`#define PHONG
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
}`,Ox=`#define STANDARD
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
}`,Bx=`#define STANDARD
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
}`,zx=`#define TOON
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
}`,kx=`#define TOON
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
}`,Hx=`uniform float size;
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
}`,Vx=`uniform vec3 diffuse;
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
}`,Gx=`#include <common>
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
}`,Wx=`uniform vec3 color;
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
}`,Xx=`uniform float rotation;
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
}`,qx=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:fg,alphahash_pars_fragment:pg,alphamap_fragment:mg,alphamap_pars_fragment:gg,alphatest_fragment:xg,alphatest_pars_fragment:_g,aomap_fragment:yg,aomap_pars_fragment:vg,batching_pars_vertex:Mg,batching_vertex:bg,begin_vertex:Sg,beginnormal_vertex:Eg,bsdfs:Tg,iridescence_fragment:wg,bumpmap_pars_fragment:Ag,clipping_planes_fragment:Rg,clipping_planes_pars_fragment:Cg,clipping_planes_pars_vertex:Pg,clipping_planes_vertex:Ig,color_fragment:Lg,color_pars_fragment:Dg,color_pars_vertex:Ng,color_vertex:Ug,common:Fg,cube_uv_reflection_fragment:Og,defaultnormal_vertex:Bg,displacementmap_pars_vertex:zg,displacementmap_vertex:kg,emissivemap_fragment:Hg,emissivemap_pars_fragment:Vg,colorspace_fragment:Gg,colorspace_pars_fragment:Wg,envmap_fragment:Xg,envmap_common_pars_fragment:qg,envmap_pars_fragment:Yg,envmap_pars_vertex:Zg,envmap_physical_pars_fragment:r0,envmap_vertex:Kg,fog_vertex:$g,fog_pars_vertex:jg,fog_fragment:Jg,fog_pars_fragment:Qg,gradientmap_pars_fragment:e0,lightmap_pars_fragment:t0,lights_lambert_fragment:n0,lights_lambert_pars_fragment:i0,lights_pars_begin:s0,lights_toon_fragment:a0,lights_toon_pars_fragment:o0,lights_phong_fragment:c0,lights_phong_pars_fragment:l0,lights_physical_fragment:h0,lights_physical_pars_fragment:u0,lights_fragment_begin:d0,lights_fragment_maps:f0,lights_fragment_end:p0,lightprobes_pars_fragment:m0,logdepthbuf_fragment:g0,logdepthbuf_pars_fragment:x0,logdepthbuf_pars_vertex:_0,logdepthbuf_vertex:y0,map_fragment:v0,map_pars_fragment:M0,map_particle_fragment:b0,map_particle_pars_fragment:S0,metalnessmap_fragment:E0,metalnessmap_pars_fragment:T0,morphinstance_vertex:w0,morphcolor_vertex:A0,morphnormal_vertex:R0,morphtarget_pars_vertex:C0,morphtarget_vertex:P0,normal_fragment_begin:I0,normal_fragment_maps:L0,normal_pars_fragment:D0,normal_pars_vertex:N0,normal_vertex:U0,normalmap_pars_fragment:F0,clearcoat_normal_fragment_begin:O0,clearcoat_normal_fragment_maps:B0,clearcoat_pars_fragment:z0,iridescence_pars_fragment:k0,opaque_fragment:H0,packing:V0,premultiplied_alpha_fragment:G0,project_vertex:W0,dithering_fragment:X0,dithering_pars_fragment:q0,roughnessmap_fragment:Y0,roughnessmap_pars_fragment:Z0,shadowmap_pars_fragment:K0,shadowmap_pars_vertex:$0,shadowmap_vertex:j0,shadowmask_pars_fragment:J0,skinbase_vertex:Q0,skinning_pars_vertex:ex,skinning_vertex:tx,skinnormal_vertex:nx,specularmap_fragment:ix,specularmap_pars_fragment:sx,tonemapping_fragment:rx,tonemapping_pars_fragment:ax,transmission_fragment:ox,transmission_pars_fragment:cx,uv_pars_fragment:lx,uv_pars_vertex:hx,uv_vertex:ux,worldpos_vertex:dx,background_vert:fx,background_frag:px,backgroundCube_vert:mx,backgroundCube_frag:gx,cube_vert:xx,cube_frag:_x,depth_vert:yx,depth_frag:vx,distance_vert:Mx,distance_frag:bx,equirect_vert:Sx,equirect_frag:Ex,linedashed_vert:Tx,linedashed_frag:wx,meshbasic_vert:Ax,meshbasic_frag:Rx,meshlambert_vert:Cx,meshlambert_frag:Px,meshmatcap_vert:Ix,meshmatcap_frag:Lx,meshnormal_vert:Dx,meshnormal_frag:Nx,meshphong_vert:Ux,meshphong_frag:Fx,meshphysical_vert:Ox,meshphysical_frag:Bx,meshtoon_vert:zx,meshtoon_frag:kx,points_vert:Hx,points_frag:Vx,shadow_vert:Gx,shadow_frag:Wx,sprite_vert:Xx,sprite_frag:qx},me={common:{diffuse:{value:new we(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new we(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new T},probesMax:{value:new T},probesResolution:{value:new T}},points:{diffuse:{value:new we(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new we(16777215)},opacity:{value:1},center:{value:new oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},ti={basic:{uniforms:Jt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:Jt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new we(0)},envMapIntensity:{value:1}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:Jt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new we(0)},specular:{value:new we(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:Jt([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new we(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:Jt([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new we(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:Jt([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:Jt([me.points,me.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:Jt([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:Jt([me.common,me.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:Jt([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:Jt([me.sprite,me.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distance:{uniforms:Jt([me.common,me.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distance_vert,fragmentShader:Xe.distance_frag},shadow:{uniforms:Jt([me.lights,me.fog,{color:{value:new we(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};ti.physical={uniforms:Jt([ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new we(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new we(0)},specularColor:{value:new we(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};var Cc={r:0,b:0,g:0},Yx=new Be,Lf=new He;Lf.set(-1,0,0,0,1,0,0,0,1);function Zx(s,e,t,n,i,r){let a=new we(0),o=i===!0?0:1,l,c,h=null,u=0,d=null;function f(_){let b=_.isScene===!0?_.background:null;if(b&&b.isTexture){let y=_.backgroundBlurriness>0;b=e.get(b,y)}return b}function p(_){let b=!1,y=f(_);y===null?g(a,o):y&&y.isColor&&(g(y,1),b=!0);let w=s.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function x(_,b){let y=f(b);y&&(y.isCubeTexture||y.mapping===oa)?(c===void 0&&(c=new be(new _t(1,1,1),new nn({name:"BackgroundCubeMaterial",uniforms:ys(ti.backgroundCube.uniforms),vertexShader:ti.backgroundCube.vertexShader,fragmentShader:ti.backgroundCube.fragmentShader,side:sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,S,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Yx.makeRotationFromEuler(b.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Lf),c.material.toneMapped=Ye.getTransfer(y.colorSpace)!==rt,(h!==y||u!==y.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,h=y,u=y.version,d=s.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new be(new fs(2,2),new nn({name:"BackgroundMaterial",uniforms:ys(ti.background.uniforms),vertexShader:ti.background.vertexShader,fragmentShader:ti.background.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=Ye.getTransfer(y.colorSpace)!==rt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||u!==y.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=y,u=y.version,d=s.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function g(_,b){_.getRGB(Cc,xh(s)),t.buffers.color.setClear(Cc.r,Cc.g,Cc.b,b,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,b=1){a.set(_),o=b,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,g(a,o)},render:p,addToRenderList:x,dispose:m}}function Kx(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,a=!1;function o(I,L,W,Y,z){let X=!1,q=u(I,Y,W,L);r!==q&&(r=q,c(r.object)),X=f(I,Y,W,z),X&&p(I,Y,W,z),z!==null&&e.update(z,s.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,y(I,L,W,Y),z!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return s.createVertexArray()}function c(I){return s.bindVertexArray(I)}function h(I){return s.deleteVertexArray(I)}function u(I,L,W,Y){let z=Y.wireframe===!0,X=n[L.id];X===void 0&&(X={},n[L.id]=X);let q=I.isInstancedMesh===!0?I.id:0,Q=X[q];Q===void 0&&(Q={},X[q]=Q);let ne=Q[W.id];ne===void 0&&(ne={},Q[W.id]=ne);let ce=ne[z];return ce===void 0&&(ce=d(l()),ne[z]=ce),ce}function d(I){let L=[],W=[],Y=[];for(let z=0;z<t;z++)L[z]=0,W[z]=0,Y[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:W,attributeDivisors:Y,object:I,attributes:{},index:null}}function f(I,L,W,Y){let z=r.attributes,X=L.attributes,q=0,Q=W.getAttributes();for(let ne in Q)if(Q[ne].location>=0){let fe=z[ne],ve=X[ne];if(ve===void 0&&(ne==="instanceMatrix"&&I.instanceMatrix&&(ve=I.instanceMatrix),ne==="instanceColor"&&I.instanceColor&&(ve=I.instanceColor)),fe===void 0||fe.attribute!==ve||ve&&fe.data!==ve.data)return!0;q++}return r.attributesNum!==q||r.index!==Y}function p(I,L,W,Y){let z={},X=L.attributes,q=0,Q=W.getAttributes();for(let ne in Q)if(Q[ne].location>=0){let fe=X[ne];fe===void 0&&(ne==="instanceMatrix"&&I.instanceMatrix&&(fe=I.instanceMatrix),ne==="instanceColor"&&I.instanceColor&&(fe=I.instanceColor));let ve={};ve.attribute=fe,fe&&fe.data&&(ve.data=fe.data),z[ne]=ve,q++}r.attributes=z,r.attributesNum=q,r.index=Y}function x(){let I=r.newAttributes;for(let L=0,W=I.length;L<W;L++)I[L]=0}function g(I){m(I,0)}function m(I,L){let W=r.newAttributes,Y=r.enabledAttributes,z=r.attributeDivisors;W[I]=1,Y[I]===0&&(s.enableVertexAttribArray(I),Y[I]=1),z[I]!==L&&(s.vertexAttribDivisor(I,L),z[I]=L)}function _(){let I=r.newAttributes,L=r.enabledAttributes;for(let W=0,Y=L.length;W<Y;W++)L[W]!==I[W]&&(s.disableVertexAttribArray(W),L[W]=0)}function b(I,L,W,Y,z,X,q){q===!0?s.vertexAttribIPointer(I,L,W,z,X):s.vertexAttribPointer(I,L,W,Y,z,X)}function y(I,L,W,Y){x();let z=Y.attributes,X=W.getAttributes(),q=L.defaultAttributeValues;for(let Q in X){let ne=X[Q];if(ne.location>=0){let ce=z[Q];if(ce===void 0&&(Q==="instanceMatrix"&&I.instanceMatrix&&(ce=I.instanceMatrix),Q==="instanceColor"&&I.instanceColor&&(ce=I.instanceColor)),ce!==void 0){let fe=ce.normalized,ve=ce.itemSize,nt=e.get(ce);if(nt===void 0)continue;let st=nt.buffer,$e=nt.type,$=nt.bytesPerElement,N=$e===s.INT||$e===s.UNSIGNED_INT||ce.gpuType===Go;if(ce.isInterleavedBufferAttribute){let O=ce.data,te=O.stride,se=ce.offset;if(O.isInstancedInterleavedBuffer){for(let ie=0;ie<ne.locationSize;ie++)m(ne.location+ie,O.meshPerAttribute);I.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=O.meshPerAttribute*O.count)}else for(let ie=0;ie<ne.locationSize;ie++)g(ne.location+ie);s.bindBuffer(s.ARRAY_BUFFER,st);for(let ie=0;ie<ne.locationSize;ie++)b(ne.location+ie,ve/ne.locationSize,$e,fe,te*$,(se+ve/ne.locationSize*ie)*$,N)}else{if(ce.isInstancedBufferAttribute){for(let O=0;O<ne.locationSize;O++)m(ne.location+O,ce.meshPerAttribute);I.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let O=0;O<ne.locationSize;O++)g(ne.location+O);s.bindBuffer(s.ARRAY_BUFFER,st);for(let O=0;O<ne.locationSize;O++)b(ne.location+O,ve/ne.locationSize,$e,fe,ve*$,ve/ne.locationSize*O*$,N)}}else if(q!==void 0){let fe=q[Q];if(fe!==void 0)switch(fe.length){case 2:s.vertexAttrib2fv(ne.location,fe);break;case 3:s.vertexAttrib3fv(ne.location,fe);break;case 4:s.vertexAttrib4fv(ne.location,fe);break;default:s.vertexAttrib1fv(ne.location,fe)}}}}_()}function w(){A();for(let I in n){let L=n[I];for(let W in L){let Y=L[W];for(let z in Y){let X=Y[z];for(let q in X)h(X[q].object),delete X[q];delete Y[z]}}delete n[I]}}function S(I){if(n[I.id]===void 0)return;let L=n[I.id];for(let W in L){let Y=L[W];for(let z in Y){let X=Y[z];for(let q in X)h(X[q].object),delete X[q];delete Y[z]}}delete n[I.id]}function R(I){for(let L in n){let W=n[L];for(let Y in W){let z=W[Y];if(z[I.id]===void 0)continue;let X=z[I.id];for(let q in X)h(X[q].object),delete X[q];delete z[I.id]}}}function v(I){for(let L in n){let W=n[L],Y=I.isInstancedMesh===!0?I.id:0,z=W[Y];if(z!==void 0){for(let X in z){let q=z[X];for(let Q in q)h(q[Q].object),delete q[Q];delete z[X]}delete W[Y],Object.keys(W).length===0&&delete n[L]}}}function A(){P(),a=!0,r!==i&&(r=i,c(r.object))}function P(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:A,resetDefaultState:P,dispose:w,releaseStatesOfGeometry:S,releaseStatesOfObject:v,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:g,disableUnusedAttributes:_}}function $x(s,e,t){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let f=0;f<h;f++)d+=c[f];t.update(d,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function jx(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(R){return!(R!==yn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){let v=R===Qn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==ln&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==_n&&!v)}function l(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(Ee("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ee("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),_=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),b=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),w=s.getParameter(s.MAX_SAMPLES),S=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:_,maxVaryings:b,maxFragmentUniforms:y,maxSamples:w,samples:S}}function Jx(s){let e=this,t=null,n=0,i=!1,r=!1,a=new Sn,o=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let p=u.clippingPlanes,x=u.clipIntersection,g=u.clipShadows,m=s.get(u);if(!i||p===null||p.length===0||r&&!g)r?h(null):c();else{let _=r?0:n,b=_*4,y=m.clippingState||null;l.value=y,y=h(p,d,b,f);for(let w=0;w!==b;++w)y[w]=t[w];m.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,p){let x=u!==null?u.length:0,g=null;if(x!==0){if(g=l.value,p!==!0||g===null){let m=f+x*4,_=d.matrixWorldInverse;o.getNormalMatrix(_),(g===null||g.length<m)&&(g=new Float32Array(m));for(let b=0,y=f;b!==x;++b,y+=4)a.copy(u[b]).applyMatrix4(_,o),a.normal.toArray(g,y),g[y+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}var Yi=4,lf=[.125,.215,.35,.446,.526,.582],vs=20,Qx=256,ma=new jn,hf=new we,Mh=null,bh=0,Sh=0,Eh=!1,e_=new T,Ic=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,r={}){let{size:a=256,position:o=e_}=r;Mh=this._renderer.getRenderTarget(),bh=this._renderer.getActiveCubeFace(),Sh=this._renderer.getActiveMipmapLevel(),Eh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ff(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=df(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Mh,bh,Sh),this._renderer.xr.enabled=Eh,e.scissorTest=!1,dr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Wi||e.mapping===xs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Mh=this._renderer.getRenderTarget(),bh=this._renderer.getActiveCubeFace(),Sh=this._renderer.getActiveMipmapLevel(),Eh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:wt,minFilter:wt,generateMipmaps:!1,type:Qn,format:yn,colorSpace:en,depthBuffer:!1},i=uf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=uf(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=t_(r)),this._blurMaterial=i_(r,e,t),this._ggxMaterial=n_(r,e,t)}return i}_compileMaterial(e){let t=new be(new et,e);this._renderer.compile(t,ma)}_sceneToCubeUV(e,t,n,i,r){let l=new Ht(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(hf),u.toneMapping=Bn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new be(new _t,new gt({name:"PMREM.Background",side:sn,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,g=x.material,m=!1,_=e.background;_?_.isColor&&(g.color.copy(_),e.background=null,m=!0):(g.color.copy(hf),m=!0);for(let b=0;b<6;b++){let y=b%3;y===0?(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[b],r.y,r.z)):y===1?(l.up.set(0,0,c[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[b],r.z)):(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[b]));let w=this._cubeSize;dr(i,y*w,b>2?w:0,w,w),u.setRenderTarget(i),m&&u.render(x,l),u.render(e,l)}u.toneMapping=f,u.autoClear=d,e.background=_}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Wi||e.mapping===xs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=ff()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=df());let r=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;dr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,ma)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let i=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=0+c*1.25,f=u*d,{_lodMax:p}=this,x=this._sizeLods[n],g=3*x*(n>p-Yi?n-p+Yi:0),m=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,dr(r,g,m,3*x,2*x),i.setRenderTarget(r),i.render(o,ma),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-n,dr(e,g,m,3*x,2*x),i.setRenderTarget(e),i.render(o,ma)}_blur(e,t,n,i,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Oe("blur direction must be either latitudinal or longitudinal!");let h=3,u=this._lodMeshes[i];u.material=c;let d=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*vs-1),x=r/p,g=isFinite(r)?1+Math.floor(h*x):vs;g>vs&&Ee(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${vs}`);let m=[],_=0;for(let R=0;R<vs;++R){let v=R/x,A=Math.exp(-v*v/2);m.push(A),R===0?_+=A:R<g&&(_+=2*A)}for(let R=0;R<m.length;R++)m[R]=m[R]/_;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=m,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:b}=this;d.dTheta.value=p,d.mipInt.value=b-n;let y=this._sizeLods[i],w=3*y*(i>b-Yi?i-b+Yi:0),S=4*(this._cubeSize-y);dr(t,w,S,3*y,2*y),l.setRenderTarget(t),l.render(u,ma)}};function t_(s){let e=[],t=[],n=[],i=s,r=s-Yi+1+lf.length;for(let a=0;a<r;a++){let o=Math.pow(2,i);e.push(o);let l=1/o;a>s-Yi?l=lf[a-s+Yi-1]:a===0&&(l=0),t.push(l);let c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,p=6,x=3,g=2,m=1,_=new Float32Array(x*p*f),b=new Float32Array(g*p*f),y=new Float32Array(m*p*f);for(let S=0;S<f;S++){let R=S%3*2/3-1,v=S>2?0:-1,A=[R,v,0,R+2/3,v,0,R+2/3,v+1,0,R,v,0,R+2/3,v+1,0,R,v+1,0];_.set(A,x*p*S),b.set(d,g*p*S);let P=[S,S,S,S,S,S];y.set(P,m*p*S)}let w=new et;w.setAttribute("position",new Et(_,x)),w.setAttribute("uv",new Et(b,g)),w.setAttribute("faceIndex",new Et(y,m)),n.push(new be(w,null)),i>Yi&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function uf(s,e,t){let n=new mn(s,e,t);return n.texture.mapping=oa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function dr(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function n_(s,e,t){return new nn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Qx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Nc(),fragmentShader:`

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
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function i_(s,e,t){let n=new Float32Array(vs),i=new T(0,1,0);return new nn({name:"SphericalGaussianBlur",defines:{n:vs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Nc(),fragmentShader:`

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
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function df(){return new nn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Nc(),fragmentShader:`

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
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function ff(){return new nn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Nc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function Nc(){return`

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
	`}var Lc=class extends mn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Hr(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new _t(5,5,5),r=new nn({name:"CubemapFromEquirect",uniforms:ys(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:sn,blending:Jn});r.uniforms.tEquirect.value=t;let a=new be(i,r),o=t.minFilter;return t.minFilter===zn&&(t.minFilter=wt),new Bo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}};function s_(s){let e=new WeakMap,t=new WeakMap,n=null;function i(d,f=!1){return d==null?null:f?a(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===ko||f===Ho)if(e.has(d)){let p=e.get(d).texture;return o(p,d.mapping)}else{let p=d.image;if(p&&p.height>0){let x=new Lc(p.height);return x.fromEquirectangularTexture(s,d),e.set(d,x),d.addEventListener("dispose",c),o(x.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){let f=d.mapping,p=f===ko||f===Ho,x=f===Wi||f===xs;if(p||x){let g=t.get(d),m=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return n===null&&(n=new Ic(s)),g=p?n.fromEquirectangular(d,g):n.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{let _=d.image;return p&&_&&_.height>0||x&&_&&l(_)?(n===null&&(n=new Ic(s)),g=p?n.fromEquirectangular(d):n.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",h),g.texture):null}}}return d}function o(d,f){return f===ko?d.mapping=Wi:f===Ho&&(d.mapping=xs),d}function l(d){let f=0,p=6;for(let x=0;x<p;x++)d[x]!==void 0&&f++;return f===p}function c(d){let f=d.target;f.removeEventListener("dispose",c);let p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:u}}function r_(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i=s.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&ss("WebGLRenderer: "+n+" extension not supported."),i}}}function a_(s,e,t,n){let i={},r=new WeakMap;function a(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let p in d.attributes)e.remove(d.attributes[p]);d.removeEventListener("dispose",a),delete i[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function l(u){let d=u.attributes;for(let f in d)e.update(d[f],s.ARRAY_BUFFER)}function c(u){let d=[],f=u.index,p=u.attributes.position,x=0;if(p===void 0)return;if(f!==null){let _=f.array;x=f.version;for(let b=0,y=_.length;b<y;b+=3){let w=_[b+0],S=_[b+1],R=_[b+2];d.push(w,S,S,R,R,w)}}else{let _=p.array;x=p.version;for(let b=0,y=_.length/3-1;b<y;b+=3){let w=b+0,S=b+1,R=b+2;d.push(w,S,S,R,R,w)}}let g=new(p.count>=65535?Or:Fr)(d,1);g.version=x;let m=r.get(u);m&&e.remove(m),r.set(u,g)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function o_(s,e,t){let n;function i(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,d){s.drawElements(n,d,r,u*a),t.update(d,n,1)}function c(u,d,f){f!==0&&(s.drawElementsInstanced(n,d,r,u*a,f),t.update(d,n,f))}function h(u,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,f);let x=0;for(let g=0;g<f;g++)x+=d[g];t.update(x,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function c_(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:Oe("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function l_(s,e,t){let n=new WeakMap,i=new ct;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(o);if(d===void 0||d.count!==u){let A=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",A)};d!==void 0&&d.texture.dispose();let f=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],_=o.morphAttributes.color||[],b=0;f===!0&&(b=1),p===!0&&(b=2),x===!0&&(b=3);let y=o.attributes.position.count*b,w=1;y>e.maxTextureSize&&(w=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let S=new Float32Array(y*w*4*u),R=new Nr(S,y,w,u);R.type=_n,R.needsUpdate=!0;let v=b*4;for(let P=0;P<u;P++){let I=g[P],L=m[P],W=_[P],Y=y*w*4*P;for(let z=0;z<I.count;z++){let X=z*v;f===!0&&(i.fromBufferAttribute(I,z),S[Y+X+0]=i.x,S[Y+X+1]=i.y,S[Y+X+2]=i.z,S[Y+X+3]=0),p===!0&&(i.fromBufferAttribute(L,z),S[Y+X+4]=i.x,S[Y+X+5]=i.y,S[Y+X+6]=i.z,S[Y+X+7]=0),x===!0&&(i.fromBufferAttribute(W,z),S[Y+X+8]=i.x,S[Y+X+9]=i.y,S[Y+X+10]=i.z,S[Y+X+11]=W.itemSize===4?i.w:1)}}d={count:u,texture:R,size:new oe(y,w)},n.set(o,d),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let p=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",p),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function h_(s,e,t,n,i){let r=new WeakMap;function a(c){let h=i.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var u_={[eh]:"LINEAR_TONE_MAPPING",[th]:"REINHARD_TONE_MAPPING",[nh]:"CINEON_TONE_MAPPING",[ih]:"ACES_FILMIC_TONE_MAPPING",[rh]:"AGX_TONE_MAPPING",[aa]:"NEUTRAL_TONE_MAPPING",[sh]:"CUSTOM_TONE_MAPPING"};function d_(s,e,t,n,i,r){let a=new mn(e,t,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,depthTexture:i?new mi(e,t):void 0}),o=new mn(e,t,{type:Qn,depthBuffer:!1,stencilBuffer:!1}),l=new et;l.setAttribute("position",new Ue([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Ue([0,2,0,0,2,0],2));let c=new Co({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new be(l,c),u=new jn(-1,1,1,-1,0,1),d=null,f=null,p=!1,x,g=null,m=[],_=!1;this.setSize=function(b,y){a.setSize(b,y),o.setSize(b,y);for(let w=0;w<m.length;w++){let S=m[w];S.setSize&&S.setSize(b,y)}},this.setEffects=function(b){m=b,_=m.length>0&&m[0].isRenderPass===!0;let y=a.width,w=a.height;for(let S=0;S<m.length;S++){let R=m[S];R.setSize&&R.setSize(y,w)}},this.begin=function(b,y){if(p||b.toneMapping===Bn&&m.length===0)return!1;if(g=y,y!==null){let w=y.width,S=y.height;(a.width!==w||a.height!==S)&&this.setSize(w,S)}return _===!1&&b.setRenderTarget(a),x=b.toneMapping,b.toneMapping=Bn,!0},this.hasRenderPass=function(){return _},this.end=function(b,y){b.toneMapping=x,p=!0;let w=a,S=o;for(let R=0;R<m.length;R++){let v=m[R];if(v.enabled!==!1&&(v.render(b,S,w,y),v.needsSwap!==!1)){let A=w;w=S,S=A}}if(d!==b.outputColorSpace||f!==b.toneMapping){d=b.outputColorSpace,f=b.toneMapping,c.defines={},Ye.getTransfer(d)===rt&&(c.defines.SRGB_TRANSFER="");let R=u_[f];R&&(c.defines[R]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,b.setRenderTarget(g),b.render(h,u),g=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}var Df=new Nt,Ah=new mi(1,1),Nf=new Nr,Uf=new vo,Ff=new Hr,pf=[],mf=[],gf=new Float32Array(16),xf=new Float32Array(9),_f=new Float32Array(4);function pr(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=pf[i];if(r===void 0&&(r=new Float32Array(i),pf[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Ft(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Ot(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Uc(s,e){let t=mf[e];t===void 0&&(t=new Int32Array(e),mf[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function f_(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function p_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;s.uniform2fv(this.addr,e),Ot(t,e)}}function m_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ft(t,e))return;s.uniform3fv(this.addr,e),Ot(t,e)}}function g_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;s.uniform4fv(this.addr,e),Ot(t,e)}}function x_(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,n))return;_f.set(n),s.uniformMatrix2fv(this.addr,!1,_f),Ot(t,n)}}function __(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,n))return;xf.set(n),s.uniformMatrix3fv(this.addr,!1,xf),Ot(t,n)}}function y_(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,n))return;gf.set(n),s.uniformMatrix4fv(this.addr,!1,gf),Ot(t,n)}}function v_(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function M_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;s.uniform2iv(this.addr,e),Ot(t,e)}}function b_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;s.uniform3iv(this.addr,e),Ot(t,e)}}function S_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;s.uniform4iv(this.addr,e),Ot(t,e)}}function E_(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function T_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;s.uniform2uiv(this.addr,e),Ot(t,e)}}function w_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;s.uniform3uiv(this.addr,e),Ot(t,e)}}function A_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;s.uniform4uiv(this.addr,e),Ot(t,e)}}function R_(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Ah.compareFunction=t.isReversedDepthBuffer()?Rc:Ac,r=Ah):r=Df,t.setTexture2D(e||r,i)}function C_(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Uf,i)}function P_(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Ff,i)}function I_(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Nf,i)}function L_(s){switch(s){case 5126:return f_;case 35664:return p_;case 35665:return m_;case 35666:return g_;case 35674:return x_;case 35675:return __;case 35676:return y_;case 5124:case 35670:return v_;case 35667:case 35671:return M_;case 35668:case 35672:return b_;case 35669:case 35673:return S_;case 5125:return E_;case 36294:return T_;case 36295:return w_;case 36296:return A_;case 35678:case 36198:case 36298:case 36306:case 35682:return R_;case 35679:case 36299:case 36307:return C_;case 35680:case 36300:case 36308:case 36293:return P_;case 36289:case 36303:case 36311:case 36292:return I_}}function D_(s,e){s.uniform1fv(this.addr,e)}function N_(s,e){let t=pr(e,this.size,2);s.uniform2fv(this.addr,t)}function U_(s,e){let t=pr(e,this.size,3);s.uniform3fv(this.addr,t)}function F_(s,e){let t=pr(e,this.size,4);s.uniform4fv(this.addr,t)}function O_(s,e){let t=pr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function B_(s,e){let t=pr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function z_(s,e){let t=pr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function k_(s,e){s.uniform1iv(this.addr,e)}function H_(s,e){s.uniform2iv(this.addr,e)}function V_(s,e){s.uniform3iv(this.addr,e)}function G_(s,e){s.uniform4iv(this.addr,e)}function W_(s,e){s.uniform1uiv(this.addr,e)}function X_(s,e){s.uniform2uiv(this.addr,e)}function q_(s,e){s.uniform3uiv(this.addr,e)}function Y_(s,e){s.uniform4uiv(this.addr,e)}function Z_(s,e,t){let n=this.cache,i=e.length,r=Uc(t,i);Ft(n,r)||(s.uniform1iv(this.addr,r),Ot(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Ah:a=Df;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,r[o])}function K_(s,e,t){let n=this.cache,i=e.length,r=Uc(t,i);Ft(n,r)||(s.uniform1iv(this.addr,r),Ot(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Uf,r[a])}function $_(s,e,t){let n=this.cache,i=e.length,r=Uc(t,i);Ft(n,r)||(s.uniform1iv(this.addr,r),Ot(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Ff,r[a])}function j_(s,e,t){let n=this.cache,i=e.length,r=Uc(t,i);Ft(n,r)||(s.uniform1iv(this.addr,r),Ot(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Nf,r[a])}function J_(s){switch(s){case 5126:return D_;case 35664:return N_;case 35665:return U_;case 35666:return F_;case 35674:return O_;case 35675:return B_;case 35676:return z_;case 5124:case 35670:return k_;case 35667:case 35671:return H_;case 35668:case 35672:return V_;case 35669:case 35673:return G_;case 5125:return W_;case 36294:return X_;case 36295:return q_;case 36296:return Y_;case 35678:case 36198:case 36298:case 36306:case 35682:return Z_;case 35679:case 36299:case 36307:return K_;case 35680:case 36300:case 36308:case 36293:return $_;case 36289:case 36303:case 36311:case 36292:return j_}}var Rh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=L_(t.type)}},Ch=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=J_(t.type)}},Ph=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(e,t[o.id],n)}}},Th=/(\w+)(\])?(\[|\.)?/g;function yf(s,e){s.seq.push(e),s.map[e.id]=e}function Q_(s,e,t){let n=s.name,i=n.length;for(Th.lastIndex=0;;){let r=Th.exec(n),a=Th.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){yf(t,c===void 0?new Rh(o,s,e):new Ch(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new Ph(o),yf(t,u)),t=u}}}var fr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Q_(o,l,this)}let i=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function vf(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var ey=37297,ty=0;function ny(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var Mf=new He;function iy(s){Ye._getMatrix(Mf,Ye.workingColorSpace,s);let e=`mat3( ${Mf.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(s)){case Lr:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return Ee("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function bf(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+ny(s.getShaderSource(e),o)}else return r}function sy(s,e){let t=iy(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var ry={[eh]:"Linear",[th]:"Reinhard",[nh]:"Cineon",[ih]:"ACESFilmic",[rh]:"AgX",[aa]:"Neutral",[sh]:"Custom"};function ay(s,e){let t=ry[e];return t===void 0?(Ee("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Pc=new T;function oy(){Ye.getLuminanceCoefficients(Pc);let s=Pc.x.toFixed(4),e=Pc.y.toFixed(4),t=Pc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function cy(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xa).join(`
`)}function ly(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function hy(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function xa(s){return s!==""}function Sf(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ef(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var uy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ih(s){return s.replace(uy,fy)}var dy=new Map;function fy(s,e){let t=Xe[e];if(t===void 0){let n=dy.get(e);if(n!==void 0)t=Xe[n],Ee('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Ih(t)}var py=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Tf(s){return s.replace(py,my)}function my(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function wf(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}var gy={[gs]:"SHADOWMAP_TYPE_PCF",[or]:"SHADOWMAP_TYPE_VSM"};function xy(s){return gy[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var _y={[Wi]:"ENVMAP_TYPE_CUBE",[xs]:"ENVMAP_TYPE_CUBE",[oa]:"ENVMAP_TYPE_CUBE_UV"};function yy(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":_y[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var vy={[xs]:"ENVMAP_MODE_REFRACTION"};function My(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":vy[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var by={[Ql]:"ENVMAP_BLENDING_MULTIPLY",[Gd]:"ENVMAP_BLENDING_MIX",[Wd]:"ENVMAP_BLENDING_ADD"};function Sy(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":by[s.combine]||"ENVMAP_BLENDING_NONE"}function Ey(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Ty(s,e,t,n){let i=s.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=xy(t),c=yy(t),h=My(t),u=Sy(t),d=Ey(t),f=cy(t),p=ly(r),x=i.createProgram(),g,m,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(xa).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(xa).join(`
`),m.length>0&&(m+=`
`)):(g=[wf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xa).join(`
`),m=[wf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Bn?"#define TONE_MAPPING":"",t.toneMapping!==Bn?Xe.tonemapping_pars_fragment:"",t.toneMapping!==Bn?ay("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,sy("linearToOutputTexel",t.outputColorSpace),oy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(xa).join(`
`)),a=Ih(a),a=Sf(a,t),a=Ef(a,t),o=Ih(o),o=Sf(o,t),o=Ef(o,t),a=Tf(a),o=Tf(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===ph?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ph?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let b=_+g+a,y=_+m+o,w=vf(i,i.VERTEX_SHADER,b),S=vf(i,i.FRAGMENT_SHADER,y);i.attachShader(x,w),i.attachShader(x,S),t.index0AttributeName!==void 0?i.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function R(I){if(s.debug.checkShaderErrors){let L=i.getProgramInfoLog(x)||"",W=i.getShaderInfoLog(w)||"",Y=i.getShaderInfoLog(S)||"",z=L.trim(),X=W.trim(),q=Y.trim(),Q=!0,ne=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(Q=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,x,w,S);else{let ce=bf(i,w,"vertex"),fe=bf(i,S,"fragment");Oe("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+z+`
`+ce+`
`+fe)}else z!==""?Ee("WebGLProgram: Program Info Log:",z):(X===""||q==="")&&(ne=!1);ne&&(I.diagnostics={runnable:Q,programLog:z,vertexShader:{log:X,prefix:g},fragmentShader:{log:q,prefix:m}})}i.deleteShader(w),i.deleteShader(S),v=new fr(i,x),A=hy(i,x)}let v;this.getUniforms=function(){return v===void 0&&R(this),v};let A;this.getAttributes=function(){return A===void 0&&R(this),A};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=i.getProgramParameter(x,ey)),P},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ty++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=S,this}var wy=0,Lh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Dh(e),t.set(e,n)),n}},Dh=class{constructor(e){this.id=wy++,this.code=e,this.usedTimes=0}};function Ay(s){return s===qi||s===da||s===fa}function Ry(s,e,t,n,i,r){let a=new Zs,o=new Lh,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer,d=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(v){return l.add(v),v===0?"uv":`uv${v}`}function x(v,A,P,I,L,W){let Y=I.fog,z=L.geometry,X=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?I.environment:null,q=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,Q=e.get(v.envMap||X,q),ne=Q&&Q.mapping===oa?Q.image.height:null,ce=f[v.type];v.precision!==null&&(d=n.getMaxPrecision(v.precision),d!==v.precision&&Ee("WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));let fe=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,ve=fe!==void 0?fe.length:0,nt=0;z.morphAttributes.position!==void 0&&(nt=1),z.morphAttributes.normal!==void 0&&(nt=2),z.morphAttributes.color!==void 0&&(nt=3);let st,$e,$,N;if(ce){let Se=ti[ce];st=Se.vertexShader,$e=Se.fragmentShader}else{st=v.vertexShader,$e=v.fragmentShader;let Se=o.getVertexShaderStage(v),vt=o.getFragmentShaderStage(v);o.update(v,Se,vt),$=Se.id,N=vt.id}let O=s.getRenderTarget(),te=s.state.buffers.depth.getReversed(),se=L.isInstancedMesh===!0,ie=L.isBatchedMesh===!0,Ae=!!v.map,Re=!!v.matcap,De=!!Q,ke=!!v.aoMap,ze=!!v.lightMap,Rt=!!v.bumpMap&&v.wireframe===!1,Dt=!!v.normalMap,zt=!!v.displacementMap,Wt=!!v.emissiveMap,yt=!!v.metalnessMap,Ct=!!v.roughnessMap,U=v.anisotropy>0,rn=v.clearcoat>0,at=v.dispersion>0,C=v.iridescence>0,M=v.sheen>0,B=v.transmission>0,V=U&&!!v.anisotropyMap,Z=rn&&!!v.clearcoatMap,re=rn&&!!v.clearcoatNormalMap,le=rn&&!!v.clearcoatRoughnessMap,K=C&&!!v.iridescenceMap,J=C&&!!v.iridescenceThicknessMap,he=M&&!!v.sheenColorMap,Pe=M&&!!v.sheenRoughnessMap,pe=!!v.specularMap,ue=!!v.specularColorMap,Ne=!!v.specularIntensityMap,Fe=B&&!!v.transmissionMap,Ve=B&&!!v.thicknessMap,D=!!v.gradientMap,ae=!!v.alphaMap,j=v.alphaTest>0,de=!!v.alphaHash,_e=!!v.extensions,ee=Bn;v.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(ee=s.toneMapping);let Ce={shaderID:ce,shaderType:v.type,shaderName:v.name,vertexShader:st,fragmentShader:$e,defines:v.defines,customVertexShaderID:$,customFragmentShaderID:N,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:ie,batchingColor:ie&&L._colorsTexture!==null,instancing:se,instancingColor:se&&L.instanceColor!==null,instancingMorph:se&&L.morphTexture!==null,outputColorSpace:O===null?s.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Ye.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Ae,matcap:Re,envMap:De,envMapMode:De&&Q.mapping,envMapCubeUVHeight:ne,aoMap:ke,lightMap:ze,bumpMap:Rt,normalMap:Dt,displacementMap:zt,emissiveMap:Wt,normalMapObjectSpace:Dt&&v.normalMapType===Zd,normalMapTangentSpace:Dt&&v.normalMapType===wc,packedNormalMap:Dt&&v.normalMapType===wc&&Ay(v.normalMap.format),metalnessMap:yt,roughnessMap:Ct,anisotropy:U,anisotropyMap:V,clearcoat:rn,clearcoatMap:Z,clearcoatNormalMap:re,clearcoatRoughnessMap:le,dispersion:at,iridescence:C,iridescenceMap:K,iridescenceThicknessMap:J,sheen:M,sheenColorMap:he,sheenRoughnessMap:Pe,specularMap:pe,specularColorMap:ue,specularIntensityMap:Ne,transmission:B,transmissionMap:Fe,thicknessMap:Ve,gradientMap:D,opaque:v.transparent===!1&&v.blending===rs&&v.alphaToCoverage===!1,alphaMap:ae,alphaTest:j,alphaHash:de,combine:v.combine,mapUv:Ae&&p(v.map.channel),aoMapUv:ke&&p(v.aoMap.channel),lightMapUv:ze&&p(v.lightMap.channel),bumpMapUv:Rt&&p(v.bumpMap.channel),normalMapUv:Dt&&p(v.normalMap.channel),displacementMapUv:zt&&p(v.displacementMap.channel),emissiveMapUv:Wt&&p(v.emissiveMap.channel),metalnessMapUv:yt&&p(v.metalnessMap.channel),roughnessMapUv:Ct&&p(v.roughnessMap.channel),anisotropyMapUv:V&&p(v.anisotropyMap.channel),clearcoatMapUv:Z&&p(v.clearcoatMap.channel),clearcoatNormalMapUv:re&&p(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:le&&p(v.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&p(v.iridescenceMap.channel),iridescenceThicknessMapUv:J&&p(v.iridescenceThicknessMap.channel),sheenColorMapUv:he&&p(v.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&p(v.sheenRoughnessMap.channel),specularMapUv:pe&&p(v.specularMap.channel),specularColorMapUv:ue&&p(v.specularColorMap.channel),specularIntensityMapUv:Ne&&p(v.specularIntensityMap.channel),transmissionMapUv:Fe&&p(v.transmissionMap.channel),thicknessMapUv:Ve&&p(v.thicknessMap.channel),alphaMapUv:ae&&p(v.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Dt||U),vertexNormals:!!z.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!z.attributes.uv&&(Ae||ae),fog:!!Y,useFog:v.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||z.attributes.normal===void 0&&Dt===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:te,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:ve,morphTextureStride:nt,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:ee,decodeVideoTexture:Ae&&v.map.isVideoTexture===!0&&Ye.getTransfer(v.map.colorSpace)===rt,decodeVideoTextureEmissive:Wt&&v.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(v.emissiveMap.colorSpace)===rt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Ut,flipSided:v.side===sn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:_e&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&v.extensions.multiDraw===!0||ie)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ce.vertexUv1s=l.has(1),Ce.vertexUv2s=l.has(2),Ce.vertexUv3s=l.has(3),l.clear(),Ce}function g(v){let A=[];if(v.shaderID?A.push(v.shaderID):(A.push(v.customVertexShaderID),A.push(v.customFragmentShaderID)),v.defines!==void 0)for(let P in v.defines)A.push(P),A.push(v.defines[P]);return v.isRawShaderMaterial===!1&&(m(A,v),_(A,v),A.push(s.outputColorSpace)),A.push(v.customProgramCacheKey),A.join()}function m(v,A){v.push(A.precision),v.push(A.outputColorSpace),v.push(A.envMapMode),v.push(A.envMapCubeUVHeight),v.push(A.mapUv),v.push(A.alphaMapUv),v.push(A.lightMapUv),v.push(A.aoMapUv),v.push(A.bumpMapUv),v.push(A.normalMapUv),v.push(A.displacementMapUv),v.push(A.emissiveMapUv),v.push(A.metalnessMapUv),v.push(A.roughnessMapUv),v.push(A.anisotropyMapUv),v.push(A.clearcoatMapUv),v.push(A.clearcoatNormalMapUv),v.push(A.clearcoatRoughnessMapUv),v.push(A.iridescenceMapUv),v.push(A.iridescenceThicknessMapUv),v.push(A.sheenColorMapUv),v.push(A.sheenRoughnessMapUv),v.push(A.specularMapUv),v.push(A.specularColorMapUv),v.push(A.specularIntensityMapUv),v.push(A.transmissionMapUv),v.push(A.thicknessMapUv),v.push(A.combine),v.push(A.fogExp2),v.push(A.sizeAttenuation),v.push(A.morphTargetsCount),v.push(A.morphAttributeCount),v.push(A.numDirLights),v.push(A.numPointLights),v.push(A.numSpotLights),v.push(A.numSpotLightMaps),v.push(A.numHemiLights),v.push(A.numRectAreaLights),v.push(A.numDirLightShadows),v.push(A.numPointLightShadows),v.push(A.numSpotLightShadows),v.push(A.numSpotLightShadowsWithMaps),v.push(A.numLightProbes),v.push(A.shadowMapType),v.push(A.toneMapping),v.push(A.numClippingPlanes),v.push(A.numClipIntersection),v.push(A.depthPacking)}function _(v,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function b(v){let A=f[v.type],P;if(A){let I=ti[A];P=of.clone(I.uniforms)}else P=v.uniforms;return P}function y(v,A){let P=h.get(A);return P!==void 0?++P.usedTimes:(P=new Ty(s,A,v,i),c.push(P),h.set(A,P)),P}function w(v){if(--v.usedTimes===0){let A=c.indexOf(v);c[A]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function S(v){o.remove(v)}function R(){o.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:b,acquireProgram:y,releaseProgram:w,releaseShaderCache:S,programs:c,dispose:R}}function Cy(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function Py(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function Af(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Rf(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,p,x,g,m){let _=s[e];return _===void 0?(_={id:d.id,object:d,geometry:f,material:p,materialVariant:a(d),groupOrder:x,renderOrder:d.renderOrder,z:g,group:m},s[e]=_):(_.id=d.id,_.object=d,_.geometry=f,_.material=p,_.materialVariant=a(d),_.groupOrder=x,_.renderOrder=d.renderOrder,_.z=g,_.group=m),e++,_}function l(d,f,p,x,g,m){let _=o(d,f,p,x,g,m);p.transmission>0?n.push(_):p.transparent===!0?i.push(_):t.push(_)}function c(d,f,p,x,g,m){let _=o(d,f,p,x,g,m);p.transmission>0?n.unshift(_):p.transparent===!0?i.unshift(_):t.unshift(_)}function h(d,f,p){t.length>1&&t.sort(d||Py),n.length>1&&n.sort(f||Af),i.length>1&&i.sort(f||Af),p&&(t.reverse(),n.reverse(),i.reverse())}function u(){for(let d=e,f=s.length;d<f;d++){let p=s[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:u,sort:h}}function Iy(){let s=new WeakMap;function e(n,i){let r=s.get(n),a;return r===void 0?(a=new Rf,s.set(n,[a])):i>=r.length?(a=new Rf,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function Ly(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new T,color:new we};break;case"SpotLight":t={position:new T,direction:new T,color:new we,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new T,color:new we,distance:0,decay:0};break;case"HemisphereLight":t={direction:new T,skyColor:new we,groundColor:new we};break;case"RectAreaLight":t={color:new we,position:new T,halfWidth:new T,halfHeight:new T};break}return s[e.id]=t,t}}}function Dy(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var Ny=0;function Uy(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Fy(s){let e=new Ly,t=Dy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new T);let i=new T,r=new Be,a=new Be;function o(c){let h=0,u=0,d=0;for(let A=0;A<9;A++)n.probe[A].set(0,0,0);let f=0,p=0,x=0,g=0,m=0,_=0,b=0,y=0,w=0,S=0,R=0;c.sort(Uy);for(let A=0,P=c.length;A<P;A++){let I=c[A],L=I.color,W=I.intensity,Y=I.distance,z=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===qi?z=I.shadow.map.texture:z=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=L.r*W,u+=L.g*W,d+=L.b*W;else if(I.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(I.sh.coefficients[X],W);R++}else if(I.isDirectionalLight){let X=e.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let q=I.shadow,Q=t.get(I);Q.shadowIntensity=q.intensity,Q.shadowBias=q.bias,Q.shadowNormalBias=q.normalBias,Q.shadowRadius=q.radius,Q.shadowMapSize=q.mapSize,n.directionalShadow[f]=Q,n.directionalShadowMap[f]=z,n.directionalShadowMatrix[f]=I.shadow.matrix,_++}n.directional[f]=X,f++}else if(I.isSpotLight){let X=e.get(I);X.position.setFromMatrixPosition(I.matrixWorld),X.color.copy(L).multiplyScalar(W),X.distance=Y,X.coneCos=Math.cos(I.angle),X.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),X.decay=I.decay,n.spot[x]=X;let q=I.shadow;if(I.map&&(n.spotLightMap[w]=I.map,w++,q.updateMatrices(I),I.castShadow&&S++),n.spotLightMatrix[x]=q.matrix,I.castShadow){let Q=t.get(I);Q.shadowIntensity=q.intensity,Q.shadowBias=q.bias,Q.shadowNormalBias=q.normalBias,Q.shadowRadius=q.radius,Q.shadowMapSize=q.mapSize,n.spotShadow[x]=Q,n.spotShadowMap[x]=z,y++}x++}else if(I.isRectAreaLight){let X=e.get(I);X.color.copy(L).multiplyScalar(W),X.halfWidth.set(I.width*.5,0,0),X.halfHeight.set(0,I.height*.5,0),n.rectArea[g]=X,g++}else if(I.isPointLight){let X=e.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),X.distance=I.distance,X.decay=I.decay,I.castShadow){let q=I.shadow,Q=t.get(I);Q.shadowIntensity=q.intensity,Q.shadowBias=q.bias,Q.shadowNormalBias=q.normalBias,Q.shadowRadius=q.radius,Q.shadowMapSize=q.mapSize,Q.shadowCameraNear=q.camera.near,Q.shadowCameraFar=q.camera.far,n.pointShadow[p]=Q,n.pointShadowMap[p]=z,n.pointShadowMatrix[p]=I.shadow.matrix,b++}n.point[p]=X,p++}else if(I.isHemisphereLight){let X=e.get(I);X.skyColor.copy(I.color).multiplyScalar(W),X.groundColor.copy(I.groundColor).multiplyScalar(W),n.hemi[m]=X,m++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=me.LTC_FLOAT_1,n.rectAreaLTC2=me.LTC_FLOAT_2):(n.rectAreaLTC1=me.LTC_HALF_1,n.rectAreaLTC2=me.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let v=n.hash;(v.directionalLength!==f||v.pointLength!==p||v.spotLength!==x||v.rectAreaLength!==g||v.hemiLength!==m||v.numDirectionalShadows!==_||v.numPointShadows!==b||v.numSpotShadows!==y||v.numSpotMaps!==w||v.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=y+w-S,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=R,v.directionalLength=f,v.pointLength=p,v.spotLength=x,v.rectAreaLength=g,v.hemiLength=m,v.numDirectionalShadows=_,v.numPointShadows=b,v.numSpotShadows=y,v.numSpotMaps=w,v.numLightProbes=R,n.version=Ny++)}function l(c,h){let u=0,d=0,f=0,p=0,x=0,g=h.matrixWorldInverse;for(let m=0,_=c.length;m<_;m++){let b=c[m];if(b.isDirectionalLight){let y=n.directional[u];y.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),u++}else if(b.isSpotLight){let y=n.spot[f];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),f++}else if(b.isRectAreaLight){let y=n.rectArea[p];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(g),a.identity(),r.copy(b.matrixWorld),r.premultiply(g),a.extractRotation(r),y.halfWidth.set(b.width*.5,0,0),y.halfHeight.set(0,b.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),p++}else if(b.isPointLight){let y=n.point[d];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(g),d++}else if(b.isHemisphereLight){let y=n.hemi[x];y.direction.setFromMatrixPosition(b.matrixWorld),y.direction.transformDirection(g),x++}}}return{setup:o,setupView:l,state:n}}function Cf(s){let e=new Fy(s),t=[],n=[],i=[];function r(d){u.camera=d,t.length=0,n.length=0,i.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function l(d){i.push(d)}function c(){e.setup(t)}function h(d){e.setupView(t,d)}let u={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Oy(s){let e=new WeakMap;function t(i,r=0){let a=e.get(i),o;return a===void 0?(o=new Cf(s),e.set(i,[o])):r>=a.length?(o=new Cf(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var By=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,zy=`uniform sampler2D shadow_pass;
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
}`,ky=[new T(1,0,0),new T(-1,0,0),new T(0,1,0),new T(0,-1,0),new T(0,0,1),new T(0,0,-1)],Hy=[new T(0,-1,0),new T(0,-1,0),new T(0,0,1),new T(0,0,-1),new T(0,-1,0),new T(0,-1,0)],Pf=new Be,ga=new T,wh=new T;function Vy(s,e,t){let n=new Bi,i=new oe,r=new oe,a=new ct,o=new Po,l=new Io,c={},h=t.maxTextureSize,u={[Nn]:sn,[sn]:Nn,[Ut]:Ut},d=new nn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new oe},radius:{value:4}},vertexShader:By,fragmentShader:zy}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let p=new et;p.setAttribute("position",new Et(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new be(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=gs;let m=this.type;this.render=function(S,R,v){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===Ed&&(Ee("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=gs);let A=s.getRenderTarget(),P=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),L=s.state;L.setBlending(Jn),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let W=m!==this.type;W&&R.traverse(function(Y){Y.material&&(Array.isArray(Y.material)?Y.material.forEach(z=>z.needsUpdate=!0):Y.material.needsUpdate=!0)});for(let Y=0,z=S.length;Y<z;Y++){let X=S[Y],q=X.shadow;if(q===void 0){Ee("WebGLShadowMap:",X,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;i.copy(q.mapSize);let Q=q.getFrameExtents();i.multiply(Q),r.copy(q.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/Q.x),i.x=r.x*Q.x,q.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/Q.y),i.y=r.y*Q.y,q.mapSize.y=r.y));let ne=s.state.buffers.depth.getReversed();if(q.camera._reversedDepth=ne,q.map===null||W===!0){if(q.map!==null&&(q.map.depthTexture!==null&&(q.map.depthTexture.dispose(),q.map.depthTexture=null),q.map.dispose()),this.type===or){if(X.isPointLight){Ee("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}q.map=new mn(i.x,i.y,{format:qi,type:Qn,minFilter:wt,magFilter:wt,generateMipmaps:!1}),q.map.texture.name=X.name+".shadowMap",q.map.depthTexture=new mi(i.x,i.y,_n),q.map.depthTexture.name=X.name+".shadowMapDepth",q.map.depthTexture.format=Xn,q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=Tt,q.map.depthTexture.magFilter=Tt}else X.isPointLight?(q.map=new Lc(i.x),q.map.depthTexture=new So(i.x,kn)):(q.map=new mn(i.x,i.y),q.map.depthTexture=new mi(i.x,i.y,kn)),q.map.depthTexture.name=X.name+".shadowMap",q.map.depthTexture.format=Xn,this.type===gs?(q.map.depthTexture.compareFunction=ne?Rc:Ac,q.map.depthTexture.minFilter=wt,q.map.depthTexture.magFilter=wt):(q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=Tt,q.map.depthTexture.magFilter=Tt);q.camera.updateProjectionMatrix()}let ce=q.map.isWebGLCubeRenderTarget?6:1;for(let fe=0;fe<ce;fe++){if(q.map.isWebGLCubeRenderTarget)s.setRenderTarget(q.map,fe),s.clear();else{fe===0&&(s.setRenderTarget(q.map),s.clear());let ve=q.getViewport(fe);a.set(r.x*ve.x,r.y*ve.y,r.x*ve.z,r.y*ve.w),L.viewport(a)}if(X.isPointLight){let ve=q.camera,nt=q.matrix,st=X.distance||ve.far;st!==ve.far&&(ve.far=st,ve.updateProjectionMatrix()),ga.setFromMatrixPosition(X.matrixWorld),ve.position.copy(ga),wh.copy(ve.position),wh.add(ky[fe]),ve.up.copy(Hy[fe]),ve.lookAt(wh),ve.updateMatrixWorld(),nt.makeTranslation(-ga.x,-ga.y,-ga.z),Pf.multiplyMatrices(ve.projectionMatrix,ve.matrixWorldInverse),q._frustum.setFromProjectionMatrix(Pf,ve.coordinateSystem,ve.reversedDepth)}else q.updateMatrices(X);n=q.getFrustum(),y(R,v,q.camera,X,this.type)}q.isPointLightShadow!==!0&&this.type===or&&_(q,v),q.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(A,P,I)};function _(S,R){let v=e.update(x);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new mn(i.x,i.y,{format:qi,type:Qn})),d.uniforms.shadow_pass.value=S.map.depthTexture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,s.setRenderTarget(S.mapPass),s.clear(),s.renderBufferDirect(R,null,v,d,x,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,s.setRenderTarget(S.map),s.clear(),s.renderBufferDirect(R,null,v,f,x,null)}function b(S,R,v,A){let P=null,I=v.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(I!==void 0)P=I;else if(P=v.isPointLight===!0?l:o,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let L=P.uuid,W=R.uuid,Y=c[L];Y===void 0&&(Y={},c[L]=Y);let z=Y[W];z===void 0&&(z=P.clone(),Y[W]=z,R.addEventListener("dispose",w)),P=z}if(P.visible=R.visible,P.wireframe=R.wireframe,A===or?P.side=R.shadowSide!==null?R.shadowSide:R.side:P.side=R.shadowSide!==null?R.shadowSide:u[R.side],P.alphaMap=R.alphaMap,P.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,P.map=R.map,P.clipShadows=R.clipShadows,P.clippingPlanes=R.clippingPlanes,P.clipIntersection=R.clipIntersection,P.displacementMap=R.displacementMap,P.displacementScale=R.displacementScale,P.displacementBias=R.displacementBias,P.wireframeLinewidth=R.wireframeLinewidth,P.linewidth=R.linewidth,v.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let L=s.properties.get(P);L.light=v}return P}function y(S,R,v,A,P){if(S.visible===!1)return;if(S.layers.test(R.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&P===or)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,S.matrixWorld);let W=e.update(S),Y=S.material;if(Array.isArray(Y)){let z=W.groups;for(let X=0,q=z.length;X<q;X++){let Q=z[X],ne=Y[Q.materialIndex];if(ne&&ne.visible){let ce=b(S,ne,A,P);S.onBeforeShadow(s,S,R,v,W,ce,Q),s.renderBufferDirect(v,null,W,ce,S,Q),S.onAfterShadow(s,S,R,v,W,ce,Q)}}}else if(Y.visible){let z=b(S,Y,A,P);S.onBeforeShadow(s,S,R,v,W,z,null),s.renderBufferDirect(v,null,W,z,S,null),S.onAfterShadow(s,S,R,v,W,z,null)}}let L=S.children;for(let W=0,Y=L.length;W<Y;W++)y(L[W],R,v,A,P)}function w(S){S.target.removeEventListener("dispose",w);for(let v in c){let A=c[v],P=S.target.uuid;P in A&&(A[P].dispose(),delete A[P])}}}function Gy(s,e){function t(){let D=!1,ae=new ct,j=null,de=new ct(0,0,0,0);return{setMask:function(_e){j!==_e&&!D&&(s.colorMask(_e,_e,_e,_e),j=_e)},setLocked:function(_e){D=_e},setClear:function(_e,ee,Ce,Se,vt){vt===!0&&(_e*=Se,ee*=Se,Ce*=Se),ae.set(_e,ee,Ce,Se),de.equals(ae)===!1&&(s.clearColor(_e,ee,Ce,Se),de.copy(ae))},reset:function(){D=!1,j=null,de.set(-1,0,0,0)}}}function n(){let D=!1,ae=!1,j=null,de=null,_e=null;return{setReversed:function(ee){if(ae!==ee){let Ce=e.get("EXT_clip_control");ee?Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.ZERO_TO_ONE_EXT):Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.NEGATIVE_ONE_TO_ONE_EXT),ae=ee;let Se=_e;_e=null,this.setClear(Se)}},getReversed:function(){return ae},setTest:function(ee){ee?O(s.DEPTH_TEST):te(s.DEPTH_TEST)},setMask:function(ee){j!==ee&&!D&&(s.depthMask(ee),j=ee)},setFunc:function(ee){if(ae&&(ee=rf[ee]),de!==ee){switch(ee){case lo:s.depthFunc(s.NEVER);break;case ho:s.depthFunc(s.ALWAYS);break;case uo:s.depthFunc(s.LESS);break;case as:s.depthFunc(s.LEQUAL);break;case fo:s.depthFunc(s.EQUAL);break;case po:s.depthFunc(s.GEQUAL);break;case mo:s.depthFunc(s.GREATER);break;case go:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}de=ee}},setLocked:function(ee){D=ee},setClear:function(ee){_e!==ee&&(_e=ee,ae&&(ee=1-ee),s.clearDepth(ee))},reset:function(){D=!1,j=null,de=null,_e=null,ae=!1}}}function i(){let D=!1,ae=null,j=null,de=null,_e=null,ee=null,Ce=null,Se=null,vt=null;return{setTest:function(pt){D||(pt?O(s.STENCIL_TEST):te(s.STENCIL_TEST))},setMask:function(pt){ae!==pt&&!D&&(s.stencilMask(pt),ae=pt)},setFunc:function(pt,Hn,Vn){(j!==pt||de!==Hn||_e!==Vn)&&(s.stencilFunc(pt,Hn,Vn),j=pt,de=Hn,_e=Vn)},setOp:function(pt,Hn,Vn){(ee!==pt||Ce!==Hn||Se!==Vn)&&(s.stencilOp(pt,Hn,Vn),ee=pt,Ce=Hn,Se=Vn)},setLocked:function(pt){D=pt},setClear:function(pt){vt!==pt&&(s.clearStencil(pt),vt=pt)},reset:function(){D=!1,ae=null,j=null,de=null,_e=null,ee=null,Ce=null,Se=null,vt=null}}}let r=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap,h={},u={},d={},f=new WeakMap,p=[],x=null,g=!1,m=null,_=null,b=null,y=null,w=null,S=null,R=null,v=new we(0,0,0),A=0,P=!1,I=null,L=null,W=null,Y=null,z=null,X=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,Q=0,ne=s.getParameter(s.VERSION);ne.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(ne)[1]),q=Q>=1):ne.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),q=Q>=2);let ce=null,fe={},ve=s.getParameter(s.SCISSOR_BOX),nt=s.getParameter(s.VIEWPORT),st=new ct().fromArray(ve),$e=new ct().fromArray(nt);function $(D,ae,j,de){let _e=new Uint8Array(4),ee=s.createTexture();s.bindTexture(D,ee),s.texParameteri(D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(D,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ce=0;Ce<j;Ce++)D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY?s.texImage3D(ae,0,s.RGBA,1,1,de,0,s.RGBA,s.UNSIGNED_BYTE,_e):s.texImage2D(ae+Ce,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,_e);return ee}let N={};N[s.TEXTURE_2D]=$(s.TEXTURE_2D,s.TEXTURE_2D,1),N[s.TEXTURE_CUBE_MAP]=$(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),N[s.TEXTURE_2D_ARRAY]=$(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),N[s.TEXTURE_3D]=$(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),O(s.DEPTH_TEST),a.setFunc(as),Rt(!1),Dt(Kl),O(s.CULL_FACE),ke(Jn);function O(D){h[D]!==!0&&(s.enable(D),h[D]=!0)}function te(D){h[D]!==!1&&(s.disable(D),h[D]=!1)}function se(D,ae){return d[D]!==ae?(s.bindFramebuffer(D,ae),d[D]=ae,D===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=ae),D===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=ae),!0):!1}function ie(D,ae){let j=p,de=!1;if(D){j=f.get(ae),j===void 0&&(j=[],f.set(ae,j));let _e=D.textures;if(j.length!==_e.length||j[0]!==s.COLOR_ATTACHMENT0){for(let ee=0,Ce=_e.length;ee<Ce;ee++)j[ee]=s.COLOR_ATTACHMENT0+ee;j.length=_e.length,de=!0}}else j[0]!==s.BACK&&(j[0]=s.BACK,de=!0);de&&s.drawBuffers(j)}function Ae(D){return x!==D?(s.useProgram(D),x=D,!0):!1}let Re={[Ui]:s.FUNC_ADD,[wd]:s.FUNC_SUBTRACT,[Ad]:s.FUNC_REVERSE_SUBTRACT};Re[Rd]=s.MIN,Re[Cd]=s.MAX;let De={[Pd]:s.ZERO,[Id]:s.ONE,[Ld]:s.SRC_COLOR,[oo]:s.SRC_ALPHA,[Bd]:s.SRC_ALPHA_SATURATE,[Fd]:s.DST_COLOR,[Nd]:s.DST_ALPHA,[Dd]:s.ONE_MINUS_SRC_COLOR,[co]:s.ONE_MINUS_SRC_ALPHA,[Od]:s.ONE_MINUS_DST_COLOR,[Ud]:s.ONE_MINUS_DST_ALPHA,[zd]:s.CONSTANT_COLOR,[kd]:s.ONE_MINUS_CONSTANT_COLOR,[Hd]:s.CONSTANT_ALPHA,[Vd]:s.ONE_MINUS_CONSTANT_ALPHA};function ke(D,ae,j,de,_e,ee,Ce,Se,vt,pt){if(D===Jn){g===!0&&(te(s.BLEND),g=!1);return}if(g===!1&&(O(s.BLEND),g=!0),D!==Td){if(D!==m||pt!==P){if((_!==Ui||w!==Ui)&&(s.blendEquation(s.FUNC_ADD),_=Ui,w=Ui),pt)switch(D){case rs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case $l:s.blendFunc(s.ONE,s.ONE);break;case jl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Jl:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Oe("WebGLState: Invalid blending: ",D);break}else switch(D){case rs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case $l:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case jl:Oe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Jl:Oe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Oe("WebGLState: Invalid blending: ",D);break}b=null,y=null,S=null,R=null,v.set(0,0,0),A=0,m=D,P=pt}return}_e=_e||ae,ee=ee||j,Ce=Ce||de,(ae!==_||_e!==w)&&(s.blendEquationSeparate(Re[ae],Re[_e]),_=ae,w=_e),(j!==b||de!==y||ee!==S||Ce!==R)&&(s.blendFuncSeparate(De[j],De[de],De[ee],De[Ce]),b=j,y=de,S=ee,R=Ce),(Se.equals(v)===!1||vt!==A)&&(s.blendColor(Se.r,Se.g,Se.b,vt),v.copy(Se),A=vt),m=D,P=!1}function ze(D,ae){D.side===Ut?te(s.CULL_FACE):O(s.CULL_FACE);let j=D.side===sn;ae&&(j=!j),Rt(j),D.blending===rs&&D.transparent===!1?ke(Jn):ke(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let de=D.stencilWrite;o.setTest(de),de&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Wt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?O(s.SAMPLE_ALPHA_TO_COVERAGE):te(s.SAMPLE_ALPHA_TO_COVERAGE)}function Rt(D){I!==D&&(D?s.frontFace(s.CW):s.frontFace(s.CCW),I=D)}function Dt(D){D!==bd?(O(s.CULL_FACE),D!==L&&(D===Kl?s.cullFace(s.BACK):D===Sd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):te(s.CULL_FACE),L=D}function zt(D){D!==W&&(q&&s.lineWidth(D),W=D)}function Wt(D,ae,j){D?(O(s.POLYGON_OFFSET_FILL),(Y!==ae||z!==j)&&(Y=ae,z=j,a.getReversed()&&(ae=-ae),s.polygonOffset(ae,j))):te(s.POLYGON_OFFSET_FILL)}function yt(D){D?O(s.SCISSOR_TEST):te(s.SCISSOR_TEST)}function Ct(D){D===void 0&&(D=s.TEXTURE0+X-1),ce!==D&&(s.activeTexture(D),ce=D)}function U(D,ae,j){j===void 0&&(ce===null?j=s.TEXTURE0+X-1:j=ce);let de=fe[j];de===void 0&&(de={type:void 0,texture:void 0},fe[j]=de),(de.type!==D||de.texture!==ae)&&(ce!==j&&(s.activeTexture(j),ce=j),s.bindTexture(D,ae||N[D]),de.type=D,de.texture=ae)}function rn(){let D=fe[ce];D!==void 0&&D.type!==void 0&&(s.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function at(){try{s.compressedTexImage2D(...arguments)}catch(D){Oe("WebGLState:",D)}}function C(){try{s.compressedTexImage3D(...arguments)}catch(D){Oe("WebGLState:",D)}}function M(){try{s.texSubImage2D(...arguments)}catch(D){Oe("WebGLState:",D)}}function B(){try{s.texSubImage3D(...arguments)}catch(D){Oe("WebGLState:",D)}}function V(){try{s.compressedTexSubImage2D(...arguments)}catch(D){Oe("WebGLState:",D)}}function Z(){try{s.compressedTexSubImage3D(...arguments)}catch(D){Oe("WebGLState:",D)}}function re(){try{s.texStorage2D(...arguments)}catch(D){Oe("WebGLState:",D)}}function le(){try{s.texStorage3D(...arguments)}catch(D){Oe("WebGLState:",D)}}function K(){try{s.texImage2D(...arguments)}catch(D){Oe("WebGLState:",D)}}function J(){try{s.texImage3D(...arguments)}catch(D){Oe("WebGLState:",D)}}function he(D){return u[D]!==void 0?u[D]:s.getParameter(D)}function Pe(D,ae){u[D]!==ae&&(s.pixelStorei(D,ae),u[D]=ae)}function pe(D){st.equals(D)===!1&&(s.scissor(D.x,D.y,D.z,D.w),st.copy(D))}function ue(D){$e.equals(D)===!1&&(s.viewport(D.x,D.y,D.z,D.w),$e.copy(D))}function Ne(D,ae){let j=c.get(ae);j===void 0&&(j=new WeakMap,c.set(ae,j));let de=j.get(D);de===void 0&&(de=s.getUniformBlockIndex(ae,D.name),j.set(D,de))}function Fe(D,ae){let de=c.get(ae).get(D);l.get(ae)!==de&&(s.uniformBlockBinding(ae,de,D.__bindingPointIndex),l.set(ae,de))}function Ve(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},u={},ce=null,fe={},d={},f=new WeakMap,p=[],x=null,g=!1,m=null,_=null,b=null,y=null,w=null,S=null,R=null,v=new we(0,0,0),A=0,P=!1,I=null,L=null,W=null,Y=null,z=null,st.set(0,0,s.canvas.width,s.canvas.height),$e.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:O,disable:te,bindFramebuffer:se,drawBuffers:ie,useProgram:Ae,setBlending:ke,setMaterial:ze,setFlipSided:Rt,setCullFace:Dt,setLineWidth:zt,setPolygonOffset:Wt,setScissorTest:yt,activeTexture:Ct,bindTexture:U,unbindTexture:rn,compressedTexImage2D:at,compressedTexImage3D:C,texImage2D:K,texImage3D:J,pixelStorei:Pe,getParameter:he,updateUBOMapping:Ne,uniformBlockBinding:Fe,texStorage2D:re,texStorage3D:le,texSubImage2D:M,texSubImage3D:B,compressedTexSubImage2D:V,compressedTexSubImage3D:Z,scissor:pe,viewport:ue,reset:Ve}}function Wy(s,e,t,n,i,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new oe,h=new WeakMap,u=new Set,d,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(C,M){return p?new OffscreenCanvas(C,M):Xs("canvas")}function g(C,M,B){let V=1,Z=at(C);if((Z.width>B||Z.height>B)&&(V=B/Math.max(Z.width,Z.height)),V<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let re=Math.floor(V*Z.width),le=Math.floor(V*Z.height);d===void 0&&(d=x(re,le));let K=M?x(re,le):d;return K.width=re,K.height=le,K.getContext("2d").drawImage(C,0,0,re,le),Ee("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+re+"x"+le+")."),K}else return"data"in C&&Ee("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),C;return C}function m(C){return C.generateMipmaps}function _(C){s.generateMipmap(C)}function b(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(C,M,B,V,Z,re=!1){if(C!==null){if(s[C]!==void 0)return s[C];Ee("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let le;V&&(le=e.get("EXT_texture_norm16"),le||Ee("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=M;if(M===s.RED&&(B===s.FLOAT&&(K=s.R32F),B===s.HALF_FLOAT&&(K=s.R16F),B===s.UNSIGNED_BYTE&&(K=s.R8),B===s.UNSIGNED_SHORT&&le&&(K=le.R16_EXT),B===s.SHORT&&le&&(K=le.R16_SNORM_EXT)),M===s.RED_INTEGER&&(B===s.UNSIGNED_BYTE&&(K=s.R8UI),B===s.UNSIGNED_SHORT&&(K=s.R16UI),B===s.UNSIGNED_INT&&(K=s.R32UI),B===s.BYTE&&(K=s.R8I),B===s.SHORT&&(K=s.R16I),B===s.INT&&(K=s.R32I)),M===s.RG&&(B===s.FLOAT&&(K=s.RG32F),B===s.HALF_FLOAT&&(K=s.RG16F),B===s.UNSIGNED_BYTE&&(K=s.RG8),B===s.UNSIGNED_SHORT&&le&&(K=le.RG16_EXT),B===s.SHORT&&le&&(K=le.RG16_SNORM_EXT)),M===s.RG_INTEGER&&(B===s.UNSIGNED_BYTE&&(K=s.RG8UI),B===s.UNSIGNED_SHORT&&(K=s.RG16UI),B===s.UNSIGNED_INT&&(K=s.RG32UI),B===s.BYTE&&(K=s.RG8I),B===s.SHORT&&(K=s.RG16I),B===s.INT&&(K=s.RG32I)),M===s.RGB_INTEGER&&(B===s.UNSIGNED_BYTE&&(K=s.RGB8UI),B===s.UNSIGNED_SHORT&&(K=s.RGB16UI),B===s.UNSIGNED_INT&&(K=s.RGB32UI),B===s.BYTE&&(K=s.RGB8I),B===s.SHORT&&(K=s.RGB16I),B===s.INT&&(K=s.RGB32I)),M===s.RGBA_INTEGER&&(B===s.UNSIGNED_BYTE&&(K=s.RGBA8UI),B===s.UNSIGNED_SHORT&&(K=s.RGBA16UI),B===s.UNSIGNED_INT&&(K=s.RGBA32UI),B===s.BYTE&&(K=s.RGBA8I),B===s.SHORT&&(K=s.RGBA16I),B===s.INT&&(K=s.RGBA32I)),M===s.RGB&&(B===s.UNSIGNED_SHORT&&le&&(K=le.RGB16_EXT),B===s.SHORT&&le&&(K=le.RGB16_SNORM_EXT),B===s.UNSIGNED_INT_5_9_9_9_REV&&(K=s.RGB9_E5),B===s.UNSIGNED_INT_10F_11F_11F_REV&&(K=s.R11F_G11F_B10F)),M===s.RGBA){let J=re?Lr:Ye.getTransfer(Z);B===s.FLOAT&&(K=s.RGBA32F),B===s.HALF_FLOAT&&(K=s.RGBA16F),B===s.UNSIGNED_BYTE&&(K=J===rt?s.SRGB8_ALPHA8:s.RGBA8),B===s.UNSIGNED_SHORT&&le&&(K=le.RGBA16_EXT),B===s.SHORT&&le&&(K=le.RGBA16_SNORM_EXT),B===s.UNSIGNED_SHORT_4_4_4_4&&(K=s.RGBA4),B===s.UNSIGNED_SHORT_5_5_5_1&&(K=s.RGB5_A1)}return(K===s.R16F||K===s.R32F||K===s.RG16F||K===s.RG32F||K===s.RGBA16F||K===s.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function w(C,M){let B;return C?M===null||M===kn||M===hr?B=s.DEPTH24_STENCIL8:M===_n?B=s.DEPTH32F_STENCIL8:M===lr&&(B=s.DEPTH24_STENCIL8,Ee("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===kn||M===hr?B=s.DEPTH_COMPONENT24:M===_n?B=s.DEPTH_COMPONENT32F:M===lr&&(B=s.DEPTH_COMPONENT16),B}function S(C,M){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==Tt&&C.minFilter!==wt?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function R(C){let M=C.target;M.removeEventListener("dispose",R),A(M),M.isVideoTexture&&h.delete(M),M.isHTMLTexture&&u.delete(M)}function v(C){let M=C.target;M.removeEventListener("dispose",v),I(M)}function A(C){let M=n.get(C);if(M.__webglInit===void 0)return;let B=C.source,V=f.get(B);if(V){let Z=V[M.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&P(C),Object.keys(V).length===0&&f.delete(B)}n.remove(C)}function P(C){let M=n.get(C);s.deleteTexture(M.__webglTexture);let B=C.source,V=f.get(B);delete V[M.__cacheKey],a.memory.textures--}function I(C){let M=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(M.__webglFramebuffer[V]))for(let Z=0;Z<M.__webglFramebuffer[V].length;Z++)s.deleteFramebuffer(M.__webglFramebuffer[V][Z]);else s.deleteFramebuffer(M.__webglFramebuffer[V]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[V])}else{if(Array.isArray(M.__webglFramebuffer))for(let V=0;V<M.__webglFramebuffer.length;V++)s.deleteFramebuffer(M.__webglFramebuffer[V]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let V=0;V<M.__webglColorRenderbuffer.length;V++)M.__webglColorRenderbuffer[V]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[V]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let B=C.textures;for(let V=0,Z=B.length;V<Z;V++){let re=n.get(B[V]);re.__webglTexture&&(s.deleteTexture(re.__webglTexture),a.memory.textures--),n.remove(B[V])}n.remove(C)}let L=0;function W(){L=0}function Y(){return L}function z(C){L=C}function X(){let C=L;return C>=i.maxTextures&&Ee("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),L+=1,C}function q(C){let M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function Q(C,M){let B=n.get(C);if(C.isVideoTexture&&U(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&B.__version!==C.version){let V=C.image;if(V===null)Ee("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Ee("WebGLRenderer: Texture marked for update but image is incomplete");else{te(B,C,M);return}}else C.isExternalTexture&&(B.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,B.__webglTexture,s.TEXTURE0+M)}function ne(C,M){let B=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){te(B,C,M);return}else C.isExternalTexture&&(B.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,B.__webglTexture,s.TEXTURE0+M)}function ce(C,M){let B=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){te(B,C,M);return}t.bindTexture(s.TEXTURE_3D,B.__webglTexture,s.TEXTURE0+M)}function fe(C,M){let B=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&B.__version!==C.version){se(B,C,M);return}t.bindTexture(s.TEXTURE_CUBE_MAP,B.__webglTexture,s.TEXTURE0+M)}let ve={[Fi]:s.REPEAT,[En]:s.CLAMP_TO_EDGE,[Gs]:s.MIRRORED_REPEAT},nt={[Tt]:s.NEAREST,[Vo]:s.NEAREST_MIPMAP_NEAREST,[_s]:s.NEAREST_MIPMAP_LINEAR,[wt]:s.LINEAR,[cr]:s.LINEAR_MIPMAP_NEAREST,[zn]:s.LINEAR_MIPMAP_LINEAR},st={[Kd]:s.NEVER,[ef]:s.ALWAYS,[$d]:s.LESS,[Ac]:s.LEQUAL,[jd]:s.EQUAL,[Rc]:s.GEQUAL,[Jd]:s.GREATER,[Qd]:s.NOTEQUAL};function $e(C,M){if(M.type===_n&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===wt||M.magFilter===cr||M.magFilter===_s||M.magFilter===zn||M.minFilter===wt||M.minFilter===cr||M.minFilter===_s||M.minFilter===zn)&&Ee("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,ve[M.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,ve[M.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,ve[M.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,nt[M.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,nt[M.minFilter]),M.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,st[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Tt||M.minFilter!==_s&&M.minFilter!==zn||M.type===_n&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");s.texParameterf(C,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function $(C,M){let B=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",R));let V=M.source,Z=f.get(V);Z===void 0&&(Z={},f.set(V,Z));let re=q(M);if(re!==C.__cacheKey){Z[re]===void 0&&(Z[re]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Z[re].usedTimes++;let le=Z[C.__cacheKey];le!==void 0&&(Z[C.__cacheKey].usedTimes--,le.usedTimes===0&&P(M)),C.__cacheKey=re,C.__webglTexture=Z[re].texture}return B}function N(C,M,B){return Math.floor(Math.floor(C/B)/M)}function O(C,M,B,V){let re=C.updateRanges;if(re.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,M.width,M.height,B,V,M.data);else{re.sort((Pe,pe)=>Pe.start-pe.start);let le=0;for(let Pe=1;Pe<re.length;Pe++){let pe=re[le],ue=re[Pe],Ne=pe.start+pe.count,Fe=N(ue.start,M.width,4),Ve=N(pe.start,M.width,4);ue.start<=Ne+1&&Fe===Ve&&N(ue.start+ue.count-1,M.width,4)===Fe?pe.count=Math.max(pe.count,ue.start+ue.count-pe.start):(++le,re[le]=ue)}re.length=le+1;let K=t.getParameter(s.UNPACK_ROW_LENGTH),J=t.getParameter(s.UNPACK_SKIP_PIXELS),he=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,M.width);for(let Pe=0,pe=re.length;Pe<pe;Pe++){let ue=re[Pe],Ne=Math.floor(ue.start/4),Fe=Math.ceil(ue.count/4),Ve=Ne%M.width,D=Math.floor(Ne/M.width),ae=Fe,j=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,Ve),t.pixelStorei(s.UNPACK_SKIP_ROWS,D),t.texSubImage2D(s.TEXTURE_2D,0,Ve,D,ae,j,B,V,M.data)}C.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,K),t.pixelStorei(s.UNPACK_SKIP_PIXELS,J),t.pixelStorei(s.UNPACK_SKIP_ROWS,he)}}function te(C,M,B){let V=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(V=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(V=s.TEXTURE_3D);let Z=$(C,M),re=M.source;t.bindTexture(V,C.__webglTexture,s.TEXTURE0+B);let le=n.get(re);if(re.version!==le.__version||Z===!0){if(t.activeTexture(s.TEXTURE0+B),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){let j=Ye.getPrimaries(Ye.workingColorSpace),de=M.colorSpace===Si?null:Ye.getPrimaries(M.colorSpace),_e=M.colorSpace===Si||j===de?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e)}t.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment);let J=g(M.image,!1,i.maxTextureSize);J=rn(M,J);let he=r.convert(M.format,M.colorSpace),Pe=r.convert(M.type),pe=y(M.internalFormat,he,Pe,M.normalized,M.colorSpace,M.isVideoTexture);$e(V,M);let ue,Ne=M.mipmaps,Fe=M.isVideoTexture!==!0,Ve=le.__version===void 0||Z===!0,D=re.dataReady,ae=S(M,J);if(M.isDepthTexture)pe=w(M.format===Xi,M.type),Ve&&(Fe?t.texStorage2D(s.TEXTURE_2D,1,pe,J.width,J.height):t.texImage2D(s.TEXTURE_2D,0,pe,J.width,J.height,0,he,Pe,null));else if(M.isDataTexture)if(Ne.length>0){Fe&&Ve&&t.texStorage2D(s.TEXTURE_2D,ae,pe,Ne[0].width,Ne[0].height);for(let j=0,de=Ne.length;j<de;j++)ue=Ne[j],Fe?D&&t.texSubImage2D(s.TEXTURE_2D,j,0,0,ue.width,ue.height,he,Pe,ue.data):t.texImage2D(s.TEXTURE_2D,j,pe,ue.width,ue.height,0,he,Pe,ue.data);M.generateMipmaps=!1}else Fe?(Ve&&t.texStorage2D(s.TEXTURE_2D,ae,pe,J.width,J.height),D&&O(M,J,he,Pe)):t.texImage2D(s.TEXTURE_2D,0,pe,J.width,J.height,0,he,Pe,J.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Fe&&Ve&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ae,pe,Ne[0].width,Ne[0].height,J.depth);for(let j=0,de=Ne.length;j<de;j++)if(ue=Ne[j],M.format!==yn)if(he!==null)if(Fe){if(D)if(M.layerUpdates.size>0){let _e=vh(ue.width,ue.height,M.format,M.type);for(let ee of M.layerUpdates){let Ce=ue.data.subarray(ee*_e/ue.data.BYTES_PER_ELEMENT,(ee+1)*_e/ue.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,ee,ue.width,ue.height,1,he,Ce)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,0,ue.width,ue.height,J.depth,he,ue.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,j,pe,ue.width,ue.height,J.depth,0,ue.data,0,0);else Ee("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?D&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,0,ue.width,ue.height,J.depth,he,Pe,ue.data):t.texImage3D(s.TEXTURE_2D_ARRAY,j,pe,ue.width,ue.height,J.depth,0,he,Pe,ue.data)}else{Fe&&Ve&&t.texStorage2D(s.TEXTURE_2D,ae,pe,Ne[0].width,Ne[0].height);for(let j=0,de=Ne.length;j<de;j++)ue=Ne[j],M.format!==yn?he!==null?Fe?D&&t.compressedTexSubImage2D(s.TEXTURE_2D,j,0,0,ue.width,ue.height,he,ue.data):t.compressedTexImage2D(s.TEXTURE_2D,j,pe,ue.width,ue.height,0,ue.data):Ee("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?D&&t.texSubImage2D(s.TEXTURE_2D,j,0,0,ue.width,ue.height,he,Pe,ue.data):t.texImage2D(s.TEXTURE_2D,j,pe,ue.width,ue.height,0,he,Pe,ue.data)}else if(M.isDataArrayTexture)if(Fe){if(Ve&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ae,pe,J.width,J.height,J.depth),D)if(M.layerUpdates.size>0){let j=vh(J.width,J.height,M.format,M.type);for(let de of M.layerUpdates){let _e=J.data.subarray(de*j/J.data.BYTES_PER_ELEMENT,(de+1)*j/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,de,J.width,J.height,1,he,Pe,_e)}M.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,he,Pe,J.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,pe,J.width,J.height,J.depth,0,he,Pe,J.data);else if(M.isData3DTexture)Fe?(Ve&&t.texStorage3D(s.TEXTURE_3D,ae,pe,J.width,J.height,J.depth),D&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,he,Pe,J.data)):t.texImage3D(s.TEXTURE_3D,0,pe,J.width,J.height,J.depth,0,he,Pe,J.data);else if(M.isFramebufferTexture){if(Ve)if(Fe)t.texStorage2D(s.TEXTURE_2D,ae,pe,J.width,J.height);else{let j=J.width,de=J.height;for(let _e=0;_e<ae;_e++)t.texImage2D(s.TEXTURE_2D,_e,pe,j,de,0,he,Pe,null),j>>=1,de>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in s){let j=s.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),J.parentNode!==j){j.appendChild(J),u.add(M),j.onpaint=de=>{let _e=de.changedElements;for(let ee of u)_e.includes(ee.image)&&(ee.needsUpdate=!0)},j.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,J);else{let _e=s.RGBA,ee=s.RGBA,Ce=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,_e,ee,Ce,J)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Ne.length>0){if(Fe&&Ve){let j=at(Ne[0]);t.texStorage2D(s.TEXTURE_2D,ae,pe,j.width,j.height)}for(let j=0,de=Ne.length;j<de;j++)ue=Ne[j],Fe?D&&t.texSubImage2D(s.TEXTURE_2D,j,0,0,he,Pe,ue):t.texImage2D(s.TEXTURE_2D,j,pe,he,Pe,ue);M.generateMipmaps=!1}else if(Fe){if(Ve){let j=at(J);t.texStorage2D(s.TEXTURE_2D,ae,pe,j.width,j.height)}D&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,he,Pe,J)}else t.texImage2D(s.TEXTURE_2D,0,pe,he,Pe,J);m(M)&&_(V),le.__version=re.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function se(C,M,B){if(M.image.length!==6)return;let V=$(C,M),Z=M.source;t.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+B);let re=n.get(Z);if(Z.version!==re.__version||V===!0){t.activeTexture(s.TEXTURE0+B);let le=Ye.getPrimaries(Ye.workingColorSpace),K=M.colorSpace===Si?null:Ye.getPrimaries(M.colorSpace),J=M.colorSpace===Si||le===K?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);let he=M.isCompressedTexture||M.image[0].isCompressedTexture,Pe=M.image[0]&&M.image[0].isDataTexture,pe=[];for(let ee=0;ee<6;ee++)!he&&!Pe?pe[ee]=g(M.image[ee],!0,i.maxCubemapSize):pe[ee]=Pe?M.image[ee].image:M.image[ee],pe[ee]=rn(M,pe[ee]);let ue=pe[0],Ne=r.convert(M.format,M.colorSpace),Fe=r.convert(M.type),Ve=y(M.internalFormat,Ne,Fe,M.normalized,M.colorSpace),D=M.isVideoTexture!==!0,ae=re.__version===void 0||V===!0,j=Z.dataReady,de=S(M,ue);$e(s.TEXTURE_CUBE_MAP,M);let _e;if(he){D&&ae&&t.texStorage2D(s.TEXTURE_CUBE_MAP,de,Ve,ue.width,ue.height);for(let ee=0;ee<6;ee++){_e=pe[ee].mipmaps;for(let Ce=0;Ce<_e.length;Ce++){let Se=_e[Ce];M.format!==yn?Ne!==null?D?j&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Ce,0,0,Se.width,Se.height,Ne,Se.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Ce,Ve,Se.width,Se.height,0,Se.data):Ee("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?j&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Ce,0,0,Se.width,Se.height,Ne,Fe,Se.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Ce,Ve,Se.width,Se.height,0,Ne,Fe,Se.data)}}}else{if(_e=M.mipmaps,D&&ae){_e.length>0&&de++;let ee=at(pe[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,de,Ve,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(Pe){D?j&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,pe[ee].width,pe[ee].height,Ne,Fe,pe[ee].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,Ve,pe[ee].width,pe[ee].height,0,Ne,Fe,pe[ee].data);for(let Ce=0;Ce<_e.length;Ce++){let vt=_e[Ce].image[ee].image;D?j&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Ce+1,0,0,vt.width,vt.height,Ne,Fe,vt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Ce+1,Ve,vt.width,vt.height,0,Ne,Fe,vt.data)}}else{D?j&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Ne,Fe,pe[ee]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,Ve,Ne,Fe,pe[ee]);for(let Ce=0;Ce<_e.length;Ce++){let Se=_e[Ce];D?j&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Ce+1,0,0,Ne,Fe,Se.image[ee]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Ce+1,Ve,Ne,Fe,Se.image[ee])}}}m(M)&&_(s.TEXTURE_CUBE_MAP),re.__version=Z.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function ie(C,M,B,V,Z,re){let le=r.convert(B.format,B.colorSpace),K=r.convert(B.type),J=y(B.internalFormat,le,K,B.normalized,B.colorSpace),he=n.get(M),Pe=n.get(B);if(Pe.__renderTarget=M,!he.__hasExternalTextures){let pe=Math.max(1,M.width>>re),ue=Math.max(1,M.height>>re);Z===s.TEXTURE_3D||Z===s.TEXTURE_2D_ARRAY?t.texImage3D(Z,re,J,pe,ue,M.depth,0,le,K,null):t.texImage2D(Z,re,J,pe,ue,0,le,K,null)}t.bindFramebuffer(s.FRAMEBUFFER,C),Ct(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,V,Z,Pe.__webglTexture,0,yt(M)):(Z===s.TEXTURE_2D||Z>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,V,Z,Pe.__webglTexture,re),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ae(C,M,B){if(s.bindRenderbuffer(s.RENDERBUFFER,C),M.depthBuffer){let V=M.depthTexture,Z=V&&V.isDepthTexture?V.type:null,re=w(M.stencilBuffer,Z),le=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;Ct(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,yt(M),re,M.width,M.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,yt(M),re,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,re,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,le,s.RENDERBUFFER,C)}else{let V=M.textures;for(let Z=0;Z<V.length;Z++){let re=V[Z],le=r.convert(re.format,re.colorSpace),K=r.convert(re.type),J=y(re.internalFormat,le,K,re.normalized,re.colorSpace);Ct(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,yt(M),J,M.width,M.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,yt(M),J,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,J,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Re(C,M,B){let V=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Z=n.get(M.depthTexture);if(Z.__renderTarget=M,(!Z.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),V){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,M.depthTexture.addEventListener("dispose",R)),Z.__webglTexture===void 0){Z.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,Z.__webglTexture),$e(s.TEXTURE_CUBE_MAP,M.depthTexture);let he=r.convert(M.depthTexture.format),Pe=r.convert(M.depthTexture.type),pe;M.depthTexture.format===Xn?pe=s.DEPTH_COMPONENT24:M.depthTexture.format===Xi&&(pe=s.DEPTH24_STENCIL8);for(let ue=0;ue<6;ue++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,pe,M.width,M.height,0,he,Pe,null)}}else Q(M.depthTexture,0);let re=Z.__webglTexture,le=yt(M),K=V?s.TEXTURE_CUBE_MAP_POSITIVE_X+B:s.TEXTURE_2D,J=M.depthTexture.format===Xi?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(M.depthTexture.format===Xn)Ct(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,J,K,re,0,le):s.framebufferTexture2D(s.FRAMEBUFFER,J,K,re,0);else if(M.depthTexture.format===Xi)Ct(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,J,K,re,0,le):s.framebufferTexture2D(s.FRAMEBUFFER,J,K,re,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function De(C){let M=n.get(C),B=C.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==C.depthTexture){let V=C.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),V){let Z=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,V.removeEventListener("dispose",Z)};V.addEventListener("dispose",Z),M.__depthDisposeCallback=Z}M.__boundDepthTexture=V}if(C.depthTexture&&!M.__autoAllocateDepthBuffer)if(B)for(let V=0;V<6;V++)Re(M.__webglFramebuffer[V],C,V);else{let V=C.texture.mipmaps;V&&V.length>0?Re(M.__webglFramebuffer[0],C,0):Re(M.__webglFramebuffer,C,0)}else if(B){M.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[V]),M.__webglDepthbuffer[V]===void 0)M.__webglDepthbuffer[V]=s.createRenderbuffer(),Ae(M.__webglDepthbuffer[V],C,!1);else{let Z=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,re=M.__webglDepthbuffer[V];s.bindRenderbuffer(s.RENDERBUFFER,re),s.framebufferRenderbuffer(s.FRAMEBUFFER,Z,s.RENDERBUFFER,re)}}else{let V=C.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=s.createRenderbuffer(),Ae(M.__webglDepthbuffer,C,!1);else{let Z=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,re=M.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,re),s.framebufferRenderbuffer(s.FRAMEBUFFER,Z,s.RENDERBUFFER,re)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function ke(C,M,B){let V=n.get(C);M!==void 0&&ie(V.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),B!==void 0&&De(C)}function ze(C){let M=C.texture,B=n.get(C),V=n.get(M);C.addEventListener("dispose",v);let Z=C.textures,re=C.isWebGLCubeRenderTarget===!0,le=Z.length>1;if(le||(V.__webglTexture===void 0&&(V.__webglTexture=s.createTexture()),V.__version=M.version,a.memory.textures++),re){B.__webglFramebuffer=[];for(let K=0;K<6;K++)if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer[K]=[];for(let J=0;J<M.mipmaps.length;J++)B.__webglFramebuffer[K][J]=s.createFramebuffer()}else B.__webglFramebuffer[K]=s.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer=[];for(let K=0;K<M.mipmaps.length;K++)B.__webglFramebuffer[K]=s.createFramebuffer()}else B.__webglFramebuffer=s.createFramebuffer();if(le)for(let K=0,J=Z.length;K<J;K++){let he=n.get(Z[K]);he.__webglTexture===void 0&&(he.__webglTexture=s.createTexture(),a.memory.textures++)}if(C.samples>0&&Ct(C)===!1){B.__webglMultisampledFramebuffer=s.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let K=0;K<Z.length;K++){let J=Z[K];B.__webglColorRenderbuffer[K]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,B.__webglColorRenderbuffer[K]);let he=r.convert(J.format,J.colorSpace),Pe=r.convert(J.type),pe=y(J.internalFormat,he,Pe,J.normalized,J.colorSpace,C.isXRRenderTarget===!0),ue=yt(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,ue,pe,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+K,s.RENDERBUFFER,B.__webglColorRenderbuffer[K])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(B.__webglDepthRenderbuffer=s.createRenderbuffer(),Ae(B.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(re){t.bindTexture(s.TEXTURE_CUBE_MAP,V.__webglTexture),$e(s.TEXTURE_CUBE_MAP,M);for(let K=0;K<6;K++)if(M.mipmaps&&M.mipmaps.length>0)for(let J=0;J<M.mipmaps.length;J++)ie(B.__webglFramebuffer[K][J],C,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+K,J);else ie(B.__webglFramebuffer[K],C,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);m(M)&&_(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(le){for(let K=0,J=Z.length;K<J;K++){let he=Z[K],Pe=n.get(he),pe=s.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(pe=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(pe,Pe.__webglTexture),$e(pe,he),ie(B.__webglFramebuffer,C,he,s.COLOR_ATTACHMENT0+K,pe,0),m(he)&&_(pe)}t.unbindTexture()}else{let K=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(K=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(K,V.__webglTexture),$e(K,M),M.mipmaps&&M.mipmaps.length>0)for(let J=0;J<M.mipmaps.length;J++)ie(B.__webglFramebuffer[J],C,M,s.COLOR_ATTACHMENT0,K,J);else ie(B.__webglFramebuffer,C,M,s.COLOR_ATTACHMENT0,K,0);m(M)&&_(K),t.unbindTexture()}C.depthBuffer&&De(C)}function Rt(C){let M=C.textures;for(let B=0,V=M.length;B<V;B++){let Z=M[B];if(m(Z)){let re=b(C),le=n.get(Z).__webglTexture;t.bindTexture(re,le),_(re),t.unbindTexture()}}}let Dt=[],zt=[];function Wt(C){if(C.samples>0){if(Ct(C)===!1){let M=C.textures,B=C.width,V=C.height,Z=s.COLOR_BUFFER_BIT,re=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,le=n.get(C),K=M.length>1;if(K)for(let he=0;he<M.length;he++)t.bindFramebuffer(s.FRAMEBUFFER,le.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+he,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,le.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+he,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer);let J=C.texture.mipmaps;J&&J.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,le.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let he=0;he<M.length;he++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Z|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Z|=s.STENCIL_BUFFER_BIT)),K){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,le.__webglColorRenderbuffer[he]);let Pe=n.get(M[he]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Pe,0)}s.blitFramebuffer(0,0,B,V,0,0,B,V,Z,s.NEAREST),l===!0&&(Dt.length=0,zt.length=0,Dt.push(s.COLOR_ATTACHMENT0+he),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Dt.push(re),zt.push(re),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,zt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Dt))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),K)for(let he=0;he<M.length;he++){t.bindFramebuffer(s.FRAMEBUFFER,le.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+he,s.RENDERBUFFER,le.__webglColorRenderbuffer[he]);let Pe=n.get(M[he]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,le.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+he,s.TEXTURE_2D,Pe,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){let M=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function yt(C){return Math.min(i.maxSamples,C.samples)}function Ct(C){let M=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function U(C){let M=a.render.frame;h.get(C)!==M&&(h.set(C,M),C.update())}function rn(C,M){let B=C.colorSpace,V=C.format,Z=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||B!==en&&B!==Si&&(Ye.getTransfer(B)===rt?(V!==yn||Z!==ln)&&Ee("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Oe("WebGLTextures: Unsupported texture color space:",B)),M}function at(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=W,this.getTextureUnits=Y,this.setTextureUnits=z,this.setTexture2D=Q,this.setTexture2DArray=ne,this.setTexture3D=ce,this.setTextureCube=fe,this.rebindTextures=ke,this.setupRenderTarget=ze,this.updateRenderTargetMipmap=Rt,this.updateMultisampleRenderTarget=Wt,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=ie,this.useMultisampledRTT=Ct,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Xy(s,e){function t(n,i=Si){let r,a=Ye.getTransfer(i);if(n===ln)return s.UNSIGNED_BYTE;if(n===Wo)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Xo)return s.UNSIGNED_SHORT_5_5_5_1;if(n===lh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===hh)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===oh)return s.BYTE;if(n===ch)return s.SHORT;if(n===lr)return s.UNSIGNED_SHORT;if(n===Go)return s.INT;if(n===kn)return s.UNSIGNED_INT;if(n===_n)return s.FLOAT;if(n===Qn)return s.HALF_FLOAT;if(n===uh)return s.ALPHA;if(n===dh)return s.RGB;if(n===yn)return s.RGBA;if(n===Xn)return s.DEPTH_COMPONENT;if(n===Xi)return s.DEPTH_STENCIL;if(n===qo)return s.RED;if(n===Yo)return s.RED_INTEGER;if(n===qi)return s.RG;if(n===Zo)return s.RG_INTEGER;if(n===Ko)return s.RGBA_INTEGER;if(n===ca||n===la||n===ha||n===ua)if(a===rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ca)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===la)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ua)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ca)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===la)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ha)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ua)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===$o||n===jo||n===Jo||n===Qo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===$o)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===jo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Jo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Qo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ec||n===tc||n===nc||n===ic||n===sc||n===da||n===rc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ec||n===tc)return a===rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===nc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ic)return r.COMPRESSED_R11_EAC;if(n===sc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===da)return r.COMPRESSED_RG11_EAC;if(n===rc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ac||n===oc||n===cc||n===lc||n===hc||n===uc||n===dc||n===fc||n===pc||n===mc||n===gc||n===xc||n===_c||n===yc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ac)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===oc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===cc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===lc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===hc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===uc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===dc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===fc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===pc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===mc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===gc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===xc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===_c)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===yc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===vc||n===Mc||n===bc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===vc)return a===rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Mc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===bc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Sc||n===Ec||n===fa||n===Tc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Sc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ec)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===fa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Tc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===hr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var qy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Yy=`
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

}`,Nh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Gr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new nn({vertexShader:qy,fragmentShader:Yy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new be(new fs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Uh=class extends Un{constructor(e,t){super();let n=this,i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,p=null,x=typeof XRWebGLBinding<"u",g=new Nh,m={},_=t.getContextAttributes(),b=null,y=null,w=[],S=[],R=new oe,v=null,A=new Ht;A.viewport=new ct;let P=new Ht;P.viewport=new ct;let I=[A,P],L=new zo,W=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let N=w[$];return N===void 0&&(N=new Ks,w[$]=N),N.getTargetRaySpace()},this.getControllerGrip=function($){let N=w[$];return N===void 0&&(N=new Ks,w[$]=N),N.getGripSpace()},this.getHand=function($){let N=w[$];return N===void 0&&(N=new Ks,w[$]=N),N.getHandSpace()};function z($){let N=S.indexOf($.inputSource);if(N===-1)return;let O=w[N];O!==void 0&&(O.update($.inputSource,$.frame,c||a),O.dispatchEvent({type:$.type,data:$.inputSource}))}function X(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",X),i.removeEventListener("inputsourceschange",q);for(let $=0;$<w.length;$++){let N=S[$];N!==null&&(S[$]=null,w[$].disconnect(N))}W=null,Y=null,g.reset();for(let $ in m)delete m[$];e.setRenderTarget(b),f=null,d=null,u=null,i=null,y=null,$e.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&Ee("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&Ee("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(b=e.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",X),i.addEventListener("inputsourceschange",q),_.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let O=null,te=null,se=null;_.depth&&(se=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,O=_.stencil?Xi:Xn,te=_.stencil?hr:kn);let ie={colorFormat:t.RGBA8,depthFormat:se,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(ie),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new mn(d.textureWidth,d.textureHeight,{format:yn,type:ln,depthTexture:new mi(d.textureWidth,d.textureHeight,te,void 0,void 0,void 0,void 0,void 0,void 0,O),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let O={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,O),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new mn(f.framebufferWidth,f.framebufferHeight,{format:yn,type:ln,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),$e.setContext(i),$e.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function q($){for(let N=0;N<$.removed.length;N++){let O=$.removed[N],te=S.indexOf(O);te>=0&&(S[te]=null,w[te].disconnect(O))}for(let N=0;N<$.added.length;N++){let O=$.added[N],te=S.indexOf(O);if(te===-1){for(let ie=0;ie<w.length;ie++)if(ie>=S.length){S.push(O),te=ie;break}else if(S[ie]===null){S[ie]=O,te=ie;break}if(te===-1)break}let se=w[te];se&&se.connect(O)}}let Q=new T,ne=new T;function ce($,N,O){Q.setFromMatrixPosition(N.matrixWorld),ne.setFromMatrixPosition(O.matrixWorld);let te=Q.distanceTo(ne),se=N.projectionMatrix.elements,ie=O.projectionMatrix.elements,Ae=se[14]/(se[10]-1),Re=se[14]/(se[10]+1),De=(se[9]+1)/se[5],ke=(se[9]-1)/se[5],ze=(se[8]-1)/se[0],Rt=(ie[8]+1)/ie[0],Dt=Ae*ze,zt=Ae*Rt,Wt=te/(-ze+Rt),yt=Wt*-ze;if(N.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(yt),$.translateZ(Wt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),se[10]===-1)$.projectionMatrix.copy(N.projectionMatrix),$.projectionMatrixInverse.copy(N.projectionMatrixInverse);else{let Ct=Ae+Wt,U=Re+Wt,rn=Dt-yt,at=zt+(te-yt),C=De*Re/U*Ct,M=ke*Re/U*Ct;$.projectionMatrix.makePerspective(rn,at,C,M,Ct,U),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function fe($,N){N===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(N.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let N=$.near,O=$.far;g.texture!==null&&(g.depthNear>0&&(N=g.depthNear),g.depthFar>0&&(O=g.depthFar)),L.near=P.near=A.near=N,L.far=P.far=A.far=O,(W!==L.near||Y!==L.far)&&(i.updateRenderState({depthNear:L.near,depthFar:L.far}),W=L.near,Y=L.far),L.layers.mask=$.layers.mask|6,A.layers.mask=L.layers.mask&-5,P.layers.mask=L.layers.mask&-3;let te=$.parent,se=L.cameras;fe(L,te);for(let ie=0;ie<se.length;ie++)fe(se[ie],te);se.length===2?ce(L,A,P):L.projectionMatrix.copy(A.projectionMatrix),ve($,L,te)};function ve($,N,O){O===null?$.matrix.copy(N.matrixWorld):($.matrix.copy(O.matrixWorld),$.matrix.invert(),$.matrix.multiply(N.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(N.projectionMatrix),$.projectionMatrixInverse.copy(N.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=ls*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(L)},this.getCameraTexture=function($){return m[$]};let nt=null;function st($,N){if(h=N.getViewerPose(c||a),p=N,h!==null){let O=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let te=!1;O.length!==L.cameras.length&&(L.cameras.length=0,te=!0);for(let Re=0;Re<O.length;Re++){let De=O[Re],ke=null;if(f!==null)ke=f.getViewport(De);else{let Rt=u.getViewSubImage(d,De);ke=Rt.viewport,Re===0&&(e.setRenderTargetTextures(y,Rt.colorTexture,Rt.depthStencilTexture),e.setRenderTarget(y))}let ze=I[Re];ze===void 0&&(ze=new Ht,ze.layers.enable(Re),ze.viewport=new ct,I[Re]=ze),ze.matrix.fromArray(De.transform.matrix),ze.matrix.decompose(ze.position,ze.quaternion,ze.scale),ze.projectionMatrix.fromArray(De.projectionMatrix),ze.projectionMatrixInverse.copy(ze.projectionMatrix).invert(),ze.viewport.set(ke.x,ke.y,ke.width,ke.height),Re===0&&(L.matrix.copy(ze.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),te===!0&&L.cameras.push(ze)}let se=i.enabledFeatures;if(se&&se.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&x){u=n.getBinding();let Re=u.getDepthInformation(O[0]);Re&&Re.isValid&&Re.texture&&g.init(Re,i.renderState)}if(se&&se.includes("camera-access")&&x){e.state.unbindTexture(),u=n.getBinding();for(let Re=0;Re<O.length;Re++){let De=O[Re].camera;if(De){let ke=m[De];ke||(ke=new Gr,m[De]=ke);let ze=u.getCameraImage(De);ke.sourceTexture=ze}}}}for(let O=0;O<w.length;O++){let te=S[O],se=w[O];te!==null&&se!==void 0&&se.update(te,N,c||a)}nt&&nt($,N),N.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:N}),p=null}let $e=new If;$e.setAnimationLoop(st),this.setAnimationLoop=function($){nt=$},this.dispose=function(){}}},Zy=new Be,Of=new He;Of.set(-1,0,0,0,1,0,0,0,1);function Ky(s,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,xh(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,_,b,y){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),u(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),d(g,m),m.isMeshPhysicalMaterial&&f(g,m,y)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),x(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,_,b):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===sn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===sn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let _=e.get(m),b=_.envMap,y=_.envMapRotation;b&&(g.envMap.value=b,g.envMapRotation.value.setFromMatrix4(Zy.makeRotationFromEuler(y)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Of),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,_,b){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*_,g.scale.value=b*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,_){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===sn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function x(g,m){let _=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function $y(s,e,t,n){let i={},r={},a=[],o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,w){let S=w.program;n.uniformBlockBinding(y,S)}function c(y,w){let S=i[y.id];S===void 0&&(g(y),S=h(y),i[y.id]=S,y.addEventListener("dispose",_));let R=w.program;n.updateUBOMapping(y,R);let v=e.render.frame;r[y.id]!==v&&(d(y),r[y.id]=v)}function h(y){let w=u();y.__bindingPointIndex=w;let S=s.createBuffer(),R=y.__size,v=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,S),s.bufferData(s.UNIFORM_BUFFER,R,v),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,w,S),S}function u(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Oe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){let w=i[y.id],S=y.uniforms,R=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,w);for(let v=0,A=S.length;v<A;v++){let P=S[v];if(Array.isArray(P))for(let I=0,L=P.length;I<L;I++)f(P[I],v,I,R);else f(P,v,0,R)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(y,w,S,R){if(x(y,w,S,R)===!0){let v=y.__offset,A=y.value;if(Array.isArray(A)){let P=0;for(let I=0;I<A.length;I++){let L=A[I],W=m(L);p(L,y.__data,P),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(P+=W.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(A,y.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,v,y.__data)}}function p(y,w,S){typeof y=="number"||typeof y=="boolean"?w[0]=y:y.isMatrix3?(w[0]=y.elements[0],w[1]=y.elements[1],w[2]=y.elements[2],w[3]=0,w[4]=y.elements[3],w[5]=y.elements[4],w[6]=y.elements[5],w[7]=0,w[8]=y.elements[6],w[9]=y.elements[7],w[10]=y.elements[8],w[11]=0):ArrayBuffer.isView(y)?w.set(new y.constructor(y.buffer,y.byteOffset,w.length)):y.toArray(w,S)}function x(y,w,S,R){let v=y.value,A=w+"_"+S;if(R[A]===void 0)return typeof v=="number"||typeof v=="boolean"?R[A]=v:ArrayBuffer.isView(v)?R[A]=v.slice():R[A]=v.clone(),!0;{let P=R[A];if(typeof v=="number"||typeof v=="boolean"){if(P!==v)return R[A]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(P.equals(v)===!1)return P.copy(v),!0}}return!1}function g(y){let w=y.uniforms,S=0,R=16;for(let A=0,P=w.length;A<P;A++){let I=Array.isArray(w[A])?w[A]:[w[A]];for(let L=0,W=I.length;L<W;L++){let Y=I[L],z=Array.isArray(Y.value)?Y.value:[Y.value];for(let X=0,q=z.length;X<q;X++){let Q=z[X],ne=m(Q),ce=S%R,fe=ce%ne.boundary,ve=ce+fe;S+=fe,ve!==0&&R-ve<ne.storage&&(S+=R-ve),Y.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=S,S+=ne.storage}}}let v=S%R;return v>0&&(S+=R-v),y.__size=S,y.__cache={},this}function m(y){let w={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(w.boundary=4,w.storage=4):y.isVector2?(w.boundary=8,w.storage=8):y.isVector3||y.isColor?(w.boundary=16,w.storage=12):y.isVector4?(w.boundary=16,w.storage=16):y.isMatrix3?(w.boundary=48,w.storage=48):y.isMatrix4?(w.boundary=64,w.storage=64):y.isTexture?Ee("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(w.boundary=16,w.storage=y.byteLength):Ee("WebGLRenderer: Unsupported uniform value type.",y),w}function _(y){let w=y.target;w.removeEventListener("dispose",_);let S=a.indexOf(w.__bindingPointIndex);a.splice(S,1),s.deleteBuffer(i[w.id]),delete i[w.id],delete r[w.id]}function b(){for(let y in i)s.deleteBuffer(i[y]);a=[],i={},r={}}return{bind:l,update:c,dispose:b}}var jy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ei=null;function Jy(){return ei===null&&(ei=new Qs(jy,16,16,qi,Qn),ei.name="DFG_LUT",ei.minFilter=wt,ei.magFilter=wt,ei.wrapS=En,ei.wrapT=En,ei.generateMipmaps=!1,ei.needsUpdate=!0),ei}var Dc=class{constructor(e={}){let{canvas:t=tf(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=ln}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let x=f,g=new Set([Ko,Zo,Yo]),m=new Set([ln,kn,lr,hr,Wo,Xo]),_=new Uint32Array(4),b=new Int32Array(4),y=new T,w=null,S=null,R=[],v=[],A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,I=!1,L=null,W=null,Y=null,z=null;this._outputColorSpace=xt;let X=0,q=0,Q=null,ne=-1,ce=null,fe=new ct,ve=new ct,nt=null,st=new we(0),$e=0,$=t.width,N=t.height,O=1,te=null,se=null,ie=new ct(0,0,$,N),Ae=new ct(0,0,$,N),Re=!1,De=new Bi,ke=!1,ze=!1,Rt=new Be,Dt=new T,zt=new ct,Wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},yt=!1;function Ct(){return Q===null?O:1}let U=n;function rn(E,F){return t.getContext(E,F)}try{let E={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"185"}`),t.addEventListener("webglcontextlost",vt,!1),t.addEventListener("webglcontextrestored",pt,!1),t.addEventListener("webglcontextcreationerror",Hn,!1),U===null){let F="webgl2";if(U=rn(F,E),U===null)throw rn(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(E){throw Oe("WebGLRenderer: "+E.message),E}let at,C,M,B,V,Z,re,le,K,J,he,Pe,pe,ue,Ne,Fe,Ve,D,ae,j,de,_e,ee;function Ce(){at=new r_(U),at.init(),de=new Xy(U,at),C=new jx(U,at,e,de),M=new Gy(U,at),C.reversedDepthBuffer&&d&&M.buffers.depth.setReversed(!0),W=U.createFramebuffer(),Y=U.createFramebuffer(),z=U.createFramebuffer(),B=new c_(U),V=new Cy,Z=new Wy(U,at,M,V,C,de,B),re=new s_(P),le=new dg(U),_e=new Kx(U,le),K=new a_(U,le,B,_e),J=new h_(U,K,le,_e,B),D=new l_(U,C,Z),Ne=new Jx(V),he=new Ry(P,re,at,C,_e,Ne),Pe=new Ky(P,V),pe=new Iy,ue=new Oy(at),Ve=new Zx(P,re,M,J,p,l),Fe=new Vy(P,J,C),ee=new $y(U,B,C,M),ae=new $x(U,at,B),j=new o_(U,at,B),B.programs=he.programs,P.capabilities=C,P.extensions=at,P.properties=V,P.renderLists=pe,P.shadowMap=Fe,P.state=M,P.info=B}Ce(),x!==ln&&(A=new d_(x,t.width,t.height,o,i,r));let Se=new Uh(P,U);this.xr=Se,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let E=at.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=at.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(E){E!==void 0&&(O=E,this.setSize($,N,!1))},this.getSize=function(E){return E.set($,N)},this.setSize=function(E,F,G=!0){if(Se.isPresenting){Ee("WebGLRenderer: Can't change size while VR device is presenting.");return}$=E,N=F,t.width=Math.floor(E*O),t.height=Math.floor(F*O),G===!0&&(t.style.width=E+"px",t.style.height=F+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,E,F)},this.getDrawingBufferSize=function(E){return E.set($*O,N*O).floor()},this.setDrawingBufferSize=function(E,F,G){$=E,N=F,O=G,t.width=Math.floor(E*G),t.height=Math.floor(F*G),this.setViewport(0,0,E,F)},this.setEffects=function(E){if(x===ln){Oe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let F=0;F<E.length;F++)if(E[F].isOutputPass===!0){Ee("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(fe)},this.getViewport=function(E){return E.copy(ie)},this.setViewport=function(E,F,G,k){E.isVector4?ie.set(E.x,E.y,E.z,E.w):ie.set(E,F,G,k),M.viewport(fe.copy(ie).multiplyScalar(O).round())},this.getScissor=function(E){return E.copy(Ae)},this.setScissor=function(E,F,G,k){E.isVector4?Ae.set(E.x,E.y,E.z,E.w):Ae.set(E,F,G,k),M.scissor(ve.copy(Ae).multiplyScalar(O).round())},this.getScissorTest=function(){return Re},this.setScissorTest=function(E){M.setScissorTest(Re=E)},this.setOpaqueSort=function(E){te=E},this.setTransparentSort=function(E){se=E},this.getClearColor=function(E){return E.copy(Ve.getClearColor())},this.setClearColor=function(){Ve.setClearColor(...arguments)},this.getClearAlpha=function(){return Ve.getClearAlpha()},this.setClearAlpha=function(){Ve.setClearAlpha(...arguments)},this.clear=function(E=!0,F=!0,G=!0){let k=0;if(E){let H=!1;if(Q!==null){let xe=Q.texture.format;H=g.has(xe)}if(H){let xe=Q.texture.type,Me=m.has(xe),ge=Ve.getClearColor(),Te=Ve.getClearAlpha(),Ie=ge.r,Ge=ge.g,qe=ge.b;Me?(_[0]=Ie,_[1]=Ge,_[2]=qe,_[3]=Te,U.clearBufferuiv(U.COLOR,0,_)):(b[0]=Ie,b[1]=Ge,b[2]=qe,b[3]=Te,U.clearBufferiv(U.COLOR,0,b))}else k|=U.COLOR_BUFFER_BIT}F&&(k|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(k|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&U.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),L=E},this.dispose=function(){t.removeEventListener("webglcontextlost",vt,!1),t.removeEventListener("webglcontextrestored",pt,!1),t.removeEventListener("webglcontextcreationerror",Hn,!1),Ve.dispose(),pe.dispose(),ue.dispose(),V.dispose(),re.dispose(),J.dispose(),_e.dispose(),ee.dispose(),he.dispose(),Se.dispose(),Se.removeEventListener("sessionstart",Au),Se.removeEventListener("sessionend",Ru),Ji.stop()};function vt(E){E.preventDefault(),Dr("WebGLRenderer: Context Lost."),I=!0}function pt(){Dr("WebGLRenderer: Context Restored."),I=!1;let E=B.autoReset,F=Fe.enabled,G=Fe.autoUpdate,k=Fe.needsUpdate,H=Fe.type;Ce(),B.autoReset=E,Fe.enabled=F,Fe.autoUpdate=G,Fe.needsUpdate=k,Fe.type=H}function Hn(E){Oe("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Vn(E){let F=E.target;F.removeEventListener("dispose",Vn),Wp(F)}function Wp(E){Xp(E),V.remove(E)}function Xp(E){let F=V.get(E).programs;F!==void 0&&(F.forEach(function(G){he.releaseProgram(G)}),E.isShaderMaterial&&he.releaseShaderCache(E))}this.renderBufferDirect=function(E,F,G,k,H,xe){F===null&&(F=Wt);let Me=H.isMesh&&H.matrixWorld.determinantAffine()<0,ge=Zp(E,F,G,k,H);M.setMaterial(k,Me);let Te=G.index,Ie=1;if(k.wireframe===!0){if(Te=K.getWireframeAttribute(G),Te===void 0)return;Ie=2}let Ge=G.drawRange,qe=G.attributes.position,Le=Ge.start*Ie,lt=(Ge.start+Ge.count)*Ie;xe!==null&&(Le=Math.max(Le,xe.start*Ie),lt=Math.min(lt,(xe.start+xe.count)*Ie)),Te!==null?(Le=Math.max(Le,0),lt=Math.min(lt,Te.count)):qe!=null&&(Le=Math.max(Le,0),lt=Math.min(lt,qe.count));let bt=lt-Le;if(bt<0||bt===1/0)return;_e.setup(H,k,ge,G,Te);let Mt,ut=ae;if(Te!==null&&(Mt=le.get(Te),ut=j,ut.setIndex(Mt)),H.isMesh)k.wireframe===!0?(M.setLineWidth(k.wireframeLinewidth*Ct()),ut.setMode(U.LINES)):ut.setMode(U.TRIANGLES);else if(H.isLine){let Yt=k.linewidth;Yt===void 0&&(Yt=1),M.setLineWidth(Yt*Ct()),H.isLineSegments?ut.setMode(U.LINES):H.isLineLoop?ut.setMode(U.LINE_LOOP):ut.setMode(U.LINE_STRIP)}else H.isPoints?ut.setMode(U.POINTS):H.isSprite&&ut.setMode(U.TRIANGLES);if(H.isBatchedMesh)if(at.get("WEBGL_multi_draw"))ut.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let Yt=H._multiDrawStarts,ye=H._multiDrawCounts,dn=H._multiDrawCount,it=Te?le.get(Te).bytesPerElement:1,Mn=V.get(k).currentProgram.getUniforms();for(let Gn=0;Gn<dn;Gn++)Mn.setValue(U,"_gl_DrawID",Gn),ut.render(Yt[Gn]/it,ye[Gn])}else if(H.isInstancedMesh)ut.renderInstances(Le,bt,H.count);else if(G.isInstancedBufferGeometry){let Yt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,ye=Math.min(G.instanceCount,Yt);ut.renderInstances(Le,bt,ye)}else ut.render(Le,bt)};function wu(E,F,G){E.transparent===!0&&E.side===Ut&&E.forceSinglePass===!1?(E.side=sn,E.needsUpdate=!0,Pa(E,F,G),E.side=Nn,E.needsUpdate=!0,Pa(E,F,G),E.side=Ut):Pa(E,F,G)}this.compile=function(E,F,G=null){G===null&&(G=E),S=ue.get(G),S.init(F),v.push(S),G.traverseVisible(function(H){H.isLight&&H.layers.test(F.layers)&&(S.pushLight(H),H.castShadow&&S.pushShadow(H))}),E!==G&&E.traverseVisible(function(H){H.isLight&&H.layers.test(F.layers)&&(S.pushLight(H),H.castShadow&&S.pushShadow(H))}),S.setupLights();let k=new Set;return E.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let xe=H.material;if(xe)if(Array.isArray(xe))for(let Me=0;Me<xe.length;Me++){let ge=xe[Me];wu(ge,G,H),k.add(ge)}else wu(xe,G,H),k.add(xe)}),S=v.pop(),k},this.compileAsync=function(E,F,G=null){let k=this.compile(E,F,G);return new Promise(H=>{function xe(){if(k.forEach(function(Me){V.get(Me).currentProgram.isReady()&&k.delete(Me)}),k.size===0){H(E);return}setTimeout(xe,10)}at.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let tl=null;function qp(E){tl&&tl(E)}function Au(){Ji.stop()}function Ru(){Ji.start()}let Ji=new If;Ji.setAnimationLoop(qp),typeof self<"u"&&Ji.setContext(self),this.setAnimationLoop=function(E){tl=E,Se.setAnimationLoop(E),E===null?Ji.stop():Ji.start()},Se.addEventListener("sessionstart",Au),Se.addEventListener("sessionend",Ru),this.render=function(E,F){if(F!==void 0&&F.isCamera!==!0){Oe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;L!==null&&L.renderStart(E,F);let G=Se.enabled===!0&&Se.isPresenting===!0,k=A!==null&&(Q===null||G)&&A.begin(P,Q);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Se.enabled===!0&&Se.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Se.cameraAutoUpdate===!0&&Se.updateCamera(F),F=Se.getCamera()),E.isScene===!0&&E.onBeforeRender(P,E,F,Q),S=ue.get(E,v.length),S.init(F),S.state.textureUnits=Z.getTextureUnits(),v.push(S),Rt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),De.setFromProjectionMatrix(Rt,Ln,F.reversedDepth),ze=this.localClippingEnabled,ke=Ne.init(this.clippingPlanes,ze),w=pe.get(E,R.length),w.init(),R.push(w),Se.enabled===!0&&Se.isPresenting===!0){let Me=P.xr.getDepthSensingMesh();Me!==null&&nl(Me,F,-1/0,P.sortObjects)}nl(E,F,0,P.sortObjects),w.finish(),P.sortObjects===!0&&w.sort(te,se,F.reversedDepth),yt=Se.enabled===!1||Se.isPresenting===!1||Se.hasDepthSensing()===!1,yt&&Ve.addToRenderList(w,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ke===!0&&Ne.beginShadows();let H=S.state.shadowsArray;if(Fe.render(H,E,F),ke===!0&&Ne.endShadows(),(k&&A.hasRenderPass())===!1){let Me=w.opaque,ge=w.transmissive;if(S.setupLights(),F.isArrayCamera){let Te=F.cameras;if(ge.length>0)for(let Ie=0,Ge=Te.length;Ie<Ge;Ie++){let qe=Te[Ie];Pu(Me,ge,E,qe)}yt&&Ve.render(E);for(let Ie=0,Ge=Te.length;Ie<Ge;Ie++){let qe=Te[Ie];Cu(w,E,qe,qe.viewport)}}else ge.length>0&&Pu(Me,ge,E,F),yt&&Ve.render(E),Cu(w,E,F)}Q!==null&&q===0&&(Z.updateMultisampleRenderTarget(Q),Z.updateRenderTargetMipmap(Q)),k&&A.end(P),E.isScene===!0&&E.onAfterRender(P,E,F),_e.resetDefaultState(),ne=-1,ce=null,v.pop(),v.length>0?(S=v[v.length-1],Z.setTextureUnits(S.state.textureUnits),ke===!0&&Ne.setGlobalState(P.clippingPlanes,S.state.camera)):S=null,R.pop(),R.length>0?w=R[R.length-1]:w=null,L!==null&&L.renderEnd()};function nl(E,F,G,k){if(E.visible===!1)return;if(E.layers.test(F.layers)){if(E.isGroup)G=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(F);else if(E.isLightProbeGrid)S.pushLightProbeGrid(E);else if(E.isLight)S.pushLight(E),E.castShadow&&S.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||De.intersectsSprite(E)){k&&zt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Rt);let Me=J.update(E),ge=E.material;ge.visible&&w.push(E,Me,ge,G,zt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||De.intersectsObject(E))){let Me=J.update(E),ge=E.material;if(k&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),zt.copy(E.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),zt.copy(Me.boundingSphere.center)),zt.applyMatrix4(E.matrixWorld).applyMatrix4(Rt)),Array.isArray(ge)){let Te=Me.groups;for(let Ie=0,Ge=Te.length;Ie<Ge;Ie++){let qe=Te[Ie],Le=ge[qe.materialIndex];Le&&Le.visible&&w.push(E,Me,Le,G,zt.z,qe)}}else ge.visible&&w.push(E,Me,ge,G,zt.z,null)}}let xe=E.children;for(let Me=0,ge=xe.length;Me<ge;Me++)nl(xe[Me],F,G,k)}function Cu(E,F,G,k){let{opaque:H,transmissive:xe,transparent:Me}=E;S.setupLightsView(G),ke===!0&&Ne.setGlobalState(P.clippingPlanes,G),k&&M.viewport(fe.copy(k)),H.length>0&&Ca(H,F,G),xe.length>0&&Ca(xe,F,G),Me.length>0&&Ca(Me,F,G),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function Pu(E,F,G,k){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[k.id]===void 0){let Le=at.has("EXT_color_buffer_half_float")||at.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[k.id]=new mn(1,1,{generateMipmaps:!0,type:Le?Qn:ln,minFilter:zn,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ye.workingColorSpace})}let xe=S.state.transmissionRenderTarget[k.id],Me=k.viewport||fe;xe.setSize(Me.z*P.transmissionResolutionScale,Me.w*P.transmissionResolutionScale);let ge=P.getRenderTarget(),Te=P.getActiveCubeFace(),Ie=P.getActiveMipmapLevel();P.setRenderTarget(xe),P.getClearColor(st),$e=P.getClearAlpha(),$e<1&&P.setClearColor(16777215,.5),P.clear(),yt&&Ve.render(G);let Ge=P.toneMapping;P.toneMapping=Bn;let qe=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),S.setupLightsView(k),ke===!0&&Ne.setGlobalState(P.clippingPlanes,k),Ca(E,G,k),Z.updateMultisampleRenderTarget(xe),Z.updateRenderTargetMipmap(xe),at.has("WEBGL_multisampled_render_to_texture")===!1){let Le=!1;for(let lt=0,bt=F.length;lt<bt;lt++){let Mt=F[lt],{object:ut,geometry:Yt,material:ye,group:dn}=Mt;if(ye.side===Ut&&ut.layers.test(k.layers)){let it=ye.side;ye.side=sn,ye.needsUpdate=!0,Iu(ut,G,k,Yt,ye,dn),ye.side=it,ye.needsUpdate=!0,Le=!0}}Le===!0&&(Z.updateMultisampleRenderTarget(xe),Z.updateRenderTargetMipmap(xe))}P.setRenderTarget(ge,Te,Ie),P.setClearColor(st,$e),qe!==void 0&&(k.viewport=qe),P.toneMapping=Ge}function Ca(E,F,G){let k=F.isScene===!0?F.overrideMaterial:null;for(let H=0,xe=E.length;H<xe;H++){let Me=E[H],{object:ge,geometry:Te,group:Ie}=Me,Ge=Me.material;Ge.allowOverride===!0&&k!==null&&(Ge=k),ge.layers.test(G.layers)&&Iu(ge,F,G,Te,Ge,Ie)}}function Iu(E,F,G,k,H,xe){E.onBeforeRender(P,F,G,k,H,xe),E.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),H.onBeforeRender(P,F,G,k,E,xe),H.transparent===!0&&H.side===Ut&&H.forceSinglePass===!1?(H.side=sn,H.needsUpdate=!0,P.renderBufferDirect(G,F,k,H,E,xe),H.side=Nn,H.needsUpdate=!0,P.renderBufferDirect(G,F,k,H,E,xe),H.side=Ut):P.renderBufferDirect(G,F,k,H,E,xe),E.onAfterRender(P,F,G,k,H,xe)}function Pa(E,F,G){F.isScene!==!0&&(F=Wt);let k=V.get(E),H=S.state.lights,xe=S.state.shadowsArray,Me=H.state.version,ge=he.getParameters(E,H.state,xe,F,G,S.state.lightProbeGridArray),Te=he.getProgramCacheKey(ge),Ie=k.programs;k.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?F.environment:null,k.fog=F.fog;let Ge=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;k.envMap=re.get(E.envMap||k.environment,Ge),k.envMapRotation=k.environment!==null&&E.envMap===null?F.environmentRotation:E.envMapRotation,Ie===void 0&&(E.addEventListener("dispose",Vn),Ie=new Map,k.programs=Ie);let qe=Ie.get(Te);if(qe!==void 0){if(k.currentProgram===qe&&k.lightsStateVersion===Me)return Du(E,ge),qe}else ge.uniforms=he.getUniforms(E),L!==null&&E.isNodeMaterial&&L.build(E,G,ge),E.onBeforeCompile(ge,P),qe=he.acquireProgram(ge,Te),Ie.set(Te,qe),k.uniforms=ge.uniforms;let Le=k.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Le.clippingPlanes=Ne.uniform),Du(E,ge),k.needsLights=$p(E),k.lightsStateVersion=Me,k.needsLights&&(Le.ambientLightColor.value=H.state.ambient,Le.lightProbe.value=H.state.probe,Le.directionalLights.value=H.state.directional,Le.directionalLightShadows.value=H.state.directionalShadow,Le.spotLights.value=H.state.spot,Le.spotLightShadows.value=H.state.spotShadow,Le.rectAreaLights.value=H.state.rectArea,Le.ltc_1.value=H.state.rectAreaLTC1,Le.ltc_2.value=H.state.rectAreaLTC2,Le.pointLights.value=H.state.point,Le.pointLightShadows.value=H.state.pointShadow,Le.hemisphereLights.value=H.state.hemi,Le.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Le.spotLightMatrix.value=H.state.spotLightMatrix,Le.spotLightMap.value=H.state.spotLightMap,Le.pointShadowMatrix.value=H.state.pointShadowMatrix),k.lightProbeGrid=S.state.lightProbeGridArray.length>0,k.currentProgram=qe,k.uniformsList=null,qe}function Lu(E){if(E.uniformsList===null){let F=E.currentProgram.getUniforms();E.uniformsList=fr.seqWithValue(F.seq,E.uniforms)}return E.uniformsList}function Du(E,F){let G=V.get(E);G.outputColorSpace=F.outputColorSpace,G.batching=F.batching,G.batchingColor=F.batchingColor,G.instancing=F.instancing,G.instancingColor=F.instancingColor,G.instancingMorph=F.instancingMorph,G.skinning=F.skinning,G.morphTargets=F.morphTargets,G.morphNormals=F.morphNormals,G.morphColors=F.morphColors,G.morphTargetsCount=F.morphTargetsCount,G.numClippingPlanes=F.numClippingPlanes,G.numIntersection=F.numClipIntersection,G.vertexAlphas=F.vertexAlphas,G.vertexTangents=F.vertexTangents,G.toneMapping=F.toneMapping}function Yp(E,F){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;y.setFromMatrixPosition(F.matrixWorld);for(let G=0,k=E.length;G<k;G++){let H=E[G];if(H.texture!==null&&H.boundingBox.containsPoint(y))return H}return null}function Zp(E,F,G,k,H){F.isScene!==!0&&(F=Wt),Z.resetTextureUnits();let xe=F.fog,Me=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?F.environment:null,ge=Q===null?P.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Ye.workingColorSpace,Te=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Ie=re.get(k.envMap||Me,Te),Ge=k.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,qe=!!G.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Le=!!G.morphAttributes.position,lt=!!G.morphAttributes.normal,bt=!!G.morphAttributes.color,Mt=Bn;k.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Mt=P.toneMapping);let ut=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Yt=ut!==void 0?ut.length:0,ye=V.get(k),dn=S.state.lights;if(ke===!0&&(ze===!0||E!==ce)){let mt=E===ce&&k.id===ne;Ne.setState(k,E,mt)}let it=!1;k.version===ye.__version?(ye.needsLights&&ye.lightsStateVersion!==dn.state.version||ye.outputColorSpace!==ge||H.isBatchedMesh&&ye.batching===!1||!H.isBatchedMesh&&ye.batching===!0||H.isBatchedMesh&&ye.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&ye.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&ye.instancing===!1||!H.isInstancedMesh&&ye.instancing===!0||H.isSkinnedMesh&&ye.skinning===!1||!H.isSkinnedMesh&&ye.skinning===!0||H.isInstancedMesh&&ye.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&ye.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&ye.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&ye.instancingMorph===!1&&H.morphTexture!==null||ye.envMap!==Ie||k.fog===!0&&ye.fog!==xe||ye.numClippingPlanes!==void 0&&(ye.numClippingPlanes!==Ne.numPlanes||ye.numIntersection!==Ne.numIntersection)||ye.vertexAlphas!==Ge||ye.vertexTangents!==qe||ye.morphTargets!==Le||ye.morphNormals!==lt||ye.morphColors!==bt||ye.toneMapping!==Mt||ye.morphTargetsCount!==Yt||!!ye.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(it=!0):(it=!0,ye.__version=k.version);let Mn=ye.currentProgram;it===!0&&(Mn=Pa(k,F,H),L&&k.isNodeMaterial&&L.onUpdateProgram(k,Mn,ye));let Gn=!1,wi=!1,Ts=!1,dt=Mn.getUniforms(),St=ye.uniforms;if(M.useProgram(Mn.program)&&(Gn=!0,wi=!0,Ts=!0),k.id!==ne&&(ne=k.id,wi=!0),ye.needsLights){let mt=Yp(S.state.lightProbeGridArray,H);ye.lightProbeGrid!==mt&&(ye.lightProbeGrid=mt,wi=!0)}if(Gn||ce!==E){M.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),dt.setValue(U,"projectionMatrix",E.projectionMatrix),dt.setValue(U,"viewMatrix",E.matrixWorldInverse);let Ri=dt.map.cameraPosition;Ri!==void 0&&Ri.setValue(U,Dt.setFromMatrixPosition(E.matrixWorld)),C.logarithmicDepthBuffer&&dt.setValue(U,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&dt.setValue(U,"isOrthographic",E.isOrthographicCamera===!0),ce!==E&&(ce=E,wi=!0,Ts=!0)}if(ye.needsLights&&(dn.state.directionalShadowMap.length>0&&dt.setValue(U,"directionalShadowMap",dn.state.directionalShadowMap,Z),dn.state.spotShadowMap.length>0&&dt.setValue(U,"spotShadowMap",dn.state.spotShadowMap,Z),dn.state.pointShadowMap.length>0&&dt.setValue(U,"pointShadowMap",dn.state.pointShadowMap,Z)),H.isSkinnedMesh){dt.setOptional(U,H,"bindMatrix"),dt.setOptional(U,H,"bindMatrixInverse");let mt=H.skeleton;mt&&(mt.boneTexture===null&&mt.computeBoneTexture(),dt.setValue(U,"boneTexture",mt.boneTexture,Z))}H.isBatchedMesh&&(dt.setOptional(U,H,"batchingTexture"),dt.setValue(U,"batchingTexture",H._matricesTexture,Z),dt.setOptional(U,H,"batchingIdTexture"),dt.setValue(U,"batchingIdTexture",H._indirectTexture,Z),dt.setOptional(U,H,"batchingColorTexture"),H._colorsTexture!==null&&dt.setValue(U,"batchingColorTexture",H._colorsTexture,Z));let Ai=G.morphAttributes;if((Ai.position!==void 0||Ai.normal!==void 0||Ai.color!==void 0)&&D.update(H,G,Mn),(wi||ye.receiveShadow!==H.receiveShadow)&&(ye.receiveShadow=H.receiveShadow,dt.setValue(U,"receiveShadow",H.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&F.environment!==null&&(St.envMapIntensity.value=F.environmentIntensity),St.dfgLUT!==void 0&&(St.dfgLUT.value=Jy()),wi){if(dt.setValue(U,"toneMappingExposure",P.toneMappingExposure),ye.needsLights&&Kp(St,Ts),xe&&k.fog===!0&&Pe.refreshFogUniforms(St,xe),Pe.refreshMaterialUniforms(St,k,O,N,S.state.transmissionRenderTarget[E.id]),ye.needsLights&&ye.lightProbeGrid){let mt=ye.lightProbeGrid;St.probesSH.value=mt.texture,St.probesMin.value.copy(mt.boundingBox.min),St.probesMax.value.copy(mt.boundingBox.max),St.probesResolution.value.copy(mt.resolution)}fr.upload(U,Lu(ye),St,Z)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(fr.upload(U,Lu(ye),St,Z),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&dt.setValue(U,"center",H.center),dt.setValue(U,"modelViewMatrix",H.modelViewMatrix),dt.setValue(U,"normalMatrix",H.normalMatrix),dt.setValue(U,"modelMatrix",H.matrixWorld),k.uniformsGroups!==void 0){let mt=k.uniformsGroups;for(let Ri=0,ws=mt.length;Ri<ws;Ri++){let Nu=mt[Ri];ee.update(Nu,Mn),ee.bind(Nu,Mn)}}return Mn}function Kp(E,F){E.ambientLightColor.needsUpdate=F,E.lightProbe.needsUpdate=F,E.directionalLights.needsUpdate=F,E.directionalLightShadows.needsUpdate=F,E.pointLights.needsUpdate=F,E.pointLightShadows.needsUpdate=F,E.spotLights.needsUpdate=F,E.spotLightShadows.needsUpdate=F,E.rectAreaLights.needsUpdate=F,E.hemisphereLights.needsUpdate=F}function $p(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return q},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(E,F,G){let k=V.get(E);k.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),V.get(E.texture).__webglTexture=F,V.get(E.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:G,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,F){let G=V.get(E);G.__webglFramebuffer=F,G.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(E,F=0,G=0){Q=E,X=F,q=G;let k=null,H=!1,xe=!1;if(E){let ge=V.get(E);if(ge.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(U.FRAMEBUFFER,ge.__webglFramebuffer),fe.copy(E.viewport),ve.copy(E.scissor),nt=E.scissorTest,M.viewport(fe),M.scissor(ve),M.setScissorTest(nt),ne=-1;return}else if(ge.__webglFramebuffer===void 0)Z.setupRenderTarget(E);else if(ge.__hasExternalTextures)Z.rebindTextures(E,V.get(E.texture).__webglTexture,V.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Ge=E.depthTexture;if(ge.__boundDepthTexture!==Ge){if(Ge!==null&&V.has(Ge)&&(E.width!==Ge.image.width||E.height!==Ge.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(E)}}let Te=E.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(xe=!0);let Ie=V.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ie[F])?k=Ie[F][G]:k=Ie[F],H=!0):E.samples>0&&Z.useMultisampledRTT(E)===!1?k=V.get(E).__webglMultisampledFramebuffer:Array.isArray(Ie)?k=Ie[G]:k=Ie,fe.copy(E.viewport),ve.copy(E.scissor),nt=E.scissorTest}else fe.copy(ie).multiplyScalar(O).floor(),ve.copy(Ae).multiplyScalar(O).floor(),nt=Re;if(G!==0&&(k=W),M.bindFramebuffer(U.FRAMEBUFFER,k)&&M.drawBuffers(E,k),M.viewport(fe),M.scissor(ve),M.setScissorTest(nt),H){let ge=V.get(E.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+F,ge.__webglTexture,G)}else if(xe){let ge=F;for(let Te=0;Te<E.textures.length;Te++){let Ie=V.get(E.textures[Te]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Te,Ie.__webglTexture,G,ge)}}else if(E!==null&&G!==0){let ge=V.get(E.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ge.__webglTexture,G)}ne=-1},this.readRenderTargetPixels=function(E,F,G,k,H,xe,Me,ge=0){if(!(E&&E.isWebGLRenderTarget)){Oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=V.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Me!==void 0&&(Te=Te[Me]),Te){M.bindFramebuffer(U.FRAMEBUFFER,Te);try{let Ie=E.textures[ge],Ge=Ie.format,qe=Ie.type;if(E.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ge),!C.textureFormatReadable(Ge)){Oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!C.textureTypeReadable(qe)){Oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=E.width-k&&G>=0&&G<=E.height-H&&U.readPixels(F,G,k,H,de.convert(Ge),de.convert(qe),xe)}finally{let Ie=Q!==null?V.get(Q).__webglFramebuffer:null;M.bindFramebuffer(U.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(E,F,G,k,H,xe,Me,ge=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=V.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Me!==void 0&&(Te=Te[Me]),Te)if(F>=0&&F<=E.width-k&&G>=0&&G<=E.height-H){M.bindFramebuffer(U.FRAMEBUFFER,Te);let Ie=E.textures[ge],Ge=Ie.format,qe=Ie.type;if(E.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ge),!C.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!C.textureTypeReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Le=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Le),U.bufferData(U.PIXEL_PACK_BUFFER,xe.byteLength,U.STREAM_READ),U.readPixels(F,G,k,H,de.convert(Ge),de.convert(qe),0);let lt=Q!==null?V.get(Q).__webglFramebuffer:null;M.bindFramebuffer(U.FRAMEBUFFER,lt);let bt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await sf(U,bt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Le),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,xe),U.deleteBuffer(Le),U.deleteSync(bt),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,F=null,G=0){let k=Math.pow(2,-G),H=Math.floor(E.image.width*k),xe=Math.floor(E.image.height*k),Me=F!==null?F.x:0,ge=F!==null?F.y:0;Z.setTexture2D(E,0),U.copyTexSubImage2D(U.TEXTURE_2D,G,0,0,Me,ge,H,xe),M.unbindTexture()},this.copyTextureToTexture=function(E,F,G=null,k=null,H=0,xe=0){let Me,ge,Te,Ie,Ge,qe,Le,lt,bt,Mt=E.isCompressedTexture?E.mipmaps[xe]:E.image;if(G!==null)Me=G.max.x-G.min.x,ge=G.max.y-G.min.y,Te=G.isBox3?G.max.z-G.min.z:1,Ie=G.min.x,Ge=G.min.y,qe=G.isBox3?G.min.z:0;else{let St=Math.pow(2,-H);Me=Math.floor(Mt.width*St),ge=Math.floor(Mt.height*St),E.isDataArrayTexture?Te=Mt.depth:E.isData3DTexture?Te=Math.floor(Mt.depth*St):Te=1,Ie=0,Ge=0,qe=0}k!==null?(Le=k.x,lt=k.y,bt=k.z):(Le=0,lt=0,bt=0);let ut=de.convert(F.format),Yt=de.convert(F.type),ye;F.isData3DTexture?(Z.setTexture3D(F,0),ye=U.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Z.setTexture2DArray(F,0),ye=U.TEXTURE_2D_ARRAY):(Z.setTexture2D(F,0),ye=U.TEXTURE_2D),M.activeTexture(U.TEXTURE0),M.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,F.flipY),M.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),M.pixelStorei(U.UNPACK_ALIGNMENT,F.unpackAlignment);let dn=M.getParameter(U.UNPACK_ROW_LENGTH),it=M.getParameter(U.UNPACK_IMAGE_HEIGHT),Mn=M.getParameter(U.UNPACK_SKIP_PIXELS),Gn=M.getParameter(U.UNPACK_SKIP_ROWS),wi=M.getParameter(U.UNPACK_SKIP_IMAGES);M.pixelStorei(U.UNPACK_ROW_LENGTH,Mt.width),M.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Mt.height),M.pixelStorei(U.UNPACK_SKIP_PIXELS,Ie),M.pixelStorei(U.UNPACK_SKIP_ROWS,Ge),M.pixelStorei(U.UNPACK_SKIP_IMAGES,qe);let Ts=E.isDataArrayTexture||E.isData3DTexture,dt=F.isDataArrayTexture||F.isData3DTexture;if(E.isDepthTexture){let St=V.get(E),Ai=V.get(F),mt=V.get(St.__renderTarget),Ri=V.get(Ai.__renderTarget);M.bindFramebuffer(U.READ_FRAMEBUFFER,mt.__webglFramebuffer),M.bindFramebuffer(U.DRAW_FRAMEBUFFER,Ri.__webglFramebuffer);for(let ws=0;ws<Te;ws++)Ts&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,V.get(E).__webglTexture,H,qe+ws),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,V.get(F).__webglTexture,xe,bt+ws)),U.blitFramebuffer(Ie,Ge,Me,ge,Le,lt,Me,ge,U.DEPTH_BUFFER_BIT,U.NEAREST);M.bindFramebuffer(U.READ_FRAMEBUFFER,null),M.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(H!==0||E.isRenderTargetTexture||V.has(E)){let St=V.get(E),Ai=V.get(F);M.bindFramebuffer(U.READ_FRAMEBUFFER,Y),M.bindFramebuffer(U.DRAW_FRAMEBUFFER,z);for(let mt=0;mt<Te;mt++)Ts?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,St.__webglTexture,H,qe+mt):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,St.__webglTexture,H),dt?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ai.__webglTexture,xe,bt+mt):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Ai.__webglTexture,xe),H!==0?U.blitFramebuffer(Ie,Ge,Me,ge,Le,lt,Me,ge,U.COLOR_BUFFER_BIT,U.NEAREST):dt?U.copyTexSubImage3D(ye,xe,Le,lt,bt+mt,Ie,Ge,Me,ge):U.copyTexSubImage2D(ye,xe,Le,lt,Ie,Ge,Me,ge);M.bindFramebuffer(U.READ_FRAMEBUFFER,null),M.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else dt?E.isDataTexture||E.isData3DTexture?U.texSubImage3D(ye,xe,Le,lt,bt,Me,ge,Te,ut,Yt,Mt.data):F.isCompressedArrayTexture?U.compressedTexSubImage3D(ye,xe,Le,lt,bt,Me,ge,Te,ut,Mt.data):U.texSubImage3D(ye,xe,Le,lt,bt,Me,ge,Te,ut,Yt,Mt):E.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,xe,Le,lt,Me,ge,ut,Yt,Mt.data):E.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,xe,Le,lt,Mt.width,Mt.height,ut,Mt.data):U.texSubImage2D(U.TEXTURE_2D,xe,Le,lt,Me,ge,ut,Yt,Mt);M.pixelStorei(U.UNPACK_ROW_LENGTH,dn),M.pixelStorei(U.UNPACK_IMAGE_HEIGHT,it),M.pixelStorei(U.UNPACK_SKIP_PIXELS,Mn),M.pixelStorei(U.UNPACK_SKIP_ROWS,Gn),M.pixelStorei(U.UNPACK_SKIP_IMAGES,wi),xe===0&&F.generateMipmaps&&U.generateMipmap(ye),M.unbindTexture()},this.initRenderTarget=function(E){V.get(E).__webglFramebuffer===void 0&&Z.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Z.setTextureCube(E,0):E.isData3DTexture?Z.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Z.setTexture2DArray(E,0):Z.setTexture2D(E,0),M.unbindTexture()},this.resetState=function(){X=0,q=0,Q=null,M.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}};function zf(s,e=!1){let t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,l=new et,c=0;for(let h=0;h<s.length;++h){let u=s[h],d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(u.morphAttributes[f])}if(e){let f;if(t)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0,u=[];for(let d=0;d<s.length;++d){let f=s[d].index;for(let p=0;p<f.count;++p)u.push(f.getX(p)+h);h+=s[d].attributes.position.count}l.setIndex(u)}for(let h in r){let u=Bf(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in a){let u=a[h][0].length;if(u!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let x=0;x<a[h].length;++x)f.push(a[h][x][d]);let p=Bf(f);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(p)}}}return l}function Bf(s){let e,t,n,i=-1,r=0;for(let c=0;c<s.length;++c){let h=s[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let a=new e(r),o=new Et(a,t,n),l=0;for(let c=0;c<s.length;++c){let h=s[c];if(h.isInterleavedBufferAttribute){let u=l/t;for(let d=0,f=h.count;d<f;d++)for(let p=0;p<t;p++){let x=h.getComponent(d,p);o.setComponent(d+u,p,x)}}else a.set(h.array,l);l+=h.count*t}return i!==void 0&&(o.gpuType=i),o}function Fh(s,e){if(e===fh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===ur||e===pa){let t=s.getIndex();if(t===null){let a=[],o=s.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===ur)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}function kf(s){let e=new Map,t=new Map,n=s.clone();return Hf(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let r=i,a=e.get(i),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Hf(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)Hf(s.children[n],e.children[n],t)}var Fc=class extends $n{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Gh(t)}),this.register(function(t){return new Wh(t)}),this.register(function(t){return new Qh(t)}),this.register(function(t){return new eu(t)}),this.register(function(t){return new tu(t)}),this.register(function(t){return new qh(t)}),this.register(function(t){return new Yh(t)}),this.register(function(t){return new Zh(t)}),this.register(function(t){return new Kh(t)}),this.register(function(t){return new Vh(t)}),this.register(function(t){return new $h(t)}),this.register(function(t){return new Xh(t)}),this.register(function(t){return new Jh(t)}),this.register(function(t){return new jh(t)}),this.register(function(t){return new kh(t)}),this.register(function(t){return new Oc(t,Ke.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Oc(t,Ke.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new nu(t)})}load(e,t,n,i){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=bi.extractUrlBase(e);a=bi.resolveURL(c,this.path)}else a=bi.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new rr(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===qf){try{a[Ke.KHR_BINARY_GLTF]=new iu(e)}catch(u){i&&i(u);return}r=JSON.parse(a[Ke.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new hu(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case Ke.KHR_MATERIALS_UNLIT:a[u]=new Hh;break;case Ke.KHR_DRACO_MESH_COMPRESSION:a[u]=new su(r,this.dracoLoader);break;case Ke.KHR_TEXTURE_TRANSFORM:a[u]=new ru;break;case Ke.KHR_MESH_QUANTIZATION:a[u]=new au;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function Qy(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}function At(s,e,t){let n=s.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var Ke={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},kh=class{constructor(e){this.parser=e,this.name=Ke.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,h=new we(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],en);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Hi(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new na(h),c.distance=u;break;case"spot":c=new ta(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),ni(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}},Hh=class{constructor(){this.name=Ke.KHR_MATERIALS_UNLIT}getMaterialType(){return gt}extendParams(e,t,n){let i=[];e.color=new we(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],en),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,xt))}return Promise.all(i)}},Vh=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=At(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},Gh=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return At(this.parser,e,this.name)!==null?on:null}extendMaterialParams(e,t){let n=At(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new oe(r,r)}return Promise.all(i)}},Wh=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_DISPERSION}getMaterialType(e){return At(this.parser,e,this.name)!==null?on:null}extendMaterialParams(e,t){let n=At(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},Xh=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return At(this.parser,e,this.name)!==null?on:null}extendMaterialParams(e,t){let n=At(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}},qh=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_SHEEN}getMaterialType(e){return At(this.parser,e,this.name)!==null?on:null}extendMaterialParams(e,t){let n=At(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(t.sheenColor=new we(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],en)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,xt)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}},Yh=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return At(this.parser,e,this.name)!==null?on:null}extendMaterialParams(e,t){let n=At(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}},Zh=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_VOLUME}getMaterialType(e){return At(this.parser,e,this.name)!==null?on:null}extendMaterialParams(e,t){let n=At(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new we().setRGB(r[0],r[1],r[2],en),Promise.all(i)}},Kh=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_IOR}getMaterialType(e){return At(this.parser,e,this.name)!==null?on:null}extendMaterialParams(e,t){let n=At(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},$h=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_SPECULAR}getMaterialType(e){return At(this.parser,e,this.name)!==null?on:null}extendMaterialParams(e,t){let n=At(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new we().setRGB(r[0],r[1],r[2],en),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,xt)),Promise.all(i)}},jh=class{constructor(e){this.parser=e,this.name=Ke.EXT_MATERIALS_BUMP}getMaterialType(e){return At(this.parser,e,this.name)!==null?on:null}extendMaterialParams(e,t){let n=At(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}},Jh=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return At(this.parser,e,this.name)!==null?on:null}extendMaterialParams(e,t){let n=At(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}},Qh=class{constructor(e){this.parser=e,this.name=Ke.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},eu=class{constructor(e){this.parser=e,this.name=Ke.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}},tu=class{constructor(e){this.parser=e,this.name=Ke.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}},Oc=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){let f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}},nu=class{constructor(e){this.name=Ke.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let c of i.primitives)if(c.mode!==wn.TRIANGLES&&c.mode!==wn.TRIANGLE_STRIP&&c.mode!==wn.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(let p of u){let x=new Be,g=new T,m=new $t,_=new T(1,1,1),b=new Vt(p.geometry,p.material,d);for(let y=0;y<d;y++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,y),l.SCALE&&_.fromBufferAttribute(l.SCALE,y),b.setMatrixAt(y,x.compose(g,m,_));for(let y in l)if(y==="_COLOR_0"){let w=l[y];b.instanceColor=new Oi(w.array,w.itemSize,w.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&p.geometry.setAttribute(y,l[y]);je.prototype.copy.call(b,p),this.parser.assignFinalMaterial(b),f.push(b)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},qf="glTF",_a=12,Vf={JSON:1313821514,BIN:5130562},iu=class{constructor(e){this.name=Ke.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,_a),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==qf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-_a,r=new DataView(e,_a),a=0;for(;a<i;){let o=r.getUint32(a,!0);a+=4;let l=r.getUint32(a,!0);if(a+=4,l===Vf.JSON){let c=new Uint8Array(e,_a+a,o);this.content=n.decode(c)}else if(l===Vf.BIN){let c=_a+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},su=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ke.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let h in a){let u=cu[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=cu[h]||h.toLowerCase();if(a[h]!==void 0){let d=n.accessors[e.attributes[h]],f=mr[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(let p in f.attributes){let x=f.attributes[p],g=l[p];g!==void 0&&(x.normalized=g)}u(f)},o,c,en,d)})})}},ru=class{constructor(){this.name=Ke.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},au=class{constructor(){this.name=Ke.KHR_MESH_QUANTIZATION}},Bc=class extends Kn{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,p=e*c,x=p-c,g=-2*f+3*d,m=f-d,_=1-g,b=m-d+u;for(let y=0;y!==o;y++){let w=a[x+y+o],S=a[x+y+l]*h,R=a[p+y+o],v=a[p+y]*h;r[y]=_*w+b*S+g*R+m*v}return r}},ev=new $t,ou=class extends Bc{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return ev.fromArray(r).normalize().toArray(r),r}},wn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},mr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Gf={9728:Tt,9729:wt,9984:Vo,9985:cr,9986:_s,9987:zn},Wf={33071:En,33648:Gs,10497:Fi},Oh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},cu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ki={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},tv={CUBICSPLINE:void 0,LINEAR:cs,STEP:os},Bh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function nv(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new tt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Nn})),s.DefaultMaterial}function Ms(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ni(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function iv(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;a.push(d)}if(i){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;o.push(d)}if(r){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],d=c[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function sv(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function rv(s){let e,t=s.extensions&&s.extensions[Ke.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+zh(t.attributes):e=s.indices+":"+zh(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+zh(s.targets[n]);return e}function zh(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function lu(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function av(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var ov=new Be,hu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Qy,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?this.textureLoader=new jr(this.options.manager):this.textureLoader=new ia(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new rr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return Ms(r,o,i),ni(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let a=t[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,h]of a.children.entries())r(h,o.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ke.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,a){n.load(bi.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let a=Oh[i.type],o=mr[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new Et(c,a,l))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],l=Oh[i.type],c=mr[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0,x,g;if(f&&f!==u){let m=Math.floor(d/f),_="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count,b=t.cache.get(_);b||(x=new c(o,m*f,i.count*f/h),b=new $s(x,f/h),t.cache.add(_,b)),g=new js(b,l,d%f/h,p)}else o===null?x=new c(i.count*l):x=new c(o,d,i.count*l),g=new Et(x,l,p);if(i.sparse!==void 0){let m=Oh.SCALAR,_=mr[i.sparse.indices.componentType],b=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,w=new _(a[1],b,i.sparse.count*m),S=new c(a[2],y,i.sparse.count*l);o!==null&&(g=new Et(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let R=0,v=w.length;R<v;R++){let A=w[R];if(g.setX(A,S[R*l]),l>=2&&g.setY(A,S[R*l+1]),l>=3&&g.setZ(A,S[R*l+2]),l>=4&&g.setW(A,S[R*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let i=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let d=(r.samplers||{})[a.sampler]||{};return h.magFilter=Gf[d.magFilter]||wt,h.minFilter=Gf[d.minFilter]||zn,h.wrapS=Wf[d.wrapS]||Fi,h.wrapT=Wf[d.wrapT]||Fi,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Tt&&h.minFilter!==wt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=i.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;let d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let p=d;t.isImageBitmapLoader===!0&&(p=function(x){let g=new Nt(x);g.needsUpdate=!0,d(g)}),t.load(bi.resolveURL(u,r.path),p,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),ni(u,a),u.userData.mimeType=a.mimeType||av(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[Ke.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[Ke.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=r.associations.get(a);a=r.extensions[Ke.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new er,an.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new gn,an.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return tt}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],a,o={},l=r.extensions||{},c=[];if(l[Ke.KHR_MATERIALS_UNLIT]){let u=i[Ke.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,t))}else{let u=r.pbrMetallicRoughness||{};if(o.color=new we(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],en),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,xt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Ut);let h=r.alphaMode||Bh.OPAQUE;if(h===Bh.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Bh.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==gt&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new oe(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==gt&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==gt){let u=r.emissiveFactor;o.emissive=new we().setRGB(u[0],u[1],u[2],en)}return r.emissiveTexture!==void 0&&a!==gt&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,xt)),Promise.all(c).then(function(){let u=new a(o);return r.name&&(u.name=r.name),ni(u,r),t.associations.set(u,{materials:e}),r.extensions&&Ms(i,u,r),u})}createUniqueName(e){let t=ft.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[Ke.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Xf(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],h=rv(c),u=i[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[Ke.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=Xf(new et,c,t),i[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let h=a[l].material===void 0?nv(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,p=h.length;f<p;f++){let x=h[f],g=a[f],m,_=c[f];if(g.mode===wn.TRIANGLES||g.mode===wn.TRIANGLE_STRIP||g.mode===wn.TRIANGLE_FAN||g.mode===void 0)m=r.isSkinnedMesh===!0?new Br(x,_):new be(x,_),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),g.mode===wn.TRIANGLE_STRIP?m.geometry=Fh(m.geometry,pa):g.mode===wn.TRIANGLE_FAN&&(m.geometry=Fh(m.geometry,ur));else if(g.mode===wn.LINES)m=new Yn(x,_);else if(g.mode===wn.LINE_STRIP)m=new pi(x,_);else if(g.mode===wn.LINE_LOOP)m=new hs(x,_);else if(g.mode===wn.POINTS)m=new kr(x,_);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&sv(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),ni(m,r),g.extensions&&Ms(i,m,g),t.assignFinalMaterial(m),u.push(m)}for(let f=0,p=u.length;f<p;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Ms(i,u[0],r),u[0];let d=new Je;r.extensions&&Ms(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,p=u.length;f<p;f++)d.add(u[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Ht(Ze.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new jn(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ni(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),a=i,o=[],l=[];for(let c=0,h=a.length;c<h;c++){let u=a[c];if(u){o.push(u);let d=new Be;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new zr(o,l)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){let f=i.channels[u],p=i.samplers[f.sampler],x=f.target,g=x.node,m=i.parameters!==void 0?i.parameters[p.input]:p.input,_=i.parameters!==void 0?i.parameters[p.output]:p.output;x.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",_)),c.push(p),h.push(x))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){let d=u[0],f=u[1],p=u[2],x=u[3],g=u[4],m=[];for(let b=0,y=d.length;b<y;b++){let w=d[b],S=f[b],R=p[b],v=x[b],A=g[b];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();let P=n._createAnimationTracks(w,S,R,v,A);if(P)for(let I=0;I<P.length;I++)m.push(P[I])}let _=new $r(r,void 0,m);return ni(_,i),_})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));let l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){let h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,ov)});for(let f=0,p=u.length;f<p;f++)h.add(u[f]);if(h.userData.pivot!==void 0&&u.length>0){let f=h.userData.pivot,p=u[0];h.pivot=new T().fromArray(f),h.position.x-=f[0],h.position.y-=f[1],h.position.z-=f[2],p.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(r.isBone===!0?h=new Js:c.length>1?h=new Je:c.length===1?h=c[0]:h=new je,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=a),ni(h,r),r.extensions&&Ms(n,h,r),r.matrix!==void 0){let u=new Be;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){let u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new Je;n.name&&(r.name=i.createUniqueName(n.name)),ni(r,n),n.extensions&&Ms(t,r,n);let a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++){let d=l[h];d.parent!==null?r.add(kf(d)):r.add(d)}let c=h=>{let u=new Map;for(let[d,f]of i.associations)(d instanceof an||d instanceof Nt)&&u.set(d,f);return h.traverse(d=>{let f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){let a=[],o=e.name?e.name:e.uuid,l=[];function c(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}Ki[r.path]===Ki.weights?(c(e),e.isGroup&&e.children.forEach(c)):l.push(o);let h;switch(Ki[r.path]){case Ki.weights:h=yi;break;case Ki.rotation:h=vi;break;case Ki.translation:case Ki.scale:h=ki;break;default:n.itemSize===1?h=yi:h=ki;break}let u=i.interpolation!==void 0?tv[i.interpolation]:cs,d=this._getArrayFromAccessor(n);for(let f=0,p=l.length;f<p;f++){let x=new h(l[f]+"."+Ki[r.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),a.push(x)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=lu(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof vi?ou:Bc;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function cv(s,e,t){let n=e.attributes,i=new It;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new T(l[0],l[1],l[2]),new T(c[0],c[1],c[2])),o.normalized){let h=lu(mr[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new T,l=new T;for(let c=0,h=r.length;c<h;c++){let u=r[c];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],f=d.min,p=d.max;if(f!==void 0&&p!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(p[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(p[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(p[2]))),d.normalized){let x=lu(mr[d.componentType]);l.multiplyScalar(x)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;let a=new jt;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function Xf(s,e,t){let n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){s.setAttribute(o,l)})}for(let a in n){let o=cu[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){let a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return Ye.workingColorSpace!==en&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ye.workingColorSpace}" not supported.`),ni(s,e),cv(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?iv(s,e.targets,t):s})}var Yf={type:"change"},du={type:"start"},Kf={type:"end"},zc=new qn,Zf=new Sn,lv=Math.cos(70*Ze.DEG2RAD),Bt=new T,hn=2*Math.PI,ht={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},uu=1e-6,kc=class extends ra{constructor(e,t=null){super(e,t),this.state=ht.NONE,this.target=new T,this.cursor=new T,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Vi.ROTATE,MIDDLE:Vi.DOLLY,RIGHT:Vi.PAN},this.touches={ONE:Gi.ROTATE,TWO:Gi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new T,this._lastQuaternion=new $t,this._lastTargetPosition=new T,this._quat=new $t().setFromUnitVectors(e.up,new T(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ar,this._sphericalDelta=new ar,this._scale=1,this._panOffset=new T,this._rotateStart=new oe,this._rotateEnd=new oe,this._rotateDelta=new oe,this._panStart=new oe,this._panEnd=new oe,this._panDelta=new oe,this._dollyStart=new oe,this._dollyEnd=new oe,this._dollyDelta=new oe,this._dollyDirection=new T,this._mouse=new oe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=uv.bind(this),this._onPointerDown=hv.bind(this),this._onPointerUp=dv.bind(this),this._onContextMenu=yv.bind(this),this._onMouseWheel=mv.bind(this),this._onKeyDown=gv.bind(this),this._onTouchStart=xv.bind(this),this._onTouchMove=_v.bind(this),this._onMouseDown=fv.bind(this),this._onMouseMove=pv.bind(this),this._interceptControlDown=vv.bind(this),this._interceptControlUp=Mv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Yf),this.update(),this.state=ht.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Bt.copy(t).sub(this.target),Bt.applyQuaternion(this._quat),this._spherical.setFromVector3(Bt),this.autoRotate&&this.state===ht.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=hn:n>Math.PI&&(n-=hn),i<-Math.PI?i+=hn:i>Math.PI&&(i-=hn),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Bt.setFromSpherical(this._spherical),Bt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Bt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Bt.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new T(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new T(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Bt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(zc.origin.copy(this.object.position),zc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(zc.direction))<lv?this.object.lookAt(this.target):(Zf.setFromNormalAndCoplanarPoint(this.object.up,this.target),zc.intersectPlane(Zf,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>uu||8*(1-this._lastQuaternion.dot(this.object.quaternion))>uu||this._lastTargetPosition.distanceToSquared(this.target)>uu?(this.dispatchEvent(Yf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?hn/60*this.autoRotateSpeed*e:hn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Bt.setFromMatrixColumn(t,0),Bt.multiplyScalar(-e),this._panOffset.add(Bt)}_panUp(e,t){this.screenSpacePanning===!0?Bt.setFromMatrixColumn(t,1):(Bt.setFromMatrixColumn(t,0),Bt.crossVectors(this.object.up,Bt)),Bt.multiplyScalar(e),this._panOffset.add(Bt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let i=this.object.position;Bt.copy(i).sub(this.target);let r=Bt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),i=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=i/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(hn*this._rotateDelta.x/t.clientHeight),this._rotateUp(hn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(hn*this._rotateDelta.x/t.clientHeight),this._rotateUp(hn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new oe,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function hv(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function uv(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function dv(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Kf),this.state=ht.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function fv(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Vi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=ht.DOLLY;break;case Vi.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=ht.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=ht.ROTATE}break;case Vi.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=ht.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=ht.PAN}break;default:this.state=ht.NONE}this.state!==ht.NONE&&this.dispatchEvent(du)}function pv(s){switch(this.state){case ht.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case ht.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case ht.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function mv(s){this.enabled===!1||this.enableZoom===!1||this.state!==ht.NONE||(s.preventDefault(),this.dispatchEvent(du),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(Kf))}function gv(s){this.enabled!==!1&&this._handleKeyDown(s)}function xv(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Gi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=ht.TOUCH_ROTATE;break;case Gi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=ht.TOUCH_PAN;break;default:this.state=ht.NONE}break;case 2:switch(this.touches.TWO){case Gi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=ht.TOUCH_DOLLY_PAN;break;case Gi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=ht.TOUCH_DOLLY_ROTATE;break;default:this.state=ht.NONE}break;default:this.state=ht.NONE}this.state!==ht.NONE&&this.dispatchEvent(du)}function _v(s){switch(this._trackPointer(s),this.state){case ht.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case ht.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case ht.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case ht.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=ht.NONE}}function yv(s){this.enabled!==!1&&s.preventDefault()}function vv(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Mv(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var ya=class extends je{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new oe(.5,.5),this.addEventListener("removed",function(){this.traverse(function(t){t.element&&t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this}},gr=new T,$f=new Be,jf=new Be,Jf=new T,Qf=new T,Hc=class{constructor(e={}){let t=this,n,i,r,a,o={objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.sortObjects=!0,this.getSize=function(){return{width:n,height:i}},this.render=function(p,x){p.matrixWorldAutoUpdate===!0&&p.updateMatrixWorld(),x.parent===null&&x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),$f.copy(x.matrixWorldInverse),jf.multiplyMatrices(x.projectionMatrix,$f),h(p,p,x),this.sortObjects&&f(p)},this.setSize=function(p,x){n=p,i=x,r=n/2,a=i/2,l.style.width=p+"px",l.style.height=x+"px"};function c(p){p.isCSS2DObject&&(p.element.style.display="none");for(let x=0,g=p.children.length;x<g;x++)c(p.children[x])}function h(p,x,g){if(p.visible===!1){c(p);return}if(p.isCSS2DObject){gr.setFromMatrixPosition(p.matrixWorld),gr.applyMatrix4(jf);let m=gr.z>=-1&&gr.z<=1&&p.layers.test(g.layers)===!0,_=p.element;_.style.display=m===!0?"":"none",m===!0&&(p.onBeforeRender(t,x,g),_.style.transform="translate("+-100*p.center.x+"%,"+-100*p.center.y+"%)translate("+(gr.x*r+r)+"px,"+(-gr.y*a+a)+"px)",_.parentNode!==l&&l.appendChild(_),p.onAfterRender(t,x,g));let b={distanceToCameraSquared:u(g,p)};o.objects.set(p,b)}for(let m=0,_=p.children.length;m<_;m++)h(p.children[m],x,g)}function u(p,x){return Jf.setFromMatrixPosition(p.matrixWorld),Qf.setFromMatrixPosition(x.matrixWorld),Jf.distanceToSquared(Qf)}function d(p){let x=[];return p.traverseVisible(function(g){g.isCSS2DObject&&x.push(g)}),x}function f(p){let x=d(p).sort(function(m,_){if(m.renderOrder!==_.renderOrder)return _.renderOrder-m.renderOrder;let b=o.objects.get(m).distanceToCameraSquared,y=o.objects.get(_).distanceToCameraSquared;return b-y}),g=x.length;for(let m=0,_=x.length;m<_;m++)x[m].element.style.zIndex=g-m}}};function va(s,e=1.05,t=.86){let n=s.minX-e,i=s.maxX+e,r=s.minZ-e,a=s.maxZ+e,o=t,l=o*.5522847498,c=(f,p)=>new T(f,.145,p),h=new xi,u=(f,p)=>h.add(new Xt(c(...f),c(...p))),d=(f,p,x,g)=>h.add(new Fn(c(...f),c(...p),c(...x),c(...g)));return u([n+o,r],[i-o,r]),d([i-o,r],[i-o+l,r],[i,r+o-l],[i,r+o]),u([i,r+o],[i,a-o]),d([i,a-o],[i,a-o+l],[i-o+l,a],[i-o,a]),u([i-o,a],[n+o,a]),d([n+o,a],[n+o-l,a],[n,a-o+l],[n,a-o]),u([n,a-o],[n,r+o]),d([n,r+o],[n,r+o-l],[n+o-l,r],[n+o,r]),h}function $i(s,e,t,n=1.72,i=n){s.updateMatrixWorld(!0);let r;s.traverse(w=>{w.isMesh&&!r&&(r=w)});let a=r.geometry.index?r.geometry.toNonIndexed():r.geometry.clone();a.applyMatrix4(r.matrixWorld),a.computeBoundingBox();let o=a.boundingBox,l=o.max.x-o.min.x,c=(o.max.z+o.min.z)/2,h=o.max.z-o.min.z,u=a.getAttribute("position"),d=a.getAttribute("uv"),f=a.getAttribute("normal"),p=[],x=[],g=[],m=Math.max(1,Math.ceil(t/i)),_=t/m;for(let w=0;w<m;w++)for(let S=0;S<u.count;S+=3)if(!(Math.abs(f.getX(S))>.99&&Math.abs(f.getX(S+1))>.99&&Math.abs(f.getX(S+2))>.99))for(let R=0;R<3;R++){let v=S+R,A=(w+(u.getX(v)-o.min.x)/l)*_,P=e(A),I=e(Math.min(t,A+.005)).sub(e(Math.max(0,A-.005))).normalize(),L=new T(-I.z,0,I.x);P.addScaledVector(L,(u.getZ(v)-c)/h*n),P.y+=(u.getY(v)-o.min.y)/h*n,p.push(P.x,P.y,P.z);let W=I.clone().multiplyScalar(f.getX(v)).addScaledVector(L,f.getZ(v));W.y=f.getY(v),W.normalize(),g.push(W.x,W.y,W.z),x.push(d.getX(v),d.getY(v))}a.dispose();let b=new et;b.setAttribute("position",new Ue(p,3)),b.setAttribute("normal",new Ue(g,3)),b.setAttribute("uv",new Ue(x,2)),b.computeBoundingSphere();let y=new be(b,r.material);return y.name="continuous-authored-road",y.receiveShadow=!0,y}var fu=.72;function Vc(s,e,t,{phase:n=0}={}){let i=new Je;i.name="continuous-rail-corridor";let r=Math.max(2,Math.ceil((t-e)/.6)),a=[[],[],[]],o=[],l=[[],[],[]];for(let p=0;p<=r;p++){let x=Ze.lerp(e,t,p/r),g=s(x),m=s(x+.005).sub(s(x-.005)).normalize(),_=new T(-m.z,0,m.x);for(let b=0;b<3;b++){let y=b===0?0:b===1?-.43:.43,w=b===0?.74:.055,S=b===0?0:.11;for(let R of[-w,w]){let v=g.clone().addScaledVector(_,y+R);v.y+=S,a[b].push(v.x,v.y,v.z),l[b].push(0,1,0)}}if(p<r){let b=p*2;o.push(b,b+1,b+2,b+1,b+3,b+2)}}let c=[new tt({color:7630947,roughness:1}),new tt({color:3423037,metalness:.35,roughness:.55})];for(let p of c)p.userData.streamOwned=!0;a.forEach((p,x)=>{let g=new et;g.setAttribute("position",new Ue(p,3)),g.setAttribute("normal",new Ue(l[x],3)),g.setIndex(o);let m=new be(g,c[x?1:0]);m.receiveShadow=!0,i.add(m)});let h=Math.ceil((e+n)/fu),u=Math.ceil((t+n)/fu),d=new Vt(new _t(1.26,.08,.16),new tt({color:9069895,roughness:1}),Math.max(0,u-h));d.material.userData.streamOwned=!0;let f=new je;for(let p=h;p<u;p++){let x=p*fu-n,g=s(x),m=s(x+.005).sub(s(x-.005));f.position.copy(g),f.position.y+=.055,f.rotation.y=Math.atan2(m.x,m.z),f.updateMatrix(),d.setMatrixAt(p-h,f.matrix)}return d.receiveShadow=!0,i.add(d),i}var bs=Object.freeze({x:-6.97,z:-6.97}),ep=[-6.97,0,6.97].flatMap(s=>[-6.97,0,6.97].map(e=>({x:s,z:e,key:`${s}:${e}`})));function pu(s){let e=(s%18+18)%18;return e<6?{x:"green",z:"red"}:e<8?{x:"amber",z:"red"}:e<9?{x:"red",z:"red"}:e<15?{x:"red",z:"green"}:e<17?{x:"red",z:"amber"}:{x:"red",z:"red"}}function ii(s,e){let t=s.curve.getLength(),n=s.once?Ze.clamp(e/t,0,.999999):(e/t%1+1)%1,i=s.curve.getPointAt(n),r=s.curve.getTangentAt(Math.min(.999999,n));return s.speed<0&&r.negate(),{x:i.x,z:i.z,dx:r.x,dz:r.z,halfLength:(s.bodyLength??1.5)/2,halfWidth:(s.bodyWidth??.7)/2}}function xr(s,e,t=.04){let n=[[s.dx,s.dz],[-s.dz,s.dx],[e.dx,e.dz],[-e.dz,e.dx]];for(let[i,r]of n){let a=o=>Math.abs(o.dx*i+o.dz*r)*o.halfLength+Math.abs(-o.dz*i+o.dx*r)*o.halfWidth;if(Math.abs((s.x-e.x)*i+(s.z-e.z)*r)>=a(s)+a(e)+t)return!1}return!0}function mu(s,e=.42){let t=Array.from({length:Math.max(100,Math.ceil(s.getLength()*4))},(i,r)=>r),n=t.length;return new xn(t.map(i=>{let r=i/(n-1),a=s.getPointAt(r),o=s.getTangentAt(Math.min(r,.999999));return a.addScaledVector(new T(-o.z,0,o.x).normalize(),e)}),!1,"centripetal")}function tp(s,e,t,n=[]){let i=[];for(let c of s){if(c.cityDistance===void 0){let h=c.curve.getLength();for(let u=0;u<100;u++){let d=(c.offset*h+u*h/100)%h,f=ii(c,d);if(ep.every(p=>Math.hypot(f.x-p.x,f.z-p.z)>2.3)&&i.every(p=>!xr(f,ii(p,p.cityDistance),.12))){c.cityDistance=d;break}}}c.cityDistance!==void 0&&i.push(c)}let r=pu(t),a=new Map(i.map(c=>[c,ii(c,c.cityDistance)])),o=new Map,l=new Map;for(let c of i){let h=a.get(c);if(c.junction){let x=Math.hypot(h.x-c.junction.x,h.z-c.junction.z);x<1.7&&(c.enteredJunction=!0),c.enteredJunction&&x>2.45||!c.enteredJunction&&x>4.2?(c.junction=null,c.enteredJunction=!1):o.set(c.junction.key,c)}let u=Math.abs(h.dx)>Math.abs(h.dz)?"x":"z",d=u==="x"?"z":"x",f=Math.sign(u==="x"?h.dx:h.dz),p=ep.map(x=>({...x,axis:u,along:(h[u]-x[u])*f,across:Math.abs(h[d]-x[d])})).filter(x=>x.along<-.9&&x.along>-3.7&&x.across<1.05).sort((x,g)=>g.along-x.along)[0];p&&l.set(c,p)}for(let c of[...i].sort((h,u)=>+!!u.once-+!!h.once)){let h=l.get(c);!h||c.junction||o.has(h.key)||h.x===bs.x&&h.z===bs.z&&r[h.axis]!=="green"||(c.junction=h,c.enteredJunction=!1,o.set(h.key,c))}for(let c of i){c.reverseRemaining>0&&t>(c.recoveryUntil??1/0)&&(c.reverseRemaining=0,c.yieldUntil=t+1,c.blockedSeconds=0);let h=c.cityDistance,u=a.get(c),d=Math.abs(u.dx)>Math.abs(u.dz)?"x":"z",f=d==="x"?"z":"x",p=d==="x"?u.dx:u.dz,x=(u[d]-bs[d])*Math.sign(p),g=Math.abs(u[f]-bs[f]),m=Math.min(e,.05)*(c.cruiseSpeed??.9)*Math.sign(c.speed);c.reverseRemaining>0?m=-Math.sign(c.speed)*Math.min(c.reverseRemaining,Math.min(e,.05)*.6):(c.yieldUntil??0)>t&&(m=0);let _=l.get(c);if(_&&o.get(_.key)!==c&&!(c.reverseRemaining>0)&&(m=Math.sign(m)*Math.min(Math.abs(m),Math.max(0,-2.45-_.along))),!(c.reverseRemaining>0)&&g<1.1&&x<-1.25&&x>-3&&r[d]!=="green"){let R=Math.max(0,-1.25-x-u.halfLength);m=Math.sign(m)*Math.min(Math.abs(m),R)}let b=c.once?Math.min(c.curve.getLength()-.001,h+m):h+m,y=[...n,...i.filter(R=>R!==c).map(R=>a.get(R))],w=[.5,1].map(R=>ii(c,h+(b-h)*R)),S=w.every(R=>y.every(v=>!xr(R,v)));S&&(c.cityDistance=b,a.set(c,w[1]),c.reverseRemaining>0&&(c.reverseRemaining-=Math.abs(m),c.reverseRemaining<.001&&(c.reverseRemaining=0,c.yieldUntil=t+2))),c.blockedSeconds=S?0:(c.blockedSeconds??0)+e,c.waiting=!S||Math.abs(m)<1e-6}if(!i.some(c=>c.reverseRemaining>0||(c.yieldUntil??0)>t))for(let c of[...i].reverse()){if(c.once||!(c.blockedSeconds>2)||t-(c.lastRecovered??-1/0)<8)continue;let h=ii(c,c.cityDistance-Math.sign(c.speed)*.05);if(i.every(u=>u===c||!xr(h,a.get(u)))){c.reverseRemaining=.9,c.blockedSeconds=0,c.recoveryUntil=t+3,c.lastRecovered=t;break}}}var sp=Object.freeze(Array.from({length:14},(s,e)=>{let t=15.7/1.49**e,n=e<2?[2.65,1.9][e]:2.6+Math.sin(e*2.399963)*.45,i=Math.PI*2/t;return Object.freeze({k:i,amplitude:.115/1.53**e,dx:Math.cos(n),dz:Math.sin(n),omega:Math.sqrt(2.1*i),phase:e*2.399963})})),rp=Object.freeze({vertexIterations:8,fragmentIterations:14});function si(s,e){return e+Math.sin(s*.042+.42)*.66+Math.sin(s*.119-.8)*.3}var np=`
  uniform float uShoreX;
  float coastX(float z) { return uShoreX + sin(z * 0.042 + 0.42) * 0.66 + sin(z * 0.119 - 0.8) * 0.3; }
`,bv=sp.map((s,e)=>`
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
`),ip=`
  vec3 sampleOcean(vec2 p, float time, float pixelWidth) {
    vec3 result = vec3(0.0);
    ${bv}
    float distance = p.x - coastX(p.y);
    float blend = clamp(distance / 4.0, 0.0, 1.0);
    float envelope = blend * blend * (3.0 - 2.0 * blend);
    float derivative = (distance > 0.0 && distance < 4.0) ? 6.0 * blend * (1.0 - blend) / 4.0 : 0.0;
    float coastSlope = 0.66 * 0.042 * cos(p.y * 0.042 + 0.42) + 0.3 * 0.119 * cos(p.y * 0.119 - 0.8);
    return vec3(result.x * envelope, result.yz * envelope + result.x * derivative * vec2(1.0, -coastSlope));
  }
`;function Ma(s,e,t=0,n=8,i=-1/0){let r=0;for(let o of sp.slice(0,n))r+=o.amplitude*Math.sin((s*o.dx+e*o.dz)*o.k-t*o.omega+o.phase);let a=Ze.clamp((s-si(e,i))/4,0,1);return a===0?0:r*a*a*(3-2*a)}function ap(s){return new nn({uniforms:{uTime:{value:0},uShoreX:{value:s},uDetail:{value:14},uViewDirection:{value:new T(-1,1,-1).normalize()},uSunDirection:{value:new T(-18,31,20).normalize()}},vertexShader:`
      uniform float uTime;
      varying vec3 vWorldPosition;
      ${np}
      #define OCEAN_WAVE_COUNT 8
      ${ip}
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
      ${np}
      #define WATER_FRAGMENT
      #define OCEAN_WAVE_COUNT 14
      ${ip}
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
    `})}var xu=Ze.clamp,Ei=Ze.lerp,gu=120;function Sv(s,e){return new class extends tn{getPoint(t,n=new T){let i=Ei(s.z-62,s.z-1.8,t),r=s.x+2.6-si(s.z-1.8,e);return n.set(si(i,e)+Ei(4.4,r,qt(t,.65,1)),.02,i)}}}function qt(s,e,t){let n=xu((s-e)/(t-e),0,1);return n*n*(3-2*n)}function Ev(s){let e=(s%gu+gu)%gu;return{t:e,phase:e<24?"arriving":e<46?"unloading":e<74?"delivering":e<106?"returning":"waiting",inbound:qt(e,0,24),outbound:qt(e,50,80),lift:qt(e,26,32),swing:qt(e,32,39),lower:qt(e,39,45),truckOut:qt(e,48,69),truckBack:qt(e,78,100)}}function op(s,e,t,n=0){let r=e/1.2,a=8+r,o=((s+n*a)%a+a)%a,l=xu((o-8)/r,0,1);return{distance:(t+(.5-.5*Math.cos(l*Math.PI))*e)%e,dwelling:o<8,dwellProgress:xu(o/8,0,1),travelTime:Math.max(0,o-8),period:a}}function cp(s,e){s.traverse(t=>{if(!t.isMesh)return;let n=(Array.isArray(t.material)?t.material:[t.material]).map(i=>{let r=i.clone();return delete r.userData.deployManagerSharedAsset,r.onBeforeCompile=a=>{a.uniforms.cityDusk=e,a.fragmentShader=`uniform float cityDusk;
`+a.fragmentShader,a.fragmentShader=a.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
          float windowMask = step(diffuseColor.r * 1.12, diffuseColor.b) * step(diffuseColor.g * 0.95, diffuseColor.b) * (1.0-step(0.32,max(diffuseColor.r,max(diffuseColor.g,diffuseColor.b))));
          totalEmissiveRadiance += vec3(0.65,0.28,0.055) * windowMask * cityDusk;
        `)},r.customProgramCacheKey=()=>"village-windows-v1",r});t.material=Array.isArray(t.material)?n:n[0]})}function lp(s){let e=new Je;e.name="service-unavailable-barrier";let t=new tt({color:14120765,roughness:1});for(let i of[-.65,.65]){let r=new be(new gi(.14,.42,5),t);r.position.set(i,.21,-2.12),e.add(r)}let n=new be(new _t(1.15,.18,.07),new tt({color:15655087}));n.position.set(0,.32,-2.12),e.add(n);for(let i=0;i<4;i++){let r=new be(new _t(.12,.18,.075),t);r.position.set(-.42+i*.28,.32,-2.12),r.rotation.z=-.35,e.add(r)}e.visible=!1,s.add(e),s.userData.healthBarrier=e}async function hp(s,e,t,n){let[i,r]=await Promise.all([s.cloneAsset("watercraft/fishing",{width:.85,depth:1.85,height:1.1}),s.cloneAsset("cars/delivery",{width:.68,depth:1.4,height:.8})]);if(n!==s.worldGeneration)return;let a=new Je;a.name="ambient-port-shift",e.add(a),s.storyActors.push(a),a.add(i,r);let o=new tt({color:15054415,roughness:.85}),l=new Je;l.position.set(t.x-.1,0,t.z-1.8),a.add(l);let c=new be(new _t(4,.12,.12),o);c.position.set(1.2,3,0),l.add(c);let h=new be(new _t(.48,.36,.35),new tt({color:5138791}));h.position.set(-.5,2.85,0),l.add(h);let u=new be(new Zn(.014,.014,1,5),new tt({color:4017997}));a.add(u);let d=new be(new _t(.4,.38,.4),new tt({color:12158280}));a.add(d);let f=new Je,p=new be(new us(.065,.17,2,5),new tt({color:14791244}));p.position.y=.2,f.add(p);let x=new be(new On(.066,6,4),new tt({color:13738362}));x.position.y=.4,f.add(x),a.add(f);let g=Sv(t,s.perimeter.coast.shoreX);s.portLife={actors:a,boat:i,truck:r,boom:l,cable:u,crate:d,courier:f,route:g,harbor:t}}function up(s,e,t){if(!s)return;let{boat:n,truck:i,boom:r,cable:a,crate:o,courier:l,route:c,harbor:h}=s,u=Ev(e),d=u.t<50?u.inbound:1-u.outbound,f=c.getPointAt(d),p=c.getTangentAt(Math.min(.9999,d));n.position.copy(f),n.position.y+=t(f.x,f.z,e),n.rotation.y=Math.atan2(p.x,p.z)+(u.t>=50?Math.PI:0);let x=Ei(h.x-2.55,-11,u.t<74?u.truckOut:1-u.truckBack);if(i.position.set(x,.2,h.z+(u.t>=78&&u.t<100?.42:-.42)),i.rotation.y=u.t>=78&&u.t<100?Math.PI/2:-Math.PI/2,u.t>=74&&u.t<78){let b=(u.t-74)/4;i.position.set(-11-.8*Math.sin(b*Math.PI),.2,h.z-.42*Math.cos(b*Math.PI)),i.rotation.y=Math.atan2(-.8*Math.cos(b*Math.PI),.42*Math.sin(b*Math.PI))}if(u.t>=100&&u.t<106){let b=qt(u.t,100,106);i.position.set(h.x-2.55+.8*Math.sin(b*Math.PI),.2,h.z+.42*Math.cos(b*Math.PI)),i.rotation.y=Math.atan2(.8*Math.cos(b*Math.PI),-.42*Math.sin(b*Math.PI))}i.position.y+=.17*qt(i.position.x,h.x-2.5,h.x-1.5);let g=new T(h.x-2.55,.96,h.z-.42),m=new T(h.x+2.6,.93,h.z-1.8),_=m.clone().lerp(g,u.swing);_.y=Ei(.93,2.55,u.lift)-u.lower*1.59,u.t<26&&(_.y=Ei(2.55,.93,qt(u.t,24,26))),u.t>=46&&(_.y=Ei(.96,2.55,qt(u.t,46,48))),u.t>=48&&_.lerp(m.clone().setY(2.55),qt(u.t,48,56)),r.rotation.y=-Math.atan2(_.z-r.position.z,_.x-r.position.x),a.position.set(_.x,(3+_.y)/2,_.z),a.scale.y=3-_.y,o.visible=u.t<110,u.t<26?o.position.copy(n.position).add(new T(0,.72,0)):u.t<46?o.position.copy(_).add(new T(0,-.19,0)):u.t<70?o.position.copy(i.position).add(new T(0,.57,0)):o.position.set(Ei(-11,-11.6,qt(u.t,70,74)),Ei(.77,.35,qt(u.t,70,74)),Ei(h.z-.42,h.z+2.7,qt(u.t,70,74))),l.visible=u.t>=70&&u.t<78,l.position.set(o.position.x+.2,.18,o.position.z),l.scale.setScalar(1-qt(u.t,76,78)),s.phase=u.phase}function dp(s,e,t){let n=new et;n.setAttribute("position",new Ue([0,0,0,.32,.04,-.04,.1,0,.12],3)),n.computeVertexNormals();let i=new Vt(n,new gt({color:16249048,side:Ut}),12);i.boundingSphere=new jt(new T(t.x+4,6.6,t.z-4),7),i.name="harbor-gulls",e.add(i),s.storyActors.push(i),s.gulls={wings:i,harbor:t}}function fp(s,e){if(!s)return;let t=new je,n=s.harbor;for(let i=0;i<6;i++)for(let r=0;r<2;r++){let a=e*(.065+i*.004)+i*1.17,o=3+i*.4;t.position.set(n.x+4+Math.cos(a)*o,6+i*.24+Math.sin(a*2)*.3,n.z-4+Math.sin(a)*o),t.rotation.set(0,-a,Math.sin(e*3+i)*.24*(r?1:-1)),t.scale.set(r?-1:1,1,1),t.updateMatrix(),s.wings.setMatrixAt(i*2+r,t.matrix)}s.wings.instanceMatrix.needsUpdate=!0}var Tv=Object.freeze({"suburban/building-a":{offset:0,kind:"path"},"suburban/building-b":{offset:.18,kind:"driveway"},"suburban/building-d":{offset:-.16,kind:"driveway"},"suburban/building-e":{offset:0,kind:"path"},"suburban/building-h":{offset:0,kind:"path"},"suburban/building-r":{offset:0,kind:"path"}});function pp(s,e,t){let n=Tv[s.key]??{offset:0,kind:"path"},i=Math.sign(e-s.z),r={x:s.x+n.offset*(t.max.x-t.min.x)*Math.cos(s.rotation),z:i>0?t.max.z+.025:t.min.z-.025},a={x:-11.5,z:e,radius:1.65},o;if(s.x<-10.5){let l=r.x-a.x,c=r.z-a.z,h=Math.hypot(l,c);o={x:a.x+l/h*a.radius,z:a.z+c/h*a.radius}}else o={x:r.x,z:e-i*.86};return{start:r,end:o,kind:n.kind,width:n.kind==="driveway"?.95:.42}}function _u(s,e){let{bounds:t,rail:n,highway:i}=s,r=t.maxZ+9,o={x:(p=>e.getPoint(Ze.clamp((p-s.coast.minZ)/s.coast.length,0,1)).x)(r),z:r,width:5.4,depth:9.8},l=[[0,t.maxZ],[0,r]],c=[-8,-3.7,4.2,8.4].map((p,x)=>({x:p,z:r+(x<2?-3.2:3.3),radius:2.25,key:["suburban/building-b","suburban/building-d","suburban/building-e","suburban/building-a"][x],rotation:x<2?0:Math.PI}));c.push({x:-12,z:r-4,radius:2.25,key:"suburban/building-h",rotation:0},{x:-12,z:r+4.2,radius:2.25,key:"suburban/building-r",rotation:Math.PI},{x:-7.6,z:r+4.2,radius:2.25,key:"suburban/building-b",rotation:Math.PI});let h=[[-11.5,r],[o.x-2.8,r]],u={x:n.x+1.6,z:0,radius:1,length:10.5},d=t.minX-2.4,f=[[[u.x+.55,-3],[d,-3],[d,r],[-13.4,r]],[[-9.9,r-1.14],[o.x-2.8,r-1.14]],[[-9.9,r+1.14],[o.x-2.8,r+1.14]]];return{harbor:o,houses:c,station:u,walks:f,roads:[l,h,[[0,i.z],[0,t.minZ]]],pads:[...c,...[-4,0,4].map(p=>({x:u.x,z:p,radius:1})),{x:-11.5,z:r,radius:2},{x:o.x-1.65,z:o.z,radius:4.8}]}}function ba(s,e,t){return t?Math.min(...t.pads.map(n=>Math.hypot(s-n.x,e-n.z)-n.radius)):1/0}function mp(s,e){if(!s.length||e<=0)return;let t=s.map(n=>{let i=n.curve.getLength(),r=n.distance??n.offset*i,a=Math.sign(n.speed),o=i;for(let c of s){if(n===c)continue;let h=(a*((c.distance??c.offset*i)-r)%i+i)%i;o=Math.min(o,Math.max(0,h-(n.vehicleLength+c.vehicleLength)/2-.55))}let l=Math.min(n.cruiseSpeed*Math.min(e,.1),o);return((r+a*l)%i+i)%i});s.forEach((n,i)=>{n.distance=t[i]})}async function gp(s,e,{heightAt:t,siteDistance:n}){let i=new Je;i.name="coastal-region-scenery",s.world.add(i);let r=s.regionalPlan,{harbor:a,station:o}=r,l=new Map,c=N=>(l.has(N)||l.set(N,new tt({color:N,roughness:.9})),l.get(N)),h=(N,O,te,se,ie,Ae,Re,De,ke=0)=>{let ze=new be(new _t(ie,Ae,Re),c(De));return ze.name=N,ze.position.set(O,te,se),ze.rotation.y=ke,ze.castShadow=Ae>.15,ze.receiveShadow=!0,i.add(ze),ze},u=(N,O,te,se)=>{let ie=new T().subVectors(O,N),Ae=new be(new Zn(te,te,ie.length(),6),c(se));return Ae.position.copy(N).add(O).multiplyScalar(.5),Ae.quaternion.setFromUnitVectors(new T(0,1,0),ie.normalize()),Ae.castShadow=!0,i.add(Ae),Ae},d=(N,O=.15)=>new xn(N.map(([te,se])=>new T(te,O,se)),!1,"centripetal"),f=(N,O,te,se=.15)=>{for(let ie=1;ie<N.length;ie+=1){let[Ae,Re]=N[ie-1],[De,ke]=N[ie];h("regional-road",(Ae+De)/2,se,(Re+ke)/2,O,.07,Math.hypot(De-Ae,ke-Re)+O,te,Math.atan2(De-Ae,ke-Re))}},p=(N,O,te,se,ie=.16)=>h("private-frontage",(N.x+O.x)/2,ie,(N.z+O.z)/2,te,.04,Math.hypot(O.x-N.x,O.z-N.z),se,Math.atan2(O.x-N.x,O.z-N.z)),x=[],g=(N,O,te,se,ie,Ae,Re,De=0)=>{let ke=s.cloneAsset(N,{width:ie,depth:Ae,height:Re}).then(ze=>e!==s.worldGeneration?null:(ze.position.set(O,te,se),ze.rotation.y=De,ze.name=`regional:${N}`,i.add(ze),ze));return x.push(ke),ke},m=new Vt(new _t(.06,.4,.06),c(11452084),240);m.name="highway-guardrail-posts";let _=new je,b=0;for(let N of[-1.22,1.22]){let O=[],te=()=>{if(O.length>1){let se=new be(new Zr(new xn(O),O.length*2,.045,4,!1),c(12964033));se.name="continuous-highway-guardrail",i.add(se)}O=[]};for(let se=0;se<=230;se+=1){let ie=se/230,Ae=s.highwayCurve.getPointAt(ie),Re=s.highwayCurve.getTangentAt(Math.min(ie,.9999)),De=Ae.clone().addScaledVector(new T(-Re.z,0,Re.x).normalize(),N);if(De.y=.63,Math.abs(De.x)<1.5&&Math.abs(De.z-s.highwayZ)<2){te();continue}O.push(De),se%2===0&&(_.position.set(De.x,.43,De.z),_.updateMatrix(),m.setMatrixAt(b++,_.matrix))}te()}m.count=b,m.instanceMatrix.needsUpdate=!0,i.add(m);let y=s.highwayZ;h("town-junction-asphalt",0,.205,y+.1,3.25,.06,2.2,5462631),h("town-entry-stop-line",.4,.225,y+1.64,.6,.018,.09,15986127);for(let N of[-1.25,1.25])h("junction-corner-island",N,.25,y+1.37,.5,.18,.55,12962236);let w=(N,O,te,se)=>{let ie=document.createElement("canvas");ie.width=256,ie.height=128;let Ae=ie.getContext("2d");Ae.fillStyle=O,Ae.fillRect(0,0,256,128),Ae.strokeStyle="#f6f0d9",Ae.lineWidth=6,Ae.strokeRect(6,6,244,116),Ae.fillStyle="#fff9df",Ae.font="bold 48px sans-serif",Ae.textAlign="center",Ae.textBaseline="middle",Ae.fillText(N,128,65);let Re=new Vr(ie);Re.colorSpace=xt,Re.userData.cityGenerated=!0;let De=new be(new fs(te,se),new gt({map:Re,side:Ut}));return i.add(De),De},S=-1.16;u(new T(S,.2,y+1.8),new T(S,1.32,y+1.8),.035,7440253);let R=new be(new Zn(.26,.26,.045,8),c(12078136));R.rotation.x=Math.PI/2,R.position.set(S,1.34,y+1.8),i.add(R),w("STOP","#b84c38",.34,.16).position.set(S,1.34,y+1.83);let A=w("CITY  \u2192","#266e64",1.05,.48);A.position.set(-3.9,1.25,y-1.55),A.rotation.y=-Math.PI/2,u(new T(-3.9,.2,y-1.55),new T(-3.9,1.5,y-1.55),.035,7440253);let P=new Je;P.name="four-sided-hover-signal",P.position.set(bs.x,2.85,bs.z),i.add(P),P.add(new be(new _t(.44,.48,.44),c(2505784)));let I=new be(new ps(.34,.018,5,20),new gt({color:8182723}));I.rotation.x=Math.PI/2,I.position.y=-.29,P.add(I);let L=[];for(let N=0;N<4;N++)for(let O=0;O<3;O++){let te=N*Math.PI/2,se=[15297359,15186513,5493927][O],ie=new be(new On(.049,6,5),new gt({color:se}));ie.position.set(Math.sin(te)*.24,.14-O*.14,Math.cos(te)*.24),P.add(ie),L.push({mesh:ie,hex:se,axis:N%2?"x":"z",color:["red","amber","green"][O]})}s.signalFixtures.push({group:P,lamps:L});let W=await s.cloneAsset("roads/straight",{width:1,depth:1,exact:!0});if(e!==s.worldGeneration)return;let Y=va(s.bounds);for(let[N,O]of["cars/taxi","cars/sedan"].entries()){let te=await g(O,0,.18,0,.68,1.4,.75);if(!te||e!==s.worldGeneration)return;let se=Array.from({length:160},(ie,Ae)=>{let Re=Ae/160,De=Y.getPointAt(Re),ke=Y.getTangentAt(Re);return De.addScaledVector(new T(-ke.z,0,ke.x).normalize(),N?-.42:.42)});s.motion.push({object:te,curve:new xn(se,!0,"centripetal"),speed:N?-.009:.012,cityVehicle:!0,bodyWidth:.68,bodyLength:1.4,cruiseSpeed:N?1:1.2,offset:N?.64:.14,rotationOffset:N?Math.PI:0,wrap:!0})}for(let N of r.roads)for(let O=1;O<N.length;O++){let te=new Xt(new T(N[O-1][0],.15,N[O-1][1]),new T(N[O][0],.15,N[O][1])),se=te.getLength();i.add($i(W,ie=>te.getPointAt(ie/se),se,1.72))}g("roads/crossroad",0,.17,a.z,1.72,1.72,.2);for(let[N,O,te]of[[1.9,.14,12962260],[1.65,.19,5462631]]){let se=new be(new Wr(N,40),c(te));se.rotation.x=-Math.PI/2,se.position.set(-11.5,O,a.z),se.receiveShadow=!0,i.add(se)}for(let N of r.houses){h("village-garden",N.x,.05,N.z,3.65,.2,4,10465912),x.push(g(N.key,N.x,.17,N.z,2.65,2.7,2.8,N.rotation).then(O=>{if(!O)return;cp(O,s.windowDusk);let te=pp(N,a.z,new It().setFromObject(O));p(te.start,te.end,te.width,te.kind==="driveway"?10922660:14208690),h("entrance-step",te.start.x,.2,te.start.z,te.width,.08,.25,13945776)}));for(let O of[-1.7,1.7])h("garden-hedge",N.x+O,.38,N.z,.22,.5,3.2,5667922);g("suburban/tree-small",N.x-1.05,.16,N.z-1.3,.8,.8,1.8)}for(let N of r.walks)for(let O=1;O<N.length;O++)p({x:N[O-1][0],z:N[O-1][1]},{x:N[O][0],z:N[O][1]},.45,14208690,.145);h("station-platform",o.x,.28,o.z,1.2,.45,o.length,12960944),h("platform-safety-line",o.x-.44,.512,0,.07,.012,10.2,16043877);for(let N of[-3.6,-1.2,1.2,3.6])h("station-canopy-post",o.x+.34,1.15,N,.07,1.5,.07,3497562),h("platform-bench",o.x+.17,.77,N+.35,.34,.12,.65,10119243);h("station-canopy",o.x+.06,1.94,0,1.42,.15,8.8,4426368),h("station-canopy-ridge",o.x+.06,2.05,0,.22,.12,8.8,15591115);let z=s.bounds.minX-1.98;h("station-forecourt",(o.x+.6+z)/2,.135,0,z-o.x-.6,.16,11.6,14143927),h("station-ramp-landing",(o.x+.12+z)/2,.135,5.55,z-o.x+.2,.16,.65,14143927);let X=new be(new _t(.65,.08,2.4),c(12960944));X.name="station-access-ramp",X.position.set(o.x+.12,.32,4.4),X.rotation.x=.13,i.add(X);for(let N=0;N<7;N++)h("station-pedestrian-crossing",s.bounds.minX-1.84+N*.24,.21,0,.12,.012,.55,15328718);h("harbor-quay",a.x-.55,.12,a.z,2.9,.48,a.depth,12106149),h("quay-coping",a.x+.84,.39,a.z,.16,.12,a.depth,15326909);for(let N of[a.z-3.5,a.z+3.5]){h("timber-pier",a.x+2.3,.28,N,3.5,.2,.78,10188884);for(let O=a.x+.7;O<a.x+4.1;O+=.48)h("pier-plank",O,.388,N,.035,.014,.76,7822403);for(let O of[a.x+1,a.x+3.8])for(let te of[-.32,.32])u(new T(O,-.35,N+te),new T(O,.64,N+te),.075,7102800)}for(let N=0;N<7;N+=1){let O=a.z-4.1+N*1.36;h("quay-fender",a.x+.95,.16,O,.14,.33,.3,3556676),u(new T(a.x+.62,.36,O),new T(a.x+.62,.61,O),.07,3822932)}g("industrial/building-p",a.x-2.1,.15,a.z-2.7,2,2.2,2.5,Math.PI/2);let q=w("PORT 443","#266e64",1.45,.5);q.position.set(a.x-3.13,1.05,a.z-2.7),q.rotation.y=-Math.PI/2,g("industrial/container-a",a.x-1.1,.37,a.z+2.3,.85,1.6,.9),g("industrial/container-b",a.x-2.2,.37,a.z+2.2,.85,1.6,.9),h("crane-base",a.x-.1,.55,a.z-1.8,.55,.38,.55,5138791),u(new T(a.x-.1,.7,a.z-1.8),new T(a.x-.1,3,a.z-1.8),.085,15317329),x.push(hp(s,i,a,e)),dp(s,i,a),g("watercraft/sail",a.x+2.3,.02,a.z+2.2,.85,1.75,2.1,Math.PI/2);for(let N of[-5.4,5.4])g("watercraft/buoy",a.x+5.5,.02,a.z+N,.38,.38,.75);let Q=a.z+7.5,ne=s.coastlineCurve.getPoint((Q-s.perimeter.coast.minZ)/s.perimeter.coast.length).x-1.25;f([[a.x-1.3,a.z+4.5],[ne,Q]],.5,13219725,.18);let ce=new be(new Zn(.32,.57,2.7,10),c(15918792));ce.position.set(ne,1.3,Q),ce.castShadow=!0,i.add(ce);let fe=new be(new gi(.63,.52,10),c(11885380));fe.position.set(ne,3.18,Q),fe.castShadow=!0,i.add(fe),h("lighthouse-lantern",ne,2.78,Q,.55,.45,.55,16041829),h("lighthouse-door",ne-.5,.39,Q,.05,.6,.3,4352102);let ve=[[[o.x+.08,-4.7],[o.x+.08,4.7],.53],[[a.x-.05,a.z-4.5],[a.x-.05,a.z+4.5],.37],[[-9.5,a.z+1.15],[a.x-3.5,a.z+1.15],.18]];for(let N=0;N<12;N+=1){let[O,te,se]=ve[N%ve.length],ie=new Je;ie.name="ambient-pedestrian";let Ae=new be(new us(.065,.17,2,5),c([14457428,4685202,10180178,15785906][N%4]));Ae.position.y=.2;let Re=new be(new On(.067,6,4),c(N%2?11040341:14989195));Re.position.y=.39,ie.add(Ae,Re),i.add(ie);let De=d(N%2?[te,O]:[O,te],se);s.motion.push({object:ie,curve:De,speed:.012+N*.001,...N%3===0?{stationPassenger:{x:o.x-.43,boardX:s.railX+.35,z:-2+N/3*1.6}}:{},offset:N*.233%1,pingPong:!0,bob:.01})}for(let[N,O]of["watercraft/sail","watercraft/speed"].entries()){let te=a.x+14+N*5,se=await g(O,te,.03,a.z,1.05,2.35,2.65);if(!se||e!==s.worldGeneration)return;let ie=d([[te,-27],[te+2,-8],[te-1,15],[te+3,38],[te+7,64]],.02);s.motion.push({object:se,curve:ie,speed:N?-.017:.0055,offset:N?.4:.25,rotationOffset:N?Math.PI:0,wrap:!0,surface:"ocean",bob:.025})}let nt=240,st=new Vt(new qr(1,0),c(9017225),nt);st.name="instanced-coastal-and-hillside-rocks",st.receiveShadow=!0,st.castShadow=!0;let $e=new je,$=0;for(let N=0;N<1600&&$<nt;N+=1){let O=ke=>(Math.sin(N*71.13+ke*93.7)*43147.18%1+1)%1,te=Ze.lerp(s.bounds.minZ-34,s.bounds.maxZ+43,O(1)),se=s.coastlineCurve.getPoint((te-s.perimeter.coast.minZ)/s.perimeter.coast.length).x,ie=N%3===0,Ae=ie?se-O(2)*1.5:Ze.lerp(s.bounds.minX-34,se-5,O(2));if(n(Ae,te)<2||ba(Ae,te,r)<1.5)continue;let Re=t(Ae,te),De=ie?.2+O(3)*.45:.2+O(3)*.85;$e.position.set(Ae,Re+De*.12,te),$e.scale.set(De*1.4,De*.6,De),$e.rotation.set(O(4)*.6,O(5)*Math.PI,O(6)*.5),$e.updateMatrix(),st.setMatrixAt($++,$e.matrix)}st.count=$,st.instanceMatrix.needsUpdate=!0,i.add(st),await Promise.all(x)}var _r=32;function _p(s){return["highway","rail"].flatMap(e=>[0,1].map(t=>{let n=s[e].getPointAt(t),i=s[e].getTangentAt(t?.999999:1e-6).multiplyScalar(t?1:-1).normalize();return{kind:e,end:t,origin:n,direction:i}}))}function Gc(s,e){let t=Math.max(0,e),n=s.origin.clone().addScaledVector(s.direction,t),i=4*(1-Math.cos(t/48));return s.kind==="highway"?n.x-=i:n.z+=i,n}function Sa(s,e,t){let n=1/0;for(let i of t??[]){let r=(s-i.origin.x)*i.direction.x+(e-i.origin.z)*i.direction.z;if(r<-2)continue;let a=Gc(i,r);n=Math.min(n,Math.hypot(a.x-s,a.z-e))}return n}function wv(s,e,t=_r){let n=[];for(let i=Math.floor((s.x-e)/t);i<=Math.floor((s.x+e)/t);i+=1)for(let r=Math.floor((s.z-e)/t);r<=Math.floor((s.z+e)/t);r+=1)n.push(`${i}:${r}`);return n}function xp(s,e,t,{shoreX:n,heightAt:i,colorAt:r},a=24){let o=_r,l=[],c=[],h=[];for(let f=0;f<=a;f+=1){let p=e*o+f/a*o,x=si(p,n),g=t?Math.max(s*o,x):s*o,m=t?(s+1)*o:Math.min((s+1)*o,x);for(let _=0;_<=a;_+=1){let b=Ze.lerp(g,Math.max(g,m),_/a);l.push(b,t?0:i(b,p),p);let y=t?new we:r(b,p);if(c.push(y.r,y.g,y.b),_<a&&f<a){let w=f*(a+1)+_,S=w+a+1;h.push(w,S,w+1,w+1,S,S+1)}}}let u=new et;u.setAttribute("position",new Ue(l,3)),u.setAttribute("color",new Ue(c,3)),u.setIndex(h);let d=[];for(let f=0;f<l.length;f+=3){let p=l[f],x=l[f+2],g=.12,m=t?new T(0,1,0):new T(i(p-g,x)-i(p+g,x),2*g,i(p,x-g)-i(p,x+g)).normalize();d.push(m.x,m.y,m.z)}return u.setAttribute("normal",new Ue(d,3)),u.computeBoundingSphere(),u}var Wc=class{constructor({world:e,waterMaterial:t,roadModel:n,treeModel:i,context:r,heightAt:a,colorAt:o,siteDistance:l,resolution:c=24,treeCount:h=45}){this.resolution=c,this.treeCount=h,Object.assign(this,{world:e,waterMaterial:t,roadModel:n,treeModel:i,context:r,heightAt:a,colorAt:o,siteDistance:l}),this.chunks=new Map,this.routes=new Map,this.terrainMaterial=new tt({vertexColors:!0,roughness:1}),this.disposed=!1}update(e,t,{frustum:n=null,deferred:i=!1}={}){if(this.disposed)return;let r=new Set(wv(e,t).filter(o=>{if(!n)return!0;let[l,c]=o.split(":").map(Number);return n.intersectsBox(new It(new T(l*32-5,-1,c*32-5),new T((l+1)*32+5,9,(c+1)*32+5)))}));for(let[o,l]of this.chunks)r.has(o)||(this.release(l),this.chunks.delete(o));this.pending=[...r].filter(o=>!this.chunks.has(o)).sort((o,l)=>{let c=h=>{let[u,d]=h.split(":").map(Number);return Math.hypot((u+.5)*32-e.x,(d+.5)*32-e.z)};return c(o)-c(l)});let a=new Set;this.pendingRoutes=[];for(let[o,l]of this.context.continuations.entries()){let c=(e.x-l.origin.x)*l.direction.x+(e.z-l.origin.z)*l.direction.z,h=Gc(l,c);if(!(Math.hypot(h.x-e.x,h.z-e.z)>t+45))for(let u=Math.max(0,Math.floor((c-t-12)/32));u<=Math.max(-1,Math.floor((c+t+12)/32));u+=1){let d=`${o}:${u}`;a.add(d),this.routes.has(d)||this.pendingRoutes.push({key:d,route:l,chunk:u})}}for(let[o,l]of this.routes)a.has(o)||(this.release(l),this.routes.delete(o));i||this.drain(1/0)}drain(e=1){if(!this.disposed)for(let t=0;t<e;t++)if(this.pending?.length)this.buildSurfaceChunk(this.pending.shift());else if(this.pendingRoutes?.length){let{key:n,route:i,chunk:r}=this.pendingRoutes.shift(),a=this.buildRouteChunk(i,r);this.world.add(a),this.routes.set(n,a)}else break}get pendingCount(){return(this.pending?.length??0)+(this.pendingRoutes?.length??0)}buildSurfaceChunk(e){let[t,n]=e.split(":").map(Number),i=new Je;i.name=`world-chunk:${e}`;let r=t*_r,a=r+_r,o={shoreX:this.context.perimeter.coast.shoreX,heightAt:this.heightAt,colorAt:this.colorAt};if(r<o.shoreX+1){let l=new be(xp(t,n,!1,o,this.resolution),this.terrainMaterial);l.name="analytic-rolling-terrain",l.receiveShadow=!0,i.add(l)}if(a>o.shoreX-1){let l=new be(xp(t,n,!0,o,this.resolution),this.waterMaterial);l.name="open-ocean-boundary",i.add(l)}if(r<o.shoreX-2){let l=[];for(let c=0;c<this.treeCount;c+=1){let h=p=>(Math.sin(t*127.1+n*311.7+c*71.3+p)*43758.5453%1+1)%1,u=r+h(1)*_r,d=(n+h(3))*_r,f=this.context.perimeter.bounds;u>f.minX-32&&u<f.maxX+2&&d>f.minZ-30&&d<f.maxZ+38||u>si(d,o.shoreX)-2||this.siteDistance(u,d)<3.4||l.push({x:u,z:d,scale:.8+h(4)*.7})}this.treeModel.updateMatrixWorld(!0),this.treeModel.traverse(c=>{if(!c.isMesh)return;let h=new Vt(c.geometry,c.material,l.length);h.userData.streamBorrowed=!0;let u=new je;l.forEach((d,f)=>{u.position.set(d.x,this.heightAt(d.x,d.z),d.z),u.scale.setScalar(d.scale),u.updateMatrix(),h.setMatrixAt(f,u.matrix.clone().multiply(c.matrixWorld))}),h.castShadow=!0,i.add(h)})}this.world.add(i),this.chunks.set(e,i)}buildRouteChunk(e,t){let n=t*32,i=n+32;if(e.kind==="rail"){let a=e.end?this.context.railLength:0;return Vc(o=>Gc(e,o),n,i,{phase:a})}let r=new Je;return r.name=`endless-highway:${t}`,r.add($i(this.roadModel,a=>{let o=Gc(e,n+a);return o.y=.145,o},32,2.28)),r}release(e){this.world.remove(e);let t=new Set;e.traverse(n=>{n.isInstancedMesh&&n.dispose(),n.geometry&&!n.userData.streamBorrowed&&n.geometry.dispose(),n.material?.userData.streamOwned&&t.add(n.material)});for(let n of t)n.dispose()}dispose(){this.disposed=!0,this.pending=[],this.pendingRoutes=[];for(let e of[...this.chunks.values(),...this.routes.values()])this.release(e);this.chunks.clear(),this.routes.clear(),this.terrainMaterial.dispose()}};function yp(s,e=[]){let t=new Set(e.filter(Boolean)),n=new Map;s.updateMatrixWorld(!0);let i=s.matrixWorld.clone().invert();s.traverse(a=>{if(!a.isMesh&&!a.isLineSegments||a.isInstancedMesh||Array.isArray(a.material)||a.material.transparent)return;for(let c=a;c;c=c.parent)if(t.has(c))return;let l=`${a.name.includes("tree")?`${Math.floor(a.matrixWorld.elements[12]/16)}:${Math.floor(a.matrixWorld.elements[14]/16)}`:""}:${a.isLineSegments?"line":"mesh"}:${a.material.id}:${a.castShadow}:${a.receiveShadow}:${Object.keys(a.geometry.attributes).sort().join(",")}`;n.has(l)||n.set(l,[]),n.get(l).push(a)});let r=0;for(let a of n.values()){if(a.length<2)continue;let o=a[0],l=o.isMesh&&a.every(h=>h.geometry===o.geometry),c;if(l)c=new Vt(o.geometry,o.material,a.length),a.forEach((h,u)=>c.setMatrixAt(u,i.clone().multiply(h.matrixWorld)));else{let h=a.map(d=>(d.geometry.index?d.geometry.toNonIndexed():d.geometry.clone()).applyMatrix4(i.clone().multiply(d.matrixWorld))),u=zf(h);for(let d of h)d.dispose();if(!u)continue;c=o.isLineSegments?new Yn(u,o.material):new be(u,o.material)}c.name="batched-static-scenery",c.castShadow=o.castShadow,c.receiveShadow=o.receiveShadow;for(let h of a){for(let u of[...h.children])t.has(u)&&s.attach(u);h.parent?.remove(h)}if(s.add(c),r+=a.length-1,!l)for(let h of new Set(a.map(u=>u.geometry)))h.userData.deployManagerSharedAsset||h.dispose()}return r}var Xc=class{constructor(){this.pointers=new Set,this.candidate=null}down(e){e.pointerType==="mouse"&&e.button!==0||(this.pointers.add(e.pointerId),this.pointers.size===1?this.candidate={x:e.clientX,y:e.clientY,target:e.target,moved:!1,multi:!1}:this.candidate&&(this.candidate.multi=!0))}move(e){this.candidate&&this.pointers.has(e.pointerId)&&Math.hypot(e.clientX-this.candidate.x,e.clientY-this.candidate.y)>5&&(this.candidate.moved=!0)}up(e,t=!1){if(!this.pointers.has(e.pointerId)||(this.move(e),this.pointers.delete(e.pointerId),t&&this.candidate&&(this.candidate.moved=!0),this.pointers.size))return null;let n=this.candidate;return this.candidate=null,n?{...n,tap:!n.moved&&!n.multi}:null}};function vp(s,e,t,n,i,r){let a=(o,l,c)=>Math.max(l,Math.min(o,Math.max(l,c)));return{x:a(s,12+t/2,i-12-t/2),y:a(e,68+n,r-132)}}function Mp({width:s,coarsePointer:e=!1}){let t=s<700||e;return{compact:t,maxPixelRatio:t?1:1.5,frameMs:t?1e3/30:0,shadows:!t,surfaceResolution:t?12:24,treeCount:t?18:45,waterDetail:t?8:14}}function yu(s,e,t,n){let i=s.compact?65e4:3e6;return Math.min(n,s.maxPixelRatio,Math.sqrt(i/Math.max(1,e*t)))}var Ea=Object.freeze([Object.freeze({x:-.5,z:-.5}),Object.freeze({x:.5,z:-.5}),Object.freeze({x:-.5,z:.5}),Object.freeze({x:.5,z:.5})]);function bp(s){let e=Math.round(s*2);return Number.isFinite(s)&&Math.abs(s)<=31.5&&Math.abs(s*2-e)<1e-4&&Math.abs(e)%2===1}function Sp(s){if(!s||typeof s!="object")return null;let e=Number(s.x),t=Number(s.z);return bp(e)&&bp(t)?{x:e,z:t}:null}function Ep(s){let e=Math.max(0,Math.floor(Number(s)||0)),t=[];for(let n=4;t.length<e&&n<=64;n+=2){let i=(n-1)/2;for(let r=0;r<n;r+=1)for(let a=0;a<n;a+=1){let o=a-i,l=r-i,c=n===4||Math.max(Math.abs(o),Math.abs(l))===i,h=Math.abs(o)===.5&&Math.abs(l)===.5;if(c&&!h&&t.push({x:o,z:l}),t.length>=e)return t}}return t}function Tp(s=[]){let e=s.reduce((t,n)=>Math.max(t,Math.abs(n.x),Math.abs(n.z)),1.5);return Math.max(4,Math.ceil(e+.5)*2)}Tn.enabled=!1;var Qe=Object.freeze({ink:1513490,inkSoft:3688010,paper:15196093,paperLight:16183513,paperDark:13221777,teal:2062965,tealBright:4765096,rust:11947563,rustBright:15696724,road:5462631,roadEdge:12962260,sand:14206607,waterShallow:6469552,waterDeep:2318192,waterFoam:15659224,hillLight:9547384,hillDark:5602659,healthy:3119988,checking:13870382,unhealthy:12799285,unknown:7501422}),vu=Object.freeze({"industrial/building-c":"/assets/kenney/industrial/building-c.glb","industrial/building-e":"/assets/kenney/industrial/building-e.glb","industrial/building-m":"/assets/kenney/industrial/building-m.glb","industrial/building-p":"/assets/kenney/industrial/building-p.glb","industrial/container-a":"/assets/kenney/industrial/shipping-container-a.glb","industrial/container-b":"/assets/kenney/industrial/shipping-container-b.glb","industrial/tank":"/assets/kenney/industrial/detail-tank-large.glb","commercial/building-a":"/assets/kenney/commercial/building-a.glb","commercial/building-f":"/assets/kenney/commercial/building-f.glb","commercial/building-j":"/assets/kenney/commercial/building-j.glb","commercial/building-k":"/assets/kenney/commercial/building-k.glb","commercial/building-n":"/assets/kenney/commercial/building-n.glb","commercial/skyscraper-e":"/assets/kenney/commercial/building-skyscraper-e.glb","suburban/building-a":"/assets/kenney/suburban/building-type-a.glb","suburban/building-h":"/assets/kenney/suburban/building-type-h.glb","suburban/building-n":"/assets/kenney/suburban/building-type-n.glb","suburban/building-r":"/assets/kenney/suburban/building-type-r.glb","suburban/tree":"/assets/kenney/suburban/tree-large.glb","suburban/tree-small":"/assets/kenney/suburban/tree-small.glb","suburban/building-b":"/assets/kenney/suburban/building-type-b.glb","suburban/building-d":"/assets/kenney/suburban/building-type-d.glb","suburban/building-e":"/assets/kenney/suburban/building-type-e.glb","roads/bend":"/assets/kenney/roads/road-bend.glb","roads/curve":"/assets/kenney/roads/road-curve.glb","roads/straight":"/assets/kenney/roads/road-straight.glb","roads/crossroad":"/assets/kenney/roads/road-crossroad.glb","roads/traffic-light":"/assets/kenney/roads/traffic-light-object-vertical.glb","roads/highway-sign":"/assets/kenney/roads/sign-highway.glb","cars/delivery":"/assets/kenney/cars/delivery.glb","cars/sedan":"/assets/kenney/cars/sedan.glb","cars/taxi":"/assets/kenney/cars/taxi.glb","cars/truck":"/assets/kenney/cars/truck.glb","trains/track":"/assets/kenney/trains/railroad-straight.glb","trains/track-corner":"/assets/kenney/trains/railroad-corner-large.glb","trains/engine":"/assets/kenney/trains/train-diesel-a.glb","trains/passenger-a":"/assets/kenney/trains/train-electric-city-a.glb","trains/passenger-b":"/assets/kenney/trains/train-electric-city-b.glb","trains/passenger-c":"/assets/kenney/trains/train-electric-city-c.glb","trains/regional-engine":"/assets/kenney/trains/train-diesel-b.glb","trains/regional-coach":"/assets/kenney/trains/train-locomotive-passenger-a.glb","trains/carriage":"/assets/kenney/trains/train-carriage-container-blue.glb","trains/carriage-coal":"/assets/kenney/trains/train-carriage-coal.glb","watercraft/tug":"/assets/kenney/watercraft/boat-tug-a.glb","watercraft/cargo":"/assets/kenney/watercraft/ship-cargo-a.glb","watercraft/sail":"/assets/kenney/watercraft/boat-sail-a.glb","watercraft/fishing":"/assets/kenney/watercraft/boat-fishing-small.glb","watercraft/speed":"/assets/kenney/watercraft/boat-speed-a.glb","watercraft/buoy":"/assets/kenney/watercraft/buoy.glb"}),vn=Object.freeze({lotSize:5.25,roadWidth:1.72,pitch:6.97}),Mu=Object.freeze({horizontal:0,vertical:Math.PI/2}),bu=Object.freeze(["suburban/building-n","commercial/building-a","industrial/building-p"]),Tu=3,Ip=500,Lp=0,An=Object.freeze({tileScale:2.28,curveExtent:2,curveRadius:1.5,bendExtent:1,bendRadius:.5}),Lt=Object.freeze({leftTurn:An.curveRadius*An.tileScale,rightTurn:An.bendRadius*An.tileScale,leg:48,curveFit:An.curveExtent*An.tileScale,bendFit:An.bendExtent*An.tileScale}),Gt=Object.freeze({assetScale:1.48,turn:4*1.48,leg:48,cornerFit:4.48727*1.48}),un=Object.freeze({baseY:-.075,segmentsX:164,segmentsZ:152,octaves:6,baseFrequency:.052,lacunarity:2.03,persistence:.51,heightScale:4.8,treeCount:170,grassCount:2600}),Ta=Object.freeze({position:Object.freeze([-31,28,-31]),target:Object.freeze([-1.5,.7,0])}),Dp=Object.freeze([{key:"cars/sedan",lane:-.5,speed:.028,offset:.04,variance:.006,frequency:.29},{key:"cars/taxi",lane:-.5,speed:.024,offset:.39,variance:.005,frequency:.23},{key:"cars/truck",lane:-.5,speed:.018,offset:.72,variance:.004,frequency:.2},{key:"cars/sedan",lane:.5,speed:-.026,offset:.13,variance:.005,frequency:.27},{key:"cars/taxi",lane:.5,speed:-.031,offset:.49,variance:.006,frequency:.31},{key:"cars/delivery",lane:.5,speed:-.02,offset:.81,variance:.004,frequency:.19}].map(Object.freeze)),Kc=Object.freeze({speed:.0082,variance:.007,frequency:.2}),Es=Object.freeze([{speed:.0115,variance:.008,frequency:.22},{speed:-.0068,variance:.006,frequency:.17}].map(Object.freeze)),Np=Object.freeze([{id:"git",name:"Git push dock",code:"GIT",kind:"control",modelKey:"industrial/building-p"},{id:"deploy-manager",name:"Deploy Manager",code:"DM",kind:"control",modelKey:"commercial/skyscraper-e"},{id:"caddy",name:"Caddy gate",code:"TLS",kind:"control",modelKey:"commercial/building-a"},{id:"docker",name:"Container yard",code:"CTR",kind:"control",modelKey:"industrial/building-e"}]),Av=Object.freeze({"galaxy-menu":"commercial/building-n",portfolio:"commercial/building-f",aquarium:"suburban/building-h",birds:"suburban/building-r",celegans:"industrial/building-c",continuity:"commercial/building-j",conspiracy:"commercial/building-k",androidhell:"industrial/building-m"}),wp=Object.freeze(["commercial/building-f","commercial/building-j","commercial/building-k","commercial/building-n","suburban/building-a","suburban/building-h","suburban/building-n","suburban/building-r","industrial/building-c","industrial/building-m"]);function Ti(s){let e=2166136261;for(let t of String(s))e^=t.codePointAt(0),e=Math.imul(e,16777619);return e>>>0}function Up(s){return Av[s]??wp[Ti(s)%wp.length]}function Fp(s={}){let e=Array.isArray(s.routes)?s.routes:[],t=Array.isArray(s.datastores)?s.datastores:[],n=e.map((_,b)=>({..._,id:_.id,name:_.name??_.id,code:String(b+1).padStart(2,"0"),kind:"route",modelKey:Up(_.id)})),i=t.map(_=>({..._,id:_.id,name:_.name??_.id,code:"DB",kind:"datastore",modelKey:"industrial/tank"})),r=[...n,...i],a=new Set(Ea.map(({x:_,z:b})=>`${_}:${b}`)),o=Ep(r.length+64),l=0,c=new Map;for(let _ of r){let b=Sp(_.plot);!b||a.has(`${b.x}:${b.z}`)||(a.add(`${b.x}:${b.z}`),c.set(_,b))}let h=r.filter(_=>!c.has(_)).sort((_,b)=>_.id.localeCompare(b.id));for(let _ of h){let b=null;for(;!b;){let y=o[l++];if(!y)throw new Error("city exhausted its stable plot address space");a.has(`${y.x}:${y.z}`)||(b=y)}a.add(`${b.x}:${b.z}`),c.set(_,b)}let u=r.map(_=>({..._,plot:c.get(_)})),d=[...Ea,...u.map(({plot:_})=>_)],f=Tp(d),p=(f-1)/2,x=[];for(let _=0;_<f;_+=1)for(let b=0;b<f;b+=1)x.push({col:b,row:_,x:(b-p)*vn.pitch,z:(_-p)*vn.pitch});let g=({x:_,z:b})=>x.find(y=>y.col===_+p&&y.row===b+p),m=[...Np.map((_,b)=>({..._,plot:Ea[b],cell:g(Ea[b])})),...u.map(_=>({..._,cell:g(_.plot)}))];return{size:f,cells:x,occupiedCellKeys:new Set(m.map(({cell:_})=>`${_.col}:${_.row}`)),entities:m.map(({cell:_,...b})=>({...b,..._})),extent:f*vn.lotSize+(f-1)*vn.roadWidth}}function Op(s){let{lotSize:e,pitch:t}=vn,n=-((s.size-1)*t)/2,i=-n,r={minX:n-e/2,maxX:i+e/2,minZ:n-e/2,maxZ:i+e/2},a=2.28,o=1.48,l=r.minZ-4.4,c=r.minX-5.1,h=l+4.4,u=r.maxZ+5.2,d=r.maxX+3.35,f=d+50,p=c+3.8,x=d-Lt.rightTurn-3,g={axis:"x",x:(p+x)/2,z:l,length:x-p,width:a,minX:p,maxX:x,minZ:l-a/2,maxZ:l+a/2},m={axis:"z",x:c,z:(h+u)/2,length:u-h,width:o,minX:c-o/2,maxX:c+o/2,minZ:h,maxZ:u},_=Math.min(g.minX-Lt.leftTurn,m.minX-Gt.turn-Gt.leg,r.minX)-30,b=Math.min(g.minZ-Lt.leftTurn-Lt.leg,m.minZ-Gt.turn,r.minZ)-30,y=Math.max(m.maxZ+Gt.turn+Gt.leg,r.maxZ)+30,w={axis:"z",x:(d+f)/2,z:(b+y)/2,length:y-b,width:f-d,minX:d-.9,maxX:f,minZ:b,maxZ:y,shoreX:d,oceanX:f},S={minX:_,maxX:d+.82,minZ:b,maxZ:y};return S.x=(S.minX+S.maxX)/2,S.z=(S.minZ+S.maxZ)/2,S.width=S.maxX-S.minX,S.depth=S.maxZ-S.minZ,{bounds:r,highway:g,rail:m,coast:w,ground:S}}function Bp(s,e=Tu){let t=s.entities.filter(i=>i.kind==="route"),n=Math.min(Math.max(0,e),t.length);return Array.from({length:n},(i,r)=>t[Math.floor(r*t.length/n)])}function zp(s){return{x:s.highway.minX+(0-s.highway.minX)*.48,z:s.highway.z,rotation:Lp}}function kp(s){let e=s.highway,t=s.rail,n=s.coast,i=.5522847498,r=new T(e.minX-Lt.leftTurn,.16,e.z-Lt.leftTurn-Lt.leg),a=new T(e.minX-Lt.leftTurn,.16,e.z-Lt.leftTurn),o=new T(e.minX,.16,e.z),l=new T(e.maxX,.16,e.z),c=new T(e.maxX+Lt.rightTurn,.16,e.z-Lt.rightTurn),h=new T(c.x,.16,c.z-Lt.leg),u=[new Xt(r,a),new Xt(o,l),new Xt(c,h)],d=[new Fn(a,a.clone().add(new T(0,0,Lt.leftTurn*i)),o.clone().add(new T(-Lt.leftTurn*i,0,0)),o),new Fn(l,l.clone().add(new T(Lt.rightTurn*i,0,0)),c.clone().add(new T(0,0,Lt.rightTurn*i)),c)],f=new xi;f.add(u[0]),f.add(d[0]),f.add(u[1]),f.add(d[1]),f.add(u[2]);let p=new T(t.x-Gt.turn-Gt.leg,.24,t.minZ-Gt.turn),x=new T(t.x-Gt.turn,.24,t.minZ-Gt.turn),g=new T(t.x,.24,t.minZ),m=new T(t.x,.24,t.maxZ),_=new T(t.x-Gt.turn,.24,t.maxZ+Gt.turn),b=new T(_.x-Gt.leg,.24,_.z),y=[new Xt(p,x),new Xt(g,m),new Xt(_,b)],w=[new Fn(x,x.clone().add(new T(Gt.turn*i,0,0)),g.clone().add(new T(0,0,-Gt.turn*i)),g),new Fn(m,m.clone().add(new T(0,0,Gt.turn*i)),_.clone().add(new T(Gt.turn*i,0,0)),_)],S=new xi;S.add(y[0]),S.add(w[0]),S.add(y[1]),S.add(w[1]),S.add(y[2]);let R=new xn(Array.from({length:129},(v,A)=>{let P=A/128,I=Ze.lerp(n.minZ,n.maxZ,P);return new T(si(I,n.shoreX),.045,I)}),!1,"centripetal",.42);return{highway:f,highwayStraights:u,highwayCorners:d,highwayAssets:[{key:"roads/curve",x:e.minX-An.tileScale,z:e.z-An.tileScale/2,rotation:Math.PI,fit:Lt.curveFit},{key:"roads/bend",x:e.maxX+Lt.rightTurn,z:e.z,rotation:-Math.PI/2,fit:Lt.bendFit}],rail:S,railStraights:y,railCorners:w,railAssets:[{x:t.x,z:t.minZ,rotation:-Math.PI/2},{x:t.x,z:t.maxZ,rotation:0}],coastline:R,shippingLanes:[Qc(R,-7.2,96),Qc(R,-11.2,96)]}}function Hp(s){let e=String(s??"unknown").toLowerCase();return["healthy","online","steady","ok","ready"].includes(e)?"healthy":["deploying","active","building"].includes(e)?"deploying":["checking","starting","pending","queued"].includes(e)?"checking":["unhealthy","offline","failed","error"].includes(e)?"unhealthy":"unknown"}function Ap(s){return{healthy:Qe.healthy,deploying:Qe.rustBright,checking:Qe.checking,unhealthy:Qe.unhealthy,unknown:Qe.unknown}[Hp(s)]}function Rv(s,e){s.traverse(t=>{t.isMesh&&(t.userData.entityId=e)})}function Cv(s,e=""){let t=[];s.traverse(n=>{n.isMesh&&t.push(n)});for(let n of t){n.castShadow=!0,n.receiveShadow=!0,n.geometry.userData.deployManagerSharedAsset=!0;let i=Array.isArray(n.material)?n.material:[n.material];if(n.material=i.map(r=>(r.userData.deployManagerSharedAsset=!0,"roughness"in r&&(r.roughness=Math.max(.72,r.roughness??.72)),"metalness"in r&&(r.metalness=Math.min(.16,r.metalness??.05)),r)),Array.isArray(n.material)||([n.material]=n.material),n.material.length===1&&(n.material=n.material[0]),!e.startsWith("roads/")&&!e.startsWith("trains/track")&&n.geometry?.attributes?.position?.count<25e3){let r=new Yn(new tr(n.geometry,32),new gn({color:Qe.ink,transparent:!0,opacity:.24}));r.geometry.userData.deployManagerSharedAsset=!0,r.material.userData.deployManagerSharedAsset=!0,r.name="ink-outline",r.castShadow=!1,r.raycast=()=>{},n.add(r)}}return s}function qc(s,{includeShared:e=!1,includeTextures:t=!1}={}){let n=new Set,i=new Set,r=new Set;s?.traverse?.(a=>{a.isInstancedMesh&&a.dispose(),a.element?.remove?.(),a.geometry&&(e||!a.geometry.userData?.deployManagerSharedAsset)&&n.add(a.geometry);let o=Array.isArray(a.material)?a.material:[a.material];for(let l of o)if(!(!l||!e&&l.userData?.deployManagerSharedAsset)){i.add(l);for(let c of Object.values(l))c?.isTexture&&(t||c.userData.cityGenerated)&&r.add(c)}});for(let a of n)a.dispose();for(let a of i)a.dispose();for(let a of r)a.dispose()}function ji(s,e,t){let n=Ze.clamp((t-s)/Math.max(1e-4,e-s),0,1);return n*n*(3-2*n)}function Pv(s,e){let t=Math.imul(s,374761393)^Math.imul(e,668265263)^1821285621;t=Math.imul(t^t>>>13,1274126177);let n=((t^t>>>16)>>>0)/4294967296*Math.PI*2;return[Math.cos(n),Math.sin(n)]}function Iv(s,e){let t=Math.floor(s),n=Math.floor(e),i=t+1,r=n+1,a=s-t,o=e-n,l=a*a*a*(a*(a*6-15)+10),c=o*o*o*(o*(o*6-15)+10),h=(f,p)=>{let[x,g]=Pv(f,p);return x*(s-f)+g*(e-p)},u=Ze.lerp(h(t,n),h(i,n),l),d=Ze.lerp(h(t,r),h(i,r),l);return Ze.lerp(u,d,c)*1.41421356237}function vr(s,e){let t=s*un.baseFrequency+1.73,n=e*un.baseFrequency-2.41,i=1,r=0,a=0;for(let o=0;o<un.octaves;o+=1){r+=Iv(t,n)*i,a+=i;let l=.57+o*.071,c=Math.cos(l),h=Math.sin(l),u=t*un.lacunarity,d=n*un.lacunarity;t=u*c-d*h+7.13+o*1.37,n=u*h+d*c-4.79+o*.83,i*=un.persistence}return r/Math.max(a,1e-4)}function $c(s,e){let t=vr(s*.47-31.7,e*.47+18.9)*.5+.5,n=vr(s*.91+64.3,e*.91-52.1)*.5+.5;return ji(.34,.78,t*.72+n*.28)}var Rp=new WeakMap;function Lv(s,e,t=[]){let n=Rp.get(t);if(!n){let o=t.map(c=>c.x??c[0]),l=t.map(c=>c.z??c[1]);n={minX:Math.min(...o),maxX:Math.max(...o),minZ:Math.min(...l),maxZ:Math.max(...l)},Rp.set(t,n)}let i=Math.max(n.minX-s,0,s-n.maxX),r=Math.max(n.minZ-e,0,e-n.maxZ);if(i>8||r>8)return Math.hypot(i,r);let a=1/0;for(let o=1;o<t.length;o+=1){let l=t[o-1],c=t[o],h=l.x??l[0],u=l.z??l[1],d=c.x??c[0],f=c.z??c[1],p=d-h,x=f-u,g=p*p+x*x,m=g>0?Ze.clamp(((s-h)*p+(e-u)*x)/g,0,1):0,_=s-(h+p*m),b=e-(u+x*m);a=Math.min(a,_*_+b*b)}return Math.sqrt(a)}function wa(s,e,t=[]){let n=1/0;for(let i of t)n=Math.min(n,Lv(s,e,i));return n}function yr(s,e,t){let n=(t.minX+t.maxX)/2,i=(t.minZ+t.maxZ)/2,r=Math.max(0,Math.abs(s-n)-(t.maxX-t.minX)/2),a=Math.max(0,Math.abs(e-i)-(t.maxZ-t.minZ)/2);return Math.hypot(r,a)}function Vp(s,e){let t=e?.perimeter?.coast??e?.coast;return t?si(s,t.shoreX):1/0}function Gp(s,e,t,n){let i=_u(s,n);return{perimeter:s,coastline:n,regionalPlan:i,railLength:t.getLength(),continuations:_p({highway:e,rail:t}),flatCorridors:[e,t].filter(Boolean).map(r=>r.getSpacedPoints(128)).concat(i.roads,i.walks,[va(s.bounds).getSpacedPoints(96)]),bounds:{minX:s.ground.minX,maxX:s.ground.maxX,minZ:s.ground.minZ,maxZ:s.ground.maxZ}}}function Aa(s,e,t){let n=t?.perimeter??t;if(!n?.bounds||!n?.ground||!n?.coast)return un.baseY;let i=n.bounds,r=yr(s,e,i),a=ji(.45,8.6,r),o=Vp(e,t?.perimeter?t:n)-s,l=ji(.3,6.4,o),c=1,h=Math.min(wa(s,e,t?.flatCorridors),Sa(s,e,t?.continuations)),u=Number.isFinite(h)?ji(.9,6.8,h):1,d=vr(s,e),f=vr(s+73.4,e-41.7),p=Ze.clamp(d*.72+f*.28,-1,1)*.5+.5,x=vr(s*.38+d*4,e*.38+f*4),g=Math.max(0,1-Math.abs(x*2.6)),m=ji(3.5,19,r),_=un.heightScale*(.04+p*.3+g**2*m*.75)*a*l*c,b=(.13+p*.035)*a*l*c,y=ji(0,3.2,ba(s,e,t?.regionalPlan)),w=Ze.lerp(b,_,u)*y;return un.baseY+w}function Dv(s,e={}){let t=s.clone(!0),n=new It().setFromObject(t),i=n.getSize(new T),r=n.getCenter(new T);e.preserveOrigin||(t.position.x-=r.x),t.position.y-=n.min.y,e.preserveOrigin||(t.position.z-=r.z);let a=e.width??4.2,o=e.depth??4.2,l=e.height??5.2,c=new Je;if(c.add(t),Number.isFinite(e.scale))c.scale.setScalar(e.scale);else if(e.exact)c.scale.set(a/Math.max(i.x,.001),Math.min(a/Math.max(i.x,.001),o/Math.max(i.z,.001)),o/Math.max(i.z,.001));else{let h=Math.min(a/Math.max(i.x,.001),o/Math.max(i.z,.001),l/Math.max(i.y,.001));c.scale.setScalar(h)}return c}function Ss(s,e,t,n,i=.28){let r=new _t(e.x,e.y,e.z),a=new be(r,n);a.position.copy(t),a.receiveShadow=!0,a.castShadow=e.y>.2,s.add(a);let o=new Yn(new tr(r),new gn({color:Qe.ink,transparent:!0,opacity:i}));return o.position.copy(t),s.add(o),a}function jc(s,e){let t=new et().setFromPoints(s),n=new pi(t,e);return e.isLineDashedMaterial&&n.computeLineDistances(),n}function Cp(s,{length:e=2.8,width:t=.78}={}){let n=new Je;n.name="procedural-boat-wake";let i=new gn({color:Qe.waterFoam,transparent:!0,opacity:.48,depthWrite:!1});for(let r of[-1,1]){let a=jc([new T(r*.16,.08,-.42),new T(r*t*.46,.065,-e*.52),new T(r*t,.045,-e)],i);a.raycast=()=>{},n.add(a)}s.add(n)}function Yc(s,e){return-((e.size-1)*vn.pitch)/2+vn.pitch/2+s*vn.pitch}function Zc(s,e,t){let n=[s-1,s].filter(r=>r>=0&&r<t-1);if(e<s&&n.includes(s-1))return s-1;if(e>s&&n.includes(s))return s;let i=(t-2)/2;return n.sort((r,a)=>Math.abs(r-i)-Math.abs(a-i)||r-a)[0]}function Ra(s,e,t,n){if(!s||!e||!t||t.size<2)return null;let i=Math.abs(e.col-s.col),r=Math.abs(e.row-s.row),o=(n??(i>=r?"vertical":"horizontal"))==="vertical"?["vertical","horizontal"]:["horizontal","vertical"];for(let l of o){if(l==="vertical"){let d=Zc(s.col,e.col,t.size),f=Zc(s.row,e.row,t.size);if(d===void 0||f===void 0)continue;let p=Yc(d,t);return{axis:l,curb:{x:p,z:s.z},node:{x:p,z:Yc(f,t)}}}let c=Zc(s.row,e.row,t.size),h=Zc(s.col,e.col,t.size);if(c===void 0||h===void 0)continue;let u=Yc(c,t);return{axis:l,curb:{x:s.x,z:u},node:{x:Yc(h,t),z:u}}}return null}function Nv(s,e){return Math.abs(s.x-e.x)<.001&&Math.abs(s.z-e.z)<.001}function Jc(s,e,t,n={}){let i=n.startAccess??Ra(s,e,t),r=n.endAccess??Ra(e,s,t);if(!i||!r)return[];let a=[i.curb,i.node];if(i.node.x!==r.node.x&&i.node.z!==r.node.z){let o=(Ti(`${s.id}:${e.id}`)&1)===0;a.push(o?{x:r.node.x,z:i.node.z}:{x:i.node.x,z:r.node.z})}return a.push(r.node,r.curb),a.filter((o,l)=>l===0||!Nv(o,a[l-1]))}function Su(s,e=.34){let t=s.map(a=>new T(a.x,e,a.z));if(t.length<2)return null;let n=new xi,i=t[0].clone(),r=a=>{i.distanceToSquared(a)>1e-6&&n.add(new Xt(i.clone(),a.clone())),i=a.clone()};for(let a=1;a<t.length-1;a+=1){let o=t[a-1],l=t[a],c=t[a+1],h=l.clone().sub(o),u=c.clone().sub(l),d=h.length(),f=u.length();if(!d||!f)continue;if(h.normalize(),u.normalize(),Math.abs(h.dot(u))>.999){r(l);continue}let p=Math.min(vn.roadWidth*.22,d*.34,f*.34),x=l.clone().addScaledVector(h,-p),g=l.clone().addScaledVector(u,p);r(x),n.add(new ds(x,l.clone(),g)),i=g}return r(t.at(-1)),n}function Qc(s,e,t=80){let n=[];for(let i=0;i<=t;i+=1){let r=i/t,a=s.getPointAt(r),o=s.getTangentAt(Math.min(.9999,r)).normalize(),l=new T(-o.z,0,o.x).normalize();n.push(a.clone().addScaledVector(l,e))}return new xn(n,!1,"centripetal",.4)}function Pp(s,e){let t=Math.sin(e*(s.speedFrequency??.31)+(s.speedPhase??s.offset*9))*(s.speedVariance??0),n=s.offset+e*Math.abs(s.speed)+t;return n-=Math.floor(n),s.speed<0?1-n:n}function Uv(s){let e=document.createElement("button");e.type="button",e.className="city3d-label",e.dataset.entity=s.id,e.dataset.kind=s.kind,e.setAttribute("aria-label",`Show details for ${s.name}`),e.setAttribute("aria-controls","selection-details");let t=document.createElement("span");t.className="city3d-label-code",t.textContent=s.code;let n=document.createElement("span");n.className="city3d-label-name",n.textContent=s.name;let i=document.createElement("span");return i.className="city3d-label-state",i.setAttribute("aria-hidden","true"),e.append(t,n,i),e}var Eu=class{constructor(e,t){this.stage=e,this.error=t;let n=e?.querySelector(".city3d-loading");n&&(n.classList.add("is-error"),n.textContent="3D city unavailable in this browser.")}setTopology(){return Promise.resolve(!1)}setStatuses(){}setLiveDeployments(){}handleReleaseEvent(){return Promise.resolve(!1)}select(){}fit(){}zoom(){}setVisible(){}resetSimulation(){}destroy(){}simulateDeployment(){return Promise.resolve(!1)}},el=class{constructor({stage:e,onSelect:t=()=>{},onNavigate:n=()=>{},onActivate:i=()=>{}}={}){if(!e)throw new Error("City3D requires a stage element");this.stage=e,this.renderPolicy=Mp({width:e.clientWidth,coarsePointer:window.matchMedia("(pointer: coarse)").matches}),this.stage.dataset.renderProfile=this.renderPolicy.compact?"mobile":"desktop",this.onSelect=t,this.onNavigate=n,this.onActivate=i,this.loading=e.querySelector(".city3d-loading"),this.assetCache=new Map,this.loadedAssets=new Set,this.entityGroups=new Map,this.pickables=[],this.motion=[],this.signalMotion=[],this.smoke=[],this.ambientCouriers=[],this.signalFixtures=[],this.activeDelivery=null,this.trains=[],this.waterMaterial=null,this.terrainContext=null,delete this.stage.dataset.ambientUpdates,this.positions=new Map,this.layoutEntities=new Map,this.worldGeneration=0,this.simulationGeneration=0,this.selectedId="deploy-manager",this.liveAppIds=new Set,this.visible=!0,this.motionPreference=window.matchMedia("(prefers-reduced-motion: reduce)"),this.reducedMotion=this.motionPreference.matches,this.lastReducedMotionFrame=-1/0,this.stage.dataset.motion=this.reducedMotion?"reduced":"full",this.onMotionPreferenceChange=a=>{this.reducedMotion=a.matches,this.lastReducedMotionFrame=-1/0,this.stage.dataset.motion=this.reducedMotion?"reduced":"full",this.renderer&&(this.renderer.shadowMap.autoUpdate=!1,this.renderer.shadowMap.needsUpdate=!0)},this.motionPreference.addEventListener?.("change",this.onMotionPreferenceChange),this.startedAt=performance.now(),this.pointerStart=null,this.topology={routes:[],datastores:[]},this.destroyed=!1,this.hasFitted=!1,this.currentLiveJobId=null,this.currentLivePhase=null,this.releaseEventChain=Promise.resolve(!0),this.scene=new Ur,this.scene.background=new we(Qe.paper),this.camera=new jn(-20,20,14,-14,.1,1e3),this.camera.position.set(...Ta.position),this.camera.lookAt(0,0,0),this.renderer=new Dc({antialias:!this.renderPolicy.compact,powerPreference:"default"}),this.renderer.setPixelRatio(yu(this.renderPolicy,e.clientWidth,e.clientHeight,window.devicePixelRatio||1)),this.renderer.outputColorSpace=xt,this.renderer.toneMapping=aa,this.renderer.toneMappingExposure=.94,this.renderer.shadowMap.enabled=this.renderPolicy.shadows,this.renderer.shadowMap.type=gs,this.renderer.shadowMap.autoUpdate=!1,this.renderer.shadowMap.needsUpdate=!0,this.renderer.domElement.className="city3d-canvas",this.renderer.domElement.setAttribute("aria-label","Interactive 3D map of the Deploy Manager release city"),this.renderer.domElement.setAttribute("aria-describedby","city-instructions"),this.renderer.domElement.setAttribute("role","application"),this.renderer.domElement.tabIndex=0,this.labelRenderer=new Hc,this.labelRenderer.domElement.className="city3d-label-layer",e.prepend(this.renderer.domElement),e.append(this.labelRenderer.domElement),this.controls=new kc(this.camera,e),this.controls.enableDamping=!0,this.controls.dampingFactor=.075,this.controls.enablePan=!0,this.controls.screenSpacePanning=!1,this.controls.enableRotate=!0,this.controls.minPolarAngle=Math.PI*.22,this.controls.maxPolarAngle=Math.PI*.43,this.controls.minZoom=.56,this.controls.maxZoom=2.7,this.controls.target.set(...Ta.target),this.homeAzimuth=Math.atan2(this.camera.position.x-this.controls.target.x,this.camera.position.z-this.controls.target.z),this.onControlsChange=()=>{this.updateCompass(),this.labelsDirty=!0},this.controls.addEventListener("change",this.onControlsChange);let r=new sr;r.onProgress=(a,o,l)=>{this.loading&&(this.loading.textContent=`ASSEMBLING CITY \xB7 ${o}/${l}`)},this.loader=new Fc(r),this.world=new Je,this.world.name="procedural-city",this.scene.add(this.world),this.addLights(),this.createSelectionMarker(),this.raycaster=new sa,this.pointer=new oe,this.bindInput(),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),this.resize(),this.updateCompass(),this.animate()}addLights(){let e=new Jr(16775133,5333350,1.35);this.scene.add(e);let t=new Hi(16773327,2.4);t.position.set(-18,31,20),t.castShadow=!0,t.shadow.mapSize.set(2048,2048),t.shadow.camera.left=-34,t.shadow.camera.right=34,t.shadow.camera.top=34,t.shadow.camera.bottom=-34,t.shadow.camera.near=1,t.shadow.camera.far=90,t.shadow.bias=-35e-5,this.scene.add(t);let n=new Hi(8570818,.5);n.position.set(20,11,-20),this.scene.add(n)}createSelectionMarker(){let e=new nr(2.46,2.62,4,1,Math.PI/4),t=new gt({color:Qe.rustBright,transparent:!0,opacity:.9,depthWrite:!1,side:Ut});this.selectionMarker=new be(e,t),this.selectionMarker.rotation.x=-Math.PI/2,this.selectionMarker.position.y=.24,this.selectionMarker.visible=!1,this.scene.add(this.selectionMarker)}bindInput(){this.tapGesture=new Xc;let e=l=>{clearTimeout(this.tapFallbackTimer),this.tapGesture.down(l)},t=l=>{let c=this.tapGesture.up(l);if(!c)return;if(!c.tap){this.pendingLabelTap=null,this.pendingGhostTap=null,this.suppressGhostClickUntil=performance.now()+400;return}let h=c.target?.closest?.(".city3d-label");if(h){this.pendingLabelTap={label:h,at:performance.now()},this.tapFallbackTimer=setTimeout(()=>{this.pendingLabelTap=null,this.onSelect(h.dataset.entity,{reveal:!0})},350);return}if(c.target?.closest?.(".city3d-ghost-link")){this.suppressGhostClickUntil=0;let d=c.target.closest(".city3d-ghost-link");this.pendingGhostTap={link:d,at:performance.now()},this.tapFallbackTimer=setTimeout(()=>{this.pendingGhostTap=null;let f=document.querySelector("#build-city-dialog");f&&!f.open&&(d.focus({preventScroll:!0}),f.showModal())},350);return}let u=c.target?.closest?.(".city3d-label")?.dataset.entity??this.entityAtPointer(l);u&&this.onSelect(u)},n=l=>{this.tapGesture.up(l,!0),this.pendingLabelTap=null,this.pendingGhostTap=null,this.suppressGhostClickUntil=performance.now()+400},i=l=>{let c=l.target.closest?.(".city3d-label"),h=this.pendingLabelTap;if(this.pendingLabelTap=null,c){clearTimeout(this.tapFallbackTimer),l.preventDefault(),(l.detail===0||h?.label===c&&performance.now()-h.at<1e3)&&this.onSelect(c.dataset.entity,{reveal:!0});return}let u=this.pendingGhostTap;if(this.pendingGhostTap=null,!u||performance.now()-u.at>1e3)return;if(clearTimeout(this.tapFallbackTimer),l.preventDefault(),l.stopPropagation(),l.ctrlKey||l.metaKey||l.shiftKey||l.altKey){window.open(u.link.href,"_blank","noopener,noreferrer");return}let d=document.querySelector("#build-city-dialog");d&&!d.open&&(u.link.focus({preventScroll:!0}),d.showModal())},r=l=>{if(this.tapGesture.move(l),l.pointerType==="touch")return;let c=!!this.entityAtPointer(l);this.renderer.domElement.classList.toggle("is-over-entity",c)},a=()=>this.renderer.domElement.classList.remove("is-over-entity"),o=l=>{l.target===this.renderer.domElement&&(l.key==="ArrowLeft"||l.key==="ArrowUp"?(l.preventDefault(),this.onNavigate(-1)):l.key==="ArrowRight"||l.key==="ArrowDown"?(l.preventDefault(),this.onNavigate(1)):l.key==="Enter"?(l.preventDefault(),this.onActivate()):l.key==="Home"&&(l.preventDefault(),this.fit()))};this.inputHandlers={pointerdown:e,pointerup:t,pointercancel:n,pointermove:r,pointerleave:a,keydown:o,click:i};for(let[l,c]of Object.entries(this.inputHandlers))this.stage.addEventListener(l,c)}entityAtPointer(e){let t=this.renderer.domElement.getBoundingClientRect();return this.pointer.x=(e.clientX-t.left)/t.width*2-1,this.pointer.y=-((e.clientY-t.top)/t.height)*2+1,this.raycaster.setFromCamera(this.pointer,this.camera),this.raycaster.intersectObjects(this.pickables,!0).find(i=>i.object.userData.entityId)?.object.userData.entityId??null}updateCompass(){this.stage.dataset.cameraZoom=this.camera.zoom.toFixed(3);let e=Math.atan2(this.camera.position.x-this.controls.target.x,this.camera.position.z-this.controls.target.z),t=24-Ze.radToDeg(e-this.homeAzimuth);this.stage.style.setProperty("--north-rotation",`${t.toFixed(2)}deg`)}resize(){let e=Math.max(1,this.stage.clientWidth),t=Math.max(1,this.stage.clientHeight),n=yu(this.renderPolicy,e,t,window.devicePixelRatio||1);this.renderer.getPixelRatio()!==n&&this.renderer.setPixelRatio(n);let i=e/t,r=i<.8&&this.layout?Math.max(this.baseFrustum??39,(this.layout.extent*1.5+6)/i):this.baseFrustum??39;this.camera.left=-(r*i)/2,this.camera.right=r*i/2,this.camera.top=r/2,this.camera.bottom=-r/2,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1),this.labelRenderer.setSize(e,t)}async loadAsset(e){if(!vu[e])throw new Error(`Unknown city asset: ${e}`);return this.assetCache.has(e)||this.assetCache.set(e,this.loader.loadAsync(vu[e]).then(t=>(this.loadedAssets.add(e),Cv(t.scene,e)))),this.assetCache.get(e)}async cloneAsset(e,t){return Dv(await this.loadAsset(e),t)}clearWorld(){this.storyActors=[],this.portLife=null,this.gulls=null,this.stationService=null,this.windowDusk={value:.45},this.signalFixtures=[],this.activeDelivery=null,this.worldStream?.dispose(),this.worldStream=null,this.lastStreamKey=null,this.waterMaterial?.dispose(),this.worldGeneration+=1,this.scene.remove(this.world),qc(this.world),this.world=new Je,this.world.name="procedural-city",this.scene.add(this.world),this.entityGroups.clear(),this.pickables=[],this.motion=[],this.signalMotion=[],this.smoke=[],this.ambientCouriers=[],this.trains=[],this.waterMaterial=null,this.terrainContext=null,this.positions.clear(),delete this.stage.dataset.ambientUpdates,this.layoutEntities.clear(),this.deliveryTruck=null,this.deliveryHome=null,this.deliveryAccess=null,this.deliveryHomeRotation=0,this.releasePacket=null}setTopology(e){return this.topology=e??{routes:[],datastores:[]},this.rebuild()}async rebuild(){this.resetSimulation(),this.clearWorld();let e=this.worldGeneration,t=Fp(this.topology);this.layout=t,this.baseFrustum=Math.max(41,t.extent+21),this.resize(),this.loading&&(this.loading.hidden=!1,this.loading.classList.remove("is-error"),this.loading.textContent="ASSEMBLING CITY \xB7 0/0"),this.buildGround(t),this.buildConnections(t);let n=[this.buildInfiniteWorld(e),this.buildRoadDetails(t,e),...t.entities.map(a=>this.addEntity(a,e)),this.buildAmbientWorld(t,e)],i=await Promise.allSettled(n);if(e!==this.worldGeneration)return!1;let r=i.filter(a=>a.status==="rejected");return this.stage.dataset.batchedDrawsSaved=String(yp(this.world,[...this.entityGroups.values(),...this.motion.map(a=>a.object),...this.trains.flatMap(a=>a.cars),...this.signalMotion.map(a=>a.object),...this.smoke.map(a=>a.puff),this.deliveryTruck,this.releasePacket,...(this.signalFixtures??[]).map(a=>a.group),...this.storyActors??[],...this.worldStream?.chunks.values()??[],...this.worldStream?.routes.values()??[]])),this.stage.dataset.loadedAssets=[...this.loadedAssets].sort().join(","),this.renderer.shadowMap.needsUpdate=!0,this.loading&&(this.loading.hidden=!0,r.length?this.stage.dataset.assetWarnings=String(r.length):delete this.stage.dataset.assetWarnings),this.setStatuses(this.topology),this.setLiveDeployments([...this.liveAppIds]),this.select(this.selectedId),this.hasFitted||(this.fit(),this.hasFitted=!0),r.length===0}buildGround(e){let{lotSize:t,roadWidth:n,pitch:i}=vn,r=e.extent,a=-((e.size-1)*i)/2;this.perimeter=Op(e),this.bounds=this.perimeter.bounds,this.highwayZ=this.perimeter.highway.z,this.highwayMinX=this.perimeter.highway.minX,this.highwayMaxX=this.perimeter.highway.maxX,this.railX=this.perimeter.rail.x,this.railMinZ=this.perimeter.rail.minZ,this.railMaxZ=this.perimeter.rail.maxZ,this.transitCurves=kp(this.perimeter),this.highwayCurve=this.transitCurves.highway,this.highwayStraights=this.transitCurves.highwayStraights,this.highwayAssets=this.transitCurves.highwayAssets,this.railCurve=this.transitCurves.rail,this.railStraights=this.transitCurves.railStraights,this.railAssets=this.transitCurves.railAssets,this.coastlineCurve=this.transitCurves.coastline,this.shippingLanes=this.transitCurves.shippingLanes,this.regionalPlan=_u(this.perimeter,this.coastlineCurve),this.addTerrain();let o=new tt({color:Qe.paperLight,roughness:.98}),l=new tt({color:14275500,roughness:1});for(let h of e.cells){let u=e.occupiedCellKeys.has(`${h.col}:${h.row}`);Ss(this.world,new T(t,.18,t),new T(h.x,0,h.z),u?o:l,u?.38:.2)}let c=new tt({color:Qe.road,roughness:.96});for(let h=0;h<e.size-1;h+=1){let u=a+t/2+n/2+h*i;Ss(this.world,new T(n,.12,r),new T(u,.08,0),c,.2),Ss(this.world,new T(r,.12,n),new T(0,.08,u),c,.2)}this.waterMaterial=ap(this.perimeter.coast.shoreX),this.addProceduralRail()}addTerrain(){this.terrainContext=Gp(this.perimeter,this.highwayCurve,this.railCurve,this.coastlineCurve),this.addTerrainGrass()}async buildInfiniteWorld(e){let[t,n]=await Promise.all([this.cloneAsset("roads/straight",{width:2.2857142857142856,depth:2.28,exact:!0}),this.cloneAsset("suburban/tree",{width:1.3,depth:1.3,height:2.8})]);if(e===this.worldGeneration)for(this.worldStream=new Wc({resolution:this.renderPolicy.surfaceResolution,treeCount:this.renderPolicy.treeCount,world:this.world,waterMaterial:this.waterMaterial,roadModel:t,treeModel:n,context:this.terrainContext,heightAt:(i,r)=>Aa(i,r,this.terrainContext),colorAt:(i,r)=>{let a=Vp(r,this.terrainContext)-i,o=yr(i,r,this.bounds);return new we(Qe.paperDark).lerp(new we(Qe.hillLight).lerp(new we(Qe.hillDark),$c(i,r)*.52),ji(.75,4.8,o)).lerp(new we(Qe.sand),1-ji(.15,1.7,a))},siteDistance:(i,r)=>Math.min(yr(i,r,this.bounds),wa(i,r,this.terrainContext.flatCorridors),Sa(i,r,this.terrainContext.continuations))}),this.updateWorldStream();this.worldStream?.pendingCount&&e===this.worldGeneration;)await new Promise(i=>requestAnimationFrame(i))}updateWorldStream(){if(!this.worldStream)return;let e=(this.camera.right-this.camera.left)/(2*this.camera.zoom),t=(this.camera.top-this.camera.bottom)/(2*this.camera.zoom),n=this.controls.getPolarAngle(),i=Math.ceil(Math.hypot(e,t/Math.cos(n))+20),r=`${Math.floor(this.controls.target.x/8)}:${Math.floor(this.controls.target.z/8)}:${Math.ceil(i/8)}:${Math.round(this.controls.getAzimuthalAngle()*16)}`;if(r===this.lastStreamKey)return;this.lastStreamKey=r,this.camera.updateMatrixWorld(!0);let a=new Bi().setFromProjectionMatrix(new Be().multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse));this.worldStream.update(this.controls.target,Math.ceil(i/8)*8,{frustum:a,deferred:!0}),this.stage.dataset.worldChunks=String(this.worldStream.chunks.size),this.stage.dataset.transportChunks=String(this.worldStream.routes.size),this.stage.dataset.worldCenter=`${Math.round(this.controls.target.x)},${Math.round(this.controls.target.z)}`,this.renderer.shadowMap.needsUpdate=!0}addTerrainGrass(){let e=this.terrainContext;if(!e)return;let t=new gi(.055,.34,3,1);t.translate(0,.17,0);let n=new tt({color:Qe.hillLight,roughness:1,flatShading:!0}),i=new Vt(t,n,un.grassCount);i.name="instanced-whole-domain-grass",i.castShadow=!1,i.receiveShadow=!0,i.raycast=()=>{},i.frustumCulled=!1;let r=new je,a=new we(Qe.hillLight),o=new we(Qe.hillDark),l=0;for(let c=0;c<18e3&&l<un.grassCount;c+=1){let h=(Math.sin(c*78.233+1.17)*43758.5453%1+1)%1,u=(Math.sin(c*39.417+7.31)*24634.6345%1+1)%1,d=e.coastline.getPoint(u),f=Ze.lerp(e.bounds.minX+2.8,d.x-2.05,h),p=d.z,x=yr(f,p,e.perimeter.bounds),g=wa(f,p,e.flatCorridors),m=Math.min(f-e.bounds.minX,p-e.bounds.minZ,e.bounds.maxZ-p),_=Aa(f,p,e),b=$c(f,p),y=Ti(`grass-density:${c}`)%1e3/1e3;if(x<3.1||g<2.65||Sa(f,p,e.continuations)<2||ba(f,p,this.regionalPlan)<1.2||m<10.8||_<un.baseY+.2||y>.18+b*.78)continue;let w=.58+b*.42+Ti(`grass:${c}`)%45/100;r.position.set(f,_-.015,p),r.rotation.set(0,Ti(`grass-yaw:${c}`)%6283/1e3,0),r.scale.set(w,w*(.88+c%7*.035),w),r.updateMatrix(),i.setMatrixAt(l,r.matrix),i.setColorAt(l,a.clone().lerp(o,.12+b*.58)),l+=1}i.count=l,i.instanceMatrix.needsUpdate=!0,i.instanceColor&&(i.instanceColor.needsUpdate=!0),this.world.add(i)}addProceduralRail(){let e=this.railCurve.getLength();this.world.add(Vc(t=>this.railCurve.getPointAt(Ze.clamp(t/e,0,1)),0,e))}buildConnections(e){for(let r of e.entities)this.positions.set(r.id,new T(r.x,.3,r.z)),this.layoutEntities.set(r.id,r);let t=new gn({color:Qe.teal,transparent:!0,opacity:.72});for(let r of this.topology.routes??[]){let a=this.streetCurveBetween("caddy",r.id,.34);if(!a)continue;this.world.add(jc(a.getPoints(26),t));let o=new be(new zi(.12,0),new gt({color:Qe.tealBright}));o.castShadow=!0,this.world.add(o),this.signalMotion.push({object:o,curve:a,speed:.035+Ti(r.id)%15/1e3,offset:Ti(r.id)%100/100})}let n=new gn({color:Qe.rust,transparent:!0,opacity:.86});this.releaseCurves={gitToManager:this.streetCurveBetween("git","deploy-manager",.48),managerToDocker:this.streetCurveBetween("deploy-manager","docker",.48)};for(let r of Object.values(this.releaseCurves))r&&this.world.add(jc(r.getPoints(20),n));let i=new ir({color:Qe.rust,dashSize:.35,gapSize:.24,transparent:!0,opacity:.75});for(let r of this.topology.datastores??[])for(let a of r.connectedTo??[]){let o=this.streetCurveBetween(r.id,a,.28);o&&this.world.add(jc(o.getPoints(20),i))}}streetCurveBetween(e,t,n=.34,i={}){let r=this.layoutEntities.get(e),a=this.layoutEntities.get(t);return!r||!a||!this.layout?null:Su(Jc(r,a,this.layout,i),n)}async buildRoadDetails(e,t){let{lotSize:n,roadWidth:i,pitch:r}=vn,a=-((e.size-1)*r)/2,o=[],l=await this.cloneAsset("roads/straight",{width:1,depth:1,exact:!0});if(t!==this.worldGeneration)return;let c=va(this.bounds),h=c.getLength();for(let m of c.curves.filter(_=>_.isLineCurve3)){let _=m.getLength();this.world.add($i(l,b=>m.getPointAt(b/_),_,i))}let{minX:u,maxX:d,minZ:f,maxZ:p}=this.bounds,x=1.05;for(let[m,_,b]of[[d+x,f-x,0],[d+x,p+x,-Math.PI/2],[u-x,p+x,Math.PI],[u-x,f-x,Math.PI/2]])o.push(this.placeAsset("roads/bend",{x:m,z:_,y:.145,rotation:b,fit:{scale:i}},t));for(let m=0;m<e.size-1;m+=1){let _=a+n/2+i/2+m*r;for(let b=0;b<e.size;b+=1){let y=a+b*r;o.push(this.placeAsset("roads/straight",{x:y,y:.15,z:_,rotation:Mu.horizontal,fit:{width:n,depth:i,height:.18,exact:!0}},t))}}for(let m=0;m<e.size-1;m+=1){let _=a+n/2+i/2+m*r;for(let b=0;b<e.size;b+=1){let y=a+b*r;o.push(this.placeAsset("roads/straight",{x:_,y:.15,z:y,rotation:Mu.vertical,fit:{width:n,depth:i,height:.18,exact:!0}},t))}}for(let m=0;m<e.size-1;m+=1)for(let _=0;_<e.size-1;_+=1){let b=a+n/2+i/2+_*r,y=a+n/2+i/2+m*r;o.push(this.placeAsset("roads/crossroad",{x:b,y:.16,z:y,fit:{width:i,depth:i,height:.2,exact:!0}},t))}let g=zp(this.perimeter);o.push(this.placeAsset("roads/highway-sign",{x:g.x,y:.18,z:g.z,rotation:g.rotation,fit:{width:5,depth:4.5,height:4.2}},t)),o.push(this.addHighwayRoadAssets(t));for(let m=0;m<e.size-1;m++){let _=a+n/2+i/2+m*r;for(let b of[-1,1]){let y=b*this.bounds.maxX;for(let w of["x","z"]){let S=w==="x"?new T(y,.15,_):new T(_,.15,y),R=S.clone();R[w]+=b*1.05;let v=new Xt(S,R);this.world.add($i(l,A=>v.getPointAt(A/1.05),1.05,i)),o.push(this.placeAsset("roads/crossroad",{x:R.x,z:R.z,y:.17,fit:{width:i,depth:i,exact:!0}},t))}}}await Promise.all(o)}async addHighwayRoadAssets(e){let t=this.highwayStraights.map(i=>this.placeTransitAssetRun("roads/straight",i,{crossWidth:this.perimeter.highway.width,maxSegmentLength:2.28,y:.145,localAxis:"x"},e)),n=this.highwayAssets.map(i=>this.placeAsset(i.key,{x:i.x,y:.145,z:i.z,rotation:i.rotation,fit:{scale:An.tileScale}},e));await Promise.all([...t,...n])}async placeTransitAssetRun(e,t,n,i){if(e==="roads/straight"){let l=await this.cloneAsset(e,{width:1,depth:1,exact:!0});if(i!==this.worldGeneration)return;let c=t.getLength();this.world.add($i(l,h=>{let u=t.getPointAt(h/c);return u.y=n.y,u},c,n.crossWidth));return}let r=t.getLength(),a=Math.max(1,Math.ceil(r/n.maxSegmentLength)),o=r/a;await Promise.all(Array.from({length:a},async(l,c)=>{let h=n.localAxis==="x"?{width:o,depth:n.crossWidth,height:.24,exact:!0}:{width:n.crossWidth,depth:o,height:.32,exact:!0},u=await this.cloneAsset(e,h);if(i!==this.worldGeneration)return;let d=(c+.5)/a,f=t.getPointAt(d),p=t.getTangentAt(d);u.name=`${e}:segment-${c+1}`,u.position.copy(f),u.position.y=n.y,u.rotation.y=n.localAxis==="x"?-Math.atan2(p.z,p.x):Math.atan2(p.x,p.z),this.world.add(u)}))}async placeAsset(e,t,n){let i=await this.cloneAsset(e,t.fit);return n!==this.worldGeneration?null:(i.position.set(t.x,t.y??.12,t.z),i.rotation.y=t.rotation??0,this.world.add(i),i)}async addEntity(e,t){let n=e.id==="deploy-manager",i=e.id==="docker",r=e.kind==="datastore"?{width:3.4,depth:3.4,height:4.5}:n?{width:3.75,depth:3.75,height:7.2}:i?{width:3.15,depth:3.15,height:4.4}:{width:4.18,depth:4.18,height:5.25},a;try{a=await this.cloneAsset(e.modelKey,r)}catch{a=new Je,Ss(a,new T(3.3,2.5,3.3),new T(0,1.25,0),new tt({color:Qe.paperLight,roughness:1}))}if(t!==this.worldGeneration)return;let o=new Je;o.name=`entity:${e.id}`,o.position.set(e.x,.17,e.z),o.userData={entityId:e.id,appId:e.appId,status:e.status,modelRoot:a},a.position.y=.02,o.add(a);let l=new tt({color:e.kind==="control"?Qe.inkSoft:e.kind==="datastore"?13998709:14669748,roughness:.95}),c=Ss(o,new T(4.62,.14,4.62),new T(0,-.02,0),l,.42);c.userData.entityId=e.id,i&&await this.addDockerCargo(o,t);let h=new It().setFromObject(o),u=Math.max(2.1,h.max.y-o.position.y),d=Uv(e),f=document.createElement("div");f.className="city3d-label-anchor",f.append(d);let p=new ya(f);p.center.set(.5,1);let x=e.col===0?.72:e.col===this.layout.size-1?-.72:0;p.position.set(x,u+.62,0),o.add(p);let g=new be(new zi(.18,0),new gt({color:Ap(e.status),transparent:!0,opacity:.96}));g.position.set(0,u+.28,0),o.add(g),o.userData.beacon=g,o.userData.labelElement=d,o.userData.baseScale=a.scale.clone(),o.userData.height=u,Rv(o,e.id),o.traverse(m=>{m.isMesh&&m!==g&&this.pickables.push(m)}),this.world.add(o),this.entityGroups.set(e.id,o),lp(o),(e.modelKey.startsWith("industrial/building-e")||e.modelKey.startsWith("industrial/building-m"))&&this.addSmoke(o,u)}async addDockerCargo(e,t){let[n,i]=await Promise.all([this.cloneAsset("industrial/container-a",{width:1.12,depth:1.72,height:.95}),this.cloneAsset("industrial/container-b",{width:1.12,depth:1.72,height:.95})]);t===this.worldGeneration&&(n.position.set(-1.34,.12,1.25),i.position.set(.18,.12,1.25),n.rotation.y=i.rotation.y=Math.PI/2,e.add(n,i),e.userData.yardContainers=[n,i])}addSmoke(e,t){let n=new gt({color:12567485,transparent:!0,opacity:.28,depthWrite:!1});for(let i=0;i<4;i+=1){let r=new be(new On(.16+i*.035,8,6),n.clone());r.position.set(.54,t*.72+i*.34,-.32),e.add(r),this.smoke.push({puff:r,baseX:r.position.x,baseY:r.position.y,phase:i/4})}}async buildAmbientWorld(e,t){let n=e.cells.filter(i=>!e.occupiedCellKeys.has(`${i.col}:${i.row}`));await Promise.all([this.addGhostTown(n,t),this.addTerrainTrees(t),this.addHighwayTraffic(t),this.addRailTraffic(t),this.addWaterTraffic(t),this.addDeliveryTruck(t),this.addAmbientDeliveryLoops(t),gp(this,t,{heightAt:(i,r)=>Aa(i,r,this.terrainContext),siteDistance:(i,r)=>Math.min(yr(i,r,this.bounds),wa(i,r,this.terrainContext.flatCorridors))})])}async addGhostTown(e,t){let n=e.slice(0,bu.length),i=await Promise.all(n.map(async(c,h)=>{let u=await this.cloneAsset(bu[h],{width:3.65,depth:3.65,height:h===1?5.1:4.25});return{cell:c,ghost:u,index:h}}));if(t!==this.worldGeneration)return;for(let{cell:c,ghost:h,index:u}of i){let d=vn.lotSize*.39,f=new hs(new et().setFromPoints([new T(-d,0,-d),new T(d,0,-d),new T(d,0,d),new T(-d,0,d)]),new ir({color:u===1?Qe.rust:Qe.teal,dashSize:.34,gapSize:.22,transparent:!0,opacity:.72}));f.name=`future-foundation:${u+1}`,f.position.set(c.x,.23,c.z),f.computeLineDistances(),f.raycast=()=>{},this.world.add(f),h.name=`ghost-plot:${u+1}`,h.position.set(c.x,.14,c.z),h.traverse(p=>{if(p.isLineSegments){p.material=p.material.clone(),delete p.material.userData.deployManagerSharedAsset,p.material.transparent=!0,p.material.opacity=.13,p.material.depthWrite=!1;return}if(!p.isMesh)return;let g=(Array.isArray(p.material)?p.material:[p.material]).map(m=>{let _=m.clone();return delete _.userData.deployManagerSharedAsset,_.transparent=!0,_.opacity=.18,_.depthWrite=!1,_});p.material=Array.isArray(p.material)?g:g[0],p.castShadow=!1,p.receiveShadow=!1,p.raycast=()=>{}}),this.world.add(h)}if(!i.length)return;let r=i[Math.floor(i.length/2)],a=document.createElement("a");a.className="city3d-ghost-link",a.href="https://github.com/YesterdaysLemon/deploy-manager",a.target="_blank",a.rel="noreferrer",a.textContent="BUILD YOUR OWN CITY \u2197",a.setAttribute("aria-label","Build your own city \u2014 setup options"),a.addEventListener("click",c=>{if(clearTimeout(this.tapFallbackTimer),c.ctrlKey||c.metaKey||c.shiftKey||c.altKey)return;let h=document.querySelector("#build-city-dialog");h?.showModal&&(c.preventDefault(),c.stopPropagation(),performance.now()>(this.suppressGhostClickUntil??0)&&!h.open&&h.showModal())});let o=document.createElement("div");o.className="city3d-ghost-anchor",o.append(a);let l=new ya(o);l.center.set(.5,1),l.onAfterRender=(c,h,u)=>{if(this.stage.clientWidth>700)return;let d=new T().setFromMatrixPosition(l.matrixWorld).project(u),f=vp((d.x+1)*this.stage.clientWidth/2,(1-d.y)*this.stage.clientHeight/2,o.offsetWidth,o.offsetHeight,this.stage.clientWidth,this.stage.clientHeight);o.style.transform=`translate(-50%, -100%) translate(${f.x}px, ${f.y}px)`},l.position.set(r.cell.x,5.7,r.cell.z),this.world.add(l)}async addTerrainTrees(e){let t=[],n=this.terrainContext;if(!n)return;for(let r=0;r<6e3&&t.length<un.treeCount;r+=1){let a=(Math.sin(r*91.731+.43)*43758.5453%1+1)%1,o=(Math.sin(r*47.173+2.17)*24634.6345%1+1)%1,l=n.coastline.getPoint(o),c=Ze.lerp(n.perimeter.bounds.minX-32,l.x-3.2,a),h=Ze.lerp(n.perimeter.bounds.minZ-30,n.perimeter.bounds.maxZ+38,o),u=Aa(c,h,n),d=$c(c,h),f=Ti(`tree-density:${r}`)%1e3/1e3,p=Math.min(c-n.bounds.minX,h-n.bounds.minZ,n.bounds.maxZ-h);u<.42||yr(c,h,n.perimeter.bounds)<2.8||wa(c,h,n.flatCorridors)<2.3||Sa(c,h,n.continuations)<3.4||ba(c,h,this.regionalPlan)<1.3||p<11.4||f>.2+d**1.15||t.some(x=>Math.hypot(x.x-c,x.z-h)<1.15)||t.push({x:c,y:u,z:h,height:1.9+d*1.3+r*37%9*.13})}let i=await Promise.all(t.map(async(r,a)=>{let o=await this.cloneAsset(a%3?"suburban/tree":"suburban/tree-small",{width:r.height*.65,depth:r.height*.65,height:r.height});return o.name=`terrain-tree:${a+1}`,o.position.set(r.x,r.y-.04,r.z),o.rotation.y=Ti(`terrain-tree:${a}`)%628/100,o}));if(e===this.worldGeneration)for(let r of i)r&&this.world.add(r)}async addHighwayTraffic(e){let t=new Map([[-.5,Qc(this.highwayCurve,-.5,96)],[.5,Qc(this.highwayCurve,.5,96)]]);await Promise.all(Dp.map(async(n,i)=>{let r=n.key==="cars/truck",a=await this.cloneAsset(n.key,{width:r?1.08:.96,depth:r?2.12:1.82,height:r?1.08:.9});e===this.worldGeneration&&(this.world.add(a),this.motion.push({object:a,curve:t.get(n.lane),speed:n.speed,offset:n.offset,rotationOffset:n.speed<0?Math.PI:0,speedVariance:n.variance,speedFrequency:n.frequency,speedPhase:i*1.37,wrap:!0,trafficLane:n.lane,vehicleLength:r?2.12:1.82,cruiseSpeed:Math.abs(n.speed)*80}))}))}async addRailTraffic(e){let t=this.railCurve.getLength(),[n,i,r,a]=await Promise.all([this.cloneAsset("trains/engine",{width:1.34,depth:3.05,height:1.68}),this.cloneAsset("trains/carriage",{width:1.3,depth:2.9,height:1.55}),this.cloneAsset("trains/carriage-coal",{width:1.32,depth:2.9,height:1.5}),this.cloneAsset("trains/carriage",{width:1.3,depth:2.9,height:1.55})]);if(e!==this.worldGeneration)return;let o=[n,i,r,a];for(let u of o)this.world.add(u);this.trains.push({cars:o,curve:this.railCurve,speed:Kc.speed,offset:.36,speedVariance:Kc.variance,speedFrequency:Kc.frequency,speedPhase:.8,carGap:3.08/t});let l=await Promise.all([this.cloneAsset("trains/regional-engine",{width:1.18,depth:2.5,height:1.45}),this.cloneAsset("trains/regional-coach",{width:1.18,depth:2.65,height:1.4}),this.cloneAsset("trains/regional-coach",{width:1.18,depth:2.65,height:1.4})]);if(e!==this.worldGeneration)return;for(let u of l)this.world.add(u);this.trains.push({...this.trains[this.trains.length-1],cars:l,carGap:2.8/t,offset:.76});let c=0,h=1/0;for(let u=0;u<=1e3;u++){let d=this.railCurve.getPointAt(u/1e3),f=Math.hypot(d.x-this.railX,d.z-3);f<h&&(h=f,c=u/1e3)}this.trains[this.trains.length-2].timetable={stationDistance:c*t,phase:.56,passenger:!1},this.trains[this.trains.length-1].timetable={stationDistance:c*t,phase:0,passenger:!0}}async addWaterTraffic(e){let[t,n]=await Promise.all([this.cloneAsset("watercraft/tug",{width:1.42,depth:2.65,height:1.65}),this.cloneAsset("watercraft/cargo",{width:2.4,depth:4.65,height:2.25})]);e===this.worldGeneration&&(Cp(t,{length:2.35,width:.62}),Cp(n,{length:4.1,width:1.08}),this.world.add(n,t),this.motion.push({object:t,curve:this.shippingLanes[0],speed:Es[0].speed,offset:.47,rotationOffset:0,speedVariance:Es[0].variance,speedFrequency:Es[0].frequency,speedPhase:.4,wrap:!0,bob:.035,surface:"ocean"}),this.motion.push({object:n,curve:this.shippingLanes[1],speed:Es[1].speed,offset:.56,rotationOffset:Math.PI,speedVariance:Es[1].variance,speedFrequency:Es[1].frequency,speedPhase:2.1,wrap:!0,bob:.018,surface:"ocean"}))}async addDeliveryTruck(e){let t=await this.cloneAsset("cars/delivery",{width:.7,depth:1.5,height:.95});if(e!==this.worldGeneration)return;let n=this.layoutEntities.get("docker"),i=this.layoutEntities.get("caddy")??this.layoutEntities.get("deploy-manager");this.deliveryAccess=Ra(n,i,this.layout,"vertical");let r=this.deliveryAccess?.curb??this.positions.get("docker")??new T,a=this.deliveryAccess?.node??r;t.position.set(r.x,.26,r.z),t.rotation.y=Math.atan2(a.x-r.x,a.z-r.z),this.world.add(t),this.deliveryTruck=t,this.deliveryHome=t.position.clone(),this.deliveryHomeRotation=t.rotation.y}async addAmbientDeliveryLoops(e){let t=this.layoutEntities.get("docker"),n=Bp(this.layout);if(!t||n.length===0)return;let i=Ra(t,n[0],this.layout,"horizontal"),r=["cars/delivery","cars/truck","cars/delivery"];await Promise.all(n.map(async(a,o)=>{let l=await this.cloneAsset(r[o],{width:.7,depth:1.5,height:o===1?1.02:.98});if(e!==this.worldGeneration)return;let c=Jc(t,a,this.layout,{startAccess:i}),h=Jc(a,t,this.layout,{endAccess:i}),u=[...c,...h.slice(1)],d=mu(Su(u,.255),.42),f=new Je;f.name=`ambient-update:${a.id}`,f.add(l);let p=new be(new zi(.13,0),new gt({color:o===1?Qe.tealBright:Qe.rustBright}));p.position.y=1.02,f.add(p),this.world.add(f),this.motion.push({object:f,cityVehicle:!0,bodyWidth:.7,bodyLength:1.5,cruiseSpeed:.85+o*.12,curve:d,speed:.0115+o*.0017,offset:o/Tu,rotationOffset:0,speedVariance:.003+o*7e-4,speedFrequency:.18+o*.035,speedPhase:o*1.9,wrap:!0}),this.ambientCouriers.push(f)})),e===this.worldGeneration&&(this.stage.dataset.ambientUpdates=String(this.ambientCouriers.length))}setStatuses(e=this.topology){let t=new Map([...Np.map(n=>[n.id,e.host?.status??"healthy"]),...(e.routes??[]).map(n=>[n.id,n.status]),...(e.datastores??[]).map(n=>[n.id,n.status])]);for(let[n,i]of this.entityGroups){let r=Hp(t.get(n));i.userData.status=r,i.userData.healthBarrier&&(i.userData.healthBarrier.visible=r==="unhealthy"),i.userData.beacon?.material.color.setHex(Ap(r)),i.userData.labelElement&&(i.userData.labelElement.dataset.status=r)}this.stage.dataset.closedServices=String([...this.entityGroups.values()].filter(n=>n.userData.healthBarrier?.visible).length)}setLiveDeployments(e=[]){this.liveAppIds=new Set(e);for(let t of this.entityGroups.values())t.userData.live=this.liveAppIds.has(t.userData.appId)||this.liveAppIds.size>0&&["deploy-manager","docker"].includes(t.userData.entityId),t.userData.labelElement?.classList.toggle("is-live",t.userData.live)}observeSelfUpdate(e){if(!e?.id||e.id===this.lastObservedReceipt)return;this.lastObservedReceipt=e.id,this.stage.dataset.observedRelease=e.release;let t=this.entityGroups.get("deploy-manager");if(!t)return;let n=new be(new nr(2.12,2.32,40),new gt({color:14924899,side:Ut,transparent:!0,opacity:.8}));n.name="verified-city-release-stamp",n.rotation.x=-Math.PI/2,n.position.y=.24,t.add(n),setTimeout(()=>{n.removeFromParent(),n.geometry.dispose(),n.material.dispose()},4e3)}select(e){this.selectedId=e;for(let[n,i]of this.entityGroups)i.userData.labelElement?.classList.toggle("is-selected",n===e);let t=this.entityGroups.get(e);this.selectionMarker.visible=!!t,t&&this.selectionMarker.position.set(t.position.x,.26,t.position.z)}setVisible(e){this.visible=!!e,this.stage.classList.toggle("is-visible",this.visible),this.visible&&this.resize()}fit(){this.camera.position.set(...Ta.position),this.controls.target.set(...Ta.target),this.camera.zoom=1,this.camera.updateProjectionMatrix(),this.controls.update()}zoom(e){this.camera.zoom=Ze.clamp(this.camera.zoom/e,this.controls.minZoom,this.controls.maxZoom),this.camera.updateProjectionMatrix()}resetSimulation(){this.simulationGeneration+=1,this.releasePacket&&(this.releasePacket.visible=!1),this.deliveryTruck&&this.deliveryHome&&(this.deliveryTruck.position.copy(this.deliveryHome),this.deliveryTruck.rotation.y=this.deliveryHomeRotation,this.deliveryTruck.visible=!0);for(let e of this.entityGroups.values())e.userData.modelRoot?.scale.copy(e.userData.baseScale??new T(1,1,1)),e.userData.labelElement?.classList.remove("is-simulating");this.simulatedHighlight=null}async delay(e,t){let n=this.reducedMotion?0:e;return new Promise(i=>{window.setTimeout(()=>i(t===this.simulationGeneration),n)})}async tween(e,t,n){if(this.reducedMotion)return t!==this.simulationGeneration?!1:(n(1),!0);let i=e,r=performance.now();return new Promise(a=>{let o=l=>{if(t!==this.simulationGeneration){a(!1);return}let c=Math.min(1,(l-r)/Math.max(1,i));try{n(c)}catch(h){console.error("City animation frame failed",h),a(!1);return}c<1?requestAnimationFrame(o):a(!0)};requestAnimationFrame(o)})}async moveAlong(e,t,n,i){if(!e||!t)return!1;if(e===this.deliveryTruck&&!this.reducedMotion){e.visible=!0;let r={object:e,curve:mu(t,.42),once:!0,cityVehicle:!0,cityDistance:0,offset:0,speed:1,bodyWidth:.7,bodyLength:1.5,cruiseSpeed:2},a=this.motion.filter(o=>o.cityVehicle);for(;i===this.simulationGeneration&&a.some(o=>o.cityDistance!==void 0&&xr(ii(r,0),ii(o,o.cityDistance)));)await new Promise(o=>requestAnimationFrame(o));if(i!==this.simulationGeneration)return!1;for(this.activeDelivery=r;i===this.simulationGeneration&&r.cityDistance<r.curve.getLength()-.02;)await new Promise(o=>requestAnimationFrame(o));return this.activeDelivery===r&&(this.activeDelivery=null),i===this.simulationGeneration}return e.visible=!0,this.tween(n,i,r=>{let a=r<.5?2*r*r:1-(-2*r+2)**2/2,o=t.getPointAt(a),l=t.getTangentAt(Math.min(.999,a));e.position.copy(o),e.rotation.y=Math.atan2(l.x,l.z)})}ensureReleasePacket(){return this.releasePacket?this.releasePacket:(this.releasePacket=new be(new zi(.29,0),new tt({color:Qe.rustBright,emissive:Qe.rust,emissiveIntensity:.55,roughness:.55})),this.releasePacket.castShadow=!0,this.world.add(this.releasePacket),this.releasePacket)}setSimulationHighlight(e){this.simulatedHighlight=e;for(let[t,n]of this.entityGroups)n.userData.labelElement?.classList.toggle("is-simulating",t===e)}async rebuildEntity(e,t){let n=this.entityGroups.get(e),i=n?.userData.modelRoot;if(!n||!i)return!1;let r=new Je;r.position.set(n.position.x,.68,n.position.z);let a=new gt({color:Qe.paperLight,transparent:!0,opacity:.72,depthWrite:!1}),o=new gt({color:Qe.rustBright}),l=[];for(let g=0;g<9;g+=1){let m=new be(new On(.18+g%3*.065,7,5),a.clone());m.position.set(Math.cos(g)*1.2,.2,Math.sin(g*1.7)*1.2),r.add(m),l.push({object:m,angle:g*1.7,height:.8+g%4*.32,radius:1+g%3*.25})}for(let g=0;g<6;g+=1){let m=new be(new _t(.08,.34,.08),o);r.add(m),l.push({object:m,angle:g*Math.PI/3,height:1.5+g%2*.5,radius:.8,spin:!0})}let c=new Je;Ss(c,new T(.12,.75,.12),new T(0,0,0),new tt({color:Qe.paperDark})),Ss(c,new T(.62,.2,.2),new T(0,.36,0),new tt({color:Qe.rust})),c.scale.setScalar(1.35);let h=new Je,u=new tt({color:Qe.teal,roughness:.68,metalness:.12}),d=new be(new ps(.22,.07,7,12),u),f=new be(new _t(.13,.84,.13),u);f.position.y=-.45,h.add(d,f),h.scale.setScalar(1.25),r.add(c),r.add(h),this.world.add(r);let p=n.userData.baseScale??new T(1,1,1),x=await this.tween(1650,t,g=>{let m=g<.38?1-g/.38*.9:.1+(g-.38)/.62*.9,_=g>.78?Math.sin((g-.78)*Math.PI*5)*(1-g)*.24:0;i.scale.set(p.x,p.y*Math.max(.08,m+_),p.z);let b=Math.sin(g*Math.PI);for(let y of l)y.object.position.x=Math.cos(y.angle+g*2.8)*y.radius*b,y.object.position.z=Math.sin(y.angle+g*2.8)*y.radius*b,y.object.position.y=.25+y.height*b,y.object.material.opacity=Math.max(0,b*.85),y.spin&&(y.object.rotation.z=g*Math.PI*5);c.position.set(-1.35*b,.4+2.2*b,.85*b),c.rotation.z=-.6+g*Math.PI*4,h.position.set(1.3*b,.55+2.45*b,-.9*b),h.rotation.set(g*Math.PI*2.5,.5,.6-g*Math.PI*4.5)});return this.world.remove(r),qc(r),i.scale.copy(p),x}async simulateDeployment(e,t=()=>{}){this.resetSimulation();let n=this.simulationGeneration,i=this.positions.get(e),r=this.positions.get("docker");if(!i||!r||!this.deliveryTruck)return!1;let a=this.ensureReleasePacket(),o=h=>{n===this.simulationGeneration&&t(h)};if(o("incoming"),!await this.moveAlong(a,this.releaseCurves.gitToManager,1250,n)||(this.setSimulationHighlight("deploy-manager"),o("build"),!await this.delay(850,n))||(o("candidate"),!await this.moveAlong(a,this.releaseCurves.managerToDocker,900,n))||(this.setSimulationHighlight("docker"),o("promote"),!await this.delay(820,n)))return!1;a.visible=!1;let l=this.streetCurveBetween("docker",e,.31,{startAccess:this.deliveryAccess});if(o("deliver"),!await this.moveAlong(this.deliveryTruck,l,1780,n)||(this.setSimulationHighlight(e),o("rebuild"),!await this.rebuildEntity(e,n))||(o("verify"),!await this.delay(700,n)))return!1;let c=this.streetCurveBetween(e,"docker",.31,{endAccess:this.deliveryAccess});return o("return"),await this.moveAlong(this.deliveryTruck,c,1320,n)?(o("complete"),this.resetSimulation(),!0):!1}handleReleaseEvent(e){return this.releaseEventChain=this.releaseEventChain.then(()=>this.animateReleaseEvent(e)).catch(t=>(console.error("Unable to render factual release event",t),!1)),this.releaseEventChain}async animateReleaseEvent({jobId:e,targetId:t,phase:n,status:i}){if(this.destroyed||!e||!t)return!1;this.currentLiveJobId!==e&&(this.resetSimulation(),this.currentLiveJobId=e,this.currentLivePhase=null,this.liveTruckAtTarget=!1);let r=this.simulationGeneration;if(!this.positions.get(t))return!1;let o=this.ensureReleasePacket();if(["accepted","queued","starting"].includes(n)){this.currentLivePhase=n;let l=this.releaseCurves.gitToManager?.getPointAt(0);return l&&o.position.copy(l),o.visible=!0,this.setSimulationHighlight("git"),!0}if(n==="fetch")return this.currentLivePhase=n,o.visible=!0,this.setSimulationHighlight("deploy-manager"),this.moveAlong(o,this.releaseCurves.gitToManager,820,r);if(n==="build")return this.currentLivePhase=n,this.setSimulationHighlight("deploy-manager"),this.delay(480,r);if(n==="candidate"){this.currentLivePhase=n,o.visible=!0;let l=this.releaseCurves.managerToDocker?.getPointAt(0);return l&&o.position.copy(l),this.setSimulationHighlight("docker"),this.moveAlong(o,this.releaseCurves.managerToDocker,720,r)}if(n==="promote"){this.currentLivePhase=n,o.visible=!1,this.setSimulationHighlight(t);let l=this.streetCurveBetween("docker",t,.31,{startAccess:this.deliveryAccess});return!this.liveTruckAtTarget&&!await this.moveAlong(this.deliveryTruck,l,1180,r)?!1:(this.liveTruckAtTarget=!0,this.rebuildEntity(t,r))}if(n==="verify")return this.currentLivePhase=n,this.setSimulationHighlight(t),this.delay(540,r);if(n==="rollback"){let l=this.currentLivePhase==="rollback";if(this.currentLivePhase=n,this.setSimulationHighlight(t),!this.liveTruckAtTarget){let h=this.streetCurveBetween("docker",t,.31,{startAccess:this.deliveryAccess});if(!await this.moveAlong(this.deliveryTruck,h,760,r))return!1;this.liveTruckAtTarget=!0}let c=l?!0:await this.rebuildEntity(t,r);if(i==="rolled-back"){let h=this.streetCurveBetween(t,"docker",.31,{endAccess:this.deliveryAccess});await this.moveAlong(this.deliveryTruck,h,820,r),this.resetSimulation(),this.currentLiveJobId=null,this.currentLivePhase=null,this.liveTruckAtTarget=!1}return c}if(["complete","failed","interrupted"].includes(n)||["succeeded","failed","rolled-back","interrupted"].includes(i)){if(this.liveTruckAtTarget){let l=this.streetCurveBetween(t,"docker",.31,{endAccess:this.deliveryAccess});await this.moveAlong(this.deliveryTruck,l,820,r)}return this.resetSimulation(),this.currentLiveJobId=null,this.currentLivePhase=null,this.liveTruckAtTarget=!1,!0}return!1}animate(e=performance.now()){if(this.destroyed||(this.animationFrame=requestAnimationFrame(h=>this.animate(h)),!this.visible||document.hidden))return;let t=this.renderPolicy.frameMs;if(e-(this.lastBudgetFrame??-1/0)<t-.5)return;if(this.lastBudgetFrame=e,document.querySelector("#build-city-dialog")?.open){if(e-(this.lastDialogFrame??0)<250)return;this.lastDialogFrame=e}if(this.worldStream?.pendingCount&&(this.worldStream.drain(1),this.stage.dataset.worldChunks=String(this.worldStream.chunks.size),this.stage.dataset.streamPending=String(this.worldStream.pendingCount),this.renderer.shadowMap.needsUpdate=!0),this.reducedMotion&&e-this.lastReducedMotionFrame<Ip)return;this.reducedMotion&&(this.lastReducedMotionFrame=e);let n=(e-this.startedAt)/1e3,i=this.reducedMotion?0:n;this.controls.update();let r=(this.camera.top-this.camera.bottom)/(2*this.camera.zoom)*Math.tan(this.controls.getPolarAngle())+30,a=this.camera.position.clone().sub(this.controls.target);a.length()<r&&(this.camera.position.copy(this.controls.target).add(a.setLength(r)),this.camera.updateMatrixWorld(!0),this.lastStreamKey=null),this.waterMaterial&&(this.waterMaterial.uniforms.uTime.value=i,this.waterMaterial.uniforms.uViewDirection.value.copy(this.camera.position).sub(this.controls.target).normalize(),this.waterMaterial.uniforms.uDetail.value=this.controls.getPolarAngle()>1.12||this.camera.zoom<.8?8:this.renderPolicy.waterDetail),this.updateWorldStream();let o=this.reducedMotion?0:Math.min(.1,(e-(this.lastTrafficFrame??e))/1e3);this.lastTrafficFrame=e;for(let h of[-.5,.5])mp(this.motion.filter(u=>u.trafficLane===h),o);let l=this.motion.filter(h=>h.cityVehicle);if(this.activeDelivery&&l.push(this.activeDelivery),tp(l,o,i),e-(this.lastTrafficAudit??0)>1e3){let h=0;for(let u=0;u<l.length;u++)for(let d=u+1;d<l.length;d++)xr(ii(l[u],l[u].cityDistance),ii(l[d],l[d].cityDistance),0)&&h++;this.stage.dataset.trafficConflicts=String(h),this.stage.dataset.trafficWaiting=String(l.filter(u=>u.waiting).length),this.lastTrafficAudit=e}for(let h of this.signalFixtures??[]){let u=pu(i);h.group.position.y=2.85+(this.reducedMotion?0:Math.sin(i*1.2)*.045);for(let d of h.lamps){let f=u[d.axis]===d.color;d.mesh.material.color.setHex(f?d.hex:2505784)}}for(let h of[...this.motion,...this.activeDelivery?[this.activeDelivery]:[]]){if(h.cityVehicle&&h.cityDistance===void 0){h.object.visible=!1;continue}h.cityVehicle&&(h.object.visible=!0);let u=h.pingPong?(h.offset+i*h.speed)%2:null,d=h.cityVehicle?h.once?Math.min(.999999,h.cityDistance/h.curve.getLength()):(h.cityDistance/h.curve.getLength()%1+1)%1:u!==null?u<=1?u:2-u:h.trafficLane!==void 0?(h.distance??h.offset*h.curve.getLength())/h.curve.getLength():Pp(h,i),f=h.curve.getPointAt(d),p=h.curve.getTangentAt(Math.min(.999,d));h.object.position.copy(f),h.surface==="ocean"&&(h.object.position.y+=Ma(f.x,f.z,i,8,this.perimeter.coast.shoreX)),h.bob&&(h.object.position.y+=Math.sin(i*2.1+h.offset*8)*h.bob),h.object.rotation.y=Math.atan2(p.x,p.z)+(h.rotationOffset??0)+(u>1?Math.PI:0)}for(let h of this.trains){let u=h.timetable?op(i,h.curve.getLength(),h.timetable.stationDistance,h.timetable.phase):null,d=u?u.distance/h.curve.getLength():Pp(h,i);h.timetable?.passenger&&(this.stationService=u),h.cars.forEach((f,p)=>{let x=d-p*h.carGap;x-=Math.floor(x);let g=h.curve.getPointAt(x),m=h.curve.getTangentAt(Math.min(.999,x));f.position.copy(g),f.rotation.y=Math.atan2(m.x,m.z)})}for(let h of this.motion.filter(u=>u.stationPassenger)){let u=this.stationService,d=h.stationPassenger,f=u?.dwelling?Ze.smoothstep(u.dwellProgress,.12,.8):0;h.object.position.set(Ze.lerp(d.x,d.boardX,f),Ze.lerp(.53,.68,f),d.z),h.object.scale.setScalar(u?.dwelling?1-Ze.smoothstep(u.dwellProgress,.72,.95):Math.min(1,(u?.travelTime??0)/4))}this.windowDusk&&(this.windowDusk.value=this.reducedMotion?.45:.25+.65*(.5-.5*Math.cos(i*Math.PI*2/720))),up(this.portLife,i,(h,u,d)=>Ma(h,u,d,8,this.perimeter.coast.shoreX)),fp(this.gulls,i),this.portLife&&this.stage.dataset.harborPhase!==this.portLife.phase&&(this.stage.dataset.harborPhase=this.portLife.phase);let c=this.stationService?.dwelling?"boarding":"travelling";this.stage.dataset.stationPhase!==c&&(this.stage.dataset.stationPhase=c);for(let h of this.signalMotion){let u=h.offset+i*h.speed;u-=Math.floor(u),h.object.position.copy(h.curve.getPointAt(u)),h.object.position.y+=.08+Math.sin(i*4+h.offset*9)*.04}for(let h of this.smoke){h.puff.visible=h.puff.parent?.userData.status!=="unhealthy";let u=(i*.16+h.phase)%1;h.puff.position.y=h.baseY+u*1.35,h.puff.position.x=h.baseX+Math.sin(i*.8+h.phase*6)*.08,h.puff.scale.setScalar(.72+u*1.08),h.puff.material.opacity=h.puff.parent?.userData.status==="unhealthy"?0:Math.sin(u*Math.PI)*.3}if(this.selectionMarker.visible){let h=this.reducedMotion?1:1+Math.sin(n*3.2)*.035;this.selectionMarker.scale.setScalar(h),this.selectionMarker.material.opacity=this.reducedMotion?.82:.7+Math.sin(n*3.2)*.18}for(let h of this.entityGroups.values()){if(!h.userData.beacon)continue;let u=this.reducedMotion?h.userData.live?1.34:1:h.userData.live?1.2+Math.sin(n*6)*.36:1+Math.sin(n*2.4+h.position.x)*.08;h.userData.beacon.scale.setScalar(u)}this.renderPolicy.shadows&&!this.reducedMotion&&e-(this.lastShadowFrame??0)>=100&&(this.renderer.shadowMap.needsUpdate=!0,this.lastShadowFrame=e),this.renderer.render(this.scene,this.camera),e-(this.lastRenderAudit??0)>1e3&&(this.stage.dataset.drawCalls=String(this.renderer.info.render.calls),this.stage.dataset.triangles=String(this.renderer.info.render.triangles),this.stage.dataset.frameBudget=String(Math.round(t)),this.lastRenderAudit=e),(this.reducedMotion||this.labelsDirty||e-(this.lastLabelFrame??0)>=33)&&(this.labelRenderer.render(this.scene,this.camera),this.lastLabelFrame=e,this.labelsDirty=!1)}destroy(){if(!this.destroyed){this.destroyed=!0,cancelAnimationFrame(this.animationFrame),clearTimeout(this.tapFallbackTimer),this.resizeObserver?.disconnect(),this.motionPreference?.removeEventListener?.("change",this.onMotionPreferenceChange),this.controls?.removeEventListener("change",this.onControlsChange),this.controls?.dispose();for(let[e,t]of Object.entries(this.inputHandlers??{}))this.stage.removeEventListener(e,t);this.clearWorld(),this.scene.remove(this.selectionMarker),qc(this.selectionMarker);for(let e of this.assetCache.values())Promise.resolve(e).then(t=>qc(t,{includeShared:!0,includeTextures:!0})).catch(()=>{});this.assetCache.clear(),this.renderer.dispose(),this.renderer.domElement.remove(),this.labelRenderer.domElement.remove()}}};function Fv(s){try{return new el(s)}catch(e){return console.error("Unable to initialize the 3D city",e),new Eu(s?.stage,e)}}return nm(Ov);})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
