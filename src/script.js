import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { Timer } from 'three/addons/misc/Timer.js';
import { Sky } from 'three/addons/objects/Sky.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// GLTF Loader
const gltfLoader = new GLTFLoader();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

// Floor
const floorAlphaTexture = textureLoader.load('/floor/alpha.webp');
const floorColorTexture = textureLoader.load(
    '/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp'
);
const floorARMTexture = textureLoader.load(
    '/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp'
);
const floorNormalTexture = textureLoader.load(
    '/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp'
);
const floorDisplacementTexture = textureLoader.load(
    '/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp'
);

floorColorTexture.colorSpace = THREE.SRGBColorSpace;

floorColorTexture.repeat.set(8, 8);
floorARMTexture.repeat.set(8, 8);
floorNormalTexture.repeat.set(8, 8);
floorDisplacementTexture.repeat.set(8, 8);

floorColorTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;

floorColorTexture.wrapT = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

// Wall
const wallColorTexture = textureLoader.load(
    '/wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp'
);
const wallARMTexture = textureLoader.load(
    '/wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp'
);
const wallNormalTexture = textureLoader.load(
    '/wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp'
);

wallColorTexture.colorSpace = THREE.SRGBColorSpace;

// Garage Roof Triangle
const garageRoofTriangleColorTexture = textureLoader.load(
    '/wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp'
);
const garageRoofTriangleARMTexture = textureLoader.load(
    '/wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp'
);
const garageRoofTriangleNormalTexture = textureLoader.load(
    '/wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp'
);

garageRoofTriangleColorTexture.colorSpace = THREE.SRGBColorSpace;

const setRepeat = 2;
garageRoofTriangleColorTexture.repeat.set(setRepeat, setRepeat);
garageRoofTriangleARMTexture.repeat.set(setRepeat, setRepeat);
garageRoofTriangleNormalTexture.repeat.set(setRepeat, setRepeat);

garageRoofTriangleColorTexture.wrapS = THREE.RepeatWrapping;
garageRoofTriangleARMTexture.wrapS = THREE.RepeatWrapping;
garageRoofTriangleNormalTexture.wrapS = THREE.RepeatWrapping;

garageRoofTriangleColorTexture.wrapT = THREE.RepeatWrapping;
garageRoofTriangleARMTexture.wrapT = THREE.RepeatWrapping;
garageRoofTriangleNormalTexture.wrapT = THREE.RepeatWrapping;

// Roof
const roofColorTexture = textureLoader.load(
    '/roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp'
);
const roofARMTexture = textureLoader.load(
    '/roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp'
);
const roofNormalTexture = textureLoader.load(
    '/roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp'
);

roofColorTexture.colorSpace = THREE.SRGBColorSpace;

roofColorTexture.repeat.set(3, 1);
roofARMTexture.repeat.set(3, 1);
roofNormalTexture.repeat.set(3, 1);

roofColorTexture.wrapS = THREE.RepeatWrapping;
roofARMTexture.wrapS = THREE.RepeatWrapping;
roofNormalTexture.wrapS = THREE.RepeatWrapping;

// Bush
const bushColorTexture = textureLoader.load(
    '/bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp'
);
const bushARMTexture = textureLoader.load(
    '/bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp'
);
const bushNormalTexture = textureLoader.load(
    '/bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp'
);

bushColorTexture.colorSpace = THREE.SRGBColorSpace;

bushColorTexture.repeat.set(2, 1);
bushARMTexture.repeat.set(2, 1);
bushNormalTexture.repeat.set(2, 1);

bushColorTexture.wrapS = THREE.RepeatWrapping;
bushARMTexture.wrapS = THREE.RepeatWrapping;
bushNormalTexture.wrapS = THREE.RepeatWrapping;

// Grave
const graveColorTexture = textureLoader.load(
    '/grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp'
);
const graveARMTexture = textureLoader.load(
    '/grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp'
);
const graveNormalTexture = textureLoader.load(
    '/grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp'
);

graveColorTexture.colorSpace = THREE.SRGBColorSpace;

graveColorTexture.repeat.set(0.3, 0.4);
graveARMTexture.repeat.set(0.3, 0.4);
graveNormalTexture.repeat.set(0.3, 0.4);

