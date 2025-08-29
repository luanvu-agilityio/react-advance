'use client'
import { RadioGroup } from '@radix-ui/themes'
import { ViewModeOption } from './ViewModeOption'

import type { CategoryPageHeaderProps } from 'types/Category'
import {
  PageHeader,
  PageTitle,
  ViewModeContainer,
  ProductCount,
  CountBadge,
} from './CategoryStyles'

export const CategoryPageHeader = ({
  title,
  productCount,
  viewMode,
  onViewModeChange,
}: CategoryPageHeaderProps) => (
  <PageHeader>
    <PageTitle>{title}</PageTitle>
    <ViewModeContainer>
      <RadioGroup.Root defaultValue={viewMode} onValueChange={onViewModeChange}>
        <div style={{ display: 'flex', gap: '24px' }}>
          <ViewModeOption
            value="grid"
            label="Grid"
            icon={
              'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372431/grid-view_wvn8gu.svg'
            }
            viewMode={viewMode}
          />
          <ViewModeOption
            value="list"
            label="List"
            icon={
              'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372432/list-view_wqlzwu.svg'
            }
            viewMode={viewMode}
          />
        </div>
      </RadioGroup.Root>
      <ProductCount>
        <CountBadge>{productCount}</CountBadge> Products
      </ProductCount>
    </ViewModeContainer>
  </PageHeader>
)
