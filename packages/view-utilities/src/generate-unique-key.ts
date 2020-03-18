export const generateUniqueKey = (prefix: string) =>
  `${prefix}_${new Date().getTime()}`
