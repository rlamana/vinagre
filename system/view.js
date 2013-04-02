define(function(require) {
	'use strict';

	var inherit = require('system/core/inherit');
	var Emitter = require('system/core/emitter');

	var View = function() {
		Emitter.call(this);
	};

	View.prototype = inherit(Emitter.prototype, {
		/**
		 * View's main/root DOM element wrapped with selector
		 * library (jquery, or other)
		 * @public
		 */
		$el: null,

		_slots: {},
		_events: {},

		__signals: [],

		set slots(slots) {
			this._slots = inherit(this._slots, slots);
		},

		get slots() {
			return this._slots;
		},

		set events(events) {
			this._events = inherit(this._events, events);
		},

		get events() {
			return this._events;
		},

		/**
		 * Register a signal
		 * @param signal {String}
		 */
		registerSignal: function(signal) {
			this.__signals.push(signal);
		},

		/**
		 * Register a group of signals
		 * @param signals {Array}
		 */
		registerSignals: function(signals) {
			this.__signals = this.__signals.concat(signals);
		},

		/**
		 * Appends view's main element $el to the tree of given dom
		 * element
		 * @param element {Element}
		 */
		appendTo: function (element) {
			if(this.$el && this.$el.appendTo)
				this.$el.appendTo(element);

			return this;
		},

		/**
		 * Destroys view, disconnects listeners
		 * and removes DOM elements linked to this
		 * view.
		 */
		destroy: function () {
			if(this.$el)
				this.$el.remove();
		}
	});

	/**
	 * To ensure render functions are called after
	 * DOM has made its changes, this methods
	 * puts the call at the end of the call queue.
	 * @static
	 */
	View.queue = function(func, scope, time) {
		setTimeout(func.bind(scope), time || 0);
	};

	return View;
});