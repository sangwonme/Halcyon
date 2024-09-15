node version 22.8.0

yarn create react-app --template typescript halcyon-prototype

cd halcyon-prototype

yarn add -D electron electron-builder

package.json -->
{
  "main": "public/Main.js",
  "homepage": "./"
}

yarn react-start
yarn electron-start
yarn electron-pack