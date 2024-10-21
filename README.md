# Apollolytics - Eye tracking experiment
This repository contains code for the main website and the eye tracking experiment.

## Eye tracking experiment website
The website + API are built with `node.js` + `koa` and use the `webgazer.js` and `heatmap.js` libraries. 

Participant heatmaps can be accessed via the following URL scheme: `localhost/{1|2}/{tool|raw}/{participant_no}`.

Example: localhost/heatmap/2/tool/9838
