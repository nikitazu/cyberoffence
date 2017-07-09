export class DamageModel {
  constructor() {
    this.items = [];
    this.garbageIndices = [];
  }
}

export class DamageItemModel {
  constructor() {
    this.value = 10;
    this.isApplied = false;
    this.position = { x: 0, y: 0, z: 0 };
    this.size = { w: 1, h: 1 };
    this.frameIndex = 0;
    this.frameCount = 100;
  }

  isDamagingFrame () {
    return this.frameIndex > 24 && this.frameIndex < 90;
  }
}
