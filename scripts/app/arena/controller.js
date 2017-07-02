function app_arena_controller(
  three
) {
  this.create = function (scene) {
    const arena = new app_arena_view(
      three
    , new app_arena_model()
    );
    scene.add(arena.sprite);
    arena.model.position.z = -7;
    arena.model.position.y = -5;
    arena.model.rotation.x = 3/2*Math.PI;
    return arena;
  };

  this.update = function (model) {
    // todo
  };
  
  this.render = function (view) {
    view.render();
  };
}
