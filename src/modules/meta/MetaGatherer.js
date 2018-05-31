'use strict';

const { Gatherer } = require('lighthouse');
const DOMHelpers = require('lighthouse/lighthouse-core/lib/dom-helpers');

class BrokenLinkGatherer extends Gatherer {
    constructor() {
        super();
        this.checkedUrls = [];
    }

    afterPass(options) {
        const driver = options.driver;
        const expression = `(function() {
            const selector = 'meta[name=\\'robots\\']';
            const elements = document.querySelectorAll(selector);
            return elements
        })()`;

        return options.driver.evaluate(expression)
            .then(results => {
                return {
                    url: options.url,
                    results
                };
            })
            .catch(e => console.error(e));
    }
}

module.exports = BrokenLinkGatherer;
