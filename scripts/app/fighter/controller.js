import * as log from 'app/log.js';
import * as damaging from 'app/mechanics/damaging.js';
import * as jumping from 'app/mechanics/jumping.js';
import * as movement from 'app/mechanics/movement.js';
import FighterView from 'app/fighter/view.js';
import FighterModel from 'app/fighter/model.js';

export default class {
  create (scene, textures, isFirst) {
    const fighter = new FighterView(new FighterModel(), textures);
    scene.add(fighter.sprite);
    fighter.model.position.x = isFirst ? -5 : 5;
    return fighter;
  }

  update (model, damage) {
    damage.items.forEach(d => {
      if (damaging.isHit(model, d)) {
        model.health -= d.value;
        d.isApplied = true;
        log.debug("hit! " + model.health);
      }
    });

    model.position.x += (
      model.walkSpeed * movement.stateToSpeed(model.movementState)
    );

    model.jumpingState = jumping.fly(
      model.jumpingState
    , model.position.y
    , model.jumpLength
    );

    model.position.y += (
      model.jumpSpeed * jumping.stateToSpeed(model.jumpingState)
      * ((model.jumpLength - model.position.y)/model.jumpLength)
    );

    if (model.position.y < 0) {
      model.position.y = 0;
    } else if (model.position.y > model.jumpLength) {
      model.position.y = model.jumpLength;
    }
  }

  render (view) {
    view.render();
  }
}
