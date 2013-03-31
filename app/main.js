define([
	'system/application',

	'app/searchView'
],
function(Application, SearchView) {

	var MainApp = function() {
		Application.call(this, 'main');

		this.SearchView = new SearchView();
		this.SearchView.appendTo(this.$el);
	};

	MainApp.prototype = Object.create(Application.prototype);

	return MainApp;
});