const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let width = innerWidth;
let height = innerHeight;

canvas.width = width;
canvas.height = height;

let particleArray = [];
let numberOfParticles = 50;



class Particle {
    constructor(x, y, rad, color) {
        this.x = x;
        this.y = y;
        this.rad = rad;
        this.color = color;
        this.weight = (Math.random() * 2) - 0.5;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
        ctx.fillStyle = "blue";
        ctx.fill();
    }

    update() {

        this.rad -= 0.05;

        if (this.rad < 0) {
            this.rad = (Math.random() * 10) + 2;
            this.weight = (Math.random() * 2) - 0.5
        }

        this.y += this.weight;
        this.weight += 0.2;
        if (this.y > height - this.rad) {
            this.weight *= -1;
        }
    }
}


function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        let radius = Math.random() * 20;
        let x = Math.random() * width;
        let y = Math.random() * height;
        particleArray.push(new Particle(x, y, radius, "Blue"))
    }
}

function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fill();
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < numberOfParticles; i++) {
        particleArray[i].update();
        particleArray[i].draw();
    }

    window.requestAnimationFrame(animate)
}

window.addEventListener("click", function(e) {
    let part = new Particle(e.x, e.y, Math.random() * 10, "red");
    part.draw()
    part.update();
})
init()
animate();