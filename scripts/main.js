function main_init(
    three
  , dom
  , game
  ) {
  
	let scene;
	let camera;
	let renderer;

	scene_setup();
  game.start(scene, camera);
  render();
	
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
