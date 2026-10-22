import { useEffect, useRef } from 'react'

/**
 * Stylised, fully volumetric low-poly avatar built as an original WebGL scene.
 * Reference: Gustavo's supplied GitHub portrait (dark side-parted hair,
 * light dress shirt, youthful facial features). Approximate likeness due to
 * the 64x64 reference. Nothing is downloaded at runtime.
 */
type Part = { position: [number,number,number]; scale: [number,number,number]; color: [number,number,number]; shape?: 'box'|'sphere'; rotation?: number; wave?: boolean }
const skin: [number,number,number] = [0.75,0.52,0.38]
const shadow: [number,number,number] = [0.63,0.40,0.29]
const dark: [number,number,number] = [0.085,0.098,0.115]
const white: [number,number,number] = [0.89,0.91,0.88]
const shirt: [number,number,number] = [0.87,0.90,0.88]
const pants: [number,number,number] = [0.19,0.22,0.25]
const parts: Part[] = [
  { position:[0,-.92,0],scale:[.51,.72,.30],color:shirt },
  { position:[0,-1.61,0],scale:[.48,.27,.32],color:pants },
  { position:[-.22,-2.11,0],scale:[.20,.55,.24],color:pants },
  { position:[.22,-2.11,0],scale:[.20,.55,.24],color:pants },
  { position:[-.23,-2.63,.08],scale:[.23,.12,.36],color:dark },
  { position:[.23,-2.63,.08],scale:[.23,.12,.36],color:dark },
  { position:[0,-.28,0],scale:[.16,.28,.17],color:skin },
  { position:[0,.33,.02],scale:[.47,.61,.40],color:skin },
  { position:[0,.83,-.03],scale:[.47,.22,.43],color:dark },
  { position:[-.29,1.0,.05],scale:[.23,.14,.37],color:dark,rotation:-.18 },
  { position:[.14,1.00,.0],scale:[.40,.13,.40],color:dark,rotation:.10 },
  { position:[-.43,.47,.02],scale:[.10,.32,.28],color:dark,rotation:-.22 },
  { position:[.43,.44,-.05],scale:[.10,.31,.28],color:dark },
  { position:[-.49,.29,.04],scale:[.09,.14,.14],color:skin },
  { position:[.49,.29,.04],scale:[.09,.14,.14],color:skin },
  { position:[-.17,.39,.39],scale:[.056,.044,.018],color:dark },
  { position:[.18,.39,.39],scale:[.056,.044,.018],color:dark },
  { position:[-.18,.51,.395],scale:[.10,.035,.025],color:dark,rotation:.08 },
  { position:[.19,.51,.395],scale:[.10,.035,.025],color:dark,rotation:-.08 },
  { position:[0,.21,.42],scale:[.07,.12,.075],color:shadow },
  { position:[0,.015,.385],scale:[.20,.025,.025],color:shadow },
  { position:[-.30,-.53,.18],scale:[.21,.15,.12],color:white,rotation:-.17 },
  { position:[.30,-.53,.18],scale:[.21,.15,.12],color:white,rotation:.17 },
  { position:[0,-.58,.28],scale:[.07,.17,.028],color:[.26,.30,.32] },
  { position:[-.59,-1.01,0],scale:[.18,.57,.24],color:shirt,rotation:.15 },
  { position:[-.65,-1.57,.0],scale:[.15,.43,.17],color:skin },
  { position:[-.65,-1.97,.02],scale:[.15,.17,.14],color:skin },
  { position:[.60,-.83,0],scale:[.18,.41,.22],color:shirt,wave:true },
  { position:[.68,-.34,0],scale:[.145,.36,.16],color:skin,wave:true },
  { position:[.75,.02,.02],scale:[.15,.17,.095],color:skin,wave:true },
  { position:[.84,.21,.04],scale:[.08,.16,.065],color:skin,wave:true },
]

