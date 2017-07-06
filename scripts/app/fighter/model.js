import * as jumping from '../mechanics/jumping.js';
import * as movement from '../mechanics/movement.js';

export default class {
  constructor () {
    this.health = 100;
    this.position = { x: 0, y: 0, z: 0 };
    this.direction =  1; // 1 right, -1 left
    this.walkSpeed = 0.5;
    this.jumpSpeed = this.walkSpeed * 2;
    this.jumpLength = 10;
    this.jumpingState = jumping.State.idle;
    this.movementState = movement.State.idle;
  }
}
