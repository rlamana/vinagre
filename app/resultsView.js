define([
	'system/selector',
	'system/view',
	'system/ui/animation',

	'app/resultsPresenter',
	'app/resultsListView'
],
function($, View, Animation, ResultsPresenter, ResultsListView) {
	'use strict';

	var ResultsView = function() {
		View.call(this);

		this.$el = $('<div class="results" />');
		this.$el.listen(this.events, this);

		// Instantiate and initialize Presenter
		ResultsPresenter.create(this);

		this.registerSignals(['search']);
	};

	ResultsView.prototype = Object.create(View.prototype);

	ResultsView.prototype.search = function (keywords) {
		this.emit('search', keywords||'');
	};

	ResultsView.prototype.render = function (data) {
		var list = new ResultsListView(data);

		if(this.listView)
			this.listView.remove();

		this.listView = list;
		this.listView.appendTo(this.$el);
	};

	ResultsView.prototype.events = {
	};

	return ResultsView;
});