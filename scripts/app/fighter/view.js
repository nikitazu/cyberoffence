function app_fighter_view(
    three
  , model
) {
  this.model = model;
  this.sprite = new three.Mesh(
    new three.PlaneGeometry(3, 7)
  , new three.MeshBasicMaterial({ color: 0x552200 })
  );

  this.render = function () {
    const deltaY = -1;
    const deltaZ = -10;
    this.sprite.position.x = this.model.position.x;
    this.sprite.position.y = this.model.position.y + deltaY;
    this.sprite.position.z = this.model.position.z + deltaZ;
  };
}
