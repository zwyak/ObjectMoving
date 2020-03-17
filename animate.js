var svg = document.getElementById("svgMap");

var svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');
svgimg.setAttributeNS(null,'id','catAnim');
svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href', 'cat.svg');
svgimg.setAttributeNS(null,'x','0');
svgimg.setAttributeNS(null,'y','0');
svgimg.setAttributeNS(null, 'visibility', 'visible');
svg.append(svgimg);

var cat = svg.getElementById("catAnim");
var point;
var step = 0;
var forward = true;
var x, y;
var path = document.querySelector('.field1');
var paths = document.getElementsByClassName('field1');
var points = "";
var direction = true;
var counter = 0;
var ct = cat.offsetTop, cl = cat.offsetLeft;


function createCurve(){
	for (var i = 0; i < paths.length; i++) {
		points += paths[i].getPointAtLength(0).x + ',' +  paths[i].getPointAtLength(0).y + " ";
	}
	document.getElementById('polyline').setAttribute('points', points);
}

createCurve();

var curveLength = svg.getElementById('polyline').getTotalLength()

function myMove() {

	function moveStar() {
	if (parseInt(counter, 10) === 1) {
		direction = false;
	} else if (parseInt(counter, 10) < 0) {
		direction = true;
	}

	if (direction) {
		counter += 0.003;
	} else {
		counter -= 0.003;
	}

	cat.setAttribute("transform","translate("+ (svg.getElementById('polyline').getPointAtLength(counter * curveLength).x - 35)  + "," + (svg.getElementById('polyline').getPointAtLength(counter * curveLength).y -15) + ")");
	requestAnimationFrame(moveStar);
}

	requestAnimationFrame(moveStar);
}

// var myProcess;

// function start.onclick(){
// 	myProcess = setInterval ( Move(), 5000)
// }

// function pause.onclick(){
// 	clearInterval(myproc);
// }



function CurveMove(id, coordX, coordY, time){
	if (!id){
		return null;
	}

	if (!coordX){
		coordX = "x";
	}

	if (!coordY){
		coordY = "y";
	}

	if (!time){
		time = 100;
	}


	var x = 0;
	setInterval(Move("+ id +" , " + coordX +", "+ coordY +", "+ time +"));
}


function Move(id, coordX, coordY){
	x++;

	document.all[id].style.top = eval(coordX);
	document.all[id].style.length = eval(coordY);
}



// 	<script>

// function SVGPath(path) {

//     this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

//     this.path.setAttribute('d', path);

//     this.length = this.path.getTotalLength();

// }

// SVGPath.prototype.follow = function(duration, onprogress) {

//     var path = this.path, length = this.length, start = performance.now();

//     requestAnimationFrame(function step(now) {

//         var progress = (now - start) / duration;

//         if (progress > 1) progress = 1;

//         onprogress(path.getPointAtLength(length * progress));

//         if (progress < 1) requestAnimationFrame(step);

//     });

// };



// var ctx = document.querySelector('canvas').getContext('2d');



// var route = new SVGPath('M10 80 Q 52.5 10, 95 80 T 180 80');



// route.follow(10000, function(point) {

//     ctx.clearRect(0, 0, 300, 150);

//     ctx.beginPath();

//     ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI);

//     ctx.fill();

// });

// </script>
