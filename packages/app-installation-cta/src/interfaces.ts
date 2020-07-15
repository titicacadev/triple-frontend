export interface InventoryItem {
  image?: string
  desc?: string
  detailedDesc?: string
  text?: string
}

export interface CTAProps {
  onShow?: (item?: InventoryItem) => void
  onClick?: (item?: InventoryItem) => void
  onDismiss?: (item?: InventoryItem) => void
}
