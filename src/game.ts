import {
  Scene,
  SpriteManager,
  Mesh,
  StandardMaterial,
  Color3,
  CubeTexture,
  Sound,
  Sprite,
} from "babylonjs";
import fighterPNG from "./assets/images/fighter.png";
import fireWAV from "./assets/sounds/fire.wav";
import entryMP3 from "./assets/sounds/entry.mp3";
import * as GUI from "babylonjs-gui";

export function init(scene: Scene) {
  // main object holders
  const enemies = [];
  const bullets = [];
  const enemyBullets = [];
  const player = 0;
  const remainingEnemies = 0;

  // main objects sprites managers
  const spriteManagerPlayer = new SpriteManager(
    "playerManager",
    fighterPNG,
    1,
    710,
    scene
  );

  //create the scene environment skybox
  const skybox = Mesh.CreateBox("skyBox", 100.0, scene);
  const skyboxMaterial = new StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.disableLighting = true;
  skybox.material = skyboxMaterial;
  skybox.infiniteDistance = true;
  skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
  skyboxMaterial.specularColor = new Color3(0, 0, 0);
  skyboxMaterial.reflectionTexture = new CubeTexture("space/space", scene);
  skyboxMaterial.reflectionTexture.coordinatesMode =
    BABYLON.Texture.SKYBOX_MODE;

  // load sounds
  const bulletSound = new Sound("Music", fireWAV, scene, null, {
    loop: false,
    autoplay: false,
  });
  const enemyBulletSound = new Sound("Music", "enemyBullet.mp3", scene, null, {
    loop: false,
    autoplay: false,
  });
  const missileLaunhSound = new Sound("Music2", "launch.mp3", scene, null, {
    loop: false,
    autoplay: false,
  });
  const explosionSound = new Sound("Music3", "explosion.mp3", scene, null, {
    loop: false,
    autoplay: false,
  });
  const explosion1Sound = new Sound("Music4", "explosion1.mp3", scene, null, {
    loop: false,
    autoplay: false,
  });
  const level1Sound = new Sound("m1", "level1.mp3", scene, null, {
    loop: true,
    autoplay: false,
  });
  const level2Sound = new Sound("m2", "level2.mp3", scene, null, {
    loop: true,
    autoplay: false,
  });
  const level3Sound = new Sound("m3", "level3.mp3", scene, null, {
    loop: true,
    autoplay: false,
  });
  const level5Sound = new Sound("m6", "level5.mp3", scene, null, {
    loop: true,
    autoplay: false,
  });
  const winSound = new Sound("m5", "win.mp3", scene, null, {
    loop: true,
    autoplay: false,
  });
  const loseSound = new Sound("m7", "lose.mp3", scene, null, {
    loop: true,
    autoplay: false,
  });

  // levels settings
  const settings = [
    {
      images: [
        { url: "e3.png", size: 397 },
        { url: "e4.png", size: 248 },
      ],
      counts: [7, 6],
      size: 1.5,
      x: [-7, -6.5],
      y: [3, 1],
      w: 1,
      h: 1,
      health: 100,
      missiles: 1,
      exp: 2,
      theme: level1Sound,
      bulletSpeed: 100,
      attackers: 4,
      attackInterval: 1400,
      attacks: [1],
      pHealth: 100,
    },
    {
      images: [
        { url: "e1.png", size: 348 },
        { url: "e2.png", size: 291 },
      ],
      counts: [7, 6],
      size: 1.5,
      x: [-7, -6.5],
      y: [3, 1],
      w: 1,
      h: 1,
      health: 150,
      missiles: 2,
      exp: 2,
      theme: level2Sound,
      bulletSpeed: 80,
      attackers: 4,
      attackInterval: 1200,
      attacks: [1],
      pHealth: 100,
    },
    {
      images: [{ url: "e5.png", size: 1024 }],
      counts: [4],
      size: 6,
      x: [-7],
      y: [1],
      w: 2,
      h: 2,
      health: 250,
      missiles: 4,
      exp: 4,
      theme: level3Sound,
      bulletSpeed: 50,
      attackers: 4,
      attackInterval: 900,
      attacks: [0.85, 0.15],
      pHealth: 300,
    },
    {
      images: [
        { url: "e6.png", size: 986 },
        { url: "e7.png", size: 986 },
      ],
      counts: [1, 1],
      size: 12,
      x: [-2, 2.5],
      y: [2.3, -0.2],
      w: 12,
      h: 2,
      health: 600,
      missiles: 5,
      exp: 6,
      theme: level5Sound,
      bulletSpeed: 50,
      attackers: 2,
      attackInterval: 200,
      attacks: [0.75, 0.25],
      pHealth: 300,
    },
  ];
}

