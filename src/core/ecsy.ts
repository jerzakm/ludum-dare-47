import { World } from 'ecsy'
import { RenderSystem } from '../systems/RenderSystem'
import { PhysicsSystem } from '../systems/PhysicsSystem'
import { CameraSystem } from '../systems/CameraSystem'

let world: World

export const initEcsy = () => {
  world = new World()

  world.registerSystem(RenderSystem)
  world.registerSystem(PhysicsSystem)
  world.registerSystem(CameraSystem)
  run()
}

let lastTime = performance.now()
function run() {
  // Compute delta and elapsed time
  let time = performance.now()
  let delta = time - lastTime

  // Run all the systems
  world.execute(delta, time)

  lastTime = time
  requestAnimationFrame(run)
}
