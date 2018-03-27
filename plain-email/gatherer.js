'use strict';

const Gatherer = require('lighthouse').Gatherer;
const DOMHelpers = require('lighthouse/lighthouse-core/lib/dom-helpers');

class PlainEmailGatherer extends Gatherer {

    afterPass(options) {
        const driver = options.driver;
        const expression = `(function() {
            return document.body.innerHTML
        })()`;

        return options.driver.evaluateAsync(expression)
    }
}

module.exports = PlainEmailGatherer;