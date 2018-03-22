'use strict';

const Gatherer = require('lighthouse').Gatherer;
const DOMHelpers = require('lighthouse/lighthouse-core/lib/dom-helpers');

class BrokenLinkGatherer extends Gatherer {
    constructor() {
        super();
        this.checkedUrls = [];
    }

    afterPass(options) {
        const driver = options.driver;

        const expression = `(function() {
        ${DOMHelpers.getElementsInDocumentFnString}; // define function on page
        const selector = 'a';
        const elements = getElementsInDocument(selector);
        return elements
            .map(node => ({
                href: node.href,
                text: node.innerText
            }));
        })()`;

        return options.driver.evaluateAsync(expression)
            .then(results => {
                return results;
            })
            .catch(e => console.error(e));
    }
}

module.exports = BrokenLinkGatherer;