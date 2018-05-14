const { Audit } = require('lighthouse');

const getDetail = require('./util/getDetailData');
const createDetails = require('./util/createDetails');

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
        const data = [];

        if (psiData.config && psiData.config.maxCssBytes) {
            const detailData = getDetail(psiData.pageStats.cssResponseBytes, psiData.config.maxCssBytes);
            score = detailData.score;
            data.push(detailData);
        }

        return {
            score,
            rawValue: psiData.pageStats.cssResponseBytes,
            displayValue: `${ Math.round(score) }`,
            optimalValue: `${ psiData.config.maxCssBytes }`,
            details: createDetails(data),
        };
    }
};
