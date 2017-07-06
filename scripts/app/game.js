import * as three from '../lib/three.js-r84/build/three.min.js';
import Jumping from './mechanics/jumping.js';
import Movement from './mechanics/movement.js';
import ArenaController from './arena/controller.js';

export default function (
  dom
, mouse
) {
  const jumping   = new Jumping();
  const movement  = new Movement();

  const arenaController   = new ArenaController();
  const damageController  = new app_damage_controller(three);
  let fighterController;

  // Heads-Up Display
  const hudController     = new app_ui_hud_controller(three);
  
  let cube;
  let sprite;
  
  let hudA;
  let hudB;
  let arena;
  let damageA;
  let damageB;
  let fighterA;
  let fighterB;
  
  let uniforms;

  function start(scene, camera, textures) {
    fighterController = new app_fighter_controller(
      three
    , jumping
    , movement
    , textures
    );

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
      , value : textures["images/morevna512.png"]
      }
    , light : {
        type  : 'v3'
      , value : new three.Vector3(0.0, 0.0, 0.3)
      }
    };

    const fragShader = dom.getCodeById("shader_07_lighting_fun");

    cube = make_cube();
    sprite = make_shaded_sprite(fragShader, uniforms);
    
    hudA = hudController.create(camera, true);
    hudB = hudController.create(camera, false)
    arena = arenaController.create(scene);
    damageA = damageController.create();
    damageB = damageController.create();
    fighterA = fighterController.create(scene, true);
    fighterB = fighterController.create(scene, false);

    scene.add(cube);
    scene.add(sprite);
    
    cube.position.z = -3;
    sprite.position.z = -20;

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
        fighterA.model.movementState = movement.move(
          fighterA.model.movementState
        , movement.key.backward
        , isKeyDown
        );
        break;
      case key.d:
        fighterA.model.movementState = movement.move(
          fighterA.model.movementState
        , movement.key.forward
        , isKeyDown
        );
        break;
      case key.s:
        // todo crouch
        break;
      case key.w:
        fighterA.model.jumpingState = jumping.jump(
          fighterA.model.jumpingState
        , jumping.key.jump
        , isKeyDown
        );
        break;
      case key.f:
        if (isKeyDown) {
          damageController.createItem(scene, damageA, fighterA);
        }
        break;

      case key.left:
        fighterB.model.movementState = movement.move(
          fighterB.model.movementState
        , movement.key.backward
        , isKeyDown
        );
        break;
      case key.right:
        fighterB.model.movementState = movement.move(
          fighterB.model.movementState
        , movement.key.forward
        , isKeyDown
        );
        break;
      case key.down:
        // todo crouch
        break;
      case key.up:
        fighterB.model.jumpingState = jumping.jump(
          fighterB.model.jumpingState
        , jumping.key.jump
        , isKeyDown
        );
        break;
      case key.n0:
        if (isKeyDown) {
          damageController.createItem(scene, damageB, fighterB);
        }
        break;

      default:
        console.log("KEY " + event.which);
      }
    });
	}

	function render(scene, camera) {
    // update
    hudController.update(hudA.model);
    hudController.update(hudB.model);
    arenaController.update(arena.model);
    damageController.update(damageA.model);
    damageController.update(damageB.model);
    fighterController.update(fighterA.model, damageB.model);
    fighterController.update(fighterB.model, damageA.model);

    // cleanUp
    damageController.cleanUp(scene, damageA);
    damageController.cleanUp(scene, damageB);

    // render
    hudController.render(hudA);
    hudController.render(hudB);
    arenaController.render(arena);
    damageController.render(damageA);
    damageController.render(damageB);
    fighterController.render(fighterA);
    fighterController.render(fighterB);

    // camera
    camera.position.x = (
      fighterA.sprite.position.x
    + fighterB.sprite.position.x
    ) / 2;

    const deltaX = Math.abs(
      fighterA.sprite.position.x - fighterB.sprite.position.x
    );
    const deltaY = Math.abs(
      fighterA.sprite.position.y - fighterB.sprite.position.y
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

	return {
	  start     : start
  , render    : render
  , textures  : [
      "images/morevna512.png"
    , "images/dummy_stand_01.png"
    ]
	};
}
