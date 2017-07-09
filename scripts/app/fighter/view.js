import * as three from 'three';
import TextureAnimator from 'app/utils/three/texture_animator.js';
import TextureOffsetMap from 'app/utils/texture_offset_map.js';

export default class {
  constructor (model, gameContext) {
    this.model = model;
    this.gameContext = gameContext;

    const material = new three.MeshBasicMaterial({
      map: gameContext.textures["images/dummy2_stand_ss.png"]
    , color: 0xffffff
    });

    material.transparent = true;

    this.sprite = new three.Mesh(
      new three.PlaneGeometry(this.model.size.w, this.model.size.h)
    , material
    );

    this.animator = new TextureAnimator(
      gameContext.textures["images/dummy2_stand_ss.png"]
    , new TextureOffsetMap(
        { frameCountX: 4
        , frameCountY: 4
        , startIndex: this.model.animation.start
        , frameCount: this.model.animation.count
        , frameDurationMs: this.model.animation.durationMs
        }
      )
    );
  }

  render () {
    const deltaY = -3;
    const deltaZ = -10;
    this.sprite.position.x = this.model.position.x;
    this.sprite.position.y = this.model.position.y + deltaY;
    this.sprite.position.z = this.model.position.z + deltaZ;
    this.animator.update(this.gameContext.timePassedMs);
  }
}
