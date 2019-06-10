import React, { createContext, PureComponent, useContext } from 'react'

const Context = createContext()

const TYPE_MAPPING = {
  attraction: 'poi',
  restaurant: 'poi',
  hotel: 'poi',
}

export class ImagesProvider extends PureComponent {
  state = {
    images: this.props.images || [],
    total: null,
    loading: false,
    hasMore: true,
  }

  sendFetchRequest = async (size = 15) => {
    const {
      props: {
        fetchImages,
        source: { id, type },
      },
      state: { images },
    } = this

    const response = await fetchImages(
      { type: TYPE_MAPPING[type] || type, id },
      { from: images.length, size },
    )

    if (response.ok) {
      const result = await response.json()

      return result
    }

    return {}
  }

  fetch = async (cb) => {
    const {
      state: { loading, hasMore },
    } = this

    if (loading || !hasMore) {
      return
    }

    this.setState({ loading: true })

    const { data: fetchedImages, total } = await this.sendFetchRequest()

    if (fetchedImages) {
      this.setState(
        ({ images }) => ({
          images: [...images, ...fetchedImages],
          total,
          loading: false,
          hasMore: fetchedImages.length > 0,
        }),
        cb,
      )
    } else {
      this.setState({ loading: false }, cb)
    }
  }

  indexOf = async ({ id: targetId }) => {
    const {
      state: { images },
    } = this

    const index = images.findIndex(({ id }) => id === targetId)
    if (index >= 0) {
      return index
    }

    // Just fetch 30 more images to check index of clicked image.
    // Ignore the case of unfindable image in these 45(15 + 30) images.
    const { data: fetchedImages } = await this.sendFetchRequest(30)

    return fetchedImages
      ? [...images, ...fetchedImages].findIndex(({ id }) => id === targetId)
      : -1
  }

  render() {
    const {
      props: { children },
      state: { images, total },
    } = this

    return (
      <Context.Provider
        value={{
          images,
          total,
          actions: {
            fetch: this.fetch,
            indexOf: this.indexOf,
          },
        }}
      >
        {children}
      </Context.Provider>
    )
  }
}

export function useImagesContext() {
  return useContext(Context)
}

export function withImages(Component) {
  return function ImagesComponent(props) {
    return (
      <Context.Consumer>
        {({ images, total, actions }) => (
          <Component
            images={images}
            totalImagesCount={total}
            imagesActions={actions}
            {...props}
          />
        )}
      </Context.Consumer>
    )
  }
}
