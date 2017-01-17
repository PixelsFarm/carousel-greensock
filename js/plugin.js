// -------------------------------------------
// Carousel plugin
// Todo: speed, delay & selector 
// -------------------------------------------
(function($) {
	$.fn.carousel = function(selector,settings) {
		//_default settings__
		var config = {
			'speed': 1,
			'delay': 3000
		};

		//_user input options__
		if (settings) $.extend(config,settings);

		//_vars__
		var $container = $('#container'),
			$slides	= $('.slide'),
			slideWidth = $slides.width(),
			slideLength = $slides.length,
			restOfSlides,
			restOfSlidesPos,
			restOfArr = [-slideWidth],
			slidesOrder,
			firstPos,
			lastPos,
			firstItem,
			delayInterval,
			next = false,
			isMoving = false;
			speed = config.speed,
			delayTime = config.delay;

		//_ini__
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
			if (!isMoving) playDelayNext();
			//console.log(restOfArr);
		} ini();

		//_buttons__
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

		//_auto play__
		function autoPlay() {
			nextSlide();
		}

		function playDelayNext() {
			delayInterval = setInterval(autoPlay, delayTime);
		}

		function stopDelayNext() {
			clearInterval(delayInterval);
		}

		//_move slides__
		function orderItems() {
			if (next) {
				//after animation
				TweenLite.delayedCall(speed, function(){
					isMoving = false;
					firstItem = $slides.filter(':nth-child(1)');
					TweenLite.set(firstItem, {left:lastPos});
					firstItem.appendTo($container);
					stopDelayNext();
					playDelayNext();
				});
			}
			else {
				last = $slides.filter(':nth-child('+slideLength+')');
				TweenLite.set(last, {left:firstPos});
				last.prependTo($container);
				//after animation
				TweenLite.delayedCall(speed, function(){
					stopDelayNext();
					playDelayNext();
				});
			}
		}

		function nextSlide() {
			next = true;
			isMoving = true;
			moveSlide();
			orderItems();
		}

		function prevSlide() {
			next = false;
			isMoving = true;
			orderItems();
			moveSlide();
		}

		function moveSlide() {
			$slides.each(function(i){
				i += 1;
				slidesOrder = $slides.filter(':nth-child('+i+')');
				//next
				if (next) {
					TweenLite.to( slidesOrder, speed, {left:restOfArr[i-1]} );
					if (i == 1) console.log('RIGHT >>');
				}
				//prev
				else {
					TweenLite.to( slidesOrder, speed, {left:restOfArr[i], onComplete:function(){
						isMoving = false;
						}
					});
					if (i == 1) console.log('<< LEFT');
				}
			});
		}

		return this;
	};
})(jQuery);
