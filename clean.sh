#!/usr/bin/env bash
find . -maxdepth 1 -mindepth 1 -type d -not -path './dist' -not -path './src' -not -path './node_modules' -not -path './.*' -exec rm -rf '{}' \;
printf "Repository Cleaned\n\n";