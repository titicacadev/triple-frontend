export const unit = (value: number | string, suffix = 'px') =>
  typeof value === 'string' ? value : value !== 0 ? `${value}${suffix}` : value
