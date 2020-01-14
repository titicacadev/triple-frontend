function generateRgba(
  name: string,
  baseColor: string,
): {
  [key: string]: string
} {
  return [...Array(9).keys()].reduce(
    (prev, _, index) => {
      const key = `${name}${index + 1}0`
      const rgba = `rgba(${baseColor}, 0.${index + 1})`

      return { ...prev, [key]: rgba }
    },
    {
      [name]: `rgba(${baseColor}, 1)`,
    },
  )
}

export default generateRgba
