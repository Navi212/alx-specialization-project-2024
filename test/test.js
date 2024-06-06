//const chai = require("chai");
//const expect = chai.expect;
const request = require('supertest');
const express = require('express');
const app = express();
const connectDB = require('./server/config/db');

// Module to be tested is being imported here
const { isActiveRoute } = ('./server/helpers/routerHelpers');


describe('TESTING isActiveRoute FUNCTION...', () => {
	it('Should return true if the current route matches the provided route', () => {
		const route = '/home';
		const currentRoute = '/home';
		const result = isActiveRoute(route, currentRoute);

		assert.strictEqual(result,true);
	});

	it('should return false if the current route does not match the provided route', () => {
		const route = '/home';
		const currentRoute = '/about';
		const result = isActiveRoute(route, currentRoute);

		assert.strictEqual(result, false);
	});
});


//Integration test for express app
describe('EXPRESS APP', () =>{
	it('Should start the server without any errors', () => {
		request(app)
		.get('/')
		.expect(200)
		.end((err) => {
			if (err) return done(err);
			done();
		});
	});

	it('Should return 404 for undefined routes', (done) => {
		r()
	});
});
