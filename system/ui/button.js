define([
	'system/selector',
	'system/view',

	'tpl!system/ui/tpl/button'
],
function($, View, buttonTemplate) {
	/**
	 * Button Class
	 *
	 * @extends View
	 * @param {String} label Button label
	 */
	var Button = function(label) {
		View.call(this);

		label = label || '';

		// Create Button dom element and listen to its events
		this.$el = buttonTemplate({
			label: label
		});
		this.$el.listen(this.events, this);

		// Cache inside elements
		this.$icon = this.$el.find('.icon');
		this.$label = this.$el.find('label');

		this.registerSignals([
			'pressed',
			'touched'
		]);

		this.enabled = true;
		this.label = label;
	};

	Button.prototype = Object.create(View.prototype, {
		label: {
			get: function() {
				return this._label;
			},

			set: function(value) {
				this._label = value;
				this.$label.html(value);
			}
		},

		icon: {
			get: function() {
				return;
			},

			set: function(value) {
				this._icon = value;
				this.$icon.css({
					'background-image': 'url('+value+')',
					'background-repeat': 'no-repeat'
				});
			}
		},

		enabled: {
			get: function(){
				return this._enabled;
			},

			set: function(value) {
				this._enabled = value;
				if(value) {
					this.$el
						.attr('disabled', false)
						.removeClass('disabled');
				}
				else {
					this.$el
						.attr('disabled', true)
						.addClass('disabled');
				}
			}
		}
	});

	Button.prototype.events = {
		'mousedown'/*'touchstart'*/: function(e) {
			if(!this.enabled) return;

			this.$el.addClass('touched');
			this.emit('touched', this, e);
		},

		'mouseup'/*'touchend'*/: function(e) {
			if(!this.enabled) return;

			this.$el.removeClass('touched');
			this.emit('pressed', this, e);
		}
	};

	return Button;
});