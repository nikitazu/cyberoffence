import * as three from 'three';

export default class {
  constructor (camera, model) {
    this.camera = camera;
    this.model = model;
  }

  render () {
    this.camera.position.x = this.model.position.x;
    this.camera.position.y = this.model.position.y;
    this.camera.position.z = this.model.position.z;
  }
}
