import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
// Embedded animations do not require video motion capture.
export async function createCapturedAvatar(data,index,scene){
 const [gltf,track]=await Promise.all([new GLTFLoader().loadAsync('assets/avatar.glb'),fetch('assets/track.json').then(r=>{if(!r.ok)throw Error('Track metadata missing');return r.json()})]);
 if(!gltf.animations.length)throw Error('The selected model has no usable embedded animation');
 const selection=track.animationClip;
 if(selection===undefined&&gltf.animations.length>1)throw Error('Select animationClip in track.json: '+gltf.animations.map((c,i)=>i+': '+c.name).join(', '));
 const clip=typeof selection==='string'?gltf.animations.find(c=>c.name===selection):gltf.animations[selection??0];
 if(!clip||!Number.isFinite(clip.duration)||clip.duration<=0)throw Error('Selected animation is missing or empty');
 const mode=track.animationTiming??'hold';if(!['hold','loop','fit'].includes(mode))throw Error('animationTiming must be hold, loop or fit');
 const model=gltf.scene,group=new THREE.Group();group.add(model);scene.add(group);const targetBones=[];
 model.traverse(o=>{if(o.isBone)targetBones.push(o);if(o.isMesh){o.frustumCulled=false;o.castShadow=true;o.receiveShadow=true}});
 if(!targetBones.length)throw Error('A rigged character model is required');
 const mixer=new THREE.AnimationMixer(model),action=mixer.clipAction(clip);action.setLoop(THREE.LoopOnce,1);action.clampWhenFinished=true;action.play();mixer.setTime(0);model.updateMatrixWorld(true);
 const box=new THREE.Box3().setFromObject(model),height=box.max.y-box.min.y;if(!(height>0&&Number.isFinite(height)))throw Error('Invalid character bounds');
 group.scale.setScalar(1.9/height);group.position.set(index?1:0,-box.min.y*group.scale.y,0);
 function update(t){const sample=mode==='fit'?t/track.duration*clip.duration:mode==='loop'?t%clip.duration:t;mixer.setTime(Math.max(0,Math.min(sample,clip.duration-.0001)));group.updateMatrixWorld(true)}
 update(0);return {group,model,mixer,targetBones,duration:clip.duration,index,update};
}
