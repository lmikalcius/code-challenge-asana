# code-challenge-asana

https://lmikalcius.github.io/code-challenge-asana/ - Live URL

To use, enter a query param of project with a value of the project ID you would like to view. i.e. https://lmikalcius.github.io/code-challenge-asana/?project=568228076648642

The code itself lives in in the app/assets (and index.html in app) folder. The project is vanilla JS. All added modules are dev-dependencies so the client will never have to download anything (frameworks, etc.). With Babel, this should run even in IE 9(+) (as far as I can remember, fetch is the only ES6 feature used aside from import which webpack should take care of).

`gulp watch` during development. This creates the temp files.

`gulp build` to run new build. This will create the docs folder that is used by github pages (formerly dist).
`gulp previewDocs` will give a preview window of the docs folder
