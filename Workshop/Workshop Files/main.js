import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import CannonDebugger from 'cannon-es-debugger';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000 );
scene.background = new THREE.Color("white");
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls( camera, renderer.domElement );
controls.update();
const axesHelper = new THREE.AxesHelper(8);
scene.add(axesHelper);


camera.position.x = 17;
camera.position.y = 11;
camera.position.z = 0;

const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshNormalMaterial();
const sphereMesh = new THREE.Mesh(geometry, material);
scene.add(sphereMesh);

const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
const boxMaterial = new THREE.MeshNormalMaterial();
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(boxMesh);

//vloer
let tex = new THREE.TextureLoader().load("https://upload.wikimedia.org/wikipedia/commons/4/4c/Grass_Texture.png")
tex.anisotropy = 32
tex.repeat.set(100, 100)
tex.wrapT = THREE.RepeatWrapping
tex.wrapS = THREE.RepeatWrapping
let geo = new THREE.PlaneBufferGeometry(100, 100)
let mat = new THREE.MeshLambertMaterial({
  map: tex
})
let mesh = new THREE.Mesh(geo, mat)
mesh.position.set(0, -5, 0)
mesh.rotation.set(Math.PI / -2, 0, 0)
scene.add(mesh)
//lichtbron toevoegen 
const sun = new THREE.DirectionalLight(0xffffcc)
sun.position.set(0, 1, 0)
scene.add(sun)


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

//physieke objecten maken 
const sphereBody = new CANNON.Body({
    mass: 5,
    shape: new CANNON.Sphere(1),
});
sphereBody.position.set(0, 7, 0);
physicsWorld.addBody(sphereBody);

const boxBody = new CANNON.Body({
    mass: 5,
    shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
});
boxBody.position.set(1, 10, 0);
physicsWorld.addBody(boxBody);

//3dmodel 
const loader = new GLTFLoader();

loader.load(
	'/assets/bowling_pin/pin.gltf',
	function ( gltf ) {

        gltf.scene.scale.set(10,10,10);
		scene.add( gltf.scene );
	},
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	function ( error ) {

		console.log( 'An error happened' );

	}
);

//car 

//controls

//tower



const animate = () => {
    physicsWorld.fixedStep();
    cannonDebugger.update();
    mesh.position.copy(groundBody.position);
    mesh.quaternion.copy(groundBody.quaternion);
    boxMesh.position.copy(boxBody.position);
    boxMesh.quaternion.copy(boxBody.quaternion);
    sphereMesh.position.copy(sphereBody.position);
    sphereMesh.quaternion.copy(sphereBody.quaternion);
    requestAnimationFrame(animate);
    controls.update();
    renderer.render( scene, camera );
};
animate();