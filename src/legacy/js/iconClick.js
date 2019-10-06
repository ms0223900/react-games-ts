const circle1 = new mojs.Shape({
	className: 'a',
	type: 'circle',
	left: '0',
	top: '-45',
	stroke: '#0766ff',
	strokeWidth: { 35: 0 },
	fill: 'transparent',
	radius: { 0: 40 },
	opacity: 0.2,
	duration: 750,
	easing: mojs.easing.bezier(0, 1, 0.5, 1)
});

const circle2 = new mojs.Shape({
	className: 'a',
	type: 'circle',
	left: '40',
	top: '-60',
	stroke: '#0766ff',
	strokeWidth: { 5: 0 },
	fill: 'transparent',
	radius: { 0: 20 },
	opacity: 0.2,
	duration: 500,
	delay: 100,
	easing: mojs.easing.sin.out
});

const circle3 = new mojs.Shape({
	className: 'a',
	type: 'circle',
	left: '-10',
	top: '-80',
	stroke: '#0766ff',
	strokeWidth: { 5: 0 },
	fill: 'transparent',
	radius: { 0: 10 },
	opacity: 0.5,
	duration: 500,
	delay: 180,
	isRunLess: true,
	easing: mojs.easing.sin.out
});

const circle4 = new mojs.Shape({
	className: 'a',
	type: 'circle',
	left: '-70',
	top: '-10',
	stroke: '#0766ff',
	strokeWidth: { 5: 0 },
	fill: 'transparent',
	radius: { 0: 20 },
	opacity: 0.3,
	duration: 800,
	delay: 240,
	easing: mojs.easing.sin.out
});

const circle5 = new mojs.Shape({
	className: 'a',
	type: 'circle',
	left: '80',
	top: '-50',
	stroke: '#0766ff',
	strokeWidth: { 5: 0 },
	fill: 'transparent',
	radius: { 0: 20 },
	opacity: 0.4,
	duration: 800,
	delay: 240,
	easing: mojs.easing.sin.out
});

const circle6 = new mojs.Shape({
	className: 'a',
	type: 'circle',
	left: '20',
	top: '-100',
	stroke: '#0766ff',
	strokeWidth: { 5: 0 },
	fill: 'transparent',
	radius: { 0: 15 },
	opacity: 0.2,
	duration: 1000,
	delay: 300,
	easing: mojs.easing.sin.out
});

const circle7 = new mojs.Shape({
	className: 'a',
	type: 'circle',
	left: '-40',
	top: '-90',
	stroke: '#0766ff',
	strokeWidth: { 5: 0 },
	fill: 'transparent',
	radius: { 0: 25 },
	opacity: 0.4,
	duration: 600,
	delay: 330,
	easing: mojs.easing.sin.out
});

const trash_timeline = new mojs.Timeline({ speed: 0.5 });

trash_timeline.add(circle1, circle2, circle3, circle4, circle5, circle6, circle7);

var trash_icon = document.querySelectorAll('.trash_icon');
var a = document.querySelectorAll('.a');

for (i = 0; i < trash_icon.length; i++) {
	trash_icon[i].addEventListener('click', function (e) {
		trashClick(e);
	});
}

function trashClick(e){
	
	for (j = 0; j < a.length; j++) {
		// alert(a[j]);
		a[j].style.display = "block";
	}

	const coords = { x: e.pageX, y: e.pageY };
	circle1.tune(coords);
	circle2.tune(coords);
	circle3.tune(coords);
	circle4.tune(coords);
	circle5.tune(coords);
	circle6.tune(coords);
	circle7.tune(coords);
	trash_timeline.replay();

	setTimeout(function () {

		for (j = 0; j < a.length; j++) {
			// alert(a[j]);
			a[j].style.display = "none";
		}

	}, 1000);
}
// --------------------heart_icon-------------------- //

