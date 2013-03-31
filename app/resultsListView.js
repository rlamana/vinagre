define([
	'system/selector',
	'system/view',
	'system/ui/animation',

	'tpl!app/tpl/result',

	'css!app/css/results'
],
function($, View, Animation, resultTemplate) {
	'use strict';

	var ResultsListView = function(data) {
		View.call(this);

		this.$el = $('<ul class="results-list" />');
		this.$el.listen(this.events, this);

		if(data)
			this.render(data);
	};

	ResultsListView.prototype = Object.create(View.prototype);

	ResultsListView.prototype.remove = function (callback, scope) {
		Animation.play('fadeOutDown', this.$el, function(){
			this.$el.remove();

			if(callback)
				callback.apply(scope||this);
		}, this);
	};

	ResultsListView.prototype.render = function (data) {
		if (!(data instanceof Array))
			return;

		// Show new results
		data.forEach(function(values, index) {
			this._renderResult(values, index*200);
		}, this);
	};

	ResultsListView.prototype._renderResult = function (data, delay) {
		View.queue(function() {
			var $result = resultTemplate(data);
			this.$el.append($result);
			Animation.play('fadeInUp', $result);
		}, this, delay||0);
	};

	ResultsListView.prototype.events = {
	};

	return ResultsListView;
});