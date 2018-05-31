const { expect } = require('chai');
const PSISpeedScoreAudit = require('../src/modules/psi/PSISpeedScoreAudit');

describe('psi', function () {

    it('default', async () => {
        const data = require('./data/psi');

        const result = await PSISpeedScoreAudit.audit({
            PSIGatherer: {
                config: {
                    maxCssBytes: 1048576,
                    maxHtmlBytes: 1048576,
                    maxJsBytes: 1048576,
                    maxImgBytes: 1048576,
                },
                speedScore: data.ruleGroups.SPEED.score,
                usabilityScore: data.ruleGroups.USABILITY.score,
                pageStats: data.pageStats,
                rules: data.formattedResults.ruleResults
            }
        });

        expect(result.rawValue).to.be.equal(57);
        expect(result.score).to.be.equal(57);
    });

    it('without max config', async () => {
        const data = require('./data/psi');

        const result = await PSISpeedScoreAudit.audit({
            PSIGatherer: {
                config: null,
                speedScore: data.ruleGroups.SPEED.score,
                usabilityScore: data.ruleGroups.USABILITY.score,
                pageStats: data.pageStats,
                rules: data.formattedResults.ruleResults
            }
        });

        expect(result.rawValue).to.be.equal(57);
        expect(result.score).to.be.equal(57);
    });

    it('without max config', async () => {
        const data = require('./data/psi');

        const result = await PSISpeedScoreAudit.audit({
            PSIGatherer: {
                speedScore: data.ruleGroups.SPEED.score,
                usabilityScore: data.ruleGroups.USABILITY.score,
                pageStats: data.pageStats,
                rules: data.formattedResults.ruleResults
            }
        });

        expect(result.rawValue).to.be.equal(57);
        expect(result.score).to.be.equal(57);
    });
});
