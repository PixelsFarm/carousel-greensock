$(document).ready(function(){

//var
var $container = $('#container'),
	$slides	= $('.slide'),
	first,
	next = false,
	time = 1,
	isMoving = false,
	slideWidth = $slides.width(),
	slideLength = $slides.length,
	restOfSlides,
	restOfSlidesPos,
	restOfArr = [-slideWidth],
	slidesOrder,
	firstPos,
	lastPos;


//ini
function ini() {
	//posiciona elements al iniciar
	$slides.each(function(rest) {
		rest += 1;
		slidesOrder = $slides.filter(':nth-child('+rest+')');
		restOfSlidesPos = slideWidth * (rest-1);
		restOfArr.push(restOfSlidesPos);
		TweenLite.set(slidesOrder, {left: restOfArr[rest]});
	});

	firstPos = restOfArr[0];
	lastPos = restOfArr[restOfArr.length - 1];
	bts();
	console.log(restOfArr);
}

//slides animation
function delayNext() {
	TweenLite.delayedCall(4, nextSlide);
}

//ordena elements abans o després de fer l'animació
function orderItems() {
	if (next) {
		TweenLite.delayedCall(time, function(){
			isMoving = false;
			first = $slides.filter(':nth-child(1)');
			TweenLite.set(first, {left:lastPos});
			first.appendTo($container);
		});
	} else {
		last = $slides.filter(':nth-child('+slideLength+')');
		TweenLite.set(last, {left:firstPos});
		last.prependTo($container);
		console.log('reordena after last')
	}
}

//next
function nextSlide() {
	next = true;
	isMoving = true;
	moveSlide();
	orderItems();
}

//prev
function prevSlide() {
	next = false;
	isMoving = true;
	orderItems();
	moveSlide();
}

//animacio slide
function moveSlide() {
	$slides.each(function(i){
		i += 1;
		slidesOrder = $slides.filter(':nth-child('+i+')');
		if (next) {
			TweenLite.to( slidesOrder, time, {left:restOfArr[i-1]} );
			console.log('<< LEFT');
		}
		else {
			TweenLite.to( slidesOrder, time, {left:restOfArr[i], onComplete:function(){
				isMoving = false;
				}
			});
			console.log('RIGHT >>');
		}
	});
}

//bts
function bts() {
	$('.left').click(function(){
		if (!isMoving) nextSlide();
	});

	$('.right').click(function(){
		if (!isMoving) prevSlide();
	});
}

ini();

});
