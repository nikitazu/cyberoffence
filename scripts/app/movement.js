function app_movement() {
  const stateIdle = 0;
  const stateForward = 1;
  const stateBackward = 2;
  
  const keyForwardDown = 0;
  const keyForwardUp = 1;
  const keyBackwardDown = 2;
  const keyBackwardUp = 3;
  
  this.move = function (state, key) {
    switch (state) {
    case stateIdle:
      if (key === keyForwardDown) {
        return stateForward;
      } else if (key === keyBackwardDown) {
        return stateBackward;
      } else {
        return state;
      }
    case stateForward:
      if (key === keyForwardUp) {
        return stateIdle;
      } else if (key === keyBackwardDown) {
        return stateBackward;
      } else {
        return state;
      }
    case stateBackward:
      if (key === keyBackwardUp) {
        return stateIdle;
      } else if (key === keyForwardDown) {
        return stateForward;
      } else {
        return state;
      }
    default:
      throw "Unknown state " + state;
    }
  };
  
  this.stateToSpeed = function (state) {
    switch (state) {
    case stateIdle:
      return 0;
    case stateForward:
      return 1;
    case stateBackward:
      return -1;
    default:
      throw "Unknown state " + state;
    }
  };
}
