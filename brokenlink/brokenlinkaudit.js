'use strict';

const Audit = require('lighthouse').Audit;

class BrokenLinkAudit extends Audit {
    static get meta() {
        return {
            name: 'brokenlink-audit',
            description: 'Search for links resulting in 404',
            failureDescription: 'Some links point to 404',
            helpText: 'Avoid links pointing to 404',

            // The name of the custom gatherer class that provides input to this audit.
            requiredArtifacts: ['BrokenLinkGatherer'],
        };
    }

    static audit(artifacts) {
        console.log(artifacts);
        
        return {
            rawValue: 100,
            score: 100,
        };
    }
}

module.exports = BrokenLinkAudit;