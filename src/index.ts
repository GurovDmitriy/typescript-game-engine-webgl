import TSE from "./TSE"

/**
 * The main entry point  to the application
 */

window.onload = function () {
  const engine = new TSE.Engine()
  engine.start()
}

export {}
