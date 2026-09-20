import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';

// Original procedural concert set: no image, logo or poster inputs.
export async function buildStage(scene){
 const root=new THREE.Group();root.name='Blue_White_Concert_Stage';scene.add(root);
 const metal=new THREE.MeshStandardMaterial({color:0x0a1321,metalness:.72,roughness:.32});
 const trim=new THREE.MeshStandardMaterial({color:0x22324a,metalness:.8,roughness:.24});
 const luminous=new THREE.MeshBasicMaterial({color:new THREE.Color(0xb8d8ff).multiplyScalar(2.3),toneMapped:false});
 function box(w,h,d,x,y,z,material=metal){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh);return mesh}
 // Broad LED wall with animated, broken diagonal strokes and a fine pixel grid.
 box(9.5,4.55,.22,0,2.6,-3.18);
 const screenMaterial=new THREE.ShaderMaterial({uniforms:{time:{value:0},pulse:{value:0}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:`
 varying vec2 vUv;uniform float time;uniform float pulse;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 void main(){
 vec2 uv=vUv;float grain=hash(floor(uv*vec2(540.,270.)));
 float broken=step(.21,hash(vec2(floor(uv.y*65.),floor(uv.x*23.))));
 float a=abs(uv.y-.56-(uv.x-.5)*.64+.025*sin(uv.x*19.+time*.13));
 float b=abs(uv.y-.47+(uv.x-.5)*.74);
 float strokes=(1.-smoothstep(.035,.105,min(a,b)))*broken;
 float shards=step(.79,hash(floor(uv*vec2(46.,29.))))*(1.-smoothstep(.1,.3,min(a,b)));
 float dots=step(.17,fract(uv.x*540.))*step(.18,fract(uv.y*270.));
 vec3 col=mix(vec3(.009,.025,.057),vec3(.47,.65,.88),clamp(strokes+shards*.42,0.,1.));
 col*=.72+grain*.28;col*=.72+dots*.28;col*=.9+pulse*.06;
 gl_FragColor=vec4(col,1.);
 }`,toneMapped:false});
 const screen=new THREE.Mesh(new THREE.PlaneGeometry(9.05,4.05),screenMaterial);screen.position.set(0,2.65,-3.055);root.add(screen);
 // Truss supports, twin vertical bars, and segmented footlights.
 for(const side of [-1,1]){
  for(const x of [4.85,5.15])box(.10,5.1,.12,x*side,2.55,-2.8,trim);
  for(let y=.25;y<5;y+=.48){const brace=box(.46,.035,.045,side*5,y,-2.8,trim);brace.rotation.z=side*.7;}
  for(const x of [4.57,5.31])for(let j=0;j<3;j++)box(.045,1.34,.045,side*x,.94+j*1.48,-2.64,luminous);
 }
 box(10.9,.12,.16,0,5.18,-2.62,trim);
 for(let i=0;i<7;i++)box(1.13,.055,.065,(i-3)*1.55,.15,-2.66,luminous);
 // Dark planar reflection gives the screen, lights and dancer a shared floor.
 const floor=new Reflector(new THREE.PlaneGeometry(28,22),{clipBias:.003,textureWidth:512,textureHeight:512,color:0x53637b});
 floor.rotation.x=-Math.PI/2;floor.position.set(0,-.015,0);root.add(floor);
 const coating=new THREE.Mesh(new THREE.PlaneGeometry(28,22),new THREE.MeshStandardMaterial({color:0x102139,transparent:true,opacity:.42,roughness:.3,metalness:.65,depthWrite:false}));coating.rotation.x=-Math.PI/2;coating.position.y=-.009;coating.receiveShadow=true;root.add(coating);
 for(let x=-12;x<=12;x+=2)box(.006,.001,20,x,-.005,0,new THREE.MeshBasicMaterial({color:0x203047,transparent:true,opacity:.25}));
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 root.userData={palette:{dark:'#0a1321',blue:'#8abaff',white:'#e7f2ff'},assetCount:0,source:'Original procedural stage inspired by the user reference; no reference photo embedded'};
 return {root,update(time,pulse){screenMaterial.uniforms.time.value=reduced?0:time;screenMaterial.uniforms.pulse.value=reduced?0:pulse;}};
}
// Retain the earlier export for projects integrating the previous template API.
export const buildBrandStage=buildStage;
