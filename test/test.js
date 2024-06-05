const chai = require("chai");
const expect = chai.expect;
const request = require('supertest');
const express = require('express');
const app = express();
const connectDB = require('./server/config/db');

//Module to be tested is being imported here
const { isActiveRoute } = ('./server/helpers/routerHelpers');


describe('TESTING isActiveRoute FUNCTION...', () => {
	it('Should return true if the current route matches the provided route', () => {
		const currentRoute = '/home';

	})

	it('Checking whether the route is active', () => {
		expect(isActiveRoute()).to.be("active" || "");
	})
});
