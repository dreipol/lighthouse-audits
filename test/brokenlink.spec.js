const { expect } = require('chai');
const nock = require('nock');

const DOMAIN = 'example.com';
const BrokenLinkAudit = require('../src/modules/brokenlink/BrokenLinkAudit');

describe('brokenlink', function () {
    beforeEach(() => {
        nock(`http://${DOMAIN}`)
            .get('/de')
            .reply(200, {});
    });

    it('absolute url', (done) => {
        BrokenLinkAudit.audit({
            BrokenLinkGatherer: {
                url: `http://${DOMAIN}`,
                results: [
                    { href: `http://${DOMAIN}/de`, text: 'DE' }
                ]
            }
        })
            .then((result) => {
                expect(result.rawValue).to.be.equal(0);
                expect(result.score).to.be.equal(100);
                expect(result).to.have.property('details');
                done();
            })
            .catch(e => {
                done(e);
            });
    });

    it('absolute url mixed', (done) => {
        BrokenLinkAudit.audit({
            BrokenLinkGatherer: {
                url: `http://${DOMAIN}`,
                results: [
                    { href: `http://${DOMAIN}/de`, text: 'DE' },
                    { href: `http://${DOMAIN}/it`, text: 'DE' },
                ]
            }
        })
            .then((result) => {
                expect(result.rawValue).to.be.equal(1);
                expect(result.score).to.be.equal(50);
                expect(result).to.have.property('details');
                done()

            })
            .catch(e => {
                done(e);
            });
    });

    it('relative & absolute urls', (done) => {
        nock(`http://${DOMAIN}`)
            .get('/found')
            .reply(200, {});

        BrokenLinkAudit.audit({
            BrokenLinkGatherer: {
                url: `http://${DOMAIN}`,
                results: [
                    { href: `http://${DOMAIN}/de`, text: 'DE' },
                    { href: `/found`, text: 'IT' },
                ]
            }
        })
            .then((result) => {
                expect(result.rawValue).to.be.equal(0);
                expect(result.score).to.be.equal(100);
                expect(result).to.have.property('details');
                done()

            })
            .catch(e => {
                done(e);
            });
    });

    it('absolute url not found', (done) => {
        BrokenLinkAudit.audit({
            BrokenLinkGatherer: {
                url: `http://${DOMAIN}`,
                results: [
                    { href: `http://${DOMAIN}/fr`, text: 'DE' }
                ]
            }
        })
            .then((result) => {
                expect(result.rawValue).to.be.equal(1);
                expect(result.score).to.be.equal(0);
                expect(result).to.have.property('details');
                done()

            })
            .catch(e => {
                done(e);
            });
    });

    it('absolute urls not found', (done) => {
        BrokenLinkAudit.audit({
            BrokenLinkGatherer: {
                url: `http://${DOMAIN}`,
                results: [
                    { href: `http://${DOMAIN}/fr`, text: 'DE' },
                    { href: `http://${DOMAIN}/it`, text: 'DE' },
                    { href: `http://${DOMAIN}/en`, text: 'DE' },
                ]
            }
        })
            .then((result) => {
                expect(result.rawValue).to.be.equal(3);
                expect(result.score).to.be.equal(0);
                expect(result).to.have.property('details');
                done()

            })
            .catch(e => {
                done(e);
            });
    });

    it('relative urls', (done) => {
        BrokenLinkAudit.audit({
            BrokenLinkGatherer: {
                url: `http://${DOMAIN}`,
                results: [
                    { href: `/de`, text: 'DE' },
                ]
            }
        })
            .then((result) => {
                expect(result.rawValue).to.be.equal(0);
                expect(result.score).to.be.equal(100);
                expect(result).to.have.property('details');
                done()

            })
            .catch(e => {
                done(e);
            });
    });

    it('relative urls without leading slash', (done) => {
        BrokenLinkAudit.audit({
            BrokenLinkGatherer: {
                url: `http://${DOMAIN}`,
                results: [
                    { href: `de`, text: 'DE' },
                ]
            }
        })
            .then((result) => {
                expect(result.rawValue).to.be.equal(0);
                expect(result.score).to.be.equal(100);
                expect(result).to.have.property('details');
                done()

            })
            .catch(e => {
                done(e);
            });
    });

    it('ignoring invalid protocols', (done) => {
        BrokenLinkAudit.audit({
            BrokenLinkGatherer: {
                url: `http://${DOMAIN}`,
                results: [
                    { href: `mailto://asdf@foo.com`, text: 'Foo' },
                ]
            }
        })
            .then((result) => {
                expect(result.rawValue).to.be.equal(0);
                expect(result.score).to.be.equal(100);
                expect(result).to.have.property('details');
                done()

            })
            .catch(e => {
                done(e);
            });
    });
});
