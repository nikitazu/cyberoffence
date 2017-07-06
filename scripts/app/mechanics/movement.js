export const State = {
  idle: 0
, forward: 1
, backward: 2
};

export const Key = {
  forward: 0
, backward: 1
};

export function move (state, key, isKeyDown) {
  switch (state) {
  case State.idle:
    if (key === Key.forward && isKeyDown) {
      return State.forward;
    } else if (key === Key.backward && isKeyDown) {
      return State.backward;
    } else {
      return state;
    }
  case State.forward:
    if (key === Key.forward && !isKeyDown) {
      return State.idle;
    } else if (key === Key.backward && isKeyDown) {
      return State.backward;
    } else {
      return state;
    }
  case State.backward:
    if (key === Key.backward && !isKeyDown) {
      return State.idle;
    } else if (key === Key.forward && isKeyDown) {
      return State.forward;
    } else {
      return state;
    }
  default:
    throw "Unknown state " + state;
  }
}

export function stateToSpeed (state) {
  switch (state) {
  case State.idle: return 0;
  case State.forward: return 1;
  case State.backward: return -1;
  default: throw "Unknown state " + state;
  }
}
