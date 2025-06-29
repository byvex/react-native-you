#!/usr/bin/env node

const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer').default

const COMPONENTS_DIR = path.join(__dirname, 'src', 'components', 'ui')
const HOOKS_DIR = path.join(__dirname, 'src', 'hooks')

const TARGET_COMPONENTS = path.join(process.cwd(), 'src', 'components', 'ui')
const TARGET_HOOKS = path.join(process.cwd(), 'src', 'hooks')

async function run() {
  const [, , command, name] = process.argv

  if (command !== 'add' || !name) {
    console.log('❌ Usage: npx react-native-you add <component|hook>')
    return
  }

  const isHook = name.startsWith('use-')
  const sourceBase = isHook ? HOOKS_DIR : COMPONENTS_DIR
  const targetBase = isHook ? TARGET_HOOKS : TARGET_COMPONENTS

  const srcFile = path.join(sourceBase, `${name}.tsx`)
  const srcFolder = path.join(sourceBase, name)

  let targetPath
  let sourcePath
  let isFolder = false

  console.log(`🔍 Looking for ${isHook ? 'hook' : 'component'}: "${name}"`)

  if (fs.existsSync(srcFile)) {
    sourcePath = srcFile
    targetPath = path.join(targetBase, `${name}.tsx`)
  } else if (fs.existsSync(srcFolder)) {
    sourcePath = srcFolder
    targetPath = path.join(targetBase, name)
    isFolder = true
  } else {
    console.error(`❌ "${name}" not found in templates.`)
    return
  }

  if (fs.existsSync(targetPath)) {
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: `Component "${name}" already exists. Overwrite?`,
        default: false,
      },
    ])

    if (!overwrite) {
      console.log('⚠️  Operation cancelled.')
      return
    }

    await fs.rm(targetPath, { recursive: true, force: true })
  }

  if (isFolder) {
    await fs.copy(sourcePath, targetPath)
  } else {
    await fs.ensureDir(path.dirname(targetPath))
    await fs.copyFile(sourcePath, targetPath)
  }

  console.log(`✅ "${name}" added to ${path.relative(process.cwd(), targetPath)}`)
}

run();
