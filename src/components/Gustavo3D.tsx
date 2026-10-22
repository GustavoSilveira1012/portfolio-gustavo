import { useEffect, useRef } from 'react'

/**
 * Stylised, fully volumetric low-poly avatar built as an original WebGL scene.
 * Reference: Gustavo's supplied GitHub portrait (dark side-parted hair,
 * light dress shirt, youthful facial features). Approximate likeness due to
 * the 64x64 reference. Nothing is downloaded at runtime.
 */
type Part = { position: [number,number,number]; scale: [number,number,number]; color: [number,number,number]; shape?: 'box'|'sphere'; rotation?: number; wave?: boolean }
const skin: [number,number,number] = [0.78,0.56,0.43]
const skinShadow: [number,number,number] = [0.68,0.44,0.34]
const hair: [number,number,number] = [0.10,0.115,0.14]
const hairShine: [number,number,number] = [0.16,0.18,0.20]
const sclera: [number,number,number] = [0.95,0.95,0.92]
const iris: [number,number,number] = [0.13,0.14,0.16]
const shirt: [number,number,number] = [0.90,0.92,0.90]
const shirtFold: [number,number,number] = [0.78,0.84,0.83]
const pants: [number,number,number] = [0.20,0.24,0.28]

/**
 * All positions are actual XYZ coordinates. The camera looks toward +Z,
 * so facial detail must sit OUTSIDE the front surface of the head.
 * Rounded meshes give the character recognisable facial expression and silhouette.
 */
const parts: Part[] = [
  // Body and shoes
  { position:[0,-.97,0],scale:[.53,.71,.32],color:shirt,shape:'sphere' },
  { position:[0,-1.62,0],scale:[.48,.25,.31],color:pants,shape:'sphere' },
  { position:[-.23,-2.04,0],scale:[.21,.51,.22],color:pants,shape:'sphere' },
  { position:[.23,-2.04,0],scale:[.21,.51,.22],color:pants,shape:'sphere' },
  { position:[-.23,-2.54,.14],scale:[.24,.12,.35],color:hair,shape:'sphere' },
  { position:[.23,-2.54,.14],scale:[.24,.12,.35],color:hair,shape:'sphere' },

  // Neck and head: facial geometry faces the viewer (+Z)
  { position:[0,-.29,0],scale:[.17,.29,.17],color:skin,shape:'sphere' },
  { position:[0,.33,.01],scale:[.45,.59,.40],color:skin,shape:'sphere' },
  { position:[-.45,.26,.03],scale:[.095,.14,.11],color:skin,shape:'sphere' },
  { position:[.45,.26,.03],scale:[.095,.14,.11],color:skin,shape:'sphere' },

  // Hairstyle from the reference photo: dark swept fringe, fuller on one side
  { position:[0,.79,-.055],scale:[.46,.22,.42],color:hair,shape:'sphere' },
  { position:[-.23,.87,.10],scale:[.28,.13,.32],color:hair,shape:'sphere',rotation:-.17 },
  { position:[.13,.93,.03],scale:[.39,.13,.40],color:hair,shape:'sphere',rotation:.09 },
  { position:[-.36,.55,.07],scale:[.11,.28,.30],color:hair,shape:'sphere' },
  { position:[.39,.56,.05],scale:[.09,.24,.29],color:hair,shape:'sphere' },
  { position:[-.06,.83,.31],scale:[.27,.07,.14],color:hairShine,shape:'sphere',rotation:.08 },

  // Brows and visible eyes positioned in front of the curved head.
  { position:[-.17,.40,.413],scale:[.105,.062,.033],color:sclera,shape:'sphere' },
  { position:[.17,.40,.413],scale:[.105,.062,.033],color:sclera,shape:'sphere' },
  { position:[-.17,.40,.450],scale:[.044,.051,.025],color:iris,shape:'sphere' },
  { position:[.17,.40,.450],scale:[.044,.051,.025],color:iris,shape:'sphere' },
  { position:[-.18,.51,.416],scale:[.115,.025,.035],color:hair,shape:'sphere',rotation:.09 },
  { position:[.18,.51,.416],scale:[.115,.025,.035],color:hair,shape:'sphere',rotation:-.10 },
  { position:[0,.205,.437],scale:[.072,.122,.087],color:skinShadow,shape:'sphere' },
  { position:[0,.075,.420],scale:[.16,.021,.026],color:skinShadow,shape:'sphere' },
  { position:[-.17,.15,.378],scale:[.08,.042,.025],color:skinShadow,shape:'sphere' },
  { position:[.17,.15,.378],scale:[.08,.042,.025],color:skinShadow,shape:'sphere' },

  // Shirt collar, buttons and seam
  { position:[-.23,-.51,.25],scale:[.22,.12,.12],color:shirtFold,shape:'sphere',rotation:-.20 },
  { position:[.23,-.51,.25],scale:[.22,.12,.12],color:shirtFold,shape:'sphere',rotation:.20 },
  { position:[0,-.69,.325],scale:[.03,.20,.018],color:shirtFold },
  { position:[0,-.78,.344],scale:[.022,.022,.015],color:hair,shape:'sphere' },
  { position:[0,-1.06,.345],scale:[.022,.022,.015],color:hair,shape:'sphere' },

  // Resting left arm and an animated raised right arm
  { position:[-.59,-.91,0],scale:[.18,.49,.21],color:shirt,shape:'sphere',rotation:.16 },
  { position:[-.66,-1.42,.015],scale:[.15,.37,.16],color:skin,shape:'sphere' },
  { position:[-.66,-1.82,.04],scale:[.145,.17,.13],color:skin,shape:'sphere' },
  { position:[.61,-.86,0],scale:[.18,.42,.20],color:shirt,shape:'sphere',wave:true },
  { position:[.72,-.35,.04],scale:[.14,.36,.15],color:skin,shape:'sphere',wave:true },
  { position:[.78,.09,.08],scale:[.145,.19,.11],color:skin,shape:'sphere',wave:true },
  { position:[.85,.27,.08],scale:[.07,.15,.06],color:skin,shape:'sphere',wave:true },
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
 // The previous projection reversed depth: it covered the face with the back of the head.
 // Keep the camera on +Z and map higher Z to nearer (smaller) depth values.
 gl_Position=vec4(rotated.x*.64/uAspect,rotated.y*.64+.05,-rotated.z*.12,1.0);
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
