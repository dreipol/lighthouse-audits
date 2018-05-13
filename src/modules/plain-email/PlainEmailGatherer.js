'use strict';

const { Gatherer } = require('lighthouse');

class PlainEmailGatherer extends Gatherer {
    async afterPass(options) {
        const expression = `(function() {
            return document.body.innerHTML
        })()`;

        return await options.driver.evaluateAsync(expression);
    }
}

module.exports = PlainEmailGatherer;
