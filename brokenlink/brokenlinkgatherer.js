'use strict';

const lighthouse = require('lighthouse');
const { Gatherer } = require('lighthouse');

module.exports = class BrokenLinkGatherer extends Gatherer {

    get name() {
        return 'BrokenLinkGatherer';
    }

    beforePass(options) { 
        console.log(options);
        return null;
    }
}