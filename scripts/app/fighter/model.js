import * as jumping from 'app/mechanics/jumping.js';
import * as movement from 'app/mechanics/movement.js';

export default class {
  constructor () {
    this.health = 100;
    this.position = { x: 0, y: 0, z: 0 };
    this.size = { w: 7, h: 7 };
    this.animation = {
      start: 0
    , count: 8
    , durationMs: 100
    };
    this.direction =  1; // 1 right, -1 left
    this.walkSpeed = 0.5;
    this.jumpSpeed = this.walkSpeed * 2;
    this.jumpLength = 10;
    this.jumpingState = jumping.State.idle;
    this.movementState = movement.State.idle;
  }
}
