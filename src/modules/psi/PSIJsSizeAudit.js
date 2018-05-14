const { Audit } = require('lighthouse');

const getDetail = require('./util/getDetailData');
const createDetails = require('./util/createDetails');

module.exports = class PSIHtmlSizeAudit extends Audit {
    static get meta() {
        return {
            name: 'psi-js',
            description: 'Get PSI JS score ',
            failureDescription: '',
            helpText: 'Get more detailed insights about your page',
            requiredArtifacts: ['PSIGatherer'],
        };
    }

    static async audit(artifacts) {
        const psiData = artifacts.PSIGatherer;

        let score = 100;
        const data = [];

        if (psiData.config && psiData.config.maxJsBytes) {
            const detailData = getDetail(psiData.pageStats.javascriptResponseBytes, psiData.config.maxJsBytes);
            score = detailData.score;
            data.push(detailData);
        }

        return {
            score,
            rawValue: psiData.pageStats.javascriptResponseBytes,
            displayValue: `${ Math.round(score) }`,
            optimalValue: `${ psiData.config.maxJsBytes }`,
            details: createDetails(data),
        };
    }
};
