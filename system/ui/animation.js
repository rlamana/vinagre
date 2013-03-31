define([
	'system/selector',

	'css!system/ui/css/animation'
],
function($) {
	var transitionEventNames = "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd";
	var animationEventNames = "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd";

	var Animation = function() {
	};

	Animation.prototype = {
	};

	/**
	 * This will play animations defined in animation.less using CSS3
	 * on the element given.
	 */
	Animation.play = function(animationName, element, done, scope) {
		var $element = (element instanceof Element) ? $(element) : element;
		$element.addClass('animated ' + animationName);
		$element.one(animationEventNames, function() {
			$element.removeClass('animated ' + animationName);

			if(done)
				done.apply(scope||$element);
		});
	};

	Animation.repeat = function(animationName, element) {
		var $element = (element instanceof Element) ? $(element) : element;
		$element
			.addClass('animated ' + animationName)
			.css('-webkit-animation-iteration-count', 'infinite');
	};

	Animation.stop = function(animationName, element) {
		var $element = (element instanceof Element) ? $(element) : element;
		$element
			.removeClass('animated ' + animationName)
			.css('-webkit-animation-iteration-count', 'inherit');
	};

	Animation.turn = function (parentElement, done, scope) {
		var $parent = (parentElement instanceof Element) ? $(parentElement) : parentElement;

		var $children = $parent.find('> *');
		var delay = 0.2, duration = 0.8;

		$parent.css({
			'-webkit-perspective': '400px',
			'-webkit-perspective-origin': '50% 50%'
		});

		$children.css({
			'opacity': 1,
			'-webkit-backface-visibility': 'hidden',
			'-webkit-transition': 'opacity 1s, -webkit-transform '+duration+'s'/*,
			'-webkit-transform-origin': '0 0'*/
		});


		setTimeout((function() {
			$children.each(function(index){
				$(this).css({
					'opacity': 0,
					'-webkit-transform': 'rotate3d(1,0,0,90deg)',
					'-webkit-transition-delay': (delay * index) + 's'
				});
			});

			setTimeout(done.bind(scope), ((delay*$children.length)+duration)*1000);
		})
		.bind(this));

	};

	return Animation;
});