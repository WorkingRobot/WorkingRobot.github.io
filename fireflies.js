var flies = [];
var con, canvas;
window.onload = function(){
    canvas = document.getElementById("fireflies");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    con = canvas.getContext('2d');
    for (var i = 0; i < 50; i++) {
        flies[i] = new Fly(con, canvas, canvas);
    }
    setInterval(draw, 10);
}

function draw() {
    con.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < 50; i++) {
        flies[i].draw();
    }
}

class Fly {
    constructor(con, canvas) {
        this.con = con;
        this.canvas = canvas;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.xvel = Math.random() * 0.5 - 0.25;
        this.yvel = Math.random() * 0.5 - 0.25;
        this.fade = Math.random();
        this.fadeSpeed = 0.001;
        this.r = 10;
    }
    move() {
        this.x += this.xvel;
        this.y += this.yvel;
        this.fade += this.fadeSpeed;
        if (this.fade < 0) {
            this.xvel = Math.random() * 0.5 - 0.25;
            this.yvel = Math.random() * 0.5 - 0.25;
        }
        if (this.fade < 0 || this.fade > 1) {
            this.fadeSpeed *= -1;
        }
        if (this.x > this.canvas.width || this.x < 0) {
            this.xvel *= -1;
        }
        if (this.y > this.canvas.height || this.y < 0) {
            this.yvel *= -1;
        }
    }
    draw() {
        this.move();
        this.con.beginPath();
        this.con.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.con.closePath();
        var grd = this.con.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        grd.addColorStop(0, "rgba(255, 255, 255, "+this.fade+")");
        grd.addColorStop(1, "rgba(0, 0, 0, 0)");
        this.con.fillStyle = grd;
        this.con.fill();
    }
}
