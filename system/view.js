define([
	'system/selector',
	'system/core/extend',
	'system/core/emitter'
],
function($, extend, Emitter) {
	var View = function() {
		this.emitter = new Emitter();
	};

	/**
	 * View's main/root DOM element wrapped with selector 
	 * library (jquery, or other)
	 */
	View.prototype.$el = null;

	View.prototype = Object.create(Object.prototype, {
		slots: {
			set: function(slots) {
				this._slots = extend({}, this._slots, slots);
			},

			get: function() {
				return this._slots;
			}
		},

		events: {
			set: function(events) {
				this._events = extend({}, this._events, events);
			},

			get: function() {
				return this._events;
			}
		}
	});

	/**
	 * Base view slots object
	 */
	View.prototype._slots = {};

	/**
	 * Base view events object
	 */
	View.prototype._events = {};

	/**
	 * View registered signals array
	 * @private
	 */
	View.prototype.__signals = [];

	/**
	 * Register a signal
	 * @param signal {String}
	 */
	View.prototype.registerSignal = function(signal) {
		this.__signals.push(signal);
	};

	/**
	 * Register a group of signals
	 * @param signals {Array}
	 */
	View.prototype.registerSignals = function(signals) {
		this.__signals = this.__signals.concat(signals);
	};

	/**
	 * Appends view's main element $el to the tree of given dom
	 * element
	 * @param element {Element}
	 */
	View.prototype.appendTo = function (element) {
		if(this.$el && this.$el.appendTo)
			this.$el.appendTo(element);

		return this;
	};

	/**
	 * Connects to a group of signals, optionally a scope can be provided
	 *
	 * @param slots {Map} Map of signals and listeners.
	 * @param scope {Object} The scope for the callback.
	 */
	View.prototype.connect = function (slots, scope) {
		this.emitter.connect(slots, scope);
		return this;
	};

	/**
	 * Removes listeners to a group of signals, optionally a scope can be provided
	 *
	 * @param slots {Map} Map of signals and listeners.
	 * @param scope {Object} The scope for the callback.
	 */
	View.prototype.disconnect = function (slots, scope) {
		this.emitter.disconnect(slots, scope);
		return this;
	};

	/**
	 * Connects to a signal, optionally a scope can be provided
	 *
	 * @param slots {String} Signals and listeners.
	 * @param scope {Object} The scope for the callback.
	 */
	View.prototype.on = function (signal, slot, scope) {
		this.emitter.on(signal, slot, scope);
		return this;
	};

	/**
	 * Removes listeners to a group of signals, optionally a scope can be provided
	 *
	 * @param slots {String} Map of signals and listeners.
	 * @param scope {Object} The scope for the callback.
	 */
	View.prototype.off = function (signal, slot, scope) {
		this.emitter.off(signal, slot, scope);
		return this;
	};

	/**
	 * Executes the callbacks for a given signal.
	 * Any extra argument will be passed to the callback.
	 *
	 * @param signal {String} The signal of the listeners we want to invoke.
	 * @param var_args {object...} Any arguments we want the callbacks to recive.
	 */
	View.prototype.emit = function (signal, var_args) {
		if(this.__signals.indexOf(signal) < 0)
			console.warn(this.toString() + ' emitted signal \'' + signal + '\' but not defined in this view definition.');

		this.emitter.emit.apply(this.emitter, arguments);
		return this;
	};

	/**
	 * Destroys view, disconnects listeners
	 * and removes DOM elements linked to this
	 * view.
	 */
	View.prototype.destroy = function () {
		this.emitter = null;

		if(this.$el)
			this.$el.remove();
	};

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