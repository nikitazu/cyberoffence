function app_fighter_model() {
  this.health = 100;
  this.position = { x: 0, y: 0, z: 0 };
  this.direction =  1; // 1 right, -1 left
  this.walkSpeed = 0.5;
  this.jumpStatus = 0; // 0 ground, 1 rise, -1 fall
  this.jumpLength = 10;
}
