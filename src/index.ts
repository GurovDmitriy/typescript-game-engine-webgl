import { Engine } from "./core/Engine"

const engine = new Engine()

/**
 * The main entry point  to the application
 */
window.onload = function onLoad() {
  engine.start()
}

window.onresize = function onResize() {
  engine.resize()
}

export {}
