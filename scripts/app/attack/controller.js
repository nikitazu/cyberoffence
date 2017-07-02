function app_attack_controller(
    three
) {
  this.create = function (scene, attacks, fighter) {
    const attack = make_attack_item();
    attack.model.position.x = fighter.model.position.x + 1;
    attack.model.position.y = fighter.model.position.y;
    attack.model.position.z = fighter.model.position.z;
    scene.add(attack.sprite);
    attacks.model.attacks.push(attack.model);
    attacks.attacks.push(attack);
  };
  
  this.update = function (model) {
    model.attacks.forEach((attack, i) => {
      if (attack.frameIndex < attack.frameCount) {
        attack.frameIndex += 1;
      } else {
        model.garbageIndices.push(i);
      }
    });
  };
  
  this.cleanUp = function (scene, view) {
    view.model.garbageIndices.forEach(i => {
      scene.remove(view.attacks[i].sprite);
      view.model.attacks.splice(i, 1);
      view.attacks.splice(i, 1);
    });
    view.model.garbageIndices = [];
  };
  
  this.render = function (view) {
    view.render();
  };
  
  
  function make_attack_item() {
    return new app_attack_view_item(
      three
    , new app_attack_model_item()
    );
  }
}
