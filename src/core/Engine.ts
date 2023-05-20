import { AttributeInfo, GLBuffer } from "./gl/GLBuffer"
import { GLUtilities, gl } from "./gl/GLUtilities"
import { Shader } from "./gl/shader"

/**
 * The main game engine class
 */
export class Engine {
  private _canvas: HTMLCanvasElement
  private _shader: Shader

  private _buffer: GLBuffer

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

    const colorPosition = this._shader.getUniformLocation("u_color")
    gl.uniform4f(colorPosition, 1, 0.5, 0, 1)

    this._buffer.bind()
    this._buffer.draw()

    requestAnimationFrame(this.loop.bind(this))
  }

  private createBuffer() {
    this._buffer = new GLBuffer(3)

    const positionAttribute = new AttributeInfo()

    positionAttribute.location = this._shader.getAttributeLocation("a_position")
    positionAttribute.offset = 0
    positionAttribute.size = 3
    this._buffer.addAttributeLocation(positionAttribute)

    const vertices = [
      // x, y, z
      0, 0, 0, 0, 0.5, 0, 0.5, 0.5, 0,
    ]

    this._buffer.pushBackData(vertices)
    this._buffer.upload()
    this._buffer.unbind()
  }

  private loadShaders() {
    const vertexShaderSource = `
    attribute vec3 a_position;

    void main() {
      gl_Position = vec4(a_position, 1.0);
    }`

    const fragmentShaderSource = `
    precision mediump float;

    uniform vec4 u_color;

    void main() {
      gl_FragColor = u_color;
    }`

    this._shader = new Shader("basic", vertexShaderSource, fragmentShaderSource)
  }
}
