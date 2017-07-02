function app_fighter_controller() {
  this.render = function (model, view) {
    view.sprite.position.x = model.position.x;
    view.sprite.position.y = model.position.y;
    view.sprite.position.z = model.position.z;
  };
}
