const { Audit } = require('lighthouse');
const { forEach } = require('lodash');

module.exports = class PSISpeedScoreAudit extends Audit {
    static get meta() {
        return {
            name: 'psi-speed-score',
            description: 'Get PSI Speed score ',
            failureDescription: '',
            helpText: 'Get more detailed insights about your page',
            requiredArtifacts: ['PSIGatherer'],
        };
    }

    static async audit(artifacts) {
        const psiData = artifacts.PSIGatherer;

        const headings = [
            { key: 'ruleImpact', itemType: 'text', text: 'Impact' },
            { key: 'description', itemType: 'text', text: 'Description' },
        ];

        const data = [];

        if (psiData && psiData.rules) {
            forEach(psiData.rules, (rule) => {
                if (rule.ruleImpact > 0) {
                    data.push({
                        ruleImpact: Math.round(rule.ruleImpact * 100) / 100,
                        description: rule.localizedRuleName,
                    });
                }
            });
        }

        const details = Audit.makeTableDetails(headings, data);

        return {
            rawValue: psiData.speedScore,
            optimalValue: 100,
            score: psiData.speedScore,
            displayValue: `${psiData.speedScore}`,
            details,
        };

    }
};
