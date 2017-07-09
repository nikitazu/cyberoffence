import * as three from 'three';

export class DamageView {
  constructor (model) {
    this.model = model;
    this.items = [];
  }

  render () {
    this.items.forEach(x => x.render());
  }
}

export class DamageItemView {
  constructor (model) {
    this.model = model;
    this.sprite = new three.Mesh(
      new three.PlaneGeometry(this.model.size.w, this.model.size.h)
      , new three.MeshBasicMaterial({ color: 0x101000 })
    );
  }

  render () {
    const deltaY = -1;
    const deltaZ = -9;
    
    this.sprite.position.x = this.model.position.x;
    this.sprite.position.y = this.model.position.y + deltaY;
    this.sprite.position.z = this.model.position.z + deltaZ;
    
    if (this.model.frameIndex > 90) {
      this.sprite.material.color.setHex(0x101000);
    } else if (this.model.frameIndex > 50) {
      this.sprite.material.color.setHex(0xff0000);
    } else if (this.model.frameIndex > 24) {
      this.sprite.material.color.setHex(0xffffff);
    }
  }
}
