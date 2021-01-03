const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let ballsArray = [];
let numberOfBalls = 500;
let colors = [
    "#a1E8B8",
    "#F9E784",
    "#E58F65",
    "#D05353",
    "#23ffff"
];

let mouseCoords = {
    x:null,
    y:null
};
class Ball {
    constructor(x, y, rad) {
        this.x = x;
        this.y = y;

        this.dx = (Math.random() > 0.5) ? 1 : -1;
        this.dy = 2;

        this.gravity = 0.01;
        this.friction = 0.97;

        this.rad = rad;
        this.safeRad = this.rad;
        this.color = colors[Math.floor(Math.random()*colors.length)];
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(mousex,mousey) {
        // Update Y axis
        if (this.y + this.rad > innerHeight || this.y < 0 + this.rad) {
            this.dy = -this.dy * this.friction;
        } else {
            this.dy += this.rad * 0.5 * this.gravity;
        }
        this.y += this.dy;

        // Update X axis
        if (this.x > innerWidth - this.rad || this.x < 0 + this.rad) {
            this.dx = -this.dx;
        }
        this.x += this.dx;

        // Update Radius
        this.rad = this.rad * 0.99;
        // console.log(this.rad);
        if (this.rad < 1) {
            this.rad = this.rad * 1.5;
        }

        // INTERACTION WITH MOUSE

        if(mousex - this.x < 50 && mousex - this.x > -50 && mousey - this.y < 50 && mousey - this.y > -50){
            this.rad += 2;
        }else if(this.rad > this.safeRad){
            this.rad -=1
        }

        this.draw();
    }
}

let ball;

// Update mouseCoords for mouse interaction
window.addEventListener("mousemove",(e)=>{
    mouseCoords = {
        x:e.x,
        y:e.y
    }
})


function init() {

    for (let i = 0; i < numberOfBalls; i++) {
        let radius = Math.random() * 10 + 1;
        let x = Math.floor(Math.random() * (innerWidth - radius * 2));
        let y = Math.floor(Math.random() * (innerHeight - 100));
        ballsArray.push(new Ball(x, y, radius));
    }

}

function animate() {
    // console.log(mouseCoords);
    
    requestAnimationFrame(animate);
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fill();
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < ballsArray.length; i++) {
        ballsArray[i].update(mouseCoords.x,mouseCoords.y);
    }
}

init();
animate();