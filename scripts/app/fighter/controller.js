function app_fighter_controller(
    three
  , jumping
  , movement
  , textures
) {
  this.create = function (scene, isFirst) {
    const fighter = make_fighter_view();
    scene.add(fighter.sprite);
    fighter.model.position.x = isFirst ? -5 : 5;
    return fighter;
  };
  
  function make_fighter_view() {
    return new app_fighter_view(three, make_fighter_model(), textures);
  }
  
  function make_fighter_model() {
    return new app_fighter_model(jumping, movement);
  }

  this.update = function (model, damage) {
    damage.items.forEach(d => {
      if (!d.isApplied && d.isDamagingFrame()) {
        const x1 = d.position.x;
        const y1 = d.position.y;
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
          model.health -= d.value;
          d.isApplied = true;
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
