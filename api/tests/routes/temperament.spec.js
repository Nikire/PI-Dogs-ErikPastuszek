/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Temperament, conn } = require('../../src/db.js');

const agent = session(app);

describe('Temperaments routes', () => {
	it('should get 200', () => agent.get('/temperaments').expect(200));
	it('should get all temperaments', () =>
		agent
			.get('/temperaments')
			.expect('Content-Type', /json/)
			.expect((res) => expect(res.body).length.to.be.greaterThan(0)));
});
