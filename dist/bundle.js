/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* eslint-disable max-classes-per-file */\n\nclass Sprite {\n  constructor(x = 0, y = 0) {\n    this.x = x;\n    this.y = y;\n    this.canvas = document.getElementById('myCanvas');\n  }\n}\n\n\n// // Brick variables\nclass Bricks {\n  constructor(row = 3, column = 5) {\n    this.brickRowCount = row;\n    this.brickColumnCount = column;\n    this.brickWidth = 75;\n    this.brickHeight = 20;\n    this.brickPadding = 10;\n    this.brickOffsetTop = 30;\n    this.brickOffsetLeft = 30;\n    this.colorOne = '#660066';\n    this.colorTwo = '#be29ec';\n    this.colorThree = '#efbbff';\n    this.bricksArray = [];\n    this.bricksSetup();\n  }\n\n  bricksSetup() {\n    for (let c = 0; c < this.brickColumnCount; c += 1) {\n      this.bricksArray[c] = [];\n      for (let r = 0; r < this.brickRowCount; r += 1) {\n        // This is the brick object\n        this.bricksArray[c][r] = { x: 0, y: 0, status: this.brickRowCount - r };\n      }\n    }\n  }\n\n  render(ctx) {\n    for (let c = 0; c < this.brickColumnCount; c += 1) {\n      for (let r = 0; r < this.brickRowCount; r += 1) {\n        if (this.bricksArray[c][r].status >= 1) {\n          const brickX = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;\n          const brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;\n          this.bricksArray[c][r].x = brickX;\n          this.bricksArray[c][r].y = brickY;\n          ctx.beginPath();\n          ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);\n\n          if (this.bricksArray[c][r].status === 1) {\n            ctx.fillStyle = this.colorThree;\n          } else if (this.bricksArray[c][r].status === 2) {\n            ctx.fillStyle = this.colorTwo;\n          } else if (this.bricksArray[c][r].status === 3) {\n            ctx.fillStyle = this.colorOne;\n          }\n          ctx.fill();\n          ctx.closePath();\n        }\n      }\n    }\n  }\n}\n\nclass Ball extends Sprite {\n  constructor(x, y, radius, color = '#0095DD') {\n    super(x, y);\n    this.radius = radius;\n    this.color = color;\n    this.dx = 2;\n    this.dy = -2;\n  }\n\n  move() {\n    this.x += this.dx;\n    this.y += this.dy;\n  }\n\n  render(ctx) {\n    ctx.beginPath();\n    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);\n    ctx.fillStyle = this.color;\n    ctx.fill();\n    ctx.closePath();\n  }\n}\n\n\nclass Paddle extends Sprite {\n  constructor(x, width = 75, height = 10) {\n    super(x);\n    this.paddleWidth = width;\n    this.paddleHeight = height;\n  }\n\n  render(ctx) {\n    ctx.beginPath();\n\n    ctx.rect(this.x, this.canvas.height - this.paddleHeight,\n      this.paddleWidth, this.paddleHeight);\n    ctx.fillStyle = this.color;\n    ctx.fill();\n    ctx.closePath();\n  }\n}\n\nclass Lives extends Sprite {\n  constructor(x, y) {\n    super(x, y);\n    this.font = '16px Arial';\n    this.fillStyle = '#0095DD';\n  }\n\n  render(ctx) {\n    ctx.beginPath();\n    ctx.font = this.font;\n    ctx.fillStyle = this.color;\n    ctx.fillText(`Lives: ${this.lives}`, this.x, this.y);\n    ctx.fill();\n    ctx.closePath();\n  }\n}\n\nclass Score extends Sprite {\n  constructor(x, y) {\n    super(x, y);\n    this.font = '16px Arial';\n    this.fillStyle = '#0095DD';\n    this.fillText = (`Score: ${this.score}`, this.x, this.y);\n  }\n\n  render(ctx) {\n    ctx.beginPath();\n    ctx.font = this.font;\n    ctx.fillStyle = this.color;\n    ctx.fillText(`Score: ${this.score}`, this.x, this.y);\n    ctx.fill();\n    ctx.closePath();\n  }\n}\n\nclass Game {\n  constructor(brickRowCount = 3, brickColumnCount = 5, ballColor = '#0095DD',\n    paddleWidth = 75, paddleHeight = 10) {\n    this.canvas = document.getElementById('myCanvas');\n    this.ctx = this.canvas.getContext('2d');\n\n    this.gameRunning = false;\n    this.bricks = new Bricks(brickRowCount, brickColumnCount);\n    this.ball = new Ball(this.canvas.width / 2, this.canvas.height - paddleHeight - 10, 10,\n      ballColor);\n    this.paddle = new Paddle((this.canvas.width - paddleWidth) / 2, paddleWidth, paddleHeight);\n    this.lives = new Lives(this.canvas.width - 65, 20);\n    this.score = new Score(8, 20);\n\n    this.setupKeyEvents();\n\n    // start the game \n    this.renderGame();\n  }\n\n  setupKeyEvents() {\n    document.addEventListener('keydown', (e) => {\n      if (e.key === 'Right' || e.key === 'ArrowRight') {\n        this.rightPressed = true;\n      } else if (e.key === 'Left' || e.key === 'ArrowLeft') {\n        this.leftPressed = true;\n      }\n    });\n\n    document.addEventListener('keyup', (e) => {\n      if (e.key === 'Right' || e.key === 'ArrowRight') {\n        this.rightPressed = false;\n      } else if (e.key === 'Left' || e.key === 'ArrowLeft') {\n        this.leftPressed = false;\n      }\n    });\n\n    document.addEventListener('mousemove', (e) => {\n      const relativeX = e.clientX - this.canvas.offsetLeft;\n      if (relativeX > 0 && relativeX < this.canvas.width) {\n        this.paddle.x = relativeX - this.paddle.paddleWidth / 2;\n      }\n    });\n  }\n\n  collisionDetection() {\n    for (let c = 0; c < this.brickColumnCount; c += 1) {\n      for (let r = 0; r < this.brickRowCount; r += 1) {\n        const b = this.bricksArray[c][r];\n        if (b.status >= 1) {\n          if (this.ball.x > this.brick.x && this.ball.x < this.brick.x + this.brick.brickWidth\n            && this.ball.y > this.brick.y && this.ball.y < this.brick.y + this.brick.brickHeight) {\n            this.ball.dy = -this.ball.dy;\n            this.brick.status -= 1;\n          } if (this.brick.status < 1) {\n            this.score += 1;\n            if (this.score === this.brickColumnCount * this.brickRowCount) {\n              alert('YOU WIN, CONGRATULATIONS!');\n              document.location.reload();\n            }\n          }\n        }\n      }\n    }\n  }\n\n\n  renderGame() {\n    // clear canvas\n    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n\n    this.ball.move();\n\n    this.collisionDetection(); // FIXME \n    if (this.ball.y + this.ball.dy < this.ball.radius) {\n      this.ball.dy = -this.ball.dy;\n    } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {\n      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.paddleWidth) {\n        this.ball.dy = -this.ball.dy;\n      } else {\n        this.lives -= 1;\n        if (!this.lives) {\n          alert('GAME OVER');\n          document.location.reload();\n        } else {\n          this.ball.x = this.canvas.width / 2;\n          this.ball.y = this.canvas.height - 30;\n          this.ball.dx = 2;\n          this.ball.dy = -2;\n          this.paddle.x = (this.canvas.width - this.paddle.paddleWidth) / 2;\n        }\n      }\n    }\n\n    if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius || this.ball.x\n      + this.ball.dx < this.ball.radius) {\n      this.ball.dx = -this.ball.dx;\n    }\n\n    if (this.rightPressed && this.paddle.x < this.canvas.width - this.paddle.paddleWidth) {\n      this.paddle.x += 7;\n    } else if (this.leftPressed && this.paddle.x > 0) {\n      this.paddle.x -= 7;\n    }\n\n    this.bricks.render(this.ctx); // *\n    this.paddle.render(this.ctx); // *\n    this.ball.render(this.ctx);   // *\n    this.lives.render(this.ctx);\n    this.score.render(this.ctx);\n\n    requestAnimationFrame(() => {\n      this.renderGame();\n    });\n  }\n}\n\n\n// eslint-disable-next-line no-new\nconst game = new Game();\n\nconsole.log(game);\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });