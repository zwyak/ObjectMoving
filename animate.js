var svg = document.getElementById("svgMap");
var coords = [];
var anim = true;

var svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');
svgimg.setAttributeNS(null,'id','catAnim');
svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href', 'cat.svg');
svgimg.setAttributeNS(null,'x','0');
svgimg.setAttributeNS(null,'y','0');
svgimg.setAttributeNS(null, 'visibility', 'visible');
svg.append(svgimg);

var cat = svg.getElementById("catAnim");
var step = 0;
var forward = true;
var path = document.querySelector('.field1');
var paths = document.getElementsByClassName('field1');
var points = "";
var direction = true;
var counter = 0;
var curveLength;
var animLength = 3000; //Pause Time

createCurve();

if (!$('.start-butt').is('[disabled=disabled]') ){
	$('.pause-butt').prop('disabled', true);
	$('.start-butt-next').prop('disabled', true);
}

function stopAnim(){
	anim = false;
	if (anim) requestAnimationFrame(myMove.moveStar);
}

function nextAnim(){
	anim = true;
	if (anim) requestAnimationFrame(myMove.moveStar);
}

function myMove() {

	$('.start-butt').prop('disabled', true);
	$('.pause-butt').prop('disabled', false);
	$('.start-butt-next').prop('disabled', false);

	function pause(){
	    anim = true;
			$(".discr").fadeOut();
			if (anim) requestAnimationFrame(moveStar);
	}

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

		for (var i = 0; i < coords.length; i++) {
			if (Math.round(getTranslate(cat).x) == (Math.round(coords[i].x) - 35) &&  Math.round(getTranslate(cat).y) == (Math.round(coords[i].y) - 15)){
				anim = false;
				$(".discr").html(coords[i].data);
				$(".discr").fadeIn();
				setTimeout(pause, animLength);
			}
		}

		var p1, p2;
		p1 = svg.getElementById('polyline').getPointAtLength(counter * curveLength).x - 35;
		p2 = svg.getElementById('polyline').getPointAtLength(counter * curveLength).y - 15;
		cat.setAttribute("transform",`translate( ${p1} , ${p2} )`);

		if (anim) requestAnimationFrame(moveStar);
	}

  myMove.moveStar = moveStar;
	if (anim) requestAnimationFrame(moveStar);
}


function getTranslate(myElement) {
  var style = window.getComputedStyle(myElement);
  var matrix = new WebKitCSSMatrix(style.webkitTransform);
  return { x: matrix.m41, y: matrix.m42 };
}

function createCurve(){
	for (var i = 0; i < paths.length; i++) {
		points += paths[i].getPointAtLength(0).x + ',' +  paths[i].getPointAtLength(0).y + " ";
		coords.push({x: paths[i].getPointAtLength(0).x, y: paths[i].getPointAtLength(0).y, data: paths[i].getAttribute('data-tooltip')});
	}
	cat.setAttribute("transform","translate("+ (coords[0].x - 35)  + "," + (coords[0].y - 15) + ")");

	document.getElementById('polyline').setAttribute('points', points);
	curveLength = svg.getElementById('polyline').getTotalLength();
}
