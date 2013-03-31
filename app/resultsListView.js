define([
	'system/selector',
	'system/view',
	'system/ui/animation',

	'app/resultsPresenter',
	'tpl!app/tpl/result',

	'css!app/css/results'
],
function($, View, Animation, ResultsPresenter, resultTemplate) {
	var ResultsListView = function() {
		View.call(this);

		this.$el = $('<ul class="results-list" />');
		this.$el.listen(this.events, this);

		// Initialize Presenter
		new ResultsPresenter(this);

		this.registerSignals(['search']);

		this.init();
	};

	ResultsListView.prototype = Object.create(View.prototype);

	ResultsListView.prototype.init = function () {
		this.search();
	};

	ResultsListView.prototype.search = function (keywords) {
		this.emit('search', keywords||'');
	};

	ResultsListView.prototype.render = function (data) {
		if (!(data instanceof Array)) 
			return;

		data.forEach(function(values, index) {
			this.renderResult(values);
		}, this);
	};

	ResultsListView.prototype.renderResult = function (data) {
		this.$el.append(resultTemplate({
			id: 0,
			name: "Startup-Name"
		}));
	};

	ResultsListView.prototype.events = {
	};

	return ResultsListView;
});