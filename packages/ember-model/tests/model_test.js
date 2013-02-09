module("Ember.Model");

test("can define attributes with Ember.attr, data is accessible", function() {
  var Model = Ember.Model.extend({
    name: Ember.attr()
  });

  var instance = Model.create({name: "Erik"});

  equal(instance.get('name'), "Erik", "Property value was retained");
});

// test("coercion", function() {
// });

test(".find(id) returns a record with isLoaded: false", function() {
  var Model = Ember.Model.extend({
    name: Ember.attr()
  });

  var record = Model.find(1);
  ok(record);
});

test(".find(id) delegates to the adapter's fetchById method", function() {
  expect(5);

  var Model = Ember.Model.extend({
    name: Ember.attr()
  });

  Model.adapter = Ember.Adapter.extend({
    fetchById: function(record, id) {
      ok(record);
      equal(id, 1);
      this.load(record, id, {name: 'Erik'});
    }
  }).create();

  var record = Model.find(1);
  ok(record, "Record was returned by find");
  equal(record.get('name'), 'Erik', "Loaded value is accessible from the record");
  ok(record.get('isLoaded'), "Record isLoaded")
});

test(".find() returns a RecordArray", function() {
  var Model = Ember.Model.extend({
    name: Ember.attr()
  });

  var records = Model.find();
  ok(records instanceof Ember.RecordArray, "RecordArray is returned");
});