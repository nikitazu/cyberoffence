function app_damage_model() {
  this.items = [];
  this.garbageIndices = [];
}

function app_damage_model_item() {
  this.value = 10;
  this.isApplied = false;
  this.position = { x: 0, y: 0, z: 0 };
  this.frameIndex = 0;
  this.frameCount = 100;

  this.isDamagingFrame = function () {
    return this.frameIndex > 24 && this.frameIndex < 90;
  };
}
