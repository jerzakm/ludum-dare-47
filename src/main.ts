import App from './App.svelte'
import { initEcsy } from './core/ecsy'
import { runGame } from './game'

initEcsy()
runGame()

const app = new App({
  target: document.body,
})

export default app
