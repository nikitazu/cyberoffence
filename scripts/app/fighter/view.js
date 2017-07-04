function app_fighter_view(
  three
, model
, textures
) {
  this.model = model;

  const material = new three.MeshBasicMaterial({
    map: textures["images/dummy_stand_01.png"]
  , color: 0xffffff
  });
  
  material.transparent = true;

  this.sprite = new three.Mesh(
    new three.PlaneGeometry(7, 7)
  , material
  );

  this.render = function () {
    const deltaY = -1;
    const deltaZ = -10;
    this.sprite.position.x = this.model.position.x;
    this.sprite.position.y = this.model.position.y + deltaY;
    this.sprite.position.z = this.model.position.z + deltaZ;
  };
}
