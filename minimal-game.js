const playerShapeBasic = function(parent) {
  translate(parent.pos.x, parent.pos.y);
  rotate(parent.dir);

  stroke(100);
  fill(parent.color[0]);
  triangle(-20, 20, -20, -20, 40, 0);
  ellipse(0, 0, 24, 18);
  quad(-15, 15, -10, 10, -15, 5, -30, 10);
  quad(-15, -15, -10, -10, -15, -5, -30, -10);

  rotate(-parent.dir);
  translate(-parent.pos.x, -parent.pos.y);
};
const playerShapeHero = function(parent) {
  translate(parent.pos.x, parent.pos.y);
  rotate(parent.dir);

  stroke(100);
  fill(parent.color[1]);
  quad(-15, 15, -25, 25, -35, 15, -20, 10);
  quad(-15, -15, -25, -25, -35, -15, -20, -10);
  fill(parent.color[0]);
  quad(40, 0, -5, -20, -25, 0, -5, 20);
  quad(20, 0, 0, -10, -35, 0, 0, 10);

  rotate(-parent.dir);
  translate(-parent.pos.x, -parent.pos.y);
};
const bulletShapeBasic = function(x, y, dir, color) {
  noStroke();
  fill(color);
  ellipse(x, y, 4, 4);
};
const shotTwinMachineGun = function(parent) {
  parent.bullets.push(
    new Bullet(
      parent.pos.x + cos(parent.dir) * 24 - sin(parent.dir) * 10,
      parent.pos.y + sin(parent.dir) * 24 + cos(parent.dir) * 10,
      parent.dir - PI / 4,
      10,
      10,
      bulletShapeBasic,
      parent.color[parent.color.length - 1]
    )
  );
  parent.bullets.push(
    new Bullet(
      parent.pos.x + cos(parent.dir) * 24 - sin(parent.dir) * -10,
      parent.pos.y + sin(parent.dir) * 24 + cos(parent.dir) * -10,
      parent.dir - PI / 4,
      10,
      10,
      bulletShapeBasic,
      parent.color[parent.color.length - 1]
    )
  );
};
class Player {
  constructor(
    position = { x: 0, y: 0 },
    shape = playerShapeHero,
    bullet = shotTwinMachineGun,
    color = ["rgb(255, 255, 255)", "rgb(0, 0, 255)"]
  ) {
    this.pos = position;
    this.dir = 0;
    this.drawShape = shape;
    this.shotBullet = bullet;
    this.color = color;
    this.bullets = [];
  }
  draw() {
    this.drawShape(this);
    // console.log(this.color[0]);
    // console.log(this.color[1]);
    noFill();
    rect(this.pos.x - 40, this.pos.y - 40, 80, 80);
  }
  update() {
    this.dir = getDir(this.pos, { x: mouseX, y: mouseY });
    this.move();
  }
  move() {
    if (keyIsDown(65)) {
      this.pos.x -= 5;
    }

    if (keyIsDown(68)) {
      this.pos.x += 5;
    }

    if (keyIsDown(87)) {
      this.pos.y -= 5;
    }

    if (keyIsDown(83)) {
      this.pos.y += 5;
    }
  }
  shot() {
    // console.log(this.color[this.color.length - 1]);
    this.shotBullet(this);
  }
}

class Bullet {
  constructor(x, y, direction, velocity, damage, shape, color, option = null) {
    this.x = x;
    this.y = y;
    this.dir = direction;
    this.damage = damage;
    this.velocity = velocity;
    this.size = shape.size;
    this.drawShape = shape;
    this.color = color;
    this.option = option;
    this.killed = false;
  }
  update() {
    this.x += (+cos(this.dir) - sin(this.dir)) * this.velocity;
    this.y += (+sin(this.dir) + cos(this.dir)) * this.velocity;
    if (this.x <= -40 || this.x >= 840 || this.y <= -40 || this.y >= 640) {
      this.killed = true;
    }
  }
  draw() {
    this.drawShape(this.x, this.y, 0, this.color);
  }
}

class Enemy {
  constructor(
    x = 0,
    y = 0,
    dir = 0,
    shape = playerShapeBasic,
    type = [
      10,
      null,
      [
        this.x + cos(this.dir) * -10 - sin(this.dir) * -24,
        this.y + sin(this.dir) * -10 + cos(this.dir) * -24,
        this.dir - (3 * PI) / 4,
        10,
        10,
        bulletShapeBasic,
        this.subColor
      ]
    ]
  ) {}
}
var typeformat = [playerShapeHero, 255, 255];
function getDir(pos1 = { x: 0, y: 0 }, pos2 = { x: 0, y: 0 }) {
  return atan2(pos2.y - pos1.y, pos2.x - pos1.x);
}

var player = new Player(
  { x: 100, y: 500 },
  playerShapeBasic,
  shotTwinMachineGun,
  ["rgb(255, 255, 255)", "rgb(0, 100, 200)"]
);
function setup() {
  //キャンパスサイズの指定
  let canvas = createCanvas(800, 600);
  //idがscreenのオブジェクトにキャンパスを描画、右クリックの禁止
  canvas.parent("screen");
  (function(screen = document.getElementById("screen")) {
    screen.addEventListener(
      "contextmenu",
      function(i) {
        i.preventDefault();
      },
      false
    );
  })();
  //背景色、FPSの設定
  background(0, 0, 0);
  frameRate(60);
}
function draw() {
  fill(255);
  rect(30, 30, 740, 540);
  player.update();
  player.shot();
  player.draw();

  player.bullets = player.bullets.filter(function(pb) {
    return !pb.killed;
  });
  for (var pb of player.bullets) {
    pb.update();
    pb.draw();
  }
  fill(0);
  textSize(32);
  text(player.bullets.length, 80, 80);
}
