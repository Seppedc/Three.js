import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import CannonDebugger from 'cannon-es-debugger';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//ToDo Phase 1


//extra controls for canvas and visual helpers
const controls = new OrbitControls( camera, renderer.domElement );
controls.update();
const axesHelper = new THREE.AxesHelper(8);
scene.add(axesHelper);
//First object 
const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshNormalMaterial();
const sphereMesh = new THREE.Mesh(geometry, material);
scene.add(sphereMesh);


//ToDo Phase 2 Part 1 


let texture = null;

//extra params over de vloer
texture.anisotropy = 32
texture.repeat.set(100, 100)
texture.wrapT = THREE.RepeatWrapping
texture.wrapS = THREE.RepeatWrapping
let geo = new THREE.PlaneBufferGeometry(100, 100)
let mat = new THREE.MeshLambertMaterial({
  map: texture
})
let mesh = new THREE.Mesh(geo, mat)
mesh.position.set(0, -5, 0)
mesh.rotation.set(Math.PI / -2, 0, 0)
scene.add(mesh)


//ToDo Phase 2 part 2 




//physics wereld aanmaken 
const physicsWorld = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.82, 0),
});
//vloer zetten van de physics wereld
const groundBody = new CANNON.Body({
    type: CANNON.Body.STATIC,
    shape: new CANNON.Plane(),
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
physicsWorld.addBody(groundBody);
//visuele indicator voor objecten in de physics omgeving
const cannonDebugger = new CannonDebugger(scene, physicsWorld, {
    color: 0xff0000,
});

//eerste physieke object maken 
const sphereBody = new CANNON.Body({
    mass: 5,
    shape: new CANNON.Sphere(1),
});
sphereBody.position.set(0, 7, 0);
physicsWorld.addBody(sphereBody);

//ToDo Phase 3


//3dmodel loader
const loader = new GLTFLoader();

//ToDo Phase  5



//ToDo Phase  6
 

//ToDo Phase  7


const animate = () => {
    //ToDo Phase  4
    
    requestAnimationFrame(animate);
    controls.update();
    //ToDo Phase 1 (moet als laatste aners werken sommige andere onderdelen niet)
};
animate();