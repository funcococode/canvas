const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let ballsArray = [];
let numberOfBalls = 5;


class Ball {
    constructor(x, y, rad) {
        this.x = x;
        this.y = y;

        this.dx = 2;
        this.dy = 2;

        this.gravity = 0.9
        this.friction = 0.9

        this.rad = rad;
        this.color = "red"
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill()
    }

    update() {
        // Update Y axis
        if (this.y + this.rad > innerHeight || this.y < 0 + this.rad) {
            // this.dy += 0.9
            this.dy = -this.dy * this.friction
        } else {
            this.dy += this.gravity
        }
        this.y += this.dy;

        // Update X axis
        if (this.x > innerWidth - this.rad || this.x < 0 + this.rad) {
            this.dx = -this.dx * this.friction
        }
        this.x += this.dx;

        this.draw()
    }

}

let ball;

function init() {
    ball = new Ball(innerWidth / 2, innerHeight / 2, 40);
}

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    ball.update()
}

init()
animate();