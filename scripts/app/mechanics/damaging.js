import * as geometry from 'app/mechanics/geometry.js';

export function isHit(fighter, damage) {
  return !damage.isApplied
    && damage.isDamagingFrame()
    && geometry.rectangleIntersects(
      damage.position.x
    , damage.position.y
    , damage.size.w
    , damage.size.h
    , fighter.position.x
    , fighter.position.y
    , fighter.size.w
    , fighter.size.h
    );
}
