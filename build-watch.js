const { log, error } = require('console')

const chokidar = require('chokidar')
const concurrently = require('concurrently')
const debounce = require('lodash.debounce')

const BUILD_RESOURCES =
  'BABEL_ENV=build babel --root-mode upward src --out-dir lib --source-maps --extensions .ts,.tsx,.js --no-comments'
const BUILD_DECLARATIONS = 'tsc --incremental'

const watcher = chokidar.watch('packages/', {
  ignored: /(node_modules|lib|tsconfig\.tsbuildinfo|(^|[/\\])\..)/,
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

    concurrently(
      [
        {
          command: `lerna exec --scope=@titicaca/${packageName} '${BUILD_RESOURCES}'`,
          name: 'resources',
        },
        {
          command: `lerna exec --scope=@titicaca/${packageName} '${BUILD_DECLARATIONS}'`,
          name: 'declarations',
        },
      ],
      {
        prefix: 'name',
        killOthers: ['failure'],
      },
    )
      .then(() => {
        log(`Built @titicaca/${packageName}`)
      })
      .catch((err) => {
        error(err)
      })
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
