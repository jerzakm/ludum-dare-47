import { System } from 'ecsy'
import { renderer, camera, mainScene, pixelPass, composer } from '../core/three'
import * as Stats from 'stats-js'

const stats = new Stats.default()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

export class RenderSystem extends System {
  init() {
    document.body.appendChild(renderer.domElement)
    renderer.domElement.requestPointerLock()
    renderer.domElement.style.position = 'fixed'

    window.addEventListener('resize', onWindowResize, false)
    onWindowResize()
  }

  execute(delta, time) {
    stats.end()
    stats.begin()
    // renderer.render(mainScene, camera)
    composer.render()
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  pixelPass.uniforms['resolution'].value
    .set(window.innerWidth, window.innerHeight)
    .multiplyScalar(window.devicePixelRatio)

  renderer.setSize(window.innerWidth, window.innerHeight)
}
