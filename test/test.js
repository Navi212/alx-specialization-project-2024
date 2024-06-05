const chai = require("chai");
const expect = chai.expect;
const request = require('supertest');
const express = require('express');
import connectDB from './server/config/db'
import { isActiveRoute } from './server/helpers/routerHelpers'

/*
test('Connection to database', () => {
	expect(connectDB()).toBe(`Database connected: ${conn.connection.host}`);
});
*/


describe('TESTING THE SERVER...', () => {
	it('Connection to database', () => {
		expect(connectDB()).to.be(`Database connected: ${conn.connection.host}`);
	})

	it('Checking whether the route is active', () => {
		expect(isActiveRoute()).to.be("active" || "");
	})
});
