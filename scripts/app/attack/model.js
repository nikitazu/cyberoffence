function app_attack_model() {
  this.attacks = [];
  this.garbageIndices = [];
}

function app_attack_model_item() {
  this.damage = 10;
  this.position = { x: 0, y: 0, z: 0 };
  this.frameIndex = 0;
  this.frameCount = 100;
}