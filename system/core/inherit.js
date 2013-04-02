
define(function(){
	'use strict';

	function inherit() {
		var obj = {};
		Array.prototype.slice.call(arguments, 0).forEach(function(source) {
			Object.keys(source).forEach(function(key) {
				var descriptor = Object.getOwnPropertyDescriptor(source, key);
				Object.defineProperty(obj, key, descriptor);
			});
		});
		return obj;
	}

	return inherit;
});