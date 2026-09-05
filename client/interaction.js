export class MapTapGesture {
  constructor() { this.pointers = new Set(); this.candidate = null; }
  down(event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    this.pointers.add(event.pointerId);
    if (this.pointers.size === 1) this.candidate = { x: event.clientX, y: event.clientY, target: event.target, moved: false, multi: false };
    else if (this.candidate) this.candidate.multi = true;
  }
  move(event) {
    if (this.candidate && this.pointers.has(event.pointerId)
      && Math.hypot(event.clientX-this.candidate.x,event.clientY-this.candidate.y)>5) this.candidate.moved=true;
  }
  up(event, cancelled = false) {
    if (!this.pointers.has(event.pointerId)) return null;
    this.move(event); this.pointers.delete(event.pointerId);
    if (cancelled && this.candidate) this.candidate.moved=true;
    if (this.pointers.size) return null;
    const result=this.candidate;this.candidate=null;
    return result ? {...result,tap:!result.moved&&!result.multi} : null;
  }
}

export function clampMapLabel(x,y,width,height,viewportWidth,viewportHeight) {
  const clamp=(value,low,high)=>Math.max(low,Math.min(value,Math.max(low,high)));
  return {x:clamp(x,12+width/2,viewportWidth-12-width/2),y:clamp(y,68+height,viewportHeight-132)};
}
