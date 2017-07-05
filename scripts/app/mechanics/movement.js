export default class {
  constructor() {
    this.state = {
      idle: 0,
      forward: 1,
      backward: 2
    };

    this.key = {
      forward: 0,
      backward: 1
    };
  }

  move (state, key, isKeyDown) {
    switch (state) {
    case this.state.idle:
      if (key === this.key.forward && isKeyDown) {
        return this.state.forward;
      } else if (key === this.key.backward && isKeyDown) {
        return this.state.backward;
      } else {
        return state;
      }
    case this.state.forward:
      if (key === this.key.forward && !isKeyDown) {
        return this.state.idle;
      } else if (key === this.key.backward && isKeyDown) {
        return this.state.backward;
      } else {
        return state;
      }
    case this.state.backward:
      if (key === this.key.backward && !isKeyDown) {
        return this.state.idle;
      } else if (key === this.key.forward && isKeyDown) {
        return this.state.forward;
      } else {
        return state;
      }
    default:
      throw "Unknown state " + state;
    }
  }

  stateToSpeed (state) {
    switch (state) {
    case this.state.idle: return 0;
    case this.state.forward: return 1;
    case this.state.backward: return -1;
    default: throw "Unknown state " + state;
    }
  }
}
