'use client'

import { Button, Flex } from '@radix-ui/themes'
import { Heart, ChevronRight } from 'lucide-react'
import {
  memo,
  useCallback,
  useMemo,
  type MouseEvent as ReactMouseEvent,
} from 'react'
import type { Product } from 'types/Product'
import { useProductNavigation } from '@hooks/useProductNavigation'
import {
  ButtonsContainer,
  Card,
  CardContent,
  CardImage,
  CurrentPrice,
  DeliveryTimeText,
  DiscountBadge,
  FreeShippingText,
  InfoLabel,
  InfoValue,
  OriginalPrice,
  Price,
  PriceContainer,
  ProductDescription,
  ProductInfoGrid,
  ProductTitle,
  RatingContainer,
  ShippingInfo,
} from './ProductCard.styles'
import { useCartStore } from '@stores/cartStore'
import { useToast } from '@stores/toastStore'
const fullBlackStarIcon =
  'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372429/black-star_vfret7.svg'
const emptyStarIcon =
  'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372430/empty-star_psseed.svg'
interface ProductCardProps {
  product: Product
  viewMode: string
  onAddToWishlist?: () => void
  onClick?: (id: number) => void
}

export const ProductCard = memo(
  ({ product, viewMode, onAddToWishlist, onClick }: ProductCardProps) => {
    const { addItem } = useCartStore()
    const { navigateToProduct } = useProductNavigation()

    const { toast } = useToast()

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
      images,
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
            images: images,
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

        toast({
          title: 'Added to cart',
          description: `${title} has been added to your cart`,
          variant: 'success',
          duration: 3000,
        })
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
        images,
        discountPercentage,
        farm,
        freshness,
        delivery,
        stock,
        freeShipping,
        addItem,
        toast,
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
          <img
            key={`star-${title}-${i}`}
            src={i < rating ? fullBlackStarIcon : emptyStarIcon}
            alt={i < rating ? 'Full star' : 'Empty star'}
            style={{
              width: '16px',
              height: '16px',
              marginRight: '2px',
            }}
          />
        )),
      [maxRating, rating, title]
    )

    // Create memoized components
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
              <InfoValue $highlight={freshness.toLowerCase().includes('new')}>
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
      if (!product) {
        return null
      }

      return (
        <ButtonsContainer $variant={variant}>
          {variant === 'list' ? (
            <Button variant="solid" size="2" onClick={handleProductDetail}>
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
            <Button variant="solid" size="1" onClick={handleBuy}>
              Buy now
            </Button>
          )}

          {variant === 'list' && (
            <Button variant="ghost" size="1" onClick={handleWishlistClick}>
              <Flex align="center" gap="2">
                <Heart
                  size={15}
                  style={{ strokeWidth: 4, marginRight: '8px' }}
                />
                Add to wish list
              </Flex>
            </Button>
          )}
        </ButtonsContainer>
      )
    }, [variant, handleProductDetail, handleBuy, handleWishlistClick, product])

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
          {images?.main && (
            <img
              src={images.main}
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
            {!!originalPrice && (
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
)
ProductCard.displayName = 'ProductCard'
