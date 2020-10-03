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

import { MapControls } from 'three/examples/jsm/controls/OrbitControls'

export const renderer = new WebGLRenderer({ antialias: true, alpha: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

export const mainScene = new Scene()

var viewAngle = 22,
  near = 1,
  far = 1000,
  radians = -Math.PI / 4

export const camera = new PerspectiveCamera(
  viewAngle,
  window.innerWidth / window.innerHeight,
  near,
  far
)
camera.rotation.order = 'YXZ'
camera.rotation.y = radians
camera.rotation.x = Math.atan(-1 / Math.sqrt(2))
camera.position.y = 40
camera.scale.addScalar(1)

camera.position.set(64, 64, 10)
camera.lookAt(64, 64, 0)

renderer.physicallyCorrectLights = true
// renderer.outputEncoding = sRGBEncoding
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap
renderer.toneMapping = CineonToneMapping

export const controls = new MapControls(camera, renderer.domElement)

controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05

controls.screenSpacePanning = false

controls.minDistance = 1
controls.maxDistance = 500

controls.maxPolarAngle = Math.PI / 2

controls.update()

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
