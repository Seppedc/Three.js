import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import CannonDebugger from 'cannon-es-debugger';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
let boxesVisual = [];
let boxesPhysical = [];

//ToDo Phase 1


//code toevoegen na Phase 1
// const controls = new OrbitControls( camera, renderer.domElement );
// controls.update();
// const axesHelper = new THREE.AxesHelper(8);
// scene.add(axesHelper);


//ToDo Phase 2


//code voor de vloer:
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




//code toevoegen na Phase 2
// const geometry = new THREE.SphereGeometry(1);
// const material = new THREE.MeshNormalMaterial();
// const bal = new THREE.Mesh(geometry, material);
// scene.add(bal);
// const physicsWorld = new CANNON.World({
//     gravity: new CANNON.Vec3(0, -9.82, 0),
// });
// const groundBody = new CANNON.Body({
//     type: CANNON.Body.STATIC,
//     shape: new CANNON.Plane(),
// });
// groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
// physicsWorld.addBody(groundBody);
// const cannonDebugger = new CannonDebugger(scene, physicsWorld, {
//     color: 0xff0000,
// });

//ToDo Phase 3


//ToDo Phase 5
//voorbeeld model van Ameer Studio (https://sketchfab.com/uchiha.321abc) scale(0.2) positiony(1.5)


//ToDo Phase 6
const mass = 1;
const wheelshape = new CANNON.Sphere(0.7);
const wheelMaterial = new CANNON.Material('wheel');
const down = new CANNON.Vec3(0,-1,0);


//user input
const maxSteerVal = Math.PI / 4;
const maxForce = 100;


//ToDo Phase 7

const animate = () => {
    requestAnimationFrame(animate);
    //Code toevoegen na phase1
    //controls.update();

    //code toevoegen na phase2
    // physicsWorld.fixedStep();
    // cannonDebugger.update();
    // mesh.position.copy(groundBody.position);
    // mesh.quaternion.copy(groundBody.quaternion);

    //ToDo Phase 4
    

    //ToDo Phase 6
    
    //Code toevoegen na phase 6
    // for (let i = 0; i < boxesVisual.length; i++) {
    //     boxesVisual[i].position.copy(boxesPhysical[i].position);
    //     boxesVisual[i].quaternion.copy(boxesPhysical[i].quaternion);
    // }
    //ToDo Phase 7
    


    //ToDo Phase 1 

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