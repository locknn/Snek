var screenWidth = 400;
var screenHeight = 400;

var timer = 0;
var timerTarget = 0.1;

var dir;
var newDir;
var speed;
var body;
var food;

var bodySize = 20;

function reset(){
  dir = 'right'
  newDir = 'right'
  speed = { x: 20, y: 0 }
  body = [
    { x: 200, y: 200 },
    { x: 180, y: 200 },
    { x: 160, y: 200 }
  ];
  food = {
    x: Math.floor(Math.random() * 20) * 20,
    y: Math.floor(Math.random() * 20) * 20
  } 
}

function move() {
  dir = newDir
  switch (dir) {
    case 'up':
      speed = { x: 0, y: -20 }
      break;
    case 'right':
      speed = { x: 20, y: 0 }
      break;
    case 'down':
      speed = { x: 0, y: 20 }
      break;
    case 'left':
      speed = { x: -20, y: 0 }
      break;
  }

  var lastPiece = { x: body[body.length - 1].x, y: body[body.length - 1].y }
  body[body.length - 1].x = body[0].x
  body[body.length - 1].y = body[0].y
  body.splice(1, 0, body.splice(body.length - 1, 1)[0])
  body[0].x += speed.x;
  body[0].y += speed.y

  for(piece in body){
    if(piece != 0){
      if(body[0].x == body[piece].x && body[0].y == body[piece].y){
        reset()
        break;
      }
    }
  }

  if (body[0].x == food.x && body[0].y == food.y) {
    body.push(lastPiece)

    food = {
      x: Math.floor(Math.random() * 20) * 20,
      y: Math.floor(Math.random() * 20) * 20
    }

  }

  if (body[0].x > 380) body[0].x = 0
  if (body[0].x < 0) body[0].x = 380

  if (body[0].y > 380) body[0].y = 0
  if (body[0].y < 0) body[0].y = 380

}

function setup() {
  reset()
  createCanvas(screenWidth, screenHeight)
}

function draw() {
  background(0)

  timer += deltaTime / 1000
  if (timer >= timerTarget) {
    timer = 0
    move()
  }

  for (var piece in body) {
    fill(255)
    if (piece == 0) fill(255, 255, 0)
    rect(body[piece].x, body[piece].y, bodySize, bodySize)
  }

  fill(255, 0, 0)
  ellipse(food.x + 10, food.y + 10, 10, 10)
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    if (dir != 'down') newDir = 'up'
  } if (keyCode === RIGHT_ARROW) {
    if (dir != 'left') newDir = 'right'
  } if (keyCode === DOWN_ARROW) {
    if (dir != 'up') newDir = 'down'
  } if (keyCode === LEFT_ARROW) {
    if (dir != 'right') newDir = 'left'
  }
}