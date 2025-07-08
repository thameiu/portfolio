import { useEffect, useRef } from 'react';
import Head from 'next/head';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import styles from '../../styles/Model3D.module.css';

export default function Model3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x192231); // Match site theme color
    
    // Camera with farther initial position
    const camera = new THREE.PerspectiveCamera(
      65, // Slightly wider field of view
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 15; // Start much further away (was 5)
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x0000ff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xC5EFFD, 1);
    pointLight.position.set(-5, 3, 5);
    scene.add(pointLight);
    
    // Target point for camera to orbit around
    const centerPoint = new THREE.Vector3(0, 0, 0);
    
    // Controls - configured for anchored orbit with adjusted zoom limits
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target = centerPoint;
    controls.enablePan = false;
    controls.minDistance = 4;   // Allow closer zoom if needed (was 2)
    controls.maxDistance = 20;  // Allow much further zoom out (was 10)
    controls.maxPolarAngle = Math.PI * 0.85;
    
    // Load 3D Model
    const loader = new GLTFLoader();
    loader.load(
      '/cat.gltf', // Make sure this file exists in the public directory
      (gltf) => {
        const model = gltf.scene;
        
        // Center the model properly
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        
        // Move the model to center
        model.position.x -= center.x;
        model.position.y -= center.y;
        model.position.z -= center.z;
        
        // Scale model if needed (0.5 = half the original size)
        // Uncomment and adjust if model is still too large
        // model.scale.set(0.5, 0.5, 0.5); 
        
        // Update controls target to match model center
        controls.target.set(0, 0, 0);
        controls.update();
        
        scene.add(model);
        
        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };
        
        animate();
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('An error occurred loading the model', error);
      }
    );
    
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
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      controls.dispose();
    };
  }, []);
  
  return (
    <>
      <Head>
        <title>Moi en 3D - Mathieu HERNANDEZ</title>
        <meta name="description" content="Modèle 3D de Mathieu HERNANDEZ" />
      </Head>
      
      <div ref={containerRef} className={styles.container}>
        <div className={styles.loadingText}>miaou...</div>
        
        {/* Add controls hint for users */}
        <div className={styles.controlsHint}>
miaou,
        </div>
      </div>
    </>
  );
}