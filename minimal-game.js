const playerShapeBasic = function(parent) {
  stroke(1);
  fill(parent.color[0]);
  triangle(
    parent.x + cos(parent.dir) * -20 - sin(parent.dir) * 20,
    parent.y + sin(parent.dir) * -20 + cos(parent.dir) * 20,
    parent.x + cos(parent.dir) * 20 - sin(parent.dir) * 20,
    parent.y + sin(parent.dir) * 20 + cos(parent.dir) * 20,
    parent.x + cos(parent.dir) * 0 - sin(parent.dir) * -40,
    parent.y + sin(parent.dir) * 0 + cos(parent.dir) * -40
  );
  ellipse(
    parent.x,
    parent.y,
    cos(parent.dir) * 18 - sin(parent.dir) * 24,
    sin(parent.dir) * 18 + cos(parent.dir) * 24
  );
  console.log("Hello,World!");
  quad(
    parent.x + cos(parent.dir) * -15 - sin(parent.dir) * 15,
    parent.y + sin(parent.dir) * -15 + cos(parent.dir) * 15,
    parent.x + cos(parent.dir) * -10 - sin(parent.dir) * 10,
    parent.y + sin(parent.dir) * -10 + cos(parent.dir) * 10,
    parent.x + cos(parent.dir) * -5 - sin(parent.dir) * 15,
    parent.y + sin(parent.dir) * -5 + cos(parent.dir) * 15,
    parent.x + cos(parent.dir) * -10 - sin(parent.dir) * 30,
    parent.y + sin(parent.dir) * -10 + cos(parent.dir) * 30
  );
  quad(
    parent.x + cos(parent.dir) * 15 - sin(parent.dir) * 15,
    parent.y + sin(parent.dir) * 15 + cos(parent.dir) * 15,
    parent.x + cos(parent.dir) * 10 - sin(parent.dir) * 10,
    parent.y + sin(parent.dir) * 10 + cos(parent.dir) * 10,
    parent.x + cos(parent.dir) * 5 - sin(parent.dir) * 15,
    parent.y + sin(parent.dir) * 5 + cos(parent.dir) * 15,
    parent.x + cos(parent.dir) * 10 - sin(parent.dir) * 30,
    parent.y + sin(parent.dir) * 10 + cos(parent.dir) * 30
  );
};
const playerShapeHero = function(parent) {
  stroke(1);
  fill(parent.color[1]);
  // console.log(subColor);
  quad(
    parent.x + cos(parent.dir) * -15 - sin(parent.dir) * 15,
    parent.y + sin(parent.dir) * -15 + cos(parent.dir) * 15,
    parent.x + cos(parent.dir) * -10 - sin(parent.dir) * 20,
    parent.y + sin(parent.dir) * -10 + cos(parent.dir) * 20,
    parent.x + cos(parent.dir) * -15 - sin(parent.dir) * 35,
    parent.y + sin(parent.dir) * -15 + cos(parent.dir) * 35,
    parent.x + cos(parent.dir) * -25 - sin(parent.dir) * 25,
    parent.y + sin(parent.dir) * -25 + cos(parent.dir) * 25
  );
  quad(
    parent.x + cos(parent.dir) * 15 - sin(parent.dir) * 15,
    parent.y + sin(parent.dir) * 15 + cos(parent.dir) * 15,
    parent.x + cos(parent.dir) * 25 - sin(parent.dir) * 25,
    parent.y + sin(parent.dir) * 25 + cos(parent.dir) * 25,
    parent.x + cos(parent.dir) * 15 - sin(parent.dir) * 35,
    parent.y + sin(parent.dir) * 15 + cos(parent.dir) * 35,
    parent.x + cos(parent.dir) * 10 - sin(parent.dir) * 20,
    parent.y + sin(parent.dir) * 10 + cos(parent.dir) * 20
  );
  fill(parent.color[0]);
  quad(
    parent.x + cos(parent.dir) * 0 - sin(parent.dir) * -40,
    parent.y + sin(parent.dir) * 0 + cos(parent.dir) * -40,
    parent.x + cos(parent.dir) * 20 - sin(parent.dir) * 5,
    parent.y + sin(parent.dir) * 20 + cos(parent.dir) * 5,
    parent.x + cos(parent.dir) * 0 - sin(parent.dir) * 25,
    parent.y + sin(parent.dir) * 0 + cos(parent.dir) * 25,
    parent.x + cos(parent.dir) * -20 - sin(parent.dir) * 5,
    parent.y + sin(parent.dir) * -20 + cos(parent.dir) * 5
  );
  quad(
    parent.x + cos(parent.dir) * 0 - sin(parent.dir) * -20,
    parent.y + sin(parent.dir) * 0 + cos(parent.dir) * -20,
    parent.x + cos(parent.dir) * 10 - sin(parent.dir) * 0,
    parent.y + sin(parent.dir) * 10 + cos(parent.dir) * 0,
    parent.x + cos(parent.dir) * 0 - sin(parent.dir) * 35,
    parent.y + sin(parent.dir) * 0 + cos(parent.dir) * 35,
    parent.x + cos(parent.dir) * -10 - sin(parent.dir) * 0,
    parent.y + sin(parent.dir) * -10 + cos(parent.dir) * 0
  );
};
const bulletShapeBasic = function(x, y, dir, color) {
  noStroke();
  fill(color);
  ellipse(x, y, 4, 4, dir);
};
const shotTwinMachineGun = function(parent) {
  parent.bullets.push(
    new Bullet(
      parent.x + cos(parent.dir) * 10 - sin(parent.dir) * -24,
      parent.y + sin(parent.dir) * 10 + cos(parent.dir) * -24,
      parent.dir - (3 * PI) / 4,
      10,
      10,
      bulletShapeBasic,
      parent.color[parent.color.length - 1]
    )
  );
  parent.bullets.push(
    new Bullet(
      parent.x + cos(parent.dir) * -10 - sin(parent.dir) * -24,
      parent.y + sin(parent.dir) * -10 + cos(parent.dir) * -24,
      parent.dir - (3 * PI) / 4,
      10,
      10,
      bulletShapeBasic,
      parent.color[parent.color.length - 1]
    )
  );
};
class Player {
  constructor(
    x = 0,
    y = 0,
    shape = playerShapeHero,
    bullet = shotTwinMachineGun,
    color = ["rgb(255, 255, 255)", "rgb(0, 0, 255)"]
  ) {
    this.x = x;
    this.y = y;
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
    rect(this.x - 40, this.y - 40, 80, 80);
  }
  update() {
    this.dir = getDir(this.x, this.y, mouseX, mouseY);
    this.move();
  }
  move() {
    if (keyIsDown(65)) {
      this.x -= 5;
    }

    if (keyIsDown(68)) {
      this.x += 5;
    }

    if (keyIsDown(87)) {
      this.y -= 5;
    }

    if (keyIsDown(83)) {
      this.y += 5;
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
function getDir(x1, y1, x2, y2) {
  return -atan2((x1 - x2) / 2, (y1 - y2) / 2);
}

var player = new Player(100, 500, playerShapeBasic, shotTwinMachineGun, [
  "rgb(255, 255, 255)",
  "rgb(0, 100, 200)"
]);
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
