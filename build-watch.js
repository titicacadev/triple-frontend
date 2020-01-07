const chokidar = require('chokidar')
const concurrently = require('concurrently')

const BUILD_RESOURCES =
  'BABEL_ENV=build babel --root-mode upward src --out-dir lib --source-maps --extensions .ts,.tsx,.js --no-comments'
const BUILD_DECLARATIONS = 'tsc'

const watcher = chokidar.watch('packages/', {
  ignored: /(node_modules|lib|(^|[/\\])\..)/,
  persistent: true,
})

let isReady = false

function handleClose() {
  watcher.close().then(() => {
    console.log('Bye.')
  })
}

watcher
  .on('ready', () => {
    isReady = true
  })
  .on('all', (event, path) => {
    if (!isReady || !path) {
      return
    }

    const [, packageName] = path.match(/packages\/([-a-z]+)\//)

    if (typeof packageName !== 'string') {
      return
    }

    console.log(`@titicaca/${packageName} is changed`)

    concurrently(
      [
        {
          command: `lerna exec --scope=@titicaca/${packageName} '${BUILD_RESOURCES}'`,
          name: 'resources',
        },
        {
          command: `lerna exec --scope=@titicaca/${packageName} ${BUILD_DECLARATIONS}`,
          name: 'declarations',
        },
      ],
      {
        prefix: 'name',
        killOthers: ['failure'],
      },
    )
      .then(() => {
        console.log(`Built @titicaca/${packageName}`)
      })
      .catch((error) => {
        console.error(error)
      })
  })

process.on('SIGTERM', handleClose).on('SIGINT', handleClose)
