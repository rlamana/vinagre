define([
	'system/application',

	'app/searchView',
	'app/resultsView',

	'css!app/css/main'
],
function(Application, SearchView, ResultsView) {
	'use strict';

	var MainApp = function() {
		Application.call(this, 'main');

		this.searchView = new SearchView();
		this.searchView.appendTo(this.$el);

		this.resultsView = new ResultsView();
		this.resultsView.appendTo(this.$el);

		this.searchView.on('search', function(keywords){
			this.resultsView.search(keywords);
		}, this);
	};

	MainApp.prototype = Object.create(Application.prototype);

	return MainApp;
});