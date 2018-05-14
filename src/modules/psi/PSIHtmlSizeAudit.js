const { Audit } = require('lighthouse');

const getDetail = require('./util/getDetailData');
const createDetails = require('./util/createDetails');

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
        const data = [];

        if (psiData.config && psiData.config.maxHtmlBytes) {
            const detailData = getDetail(psiData.pageStats.htmlResponseBytes, psiData.config.maxHtmlBytes);
            score = detailData.score;
            data.push(detailData);
        }

        return {
            score,
            rawValue: psiData.pageStats.htmlResponseBytes,
            displayValue: `${ Math.round(score) }`,
            optimalValue: `${ psiData.config.maxHtmlBytes }`,
            details: createDetails(data),
        };
    }
};
