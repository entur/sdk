#!/bin/bash

npm version prerelease
git push && git push --tags
npm publish --tag next
