const { Audit } = require('lighthouse');

module.exports = class PSIImgSizeAudit extends Audit {
    static get meta() {
        return {
            name: 'psi-img',
            description: 'Get PSI Image score ',
            failureDescription: '',
            helpText: 'Get more detailed insights about your page',
            requiredArtifacts: ['PSIGatherer'],
        };
    }

    static async audit(artifacts) {
        const psiData = artifacts.PSIGatherer;

        let score = 100;
        if (psiData.config && psiData.config.maxImgBytes) {
            const diff = psiData.pageStats.imageResponseBytes - psiData.config.maxImgBytes;
            if (diff > 0) {
                score = psiData.config.maxImgBytes / diff;
            }
        }

        return {
            score,
            rawValue: psiData.pageStats.imageResponseBytes,
            displayValue: `${Math.round(psiData.pageStats.imageResponseBytes / 1024)}kb`,
        };
    }
};
