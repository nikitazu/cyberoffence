function app_fighter_controller(movement) {
  this.update = function (model) {
    model.position.x += (model.walkSpeed * movement.stateToSpeed(model.movementState));
    
    if (model.jumpStatus === 1 && model.position.y < model.jumpLength) {
      model.position.y += model.walkSpeed;
    } else if (model.jumpStatus === 1) {
      model.position.y = model.jumpLength;
      model.jumpStatus = -1;
    } else if (model.jumpStatus === -1 && model.position.y > 0) {
      model.position.y -= model.walkSpeed;
    } else if (model.jumpStatus === -1) {
      model.position.y = 0;
      model.jumpStatus = 0;
    }
  };
  
  this.render = function (model, view) {
    view.sprite.position.x = model.position.x;
    view.sprite.position.y = model.position.y;
    view.sprite.position.z = model.position.z;
  };

  this.jump = function (model) {
    if (model.jumpStatus === 0) {
      model.jumpStatus = 1;
    }
  };
}
