/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { OrbitControls, shaderMaterial } from "@react-three/drei"
import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { extend, useFrame } from "@react-three/fiber"
import { useRef } from "react"

const PatternMaterial = shaderMaterial(
    {
        uTime:0,
    },
    vertexShader,
    fragmentShader
)

extend({PatternMaterial})

const Model = () => {

    const patternMaterial= useRef()

    useFrame((state,delta)=>{
        patternMaterial.current.uTime += delta*1.
    })

  return (
    <>
        <color args={['#030202']} attach={'background'}/>
        <OrbitControls makeDefault/>
        <pointLight/>
    <mesh>
        <icosahedronGeometry args={[2,3]}/>
        <patternMaterial  wirefram={true}  ref={patternMaterial} />
    </mesh>
    </>
  )
}

export default Model