import { gl, GLUtilities } from "./GLUtilities"

/**
 * The main game engine class
 */
export class Engine {
  private _canvas: HTMLCanvasElement

  /**
   *  Create a new engine
   */
  public constructor() {
    console.log("hi")
  }

  /**
   * Starts up this engine
   */
  public start() {
    this._canvas = GLUtilities.initialize("canvas")

    gl.clearColor(0, 0, 0, 1)

    this.loop()
  }

  private loop() {
    gl.clear(gl.COLOR_BUFFER_BIT)

    requestAnimationFrame(this.loop.bind(this))
  }
}
