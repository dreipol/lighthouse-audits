'use strict';

const Gatherer = require('lighthouse').Gatherer;

class BrokenLinkGatherer extends Gatherer {
    afterPass(options) {
        const driver = options.driver;

    }
}

module.exports = BrokenLinkGatherer;