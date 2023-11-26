/* eslint-disable react/no-unknown-property */
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { MathUtils } from "three";
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import * as THREE from 'three'
import { Sparkles } from "@react-three/drei";
import mp3 from '../../public/tvari-tokyo-cafe.mp3'

const listener = new THREE.AudioListener()
const sound = new THREE.Audio(listener)
const analyser = new THREE.AudioAnalyser(sound, 32)

const audioLoader = new THREE.AudioLoader()
audioLoader.load(mp3, function(buffer){
    sound.setBuffer(buffer)
    window.addEventListener('click', function(){
        sound.play()
    })
})

const Blob = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  const uniforms = useMemo(
    () => ({
      u_intensity: {
        value: 0.3,
      },
      u_time: {
        value: 0.0,
      },
      u_frequency:{
        value:0.0,
      }
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;

    mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();
    mesh.current.material.uniforms.u_frequency = analyser.getAverageFrequency();
    //mesh.current.rotation.x = clock.getElapsedTime() * 0.5

    mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
      mesh.current.material.uniforms.u_frequency,
      mesh.current.material.uniforms.u_frequency >140 ? 0.85 : 0.15,
      0.2
    );
  });

  return (
    <>
    <color args={['#030202']} attach={'background'}/>
    <camera AudioListener={listener}>
    <mesh
      ref={mesh}
      position={[0, 0, -4]}
      scale={1.5}
      >
      
      <icosahedronGeometry args={[2, 20]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={true}
        />
    </mesh>
    <Sparkles
                size={2}
                scale={[20,20,20]}
                speed={0.5}
                count={400}
            />
    </camera>
    </>
  );
};

export default Blob;