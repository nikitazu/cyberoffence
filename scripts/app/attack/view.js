function app_attack_view(
    three
  , model
) {
  this.model = model;
  this.attacks = [];

  this.render = function () {
    this.attacks.forEach(attack => attack.render());
  };
}

function app_attack_view_item(
    three
  , model
) {
  this.model = model;
  this.sprite = new three.Mesh(
    new three.PlaneGeometry(1, 1)
  , new three.MeshBasicMaterial({ color: 0x101000 })
  );

  this.render = function () {
    const deltaY = -1;
    const deltaZ = -10;
    
    this.sprite.position.x = this.model.position.x;
    this.sprite.position.y = this.model.position.y + deltaY;
    this.sprite.position.z = this.model.position.z + deltaZ;
    
    if (this.model.frameIndex > 90) {
      this.sprite.material.color.setHex(0x101000);
    } else if (this.model.frameIndex > 50) {
      this.sprite.material.color.setHex(0xff0000);
    } else if (this.model.frameIndex > 24) {
      this.sprite.material.color.setHex(0xffffff);
    }
  };
}
