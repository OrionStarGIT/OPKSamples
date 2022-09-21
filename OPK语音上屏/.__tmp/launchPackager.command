#!/usr/bin/env bash
clear
THIS_DIR=$(dirname "$0")
pushd "$THIS_DIR"
source ./packager.sh
echo "Process terminated. Press <enter> to close the window"
read
 