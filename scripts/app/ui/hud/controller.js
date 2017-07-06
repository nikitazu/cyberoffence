import HudView from './view.js';
import HudModel from './model.js';

export default class {
  create (camera, isFirst) {
    const hud = new HudView(new HudModel());
    camera.add(hud.sprite);
    hud.model.position.x = isFirst ? -.7 : .7;
    return hud;
  }

  update (model) {
    // todo
  }

  render (view) {
    view.render();
  }
}
