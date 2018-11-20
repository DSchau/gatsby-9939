#!/bin/bash
SRC_PATH=$(pwd)
GATSBY_PATH="${SRC_PATH}/gatsby"

echo $GATSBY_PATH

npm install -g gatsby-dev-cli &&

git clone --depth 1 https://github.com/gatsbyjs/gatsby &&
cd gatsby && yarn && yarn lerna run build --scope gatsby-plugin-offline &&

# setting up child integration test link to gatsby packages
cd $SRC_PATH &&
yarn &&
gatsby-dev --set-path-to-repo $GATSBY_PATH &&
gatsby-dev --scan-once --packages gatsby-plugin-offline --quiet && # copies _all_ files in gatsby/packages
chmod +x ./node_modules/.bin/gatsby && # this is sometimes necessary to ensure executable
yarn build
