function app_damage_controller(
    three
) {
  this.create = function () {
    return new app_damage_view(
      three
    , new app_damage_model()
    );
  };
  
  this.createItem = function (scene, damage, fighter) {
    const item = new app_damage_view_item(
      three
    , new app_damage_model_item()
    );
    item.model.position.x = fighter.model.position.x + 1;
    item.model.position.y = fighter.model.position.y;
    item.model.position.z = fighter.model.position.z;
    scene.add(item.sprite);
    damage.model.items.push(item.model);
    damage.items.push(item);
  };
  
  this.update = function (model) {
    model.items.forEach((x, i) => {
      if (x.frameIndex < x.frameCount) {
        x.frameIndex += 1;
      } else {
        model.garbageIndices.push(i);
      }
    });
  };
  
  this.cleanUp = function (scene, view) {
    view.model.garbageIndices.forEach(i => {
      scene.remove(view.items[i].sprite);
      view.model.items.splice(i, 1);
      view.items.splice(i, 1);
    });
    view.model.garbageIndices = [];
  };
  
  this.render = function (view) {
    view.render();
  };
}
