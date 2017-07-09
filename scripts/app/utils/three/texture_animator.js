import * as three from 'three';

export default class {
  constructor(texture, offsetMap) {
    this.texture = texture;
    this.offsetMap = offsetMap;
    this.currentTimeMs = 0;
    this.currentFrameIndex = offsetMap.startIndex;

    this.texture.wrapS = three.RepeatWrapping;
    this.texture.wrapT = three.RepeatWrapping;
    this.texture.repeat.set(
      this.offsetMap.deltaOffsetX
    , this.offsetMap.deltaOffsetY
    );

    this._updateOffset(this.currentFrameIndex);
  }

  update (timePassedMs) {
    this.currentTimeMs += timePassedMs;
    while (this.currentTimeMs > this.offsetMap.frameDurationMs) {
      this.currentTimeMs -= this.offsetMap.frameDurationMs;
      this.currentFrameIndex = this.offsetMap
        .getNextFrameIndex(this.currentFrameIndex);
    }
    this._updateOffset(this.currentFrameIndex);
  }

  _updateOffset(i) {
    const offset = this.offsetMap.getTextureOffset(this.currentFrameIndex);
    this.texture.offset.x = offset.x;
    this.texture.offset.y = offset.y;
  }
}
