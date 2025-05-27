import styled from 'styled-components'
import { Button, Flex } from '@radix-ui/themes'
import { Heart, Star, ChevronRight } from 'lucide-react'
import { useCart } from '@contexts/CartContext'
import { useCallback, useMemo, type MouseEvent as ReactMouseEvent } from 'react'
import type { Product } from 'types/Product'
import { useProductNavigation } from '@hooks/useProductNavigation'

interface ProductCardProps {
  product: Product
  viewMode: string
  onAddToWishlist?: () => void
  onClick?: (id: number) => void
}

const Card = styled.div<{ $variant?: 'grid' | 'list' }>`
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-width: 269px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  cursor: pointer;

  @media (min-width: 901px) {
    flex-direction: ${(props) =>
      props.$variant === 'list' ? 'row' : 'column'};
    padding: ${(props) => (props.$variant === 'list' ? '0' : '16px')};
    gap: ${(props) => (props.$variant === 'list' ? '24px' : '0')};
    max-width: ${(props) => (props.$variant === 'list' ? '100%' : '269px')};
  }
`

const CardImage = styled.div<{ $variant?: 'grid' | 'list' }>`
  width: ${(props) => (props.$variant === 'list' ? '268px' : '100%')};
  height: ${(props) => (props.$variant === 'list' ? 'auto' : '180px')};
  position: relative;
  background-color: #f8f8f8;
  border-radius: ${(props) =>
    props.$variant === 'list' ? '12px 0 0 12px' : '12px'};
  margin-bottom: ${(props) => (props.$variant === 'list' ? '0' : '16px')};
  flex-shrink: 0;
`

const DiscountBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: var(--green-shade-4);
  border-radius: 4px;
  padding: 0 8px;
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
  color: var(--green-color-default);
`

const CardContent = styled.div<{ $variant?: 'grid' | 'list' }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  ${(props) =>
    props.$variant === 'list'
      ? `
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 32px 0 ;
  `
      : ''}
`

const ProductTitle = styled.h3<{ $variant?: 'grid' | 'list' }>`
  margin: 0;
  font-size: ${(props) => (props.$variant === 'list' ? '22px' : '15px')};
  font-weight: var(--font-weight-medium);
  color: var(--black-color-default);
  margin-bottom: ${(props) => (props.$variant === 'list' ? '8px' : '0')};
`

const ProductDescription = styled.p`
  margin: 0;
  font-family: var(--font-family-secondary);
  font-size: 12px;
  font-weight: var(--font-weight-regular);
  color: var(--black-shade-1);
  margin-bottom: 8px;
`

const RatingContainer = styled.div`
  display: flex;
  gap: 2px;
  margin-bottom: 16px;
`

const PriceContainer = styled.div<{ $variant?: 'grid' | 'list' }>`
  display: flex;
  ${(props) =>
    props.$variant === 'list'
      ? `
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 32px;
    `
      : `
  
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
    `}
`

const Price = styled.div<{ $variant?: 'grid' | 'list' }>`
  display: flex;
  flex-direction: column;
  ${(props) => (props.$variant === 'list' ? 'align-items: flex-start;' : '')}
  margin-bottom: ${(props) => (props.$variant === 'list' ? '12px' : '0')};
`

const CurrentPrice = styled.span<{ $variant?: 'grid' | 'list' }>`
  font-size: 18px;
  font-weight: var(--font-weight-semibold);
  color: #111827;
`

const OriginalPrice = styled.span<{ $variant?: 'grid' | 'list' }>`
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
  color: var(--black-shade-2);
  text-decoration: line-through;
  text-align: ${(props) => (props.$variant === 'list' ? 'right' : 'left')};
`

const ProductInfoGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px 16px;
`

const InfoLabel = styled.span`
  color: var(--black-shade-1);
  font-size: 14px;
`

const InfoValue = styled.span<{ highlight?: boolean }>`
  font-size: 14px;
  color: ${(props) =>
    props.highlight ? '#65a30d' : 'var(--black-color-default)'};
  font-weight: ${(props) =>
    props.highlight
      ? 'var(--font-weight-medium)'
      : 'var(--font-weight-regular)'};
`

const ButtonsContainer = styled.div<{ $variant?: 'grid' | 'list' }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  ${(props) => (props.$variant === 'list' ? 'align-items: flex-end;' : '')}
`
const ShippingInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 12px;
`

const FreeShippingText = styled.span`
  font-size: 12px;
  color: var(--black-shade-2);
`

const DeliveryTimeText = styled.span`
  font-size: 12px;
  color: var(--black-shade-2);
