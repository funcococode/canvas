const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let ballsArray = [];
let numberOfBalls = 100;

let colors = [
    "#a1E8B8",
    "#F9E784",
    "#E58F65",
    "#D05353",
    "#23ffff"
]


class Ball {
    constructor(x, y, rad) {
        this.x = x;
        this.y = y;

        this.dx = (Math.random() > 0.5) ? 1 : -1;
        this.dy = 2;

        this.gravity = 0.01
        this.friction = 0.92

        this.rad = rad;
        this.color = colors[Math.floor(Math.random()*colors.length)]
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
        ctx.strokeStyle = this.color;
        ctx.stroke()
    }

    update() {
        // Update Y axis
        if (this.y + this.rad > innerHeight || this.y < 0 + this.rad) {
            // this.dy += 0.9
            this.dy = -this.dy * this.friction
        } else {
            this.dy += this.rad * 0.9 * this.gravity
        }
        this.y += this.dy;

        // Update X axis
        if (this.x > innerWidth - this.rad || this.x < 0 + this.rad) {
            this.dx = -this.dx
        }
        this.x += this.dx;

        // Update Radius
        this.rad = this.rad * 0.99
        console.log(this.rad);
        if (this.rad < 1) {
            this.rad = this.rad * 1.5
        }

        this.draw()
    }

}

let ball;

function init() {

    for (let i = 0; i < numberOfBalls; i++) {
        let radius = Math.random() * 50 + 20
        let x = Math.random() * (innerWidth - radius * 2) + 100;
        let y = Math.random() * (innerHeight - 100) + 100;
        ballsArray.push(new Ball(x, y, radius));
    }

}

function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = "rgba(0,0,0,0.1)"
    ctx.fill()
    ctx.fillRect(0, 0, innerWidth, innerHeight)

    for (let i = 0; i < ballsArray.length; i++) {
        ballsArray[i].update()
    }
}

init()
animate();