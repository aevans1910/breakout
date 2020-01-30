/* eslint-disable */
// Canvas variables
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

class Background {
  constructor(color = 'white') {
    this.color = color
  }
  render(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Ball {
  constructor(radius, color = '#0095DD') {
    this.radius = radius;
    this.color = color;
    this.x = 0;
    this.dx = 2;
    this.y = 0;
    this.dy = -2;
  }
  move() {
    this.x += this.dx
    this.y += this.dy
  }
  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

// // Paddle variables
// let paddleX = (canvas.width - paddleWidth) / 2;
// let rightPressed = false;
// let leftPressed = false;

class Paddle {
  constructor(x, y, color = '#0095DD') {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = 75;
    this.height = 10;
  }
  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

const p = new Paddle()
p.x = (canvas.width - paddleWidth) / 2

// // Brick variables
// const brickRowCount = 3;
// const brickColumnCount = 5;
// const brickWidth = 75;
// const brickHeight = 20;
// const brickPadding = 10;
// const brickOffsetTop = 30;
// const brickOffsetLeft = 30;
// const colorOne = '#660066';
// const colorTwo = '#be29ec';
// const colorThree = '#efbbff';

class Brick {
  constructor(color = '#660066') {
    this.color = color;
    this.x = 0;
    this.y = 0;
    this.status = 1;
    this.width = 75;
    this.height = 20;
  } 
  render(ctx) {
    ctx.beginPath();
    ctx.rect(brickX, brickY, brickWidth, brickHeight);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Score {
  constructor(color = '#0095DD', font = '16px Arial') {
    this.x = 8;
    this.y = 20;
    this.color = color;
    this.font = font;
    this.reset();
  }
  render(ctx) {
    ctx.beginPath();
    ctx.fillText(`Score: ${this.score}`, this.x, this.y);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  } 
  update(points) {
    this.score += points;
  }
  reset() {
    this.score = 0;
  }
}

class Lives {
  constructor(color = '#0095DD', font = '16px Arial') {
    this.x = 100;
    this.y = 20;
    this.color = color;
    this.font = font;
    this.reset();
  }
  render(ctx) {
    ctx.beginPath();
    ctx.fillText(`Lives: ${this.lives}`, this.x, this.y);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  loseLife() {
    this.lives -= 1;
  }
  reset() {
    this.lives = 3;
  }
}

const bricks = [];
for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    // This is the brick object
    bricks[c][r] = { x: 0, y: 0, status: brickRowCount - r };
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

// Event handlers
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status >= 1) {
        if (ball.x > b.x && ball.x < b.x + brickWidth
          && ball.y > b.y && ball.y < b.y + brickHeight) {
          ball.dy = -ball.dy;
          b.status -= 1;
        } if (b.status < 1) {
          score += 1;
          if (score === brickColumnCount * brickRowCount) {
            alert('YOU WIN, CONGRATULATIONS!');
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const brickCR = bricks[c][r];
      if (brickCR.status >= 1) {
        const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        brickCR.x = brickX;
        brickCR.y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);

        if (brickCR.status === 1) {
          ctx.fillStyle = colorThree;
        } else if (brickCR.status === 2) {
          ctx.fillStyle = colorTwo;
        } else if (brickCR.status === 3) {
          ctx.fillStyle = colorOne;
        }

        // switch(brickCR.status) {
        //     case 1:
        //     // color A
        //     break
        //     case 2:
        //     // color B
        //     break

        //     default:
        // }

        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.render(ctx);
  // drawBricks();
  brick.render(ctx);
  // drawBall();
  ball.move();
  ball.render(ctx);
  paddle.render(ctx);
  score.render(ctx);
  lives.render(ctx);
  // drawPaddle();
  // drawScore();
  // drawLives();
  collisionDetection();

  if (ball.y + ball.dy < ball.ballRadius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.ballRadius) {
    if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
      ball.dy = -ball.dy;
    } else {
      lives -= 1;
      if (!lives) {
        alert('GAME OVER');
        document.location.reload();
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 2;
        ball.dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (ball.x + ball.dx > canvas.width - ball.ballRadius || ball.x + ball.dx < ball.ballRadius) {
    ball.dx = -ball.dx;
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  ball.x += ball.dx;
  ball.y += ball.dy;

  requestAnimationFrame(draw);
}

draw();
