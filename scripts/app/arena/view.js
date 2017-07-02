function app_arena_view(
    three
  , model
) {
  this.model = model;
  this.sprite = make_ground();

  this.render = function () {
    this.sprite.position.x = this.model.position.x;
    this.sprite.position.y = this.model.position.y;
    this.sprite.position.z = this.model.position.z;
    this.sprite.rotation.x = this.model.rotation.x;
    this.sprite.rotation.y = this.model.rotation.y;
    this.sprite.rotation.z = this.model.rotation.z;
  };

  function make_ground() {
    return new three.Mesh(
      new three.PlaneGeometry(30, 10)
    , new three.MeshBasicMaterial({ color: 0x302000 })
    );
  }
}
