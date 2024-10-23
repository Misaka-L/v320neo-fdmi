const { readFileSync, existsSync, writeFileSync } = require('fs')
const { homedir } = require('os')
const path = require('path')

if (process.platform !== 'linux') {
  throw new Error("This script is only for linux")
}

if (process.argv.length !== 3) {
  throw new Error("Usage: node add-user-package-to-vrc-get.js <path>")
}

let vrcGetConfigPath = path.join(homedir(), ".local", "share", 'VRChatCreatorCompanion', 'vrc-get', "settings.json")

console.log('vrc-get config path:', vrcGetConfigPath)

if (!existsSync(vrcGetConfigPath)) {
  throw new Error("vrc-get config file not found")
}

const originConfigRaw = readFileSync(vrcGetConfigPath, 'utf8')
const originConfig = JSON.parse(originConfigRaw)

if (!originConfig.userPackageFolders || Array.isArray(originConfig.userPackageFolders)) {
  originConfig.userPackageFolders = []
}

originConfig.userPackageFolders.push(process.argv[2])

const newConfigRaw = JSON.stringify(originConfig, null, 2)

writeFileSync(vrcGetConfigPath, newConfigRaw)

console.log('Added user package folder to vrc-get config:', process.argv[2])