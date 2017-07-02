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

  this.update = function (model) {
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
