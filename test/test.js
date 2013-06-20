var request = require('supertest'),
    express = require('express');

var app = require('../app.js');

describe('POST', function(){
  it('responds with a json success message', function(done){
    request(app)
    .post('/todos')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({'action': 'write post on TDD with mongodb, nodejs and wercker', 'author': 'mies'})
    .expect(200, done);
  });
});

describe('GET', function(){
  it('responds with a list of todo items in JSON', function(done){
    request(app)
    .get('/todos')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});

describe('GET', function(){
  it('responds with a single todo item in JSON based on the author', function(done){
    request(app)
    .get('/todos/mies')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});