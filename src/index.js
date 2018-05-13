const PlainEmailAudit = require('./modules/plain-email/PlainEmailAudit');
const PlainEmailGatherer = require('./modules/plain-email/PlainEmailGatherer');

const BrokenLinkAudit = require('./modules/brokenlink/BrokenLinkAudit');
const BrokenLinkGatherer = require('./modules/brokenlink/BrokenLinkGatherer');


module.exports = {
    PlainEmailAudit,
    PlainEmailGatherer,
    BrokenLinkAudit,
    BrokenLinkGatherer,
};
