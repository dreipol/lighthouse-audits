const { Audit } = require('lighthouse');

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
            const diff = psiData.pageStats.javascriptResponseBytes - psiData.config.maxJsBytes;
            if (diff > 0) {
                score = 100 / (psiData.pageStats.javascriptResponseBytes / diff);

                data.push({
                    bytes: psiData.pageStats.javascriptResponseBytes,
                    max: psiData.config.maxJsBytes,
                    diff: diff,
                    rate: score,
                });
            }
        }

        const headings = [
            { key: 'bytes', itemType: 'text', text: 'bytes' },
            { key: 'max', itemType: 'text', text: 'max' },
            { key: 'diff', itemType: 'text', text: 'diff' },
            { key: 'rate', itemType: 'text', text: 'rate' },
        ];

        const details = Audit.makeTableDetails(headings, data);

        return {
            score,
            rawValue: psiData.pageStats.javascriptResponseBytes,
            displayValue: `${score} / ${Math.round(psiData.pageStats.javascriptResponseBytes / 1024)}kb`,
            optimalValue: `${psiData.config.maxJsBytes}`,
            details,
        };
    }
};
