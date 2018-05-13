const { expect } = require('chai');

const PlainEmailAudit = require('./PlainEmailAudit');

const HTML_MAILTO = `<h1>Hello <a href='mailto://foo@bar.com'>World</a></h1>`;
const HTML_RAW = `<h1>Hello foo@bar.com</h1>`;
const HTML_SIMILAR = `<h1>Hello <img src='/path/to/image@2x.png'/></h1>`;

describe('plain-email', function () {

    it('detect mailto link', async () => {
        try {
            const result = await PlainEmailAudit.audit({
                PlainEmailGatherer: HTML_MAILTO
            });

            expect(result.rawValue).to.be.equal(1);
            expect(result.score).to.be.equal(0);
            expect(result).to.have.property('details');
        }catch(e) {
            throw e;
        }
    });

    it('detect raw text', (done) => {
        PlainEmailAudit.audit({
            PlainEmailGatherer: HTML_RAW
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
});
