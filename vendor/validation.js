Ember.Y = Ember.Y || {}

Ember.Y.Validators = {
	string: function (value, options) {
		var o = options;
		if (!o.propertyDesc) o.propertyDesc = 'This field';
		o.propertyDesc = o.propertyDesc + ' ';

		if (!value && o.required)
			return o.message || (o.propertyDesc + 'is a required field.');

		if (!value)
			return false;

		if (o.min > value.length)
			return o.message || (o.propertyDesc + 'must be at least ' + o.min + ' characters long.');

		if (o.max < value.length)
			return o.message || (o.propertyDesc + 'must be no more than ' + o.max + ' characters long.');

		return false;
	},
	date: function (value, options) {
		var o = options;

		if (!o.propertyDesc) {
			o.propertyDesc = 'This field';
		}

		o.propertyDesc = o.propertyDesc + ' ';

		if (!value && o.required)
			return o.message || (o.propertyDesc + 'is a required field.');

		if (!value)
			return false;

		if (Object.prototype.toString.call(value) !== '[object Date]')
			return o.message || (o.propertyDesc + 'is a not a valid date.');

		if (o.before && (Date.parse(o.before) < value))
			return o.message || (o.propertyDesc + 'must be before ' + o.before + ' .');

		if (o.after && (Date.parse(o.after)) > value)
			return o.message || (o.propertyDesc + 'must be after ' + o.after + ' .');

		return false;
	},

	number: function (value, options) {
		var o = options;

		if (!o.propertyDesc)
			o.propertyDesc = 'This field';

		o.propertyDesc = o.propertyDesc + ' ';

		if (!value && o.required) return o.message || (o.propertyDesc + 'is a required field.');
		if (value == null || value === '') return false;

		if (isNaN(parseFloat(value)) || !isFinite(value)) {
			return o.message || (o.propertyDesc + 'must be a valid number.');
		}

		if (o.positive && value <= 0)return o.message || (o.propertyDesc + 'must be a positive number.');
		if (o.min > value) return o.message || (o.propertyDesc + 'must be at greater or equal than ' + o.min + '.');
		if (o.max < value) return o.message || (o.propertyDesc + 'must be no less or equal than ' + o.max + '.');

		return false;
	},

	dependsOn: function (value, options) {
		options.forEach(function (key) {
			this.evaluateState(key, true);
		}, this);

		return false;
	}
};

Ember.Y.ValidationState = Ember.Object.extend({
	dependsOn: null,
	__dirty: false,
	__saved: false,
	__error: false,
	__errorMessage: null,

	dirty: Em.computed(function () {
		if (arguments.length > 1)
			this.set('__dirty', arguments[1]);

		return this.__dirty;
	}).property(),

	saved: Em.computed(function () {
		if (arguments.length > 1)
			this.set('__saved', arguments[1]);

		return this.__saved;
	}).property(),

	error: Em.computed(function () {
		if (arguments.length > 1)
			this.set('__error', arguments[1]);

		return this.__error;
	}).property(),

	errorMessage: Em.computed(function () {
		if (arguments.length > 1)
			this.set('__errorMessage', arguments[1]);

		return this.__errorMessage;
	}).property()
});


Ember.Y.Validation = Ember.Y.ValidationState.extend({
	_dirtyCount: 0,
	_errorCount: 0,

  hasErrors : function(){
    return this.get('_errorCount') > 0
  }.property('_errorCount'),


	markAllDirtyAsSaved: function () {
		if (this.get('_dirtyCount')) {
			for (p in this) {
				var val = this[p];
				if (val instanceof Ember.Y.ValidationState) {
					if (val.get('dirty')) {
						val.set('dirty', false)
						val.set('saved', true)
					}
				}
			}

			this.set('_dirtyCount', 0)
		}
	}
})

Ember.Y.StateHelper = {
	_systemProperties: null,

	getSystemProperties: function () {
		if (!this._systemProperties) {
			var result = new Array();
			for (var p in DS.Model._create({})) {
				result.push(p);
			}

			this._systemProperties = result;
		}

		return this._systemProperties;
	},

	getValidationPath: function (propertyPath, stateProperty) {
		var valPath,
			index = propertyPath.lastIndexOf('.');

		if (index > -1) {
			valPath = propertyPath.substring(0, index) + '.validation' + propertyPath.substring(index, propertyPath.length)
		} else {
			valPath = 'validation.' + propertyPath
		}

		if (stateProperty) {
			valPath = valPath + '.' + stateProperty;
		}

		return valPath;
	},

	getCleanValue: function (value) {
		if ([undefined, null, ''].contains(value)) return null;
		else return value;
	}
}


