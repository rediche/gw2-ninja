# <gw2-ninja\>

Polymer 3 version of [GW2 Ninja](http://gw2.ninja).

## Setup

#### Prerequisites

First, install [Polymer CLI](https://github.com/Polymer/polymer-cli) and Bower using
[npm](https://www.npmjs.com) (we assume you have pre-installed [node.js](https://nodejs.org)).

    npm install -g polymer-cli bower

#### Install

    clone from git repo
    cd gw2-ninja
    npm install

## Start the development server

This command serves the app at `http://localhost:8080` and provides basic URL
routing for the app:

    polymer serve

## Build

This command performs HTML, CSS, and JS minification on the application
dependencies, and generates a service-worker.js file with code to pre-cache the
dependencies based on the entrypoint and fragments specified in `polymer.json`.
The minified files are output to the `build/default` folder.

    polymer build

## Preview the build

This command serves the built version of the app at `http://localhost:8081`:

    polymer serve build/default

## Run tests

*Note*: No proper tests are currently implemented.

This command will run [Web Component Tester](https://github.com/Polymer/web-component-tester)
against the browsers currently installed on your machine:

    polymer test
