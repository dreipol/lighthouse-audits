const { Audit } = require('lighthouse');

const getDetail = require('./util/getDetailData');
const createDetails = require('./util/createDetails');

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
        const data = [];

        if (psiData.config && psiData.config.maxImgBytes) {
            const detailData = getDetail(psiData.pageStats.imageResponseBytes, psiData.config.maxImgBytes);
            score = detailData.score;
            data.push(detailData);
        }


        return {
            score,
            rawValue: psiData.pageStats.imageResponseBytes,
            displayValue: `${ Math.round(score) }`,
            optimalValue: `${ psiData.config.maxImgBytes }`,
            details: createDetails(data),
        };
    }
};
