const { Gatherer } = require('lighthouse');
const psi = require('psi');

module.exports = class PSIGatherer extends Gatherer {
    async afterPass(options) {
        //const data = await psi(options.url);
        const data = require('../../../test/data/psi');


        return {
            config: options.config.psi,
            speedScore: data.ruleGroups.SPEED.score,
            usabilityScore: data.ruleGroups.USABILITY.score,
            pageStats: data.pageStats,
            rules: data.formattedResults.ruleResults
        };
    }
};
