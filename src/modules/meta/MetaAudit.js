const { Audit } = require('lighthouse');

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

    static async audit(artifacts) {
        console.log(artifacts.MetaGatherer);
    }
};
