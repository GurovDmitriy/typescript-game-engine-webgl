import { gl } from "./GLUtilities"

/**
 * Represents of WebGL shader
 */
export class Shader {
  private readonly _name: string
  private _program: WebGLProgram
  private _attributes: { [name: string]: number } = {}
  private _uniforms: { [name: string]: WebGLUniformLocation } = {}

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
    this.detectAttributes()
    this.detectUniforms()
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
   * Get the location of an attribute with the provided name
   * @param name - The name of the attribute whose location to retrieve
   */
  public getAttributeLocation(name: string): number {
    if (this._attributes[name] === undefined) {
      throw Error(
        `Unable to find attribute name ${name} in shader named ${this._name}`
      )
    }

    return this._attributes[name]
  }

  /**
   * Get the location of an uniform with the provided name
   * @param name - The name of the attribute whose location to retrieve
   */
  public getUniformLocation(name: string): WebGLUniformLocation {
    if (this._uniforms[name] === undefined) {
      throw Error(
        `Unable to find uniform name ${name} in shader named ${this._name}`
      )
    }

    return this._uniforms[name]
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

  private detectAttributes() {
    const attributeCount = gl.getProgramParameter(
      this._program,
      gl.ACTIVE_ATTRIBUTES
    )

    for (let i = 0; i < attributeCount; i++) {
      const attributeInfo: WebGLActiveInfo = gl.getActiveAttrib(
        this._program,
        i
      )

      if (!attributeInfo) {
        break
      }

      this._attributes[attributeInfo.name] = gl.getAttribLocation(
        this._program,
        attributeInfo.name
      )
    }
  }

  private detectUniforms(): void {
    const uniformCount = gl.getProgramParameter(
      this._program,
      gl.ACTIVE_UNIFORMS
    )

    for (let i = 0; i < uniformCount; i++) {
      const info: WebGLActiveInfo = gl.getActiveUniform(this._program, i)

      if (!info) {
        break
      }

      this._uniforms[info.name] = gl.getUniformLocation(
        this._program,
        info.name
      )
    }
  }
}
