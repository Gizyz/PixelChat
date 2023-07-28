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

    async canvasInit() {
        console.log(`canvas width: ${this.cWidth} || canvas height: ${this.cHeight}`)        
        canvas.width = this.cWidth;
        canvas.height = this.cHeight;


    }

    draw() {

    }

    update(t) {
        let r, g, b = 0;
        let tm = Math.sin(t)
        console.log(tm)


        for (let y=0; y < this.cHeight/this.pxSize; y++) {
            r = tm*y*3;
            g = -tm*y*3;




            for (let x=0; x < this.cWidth/this.pxSize; x++) {

                b = (Math.cos(t+Math.tan(x*t*y)))*255;


                ctx.fillStyle = `rgb(${r},${g},${b})`;
                ctx.fillRect(x*this.pxSize, y*this.pxSize, this.pxSize, this.pxSize);
            }
        }
    }
};


const c = new Canvas(100, 100, 1);
c.canvasInit();

let t=0;
window.setInterval(() => {t+=0.1; c.update(t)}, 100);

let run = true;

