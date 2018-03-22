'use strict';

const Audit = require('lighthouse').Audit;
const { checkLink, cleanNodes } = require('./helpers');

const VALID_CODES = [200, 201, 203, 301, 302];

class BrokenLinkAudit extends Audit {
    static get meta() {
        return {
            name: 'brokenlink-audit',
            description: 'Search for links resulting in 404',
            failureDescription: 'Some links point to 404',
            helpText: 'Avoid links pointing to 404',
            requiredArtifacts: ['BrokenLinkGatherer'],
        };
    }

    static audit(artifacts) {
        let results = cleanNodes(artifacts.BrokenLinkGatherer);
        const failingUrls = [];
        let p = [];
        let total200 = 0;

        return Promise.all(results.map((node) => {
            return checkLink(node.href)
                .then(result => {
                    let statusCode = result.statusCode;
                    let isOk = false;

                    if (!result.err) {
                        isOk = statusCode ? VALID_CODES.includes(statusCode) : false;
                        if (isOk) {
                            total200++;
                        }
                    }

                    return {
                        url: node.href,
                        text: node.text,
                        status: result.err ? result.err : result.statusCode,
                        isOk
                    };
                })
                .then(result => {
                    if (!result.isOk) {
                        failingUrls.push(result);
                    } else {
                        p.push(result);
                    }
                })
        }))
            .then(data => {
                const headings = [
                    { key: 'url', itemType: 'url', text: 'URL' },
                    { key: 'text', itemType: 'text', text: 'Text' },
                    { key: 'status', itemType: 'code', text: 'Status' },
                ];

                const details = Audit.makeTableDetails(headings, failingUrls.length === 0 ? p : failingUrls);

                return {
                    displayValue: `${failingUrls.length}/${total200}`,
                    rawValue: failingUrls.length,
                    score: total200 / results.length * 100,
                    details,
                };
            })
            .catch(e => {
                return {
                    debugString: e.message,
                    rawValue: failingUrls.length,
                    score: total200 / results.length * 100,
                };
            });
    }
}

module.exports = BrokenLinkAudit;