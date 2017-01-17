$(document).ready(function(){

//var
var $container = $('#container'),
	$slides	= $('.slide'),
	first,
	next = false,
	time = 1,
	isMoving = false,
	delayInterval,
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
	playDelayNext();
	//console.log(restOfArr);
}

//slides auto animation delay
function autoPlay() {
	nextSlide();
}

function playDelayNext() {
	delayInterval = setInterval(autoPlay, 3000);
}

function stopDelayNext() {
	clearInterval(delayInterval);
}

//ordena elements abans o després de fer l'animació
function orderItems() {
	if (next) {
		TweenLite.delayedCall(time, function(){
			isMoving = false;
			first = $slides.filter(':nth-child(1)');
			TweenLite.set(first, {left:lastPos});
			first.appendTo($container);
			stopDelayNext();
			playDelayNext();
		});
	}
	else {
		last = $slides.filter(':nth-child('+slideLength+')');
		TweenLite.set(last, {left:firstPos});
		last.prependTo($container);
		TweenLite.delayedCall(time, function(){
			stopDelayNext();
			playDelayNext();
		});
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
		//next
		if (next) {
			TweenLite.to( slidesOrder, time, {left:restOfArr[i-1]} );
			if (i == 1) console.log('RIGHT >>');
		}
		//prev
		else {
			TweenLite.to( slidesOrder, time, {left:restOfArr[i], onComplete:function(){
				isMoving = false;
				}
			});
			if (i == 1) console.log('<< LEFT');
		}
	});
}

//bts
function bts() {
	$('.bt').click(function(){
		//next
		if ( $(this).hasClass('right') ) {
			stopDelayNext();
			if (!isMoving) nextSlide();
		}
		//prev
		else {
			stopDelayNext();
			if (!isMoving) prevSlide();
		}
	});
}

ini();

});
