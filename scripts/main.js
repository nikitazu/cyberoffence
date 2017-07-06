import * as three from 'lib/three.js-r84/build/three.min.js';
import * as dom from 'app/dom.js';
import * as mouse from 'app/mouse.js';
import TextureLoader from 'app/texture_loader.js';
import game_init from 'app/game.js';

function main_init() {
  const game = game_init(dom, mouse);

  let scene;
  let camera;
  let renderer;

  const textureLoader = new TextureLoader(game.textures);
  textureLoader.handleLoad(
    textures => {
      scene_setup();
      game.start(scene, camera, textures);
      render();
    },
    () => {
      console.log("load failure");
    }
  );

  function scene_setup() {
    //This is all code needed to set up a basic ThreeJS scene
    //First we initialize the scene and our camera
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
    game.render(scene, camera);
    requestAnimationFrame( render );
    renderer.render( scene, camera );
  }
}

main_init();
