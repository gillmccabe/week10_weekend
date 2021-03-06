var assert = require( "assert" );
var Record = require( "../Record" );
var RecordStore = require( "../RecordStore" );

describe( "RecordStore", function() {

  var record1;
  var record2;
  var record3;
  var record4;
  var recordStore1;


  beforeEach(function() {
   record1 = new Record( "Neil Young", "Harvest Moon", 8.99 );
   record2 = new Record( "Paul Simon", "Graceland", 12.99 );
   record3 = new Record( "Tom Waits", "Rain Dogs", 10.99 );
   record4 = new Record( "Beastie Boys", "Paul's Boutique", 10.99 );
   record5 = new Record( "Beastie Boys", "Licensed to Ill", 11.99 );
   recordStore1 = new RecordStore( "Missing Records", "Glasgow" );
  })

  it( "should have a name", function() {
    assert.equal( "Missing Records", recordStore1.name )
  })

  it( "should have a city", function() {
    assert.equal( "Glasgow", recordStore1.city )
  })

  it( "inventory should start empty", function() {
    assert.equal( 0, recordStore1.inventory.length )
  })

  it( "should be able to add record to inventory", function() {
    recordStore1.add(record1);
    assert.equal( 1, recordStore1.inventory.length )
  })

  it( "should be able to add multiple records to inventory", function() {
    recordStore1.add(record1);
    recordStore1.add(record2);
    assert.equal( 2, recordStore1.inventory.length )
  })

  it( "should be able to remove record from inventory", function() {
    recordStore1.add(record1);
    recordStore1.add(record2);
    recordStore1.remove(record2);
    assert.equal( 1, recordStore1.inventory.length )
  })

  it( "should be able to list inventory", function() {
    recordStore1.add(record1);
    recordStore1.add(record2);
    recordStore1.listInventory();
    assert.deepEqual( [ record1, record2 ], recordStore1.listInventory() )
  })

  it( "should be able to find record by title", function() {
    recordStore1.add(record1);
    recordStore1.add(record2);
    assert.equal( record2, recordStore1.findByTitle("Graceland"))
  })

  it( "should be able to find records by artist", function() {
    recordStore1.add(record1);
    recordStore1.add(record2);
    recordStore1.add(record3);
    recordStore1.add(record4);
    recordStore1.add(record5);
    assert.deepEqual([ record4, record5 ], recordStore1.findByArtist("Beastie Boys"))
  })

  it( "balance should change when you sell a record", function() {
    recordStore1.add(record1);
    recordStore1.add(record2);
    recordStore1.add(record3);
    recordStore1.sell(record1);
    assert.equal( 108.99, recordStore1.balance )
  })

  it( "inventory should change when you sell a record", function() {
    recordStore1.add(record1);
    recordStore1.add(record2);
    recordStore1.add(record3);
    recordStore1.sell(record1);
    assert.equal( 2, recordStore1.inventory.length )
  })

  it( "should be able to report on finances", function() {
    recordStore1.add(record1);
    recordStore1.add(record2);
    recordStore1.add(record3);
    assert.equal( 132.97 , recordStore1.reportFinances() )
  })


})