function geometry(shape: 'box' | 'sphere') {
  if (shape === 'box') {
    const p = [
      [-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1],
      [1,-1,-1],[-1,-1,-1],[-1,1,-1],[1,1,-1],
      [-1,1,1],[1,1,1],[1,1,-1],[-1,1,-1],
      [-1,-1,-1],[1,-1,-1],[1,-1,1],[-1,-1,1],
      [1,-1,1],[1,-1,-1],[1,1,-1],[1,1,1],
      [-1,-1,-1],[-1,-1,1],[-1,1,1],[-1,1,-1]
    ]
    const indexes: number[] = []
    for(let f=0;f<6;f++){const s=f*4;indexes.push(s,s+1,s+2,s,s+2,s+3)}
    return {vertices:new Float32Array(p.flat().map(v=>v)), indices:new Uint16Array(indexes)}
  }
  const vertices:number[]=[],indices:number[]=[]
  const rings=10,sectors=16
  for(let y=0;y<=rings;y++) for(let x=0;x<=sectors;x++){
    const v=y/rings*Math.PI,u=x/sectors*Math.PI*2
    vertices.push(Math.cos(u)*Math.sin(v),Math.cos(v),Math.sin(u)*Math.sin(v))
  }
  for(let y=0;y<rings;y++) for(let x=0;x<sectors;x++){
    const i=y*(sectors+1)+x
    indices.push(i,i+sectors+1,i+1,i+1,i+sectors+1,i+sectors+2)
  }
  return {vertices:new Float32Array(vertices),indices:new Uint16Array(indices)}
}
const vs = String.raw`attribute vec3 aPosition;
uniform vec3 uPosition;
uniform vec3 uScale;
uniform float uRotation;
uniform float uTilt;
uniform float uArm;
uniform float uAspect;
uniform float uWave;
varying vec3 vNormal;
void main(){
 vec3 v=aPosition*uScale;
 float r=uRotation+(uWave*uArm);
 float c=cos(r),s=sin(r);
 v.xy=vec2(v.x*c-v.y*s,v.x*s+v.y*c);
 v+=uPosition;
 c=cos(uTilt);s=sin(uTilt);
 vec3 rotated=vec3(v.x*c-v.z*s,v.y,v.x*s+v.z*c);
 vec3 camera=rotated+vec3(0.,0.,7.5);
 gl_Position=vec4(camera.x/uAspect,camera.y,camera.z*0.03,1.0+camera.z*0.11);
 vNormal=normalize(vec3(aPosition.x*c-aPosition.z*s,aPosition.y,aPosition.x*s+aPosition.z*c));
}`
const fs = String.raw`precision mediump float;
uniform vec3 uColor;
varying vec3 vNormal;
void main(){
 float light=clamp(dot(normalize(vNormal),normalize(vec3(-0.4,0.85,1.0)))*0.28+0.78,0.50,1.12);
 gl_FragColor=vec4(uColor*light,1.0);
}`
function shader(gl:WebGLRenderingContext, type:number, code:string) {
  const s=gl.createShader(type)
  if(!s) throw new Error('WebGL shader unavailable')
  gl.shaderSource(s,code);gl.compileShader(s)
  if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)||'Shader error')
  return s
}

