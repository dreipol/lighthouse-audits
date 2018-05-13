const { Audit } = require('lighthouse');

module.exports = class PSIUsabilityScoreAudit extends Audit {
    static get meta() {
        return {
            name: 'psi-usability-score',
            description: 'Get PSI Usability score ',
            failureDescription: '',
            helpText: 'Get more detailed insights about your page',
            requiredArtifacts: ['PSIGatherer'],
        };
    }

    static async audit(artifacts) {
        const psiData = artifacts.PSIGatherer;

        return {
            optimalValue: 100,
            rawValue: psiData.usabilityScore,
            score: psiData.usabilityScore,
            displayValue: `${psiData.usabilityScore}`,
        };

    }
};
