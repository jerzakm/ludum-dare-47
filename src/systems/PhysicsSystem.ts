import { System } from 'ecsy'
import { Engine } from 'matter-js'
import { engine, gameBodies, world } from '../game'

export class PhysicsSystem extends System {
  init() {
    world.gravity.x = 0
    world.gravity.y = 0
  }

  execute(delta, time) {
    Engine.update(engine, delta)
    for (const gameBody of gameBodies) {
      gameBody.object3d.position.set(
        gameBody.body.position.x,
        gameBody.object3d.position.y,
        gameBody.body.position.y
      )
    }
  }
}
