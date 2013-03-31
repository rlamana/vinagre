define([], function () {
	'use strict';

	var ResultsPresenter = function (driver) {
		this.driver = driver;
		driver.connect(this.slots, this);
	};

	ResultsPresenter.prototype.slots = {
		'search': function (keywords) {
			// search
			keywords = keywords || '';

			var fakeData = [{
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

			this.driver.render(fakeData);
		}
	};

	ResultsPresenter.create = function(driver) {
		return new ResultsPresenter(driver);
	};

	return ResultsPresenter;
});