// Door
const doorColorTexture = textureLoader.load('./door/color.webp');
const doorAlphaTexture = textureLoader.load('./door/alpha.webp');
const doorAmbientOcclusionTexture = textureLoader.load(
    './door/ambientOcclusion.webp'
);
const doorHeightTexture = textureLoader.load('./door/height.webp');
const doorNormalTexture = textureLoader.load('./door/normal.webp');
const doorMetalnessTexture = textureLoader.load('./door/metalness.webp');
const doorRoughnessTexture = textureLoader.load('./door/roughness.webp');

doorColorTexture.colorSpace = THREE.SRGBColorSpace;

// Roof (again for garage roof)
const roofGarageColorTexture = textureLoader.load(
    '/roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp'
);
const roofGarageARMTexture = textureLoader.load(
    '/roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp'
);
const roofGarageNormalTexture = textureLoader.load(
    '/roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp'
);

roofGarageColorTexture.colorSpace = THREE.SRGBColorSpace;

const garageRoofRepeatX = 2;
const garageRoofRepeatY = 2;
roofGarageColorTexture.repeat.set(garageRoofRepeatX, garageRoofRepeatY);
roofGarageARMTexture.repeat.set(garageRoofRepeatX, garageRoofRepeatY);
roofGarageNormalTexture.repeat.set(garageRoofRepeatX, garageRoofRepeatY);

roofGarageColorTexture.wrapS = THREE.RepeatWrapping;
roofGarageARMTexture.wrapS = THREE.RepeatWrapping;
roofGarageNormalTexture.wrapS = THREE.RepeatWrapping;

// Garage Door
const garageDoorColorTexture = textureLoader.load(
    './garage-door/textures/rusty_metal_05_diff_1k.jpg'
);
const garageDoorARMTexture = textureLoader.load(
    './garage-door/textures/rusty_metal_05_arm_1k.jpg'
);
const garageDoorDisplacementTexture = textureLoader.load(
    './garage-door/textures/rusty_metal_05_disp_1k.png'
);
const garageDoorNormalTexture = textureLoader.load(
    './garage-door/textures/rusty_metal_05_nor_gl_1k.exr'
);
const garageDoorRoughnessTexture = textureLoader.load(
    './garage-door/textures/rusty_metal_05_rough_1k.exr'
);

garageDoorColorTexture.colorSpace = THREE.SRGBColorSpace;

const garageDoorRepeatX = 5;
const garageDoorRepeatY = 5;
garageDoorColorTexture.repeat.set(garageDoorRepeatX, garageDoorRepeatY);
garageDoorARMTexture.repeat.set(garageDoorRepeatX, garageDoorRepeatY);
garageDoorNormalTexture.repeat.set(garageDoorRepeatX, garageDoorRepeatY);

garageDoorColorTexture.wrapS = THREE.RepeatWrapping;
garageDoorARMTexture.wrapS = THREE.RepeatWrapping;
garageDoorNormalTexture.wrapS = THREE.RepeatWrapping;

garageDoorColorTexture.wrapT = THREE.RepeatWrapping;
garageDoorARMTexture.wrapT = THREE.RepeatWrapping;
garageDoorNormalTexture.wrapT = THREE.RepeatWrapping;

/**
 * House
 */
// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.3,
        displacementBias: -0.18,
    })
);
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

// House container
const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        normalMap: wallNormalTexture,
    })
);
walls.position.y += walls.geometry.parameters.height / 2;
house.add(walls);

// Garage
const garage = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 2, 3),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        normalMap: wallNormalTexture,
    })
);
garage.position.y += garage.geometry.parameters.height / 2;
garage.position.x +=
    walls.geometry.parameters.width / 2 + garage.geometry.parameters.width / 2;
house.add(garage);

