export type OptimisticAction =
  | { type: 'FILTER_SUBCATEGORY'; subcategory: string }
  | { type: 'FILTER_BRANDS'; brands: string[] }
  | { type: 'FILTER_RATINGS'; ratings: number[] }
  | { type: 'FILTER_PRICE'; min: number; max: number }
  | { type: 'RESET_FILTERS' }
