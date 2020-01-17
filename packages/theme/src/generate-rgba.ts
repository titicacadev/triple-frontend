function generateRgba(
  baseColor: string,
): {
  [key: string]: string
} {
  return [100, 200, 300, 400, 500, 600, 700, 800, 900].reduce(
    (colors, n, i) => {
      return { ...colors, [n]: `rgba(${baseColor}, 0.${i + 1})` }
    },
    {
      1000: `rgba(${baseColor}, 1)`,
    },
  )
}

export default generateRgba
