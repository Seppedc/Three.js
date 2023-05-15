import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import CannonDebugger from 'cannon-es-debugger';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
let boxesVisual = [];
let boxesPhysical = [];

//ToDo Phase 1
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
scene.background = new THREE.Color("white");

//code toevoegen na Phase 1

const controls = new OrbitControls( camera, renderer.domElement );
controls.update();
const axesHelper = new THREE.AxesHelper(8);
scene.add(axesHelper);


//ToDo Phase 2
camera.position.x = 17;
camera.position.y = 11;
camera.position.z = 0;

const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
const boxMaterial = new THREE.MeshNormalMaterial();
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
//scene.add(boxMesh);

//code voor de vloer 

// let texture = //ToDo:inladen texture;
// texture.anisotropy = 32
// texture.repeat.set(100, 100)
// texture.wrapT = THREE.RepeatWrapping
// texture.wrapS = THREE.RepeatWrapping
// let geo = new THREE.PlaneBufferGeometry(100, 100)
// let mat = new THREE.MeshLambertMaterial({
//   map: texture
// })
// let mesh = new THREE.Mesh(geo, mat)
// mesh.position.set(0, -5, 0)
// mesh.rotation.set(Math.PI / -2, 0, 0)
// scene.add(mesh)
let texture = new THREE.TextureLoader().load("https://upload.wikimedia.org/wikipedia/commons/4/4c/Grass_Texture.png")
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

const sun = new THREE.DirectionalLight(0xffffcc)
sun.position.set(0, 1, 0)
scene.add(sun)

