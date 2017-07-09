export default class {
  constructor(values) {
    this.clock    = this._get(values, 'clock');
    this.camera   = this._get(values, 'camera');
    this.scene    = this._get(values, 'scene');
    this.textures = this._get(values, 'textures');

    this.timePassedMs = 0;
  }

  update() {
    this.timePassedMs = this.clock.getDelta() * 1000;
  }

  _get(values, key) {
    const value = values[key];
    if (typeof value === "undefined") {
      throw Error(`game_context check failed, missing value under key: ${key}`);
    }
    return value;
  }
}
