function app_game_init(
    three
  , dom
  , mouse
  , shaderId
) {
  const jumping           = new app_mechanics_jumping();
  const movement          = new app_mechanics_movement();
  const fighterController = new app_fighter_controller(
    jumping
  , movement
  );
  let cube;
  let sprite;
  let ground;
  let ceiling;
  let wallA;
  let wallB;
  let wallFront;
  let fighterA;
  let fighterB;
  let uniforms;

  const textureLoader = new three.TextureLoader();

	function start(scene, camera) {
    
    uniforms = {
      resolution : {
        type  : 'v2'
      , value : new three.Vector2(
          dom.getWindowInnerWidth()
        , dom.getWindowInnerHeight()
        )
      }
    , ticks : {
        type  : 'f'
      , value : dom.getTicks()
      }
      , texture : {
          type  : 't'
        , value : undefined
      }
      , light : {
          type  : 'v3'
        , value : new three.Vector3(0.0, 0.0, 0.3)
      }
    };

    load_texture("images/morevna512.png");

    const fragShader = dom.getCodeById(shaderId);

    cube = make_cube();
    sprite = make_shaded_sprite(fragShader, uniforms);
    ground = make_ground();
    ceiling = make_ground();
    wallA = make_wall(0x664411);
    wallB = make_wall(0x664411);
    wallFront = make_wall(0x553300);
    fighterA = make_fighter();
    fighterB = make_fighter();
    
    scene.add(cube);
    scene.add(sprite);
    scene.add(ground);
    //scene.add(ceiling);
    //scene.add(wallA);
    //scene.add(wallB);
    //scene.add(wallFront);
    scene.add(fighterA.v.sprite);
    scene.add(fighterB.v.sprite);
    
    cube.position.z = -3;
    sprite.position.z = -20;
    ground.position.z = -7;
    ceiling.position.z = -7;
    wallA.position.z = -7;
    wallB.position.z = -7;
    wallFront.position.z = -11;
    fighterA.m.position.z = -19;
    fighterB.m.position.z = -19;
    
    ground.position.y = -5;
    ground.rotation.x = 3/2*Math.PI;
    ceiling.position.y = 5;
    ceiling.rotation.x = Math.PI/2;
    wallA.position.x = -5;
    wallA.rotation.y = Math.PI/2;
    wallB.position.x = 5;
    wallB.rotation.y = 3/2*Math.PI;
    fighterA.m.position.x = 5;
    fighterB.m.position.x = -5;

    dom.setOnMouseMove(function (event) {
      uniforms.light.value.x = event.clientX;
      uniforms.light.value.y = event.clientY;
      
      mouse.update(event.clientX, event.clientY);
      //const dx = mouse.getDx();
      //const dy = mouse.getDy();
      //const mouseSpeed = 0.001;
      //camera.rotation.y -= (dx * mouseSpeed);
      //camera.rotation.x -= (dy * mouseSpeed);
    });
    
    const key = {
      a: 65,
      d: 68,
      s: 83,
      w: 87
    };
    
    dom.setOnKey((event, isKeyDown) => {
      switch (event.which) {
      case key.a:
        fighterA.m.movementState = movement.move(
          fighterA.m.movementState
        , movement.key.backward
        , isKeyDown
        );
        break;
      case key.d:
        fighterA.m.movementState = movement.move(
          fighterA.m.movementState
        , movement.key.forward
        , isKeyDown
        );
        break;
      case key.s:
        // todo crouch
        break;
      case key.w:
        fighterA.m.jumpingState = jumping.jump(
          fighterA.m.jumpingState
        , jumping.key.jump
        , isKeyDown
        );
        //fighterController.jump(fighterA.m);
        break;
      }
    });
	}

	function render() {
    // update
    fighterController.update(fighterA.m);
    fighterController.update(fighterB.m);
    
    // render
    fighterController.render(fighterA.m, fighterA.v);
    fighterController.render(fighterB.m, fighterB.v);
    cube.rotation.x += 0.02;
    uniforms.resolution.value.x = dom.getWindowInnerWidth();
    uniforms.resolution.value.y = dom.getWindowInnerHeight();
    uniforms.ticks.value = dom.getTicks();
	};
  
  function make_cube() {
    return new three.Mesh(
      new three.BoxGeometry(.5, .5, .5),
      new three.MeshBasicMaterial({ color: 0x005500 })
    );
  }
  
  function make_shaded_sprite(shader, uniforms) {
    return new three.Mesh(
      new three.PlaneGeometry(50, 50),
      new three.ShaderMaterial({
        fragmentShader: shader
      , uniforms: uniforms
      })
    );
  }
  
  function make_ground() {
    return new three.Mesh(
      new three.PlaneGeometry(10, 10)
    , new three.MeshBasicMaterial({ color: 0x552200 })
    );
  }
  
  function make_wall(color) {
    return new three.Mesh(
      new three.PlaneGeometry(3, 7)
    , new three.MeshBasicMaterial({ color: color })
    );
  }
  
  function make_fighter() {
    const m = new app_fighter_model(
      jumping
    , movement
    );
    const v = new app_fighter_view(three);
    return { m:m, v:v };
  }
  
  function load_texture(url) {
    const done = texture => uniforms.texture.value = texture;
    const progress = xhr => console.log("txld: " + (xhr.loaded / xhr.total * 100) + "%");
    const error = xhr => console.log("txld: error");
    textureLoader.load(url, done, progress, error);
  }
	
	return {
	  start  : start
  , render : render
	};
}
