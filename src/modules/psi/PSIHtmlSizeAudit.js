const { Audit } = require('lighthouse');

module.exports = class PSIHtmlSizeAudit extends Audit {
    static get meta() {
        return {
            name: 'psi-html',
            description: 'Get PSI HTML score ',
            failureDescription: '',
            helpText: 'Get more detailed insights about your page',
            requiredArtifacts: ['PSIGatherer'],
        };
    }

    static async audit(artifacts) {
        const psiData = artifacts.PSIGatherer;

        let score = 100;
        if (psiData.config && psiData.config.maxHtmlBytes) {
            const diff = psiData.pageStats.htmlResponseBytes - psiData.config.maxHtmlBytes;
            if (diff > 0) {
                score = psiData.config.maxHtmlBytes / diff;
            }
        }

        return {
            score,
            rawValue: psiData.pageStats.htmlResponseBytes,
            displayValue: `${Math.round(psiData.pageStats.htmlResponseBytes / 1024)}kb`,
        };
    }
};
