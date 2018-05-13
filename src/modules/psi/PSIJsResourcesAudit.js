const { Audit } = require('lighthouse');

module.exports = class PSIJsResourcesAudit extends Audit {
    static get meta() {
        return {
            name: 'psi-js-resources',
            description: 'Get PSI JS Files',
            failureDescription: '',
            helpText: 'Get more detailed insights about your page',
            requiredArtifacts: ['PSIGatherer'],
        };
    }


    static async audit(artifacts) {
        const psiData = artifacts.PSIGatherer;

        return {
            score: true,
            rawValue: psiData.pageStats.numberJsResources,
            displayValue: `${psiData.pageStats.numberJsResources} Files`,
        };
    }
};
