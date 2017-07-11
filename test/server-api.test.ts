import { server } from '../server';

const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;

describe('API endpoints', () => {

    it('should be online', (done) => {
        supertest(server)
            .get('/health')
            .end((err, response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(200);
                    expect(response.type).to.equal('application/json');
                    expect(response.body['health']).to.equal('ok');
                    done();
                }
            });
    });

    it('handle routing errors', (done) => {
        supertest(server)
            .get('/isHealthy')
            .end((err, response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).equals(404);

                    const errorType = 'ResourceNotFound';
                    expect( response.body['code'] ).equals( errorType );
                    done();
                }
            });
    });

    it('return Html page as root context', (done) => {
        supertest(server)
            .get( `/` )
            .end((err, response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(200);
                    done();
                }
            });
    });

    it('provide properties list', (done) => {
        supertest(server)
            .get( `/api/properties` )
            .end((err, response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(200);
                    expect(response.type).to.equal('application/json');
                    expect(response.body.length).to.equal( 3 ); // sample JSON of 3 entries.
                    done();
                }
            });
    });

});