const fs = require('fs')
const path = require('path')
const child_process = require('child_process')
const {p} = require('../config')

console.log('remove node_modules')
child_process.execSync('rm -rf node_modules', {stdio: 'inherit'})

console.log('npm install -dd')
child_process.execSync('npm install -dd', {stdio: 'inherit'})

console.log('dll dev')
child_process.execSync('node scripts/dll dev', {stdio: 'inherit'})

const birdFilePath = path.join(p.bird, 'birdfile.js')
if (!fs.existsSync(birdFilePath)) {
    console.log('copy birdfile')
    fs.copyFileSync(path.join(p.bird, 'birdfile.example.js'), birdFilePath)
}

console.log('setup done, you may do \'npm run dev\'')
