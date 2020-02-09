!function(t){var i={};function s(e){if(i[e])return i[e].exports;var h=i[e]={i:e,l:!1,exports:{}};return t[e].call(h.exports,h,h.exports,s),h.l=!0,h.exports}s.m=t,s.c=i,s.d=function(t,i,e){s.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:e})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,i){if(1&i&&(t=s(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(s.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var h in t)s.d(e,h,function(i){return t[i]}.bind(null,h));return e},s.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(i,"a",i),i},s.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},s.p="",s(s.s=0)}([function(t,i){class s{constructor(t=0,i=0){this.x=t,this.y=i,this.canvas=document.getElementById("myCanvas")}}class e{constructor(t=3,i=5){this.brickRowCount=t,this.brickColumnCount=i,this.brickWidth=75,this.brickHeight=20,this.brickPadding=10,this.brickOffsetTop=30,this.brickOffsetLeft=30,this.colorOne="#660066",this.colorTwo="#be29ec",this.colorThree="#efbbff",this.bricksArray=[],this.bricksSetup()}bricksSetup(){for(let t=0;t<this.brickColumnCount;t+=1){this.bricksArray[t]=[];for(let i=0;i<this.brickRowCount;i+=1)this.bricksArray[t][i]={x:0,y:0,status:this.brickRowCount-i}}}render(t){for(let i=0;i<this.brickColumnCount;i+=1)for(let s=0;s<this.brickRowCount;s+=1)if(this.bricksArray[i][s].status>=1){const e=i*(this.brickWidth+this.brickPadding)+this.brickOffsetLeft,h=s*(this.brickHeight+this.brickPadding)+this.brickOffsetTop;this.bricksArray[i][s].x=e,this.bricksArray[i][s].y=h,t.beginPath(),t.rect(e,h,this.brickWidth,this.brickHeight),1===this.bricksArray[i][s].status?t.fillStyle=this.colorThree:2===this.bricksArray[i][s].status?t.fillStyle=this.colorTwo:3===this.bricksArray[i][s].status&&(t.fillStyle=this.colorOne),t.fill(),t.closePath()}}}class h extends s{constructor(t,i,s,e="#0095DD"){super(t,i),this.radius=s,this.color=e,this.dx=2,this.dy=-2}move(){this.x+=this.dx,this.y+=this.dy}render(t){t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI),t.fillStyle=this.color,t.fill(),t.closePath()}}class r extends s{constructor(t,i=75,s=10){super(t),this.paddleWidth=i,this.paddleHeight=s}render(t){t.beginPath(),t.rect(this.x,this.canvas.height-this.paddleHeight,this.paddleWidth,this.paddleHeight),t.fillStyle=this.color,t.fill(),t.closePath()}}class l extends s{constructor(t,i){super(t,i),this.numLives=3,this.font="16px Arial",this.fillStyle="#0095DD"}render(t){t.beginPath(),t.font=this.font,t.fillStyle=this.color,t.fillText(`Lives: ${this.numLives}`,this.x,this.y),t.fill(),t.closePath()}}class a extends s{constructor(t,i){super(t,i),this.numScore=0,this.font="16px Arial",this.fillStyle="#0095DD"}render(t){t.beginPath(),t.font=this.font,t.fillStyle=this.color,t.fillText(`Score: ${this.numScore}`,this.x,this.y),t.fill(),t.closePath()}}new class{constructor(t=3,i=5,s="#0095DD",n=75,c=10){this.canvas=document.getElementById("myCanvas"),this.ctx=this.canvas.getContext("2d"),this.gameRunning=!1,this.bricks=new e(t,i),this.ball=new h(this.canvas.width/2,this.canvas.height-c-10,10,s),this.paddle=new r((this.canvas.width-n)/2,n,c),this.lives=new l(this.canvas.width-65,20),this.score=new a(8,20),this.setupKeyEvents(),this.renderGame()}setupKeyEvents(){document.addEventListener("keydown",t=>{"Right"===t.key||"ArrowRight"===t.key?this.rightPressed=!0:"Left"!==t.key&&"ArrowLeft"!==t.key||(this.leftPressed=!0)}),document.addEventListener("keyup",t=>{"Right"===t.key||"ArrowRight"===t.key?this.rightPressed=!1:"Left"!==t.key&&"ArrowLeft"!==t.key||(this.leftPressed=!1)}),document.addEventListener("mousemove",t=>{const i=t.clientX-this.canvas.offsetLeft;i>0&&i<this.canvas.width&&(this.paddle.x=i-this.paddle.paddleWidth/2)})}collisionDetection(){for(let t=0;t<this.bricks.brickColumnCount;t+=1)for(let i=0;i<this.bricks.brickRowCount;i+=1){const s=this.bricks.bricksArray[t][i];s.status>=1&&(this.ball.y>s.y&&this.ball.y<s.y+this.bricks.brickHeight&&this.ball.x>s.x&&this.ball.x<s.x+this.bricks.brickWidth&&(this.ball.dy=-this.ball.dy,s.status-=1),s.status<1&&(this.score.numScore+=1,this.score.numScore===this.bricks.brickColumnCount*this.bricks.brickRowCount&&(alert("YOU WIN, CONGRATULATIONS!"),document.location.reload())))}}renderGame(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.ball.move(),this.collisionDetection(),this.ball.y+this.ball.dy<this.ball.radius?this.ball.dy=-this.ball.dy:this.ball.y+this.ball.dy>this.canvas.height-this.ball.radius&&(this.ball.x>this.paddle.x&&this.ball.x<this.paddle.x+this.paddle.paddleWidth?this.ball.dy=-this.ball.dy:(this.lives.numLives-=1,this.lives.numLives?(this.ball.x=this.canvas.width/2,this.ball.y=this.canvas.height-30,this.ball.dx=2,this.ball.dy=-2,this.paddle.x=(this.canvas.width-this.paddle.paddleWidth)/2):(alert("GAME OVER"),document.location.reload()))),(this.ball.x+this.ball.dx>this.canvas.width-this.ball.radius||this.ball.x+this.ball.dx<this.ball.radius)&&(this.ball.dx=-this.ball.dx),this.rightPressed&&this.paddle.x<this.canvas.width-this.paddle.paddleWidth?this.paddle.x+=7:this.leftPressed&&this.paddle.x>0&&(this.paddle.x-=7),this.bricks.render(this.ctx),this.paddle.render(this.ctx),this.ball.render(this.ctx),this.lives.render(this.ctx),this.score.render(this.ctx),requestAnimationFrame(()=>{this.renderGame()})}}}]);