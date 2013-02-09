var get = Ember.get,
    set = Ember.set;

Ember.attr = function(type) {
  return Ember.computed(function(key, value) {
    var data = get(this, 'data');
    if (!data) {
      data = {};
      set(this, 'data', data);
    }

    if (arguments.length === 2) {
      data[key] = value;
    }

    return data[key];
  });
};

Ember.Adapter = Ember.Object.extend({
  fetchById: function(record, id) {

  },

  fetchAll: function(klass, records) {

  },

  load: function(record, id, data) {
    record.load(id, data);
  }
});

Ember.RecordArray = Ember.ArrayProxy.extend();

Ember.Model = Ember.Object.extend({
  isLoaded: false,

  load: function(id, data) {
    set(this, 'data', Ember.merge({id: id}, data));
    set(this, 'isLoaded', true);
  }
});

Ember.Model.reopenClass({
  adapter: Ember.Adapter.create(),

  find: function(id) {
    if (!arguments.length) {
      this.findAll();
    } else {
      var record = this.create();
      get(this, 'adapter').fetchById(record, id);
      return record;
    }
  },

  findAll: function() {
    var records = Ember.RecordArray.create();
    this.adapter.fetchAll(this, records);
    return records;
  }
});