# @dreipol/lighthouse-audits
Collection of useful lighthouse audits

# Install

    npm i @dreipol/lighthouse-audits --save-dev

# Setup
After installing the module you have to add it to the `lighthouse` configuration.

    const { audit, gatherer } = require('@dreipol/lighthouse-audits/MODULE');

Add the `gatherer` to the list of `gatherers` in the `passes` config

    ...
    passes: [
            {
                passName: 'defaultPass',
                recordTrace: true,
                pauseAfterLoadMs: 10000,
                networkQuietThresholdMs: 10000,
                cpuQuietThresholdMs: 10000,
                gatherers: [
                    gatherer, // importer from the  module
                    'url',
                    'scripts',
                    'css-usage',
                    'viewport',
                    'viewport-dimensions',
                    ...

Add `audit` to the list of audits in the lighthouse config

    ...
     audits: [
        audit, // importer from the  module
         'service-worker',
        'viewport',
        'without-javascript',

And the last step is to add a custom category (or add the result to an existing one)

    ...
    categories: {
        dreipol: {
            name: 'Dreipol Audits',
            description: 'Dreipol audits',
            audits: [
                { id: '<MODULE>', weight: 5 },
            ],
        }
    ...

# Modules

## brokenlinks
Search site for links leading to 404 pages