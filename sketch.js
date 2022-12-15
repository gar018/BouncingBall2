/*
 * This program sketch is copied from Even Peck's example at
 * https://editor.p5js.org/evanpeck/sketches/O7MjzPFxb
 * This is from my own learning.
 * Xiannong Meng
 * 2022-06-25
 *
 * Revisions
 * 1. 2022-06-28: added sound file loading and playing
 *    a. The Apollo launch audio file is downloaded from
 *    https://www.nasa.gov/62282main_countdown_launch.wav
 *    which is then converted into mp3 format to be used here.
 * 2. 2022-06-28: added a textbox; check if any ball is colliding with the textbox.
 *    If so, the ball reverses the move direction.
 */

/*--------------------------------------------------------------------------
Gordon Rose - 12/14/22
Three "Meaningful Changes" to the Program:
1. 'Hello World' box & collision are centered on screen.
2. Fixed Box collision that traps the balls.
3. Made the box color change each time it is collided with.
---------------------------------------------------------------------------
*/

const BOX_WIDTH  = 200;  // textbox dimensions
const BOX_HEIGHT = 100;

var balls = [];
var sound;
var testBall;

function preload() {

  sound = loadSound("apollo11.mp3");  // preload the sound file
}

function setup() {

//  createCanvas(windowWidth, windowHeight);
  var windowWidth = 600;
  var windowHeight = 400;
  createCanvas(windowWidth, windowHeight);

  
  noStroke();
  
  //sound.play();    // play the audio file once
  sound.loop();  // play the sound file repeatedly
  
  createBox();
  
  for (var ballNum = 0; ballNum < 10; ballNum++) {
  	balls[ballNum] = new Ball();  
  }

  
  
  let y = height;
  testBall = new Ball();
  testBall.size = 50;
  testBall.ballX = 220;  // if ballX == 225, the ball just slides over the right edge
  testBall.ballY = 300;
  testBall.red = 0;
  testBall.blue = 0;
  testBall.green = 0;
  testBall.speedX = 0;
  testBall.speedY = 1.2;
}

function createBox() {
  // prepare a box first
  
  helloBox = new Box();
 
}

class Box {
  
  constructor() {
    strokeWeight(4);
    this.boxX=300;
    this.boxY=200;
    this.boxWidth = BOX_WIDTH;
    this.boxHeight = BOX_HEIGHT;
    
    this.red=random(255);
    this.green=random(255);
    this.blue=random(255);
    this.alpha=20;
    
    
  }
  
  changeColor(r,g,b,a) {
    this.red=r;
    this.green=g;
    this.blue=b;
    this.alpha=a;
  }
  
  display() {
    fill(this.red,this.green,this.blue,this.alpha);
    rectMode(CENTER);
    rect( this.boxX, this.boxY, BOX_WIDTH, BOX_HEIGHT);
    fill(0, 102, 153);
    textAlign(CENTER);
    textSize(32);
    text('Hello World!', this.boxX, this.boxY, this.boxWidth, this.boxHeight-60);
  }
}
function draw() {

  background(255);
  
  
  testBallMove();  // a special ball to test corner collision
  
  for (var ballNum = 0; ballNum < balls.length; ballNum++) {
    balls[ballNum].display();
    balls[ballNum].checkForHitWall();
    balls[ballNum].checkForHitBox();
    balls[ballNum].moveBall();
    
    helloBox.display();
    
    if (mouseIsPressed) {
      balls[ballNum].randomize()
    }
  }
}

function testBallMove() {
  
  testBall.display();
  testBall.checkForHitWall();
  testBall.checkForHitBox();
  testBall.moveBall();
}

class Ball { // Constructor
  
  constructor() {
    // initial position
    this.ballX = random(100, width)
    this.ballY = random(100, height)
    
    // Dictates velocity + direction
    this.speedY = random(-5, 5);
    this.speedX = random(-5, 5);
    
    this.size = random(100);
    
    // How transparent the ball is
    this.alpha = 100
    
    // RGB values for color
    this.red   = random(255);
    this.green = random(255);
    this.blue  = random(255)
    
    // how many net collisions between the wall and the box this ball has had
    this.netCollisions = 0;
  }
  
  display() {
    fill(this.red, this.green, this.blue, this.alpha);
    ellipse(this.ballX, this.ballY, this.size);
  }
  
  randomize() {
    this.speedY = random(-5, 5);
    this.speedX = random(-5, 5);
  }
  
  checkForHitWall() {
  
    let radius = this.size / 2;
    if ((this.ballY+radius) > height || (this.ballY-radius) < 0) {
  	  this.speedY = -this.speedY;
      this.netCollisions += 1;
      this.escape();
  	}
    if ((this.ballX+radius) > width  || (this.ballX-radius) < 0) {
      this.speedX = -this.speedX; 
      this.netCollisions += 1;
      this.escape();
    }
  }
  
  checkForHitBox() {
    
    let radius = this.size / 2;
    
    let xCollisionMax = 400;
    let xCollisionMin = 200;
    let yCollisionMax = 250;
    let yCollisionMin = 150;

//    if (((this.ballX-radius) < BOX_WIDTH && (this.ballY-radius) < BOX_HEIGHT) || d < radius) {
    if (((this.ballX) < xCollisionMax && (this.ballX) > xCollisionMin) && ((this.ballY) < yCollisionMax && (this.ballY) > yCollisionMin)) {
      // bump into the textbox, need to reverse direction
      this.reverseBall();
      helloBox.changeColor(this.red,this.green,this.blue,20);
      this.netCollisions -= 1;
      this.escape();
      //change color of box to color of box
    }
  }
  
  reverseBall() {
    
      this.speedX = -this.speedX;
      this.speedY = -this.speedY;    
  }
  
  moveBall() {

    this.ballX += this.speedX;
  	this.ballY += this.speedY;
  }
  
  escape() {
    if (Math.abs(this.netCollisions) > 48) {
      this.ballX = random(100, width)
      this.ballY = random(100, height)
      this.netCollisions = 0;
    }
    
  }
    
}