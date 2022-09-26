const { log, error } = require('console')
const { exec } = require('child_process')

const chokidar = require('chokidar')
const debounce = require('lodash.debounce')

const BUILD_RESOURCES = 'swc src -d lib --config-file \\$LERNA_ROOT_PATH/.swcrc'

const watcher = chokidar.watch('packages/*/src/**/*', {
  ignored: /test|spec|__test__/,
  persistent: true,
})

let isReady = false

async function handleClose() {
  await watcher.close()
  log('Bye.')
}

const BUILDERS = {}

function createBuilder(packageName) {
  return () => {
    exec(
      `lerna exec --stream --scope=@titicaca/${packageName} -- ${BUILD_RESOURCES}`,
      // eslint-disable-next-line promise/prefer-await-to-callbacks
      (err, stdout) => {
        if (err) {
          error(err)
        } else {
          log(stdout)
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
