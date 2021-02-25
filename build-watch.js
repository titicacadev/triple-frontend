const { log, error } = require('console')
const { exec } = require('child_process')

const chokidar = require('chokidar')
const debounce = require('lodash.debounce')

const BUILD_RESOURCES =
  'BABEL_ENV=build babel --root-mode upward src --out-dir lib --source-maps --extensions .ts,.tsx,.js --no-comments'

const watcher = chokidar.watch('packages/*/src/**/*', {
  ignored: /test|spec|__test__/,
  persistent: true,
})

let isReady = false

function handleClose() {
  watcher.close().then(() => {
    log('Bye.')
  })
}

const BUILDERS = {}

function createBuilder(packageName) {
  return () => {
    log(`@titicaca/${packageName} is changed`)

    exec(
      `lerna exec --scope=@titicaca/${packageName} '${BUILD_RESOURCES}'`,
      (err, stdout) => {
        if (err) {
          error(err)
        } else {
          log(stdout)
          log(`Built @titicaca/${packageName}`)
        }
      },
    )
  }
}

function getBuilder(packageName) {
  if (!BUILDERS[packageName]) {
    BUILDERS[packageName] = debounce(createBuilder(packageName), 300)
  }

  return BUILDERS[packageName]
}

watcher
  .on('ready', () => {
    isReady = true
  })
  .on('all', (event, path) => {
    if (!isReady || !path) {
      return
    }

    const [, packageName] = path.match(/packages\/([-a-z0-9]+)\//)

    if (typeof packageName !== 'string') {
      return
    }

    getBuilder(packageName)()
  })

process.on('SIGTERM', handleClose).on('SIGINT', handleClose)
