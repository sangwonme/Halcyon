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

<!-- sass -->
yarn add sass

<!-- simplemde -->
[ref](https://github.com/RIP21/react-simplemde-editor?tab=readme-ov-file)
yarn add --save react-simplemde-editor easymde