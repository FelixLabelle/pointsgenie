# Site des points Genie UdeS 2014

[![Build Status][travis.img]][travis.url]
[![Dependencies][deps.img]][deps.url]
[![Dev Dependencies][devdeps.img]][devdeps.url]
[![Tasks][tasks.img]][tasks.url]

This is the source code for the "Points Genie" site, created for the 57th promo of Engineering at UdeS

##Basics

To install, first install npm, nodejs@0.11 and mongodb then do

    npm install

You can run tests using

    npm tests

You can start the server in dev mode using

    npm start


For production, make sure all the files are built using

    gulp

Then run

    node --harmony server


[travis.img]: https://api.travis-ci.org/dozoisch/pointsgenie.svg
[travis.url]: https://travis-ci.org/dozoisch/pointsgenie
[deps.img]: https://david-dm.org/dozoisch/pointsgenie.svg
[deps.url]: https://david-dm.org/dozoisch/pointsgenie
[devdeps.img]: https://david-dm.org/dozoisch/pointsgenie/dev-status.svg
[devdeps.url]: https://david-dm.org/dozoisch/pointsgenie#info=devDependencies
[tasks.img]: https://badge.waffle.io/dozoisch/pointsgenie.svg
[tasks.url]: http://waffle.io/dozoisch/pointsgenie
