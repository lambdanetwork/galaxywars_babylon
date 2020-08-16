import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
  FreeCamera,
} from "babylonjs";

import { SampleMaterial } from "./Materials/SampleMaterial";
import { init } from "./game";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const engine = new Engine(canvas, true);

const scene = new Scene(engine);

const camera = new FreeCamera("camera1", new Vector3(0, 0, -10), scene);
camera.setTarget(Vector3.Zero());

// camera.attachControl(canvas);

const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

const mesh = MeshBuilder.CreateGround("mesh", {}, scene);

const material = new SampleMaterial("material", scene);
mesh.material = material;

//TODO
init();

const entry = startScreen();

function escapeEntry(event) {
  console.log(event.keyCode);
  if (event.keyCode == 27) startGame();
}

// register keypress action for escaping entry
window.addEventListener("keydown", escapeEntry);

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});

function startGame() {
  // remove entry screen
  entry.dispose();

  // create the player
  createPlayer();

  // create level one
  createLevel(0);

  // remove escape entry handler
  window.removeEventListener("keydown", escapeEntry);

  // register keydown
  window.addEventListener("keydown", stopFighter);

  // player movement
  scene.beforeRender = function () {
    movePlayerSprite();
  };

  // remove the entry screen timer
  clearInterval(startTimer);
}

var t = 0;
var startTimer = setInterval(function () {
  entry.position.y += 2;
  t += 100;
  if (t == 60000) {
    startGame();
  }
}, 100);
