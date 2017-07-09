import HudView from 'app/ui/hud/view.js';
import HudModel from 'app/ui/hud//model.js';

export default class {
  constructor(gameContext) {
    this.gameContext = gameContext;
  }

  create (isFirst) {
    const hud = new HudView(new HudModel());
    this.gameContext.camera.add(hud.sprite);
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
