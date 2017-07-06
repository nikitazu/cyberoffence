export default class {
  constructor (three, model) {
    this.three = three;
    this.model = model;
    this.sprite = this._make_ground();
  }

  render () {
    this.sprite.position.x = this.model.position.x;
    this.sprite.position.y = this.model.position.y;
    this.sprite.position.z = this.model.position.z;
    this.sprite.rotation.x = this.model.rotation.x;
    this.sprite.rotation.y = this.model.rotation.y;
    this.sprite.rotation.z = this.model.rotation.z;
  }

  _make_ground () {
    return new this.three.Mesh(
      new this.three.PlaneGeometry(30, 10)
    , new this.three.MeshBasicMaterial({ color: 0x302000 })
    );
  }
}