class Heart extends mojs.CustomShape {
	getShape() {
		return '<g><path d="M87.9,10.6c-4.6-4-10.5-6.2-16.6-6.2c-7.1,0-13.9,2.9-18.8,8.1c-0.9,0.9-1.7,1.9-2.5,3C44,7.2,34.1,2.9,24.2,4.9\
              c-8.1,1.5-14.5,6.2-19,13.9C-1.1,29.6-1.6,40.2,3.7,50c2.8,5.3,6.5,10.4,11.3,15.7c8.7,9.7,19,18.9,32.4,28.9c0.9,0.6,1.8,1,2.7,1\
              c1.5,0,2.5-0.8,3-1.2C65,85.3,74.5,77,82.8,68.1c4.6-4.9,9.9-11,13.7-18.6c1.6-3.3,3.5-7.7,3.4-12.6C99.7,26.2,95.7,17.3,87.9,10.6\
              z M90.3,46c-3.4,6.7-8.3,12.3-12.5,16.9C70.1,71.1,61.3,78.8,50,87.4c-12.3-9.3-21.8-17.9-29.9-26.9c-4.3-4.8-7.7-9.5-10.3-14.2\
              c-4.1-7.5-3.6-15,1.4-23.6c3.4-5.8,8.2-9.4,14.3-10.5c1.2-0.2,2.3-0.4,3.5-0.4c7.2,0,13.6,4.2,17.2,11.4l0.6,1.2\
              c0.6,1.3,1.9,1.9,3.2,2c1.3,0,2.6-0.8,3.1-2.1c1.3-2.7,2.6-4.8,4.3-6.6c3.5-3.7,8.5-5.9,13.7-5.9c4.5,0,8.8,1.5,12.1,4.5\
              c6.2,5.4,9.3,12.1,9.5,20.7C92.9,40.3,91.6,43.4,90.3,46z"/>\
              </g>';
	}
	getLength() {
		return 200;
	}
}
mojs.addShape('heart', Heart);

const heart1 = new mojs.Shape({
	shape: 'heart',
	className: 'b',
	type: 'circle',
	left: '0',
	top: '-45',
	stroke: '#f35186',
	strokeWidth: { 5: 0 },
	fill: '#f35186',
	radius: { 0: 40 },
	opacity: 0.2,
	duration: 750,
	easing: mojs.easing.bezier(0, 1, 0.5, 1)
});

const heart2 = new mojs.Shape({
	shape: 'heart',
	className: 'b',
	type: 'circle',
	left: '40',
	top: '-60',
	stroke: '#f35186',
	strokeWidth: { 5: 0 },
	fill: '#f35186',
	radius: { 0: 20 },
	opacity: 0.2,
	duration: 500,
	delay: 100,
	easing: mojs.easing.sin.out
});

const heart3 = new mojs.Shape({
	shape: 'heart',
	className: 'b',
	type: 'circle',
	left: '-10',
	top: '-80',
	stroke: '#f35186',
	strokeWidth: { 5: 0 },
	fill: '#f35186',
	radius: { 0: 10 },
	opacity: 0.5,
	duration: 500,
	delay: 180,
	isRunLess: true,
	easing: mojs.easing.sin.out
});

const heart4 = new mojs.Shape({
	shape: 'heart',
	className: 'b',
	type: 'circle',
	left: '-70',
	top: '-10',
	stroke: '#f35186',
	strokeWidth: { 5: 0 },
	fill: '#f35186',
	radius: { 0: 20 },
	opacity: 0.3,
	duration: 800,
	delay: 240,
	easing: mojs.easing.sin.out
});

const heart5 = new mojs.Shape({
	shape: 'heart',
	className: 'b',
	type: 'circle',
	left: '80',
	top: '-50',
	stroke: '#f35186',
	strokeWidth: { 5: 0 },
	fill: '#f35186',
	radius: { 0: 20 },
	opacity: 0.4,
	duration: 800,
	delay: 240,
	easing: mojs.easing.sin.out
});

const heart6 = new mojs.Shape({
	shape: 'heart',
	className: 'b',
	type: 'circle',
	left: '20',
	top: '-100',
	stroke: '#f35186',
	strokeWidth: { 5: 0 },
	fill: '#f35186',
	radius: { 0: 15 },
	opacity: 0.2,
	duration: 1000,
	delay: 300,
	easing: mojs.easing.sin.out
});

const heart7 = new mojs.Shape({
	shape: 'heart',
	className: 'b',
	type: 'circle',
	left: '-40',
	top: '-90',
	stroke: '#f35186',
	strokeWidth: { 5: 0 },
	fill: '#f35186',
	radius: { 0: 25 },
	opacity: 0.4,
	duration: 600,
	delay: 330,
	easing: mojs.easing.sin.out
});

