function app_fighter_controller(
    three
  , jumping
  , movement
) {
  this.create = function (scene, isFirst) {
    const fighter = new app_fighter_view(
      three
    , new app_fighter_model(
        jumping
      , movement
      )
    );
    scene.add(fighter.sprite);
    fighter.model.position.x = isFirst ? -5 : 5;
    return fighter;
  };

  this.update = function (model, attacks) {
    attacks.attacks.forEach(attack => {
      if (!attack.damageApplied && attack.isDamagingFrame()) {
        const x1 = attack.position.x;
        const y1 = attack.position.y;
        const w1 = 1;
        const h1 = 1;

        const x2 = model.position.x;
        const y2 = model.position.y;
        const w2 = 3;
        const h2 = 7;

        const isMissed =
           (x1 + w1 < x2)
        || (x2 + w2 < x1)
        || (y1 + h1 < y2)
        || (y2 + h2 < y1);

        if (!isMissed) {
          model.health -= attack.damage;
          attack.damageApplied = true;
          console.log("hit! " + model.health);
        }
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
  };
  
  this.render = function (view) {
    view.render();
  };
}
