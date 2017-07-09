import * as geometry from 'app/mechanics/geometry.js';

export function isHit(fighter, damage) {
  const damageWidth = 1;
  const damageHeight = 1;
  const fighterWidth = 3;
  const fighterHeight = 7;
  return !damage.isApplied
    && damage.isDamagingFrame()
    && geometry.rectangleIntersects(
      damage.position.x
    , damage.position.y
    , damageWidth
    , damageHeight
    , fighter.position.x
    , fighter.position.y
    , fighterWidth
    , fighterHeight
    );
}
