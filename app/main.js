define([
	'system/application',

	'app/searchView',
	'app/resultsListView'
],
function(Application, SearchView, ResultsListView) {

	var MainApp = function() {
		Application.call(this, 'main');

		this.SearchView = new SearchView();
		this.SearchView.appendTo(this.$el);

		this.ResultsListView = new ResultsListView();
		this.ResultsListView.appendTo(this.$el);
	};

	MainApp.prototype = Object.create(Application.prototype);

	return MainApp;
});