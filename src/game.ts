import { PlaneGeometry, MeshBasicMaterial, Mesh } from 'three'
import { mainScene } from './core/three'
import { degToRad } from './util/math'

export const runGame = () => {
  const mapSize = 100

  const material = new MeshBasicMaterial({ color: '#555588' })
  const geometry = new PlaneGeometry(mapSize, mapSize)
  const mesh = new Mesh(geometry, material)
  mesh.rotateX(degToRad(-90))
  mainScene.add(mesh)
}
