import * as three from 'three';
import * as log from 'app/log.js';
import * as jumping from 'app/mechanics/jumping.js';
import * as movement from 'app/mechanics/movement.js';
import * as keyboard from 'app/keyboard.js';
import ArenaController from 'app/arena/controller.js';
import DamageController from 'app/damage/controller.js';
import FighterController from 'app/fighter/controller.js';
import CounterController from 'app/temp/counter/controller.js';
import CameraController from 'app/ui/camera/controller.js';
import HudController from 'app/ui/hud/controller.js';

export default function (
  dom
, mouse
) {
  const arenaController   = new ArenaController();
  const damageController  = new DamageController();
  const fighterController = new FighterController();
  const counterController = new CounterController();
  const cameraController  = new CameraController();
  const hudController     = new HudController();

  let cube;
  let sprite;

  let cam;
  let hudA;
  let hudB;
  let arena;
  let damageA;
  let damageB;
  let fighterA;
  let fighterB;
  
  let uniforms;
  
  let counter;

  function start(gameContext) {
    log.debug("game start");
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
      , value : gameContext.textures["images/bg_park_01.jpg"]
      }
    , light : {
        type  : 'v3'
      , value : new three.Vector3(0.0, 0.0, 0.3)
      }
    };

    const fragShader = dom.getCodeById("shader_07_lighting_fun");

    cube = make_cube();
    sprite = make_shaded_sprite(fragShader, uniforms);

    cam = cameraController.create(gameContext.camera);
    hudA = hudController.create(gameContext.camera, true);
    hudB = hudController.create(gameContext.camera, false)
    arena = arenaController.create(gameContext.scene);
    damageA = damageController.create();
    damageB = damageController.create();
    fighterA = fighterController.create(gameContext, true);
    fighterB = fighterController.create(gameContext, false);
    counter = counterController.create(gameContext);

    gameContext.scene.add(cube);
    gameContext.scene.add(sprite);
    
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

    dom.setOnKey((event, isKeyDown) => {
      switch (event.which) {

      case keyboard.Key.a:
        fighterA.model.movementState = movement.move(
          fighterA.model.movementState
        , movement.Key.backward
        , isKeyDown
        );
        break;
      case keyboard.Key.d:
        fighterA.model.movementState = movement.move(
          fighterA.model.movementState
        , movement.Key.forward
        , isKeyDown
        );
        break;
      case keyboard.Key.s:
        // todo crouch
        break;
      case keyboard.Key.w:
        fighterA.model.jumpingState = jumping.jump(
          fighterA.model.jumpingState
        , jumping.Key.jump
        , isKeyDown
        );
        break;
      case keyboard.Key.f:
        if (isKeyDown) {
          damageController.createItem(gameContext.scene, damageA, fighterA);
        }
        break;

      case keyboard.Key.left:
        fighterB.model.movementState = movement.move(
          fighterB.model.movementState
        , movement.Key.backward
        , isKeyDown
        );
        break;
      case keyboard.Key.right:
        fighterB.model.movementState = movement.move(
          fighterB.model.movementState
        , movement.Key.forward
        , isKeyDown
        );
        break;
      case keyboard.Key.down:
        // todo crouch
        break;
      case keyboard.Key.up:
        fighterB.model.jumpingState = jumping.jump(
          fighterB.model.jumpingState
        , jumping.Key.jump
        , isKeyDown
        );
        break;
      case keyboard.Key.n0:
        if (isKeyDown) {
          damageController.createItem(gameContext.scene, damageB, fighterB);
        }
        break;

      default:
        log.debug("KEY " + event.which);
      }
    });
	}

	function render(gameContext) {
    gameContext.update();
    // update
    try
    {
      hudController.update(hudA.model);
      hudController.update(hudB.model);
      arenaController.update(arena.model);
      damageController.update(damageA.model);
      damageController.update(damageB.model);
      fighterController.update(fighterA.model, damageB.model);
      fighterController.update(fighterB.model, damageA.model);
      counterController.update(counter.model);
      cameraController.update(
        cam.model
      , fighterA.model.position
      , fighterB.model.position
      );
    } catch (e) {
      log.error(`game.render (update) error: ${e}`);
      throw e;
    }

    // cleanUp
    try
    {
      damageController.cleanUp(gameContext.scene, damageA);
      damageController.cleanUp(gameContext.scene, damageB);
    } catch (e) {
      log.error(`game.render (cleanUp) error: ${e}`);
      throw e;
    }

    // render
    try
    {
      cameraController.render(cam);
      hudController.render(hudA);
      hudController.render(hudB);
      arenaController.render(arena);
      damageController.render(damageA);
      damageController.render(damageB);
      fighterController.render(fighterA);
      fighterController.render(fighterB);
      counterController.render(counter, gameContext);
    } catch (e) {
      log.error(`game.render (render) error: ${e}`);
      throw e;
    }

    cube.rotation.x += 0.02;
    uniforms.resolution.value.x = dom.getWindowInnerWidth();
    uniforms.resolution.value.y = dom.getWindowInnerHeight();
    uniforms.ticks.value = dom.getTicks();

    uniforms.light.value.x = (
      uniforms.resolution.value.x/2
      + uniforms.resolution.value.x
      * gameContext.camera.position.x
      / 50
    );

    uniforms.light.value.y = (
      uniforms.resolution.value.y/2
      + uniforms.resolution.value.y 
      * -gameContext.camera.position.y
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
      new three.PlaneGeometry(100, 100),
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
      "images/dummy_stand_01.png"
    , "images/bg_park_01.jpg"
    , "images/counter_ss.png"
    ]
	};
}
