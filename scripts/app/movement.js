function app_movement() {
  this.state = {
    idle: 0,
    forward: 1,
    backward: 2
  };
  
  this.key = {
    forwardDown: 0,
    forwardUp: 1,
    backwardDown: 2,
    backwardUp: 3
  };
  
  this.move = function (state, key) {
    switch (state) {
    case this.state.idle:
      if (key === this.key.forwardDown) {
        return this.state.forward;
      } else if (key === this.key.backwardDown) {
        return this.state.backward;
      } else {
        return state;
      }
    case this.state.forward:
      if (key === this.key.forwardUp) {
        return this.state.idle;
      } else if (key === this.key.backwardDown) {
        return this.state.backward;
      } else {
        return state;
      }
    case this.state.backward:
      if (key === this.key.backwardUp) {
        return this.state.idle;
      } else if (key === this.key.forwardDown) {
        return this.state.forward;
      } else {
        return state;
      }
    default:
      throw "Unknown state " + state;
    }
  };
  
  this.stateToSpeed = function (state) {
    switch (state) {
    case this.state.idle: return 0;
    case this.state.forward: return 1;
    case this.state.backward: return -1;
    default: throw "Unknown state " + state;
    }
  };
}
