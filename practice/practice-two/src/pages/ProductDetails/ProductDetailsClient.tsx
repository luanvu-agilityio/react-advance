'use client'
import { useState } from 'react'
import { PlusIcon } from 'lucide-react'
import { Spinner } from '@radix-ui/themes'
import BuyingUnit from '@components/common/BuyingUnit/BuyingUnit'

import ProductTabs from '@components/common/Tabs/Tabs'
import { renderStars } from '@helpers/renderStar'
import Breadcrumbs from '@layouts/Breadcrumb/Breadcrumb'
import { useAddToCart } from '@hooks/useCartMutation'

import {
  ActionButton,
  ActionContainer,
  AddToCartContainer,
  BuyButton,
  Container,
  CurrentPrice,
  DiscountBadge,
  ImageContainer,
  InfoItem,
  InfoLabel,
  InfoValue,
  OriginalPrice,
  PriceContainer,
  PriceInfo,
  ProductDescription,
  ProductDetails,
  ProductImage,
  ProductImageContainer,
  ProductInfoTable,
  ProductOverview,
  ProductTitle,
  RatingContainer,
  ReviewCount,
  ShippingBadge,
} from './ProductDetailStyles'
import type { Product } from 'types/Product'
import type { TabData } from 'types/tab-data'

import RelatedProducts from './RelatedProducts/RelatedProducts'

// Props are passed from the server component
const ProductDetailsClient = ({
  product,
  productTabData,
  relatedProducts,
}: {
  product: Product
  productTabData: TabData
  relatedProducts: Product[]
}) => {
  const [quantity, setQuantity] = useState(1)
  const [buyUnit, setBuyUnit] = useState('pcs')

  // Use cart mutation hook
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart()

  // Handle adding to cart
  const onBuy = () => {
    if (product) {
      addToCart({
        product,
        quantity,
        unit: buyUnit,
      })
    }
  }

  // If no product found
  if (!product) {
    return (
      <Container>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Product not found</h2>
          <p>
            The product you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <Breadcrumbs style={{ padding: '12px 0' }} />

      {/* Product Overview Section */}
      <ProductOverview>
        {/* Product Image Gallery */}
        <ImageContainer>
          <ProductImageContainer>
            {product.discountPercentage && (
              <DiscountBadge>-{product.discountPercentage}%</DiscountBadge>
            )}
            {product.freeShipping && (
              <ShippingBadge>Free shipping</ShippingBadge>
            )}
            <ProductImage>
              <img src={product.images.main} alt={product.title} />
            </ProductImage>
          </ProductImageContainer>

          {/* Display all gallery images */}
          {product.images.gallery &&
            product.images.gallery.length > 1 &&
            product.images.gallery
              .slice(1)
              .map((image: string, index: number) => (
                <ProductImageContainer key={index}>
                  <ProductImage>
                    <img
                      src={image}
                      alt={`${product.title} view ${index + 2}`}
                    />
                  </ProductImage>
                </ProductImageContainer>
              ))}
        </ImageContainer>

        {/* Product Details */}
        <ProductDetails>
          <div>
            <ProductTitle>{product.title}</ProductTitle>

            <RatingContainer>
              {renderStars(product.rating)}
              <ReviewCount>({product.rating} customer review)</ReviewCount>
            </RatingContainer>
          </div>

          <ProductDescription>{product.description}</ProductDescription>

          {/* Product Info Table */}
          <div>
            <ProductInfoTable>
              <InfoItem>
                <InfoLabel>SKU:</InfoLabel>
                <InfoValue>{product.id + 12345}</InfoValue>
              </InfoItem>

              <InfoItem>
                <InfoLabel>Freshness:</InfoLabel>
                <InfoValue>{product.freshness}</InfoValue>
              </InfoItem>

              <InfoItem>
                <InfoLabel>Category:</InfoLabel>
                <InfoValue>{product.subcategory}</InfoValue>
              </InfoItem>

              <InfoItem>
                <InfoLabel>Buy by:</InfoLabel>
                <InfoValue>pcs, kgs, box, pack</InfoValue>
              </InfoItem>

              <InfoItem>
                <InfoLabel>Stock:</InfoLabel>
                <InfoValue $inStock={true}>{product.stock}</InfoValue>
              </InfoItem>

              <InfoItem>
                <InfoLabel>Delivery:</InfoLabel>
                <InfoValue>in {product.delivery.time}</InfoValue>
              </InfoItem>

              <InfoItem>
                <InfoLabel>Farm:</InfoLabel>
                <InfoValue>{product.farm}</InfoValue>
              </InfoItem>

              <InfoItem>
                <InfoLabel>Delivery area:</InfoLabel>
                <InfoValue>{product.delivery.location}</InfoValue>
              </InfoItem>
            </ProductInfoTable>
          </div>

          {/* Price and Add to Cart */}
          <div>
            <PriceContainer>
              <PriceInfo>
                <CurrentPrice>{product.price.toFixed(2)} USD</CurrentPrice>
                {Boolean(product.originalPrice) && (
                  <OriginalPrice>
                    {product.originalPrice.toFixed(2)} USD
                  </OriginalPrice>
                )}
              </PriceInfo>

              <AddToCartContainer>
                <div style={{ minHeight: '48px' }}>
                  <BuyingUnit
                    quantity={quantity}
                    unit={buyUnit}
                    onQuantityChange={setQuantity}
                    onUnitChange={setBuyUnit}
                  />
                </div>

                <BuyButton
                  variant="solid"
                  onClick={onBuy}
                  disabled={isAddingToCart}
                  style={{
                    padding: '10px 16px',
                    minHeight: '47px',
                    cursor: isAddingToCart ? 'not-allowed' : 'pointer',
                    opacity: isAddingToCart ? 0.7 : 1,
                  }}
                >
                  {isAddingToCart ? (
                    <Spinner size="1" />
                  ) : (
                    <>
                      <PlusIcon
                        size={15}
                        color="white"
                        style={{ strokeWidth: 5, marginRight: '8px' }}
                      />
                      Add to cart
                    </>
                  )}
                </BuyButton>
              </AddToCartContainer>
            </PriceContainer>

            {/* Wishlist and Compare */}
            <ActionContainer>
              <ActionButton>
                <img
                  src="https://res.cloudinary.com/ds82onf5q/image/upload/v1748372435/wishlist-red_vhgkuv.svg"
                  alt="Wishlist icon"
                  style={{ width: '16px', height: '16px' }}
                />
                <span>Add to my wish list</span>
              </ActionButton>

              <ActionButton>
                <img
                  src="https://res.cloudinary.com/ds82onf5q/image/upload/v1748372430/compare_oeiv1m.svg"
                  alt="Compare icon"
                  style={{ width: '16px', height: '16px' }}
                />
                <span>Compare</span>
              </ActionButton>
            </ActionContainer>
          </div>

          {/* Tabs Section */}
          {productTabData && (
            <ProductTabs
              description={{
                ...productTabData.description,
                origins: productTabData.description?.origins ?? '',
                cookingInfo: productTabData.description?.cookingInfo ?? '',
                vitamins: productTabData.description?.vitamins ?? [],
              }}
              reviews={productTabData.reviews ?? { count: 0, items: [] }}
              questions={productTabData.questions ?? { count: 0, items: [] }}
            />
          )}
        </ProductDetails>
      </ProductOverview>

      {/* Related Products Section */}
      {relatedProducts && relatedProducts.length > 0 && (
        <RelatedProducts
          products={relatedProducts}
          subcategory={product.subcategory}
        />
      )}
    </Container>
  )
}

export default ProductDetailsClient
