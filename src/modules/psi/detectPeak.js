const { max } = require('lodash');

module.exports = function detectPeak(value, references, threshold = 0.5) {
    const maxValue = max(references);
    return (value < maxValue + maxValue * threshold);
};