`

export const ProductCard = ({
  product,
  viewMode,
  onAddToWishlist,
  onClick,
}: ProductCardProps) => {
  const { addItem } = useCart()
  const { navigateToProduct } = useProductNavigation()

  const {
    id,
    title,
    description,
    category,
    subcategory,
    price,
    originalPrice,
    discountPercentage,
    rating,
    imageUrl,
    delivery,
    farm,
    freshness,
    stock,
    freeShipping,
  } = product

  const maxRating = 5
  const variant = viewMode === 'grid' ? 'grid' : 'list'

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(product.id)
    } else {
      navigateToProduct(product)
    }
  }, [onClick, product, navigateToProduct])

  const handleBuy = useCallback(
    (e: ReactMouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      e.preventDefault()

      addItem(
        {
          id,
          title,
          description,
          price,
          originalPrice: originalPrice ?? price,
          category,
          subcategory,
          rating: rating,
          imageUrl,
          discountPercentage,
          farm: farm,
          freshness: freshness,
          delivery: {
            time: delivery?.time ?? '1-2 days',
            location: delivery?.location ?? 'All Countries',
          },
          stock: stock,
          freeShipping: freeShipping ?? false,
        },
        1,
        'pcs'
      )
    },
    [
      id,
      title,
      description,
      price,
      originalPrice,
      category,
      subcategory,
      rating,
      imageUrl,
      discountPercentage,
      farm,
      freshness,
      delivery,
      stock,
      freeShipping,
      addItem,
    ]
  )

  const handleProductDetail = useCallback(
    (e: ReactMouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      handleClick()
    },
    [handleClick]
  )

  const handleWishlistClick = useCallback(
    (e: ReactMouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      onAddToWishlist?.()
    },
    [onAddToWishlist]
  )

  const stars = useMemo(
    () =>
      [...Array(maxRating)].map((_, i) => (
        <Star
          key={`star-${title}-${i}`}
          size={16}
          fill={i < rating ? 'var(--black-color-default)' : 'none'}
          color={i < rating ? 'var(--black-color-default)' : '#d1d5db'}
        />
      )),
    [maxRating, rating, title]
  )

  // Create memoized components instead of functions
  const productInfoGrid = useMemo(() => {
    if (variant !== 'list') return null

    return (
      <ProductInfoGrid>
        {delivery?.time && (
          <>
            <InfoLabel>Delivery in</InfoLabel>
            <InfoValue>{delivery.time}</InfoValue>
          </>
        )}
        {freshness && (
          <>
            <InfoLabel>Freshness</InfoLabel>
            <InfoValue highlight={freshness.toLowerCase().includes('new')}>
              {freshness}
            </InfoValue>
          </>
        )}
        {farm && (
          <>
            <InfoLabel>Farm</InfoLabel>
            <InfoValue>{farm}</InfoValue>
          </>
        )}
        {delivery?.location && (
          <>
            <InfoLabel>Delivery</InfoLabel>
            <InfoValue>{delivery.location}</InfoValue>
          </>
        )}
        {stock && (
          <>
            <InfoLabel>Stock</InfoLabel>
            <InfoValue>{stock}</InfoValue>
          </>
        )}
      </ProductInfoGrid>
    )
  }, [variant, delivery, freshness, farm, stock])

  const actionButtons = useMemo(() => {
    const commonButtonStyles = {
      backgroundColor: 'var(--green-color-default)',
      color: 'var(--white-color)',
      fontSize: '15px',
      fontWeight: 'var(--font-weight-bold)',
      padding: '12px 16px',
      borderRadius: '12px',
      border: '2px solid var(--green-shade-1)',
      cursor: 'pointer',
    }

    if (!product) {
      return null
    }

    return (
      <ButtonsContainer $variant={variant}>
        {variant === 'list' ? (
          <Button
            variant="solid"
            size="2"
            onClick={handleProductDetail}
            style={{
              ...commonButtonStyles,
              minWidth: '160px',
              minHeight: '47px',
            }}
          >
            <Flex align="center">
              Product Detail
              <ChevronRight
                size={15}
                color="white"
                style={{ strokeWidth: 5, marginLeft: '8px' }}
              />
            </Flex>
          </Button>
        ) : (
          <Button
            variant="solid"
            size="2"
            onClick={handleBuy}
            style={{
              ...commonButtonStyles,
              minHeight: '36px',
            }}
          >
            Buy now
          </Button>
        )}

        {variant === 'list' && onAddToWishlist && (
          <Button
            variant="outline"
            size="2"
            onClick={handleWishlistClick}
            style={{
              minWidth: '160px',
              backgroundColor: 'var(--black-shade-5)',
              color: 'var(--black-color)',
              fontWeight: 'var(--font-weight-bold)',
              fontSize: '15px',
              padding: '6px 12px',
              borderRadius: '12px',
            }}
          >
            <Flex align="center" gap="2">
              <Heart size={15} style={{ strokeWidth: 4, marginRight: '8px' }} />
              Add to wish list
            </Flex>
          </Button>
        )}
      </ButtonsContainer>
    )
  }, [
    variant,
    handleProductDetail,
    handleBuy,
    handleWishlistClick,
    onAddToWishlist,
  ])

  const shippingInfo = useMemo(() => {
    if (variant !== 'list' || !freeShipping) return null

    return (
      <ShippingInfo>
        <FreeShippingText>Free Shipping</FreeShippingText>
        {delivery?.time && (
          <DeliveryTimeText>Delivery in {delivery.time}</DeliveryTimeText>
        )}
      </ShippingInfo>
    )
  }, [variant, freeShipping, delivery?.time])

  return (
    <Card $variant={variant} onClick={handleClick}>
      <CardImage $variant={variant}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        )}
        {discountPercentage && (
          <DiscountBadge>- {discountPercentage} %</DiscountBadge>
        )}
      </CardImage>

      <CardContent $variant={variant}>
        <div>
          <ProductTitle $variant={variant}>{title}</ProductTitle>
          {description && (
            <ProductDescription>{description}</ProductDescription>
          )}
          <RatingContainer>{stars}</RatingContainer>
        </div>

        {productInfoGrid}
      </CardContent>

      <PriceContainer $variant={variant}>
        <Price $variant={variant}>
          <CurrentPrice $variant={variant}>${price.toFixed(2)}</CurrentPrice>
          {originalPrice && (
            <OriginalPrice $variant={variant}>
              ${originalPrice.toFixed(2)}
            </OriginalPrice>
          )}
        </Price>

        {shippingInfo}
        {actionButtons}
      </PriceContainer>
    </Card>
  )
}