//code toevoegen na Phase 2
const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshNormalMaterial();
const bal = new THREE.Mesh(geometry, material);
//scene.add(bal);
const physicsWorld = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.82, 0),
});
const groundBody = new CANNON.Body({
    type: CANNON.Body.STATIC,
    shape: new CANNON.Plane(),
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
physicsWorld.addBody(groundBody);
const cannonDebugger = new CannonDebugger(scene, physicsWorld, {
    color: 0xff0000,
});

const balBody = new CANNON.Body({
    mass: 5,
    shape: new CANNON.Sphere(1),
});
balBody.position.set(0, 7, 0);
//physicsWorld.addBody(balBody);

const boxBody = new CANNON.Body({
    mass: 5,
    shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
});
boxBody.position.set(1, 10, 0);
//physicsWorld.addBody(boxBody);

//ToDo Phase 5
//voorbeeld model van Ameer Studio (https://sketchfab.com/uchiha.321abc) scale(0.2) positiony(1.5)

const loader = new GLTFLoader();
var visualCar = null;
loader.load(
	'/assets/tesla/scene.gltf',
	function ( gltf ) {

        gltf.scene.scale.set(0.02,0.02,0.02);
        gltf.scene.position.y= 1.5;
        visualCar = gltf;
		scene.add( visualCar.scene );
	},
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function ( error ) {
		console.log( 'An error happened' );
	}
);

//ToDo Phase 6
const mass = 1;
const wheelshape = new CANNON.Sphere(0.7);
const wheelMaterial = new CANNON.Material('wheel');
const down = new CANNON.Vec3(0,-1,0);

const bodyCar = new CANNON.Body({
    mass:25,
    position:new CANNON.Vec3(0,2,0),
    shape: new CANNON.Box(new CANNON.Vec3(2.2,1.3,5.2))
});
const vehicle = new CANNON.RigidVehicle({
    chassisBody:bodyCar,
});
const wheelBody1 = new CANNON.Body({mass,material:wheelMaterial});
wheelBody1.addShape(wheelshape);
wheelBody1.angularDamping = 0.4;
vehicle.addWheel({
    body:wheelBody1,
    position:new CANNON.Vec3(-1.5,-0.8,3),
    axis:new CANNON.Vec3(-1,0,1),
    direction:down,
});
const wheelBody2 = new CANNON.Body({mass,material:wheelMaterial});
wheelBody2.addShape(wheelshape);
wheelBody2.angularDamping = 0.4;
vehicle.addWheel({
    body:wheelBody2,
    position:new CANNON.Vec3(-1.5,-0.8,-3.5),
    axis:new CANNON.Vec3(-1,0,0),
    direction:down,
});
const wheelBody3 = new CANNON.Body({mass,material:wheelMaterial});
wheelBody3.addShape(wheelshape);
wheelBody3.angularDamping = 0.4;
vehicle.addWheel({
    body:wheelBody3,
    position:new CANNON.Vec3(1.5,-0.8,3),
    axis:new CANNON.Vec3(-1,0,0),
    direction:down,
});
const wheelBody4 = new CANNON.Body({mass,material:wheelMaterial});
wheelBody4.addShape(wheelshape);
wheelBody4.angularDamping = 0.4;
vehicle.addWheel({
    body:wheelBody4,
    position:new CANNON.Vec3(1.5,-0.8,-3.5),
    axis:new CANNON.Vec3(-1,0,0),
    direction:down,
});
vehicle.addToWorld(physicsWorld);
//user input
const maxSteerVal = Math.PI / 4;
const maxForce = 100;

document.addEventListener('keydown', (event) => {

    switch (event.key) {
      case 'w':
      case 'ArrowUp':
        vehicle.setWheelForce(maxForce, 1)
        vehicle.setWheelForce(maxForce, 3)
        break

      case 's':
      case 'ArrowDown':
        vehicle.setWheelForce(-maxForce , 1)
        vehicle.setWheelForce(-maxForce , 3)
        break

      case 'a':
      case 'ArrowLeft':
        vehicle.setSteeringValue(maxSteerVal, 1)
        vehicle.setSteeringValue(maxSteerVal, 3)
        break

      case 'd':
      case 'ArrowRight':
        vehicle.setSteeringValue(-maxSteerVal, 1)
        vehicle.setSteeringValue(-maxSteerVal, 3)
        break
    }
  });
  //Reset force on keyup
  document.addEventListener('keyup', (event) => {
    switch (event.key) {
      case 'w':
      case 'ArrowUp':
        vehicle.setWheelForce(0, 1)
        vehicle.setWheelForce(0, 3)
        break

      case 's':
      case 'ArrowDown':
        vehicle.setWheelForce(0, 1)
        vehicle.setWheelForce(0, 3)
        break

      case 'a':
      case 'ArrowLeft':
        vehicle.setSteeringValue(0, 1)
        vehicle.setSteeringValue(0, 3)
        break

      case 'd':
      case 'ArrowRight':
        vehicle.setSteeringValue(0,1)
        vehicle.setSteeringValue(0,3)
        break
    }
  });
//ToDo Phase 7
camera.position.copy(vehicle.chassisBody.position);
camera.quaternion.copy(vehicle.chassisBody.quaternion);
const cameraOffset = new THREE.Vector3(0.0,15.0, 10.0); 
camera.position.add(cameraOffset);
GenerateFun();

const animate = () => {
    requestAnimationFrame(animate);
    //Code toevoegen na phase1
    controls.update();

    //code toevoegen na phase2
    physicsWorld.fixedStep();
    cannonDebugger.update();
    mesh.position.copy(groundBody.position);
    mesh.quaternion.copy(groundBody.quaternion);

    //ToDo Phase 4
    // boxMesh.position.copy(boxBody.position);
    // boxMesh.quaternion.copy(boxBody.quaternion);
    // bal.position.copy(balBody.position);
    // bal.quaternion.copy(balBody.quaternion);

    //ToDo Phase 6
    if(visualCar){
        visualCar.scene.position.copy(vehicle.chassisBody.position);
        visualCar.scene.quaternion.copy(vehicle.chassisBody.quaternion);
    }
	//undo code after phas 6 
    for (let i = 0; i < boxesVisual.length; i++) {
        boxesVisual[i].position.copy(boxesPhysical[i].position);
        boxesVisual[i].quaternion.copy(boxesPhysical[i].quaternion);
    }
    //ToDo Phase 7
    const position = new THREE.Vector3(vehicle.chassisBody.position.x,vehicle.chassisBody.position.y, vehicle.chassisBody.position.z); 
    camera.position.copy(vehicle.chassisBody.position).add(cameraOffset);
    camera.lookAt(position);


    //ToDo Phase 1 
    renderer.render( scene, camera );

};
animate();
//code to generate obstacles to drive against to test the workings of your car with physics angine 
function GenerateFun(){
    const offsetBoxes = new THREE.Vector3(-5,0.5, -20); 
    for (let i = 0; i < 10; i++) {
        for (let y = 0; y < 5; y++) {
            for (let z = 0; z < 2; z++) {
                const boxGeometryLoop = new THREE.BoxGeometry(1, 1, 1);
                const boxMaterialLoop = new THREE.MeshNormalMaterial();
                const test = new THREE.Mesh(boxGeometryLoop, boxMaterialLoop);
                boxesVisual.push(test);
                test.position.copy(new THREE.Vector3(i,y,z).add(offsetBoxes));
                
                scene.add(test);
            }
        }
    }
    for (let i = 0; i < 10; i++) {
        for (let y = 0; y < 5; y++) {
            for (let z = 0; z < 2; z++) {
                const boxBodyLoop = new CANNON.Body({
                    mass: 0.1,
                    shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
                });
                boxBodyLoop.position.set(i-5, y+0.5, z-20);
                boxesPhysical.push(boxBodyLoop);
                physicsWorld.addBody(boxBodyLoop);
            }
        }
    }
};