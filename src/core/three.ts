import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  CineonToneMapping,
  PCFSoftShadowMap,
  Vector2,
} from 'three'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { PixelShader } from 'three/examples/jsm/shaders/PixelShader.js'

export const renderer = new WebGLRenderer({ antialias: true, alpha: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

export const mainScene = new Scene()

var viewAngle = 60,
  near = 1,
  far = 1000

export const camera = new PerspectiveCamera(
  viewAngle,
  window.innerWidth / window.innerHeight,
  near,
  far
)

renderer.physicallyCorrectLights = true
// renderer.outputEncoding = sRGBEncoding
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap
renderer.toneMapping = CineonToneMapping

export const composer = new EffectComposer(renderer)
composer.addPass(new RenderPass(mainScene, camera))

export const pixelPass = new ShaderPass(PixelShader)
pixelPass.uniforms['resolution'].value = new Vector2(
  window.innerWidth,
  window.innerHeight
)
pixelPass.uniforms['resolution'].value.multiplyScalar(window.devicePixelRatio)
composer.addPass(pixelPass)
pixelPass.uniforms['pixelSize'].value = 1
