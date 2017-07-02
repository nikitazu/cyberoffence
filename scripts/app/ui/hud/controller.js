function app_ui_hud_controller() {
  this.update = function (model) {
    // todo
  };
  
  this.render = function (model, view) {
    const deltaY = .7;
    const deltaZ = -1;
    view.sprite.position.x = model.position.x;
    view.sprite.position.y = model.position.y + deltaY;
    view.sprite.position.z = model.position.z + deltaZ;
  };
}
