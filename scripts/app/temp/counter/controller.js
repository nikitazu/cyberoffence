import CounterView from 'app/temp/counter/view.js';
import CounterModel from 'app/temp/counter/model.js';

export default class {
  constructor(gameContext) {
    this.gameContext = gameContext;
  }

  create () {
    const counter = new CounterView(new CounterModel(), this.gameContext);
    this.gameContext.scene.add(counter.sprite);
    counter.model.position.z = -20;
    counter.model.position.y = 6;
    return counter;
  }

  update (model) {
    // todo
  }

  render (view) {
    view.render(this.gameContext);
  }
}
