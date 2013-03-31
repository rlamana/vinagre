define([
	'system/selector',
	'system/view',
	'system/ui/animation',

	'app/resultsPresenter',
	'tpl!app/tpl/result',

	'css!app/css/results'
],
function($, View, Animation, ResultsPresenter, resultTemplate) {
	'use strict';

	var ResultsListView = function() {
		View.call(this);

		this.$el = $('<ul class="results-list" />');
		this.$el.listen(this.events, this);

		// Instantiate and initialize Presenter
		ResultsPresenter.create(this);

		this.registerSignals(['search']);

		this.init();
	};

	ResultsListView.prototype = Object.create(View.prototype);

	ResultsListView.prototype.init = function () {
	};

	ResultsListView.prototype.empty = function (callback, scope) {
		Animation.play('fadeOutDown', this.$el, function(){
			this.$el.html('');

			if(callback)
				callback.apply(scope||this);
		}, this);
	};

	ResultsListView.prototype.search = function (keywords) {
		this.emit('search', keywords||'');
	};

	ResultsListView.prototype.render = function (data) {
		if (!(data instanceof Array))
			return;

		this.empty(function(){
			// Show new results
			data.forEach(function(values, index) {
				this.renderResult(values, index*200);
			}, this);
		}, this);
	};

	ResultsListView.prototype.renderResult = function (data, delay) {
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