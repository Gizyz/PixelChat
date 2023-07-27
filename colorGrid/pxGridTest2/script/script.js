const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");



class Canvas {
    cWidth;
    cHeight;
    pxSize;
    mPos = {};
    
    constructor(cWidth, cHeight, pxSize) {
        this.cWidth = cWidth;
        this.cHeight = cHeight;
        this.pxSize = pxSize;
    }

    canvasInit() {
        console.log(`canvas width: ${this.cWidth} || canvas height: ${this.cHeight}`)
        canvas.width = this.cWidth;
        canvas.height = this.cHeight;
        


        for (let y=0; y < this.cHeight/this.pxSize; y++) {
            for (let x=0; x < this.cWidth/this.pxSize; x++) {
                ctx.fillStyle = `rgb(${Math.sin(x/y)*255},${Math.sin(y/x)*255},${x-y})`;

                ctx.fillRect(x*this.pxSize, y*this.pxSize, this.pxSize, this.pxSize);
            }
        }
    }

    draw() {
        console.log(this.pxRemainder)
    }
};


const c = new Canvas(700, 700, 240);

c.canvasInit();

canvas.addEventListener("click", c.draw());
