import * as three from 'three';

export default class {
  constructor (model, gameContext) {
    this.model = model;

    const material = new three.MeshBasicMaterial({
      map: gameContext.textures["images/dummy_stand_01.png"]
    , color: 0xffffff
    });

    material.transparent = true;

    this.sprite = new three.Mesh(
      new three.PlaneGeometry(this.model.size.w, this.model.size.h)
    , material
    );
  }

  render () {
    const deltaY = -3;
    const deltaZ = -10;
    this.sprite.position.x = this.model.position.x;
    this.sprite.position.y = this.model.position.y + deltaY;
    this.sprite.position.z = this.model.position.z + deltaZ;
  }
}
