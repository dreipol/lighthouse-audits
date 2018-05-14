module.exports = function getDetail(actualBytes, maxBytes) {
    const kb = actualBytes / 1024;
    const maxKB = maxBytes / 1024;

    const diff = kb - maxKB;
    let score = 100;

    if (diff > 0) {
        score = 100 / kb * diff;
    }

    return {
        kb: Math.round(kb),
        max: Math.round(maxKB),
        diff,
        rate: Math.round(score),
        score: diff > 0 ? 100 - score : score,
    };
};
