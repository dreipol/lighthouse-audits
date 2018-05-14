# @dreipol/lighthouse-audits
[![CircleCI](https://circleci.com/gh/dreipol/lighthouse-audits.svg?style=svg)](https://circleci.com/gh/dreipol/lighthouse-audits)

Collection of useful lighthouse audits


# Install

    npm i @dreipol/lighthouse-audits --save

# Setup
This module provides some audits for deeper inspections and better quality of your website/project.

## Config
To add an audit to your lighthouse configuration you simply import this module. This module exports a couple of
object (See API below). Those modules contain audits and gatherers. Those can be simply be added to your already existent
lighthouse configuration.


**Example**

    const {
        PSI,
    } = require('@dreipol/lighthouse-audits');
    
    ...
    passes: [
            {
                passName: 'defaultPass',
                recordTrace: true,
                pauseAfterLoadMs: 10000,
                networkQuietThresholdMs: 10000,
                cpuQuietThresholdMs: 10000,
                gatherers: [
                
                    PSI.PSIGatherer,
                    
                    'url',
                    'scripts',
                    'css-usage',
                    'viewport',
                    'viewport-dimensions',
                    ...
    ...
    audits: [
        PSI.PSISpeedScoreAudit,
        
        'service-worker',
        'viewport',
        'without-javascript',
        
Now we've added the `gatherer` and the `audit`. But if we run the audits now, we wont see the result of the audit in the 
report, since we didn't added the category where the audit should be added at. There are two options.

First is to add all the categories and assign the audits by your own (recommended when not using the default)

    categories: {
        dreipol: {
            name: 'Dreipol Audits',
            description: 'Dreipol audits',
            audits: [
                { id: '<AUDIT_NAME>', weight: 5 },
            ],
        },
        psi: {
            name: 'PSI',
            description: 'Page Speed Insight audits',
            audits: [
                { id: 'psi-speed-score', weight: 5 },
                ...
            ],
        }

Or you can use the default categories exported by this module. Those default categories are available under `Categories`

Exmaple in your lighthouse config:

    const {
        Categories,
    } = require('@dreipol/lighthouse-audits');
    
    ...
    categories: {
        psi: Categories.PSI, 
        dreipol: Categories.Dreipol, 
    }
    


# Usage

## API
Structure of exported module. You can use these to add them as audits/gatherers

- Categories
    - PSI
    - Dreipol
- PlainEmail
    - PlainEmailGatherer
    - PlainEmailAudit `{name: 'plain-email-audit'}`
- BrokenLink
    - BrokenLinkGatherer
    - BrokenLinkAudit `{name: 'brokenlink-audit'}`
- PSI
    - PSIGatherer
    - PSISpeedScoreAudit `{name: 'psi-speed-score'}`
    - PSIUsabilityScoreAudit `{name: 'psi-usability-score'}`
    - PSIHTMLSizeAudit `{name: 'psi-html'}`
    - PSICssSizeAudit `{name: 'psi-css'}`
    - PSIImgSizeAudit `{name: 'psi-img'}`
    - PSIJsSizeAudit `{name: 'psi-js'}`
    - PSIJsResourcesAudit `{name: 'psi-js-resources'}`
    - PSICssResourcesAudit `{name: 'psi-css-resources'}`
