const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");
let socket = io();


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

    async canvasInit(e) {
        console.log(`canvas width: ${this.cWidth} || canvas height: ${this.cHeight}`)        
        canvas.width = this.cWidth;
        canvas.height = this.cHeight;
        this.canvasW = parseInt(getComputedStyle(canvas).width.replace('px',''));
        this.canvasH = parseInt(getComputedStyle(canvas).height.replace('px',''));

        ctx.fillStyle = `rgb(0,0,0)`;
        ctx.fillRect(0,0, this.canvasW, this.canvasH);

   
        c.update()
        getCanvas(e);
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

    update() {
        this.rgb = {r:255, g:255, b:255}

        for (let y=0; y < this.cHeight/this.pxSize; y++) {
            for (let x=0; x < this.cWidth/this.pxSize; x++) {
                this.rgb = {r:Math.sin(y)*255, g:Math.sin(x)*255, b:Math.sin(y)*255-40}

                ctx.fillStyle = `rgb(${this.rgb.r},${this.rgb.g},${this.rgb.b})`;
                ctx.fillRect(x*this.pxSize, y*this.pxSize, this.pxSize, this.pxSize);
            }
        }
    }
};


const baseUrl = 'http://localhost:3000/postPull'

async function getCanvas(e) {
    e.preventDefault();
    let res;
    await fetch(baseUrl)
        .then((response) => response.json())
        .then((canvasObj) => {
            img = new Image();
            img.src=canvasObj.canvasUrl;
            ctx.drawImage(img, 0,0);
        });
};

async function postCanvas(e) {
    e.preventDefault();
    let canvasUrl = canvas.toDataURL("image/jpeg", 1);
    let data = {
        timestamp: Date.now(),
        canvasUrl
      }
      
      let fetchData = {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8'
        })
      }
      
    fetch(baseUrl, fetchData).then((response) => response.json())
        .catch((err) => {
            console.log(err)
        });
    
    socket.emit('post', e)
}


const c = new Canvas(200, 200, 4);

window.addEventListener("load", (e) => {c.canvasInit(e)});
window.addEventListener("resize", (e) => {c.canvasInit(e)})
window.addEventListener("mousemove", (e) => {c.mMove(e)})
window.addEventListener("click", (e) => {c.draw(); postCanvas(e);})

socket.on("post", (e) => {
    c.canvasInit(e)
    console.log("post")
});

