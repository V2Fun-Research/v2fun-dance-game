import * as T from 'three';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
export function createShow(scene,renderer,camera){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const composer=new EffectComposer(renderer);composer.addPass(new RenderPass(scene,camera));
 const bloom=new UnrealBloomPass(new T.Vector2(800,600),.68,.55,.92);composer.addPass(bloom);composer.addPass(new OutputPass());
 const beams=[],rings=[];let impact=0;
 const glow=(color)=>new T.MeshBasicMaterial({color:new T.Color(color).multiplyScalar(2.1),transparent:true,opacity:.85,blending:T.AdditiveBlending,depthWrite:false,toneMapped:false});
 for(let i=0;i<6;i++){
  const color=i%2?0xdceaff:0x8abaff;
  const pivot=new T.Group();pivot.position.set((i-2.5)*1.18,5.0,-2.45);scene.add(pivot);
  const geo=new T.ConeGeometry(.8,5,32,1,true);geo.translate(0,-2.5,0);
  const material=new T.ShaderMaterial({uniforms:{color:{value:new T.Color(color)},power:{value:.2}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec2 vUv;uniform vec3 color;uniform float power;void main(){float edge=pow(abs(sin(vUv.x*6.28318)),2.);float fade=pow(max(vUv.y,0.0),0.7)*(1.-smoothstep(.93,1.,vUv.y));gl_FragColor=vec4(color*1.8,edge*fade*power);}',transparent:true,depthWrite:false,side:T.DoubleSide,blending:T.AdditiveBlending});
  pivot.add(new T.Mesh(geo,material));const lamp=new T.Mesh(new T.SphereGeometry(.075,12,8),glow(color));pivot.add(lamp);beams.push(pivot);
 }
 for(let i=0;i<1;i++){let ring=new T.Mesh(new T.TorusGeometry(2.1+i*.15,.016,6,100),glow(0xb8d8ff));ring.rotation.x=Math.PI/2;ring.position.set(0,.065+i*.009,.12);scene.add(ring);rings.push(ring)}
 const sparksGeo=new T.BufferGeometry(),pos=new Float32Array(45*3);for(let i=0;i<45;i++){pos[i*3]=(Math.random()-.5)*10;pos[i*3+1]=Math.random()*6;pos[i*3+2]=(Math.random()-.5)*6-1}sparksGeo.setAttribute('position',new T.BufferAttribute(pos,3));
 const canvas=document.createElement('canvas');canvas.width=canvas.height=64;const ctx=canvas.getContext('2d'),g=ctx.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'white');g.addColorStop(.15,'#d5e8ff');g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(0,0,64,64);
 const sparks=new T.Points(sparksGeo,new T.PointsMaterial({map:new T.CanvasTexture(canvas),size:.085,color:0xadcfff,transparent:true,depthWrite:false,blending:T.AdditiveBlending,opacity:.12}));scene.add(sparks);
 let lastTitle='';
 return {resize(w,h){composer.setSize(w,h)},render(){composer.render()},hit(){impact=1},
 intro(t){let k=T.MathUtils.smoothstep(t,0,2.8);if(!reduced){camera.position.set(Math.sin((1-k)*1.1)*6,8.2+(2.9-8.2)*k,3.2+(camera.aspect<1?9.4-3.2:9.5-3.2)*k);camera.lookAt(0,.7+k*(camera.aspect<1?.65:-.05),-.6)}let title=t<1.8?'舞力全开':t<2.8?'3':t<3.6?'2':t<4.4?'1':'START!';let el=document.getElementById('introTitle');if(title!==lastTitle){el.textContent=title;el.classList.remove('pop');void el.offsetWidth;el.classList.add('pop');lastTitle=title}document.getElementById('introCaption').textContent=t<1.8?'YOUR STAGE. YOUR MOMENT.':'跟上节拍 · 准备登台';},
 update(t,pulse){impact*=.94;const beat=reduced?.2:Math.min(1,pulse);bloom.strength=.62+impact*.22;beams.forEach((b,i)=>{b.rotation.z=reduced?0:Math.sin(t*.18+i*1.8)*.18;b.rotation.x=reduced?.16:.16+Math.cos(t*.15+i)*.12});rings.forEach((r,i)=>{r.material.opacity=reduced?0:impact*.2;if(i===2){r.scale.setScalar(1+impact*.5);r.material.opacity=.15+impact*.8}});sparks.rotation.y=t*.018;sparks.position.y=Math.sin(t*.35)*.15;}
 };
}
