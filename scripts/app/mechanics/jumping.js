export default function () {
  this.state = {
    idle: 0,
    riseUp: 1,
    fallDown: 2
  };
  
  this.key = {
    jump: 0
  };
  
  this.jump = function (state, key, isKeyDown) {
    switch (state) {
    case this.state.idle:
      if (key === this.key.jump && isKeyDown) {
        return this.state.riseUp;
      } else {
        return state;
      }
    case this.state.riseUp:
      return state;
    case this.state.fallDown:
      return state;
    default:
      throw "Unknown state " + state;
    }
  };
  
  this.fly = function (state, height, maxHeight) {
    const onePixel = 1;
    switch (state) {
    case this.state.idle:
      return state;
    case this.state.riseUp:
      if (maxHeight - height > onePixel) {
        return this.state.riseUp;
      } else {
        return this.state.fallDown;
      }
    case this.state.fallDown:
      if (height > 0) {
        return this.state.fallDown;
      } else {
        return this.state.idle;
      }
    default:
      throw "Unknown state " + state;
    }
  };
  
  this.stateToSpeed = function (state) {
    switch (state) {
    case this.state.idle: return 0;
    case this.state.riseUp: return 1;
    case this.state.fallDown: return -1;
    default: throw "Unknown state " + state;
    }
  };
}
