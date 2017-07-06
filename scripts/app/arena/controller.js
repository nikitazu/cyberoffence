import ArenaView from 'app/arena/view.js';
import ArenaModel from 'app/arena/model.js';

export default class {
  create (scene) {
    const arena = new ArenaView(new ArenaModel());
    scene.add(arena.sprite);
    arena.model.position.z = -7;
    arena.model.position.y = -5;
    arena.model.rotation.x = 3/2*Math.PI;
    return arena;
  }

  update (model) {
    // todo
  }

  render (view) {
    view.render();
  }
}
