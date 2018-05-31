const { Audit } = require('lighthouse');
const { findIndex } = require('lodash');

module.exports = class MetaAudit extends Audit {
    static get meta() {
        return {
            name: 'meta-audit',
            description: 'Avoid meta no-index and no-follow on root pages',
            failureDescription: '',
            helpText: 'Avoid meta no-index and no-follow on root pages',
            requiredArtifacts: ['MetaGatherer'],
        };
    }


    static audit(artifacts) {
        const metaElements = artifacts.MetaGatherer;
        let auditFailed = false;

        for (let i = 0; i < metaElements.length; i++) {
            const metaElement = metaElements[i];
            if (metaElement.attributes.name === 'robots') {
                const content = metaElement.attributes.content;
                const values = content.split(',');
                if (findIndex(values, 'no-follow') !== -1 || findIndex(values, 'no-index') !== -1) {
                    auditFailed = true;
                }
            }
        }

        return {
            rawValue: auditFailed,
            score: auditFailed ? 0 : 100,
        };
    }
};
