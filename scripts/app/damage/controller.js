import { DamageView, DamageItemView } from 'app/damage/view.js';
import { DamageModel, DamageItemModel } from 'app/damage/model.js';

export default class {
  constructor(gameContext) {
    this.gameContext = gameContext;
  }

  create () {
    return new DamageView(new DamageModel());
  }

  createItem (damage, fighter) {
    const item = new DamageItemView(new DamageItemModel());
    item.model.position.x = fighter.model.position.x + 1;
    item.model.position.y = fighter.model.position.y;
    item.model.position.z = fighter.model.position.z;
    this.gameContext.scene.add(item.sprite);
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

  cleanUp (view) {
    view.model.garbageIndices.forEach(i => {
      this.gameContext.scene.remove(view.items[i].sprite);
      view.model.items.splice(i, 1);
      view.items.splice(i, 1);
    });
    view.model.garbageIndices = [];
  }

  render (view) {
    view.render();
  }
}
