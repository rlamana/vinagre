
define(function(){
	'use strict';

	function inject(target) {
		Array.prototype.slice.call(arguments, 1).forEach(function(source) {
			Object.keys(source).forEach(function(key) {
				var descriptor = Object.getOwnPropertyDescriptor(source, key);
				Object.defineProperty(target, key, descriptor);
			});
		});
		return target;
	}

	return inject;
});