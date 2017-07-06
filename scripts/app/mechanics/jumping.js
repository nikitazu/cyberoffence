export const State = {
  idle: 0
, riseUp: 1
, fallDown: 2
};

export const Key = {
  jump: 0
};

export function jump (state, key, isKeyDown) {
  switch (state) {
  case State.idle:
    if (key === Key.jump && isKeyDown) {
      return State.riseUp;
    } else {
      return state;
    }
  case State.riseUp:
    return state;
  case State.fallDown:
    return state;
  default:
    throw "Unknown state " + state;
  }
}

export function fly (state, height, maxHeight) {
  const onePixel = 1;
  switch (state) {
  case State.idle:
    return state;
  case State.riseUp:
    if (maxHeight - height > onePixel) {
      return State.riseUp;
    } else {
      return State.fallDown;
    }
  case State.fallDown:
    if (height > 0) {
      return State.fallDown;
    } else {
      return State.idle;
    }
  default:
    throw "Unknown state " + state;
  }
}

export function stateToSpeed (state) {
  switch (state) {
  case State.idle: return 0;
  case State.riseUp: return 1;
  case State.fallDown: return -1;
  default: throw "Unknown state " + state;
  }
}
