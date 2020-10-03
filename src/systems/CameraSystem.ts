import { System } from 'ecsy'
import { Vector2 } from 'three'
import { camera, renderer } from '../core/three'

const mouse = new Vector2()
const target = new Vector2()
const windowHalf = new Vector2(window.innerWidth / 2, window.innerHeight / 2)

export class CameraSystem extends System {
  init() {
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove)

    function onMouseMove(event) {
      console.log('roll')
      mouse.x = event.clientX - windowHalf.x
      mouse.y = event.clientY - windowHalf.x
    }

    function onResize(event) {
      const width = window.innerWidth
      const height = window.innerHeight

      windowHalf.set(width / 2, height / 2)

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
  }

  execute(delta, time) {
    target.x = (1 - mouse.x) * 0.002
    target.y = (1 - mouse.y) * 0.002
    // camera.rotation.x += 0.05 * (target.y - camera.rotation.x) * delta
    camera.rotation.y += 0.05 * (target.x - camera.rotation.y) * delta
  }
}
