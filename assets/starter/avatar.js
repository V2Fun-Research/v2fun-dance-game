import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { clone } from 'three/addons/utils/SkeletonUtils.js';

// World-space rest-pose correction handles the user's nonstandard local bone axes.
const BONE_MAP={Hips:'Pelvis',Spine:'Spine1',Spine1:'Spine2',Spine2:'Spine3',Neck:'Neck',Head:'Head',LeftShoulder:'Left_collar',LeftArm:'Left_shoulder',LeftForeArm:'Left_elbow',LeftHand:'Left_wrist',RightShoulder:'Right_collar',RightArm:'Right_shoulder',RightForeArm:'Right_elbow',RightHand:'Right_wrist',LeftUpLeg:'Left_hip',LeftLeg:'Left_knee',LeftFoot:'Left_ankle',RightUpLeg:'Right_hip',RightLeg:'Right_knee',RightFoot:'Right_ankle'};
let templatePromise;
function prepareMesh(mesh){
 const g=mesh.geometry,sets=[['skinIndex','skinWeight'],['joints_1','weights_1'],['joints_2','weights_2']].filter(([i,w])=>g.attributes[i]&&g.attributes[w]);
 // This GLB has 12 influences per vertex; Three.js shaders use 4. Keep the strongest.
 const count=g.attributes.position.count,indices=new Uint16Array(count*4),weights=new Float32Array(count*4);
 for(let v=0;v<count;v++){
  const combined=new Map();for(let [ik,wk] of sets){const ia=g.attributes[ik],wa=g.attributes[wk];for(let k=0;k<4;k++){let joint=ia.getComponent(v,k),weight=wa.getComponent(v,k);if(!Number.isInteger(joint)||joint<0||joint>=mesh.skeleton.bones.length||!Number.isFinite(weight)||weight<0)throw Error('Invalid skin influence at vertex '+v);if(weight>0)combined.set(joint,(combined.get(joint)||0)+weight)}}
  const top=[...combined].sort((a,b)=>b[1]-a[1]).slice(0,4),sum=top.reduce((s,x)=>s+x[1],0);if(!(sum>0))throw Error('Zero skin weight at vertex '+v);top.forEach(([j,w],k)=>{indices[v*4+k]=j;weights[v*4+k]=w/sum});
 }
 g.setAttribute('skinIndex',new THREE.Uint16BufferAttribute(indices,4));g.setAttribute('skinWeight',new THREE.Float32BufferAttribute(weights,4));if(!g.attributes.normal)g.computeVertexNormals();mesh.castShadow=true;mesh.receiveShadow=true;mesh.frustumCulled=false;
}
async function template(){if(!templatePromise)templatePromise=new GLTFLoader().loadAsync('assets/avatar.glb').then(gltf=>{gltf.scene.updateMatrixWorld(true);gltf.scene.traverse(o=>{if(o.isSkinnedMesh){o.skeleton.pose();prepareMesh(o)}});gltf.scene.updateMatrixWorld(true);return gltf.scene});return templatePromise}
export async function createCapturedAvatar(data,index,scene){
 if(!data.skeleton?.bones?.length||!Number.isFinite(data.clip?.duration)||data.clip.duration<=0)throw Error('BVH has no usable skeleton or duration');
 const rootTrack=data.clip.tracks.find(t=>t.name.includes('Pelvis')&&t.name.endsWith('.position'));if(!rootTrack)throw Error('BVH needs a Pelvis position track; adapt the root mapping');
 const sourceRoot=data.skeleton.bones[0],byName=Object.fromEntries(data.skeleton.bones.map(b=>[b.name,b]));sourceRoot.updateMatrixWorld(true);
 const sourceRest=Object.fromEntries(data.skeleton.bones.map(b=>[b.name,b.getWorldQuaternion(new THREE.Quaternion()).invert()]));
 const model=clone(await template()),group=new THREE.Group();group.name='CapturedAvatar_'+index;model.name='UserProvidedAvatar';group.add(model);scene.add(group);model.updateMatrixWorld(true);
 const targetBones=[];model.traverse(o=>{if(o.isBone)targetBones.push(o)});const targetByName=Object.fromEntries(targetBones.map(b=>[b.name,b]));const rest=Object.fromEntries(targetBones.map(b=>[b.name,b.getWorldQuaternion(new THREE.Quaternion())]));
 const missing=Object.entries(BONE_MAP).filter(([target,source])=>!targetByName[target]||!byName[source]);if(missing.length)throw Error('Adapt BONE_MAP: missing '+missing.map(([a,b])=>a+'/'+b).join(', '));
 const hipsRest=targetByName.Hips.position.clone(),initialSize=new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3()),scale=(index?1.65:1.95)/initialSize.y;
 if(!Number.isFinite(scale)||scale<=0)throw Error('Character has invalid height');
 const restMin=new THREE.Box3().setFromObject(model).min.y,footRest=Math.min(targetByName.LeftFoot.getWorldPosition(new THREE.Vector3()).y,targetByName.RightFoot.getWorldPosition(new THREE.Vector3()).y),soleOffset=footRest-restMin;
 group.scale.setScalar(scale);group.position.set(index?1.10:-.58,0,index?-.66:.43);
 const mixer=new THREE.AnimationMixer(sourceRoot);mixer.clipAction(data.clip).play();mixer.setTime(0);const initial=sourceRoot.position.clone(),positionTrack=rootTrack.createInterpolant();
 const sourceWorld=new THREE.Quaternion(),parentWorld=new THREE.Quaternion(),desired=new THREE.Quaternion(),footPos=new THREE.Vector3();
 function update(t){t=Math.max(0,Math.min(t,data.clip.duration-.001));mixer.setTime(t);sourceRoot.updateMatrixWorld(true);const sample=positionTrack.evaluate(t);
  // Retain a little horizontal body travel without spreading dancers off the stage.
  targetByName.Hips.position.copy(hipsRest);targetByName.Hips.position.x+=(sample[0]-initial.x)*.25;targetByName.Hips.position.z+=(sample[2]-initial.z)*.25;
  group.updateMatrixWorld(true);
  for(const bone of targetBones){const name=BONE_MAP[bone.name];if(!name||!byName[name])continue;
   byName[name].getWorldQuaternion(sourceWorld);desired.copy(sourceWorld).multiply(sourceRest[name]).multiply(rest[bone.name]);
   bone.parent.getWorldQuaternion(parentWorld);bone.quaternion.copy(parentWorld.invert().multiply(desired)).normalize();bone.updateMatrixWorld(true);
  }
  group.updateMatrixWorld(true);let low=Math.min(targetByName.LeftFoot.getWorldPosition(footPos).y,targetByName.RightFoot.getWorldPosition(footPos).y)-soleOffset*scale;group.position.y-=low;group.updateMatrixWorld(true);
 }
 update(0);
 return {group,model,root:sourceRoot,mixer,initial,positionTrack,bones:data.skeleton.bones,byName,targetBones,targetByName,duration:data.clip.duration,index,update,mapping:BONE_MAP};
}