// Garage Roof
// Завантажте модель
gltfLoader.load(
    '/models/garage_roof_triangle.glb',
    (gltf) => {
        const triangle_roof = gltf.scene.getObjectByName('roof_triangle');
        if (triangle_roof) {
            triangle_roof.material = triangle_roof.material.clone();
            triangle_roof.material.map = roofGarageColorTexture;
            triangle_roof.material.aoMap = roofGarageARMTexture;
            triangle_roof.material.roughnessMap = roofGarageARMTexture;
            triangle_roof.material.metalnessMap = roofGarageARMTexture;
            triangle_roof.material.normalMap = roofGarageNormalTexture;
            triangle_roof.material.needsUpdate = true;

            triangle_roof.position.y = garage.geometry.parameters.height + 0.01;
            triangle_roof.position.x = garage.position.x;

            triangle_roof.scale.x = garage.geometry.parameters.width / 2;
            triangle_roof.scale.z = garage.geometry.parameters.depth / 2;
            house.add(triangle_roof);
        }

        const roof = gltf.scene.getObjectByName('roof');
        if (roof) {
            roof.material = roof.material.clone();
            roof.material.map = roofGarageColorTexture;
            roof.material.aoMap = roofGarageARMTexture;
            roof.material.roughnessMap = roofGarageARMTexture;
            roof.material.metalnessMap = roofGarageARMTexture;
            roof.material.normalMap = roofGarageNormalTexture;
            roof.material.needsUpdate = true;

            roof.position.y = garage.geometry.parameters.height;
            roof.position.x = garage.position.x - 0.2;

            roof.scale.x = garage.geometry.parameters.width / 2 + 0.2;
            roof.scale.z = garage.geometry.parameters.depth / 2;
            house.add(roof);
        }
    },
    undefined,
    (error) => {
        console.error('Помилка завантаження моделі даху:', error);
    }
);

// Garage Door
gltfLoader.load(
    '/models/garage_door.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                child.material = child.material.clone();
                child.material.map = garageDoorColorTexture;
                child.material.aoMap = garageDoorARMTexture;
                child.material.metalnessMap = garageDoorRoughnessTexture;

                child.scale.x = garage.geometry.parameters.width / 2.5;
                child.scale.y = garage.geometry.parameters.height / 2.2;
                child.scale.z = 0.05;

                child.position.y = garage.geometry.parameters.height / 2 - 0.25;
                child.position.z = garage.geometry.parameters.depth / 2 + 0.01;
                child.position.x = garage.position.x;
            }
        });

        house.add(gltf.scene);
    },
    undefined,
    (error) => {
        console.error('Помилка завантаження моделі даху:', error);
    }
);

// Center house
const houseWidth =
    walls.geometry.parameters.width + garage.geometry.parameters.width;
house.position.x = -(houseWidth / 2 - walls.geometry.parameters.width / 2);

// Windows
gltfLoader.load(
    '/models/window.glb',
    (gltf) => {
        const window1 = gltf.scene.clone(true);
        window1.traverse((child) => {
            if (child.isMesh) {
                child.material = child.material.clone();
                child.scale.set(0.6, 0.6, 0.6);
                child.position.set(
                    -walls.geometry.parameters.depth / 2 - 0.01,
                    walls.geometry.parameters.height / 4,
                    0
                );
            }
        });
        house.add(window1);

        const window2 = gltf.scene.clone(true);
        window2.traverse((child) => {
            if (child.isMesh) {
                child.material = child.material.clone();
                child.scale.set(0.6, 0.5, 0.5);
                child.position.set(
                    walls.geometry.parameters.depth / 2 + garage.geometry.parameters.width + 0.01,
                    garage.geometry.parameters.height / 4,
                    0
                );
                child.rotation.y = Math.PI;
            }
        });
        house.add(window2);

        const window3 = gltf.scene.clone(true);
        window3.traverse((child) => {
            if (child.isMesh) {
                child.material = child.material.clone();
                child.scale.set(0.6, 0.6, 0.6);
                child.position.set(
                    0,
                    walls.geometry.parameters.height / 4,
                    -walls.geometry.parameters.depth / 2 - 0.01
                );
                child.rotation.y = Math.PI / 2 + Math.PI;
            }
        });
        house.add(window3);
    },
    undefined,
    (error) => {
        console.error('Помилка завантаження моделі даху:', error);
    }
);

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture,
    })
);
roof.position.y =
    walls.geometry.parameters.height + roof.geometry.parameters.height / 2;
roof.rotation.y = Math.PI / 4;
house.add(roof);

