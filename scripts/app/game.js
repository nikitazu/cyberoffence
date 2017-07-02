function app_game_init(
    three
  , dom
  , mouse
  , shaderId
) {
  const jumping           = new app_mechanics_jumping();
  const movement          = new app_mechanics_movement();
  
  const arenaController   = new app_arena_controller(three);
  const attackController  = new app_attack_controller(three);
  const fighterController = new app_fighter_controller(
    jumping
  , movement
  );
  
  // Heads-Up Display
  const hudController     = new app_ui_hud_controller();
  
  let cube;
  let sprite;
  
  let hudA;
  let hudB;
  let arena;
  let attacks;
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
    
    hudA = make_hud();
    hudB = make_hud();
    arena = arenaController.create(scene);
    attacks = make_attacks();
    fighterA = make_fighter();
    fighterB = make_fighter();

    scene.add(cube);
    scene.add(sprite);

    camera.add(hudA.v.sprite);
    camera.add(hudB.v.sprite);
    scene.add(fighterA.v.sprite);
    scene.add(fighterB.v.sprite);
    
    cube.position.z = -3;
    sprite.position.z = -20;
    
    hudA.m.position.x = -.7;
    hudB.m.position.x = 0.7;

    fighterA.m.position.x = -5;
    fighterB.m.position.x = 5;

    dom.setOnMouseMove(function (event) {
      uniforms.light.value.x = event.clientX;
      uniforms.light.value.y = event.clientY;

      //mouse.update(event.clientX, event.clientY);
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
      w: 87,
      f: 70,
      
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      n0: 48
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
        break;
      case key.f:
        if (isKeyDown) {
          attackController.create(scene, attacks, fighterA);
        }
        break;
        
      case key.left:
        fighterB.m.movementState = movement.move(
          fighterB.m.movementState
        , movement.key.backward
        , isKeyDown
        );
        break;
      case key.right:
        fighterB.m.movementState = movement.move(
          fighterB.m.movementState
        , movement.key.forward
        , isKeyDown
        );
        break;
      case key.down:
        // todo crouch
        break;
      case key.up:
        fighterB.m.jumpingState = jumping.jump(
          fighterB.m.jumpingState
        , jumping.key.jump
        , isKeyDown
        );
        break;
      case key.n0:
        if (isKeyDown) {
          attackController.create(scene, attacks, fighterB);
        }
        break;
        
      default:
        console.log("KEY " + event.which);
      }
    });
	}

	function render(scene, camera) {
    // update
    hudController.update(hudA.m);
    hudController.update(hudB.m);
    arenaController.update(arena.model);
    attackController.update(attacks.model);
    fighterController.update(fighterA.m);
    fighterController.update(fighterB.m);
    
    // cleanUp
    attackController.cleanUp(scene, attacks);
    
    // render
    hudController.render(hudA.m, hudA.v);
    hudController.render(hudB.m, hudB.v);
    arenaController.render(arena);
    attackController.render(attacks);
    fighterController.render(fighterA.m, fighterA.v);
    fighterController.render(fighterB.m, fighterB.v);
    
    // camera
    camera.position.x = (
      fighterA.v.sprite.position.x
    + fighterB.v.sprite.position.x
    ) / 2;
    
    const deltaX = Math.abs(
      fighterA.v.sprite.position.x - fighterB.v.sprite.position.x
    );
    const deltaY = Math.abs(
      fighterA.v.sprite.position.y - fighterB.v.sprite.position.y
    );
    
    camera.position.z = deltaX / 10;
    camera.position.y = deltaY / 5;
    
    cube.rotation.x += 0.02;
    uniforms.resolution.value.x = dom.getWindowInnerWidth();
    uniforms.resolution.value.y = dom.getWindowInnerHeight();
    uniforms.ticks.value = dom.getTicks();
    
    uniforms.light.value.x = (
      uniforms.resolution.value.x/2
      + uniforms.resolution.value.x
      * camera.position.x
      / 50
    );
    
    uniforms.light.value.y = (
      uniforms.resolution.value.y/2
      + uniforms.resolution.value.y 
      * -camera.position.y
      / 2
    );
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
  
  function make_hud() {
    return {
      m: new app_ui_hud_model()
    , v: new app_ui_hud_view(three)
    };
  }
  
  function make_attacks() {
    return new app_attack_view(
      three
    , new app_attack_model()
    );
  }

  function make_fighter() {
    return {
      m: new app_fighter_model(
        jumping
      , movement
      )
    , v: new app_fighter_view(three)
    };
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
