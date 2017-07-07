import * as three from 'three';
export default class {
  constructor (model) {
    this.model = model;
    this.sprite = this._make_healthbar();
  }

  render () {
    const deltaY = .7;
    const deltaZ = -1;
    this.sprite.position.x = this.model.position.x;
    this.sprite.position.y = this.model.position.y + deltaY;
    this.sprite.position.z = this.model.position.z + deltaZ;
  }

  _make_healthbar () {
    return new three.Mesh(
      new three.PlaneGeometry(1, .02)
    , new three.MeshBasicMaterial({ color: 0xAA2000 })
    );
  }
}
