define([
	'system/view',
	'tpl!system/tpl/application',

	'css!system/css/basic',
	'css!system/css/application'
],
function(View, applicationTemplate) {
	var global = this;

	var Application = function(appname) {
		this.$el = applicationTemplate({
			appname: appname
		});

		$(document).ready((function(){
			this.init();
		}).bind(this));
	};

	Application.prototype = Object.create(View.prototype);

	Application.prototype.init = function () {
		this.$el.hide();

		// Prevent from scrolling when fullscreen
		$(document.body).on('touchmove', function (e) {
			e.preventDefault();
		});

		this.render();
	};

	Application.prototype.render = function () {
		$('body').append(this.$el);
		this.$el.show();
	};

	return Application;
});