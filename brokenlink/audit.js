'use strict';

const Audit = require('lighthouse').Audit;

const MAX_SEARCHABLE_TIME = 4000;

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

        let results = artifacts.BrokenLinkGatherer;
        results = results.filter( node => {
            if(node && !node.error){
                return node;
            }
        });

        let total200 = 0;
        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            if (result && result.statusCode === 200) {
                total200++;
            }
        }
        return {
            rawValue: total200,
            score: total200/results.length*100,
            extendedInfo: {
                value: {
                    results: results
                }
            }
        };
    }
}

module.exports = BrokenLinkAudit;