# `@titicaca/devtools`

## react-use-reducer-logger

next.config.js 파일 webpack 설정에 다음과 같이 추가한다.

```js
webpack: (config) => {
  // ...

  if (
    config.mode === 'development' &&
    entries['main.js'] &&
    !entries['main.js'].includes('@titicaca/devtools/lib/react-use-reducer-logger')
  ) {
    entries['main.js'].unshift('@titicaca/devtools/lib/react-use-reducer-logger')
  }

  // ...
}
```

