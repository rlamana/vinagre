define([
	'system/application',

	'app/searchView',
	'app/resultsListView',

	'css!app/css/main'
],
function(Application, SearchView, ResultsListView) {

	var MainApp = function() {
		Application.call(this, 'main');

		this.searchView = new SearchView();
		this.searchView.appendTo(this.$el);

		this.resultsListView = new ResultsListView();
		this.resultsListView.appendTo(this.$el);

		this.searchView.on('search', function(keywords){
			this.resultsListView.search(keywords);
		}, this)
	};

	MainApp.prototype = Object.create(Application.prototype);



	return MainApp;
});