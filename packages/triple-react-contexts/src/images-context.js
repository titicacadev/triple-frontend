import React, { createContext, PureComponent, useContext } from 'react'

const Context = createContext()

export class ImagesProvider extends PureComponent {
  state = {
    resourceId: null,
    resourceType: null,
    images: this.props.images || [],
    total: null,
    loading: false,
    hasMore: true,
  }

  sendFetchRequest = async ({ id, type, from, size = 15 }) => {
    const {
      props: { fetchImages },
    } = this

    const response = await fetchImages({ id, type }, { from, size })

    if (response.ok) {
      const result = await response.json()

      return result
    }

    return null
  }

  fetch = async ({ id, type }, cb) => {
    const {
      state: { resourceId, resourceType, images, loading, hasMore },
    } = this

    if (loading || !hasMore) {
      return
    }

    this.setState({ loading: true })

    const refresh = id !== resourceId || type !== resourceType

    const { data: fetchedImages, total } = await this.sendFetchRequest({
      id,
      type,
      from: refresh ? 0 : images.length,
    })

    if (fetchedImages) {
      this.setState(
        ({ images }) => ({
          resourceId: id,
          resourceType: type,
          images: refresh ? fetchedImages : [...images, ...fetchedImages],
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
      state: { resourceId, resourceType, images },
    } = this

    const index = images.findIndex(({ id }) => id === targetId)
    if (index >= 0) {
      return index
    }

    // Just fetch 30 more images to check index of clicked image.
    // Ignore the case of unfindable image in these 45(15 + 30) images.
    const { data: fetchedImages } = await this.sendFetchRequest({
      id: resourceId,
      type: resourceType,
      from: images.length,
      size: 30,
    })

    return [...images, ...fetchedImages].findIndex(({ id }) => id === targetId)
  }

  render() {
    const {
      props: { children },
      state: { resourceId, resourceType, images, total },
    } = this

    return (
      <Context.Provider
        value={{
          resourceId,
          resourceType,
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
