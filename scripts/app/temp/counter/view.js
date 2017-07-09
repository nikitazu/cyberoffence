import * as three from 'three';
import TextureAnimator from 'app/utils/three/texture_animator.js';

export default class {
  constructor (model, textures) {
    this.model = model;
    
    const material = new three.MeshBasicMaterial({
      map: textures["images/counter_ss.png"]
    , color: 0xffffff
    });

    this.sprite = new three.Mesh(
      new three.PlaneGeometry(this.model.size.w, this.model.size.h)
    , material
    );

    this.animator = new TextureAnimator(
      textures["images/counter_ss.png"]
    , { frameCountX: 4
      , frameCountY: 4
      , startIndex: this.model.animation.start
      , frameCount: this.model.animation.count
      , frameDurationMs: this.model.animation.durationMs
      }
    );
  }

  render (timePassedMs) {
    const deltaY = 0;
    const deltaZ = 0;
    this.sprite.position.x = this.model.position.x;
    this.sprite.position.y = this.model.position.y + deltaY;
    this.sprite.position.z = this.model.position.z + deltaZ;
    this.animator.update(timePassedMs);
  }
}
