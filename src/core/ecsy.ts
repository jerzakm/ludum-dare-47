import { World } from 'ecsy'
import { RenderSystem } from '../systems/RenderSystem'

let world: World

export const initEcsy = () => {
  world = new World()

  world.registerSystem(RenderSystem)
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
