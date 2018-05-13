const PlainEmailAudit = require('./modules/plain-email/PlainEmailAudit');
const PlainEmailGatherer = require('./modules/plain-email/PlainEmailGatherer');

const BrokenLinkAudit = require('./modules/brokenlink/BrokenLinkAudit');
const BrokenLinkGatherer = require('./modules/brokenlink/BrokenLinkGatherer');

const PSICategory = require('./categories/psi');
const PSIGatherer = require('./modules/psi/PSIGatherer');
const PSISpeedScoreAudit = require('./modules/psi/PSISpeedScoreAudit');
const PSIUsabilityScoreAudit = require('./modules/psi/PSIUsabilityScoreAudit');
const PSIHTMLSizeAudit = require('./modules/psi/PSIHtmlSizeAudit');
const PSICssSizeAudit = require('./modules/psi/PSICssSizeAudit');
const PSIImgSizeAudit = require('./modules/psi/PSIImgSizeAudit');
const PSIJsSizeAudit = require('./modules/psi/PSIJsSizeAudit');
const PSIJsResourcesAudit = require('./modules/psi/PSIJsResourcesAudit');
const PSICssResourcesAudit = require('./modules/psi/PSICssResourcesAudit');


module.exports = {
    PlainEmail: {
        PlainEmailAudit,
        PlainEmailGatherer,
    },

    BrokenLink: {
        BrokenLinkAudit,
        BrokenLinkGatherer,
    },

    PSI: {
        PSICategory,
        PSIGatherer,
        PSISpeedScoreAudit,
        PSIUsabilityScoreAudit,
        PSIHTMLSizeAudit,
        PSICssSizeAudit,
        PSIImgSizeAudit,
        PSIJsSizeAudit,
        PSIJsResourcesAudit,
        PSICssResourcesAudit,
    }
};
