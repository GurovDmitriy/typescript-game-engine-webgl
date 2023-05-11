import { gl, GLUtilities } from "./gl/GLUtilities"
import { Shader } from "./gl/shader"

/**
 * The main game engine class
 */
export class Engine {
  private _canvas: HTMLCanvasElement
  private _shader: Shader

  private _buffer: WebGLBuffer

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

    this.createBuffer()

    this.resize()
    this.loop()
  }

  /**
   * Resize the canvas to fit the window
   */
  public resize() {
    if (this._canvas !== undefined) {
      this._canvas.width = window.innerWidth
      this._canvas.height = window.innerHeight

      gl.viewport(0, 0, this._canvas.width, this._canvas.height)
    }
  }

  private loop() {
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer)
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(0)

    gl.drawArrays(gl.TRIANGLES, 0, 3)

    requestAnimationFrame(this.loop.bind(this))
  }

  private createBuffer() {
    this._buffer = gl.createBuffer()

    const vertices = [
      // x, y, z
      0, 0, 0, 0, 0.5, 0, 0.5, 0.5, 0,
    ]

    gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer)
    gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(0)

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

    gl.bindBuffer(gl.ARRAY_BUFFER, undefined)
    gl.disableVertexAttribArray(0)
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