function createPlayer(spriteManagerPlayer: SpriteManager) {
  const player = new Sprite("player", spriteManagerPlayer);
  player.stopAnimation(); // Not animated
  player.cellIndex = 0; // Going to frame number 2
  player.position.y = -3;
  player.position.x = 0;
  player.size = 1.5;
  // player.w = 1;
  // player.h = 1;
  // player.nextX = 0;
  // player.nextY = -3;
  // player.missiles = 3;
  // player.health = 100;
}

export function startScreen(scene: Scene) {
  var scenario =
    "In the year 3048, the general commander\nof the Galactic Armed Forces Reiner Skywalker\nexterminated all Congress members and killed\nthe supreme chancellor of the Galaxy\naccusing terrorists of his act.\nMashal laws were forced and days after days\nthe people's freedom has been taken away\nfrom them. Shortly Skywalker turned the Galactic\nRepublic into Galactic Empire and declared himself\nthe Empror. Through 20 years he ruled the galaxy\nby an iron fist and killed tens of millions of souls\nof those who oposed him. Now you are the\nlast hope of the Galaxy,\nobliterate Skywalker's armies and\nbring justice back to the Galaxy.";

  type Entry = {};
  const entry: Entry = {};
  // var entry = new ScreenSpaceCanvas2D(scene, {
  //   id: "ScreenCanvas1",
  //   size: new BABYLON.Size(800, 500),
  //   backgroundFill: "#4040408F",
  //   backgroundRoundRadius: 50,
  //   children: [
  //     new BABYLON.Text2D(scenario, {
  //       id: "text1",
  //       marginAlignment: "h: center, v: center",
  //       fontName: "20pt Arial",
  //       defaultFontColor: new BABYLON.Color4(1, 1, 0, 1),
  //     }),
  //   ],
  // });
  // entry.position.x = 550;
  // entry.position.y = -500;

  const themeSound = new Sound("Music0", entryMP3, scene, null, {
    loop: true,
    autoplay: true,
  });

  return [entry, themeSound];
}

function endGame(i, themeSound: Sound) {
  var scenarios = [
    "You have freed the Galaxy! Skywalker is dead\nLong Live the Republic!!",
    "You have lost the war! Skywalker will continue\nhis ruthless rule over the galaxy!!",
  ];

  // play again button
  // var playAgain = new GUI.Button("button");
  // playAgain.width = 160;
  // playAgain.height = 60;
  // playAgain.color = "#40C040FF";
  // roundRadius: 10,
  // marginAlignment: "h: center, v: center",
  // children: [
  //   new BABYLON.Text2D("Play Again", {
  //     fontName: "20pt Arial",
  //     marginAlignment: "h: center, v: center",
  //   }),
  // ],

  // playAgain.pointerEventObservable.add(function (d, s) {
  //   clearScreen();
  //   entry.dispose();
  //   player.dispose();
  //   themeSound.stop();
  //   createPlayer();
  //   createLevel(0);
  // }, BABYLON.PrimitivePointerInfo.PointerUp);

  // var entry = new BABYLON.ScreenSpaceCanvas2D(scene, {
  //   id: "ScreenCanvas2",
  //   size: new BABYLON.Size(850, 100),
  //   backgroundFill: "#4040408F",
  //   backgroundRoundRadius: 50,
  //   children: [
  //     new BABYLON.Text2D(scenarios[i], {
  //       id: "text2",
  //       width: 400,
  //       marginAlignment: "h: left, v: center",
  //       marginLeft: 50,
  //       fontName: "20pt Arial",
  //       defaultFontColor: new BABYLON.Color4(1, 1, 0, 1),
  //     }),

  //     playAgain,
  //   ],
  // });

  // entry.position.x = 550;
  // entry.position.y = 450;

  themeSound.stop();
  if (i == 0) themeSound = winSound;
  else themeSound = loseSound;
  themeSound.play();
}

function clearScreen() {
  window.removeEventListener("keydown", registerKey);
  window.removeEventListener("keyup", registerKey);

  for (var i = 0; i < enemies.length; i++) enemies[i].dispose();

  for (var i = 0; i < bullets.length; i++) bullets[i].dispose();

  for (var i = 0; i < enemyBullets.length; i++) enemyBullets[i].dispose();
}
