define([
	'system/selector',
	'system/view',

	'tpl!system/ui/tpl/list',
	'tpl!system/ui/tpl/listItem',

	'css!system/ui/css/list',

	'vendor/iscroll'
], 
function($, View, listTemplate, defaultListItemTemplate) {
	var tapDelay = 100;
	var pullerSize = 60;

	/**
	 * ListView Class
	 *
	 * @extends View
	 */
	var List = function() {
		View.call(this);

		// Create List dom element and listen to its events
		this.$el = listTemplate();
		this.$el.listen(this.events, this);

		// Cache list element and puller
		this.$list = this.$el.find('.list');
		this.$pullerUp = this.$el.find('.puller-up').hide();
		this.$pullerDown = this.$el.find('.puller-down').hide();

		// Create scroller and connect events
		this.scroller = new iScroll(this.$el[0], {
			useTransition: true,

			onBeforeScrollMove: this.scrollEvents.beforescrollmove.bind(this),
			onScrollMove: this.scrollEvents.scrollmove.bind(this)
		});

		this.pullToRefresh = false;
		this.pullToLoad = false;

		this._selectedItem = null;
		this._loading = false;

		this.registerSignals([
			'loadstart',
			'loadend',
			'refresh',
			'touched'
		]);
	};

	List.prototype = Object.create(View.prototype, {
		/**
		 * Enable/disable pull to load
		 */
		pullToLoad: {
			get: function() {
				return this._pullToLoad;
			},

			set: function(value) {
				this._pullToLoad = value;
			}
		},

		/**
		 * Enable/disable pull to refresh
		 */
		pullToRefresh: {
			get: function() {
				return this._pullToRefresh;
			},

			set: function(value) {
				if(!!value) {
					this.$pullerUp.show();
					this.scroller.minScrollY = pullerSize;
					this.refresh();
				}
				else {
					this.$pullerUp.hide();
					this.scroller.minScrollY = 0;
					this.refresh();
				}
				this._pullToRefresh = value;
			}
		}
	});

	/**
	 * Passive View / DOM events
	 */
	List.prototype.events = {
		'.list-item touchstart': function(e) {
			var item = $(e.currentTarget);

			// Delay to detect tap
			setTimeout((function() {
				if(this._selectedItem && (this._selectedItem[0] === item[0])) {
					item.addClass('touched');
				}
			}).bind(this), tapDelay);

			this._selectedItem = item;
		},

		'.list-item touchend': function(e) {
			var item = $(e.currentTarget);
			setTimeout((function() {
				item.removeClass('touched');
				if(this._selectedItem && (this._selectedItem[0] === item[0]))
					this.emit('touched', item);

				this._selectedItem = null;
			}).bind(this), tapDelay);
		}
	};


	/**
	 * @todo scroll logic should be handled in other class
	 */
	List.prototype.scrollEvents = {
		'beforescrollmove': function(e) {
			if(this._selectedItem) {
				this._selectedItem.removeClass('touched');
				this._selectedItem = null;
			}
		},

		'scrollmove': function(e) {
			if (!!this._pullToLoad && !this._loading && (this.scroller.y < (this.scroller.maxScrollY - 5))) {
				this._loading = true;
				this.emit('loadstart', (function(){
					this.emit('loadend'); // Emmit 'loadend' when finished loading
					this._loading = false;
				}).bind(this));
			}
		}
	},

	List.prototype.showLoader = function() {
		this.$pullerDown.show();
		this.refresh();
	};

	List.prototype.hideLoader = function() {
		this.$pullerDown.hide();
		this.refresh();
	};

	/**
	 * Add item to the list
	 * @param data {Object} Item data in JSON format according to the
	 *		fields required in the itemTemplate
	 * @param itemTemplate {Function} Item template constructor 
	 *		to generate its dom tree. If template is not provided, default
	 *		template is used.
	 */
	List.prototype.addItem = function(data, itemTemplate) {
		// Compose item and its content
		var $item;

		if(itemTemplate && (typeof itemTemplate === 'function'))
			$item = itemTemplate(data);
		else
			$item = defaultListItemTemplate(data);

		// Add item to the list and listen to its events
		this.$list.append($item);

		// Update scroller
		this.refresh();
	};

	List.prototype.refresh = function() {
		// Update scroller
		var self = this;
		window.setTimeout(function () {
			self.scroller.refresh();
		}, 0);
	};

	List.prototype.clear = function() {
		this.$list.html('');
	};

	return List;
});