/* eslint-disable max-classes-per-file */

// Canvas variables
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

class Sprite {
  constructor(x, y) {
    this.x = x;
    this.y = y;
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
        this.bricksArray[c][r] = { x: 0, y: 0, status: this.brickRowCount - r };
      }
    }
  }

  render() {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        if (this.bricksArray[c][r].status >= 1) {
          const brickX = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
          const brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
          this.bricksArray[c][r].x = brickX;
          this.bricksArray[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);

          if (this.bricksArray[c][r].status === 1) {
            ctx.fillStyle = this.colorThree;
          } else if (this.bricksArray[c][r].status === 2) {
            ctx.fillStyle = this.colorTwo;
          } else if (this.bricksArray[c][r].status === 3) {
            ctx.fillStyle = this.colorOne;
          }
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }
}

class Ball extends Sprite {
  constructor(x, y, radius, color = '#0095DD') {
    super(x, y);
    this.radius = radius;
    this.color = color;
    this.dx = 2;
    this.dy = -2;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  render() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}


class Paddle extends Sprite {
  constructor(x, width = 75, height = 10) {
    super(x);
    this.paddleWidth = width;
    this.paddleHeight = height;
  }

  render() {
    ctx.beginPath();
    ctx.rect(this.x, canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Lives extends Sprite {
  constructor(x, y) {
    super(x, y);
    this.font = '16px Arial';
    this.fillStyle = '#0095DD';
  }

  render() {
    ctx.beginPath();
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Lives: ${this.lives}`, this.x, this.y);
    ctx.fill();
    ctx.closePath();
  }
}

class Score extends Sprite {
  constructor(x, y) {
    super(x, y);
    this.font = '16px Arial';
    this.fillStyle = '#0095DD';
    this.fillText = (`Score: ${this.score}`, this.x, this.y);
  }

  render() {
    ctx.beginPath();
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Lives: ${this.lives}`, this.x, this.y);
    ctx.fill();
    ctx.closePath();
  }
}

class Game {
  constructor(ballRadius, brickRowCount = 3, brickColumnCount = 6, ballColor = '#0095DD',
    paddleWidth = 75, paddleHeight = 10) {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.gameRunning = false;
    this.bricks = new Bricks(brickRowCount, brickColumnCount);
    this.ball = new Ball(canvas.width / 2, canvas.height - paddleHeight - 10, ballRadius,
      ballColor);
    this.paddle = new Paddle((canvas.width - this.paddleWidth) / 2, paddleWidth,
      paddleHeight);
    this.lives = new Lives(canvas.width - 65, 20);
    this.Score = new Score(8, 20);

    this.setupKeyEvents();
  }

  setupKeyEvents() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Right' || e.key === 'ArrowRight') {
        this.rightPressed = true;
      } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        this.leftPressed = true;
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.key === 'Right' || e.key === 'ArrowRight') {
        this.rightPressed = false;
      } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        this.leftPressed = false;
      }
    });

    document.mouseMoveHandler('mousemove', (e) => {
      const relativeX = e.clientX - canvas.offsetLeft;
      if (relativeX > 0 && relativeX < canvas.width) {
        this.paddle.x = relativeX - this.paddleWidth / 2;
      }
    });
  }

  collisionDetection() {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        const b = this.bricksArray[c][r];
        if (b.status >= 1) {
          if (this.ball.x > this.brick.x && this.ball.x < this.brick.x + this.brickWidth
            && this.ball.y > this.brick.y && this.ball.y < this.brick.y + this.brickHeight) {
            this.ball.dy = -this.ball.dy;
            this.brick.status -= 1;
          } if (this.brick.status < 1) {
            this.score += 1;
            if (this.score === this.brickColumnCount * this.brickRowCount) {
              alert('YOU WIN, CONGRATULATIONS!');
              document.location.reload();
            }
          }
        }
      }
    }
  }


  renderGame() {
    this.ball.move();

    this.collisionDetection();

    if (this.ball.y + this.ball.dy < this.ballRadius) {
      this.ball.dy = -this.ball.dy;
    } else if (this.ball.y + this.ball.dy > canvas.height - this.ballRadius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddleWidth) {
        this.ball.dy = -this.ball.dy;
      } else {
        this.lives -= 1;
        if (!this.lives) {
          alert('GAME OVER');
          document.location.reload();
        } else {
          this.ball.x = canvas.width / 2;
          this.ball.y = canvas.height - 30;
          this.ball.dx = 2;
          this.ball.dy = -2;
          this.paddle.x = (canvas.width - this.paddleWidth) / 2;
        }
      }
    }

    if (this.ball.x + this.ball.dx > canvas.width - this.ball.radius || this.ball.x
      + this.ball.dx < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
    }

    if (this.rightPressed && this.paddle.x < canvas.width - this.paddle.width) {
      this.paddle.x += 7;
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.x -= 7;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.bricks.render(this.ctx);
    this.paddle.render(this.ctx);
    this.ball.render(this.ctx);
    this.lives.render(this.ctx);
    this.score.render(this.ctx);

    requestAnimationFrame(() => {
      this.renderGame(ctx);
    });
  }
}
Game();
