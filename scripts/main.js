import * as three from 'three';
import * as dom from 'app/dom.js';
import * as log from 'app/log.js';
import * as mouse from 'app/mouse.js';
import TextureLoader from 'app/texture_loader.js';
import game_init from 'app/game.js';

function main_init() {
  log.debug('main init');
  const game = game_init(dom, mouse);

  let clock;
  let scene;
  let camera;
  let renderer;

  const textureLoader = new TextureLoader(game.textures);
  textureLoader.handleLoad(
    textures => {
      try
      {
        scene_setup();
        game.start(clock, scene, camera, textures);
        render();
      } catch (e) {
        log.error("ERROR:", "startup", e);
      }
    },
    () => {
      log.error("load failure");
    }
  );

  function scene_setup() {
    //This is all code needed to set up a basic ThreeJS scene
    //First we initialize the scene and our camera
    clock = new three.Clock();
    scene = new three.Scene();
    camera = new three.PerspectiveCamera(
      75
    , dom.getWindowAspectRatio()
    , 0.1
    , 1000
    );
    scene.add(camera);
    //We create the WebGL renderer and add it to the document
    renderer = new three.WebGLRenderer();
    renderer.setSize(
      dom.getWindowInnerWidth()
    , dom.getWindowInnerHeight()
    );
    dom.documentAppend(renderer.domElement);
  }

  function render() {
    game.render(clock, scene, camera);
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
  log.debug('main init done');
}

try
{
  main_init();
} catch (e) {
  log.error("ERROR:", "main_init", e);
}