const heart_timeline = new mojs.Timeline({ speed: 0.5 });

heart_timeline.add(heart1, heart2, heart3, heart4, heart5, heart6, heart7);

var heart_icon = document.querySelectorAll('.heart_icon');
var b = document.querySelectorAll('.b');

for (i = 0; i < heart_icon.length; i++) {
	heart_icon[i].addEventListener('click', function (e) {
		heartClick(e);
	});
}

function heartClick(e){
	
	for (j = 0; j < b.length; j++) {
		// alert(a[j]);
		b[j].style.display = "block";
	}

	const coords = { x: e.pageX, y: e.pageY };
	heart1.tune(coords);
	heart2.tune(coords);
	heart3.tune(coords);
	heart4.tune(coords);
	heart5.tune(coords);
	heart6.tune(coords);
	heart7.tune(coords);
	heart_timeline.replay();

	setTimeout(function () {

		for (j = 0; j < b.length; j++) {
			// alert(a[j]);
			b[j].style.display = "none";
		}

	}, 1000);
}
// --------------------cart_icon-------------------- //

class Start extends mojs.CustomShape {
	getShape() {
		return '<path d="M5.51132201,34.7776271 L33.703781,32.8220808 L44.4592855,6.74813038 C45.4370587,4.30369752 47.7185293,3 50,3 C52.2814707,3 54.5629413,4.30369752 55.5407145,6.74813038 L66.296219,32.8220808 L94.488678,34.7776271 C99.7034681,35.1035515 101.984939,41.7850013 97.910884,45.2072073 L75.9109883,63.1330483 L82.5924381,90.3477341 C83.407249,94.4217888 80.4739296,97.6810326 77.0517236,97.6810326 C76.0739505,97.6810326 74.9332151,97.3551083 73.955442,96.7032595 L49.8370378,81.8737002 L26.044558,96.7032595 C25.0667849,97.3551083 23.9260495,97.6810326 22.9482764,97.6810326 C19.3631082,97.6810326 16.2668266,94.4217888 17.4075619,90.3477341 L23.9260495,63.2960105 L2.08911601,45.2072073 C-1.98493875,41.7850013 0.296531918,35.1035515 5.51132201,34.7776271 Z" />';
	}
	getLength() {
		return 200;
	}
}
mojs.addShape('start', Start);

const start1 = new mojs.Shape({
	shape: 'start',
	className: 'c',
	type: 'circle',
	left: '0',
	top: '-45',
	stroke: '#FD7932',
	fill: '#FD7932',
	strokeWidth: { 5: 0 },
	radius: { 0: 40 },
	opacity: 0.2,
	duration: 750,
	easing: mojs.easing.bezier(0, 1, 0.5, 1)
});

const start2 = new mojs.Shape({
	shape: 'start',
	className: 'c',
	type: 'circle',
	left: '40',
	top: '-60',
	stroke: '#FD7932',
	fill: '#FD7932',
	strokeWidth: { 5: 0 },
	radius: { 0: 20 },
	opacity: 0.2,
	duration: 500,
	delay: 100,
	easing: mojs.easing.sin.out
});

const start3 = new mojs.Shape({
	shape: 'start',
	className: 'c',
	type: 'circle',
	left: '-10',
	top: '-80',
	stroke: '#FD7932',
	fill: '#FD7932',
	strokeWidth: { 5: 0 },
	radius: { 0: 10 },
	opacity: 0.5,
	duration: 500,
	delay: 180,
	isRunLess: true,
	easing: mojs.easing.sin.out
});

const start4 = new mojs.Shape({
	shape: 'start',
	className: 'c',
	type: 'circle',
	left: '-70',
	top: '-10',
	stroke: '#FD7932',
	fill: '#FD7932',
	strokeWidth: { 5: 0 },
	radius: { 0: 20 },
	opacity: 0.3,
	duration: 800,
	delay: 240,
	easing: mojs.easing.sin.out
});

