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
		this.init();
	};

	ResultsView.prototype = Object.create(View.prototype);

	ResultsView.prototype.init = function () {
	};

	ResultsView.prototype.empty = function (callback, scope) {
		Animation.play('fadeOutDown', this.$list, function(){
			this.$list.remove();

			if(callback)
				callback.apply(scope||this);
		}, this);
	};

	ResultsView.prototype.search = function (keywords) {
		this.emit('search', keywords||'');
	};

	ResultsView.prototype.render = function (data) {
		var list = new ResultsListView(data);
		var append = function() {
			this.listView = list;
			this.listView.appendTo(this.$el);
		};

		if(this.listView)
			this.listView.remove(append, this);
		else
			append.call(this);
	};

	ResultsView.prototype.events = {
	};

	return ResultsView;
});