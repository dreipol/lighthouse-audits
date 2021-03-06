'use strict';

const { Audit } = require('lighthouse');
const isEmail = require('email-check');

// http://emailregex.com/
const REGEX = /(?:[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g

class PlainEmailAudit extends Audit {
    static get meta() {
        return {
            name: 'plain-email-audit',
            description: 'Avoid plain email adresses',
            failureDescription: '',
            helpText: 'Avoid plain email adresses on the page to minimize the risk of spam',
            requiredArtifacts: ['PlainEmailGatherer'],
        };
    }

    static async audit(artifacts) {
        /** @var {string} result */
        let result = artifacts.PlainEmailGatherer;

        let results = result.match(REGEX);

        if (!results) {
            return {
                displayValue: 0,
                rawValue: 0,
                score: 100,
            };
        }

        results = await PlainEmailAudit.cleanupResults(results);

        const headings = [
            { key: 'mail', itemType: 'code', text: 'Mail' },
        ];

        const details = PlainEmailAudit.makeTableDetails(headings, results);

        return {
            displayValue: results.length,
            rawValue: results.length,
            score: results ? 0 : 100,
            details,
        };

    }

    static async cleanupResults(results) {
        return await Promise.all(results.filter(async (mail) => {
            const isMailValid = await isEmail(mail);

            if (isMailValid) {
                return mail;
            }

            return null;
        }));
    }
}

module.exports = PlainEmailAudit;
