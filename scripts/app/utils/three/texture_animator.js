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
    this.texture.offset.x = this._offsetX;
    this.texture.offset.y = this._offsetY;
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
    this.texture.offset.x = this._offsetX;
    this.texture.offset.y = this._offsetY;
  }
  
  get _offsetX() {
    return this.deltaOffsetX * (this.currentFrameIndex % this.frameCountX);
  }
  
  get _offsetY() {
    return this.deltaOffsetY
    * (this.frameCountY - 1 - Math.floor(this.currentFrameIndex / this.frameCountX));
  }
}
