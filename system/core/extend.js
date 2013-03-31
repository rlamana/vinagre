/**
 * Object extend functionality.
 * Encapsulated from jQuery, underscore, or any general library
 * implementing this natural but not yet standard method.
 */
define(['$'], function($){
	return function (target) {
		Array.prototype.slice.call(arguments, 1).forEach(function(source) {
			Object.keys(source).forEach(function(key) {
				var descriptor = Object.getOwnPropertyDescriptor(source, key);
				Object.defineProperty(target, key, descriptor);
			});
		});
		return target;
	};
});