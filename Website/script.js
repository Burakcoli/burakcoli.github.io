canvas = document.getElementById("shapes");
ctx = canvas.getContext("2d");

var wh = window.innerHeight;
var ww = window.innerWidth;

canvas.width = ww;
canvas.height = wh;

canvas.style.background = (27, 27, 27);

window.addEventListener("resize", function(){
    ww = this.window.innerWidth;
    wh = this.window.innerHeight;
})

function Circle(x, y, r){
    this.x = x;
    this.y = y;
    this.r = r;
    this.xDiff = Math.random() * 5;
    this.yDiff = Math.random() * 5;

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.strokeStyle = "purple";
        ctx.stroke();
    }

    this.update = function(){
        this.x += this.xDiff;
        this.y += this.yDiff;
        
        if (this.x + this.r >= ww || this.x - this.r <= 0){
            this.xDiff *= -1;
        }
        if (this.y + this.r >= wh || this.y - this.r <= 0){
            this.yDiff *= -1;
        }
    }
}

function Rectangle(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.xDiff = Math.random() * 5;
    this.yDiff = Math.random() * 5;

    this.draw = function(){
        ctx.fill
        ctx.strokeRect(this.x, this.y, this.w, this.h);
    }

    this.update = function(){
        this.x += this.xDiff;
        this.y += this.yDiff;

        if (this.x + this.w >= ww || this.x <= 0){
            this.xDiff *= -1;
        }
        if (this.y + this.h >= wh || this.y <= 0){
            this.yDiff *= -1;
        }
    }
}

function XShape(x, y, size){
    this.x = x;
    this.y = y;
    this.size = size;
    this.xlen = 0, this.ylen = 0;
    this.xDiff = Math.random() * 5;
    this.yDiff = Math.random() * 5;

    this.draw = function(){
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.moveTo(this.x, this.y);
        let angle = Math.PI / 4;

        let newX = this.x + Math.cos(angle) * this.size;
        let newY = this.y + Math.sin(angle) * this.size;
        this.xlen = Math.abs(newX - this.x)
        this.ylen = Math.abs(newY - this.y)

        ctx.lineTo(newX, newY);
        ctx.moveTo(newX, this.y);
        ctx.lineTo(this.x, newY);
        ctx.stroke();

    }

    this.update = function(){
        this.x += this.xDiff;
        this.y += this.yDiff;

        if (this.x + this.xlen >= ww || this.x <= 0){
            this.xDiff *= -1;
        }
        if (this.y + this.ylen >= wh || this.y <= 0){
            this.yDiff *= -1;
        }
    }
}

function Triangle(x, y, size){
    this.x = x;
    this.y = y;
    this.size = size;
    this.xDiff = Math.random() * 5;
    this.yDiff = Math.random() * 5;

    this.draw = function(){
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.size, this.y);
        ctx.lineTo(this.x + this.size / 2, this.y - this.size);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    }

    this.update = function(){
        this.x += this.xDiff;
        this.y += this.yDiff;

        if (this.x + this.size >= ww || this.x <= 0){
            this.xDiff *= -1;
        }
        if (this.y - this.size >= wh || this.y <= 0){
            this.yDiff *= -1;
        }
    }
}

var triangle = new Triangle(100, 100, 100);
var xShape   = new XShape(100, 100, 150);
var circle   = new Circle(100, 100, 60);
var rect     = new Rectangle(100, 200, 100, 100);

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, ww, wh);

    triangle.update();
    xShape.update();
    rect.update();
    circle.update();

    triangle.draw();
    xShape.draw();
    rect.draw();
    circle.draw();
}

animate();
