# encoding=utf8
import sys
import os

if __name__ == '__main__':

    preBuildCommand = 'npm install'
    enterCommand = 'cd android'
    existCommand = 'cd ..'
    andCommand = ' && '
    buildCommand = './gradlew assembleRnRelease --stacktrace --debug --info'
    cleanCommand = './gradlew clean'
    os.system(preBuildCommand + andCommand + enterCommand + andCommand + cleanCommand + andCommand + buildCommand + andCommand + existCommand)
