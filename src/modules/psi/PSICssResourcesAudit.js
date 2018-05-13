const { Audit } = require('lighthouse');

module.exports = class PSICssResourcesAudit extends Audit {
    static get meta() {
        return {
            name: 'psi-css-resources',
            description: 'Get PSI CSS Size',
            failureDescription: '',
            helpText: 'Get more detailed insights about your page',
            requiredArtifacts: ['PSIGatherer'],
        };
    }

    static async audit(artifacts) {
        const psiData = artifacts.PSIGatherer;


        return {
            score: true,
            rawValue: psiData.pageStats.numberCssResources,
            displayValue: `${psiData.pageStats.numberCssResources} Files`,
        };
    }
};
