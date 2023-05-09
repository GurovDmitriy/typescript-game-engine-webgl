import { gl } from "./GLUtilities"

/**
 * Represents of WebGL shader
 */
export class Shader {
  private readonly _name: string
  private _program: WebGLProgram

  /**
   * Creates a new shader
   * @param name - the name of this shader
   * @param vertexSource - the source of the vertex shader
   * @param fragmentSource - the source of the fragment shader
   */
  public constructor(
    name: string,
    vertexSource: string,
    fragmentSource: string
  ) {
    this._name = name

    const vertexShader = this.load(vertexSource, gl.VERTEX_SHADER)
    const fragmentShader = this.load(fragmentSource, gl.FRAGMENT_SHADER)

    this.create(vertexShader, fragmentShader)
  }

  /**
   * Name of this shader
   */
  public get name() {
    return this._name
  }

  /**
   * Use this shader
   */
  public use() {
    gl.useProgram(this._program)
  }

  /**
   * Load shader method
   * @param source - source
   * @param type - type shader
   * @private
   */
  private load(source: string, type: number): WebGLShader {
    const shader: WebGLShader = gl.createShader(type)

    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    const error = gl.getShaderInfoLog(shader)
    if (error !== "") {
      throw Error(`Error compiler shader ${this._name}: ${error}`)
    }

    return shader
  }

  private create(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    this._program = gl.createProgram()

    gl.attachShader(this._program, vertexShader)
    gl.attachShader(this._program, fragmentShader)

    gl.linkProgram(this._program)

    const error = gl.getProgramInfoLog(this._program)
    if (error !== "") {
      throw Error(`Error linking shader ${this._name}: ${error}`)
    }
  }
}