Ember.Y.State = Em.Mixin.create({
	_validationRules: {},
	_pendingValidation: {},

	init: function () {
		this._super();

		this.set('dirtyItems', Ember.A());

		if (!this.get('validation')) {
			this.prepareState()
		}

		if (!this._validationRules[this.constructor.toString()] && this.constructor.validationRules) {
			var hash = this._validationRules[this.constructor.toString()] = {},
				valProperties = this.constructor.validationRules;

			// go through each property that needs to be validated and extract the validators
			for (var prop in valProperties) {
				// lets create hash with the key the property name and the value an array of validators
				var propValidators = hash[prop] = [],
					array = valProperties[prop];

				// if a single validator is provided convert it to an array
				if (!$.isArray(array)) {
					array = new Array(array);
				}

				// go throw each validator and try to match it with the existing
				// if none has been found will consider it as custom
				array.forEach(function (validator) {
					if (validator.length) {
						propValidators.push({
							function: Ember.Y.Validators.string,
							options: validator.length
						})
					} else if (validator.number) {
						propValidators.push({
							function: Ember.Y.Validators.number,
							options: validator.number
						})
					} else if (validator.range) {
						propValidators.push({
							function: Ember.Y.Validators.date,
							options: validator.range
						})
					}

					if (validator.custom) {
						if (!$.isArray(validator.custom)) {
							validator.custom = new Array(validator.custom);
						}

						validator.custom.forEach(function (f) {
							propValidators.push({ function: f });
						});
					}

					if (validator.dependsOn) {
						propValidators.push({
							function: Ember.Y.Validators.dependsOn,
							options: validator.dependsOn
						});
					}
				}, this);
			}
		}
	},

	propertyChanged: function (model, key) {
		if (!model.constructor.stateProperties || model.constructor.stateProperties.indexOf(key) > -1) {
			if (model._pendingValidation[key]) {
				clearTimeout(this._pendingValidation[key]);
			}
			model._pendingValidation[key] = setTimeout(function () {
				model.evaluateState(key);
				delete model._pendingValidation[key];
			}, 500, model);
		}
	},

	willDestroy: function () {
		this._super();

		this.eachAttribute(function (attributeName) {
			Ember.removeObserver(this, attributeName, this, this.propertyChanged);
		}, this);
	},


	evaluateState: function (key, skipDependsOnValidation, validateAll) {
		var pv = this.get('validation.' + key);

		if (pv) {
			//consider empty string and null as the same value
			//rest of comparisons are type safe
			var dirty = Ember.Y.StateHelper.getCleanValue(this._attributes[key]) !== Ember.Y.StateHelper.getCleanValue(pv.get('originalValue')),
				wasDirty = !!pv.get('dirty');

			if (dirty != wasDirty) {
				pv.set('dirty', dirty);

				var dirtyCount = this.get('validation._dirtyCount') + (dirty ? 1 : -1);

				this.setProperties({
					'validation._dirtyCount': dirtyCount,
					'validation.dirty': !!dirtyCount
				});
			}

			//there is no point to validate if the object has not changed
			//unless we want to validate everything on load

			if (wasDirty || dirty || validateAll) {
				var validation = this._validationRules[this.constructor.toString()];

				if (validation && validation[key]) {
					var errorCount = this.get('validation._errorCount') + (pv.get('error') ? -1 : 0),
						errorFound = false;

					pv.setProperties({
						error: false,
						errorMessage: ''
					});

					validation[key].forEach(function (v) {
						// just show one error at a time
						// depends should not fire from another depends on to avoid recursion
						// for example if we point that two properties depends on each other
						if (!errorFound && (!skipDependsOnValidation || Ember.Y.Validators.dependsOn !== v.function)) {
							var error = v.function.call(this, this._attributes[key], v.options);

							if (error) {
								pv.set('error', true);
								pv.set('errorMessage', error);
								errorFound = true;
							}
						}
					}, this);

					if (pv.get('error')) {
						errorCount++;
					}

					this.setProperties({
						'validation._errorCount': errorCount,
						'validation.error': !!errorCount
					});
				}
			}
		}
	},

	prepareState: function () {
		var newObj = Ember.Y.Validation.create({}),
			self = this;

		self.eachAttribute(function (attributeName) {
			var v = self.get(attributeName);
			newObj.set(attributeName, Ember.Y.ValidationState.create({ originalValue: v }));
			Ember.addObserver(self, attributeName, self, self.propertyChanged);
		}, this);

		self.set('validation', newObj);
	},

	validate: function () {
		var self = this;

		this.eachAttribute(function (attributeName) {
			self.evaluateState(attributeName, true, true);
		}, this);

		return !!this.validation.error;
	}
})


Ember.Y.ControllerState = Em.Mixin.create({
	init: function () {
		this._super();
		this.set('validation', Ember.Y.Validation.create({}));
		this.set('observers', []);
	},

	evaluateModelProperty: function (state) {
		if (this.get(state) !== result) {
			this.set(state, result);
		}
	},

	modelPropertyChange: function (key, value) {
		['dirty', 'saved', 'error', 'errorMessage'].forEach(function (state) {
			var result = null;

			this.get('modelProperties').forEach(function (p) {
				var value = key.get(Ember.Y.StateHelper.getValidationPath(p, state));

				if (value) {
					result = value;
				}
			});

			if (this.get(state) !== result) {
				this.set(state, result);
			}
		}, this);
	},

	linkState: function (controllerProperty, modelProperties) {
		if (!$.isArray(modelProperties)) {
			modelProperties = new Array(modelProperties);
		}

		var state = Ember.Y.ValidationState.create({});
		state.set('modelProperties', modelProperties);

		modelProperties.forEach(function (p) {
			Ember.addObserver(this, p, state, this.modelPropertyChange);

			this.get('observers').push({ path: p, target: state });
		}, this);

		this.get('validation').set(controllerProperty, state);
	},

	willDestroy: function () {
		this._super();

		this.get('observers').forEach(function (obs) {
			Ember.removeObserver(this, obs.path, obs.target, this.modelPropertyChange);
		}, this);
	}
})
