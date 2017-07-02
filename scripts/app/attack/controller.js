function app_attack_controller() {
  this.update = function (model) {
    model.attacks.forEach((attack, i) => {
      if (attack.frameIndex < attack.frameCount) {
        attack.frameIndex += 1;
      } else {
        model.garbageIndices.push(i);
      }
    });
  };
  
  this.cleanUp = function (scene, model, view) {
    model.garbageIndices.forEach(i => {
      scene.remove(view.attacks[i].sprite);
      model.attacks.splice(i, 1);
      view.attacks.splice(i, 1);
    });
    model.garbageIndices = [];
  };
  
  this.render = function (model, view) {
    const deltaY = -1;
    const deltaZ = -10;
    view.attacks.forEach((attack, i) => {
      const m = model.attacks[i];
      attack.sprite.position.x = m.position.x;
      attack.sprite.position.y = m.position.y + deltaY;
      attack.sprite.position.z = m.position.z + deltaZ;
      if (m.frameIndex > 90) {
        attack.sprite.material.color.setHex(0x101000);
      } else if (m.frameIndex > 50) {
        attack.sprite.material.color.setHex(0xff0000);
      } else if (m.frameIndex > 24) {
        attack.sprite.material.color.setHex(0xffffff);
      }
    });
  };
}
