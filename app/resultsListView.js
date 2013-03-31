define([
	'system/selector',
	'system/view',
	'system/ui/animation',

	'css!app/css/results'
],
function($, View, Animation){

	var ResultsListView = function() {
		View.call(this);

		this.$el = $('<li class="results-list" />');
		this.$el.listen(this.events, this);
	};

	ResultsListView.prototype = Object.create(View.prototype);

	ResultsListView.prototype.init = function () {
	};

	ResultsListView.prototype.events = {
	};

	return ResultsListView;
});