const start5 = new mojs.Shape({
	shape: 'start',
	className: 'c',
	type: 'circle',
	left: '80',
	top: '-50',
	stroke: '#FD7932',
	fill: '#FD7932',
	strokeWidth: { 5: 0 },
	radius: { 0: 20 },
	opacity: 0.4,
	duration: 800,
	delay: 240,
	easing: mojs.easing.sin.out
});

const start6 = new mojs.Shape({
	shape: 'start',
	className: 'c',
	type: 'circle',
	left: '20',
	top: '-100',
	stroke: '#FD7932',
	fill: '#FD7932',
	strokeWidth: { 5: 0 },
	radius: { 0: 15 },
	opacity: 0.2,
	duration: 1000,
	delay: 300,
	easing: mojs.easing.sin.out
});

const start7 = new mojs.Shape({
	shape: 'start',
	className: 'c',
	type: 'circle',
	left: '-40',
	top: '-90',
	stroke: '#FD7932',
	fill: '#FD7932',
	strokeWidth: { 5: 0 },
	radius: { 0: 25 },
	opacity: 0.4,
	duration: 600,
	delay: 330,
	easing: mojs.easing.sin.out
});

const cart_timeline = new mojs.Timeline({ speed: 0.5 });

cart_timeline.add(start1, start2, start3, start4, start5, start6, start7);

var cart_icon = document.querySelectorAll('.cart_icon');
var c = document.querySelectorAll('.c');

for (i = 0; i < cart_icon.length; i++) {
	cart_icon[i].addEventListener('click', function (e) {
		cartClick(e);
	});
}

function cartClick(e){
	
	for (j = 0; j < c.length; j++) {
		// alert(a[j]);
		c[j].style.display = "block";
	}

	const coords = { x: e.pageX, y: e.pageY };
	start1.tune(coords);
	start2.tune(coords);
	start3.tune(coords);
	start4.tune(coords);
	start5.tune(coords);
	start6.tune(coords);
	start7.tune(coords);
	cart_timeline.replay();

	setTimeout(function () {

		for (j = 0; j < c.length; j++) {
			// alert(a[j]);
			c[j].style.display = "none";
		}

	}, 1000);
}
//icon點擊事件

var trashIconList = document.querySelectorAll('.trash_icon');
var heartIconList = document.querySelectorAll('.heart_icon');
var cartIconList = document.querySelectorAll('.cart_icon');
var isSwitch = false;

for (i = 0; i < trashIconList.length; i++) {
	trashIconList[i].addEventListener('click', function () {
		isSwitch = iconSwitch(this, "a", "0766ff", isSwitch);
	});
}

for (i = 0; i < heartIconList.length; i++) {
	heartIconList[i].addEventListener('click', function () {
		isSwitch = iconSwitch(this, "b", "f35186", isSwitch);
	});
}

for (i = 0; i < cartIconList.length; i++) {
	cartIconList[i].addEventListener('click', function () {
		isSwitch = iconSwitch(this, "c", "FD7932", isSwitch);
	});
}

function iconSwitch(obj, animationClass, color, isSwitch) {
	var anClass = document.querySelectorAll('.' + animationClass),
		svg = obj.children[0],
		pathList = obj.children[0].children[0].children;

	svg.style.transition = '0s';
	svg.style.transform = 'scale(0)';

	isSwitch = !isSwitch;

	if (isSwitch) {
		// alert("if true:"+isSwitch);
		for (j = 0; j < anClass.length; j++) {
			anClass[j].style.display = "none";
		}

		for (i = 0; i < pathList.length; i++) {
			svg.style.transition = '0.1s';
			svg.style.transform = 'scale(1)';
			pathList[i].style.fill = "#ddd";
		}
	} else {
		// alert("else:"+isSwitch);
		for (i = 0; i < pathList.length; i++) {

			setTimeout(() => {
				svg.style.transition = '0.3s';
				svg.style.transform = 'scale(1.15)';
			}, 10);

			setTimeout(() => {
				svg.style.transition = '0.1s';
				svg.style.transform = 'scale(0.9)';
			}, 300);

			setTimeout(() => {
				svg.style.transition = '0.1s';
				svg.style.transform = 'scale(1)';
			}, 400);

			pathList[i].style.fill = "#" + color;
		}

		for (j = 0; j < anClass.length; j++) {
			anClass[j].style.display = "block";
		}
	}

	return isSwitch;

}
