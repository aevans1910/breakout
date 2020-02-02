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

// // Brick variables
class Bricks {
  constructor(row = 3, column = 5) {
  this.brickRowCount = row;
  this.brickColumnCount = column;
  this.brickWidth = 75;
  this.brickHeight = 20;
  this.brickPadding = 10;
  this.brickOffsetTop = 30;
  this.brickOffsetLeft = 30;
  this.colorOne = '#660066';
  this.colorTwo = '#be29ec';
  this.colorThree = '#efbbff';
  this.bricksArray = [];
  this.bricksSetup();
  }
  bricksSetup() {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      this.bricksArray[c] = [];
      for (let r = 0; r < this.brickRowCount; r += 1) {
        // This is the brick object
        this.bricksArray[c][r] = { x: 0, y: 0, status: brickRowCount - r };
      }
    }
  }
  draw(ctx) {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        if (this.bricksArray[c][r].status >= 1) {
          const brickX = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
          const brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
          this.bricksArray[c][r].x = brickX;
          this.bricksArray[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
  
          if (brickCR.status === 1) {
            ctx.fillStyle = this.colorThree;
          } else if (brickCR.status === 2) {
            ctx.fillStyle = this.colorTwo;
          } else if (brickCR.status === 3) {
            ctx.fillStyle = this.colorOne;
          }
          ctx.fill();
          ctx.closePath();
        }
      }
    }
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
    paddle.x = relativeX - paddle.width / 2;
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
        if (ball.x > brick.x && ball.x < brick.x + brick.width
          && ball.y > brick.y && ball.y < brick.y + brick.height) {
          ball.dy = -ball.dy;
          brick.status -= 1;
        } if (brick.status < 1) {
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
        const brickX = (c * (brick.width + brickPadding)) + brickOffsetLeft;
        const brickY = (r * (brick.height + brickPadding)) + brickOffsetTop;
        brickCR.x = brickX;
        brickCR.y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brick.width, brick.height);

        if (brickCR.status === 1) {
          ctx.fillStyle = colorThree;
        } else if (brickCR.status === 2) {
          ctx.fillStyle = colorTwo;
        } else if (brickCR.status === 3) {
          ctx.fillStyle = colorOne;
        }
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
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
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
        paddleX = (canvas.width - paddle.width) / 2;
      }
    }
  }

  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }

  if (rightPressed && paddle.x < canvas.width - paddle.width) {
    paddle.x += 7;
  } else if (leftPressed && paddle.x > 0) {
    paddle.x -= 7;
  }

  ball.x += ball.dx;
  ball.y += ball.dy;

  requestAnimationFrame(draw);
}

draw();