// Door
const doorHeight = 2.2;
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, doorHeight, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
        displacementScale: 0.15,
        displacementBias: -0.04,
    })
);
door.position.y = doorHeight / 2;
door.position.z = walls.geometry.parameters.depth / 2 + 0.01;
house.add(door);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
    color: '#ccffcc',
    map: bushColorTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNormalTexture,
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);
bush1.rotation.x = -0.75;

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);
bush2.rotation.x = -0.75;

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.rotation.x = -0.75;

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);
bush4.rotation.x = -0.75;

house.add(bush1, bush2, bush3, bush4);

// Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture,
});

const graves = new THREE.Group();
scene.add(graves);

for (let i = 0; i < 30; i++) {
    // Coordinates
    const angle = Math.random() * Math.PI * 2;
    const radius = houseWidth / 2 + 1 + Math.random() * 4;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    // Mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    grave.position.x = x;
    grave.position.z = z;
    grave.position.y = Math.random() * 0.4;

    grave.rotation.y = (Math.random() - 0.5) * 0.4;
    grave.rotation.z = (Math.random() - 0.5) * 0.4;
    grave.rotation.x = (Math.random() - 0.5) * 0.4;

    // Add to the graves group
    graves.add(grave);
}

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#8800ff', 6);
const ghost2 = new THREE.PointLight('#ff0088', 6);
const ghost3 = new THREE.PointLight('#ff0000', 6);
scene.add(ghost1, ghost2, ghost3);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 5);
doorLight.position.set(0, doorHeight, walls.geometry.parameters.height);
house.add(doorLight);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Shadows
 */
// Renderer
renderer.shadowMap.enabled = true;

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Cast and receive
directionalLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
walls.receiveShadow = true;
roof.castShadow = true;
floor.receiveShadow = true;

for (const grave of graves.children) {
    grave.castShadow = true;
    grave.receiveShadow = true;
}

// Mappings
directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 10;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 10;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 10;

/**
 * Sky
 */
const sky = new Sky();
sky.scale.set(100, 100, 100);
scene.add(sky);

sky.material.uniforms['turbidity'].value = 10;
sky.material.uniforms['rayleigh'].value = 3;
sky.material.uniforms['mieCoefficient'].value = 0.1;
sky.material.uniforms['mieDirectionalG'].value = 0.95;
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95);

/**
 * Fog
 */
// scene.fog = new THREE.Fog('#ff0000', 1, 13)
scene.fog = new THREE.FogExp2('#04343f', 0.1);

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
    // Timer
    timer.update();
    const elapsedTime = timer.getElapsed();

    // Door light flicker
    doorLight.intensity = 3 + Math.sin(elapsedTime * 20) * Math.random();

    // Ghosts animation
    const ghost1Angle = elapsedTime * 0.5;
    ghost1.intensity = houseWidth + Math.sin(elapsedTime * 10) * 2;
    ghost1.position.x = Math.cos(ghost1Angle) * 4;
    ghost1.position.z = Math.sin(ghost1Angle) * 4;
    ghost1.position.y =
        Math.sin(ghost1Angle) *
        Math.sin(ghost1Angle * 2.34) *
        Math.sin(ghost1Angle * 3.45);

    const ghost2Angle = -elapsedTime * 0.38;
    ghost2.intensity = houseWidth + Math.sin(elapsedTime * 10) * 2;
    ghost2.position.x = Math.cos(ghost2Angle) * 5;
    ghost2.position.z = Math.sin(ghost2Angle) * 5;
    ghost2.position.y =
        Math.sin(ghost2Angle) *
        Math.sin(ghost2Angle * 2.34) *
        Math.sin(ghost2Angle * 3.45);

    const ghost3Angle = elapsedTime * 0.23;
    ghost3.intensity = houseWidth + Math.sin(elapsedTime * 10) * 2;
    ghost3.position.x = Math.cos(ghost3Angle) * 6;
    ghost3.position.z = Math.sin(ghost3Angle) * 6;
    ghost3.position.y =
        Math.sin(ghost3Angle) *
        Math.sin(ghost3Angle * 2.34) *
        Math.sin(ghost3Angle * 3.45);

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
