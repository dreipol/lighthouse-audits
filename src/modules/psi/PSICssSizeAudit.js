const { Audit } = require('lighthouse');

module.exports = class PSICssSizeAudit extends Audit {
    static get meta() {
        return {
            name: 'psi-css',
            description: 'Get PSI CSS Size',
            failureDescription: '',
            helpText: 'Get more detailed insights about your page',
            requiredArtifacts: ['PSIGatherer'],
        };
    }

    static async audit(artifacts) {
        const psiData = artifacts.PSIGatherer;

        let score = 100;
        if (psiData.config && psiData.config.maxCssBytes) {
            const diff = psiData.pageStats.cssResponseBytes - psiData.config.maxCssBytes;
            if (diff > 0) {
                score = psiData.config.maxCssBytes / diff;
            }
        }

        return {
            score,
            rawValue: psiData.pageStats.cssResponseBytes,
            displayValue: `${Math.round(psiData.pageStats.cssResponseBytes / 1024)}kb`,

        };
    }
};
