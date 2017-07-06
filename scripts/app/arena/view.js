import * as three from 'lib/three.js-r84/build/three.min.js';

export default class {
  constructor (model) {
    this.model = model;
    this.sprite = this._make_ground();
  }

  render () {
    const deltaY = -2;
    const deltaZ = 0;
    this.sprite.position.x = this.model.position.x;
    this.sprite.position.y = this.model.position.y + deltaY;
    this.sprite.position.z = this.model.position.z + deltaZ;
    this.sprite.rotation.x = this.model.rotation.x;
    this.sprite.rotation.y = this.model.rotation.y;
    this.sprite.rotation.z = this.model.rotation.z;
  }

  _make_ground () {
    return new three.Mesh(
      new three.PlaneGeometry(100, 10)
    , new three.MeshBasicMaterial({ color: 0x302000 })
    );
  }
}
