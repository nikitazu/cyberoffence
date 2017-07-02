function app_arena_controller() {
  this.update = function (model) {
    // todo
  };
  
  this.render = function (model, view) {
    view.sprite.position.x = model.position.x;
    view.sprite.position.y = model.position.y;
    view.sprite.position.z = model.position.z;
    view.sprite.rotation.x = model.rotation.x;
    view.sprite.rotation.y = model.rotation.y;
    view.sprite.rotation.z = model.rotation.z;
  };
}
