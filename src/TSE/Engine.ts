/**
 * The main game engine class
 */
export class Engine {
  private _count = 0

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
    this.loop()
  }

  private loop() {
    this._count += 1

    document.title = this._count.toString()

    requestAnimationFrame(this.loop.bind(this))
  }
}
