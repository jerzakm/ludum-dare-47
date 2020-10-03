import {
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  TextureLoader,
  RepeatWrapping,
  SphereGeometry,
  SpriteMaterial,
  Sprite,
  DoubleSide,
  Vector2,
  Object3D,
} from 'three'
import { mainScene, camera } from './core/three'
import { degToRad, radToDeg, findPointWithAngle } from './util/math'
import { Bodies, Engine, Body } from 'matter-js'
import * as ROT from 'rot-js'
import { World } from 'matter-js'

export const engine = Engine.create()
export const world = engine.world

interface GameBody {
  object3d: Object3D
  body: Body
}

export const gameBodies: GameBody[] = []

export const runGame = () => {
  const seed = 1234
  ROT.RNG.setSeed(seed)

  const mapSize = 100
  physicsSetup()
  floorSetup(mapSize)
  playerSetup()
  wallsSetup(mapSize)
  mapGeneration(mapSize)
}

function physicsSetup() {}

function mapGeneration(mapSize: number) {
  const map = new ROT.Map.Digger(mapSize, mapSize, {
    roomHeight: [4, 10],
    roomWidth: [4, 10],
  })
  var display = new ROT.Display({ fontSize: 8 })
  // SHOW(display.getContainer())
  map.create(display.DEBUG)

  var drawDoor = function (x, y) {
    display.draw(x, y, '', '', 'red')
  }

  var rooms = map.getRooms()
  for (var i = 0; i < rooms.length; i++) {
    var room = rooms[i]

    room.getDoors(drawDoor)
  }
}

function playerSetup() {
  const body = Bodies.circle(0, 0, 0.5)
  World.add(world, body)

  gameBodies.push({
    object3d: camera,
    body,
  })

  camera.rotation.y = 0
  camera.position.set(0.2, 1.5, 0.2)
}

function wallsSetup(mapSize: number) {
  // console.log(ROT)
  // const map = new ROT.Map.Digger(mapSize, mapSize, {
  //   roomHeight: [4, 10],
  //   roomWidth: [4, 10],
  // })
  // map.create()
  // console.log(map)
}

function floorSetup(mapSize: number) {
  const loader = new TextureLoader()

  const texture = loader.load('tiles/floor.jpg')
  texture.repeat.x = 25
  texture.repeat.y = 25
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping

  const material = new MeshBasicMaterial({
    map: texture,
  })
  const geometry = new PlaneGeometry(mapSize, mapSize)
  const mesh = new Mesh(geometry, material)
  mesh.rotateX(degToRad(-90))
  mainScene.add(mesh)
}
