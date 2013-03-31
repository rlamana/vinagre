
define(['$', 'Underscore'], function($, _) {
	var splitter = /^(?:(.*)\s)?(\w+)$/;

	var transitionEventNames = "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd";
	var animationEventNames = "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd";

	// CSS3 transform, transition, animation hooks, prefixless
	var hooks = ['transform', 'transition', 'animation', 'transform-origin'];
	for(var i=hooks.length;i--;) {
		(function(property) {
			$.cssHooks[property] = {
				get: function( elem, computed, extra ) {
					return null;
				},
				set: function(elem, value) {
					elem.style['-webkit-'+property] = value;
					elem.style['-moz-'+property] = value;
					elem.style['-ms-'+property] = value;
					elem.style['-o-'+property] = value;
					elem.style[property] = value;
				}
			};
		})(hooks[i]);
	}

	// Display to support flex box
	$.cssHooks['display'] = {
		get: function( elem, computed, extra ) {
			return computed;
		},
		set: function(elem, value) {
			if(value === 'flex') {
				elem.style[property] = '-webkit-flex';
				elem.style[property] = '-moz-flex';
				elem.style[property] = '-ms-flex';
				elem.style[property] = '-o-flex';
				elem.style[property] = 'flex';

				// Old draft w3c specification
				elem.style[property] = '-webkit-box';
				elem.style[property] = '-moz-box';
				elem.style[property] = '-ms-box';
				elem.style[property] = '-o-box';
				elem.style[property] = 'box';
			}

			elem.style[property] = value;
		}
	};

	/**
	 * Extend $ object with methods to connect 
	 * dom events with Driver listeners
	 */
	$.fn.extend({
		listen: function (map, scope) {
			_.each(map, function(handler, key) {
				var data = key.match(splitter);
				var selector = data[1];
				var event = data[2];

				if (typeof handler === 'string')
					handler = scope[handler];

				if (!handler)
					throw new Error('Handler not found');

				if (selector)
					this.on(event, selector, handler.bind(scope));
				else
					this.on(event, handler.bind(scope));
			}, this);

			return this;
		},

		onTransitionEnd: function (callback, scope) {
			this.one(transitionEventNames, function() {
				callback.apply(scope||this);
			});
		},

		onAnimationEnd: function (callback, scope) {
			this.one(animationEventNames, function() {
				callback.apply(scope||this);
			});
		}
	});

	return $;
});
