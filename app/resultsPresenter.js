define(['$', 'Underscore'], function ($, _) {
	'use strict';

	// var serverAddr = 'http://192.168.1.5:3000/v0';

	var fixture = [{
		id: 0,
		name: 'Sunrise',
		description: 'Building a better calendar',
		url: 'http://www.sunrise.am/'
	}, {
		id: 1,
		name: 'Stellarkite',
		description: 'Stellarkite is a multidisciplinary group of scientists ' +
			'and engineers born to geekify the world',
		url: 'http://www.stellarkite.com'
	}, {
		id: 2,
		name: 'Lovely',
		description: 'Building a platform for apartment rentals - a $10bn market opportunity',
		url: 'http://livelovely.com/'
	}];

	var ResultsPresenter = function (driver) {
		this.driver = driver;
		driver.connect(this.slots, this);
	};

	ResultsPresenter.prototype.slots = {
		'search': _.throttle(function (keywords) {
			var self = this;

			// search
			keywords = keywords || '';

			self.driver.render(fixture);

			// $.ajax({
			// 	url: serverAddr + '/startups-search',
			// 	data: {
			// 		query: keywords
			// 	},
			// 	success: function(data) {
			// 		/* jshint camelcase:false */
			// 		self.driver.render({
			// 			id: data.idstartup,
			// 			name: data.name,
			// 			description: data.short_desc,
			// 			url: data.url
			// 		});
			// 	},
			// 	crossDomain: true,
			// 	dataType: 'jsonp'
			// });
		}, 500)
	};

	ResultsPresenter.create = function(driver) {
		return new ResultsPresenter(driver);
	};

	return ResultsPresenter;
});