export default function Gustavo3D() {
 const canvas=useRef<HTMLCanvasElement>(null)
 const tilt=useRef(0)
 useEffect(()=>{
   const el=canvas.current
   const gl=el?.getContext('webgl',{alpha:true,antialias:true})
   if(!el||!gl)return
   const g=gl
   let program:WebGLProgram|null=null
   let raf=0
   let observer:ResizeObserver|null=null
   try{
     program=g.createProgram()
     if(!program) return
     g.attachShader(program,shader(g,g.VERTEX_SHADER,vs))
     g.attachShader(program,shader(g,g.FRAGMENT_SHADER,fs))
     g.linkProgram(program)
     if(!g.getProgramParameter(program,g.LINK_STATUS)) throw Error('WebGL link failure')
     g.useProgram(program)
     const attrib=g.getAttribLocation(program,'aPosition')
     const uniforms=Object.fromEntries(['uPosition','uScale','uRotation','uTilt','uArm','uWave','uAspect','uColor'].map(k=>[k,g.getUniformLocation(program!,k)]))
     const buffers=[geometry('box'),geometry('sphere')].map(shape=>{
       const vb=g.createBuffer(),ib=g.createBuffer()
       g.bindBuffer(g.ARRAY_BUFFER,vb)
       g.bufferData(g.ARRAY_BUFFER,shape.vertices,g.STATIC_DRAW)
       g.bindBuffer(g.ELEMENT_ARRAY_BUFFER,ib)
       g.bufferData(g.ELEMENT_ARRAY_BUFFER,shape.indices,g.STATIC_DRAW)
       return {vb,ib,count:shape.indices.length}
     })
     const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
     const draw=(time:number)=>{
       const width=Math.max(1,el.clientWidth),height=Math.max(1,el.clientHeight),dpr=Math.min(window.devicePixelRatio||1,2)
       const w=Math.round(width*dpr),h=Math.round(height*dpr)
       if(el.width!==w||el.height!==h){el.width=w;el.height=h}
       g.viewport(0,0,w,h)
       g.clearColor(0,0,0,0);g.clear(g.COLOR_BUFFER_BIT|g.DEPTH_BUFFER_BIT)
       g.enable(g.DEPTH_TEST);g.disable(g.CULL_FACE)
       g.uniform1f(uniforms.uAspect,Math.max(0.65,width/height))
       g.uniform1f(uniforms.uTilt,reduced?-.12:tilt.current + Math.sin(time*.00042)*.13)
       g.uniform1f(uniforms.uArm,reduced?0:Math.sin(time*.004)*.25)
       let bound=-1
       for (const part of parts) {
         const idx=part.shape==='box'?0:1
         if(bound!==idx){
           const buf=buffers[idx]
           g.bindBuffer(g.ARRAY_BUFFER,buf.vb)
           g.vertexAttribPointer(attrib,3,g.FLOAT,false,0,0)
           g.enableVertexAttribArray(attrib)
           g.bindBuffer(g.ELEMENT_ARRAY_BUFFER,buf.ib)
           bound=idx
         }
         g.uniform3fv(uniforms.uPosition,part.position)
         g.uniform3fv(uniforms.uScale,part.scale)
         g.uniform3fv(uniforms.uColor,part.color)
         g.uniform1f(uniforms.uRotation,part.rotation||0)
         g.uniform1f(uniforms.uWave,part.wave?1:0)
         g.drawElements(g.TRIANGLES,buffers[idx].count,g.UNSIGNED_SHORT,0)
       }
       if(!reduced)raf=requestAnimationFrame(draw)
     }
     draw(0)
     if(!reduced)raf=requestAnimationFrame(draw)
     observer=new ResizeObserver(()=>{if(reduced)draw(0)})
     observer.observe(el)
     return ()=>{
       cancelAnimationFrame(raf);observer?.disconnect()
       buffers.forEach(b=>{g.deleteBuffer(b.vb);g.deleteBuffer(b.ib)})
       g.deleteProgram(program)
     }
   }catch(error){
     console.warn('3D avatar unavailable:',error)
     el.style.display='none'
   }
 },[])
 return <div className="os-real-3d" onPointerMove={event=>{
   const bounds=event.currentTarget.getBoundingClientRect()
   tilt.current=((event.clientX-bounds.left)/Math.max(1,bounds.width)-.5)*.8
 }} onPointerLeave={()=>{tilt.current=0}} aria-label="Avatar 3D estilizado do Gustavo com cabelo escuro, camisa social e animação de aceno" role="img">
   <div className="os-3d-halo"/>
   <canvas ref={canvas} aria-hidden="true" />
   <span className="os-3d-label"><strong>GUSTAVO</strong><small>3D AVATAR / WEBGL</small></span>
 </div>
}
