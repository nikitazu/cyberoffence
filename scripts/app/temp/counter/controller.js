import CounterView from 'app/temp/counter/view.js';
import CounterModel from 'app/temp/counter/model.js';

export default class {
  create (scene, textures) {
    const counter = new CounterView(new CounterModel(), textures);
    scene.add(counter.sprite);
    counter.model.position.z = -20;
    counter.model.position.y = 6;
    return counter;
  }

  update (model) {
    // todo
  }

  render (view, timePassedMs) {
    view.render(timePassedMs);
  }
}
