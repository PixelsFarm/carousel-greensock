$(document).ready(function(){

    var $slides	= $('.slide');
    var currentSlide = 0;
	var slideWidth = $slides.width();
	var slideLength = $slides.length;
	console.log(slideWidth);

	TweenLite.set($slides.filter(":gt(0)"), {left:slideWidth});
	TweenLite.delayedCall(4, nextSlide);

	function nextSlide() {
		TweenLite.to( $slides.eq(currentSlide), 1, {left:-slideWidth} );

		if (currentSlide < slideLength - 1) currentSlide++;
		else currentSlide = 0;

		TweenLite.fromTo( $slides.eq(currentSlide), 1, {left: slideWidth}, {left:0} );
		TweenLite.delayedCall(4, nextSlide);
	}
	
});
