#!/usr/bin/env bash

# add following environment variable to your .bashrc
# export REMIX=http://localhost:8080

node_modules/.bin/remixd -s "${PWD}/contracts" --remix-ide "https://remix.ethereum.org"