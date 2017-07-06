import CameraView from 'app/ui/camera/view.js';
import CameraModel from 'app/ui/camera//model.js';

export default class {
  create (camera) {
    return new CameraView(camera, new CameraModel());
  }

  update (model, posA, posB) {
    model.position.x = (posA.x + posB.x) / 2;

    const deltaX = Math.abs(posA.x - posB.x);
    const deltaY = Math.abs(posA.y - posB.y);

    model.position.z = deltaX / 10;
    model.position.y = deltaY / 5;
  }

  render (view) {
    view.render();
  }
}
