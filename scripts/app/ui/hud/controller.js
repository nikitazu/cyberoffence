function app_ui_hud_controller(
  three
) {
  this.create = function (camera, isFirst) {
    const hud = new app_ui_hud_view(
      three
    , new app_ui_hud_model()
    );
    camera.add(hud.sprite);
    hud.model.position.x = isFirst ? -.7 : .7;
    return hud;
  }
  
  this.update = function (model) {
    // todo
  };
  
  this.render = function (view) {
    view.render();
  };
}
