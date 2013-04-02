define([
	'system/core/extend',
	'system/view',
	'tpl!system/tpl/application',

	'css!system/css/application'
],
function(extend, View, applicationTemplate) {
	'use strict';

	var Application = function(appname) {
		this.$el = applicationTemplate({
			appname: appname
		});

		$(document).ready((function(){
			this.init();
		}).bind(this));
	};

	extend(Application.prototype, View.prototype, {
		init:function () {
			this.$el.hide();

			// Prevent from scrolling when fullscreen
			$(document.body).on('touchmove', function (e) {
				e.preventDefault();
			});

			this.render();
		},

		render: function () {
			$('body').append(this.$el);
			this.$el.show();
		}
	});

	return Application;
});