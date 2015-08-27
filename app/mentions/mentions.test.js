'use strict';

var expect 		= require('chai').expect;
var Post 			= require('./mentions');
var mongo 		= require('../../lib/mongo/');


// Mentions Tests

describe('Mentions', function () {

	var seededPosts;

	before(function (done) {
		mongo.connect(function () {

			var seedPosts = [
				{text: 'hola'},
				{mention: 'LDougher'},
				{username: 'buddy'},
				{date: 'Thu Aug 22 2015 14:34:20 GMT-0500 (CDT)'},
				{geolocation: 'Nashville'},
		];

  		Post.collection.insertMany(seedPosts, function (err, result) {
  			seededPosts = result.ops;
  			done();
			});
		});
	});

	after(function (done) {
		Post.dropCollection(done);
	});


	it('should return post by mention', function (done) {
			var id1 = seededPosts[1]._id;


			Post.findById(id1, function (err, post) {
				expect(post.mention).to.equal('LDougher');
				done();
			})
	})

});
