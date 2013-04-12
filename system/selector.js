
define(function(require) {
	'use strict';

	var splitter = /^(?:(.*)\s)?(\w+)$/;

	var $ = require('$');
	var _ = require('Underscore');

	var transitionEventNames = 'webkitTransitionEnd oTransitionEnd MSTransitionEnd';
	var animationEventNames = 'webkitAnimationEnd oAnimationEnd MSAnimationEnd';

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
