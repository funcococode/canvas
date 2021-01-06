const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let numberOfBlocks = 300;
let blocksArray = [];

// ADDING ALL THE WINDOW EVENTS

let keyCode,kc;
window.addEventListener("keydown",(e)=>{
    keyCode = e.keyCode;
    switch (keyCode) {
        case 37: kc = "left";
            break;
        case 38: kc = "up";
            break;
        case 39: kc = "right";
            break;
        case 40: kc = "down";
            break;
    
        default: kc = "invalid key";
            break;
    }
});
window.addEventListener("keyup",()=>kc=undefined);



let mouse = {
    x:null,
    y:null
}
window.addEventListener("click",(e)=>{
    mouse = {
        x:e.x,
        y:e.y
    }
});


// Utility function for calculating distance
function getDistance(x1,x2,y1,y2){
    let xDist = x2-x1;
    let yDist = y2-y1;
    let sqXDist = Math.pow(xDist,2);
    let sqYDist = Math.pow(yDist,2);
    let finalDist = Math.sqrt(sqXDist+sqYDist);

    return finalDist;
}

function Block(x,y,size,color){
    this.x = x;
    this.y = y;
    this.speedX = (Math.random() > 0.5)? Math.random() + 1:Math.random() * -1 + 1;
    this.speedY = (Math.random() > 0.5)? Math.random() + 1:Math.random() * -2 + 2;
    this.size = size;
    this.color = color;
    this.selectable = true;
    this.selected = false;

    this.draw = () => {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.interact = () => {
        // Code for activating/selecting a block on mouse click

        // First check wether the block is already selected or not. If not, enable the user to click in the block to select it.
        if(!this.selected && this.selectable){
            // Check wether the cursor is within the bounds of the block
            if(getDistance(mouse.x,this.x,mouse.y,this.y) < this.size){
                // this.color = "Red";
                this.selected = true; //Select the currently clicked block
                
                
                //Nullify the stored mouse coords. 
                mouse = {
                    x:null,
                    y:null
                }


                // Disable other blocks from being selected
                blocksArray.forEach(block => {
                    if(block !== this){
                        block.selectable = false;
                    }
                })
            }
        }else if(this.selected){
            // Deselect the block if cursor is clicked outside the block.
            if(mouse.x != null && mouse.y != null){
                if((mouse.x < this.x || mouse.x > this.x+this.size) || (mouse.y < this.y || mouse.y > this.y + this.size)){
                    this.selected = false;
                    // this.color = "green";

                    blocksArray.forEach(block=>block.selectable = true)
                }
            }

            // Else move the currently selected block
            if(kc == "right"){
                this.x += this.speedX; //Moves the block in right direction
            }
            else if(kc == "left"){
                this.x -= this.speedX; //Moves the block in left direction
            }
            else if(kc == "up"){
                this.y -= this.speedY; //Moves the block in up Direction
            }
            else if(kc == "down"){
                this.y += this.speedY; //Moves the block in bottom direction
            }
        }
    }

    this.collisions = () => {
        blocksArray.forEach(b => {
            if(b !== this){
                let range = getDistance(b.x,this.x,b.y,this.y);
                if(range < this.size*2){
                    // b.color = "blue"
                    this.x = Math.floor((Math.random() * (canvas.width - 100) + 10));
                    this.y = Math.floor((Math.random() * (canvas.height - 50) + 10));

                    // this.color = "red"
                }else if(range < 150){
                    ctx.beginPath();
                    ctx.moveTo(this.x,this.y);
                    ctx.lineTo(b.x,b.y);
                    ctx.strokeStyle = "rgba(012,180,255,0.1)"
                    ctx.stroke()
                }
            }
        })
    }

    this.update = () => {
        this.x += this.speedX;
        if(this.x+this.size > innerWidth || this.x-this.size < 0){
            this.speedX = -this.speedX;
        }

        this.y += this.speedY;
        if(this.y - this.size < 0 || this.y + this.size > innerHeight){
            this.speedY = -this.speedY;
        }
        // Draw out the block
        this.draw();
        // Move the block
        this.interact();

        // Check for collisions
        this.collisions()
    }
}

let init = () => {
    let color = "pink"
    if(!blocksArray.length){
        let coords = {
            x:Math.floor((Math.random() * (canvas.width - 100) + 10)),
            y:Math.floor((Math.random() * (canvas.height - 50) + 10))
        }
        blocksArray.push(new Block(coords.x,coords.y,1,color));
        init();
    }else{
        for (let index = 0; index < numberOfBlocks-1; index++) {
            let coords = {
                x:Math.floor((Math.random() * (canvas.width - 100) + 10)),
                y:Math.floor((Math.random() * (canvas.height - 50) + 10))
            }
            
            blocksArray.push(new Block(coords.x,coords.y,1,color));

        }
    }
}

let animate = function(){
    requestAnimationFrame(animate);
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fill();
    ctx.fillRect(0,0,innerWidth,innerHeight);
    blocksArray.forEach(block=>{
        block.update();
    })
}

init()

animate()








// Formula for calculating distance between two points, (PYTHAGOREAN THEORAM)

// xDist = x2-x1
// yDist = y2-y1
// sqXDist = Math.pow(xDist,2)
// sqYDist = Math.pow(yDist,2)
// Math.sqrt(sqXdist+sqYdist)



// coords.x + 20 >= b.x - 20 && coords.x - 20 <= b.x + 20 && coords.y + 20 >= b.y - 20 && coords.y - 20 <= b.y + 20