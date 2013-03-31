define([
	'system/selector',
	'system/view',
	'system/ui/animation',

	'tpl!app/tpl/search',
	'css!app/css/search'
],
function($, View, Animation, searchTemplate) {
	'use strict';

	var SearchView = function() {
		View.call(this);

		this.$el = searchTemplate();
		this.$el.listen(this.events, this);

		this.$input = this.$el.find('input.search');

		Animation.play('fadeInDown', this.$el, this.init.bind(this));

		this.registerSignals(['search']);
		this.init();
	};

	SearchView.prototype = Object.create(View.prototype, {});

	SearchView.prototype.init = function () {
		View.queue(function(){
			this.$input.focus();
		}, this);
	};

	SearchView.prototype.events = {
		'submit': function (e) {
			e.preventDefault();
			this.emit('search', this.$input.val());
			return false;
		},

		/*'.search-button click': function (e) {
			this.$el.submit();
			e.preventDefault();
		}*/
	};

	return SearchView;
});