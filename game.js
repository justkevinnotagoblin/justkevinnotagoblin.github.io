import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { PointerLockControls } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/PointerLockControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#game") });
renderer.setSize(window.innerWidth, window.innerHeight);

const light = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(light);

camera.position.y = 1.6;

// floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshStandardMaterial({ color: 0x555555 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// grabpack hand
const hand = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.2, 0.2),
    new THREE.MeshStandardMaterial({ color: 0x00aaff })
);

scene.add(hand);
hand.visible = false;

let shooting = false;
let distance = 0;

document.addEventListener("click", () => {
    controls.lock();
});

// shoot grabpack
document.addEventListener("mousedown", () => {
    shooting = true;
    distance = 0;
    hand.visible = true;
});

// pointer lock
const controls = new PointerLockControls(camera, document.body);
scene.add(controls.getObject());

function animate() {
    requestAnimationFrame(animate);

    if (shooting) {
        distance += 0.2;

        hand.position.copy(camera.position);
        hand.translateZ(-distance);

        if (distance > 10) {
            shooting = false;
            hand.visible = false;
        }
    }

    renderer.render(scene, camera);
}

animate();
