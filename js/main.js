$(document).ready(function(){

//var
var $slides	= $('.slide'),
	currentSlide = 0,
	next = false,
	slideWidth = $slides.width(),
	slideLength = $slides.length,
	restOfSlides = $slides.filter(':gt(0)');

//ini
function ini() {
	TweenLite.set(restOfSlides, {left:slideWidth});
	//delayNext();
	bts();
}

//slides animation
function delayNext() {
	TweenLite.delayedCall(4, nextSlide);
}

function nextSlide() {
	next = true;
	moveSlide();

	if (currentSlide < slideLength - 1) currentSlide++;
	else currentSlide = 0;

	TweenLite.fromTo( $slides.eq(currentSlide), 1, {left: slideWidth}, {left:0} );
	//delayNext();
}

function prevSlide() {
	next = false;
	moveSlide();

	if (currentSlide < slideLength - 1) currentSlide--;
	else currentSlide = 0;

	TweenLite.fromTo( $slides.eq(currentSlide), 1, {left: -slideWidth}, {left:0} );
}

function moveSlide() {
	if (next) {
		TweenLite.to( $slides.eq(currentSlide), 1, {left:-slideWidth} );
	}
	else {
		TweenLite.to( $slides.eq(currentSlide), 1, {left: slideWidth} );
	}

}

//bts
function bts() {
	$('.left').click(function(){
		nextSlide();
	});

	$('.right').click(function(){
		prevSlide();
	});
}

ini();

});
