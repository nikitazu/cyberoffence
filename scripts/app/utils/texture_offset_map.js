export default class {
  constructor(
    { frameCountX
    , frameCountY
    , startIndex
    , frameCount
    , frameDurationMs
    }
  ) {
    this.frameCountX = frameCountX;
    this.frameCountY = frameCountY;
    this.startIndex = startIndex;
    this.frameCount = startIndex + frameCount;
    this.frameDurationMs = frameDurationMs;

    this.deltaOffsetX = 1 / frameCountX;
    this.deltaOffsetY = 1 / frameCountY;

    this.offsetCache = this._createOffsetCache();
  }

  getTextureOffset (frameIndex) {
    return this.offsetCache[frameIndex];
  }

  getNextFrameIndex (frameIndex) {
    let i = frameIndex + 1;
    if (i === this.frameCount) {
      i = this.startIndex;
    }
    return i;
  }

  _createOffsetCache() {
    const cache = [];
    for (let i = this.startIndex; i < this.frameCount; i++) {
      cache[i] = {
        x: this._offsetX(i)
      , y: this._offsetY(i)
      };
    }
    return cache;
  }

  _offsetX(i) {
    return this.deltaOffsetX * (i % this.frameCountX);
  }

  _offsetY(i) {
    return this.deltaOffsetY
    * (this.frameCountY - 1 - Math.floor(i / this.frameCountX));
  }
}
