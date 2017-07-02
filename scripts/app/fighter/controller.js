function app_fighter_controller(
    jumping
  , movement
) {
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
  
  this.render = function (model, view) {
    view.sprite.position.x = model.position.x;
    view.sprite.position.y = model.position.y;
    view.sprite.position.z = model.position.z;
  };
}
