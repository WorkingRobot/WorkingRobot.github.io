window.onload = function(){
    var canvas = document.getElementById("fireflies");
    var con = canvas.getContext('2d');
    var flies = [];
    for (var i = 0; i < 50; i++) {
        flies[i] = new Fly(con);
    }
}
