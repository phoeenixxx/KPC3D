let scene, camera, renderer, plaque, base, group;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 3, 8);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    group = new THREE.Group();
    group.position.y = 0.8;
    scene.add(group);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7.5);
    scene.add(dirLight);

    const sideLight = new THREE.PointLight(0xffffff, 0.8);
    sideLight.position.set(-5, 5, 5);
    scene.add(sideLight);

    const pointLight = new THREE.PointLight(0x001a66, 1.5);
    pointLight.position.set(0, -2, 5);
    scene.add(pointLight);

    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load('KPC.svg');

    const plaqueGeo = new THREE.BoxGeometry(3, 4.5, 0.22);
    const plaqueMat = new THREE.MeshPhysicalMaterial({
        color: 0x000a33,
        metalness: 0.1,
        roughness: 0.3,
        transmission: 0,
        transparent: true,
        opacity: 1.0,
        map: logoTexture,
        emissive: 0xffffff,
        emissiveMap: logoTexture,
        emissiveIntensity: 0.8,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
    });
    
    plaque = new THREE.Mesh(plaqueGeo, plaqueMat);
    plaque.position.y = 2.4;
    group.add(plaque);

    const baseGeo = new THREE.BoxGeometry(4.2, 0.5, 2);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x121212, roughness: 0.85 });
    base = new THREE.Mesh(baseGeo, baseMat);
    group.add(base);

    const slotGeo = new THREE.BoxGeometry(3.1, 0.12, 0.26);
    const slotMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const slot = new THREE.Mesh(slotGeo, slotMat);
    slot.position.y = 0.25;
    base.add(slot);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    group.rotation.y += 0.005;
    renderer.render(scene, camera);
}

let isMouseDown = false;
let prevX = 0;
document.addEventListener('mousedown', () => isMouseDown = true);
document.addEventListener('mouseup', () => isMouseDown = false);
document.addEventListener('mousemove', (e) => {
    if (isMouseDown) group.rotation.y += (e.clientX - prevX) * 0.01;
    prevX = e.clientX;
});

window.onload = init;
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});