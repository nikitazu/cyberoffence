import { DamageView, DamageItemView } from './view.js';
import { DamageModel, DamageItemModel } from './model.js';

export default class {
  create () {
    return new DamageView(new DamageModel());
  }

  createItem (scene, damage, fighter) {
    const item = new DamageItemView(new DamageItemModel());
    item.model.position.x = fighter.model.position.x + 1;
    item.model.position.y = fighter.model.position.y;
    item.model.position.z = fighter.model.position.z;
    scene.add(item.sprite);
    damage.model.items.push(item.model);
    damage.items.push(item);
  }

  update (model) {
    model.items.forEach((x, i) => {
      if (x.frameIndex < x.frameCount) {
        x.frameIndex += 1;
      } else {
        model.garbageIndices.push(i);
      }
    });
  }

  cleanUp (scene, view) {
    view.model.garbageIndices.forEach(i => {
      scene.remove(view.items[i].sprite);
      view.model.items.splice(i, 1);
      view.items.splice(i, 1);
    });
    view.model.garbageIndices = [];
  }

  render (view) {
    view.render();
  }
}
