import * as three from 'three';

export default class {
  constructor(
    texture
  , { frameCountX
    , frameCountY
    , startIndex
    , frameCount
    , frameDurationMs
    }
  ) {
    this.texture = texture;
    this.frameCountX = frameCountX;
    this.frameCountY = frameCountY;
    this.startIndex = startIndex;
    this.frameCount = startIndex + frameCount;
    this.frameDurationMs = frameDurationMs;
    this.currentTimeMs = 0;
    this.currentFrameIndex = startIndex;

    this.deltaOffsetX = 1 / frameCountX;
    this.deltaOffsetY = 1 / frameCountY;

    this.texture.wrapS = three.RepeatWrapping;
    this.texture.wrapT = three.RepeatWrapping;
    this.texture.repeat.set(this.deltaOffsetX, this.deltaOffsetY);

    this.offsetCache = this._createOffsetCache();
    this._updateOffset(this.currentFrameIndex);
  }

  update (timePassedMs) {
    this.currentTimeMs += timePassedMs;
    while (this.currentTimeMs > this.frameDurationMs) {
      this.currentTimeMs -= this.frameDurationMs;
      this.currentFrameIndex++;
      if (this.currentFrameIndex === this.frameCount) {
        this.currentFrameIndex = this.startIndex;
      }
    }
    this._updateOffset(this.currentFrameIndex);
  }

  _updateOffset(i) {
    const offset = this.offsetCache[this.currentFrameIndex];
    this.texture.offset.x = offset.x;
    this.texture.offset.y = offset.y;
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
