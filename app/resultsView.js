define(function(require) {
	'use strict';

	var extend = require('system/core/extend');

	var $ = require('system/selector');
	var View = require('system/view');

	var ResultsPresenter = require('app/resultsPresenter');
	var ResultsListView = require('app/resultsListView');

	var ResultsView = function() {
		View.call(this);

		this.$el = $('<div class="results" />');
		this.$el.listen(this.events, this);

		// Instantiate and initialize Presenter
		ResultsPresenter.create(this);

		this.registerSignals(['search']);
	};

	ResultsView.prototype = extend(View, {
		search: function (keywords) {
			this.emit('search', keywords||'');
		},

		render: function (data) {
			var list = new ResultsListView(data);

			if(this.listView)
				this.listView.remove();

			this.listView = list;
			this.listView.appendTo(this.$el);
		},

		events: {
		}
	});

	return ResultsView;
});