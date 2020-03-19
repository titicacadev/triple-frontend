# React-hooks

React Custom Hook 들을 제공합니다.

## Usage

### useFetch

```
import { useFetch } from '@titicaca/react-hooks';

const { response, data, error, loading } = useFetch(url, options)
```

### useBodyScrollLock

스크롤을 제어합니다.

```
import { useBodyScrollLock } from '@titicaca/react-hooks`;

useBodyScrollLock(id, flag)
```
