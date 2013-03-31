define([
	'system/selector',
	'system/view',
	'system/ui/animation',

	'tpl!app/tpl/search',
	'css!app/css/search'
],
function($, View, Animation, searchTemplate){

	var SearchView = function() {
		View.call(this);

		this.$el = new searchTemplate();
		this.$el.listen(this.events, this);

		Animation.play('fadeInDown', this.$el, this.init.bind(this));
	};

	SearchView.prototype = Object.create(View.prototype, {});

	SearchView.prototype.init = function () {
	};

	SearchView.prototype.events = {
	};

	return SearchView;
});