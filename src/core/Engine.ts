import { gl, GLUtilities } from "./gl/GLUtilities"
import { Shader } from "./gl/shader"

/**
 * The main game engine class
 */
export class Engine {
  private _canvas: HTMLCanvasElement
  private _shader: Shader

  /**
   *  Create a new engine
   */
  public constructor() {
    console.log("Create a new engine")
  }

  /**
   * Starts up this engine
   */
  public start() {
    this._canvas = GLUtilities.initialize("canvas")

    gl.clearColor(0, 0, 0, 1)

    this.loadShaders()
    this._shader.use()

    this.loop()
  }

  /**
   * Resize the canvas to fit the window
   */
  public resize() {
    if (this._canvas !== undefined) {
      this._canvas.width = window.innerWidth
      this._canvas.height = window.innerHeight
    }
  }

  private loop() {
    gl.clear(gl.COLOR_BUFFER_BIT)

    requestAnimationFrame(this.loop.bind(this))
  }

  private loadShaders() {
    const vertexShaderSource = `
    attribute vec3 a_position;

    void main() {
      gl_Position = vec4(a_position, 1.0);
    }`

    const fragmentShaderSource = `
    precision mediump float;

    void main() {
      gl_FragColor = vec4(1.0);
    }`

    this._shader = new Shader("basic", vertexShaderSource, fragmentShaderSource)
  }
}
