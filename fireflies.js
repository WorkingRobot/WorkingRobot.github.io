var flies = [];
var con, canvas;
var lBtnClicks = 0;
var mousePositions = [];
var mouseIter = 0;
var mousePosX, mousePosY;
var validHues = [0, 30, 60, 120, 180, 240, 270, 300];
window.onload = function() {
    canvas = document.getElementById("fireflies");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    con = canvas.getContext('2d');
    document.body.onmouseup = function(event) {
        if (event.button == 0) {
            lBtnClicks++;
        }
    }
    document.body.onmousemove = function(event) {
        mousePositions[mouseIter] = [event.clientX, event.clientY];
        mouseIter++;
        mouseIter %= 100;
    }

    for (var i = 0; i < 100; i++) {
        flies[i] = new Fly(con, canvas, i, validHues[i%validHues.length]);
    }
    setInterval(draw, 10);
}

function draw() {
    con.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < 100; i++) {
        flies[i].draw();
    }
}

class Fly {
    constructor(con, canvas, ind, hue) {
        this.con = con;
        this.canvas = canvas;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.xvel = Math.random() * 0.5 - 0.25;
        this.yvel = Math.random() * 0.5 - 0.25;
        this.fade = Math.random();
        this.fadeSpeed = 0.003 * (Math.random() >= 0.5 ? 1 : -1);
        this.ind = ind;
        this.travelSpeed = Math.random() * 900 + 100;
        this.hue = hue;
        this.r = 10;
    }
    move() {
        if (lBtnClicks >= 3) {
            var xD = this.x - mousePositions[this.ind][0];
            var yD = this.y - mousePositions[this.ind][1];
            var xDir = xD / this.canvas.width / 2 + 0.5;
            var yDir = yD / this.canvas.height / 2 + 0.5;
            var speed = Math.sqrt(xDir ** 2 + yDir ** 2);
            this.xvel = (xDir - 0.5) / -speed * this.travelSpeed;
            this.yvel = (yDir - 0.5) / -speed * this.travelSpeed;
        }
        else {
            if (this.x > this.canvas.width || this.x < 0) {
                this.xvel *= -1;
            }
            if (this.y > this.canvas.height || this.y < 0) {
                this.yvel *= -1;
            }
        }
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
    }
    draw() {
        this.move();
        this.con.beginPath();
        this.con.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.con.closePath();
        var grd = this.con.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        grd.addColorStop(0, "hsla("+this.hue+", 100%, "+(lBtnClicks >= 5 ? "5" : "10")+"0%, "+this.fade+")");
        grd.addColorStop(1, "rgba(0, 0, 0, 0)");
        this.con.fillStyle = grd;
        this.con.fill();
    }
}
