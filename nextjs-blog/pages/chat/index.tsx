import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Model3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x192231);
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 2, 8);
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Lighting - Improved for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0x8DE1FD, 0.5);
    directionalLight2.position.set(-5, 3, -5);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0xC5EFFD, 0.8);
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 1, 0);
    controls.enablePan = false;
    controls.minDistance = 3;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI * 0.85;
    controls.update();
    
    // Load 3D Model
    const loader = new GLTFLoader();
    loader.load(
      '/cat.gltf',
      (gltf) => {
        const model = gltf.scene;
        
        // Center and scale the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Calculate scale to fit model in view
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3 / maxDim;
        model.scale.set(scale, scale, scale);
        
        // Center the model
        model.position.x = -center.x * scale;
        model.position.y = -center.y * scale;
        model.position.z = -center.z * scale;
        
        // Add model to scene
        scene.add(model);
        setIsLoading(false);
        
        console.log('Model loaded successfully');
      },
      (xhr) => {
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        console.log(`${percentComplete.toFixed(2)}% loaded`);
      },
      (error) => {
        console.error('Error loading model:', error);
        setError('Impossible de charger le modèle 3D. Vérifiez que le fichier cat.gltf existe dans le dossier public.');
        setIsLoading(false);
      }
    );
    
    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      controls.dispose();
      renderer.dispose();
    };
  }, []);
  
  return (
    <>
      <Head>
        <title>miaou !</title>
        <meta name="description" content="Vue 3D d'un chat - Mathieu HERNANDEZ" />
      </Head>
      
      <div 
        ref={containerRef} 
        className="fixed top-0 left-0 w-screen h-screen overflow-hidden bg-[#192231]"
      >
        {isLoading && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-lg md:text-2xl font-bold opacity-90 z-10 text-center p-5">
            Chargement du modèle 3D...
          </div>
        )}
        
        {error && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-400 text-sm md:text-lg font-bold opacity-90 z-10 text-center p-5 max-w-[80%] bg-black/70 rounded-xl">
            {error}
          </div>
        )}
        
        {!isLoading && !error && (
          <div className="absolute bottom-5 md:bottom-[30px] left-1/2 -translate-x-1/2 text-white text-xs md:text-sm opacity-70 z-10 text-center px-5 py-2.5 bg-black/50 rounded-[20px]">
            Utilisez la souris pour faire pivoter • Molette pour zoomer
          </div>
        )}
      </div>
    </>
  );
}