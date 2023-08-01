const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");



class Canvas {
    cWidth;
    cHeight;
    pxSize;
    mPos;
    rgb;    
    constructor(cWidth, cHeight, pxSize) {
        this.cWidth = cWidth;
        this.cHeight = cHeight;
        this.pxSize = pxSize;
        this.rgb = {r: 0, g: 0, b:0};
        this.mPos = {x: 0, y: 0};

    }

    canvasInit(e) {
        console.log(`canvas width: ${this.cWidth} || canvas height: ${this.cHeight}`)        
        canvas.width = this.cWidth;
        canvas.height = this.cHeight;
        this.canvasW = parseInt(getComputedStyle(canvas).width.replace('px',''));
        this.canvasH = parseInt(getComputedStyle(canvas).height.replace('px',''));

        ctx.fillStyle = `rgb(0,0,0)`;
        ctx.fillRect(0,0, this.canvasW, this.canvasH);

        let img = new Image();
        img.src=getCanvas(e);
        console.log(getCanvas(e))
        ctx.drawImage(img,0,0);
        }
    mMove(e) {      
        let x = Math.trunc((e.clientX - ((window.innerWidth - this.canvasW)/2))/(this.canvasW/this.cWidth))
        let y = Math.trunc((e.clientY - ((window.innerHeight - this.canvasH)/2))/(this.canvasH/this.cHeight))

        this.mPos = {x:  x, y: y}
        //console.log(this.mPos)
    }
    draw() {
        this.rgb = {r: 255, g: 255, b: 255}

        ctx.fillStyle = `rgb(${this.rgb.r},${this.rgb.g},${this.rgb.b})`;
        ctx.fillRect(this.mPos.x,this.mPos.y, this.pxSize,this.pxSize);

    }

    update(t) {
        this.rgb.b = 255;

        let tm = Math.sin(t)

        for (let y=0; y < this.cHeight/this.pxSize; y++) {
            for (let x=0; x < this.cWidth/this.pxSize; x++) {


                ctx.fillStyle = `rgb(${this.rgb.r},${this.rgb.g},${this.rgb.b})`;
                ctx.fillRect(x*this.pxSize, y*this.pxSize, this.pxSize, this.pxSize);
            }
        }
    }
};


const baseUrl = 'http://localhost:3000/postPull'

async function getCanvas(e) {
    e.preventDefault();
    const res = await fetch(baseUrl)
        .then((response) => {
            
        })
        .then((data) => {
            console.log(data);
        })

    
}

async function postCanvas(e) {
    e.preventDefault();
    let canvasUrl = canvas.toDataURL("image/jpeg", 1.0);
    let data = {
        timestamp: Date.now(),
        data: canvasUrl
      }
      
      let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8'
        })
      }
      
    fetch(baseUrl, fetchData)
    .then(() => {

    });

}


const c = new Canvas(20, 20, 1);

window.addEventListener("load", (e) => {c.canvasInit(e)});
window.addEventListener("resize", (e) => {c.canvasInit(e)})
window.addEventListener("mousemove", (e) => {c.mMove(e)})
window.addEventListener("click", (e) => {c.draw(); postCanvas(e);})

