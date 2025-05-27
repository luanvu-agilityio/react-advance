import { useEffect, useMemo, useState } from 'react'

import { PlusIcon } from 'lucide-react'
import { productData } from '@data/product-data'
import { Spinner, Theme } from '@radix-ui/themes'
import BuyingUnit from './components/BuyingUnit'
import RelatedProducts from './components/RelatedProducts'
import { useNavigate, useParams } from 'react-router-dom'
import { getTabDataByProductId } from '@data/tab-data'
import ProductTabs from './components/Tabs'
import { renderStars } from '@helpers/renderStar'
import Breadcrumbs from '@components/layout/Breadcrumb/Breadcrumb'
import { useCart } from '@contexts/CartContext'

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

const ProductDetailPage = () => {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [buyUnit, setBuyUnit] = useState('pcs')
  const { productId } = useParams()

  const product = useMemo(
    () => productData.find((p) => p.id === Number(productId)),
    [productId]
  )

  // Get tab data based on product ID
  const productTabData = useMemo(() => {
    if (!productId) return getTabDataByProductId(0)
    return getTabDataByProductId(Number(productId))
  }, [productId])

  useEffect(() => {
    if (!productId) {
      throw new Promise((resolve) => {
        setTimeout(resolve, 500)
      })
    }
  }, [productId])

  const handleProductClick = (newProductId: number) => {
    const newProduct = productData.find((p) => p.id === newProductId)
    if (newProduct) {
      const categoryPath = newProduct.category.toLowerCase().replace(/ /g, '-')
      const subcategoryPath = newProduct.subcategory
        .toLowerCase()
        .replace(/ /g, '-')
      navigate(`${categoryPath}/${subcategoryPath}/${newProductId}`)
      window.scrollTo(0, 0)
    }
  }

  const onBuy = () => {
    if (product) {
      addItem(product, quantity, buyUnit)
    }
  }

  if (!product) {
    return <Spinner />
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

          {product.images.gallery.slice(1, 3).map((image, index) => (
            <ProductImageContainer key={index}>
              <ProductImage>
                <img src={image} alt={`${product.title} view ${index + 2}`} />
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
                <Theme style={{ minHeight: '48px' }}>
                  <BuyingUnit
                    quantity={quantity}
                    unit={buyUnit}
                    onQuantityChange={setQuantity}
                    onUnitChange={setBuyUnit}
                  />
                </Theme>

                <BuyButton
                  variant="solid"
                  onClick={onBuy}
                  style={{
                    backgroundColor: 'var(--green-color-default)',
                    color: 'var(--white-color)',
                    fontSize: '15px',
                    fontWeight: 'var(--font-weight-bold)',
                    padding: '10px 16px',
                    borderRadius: '12px',
                    border: '2px solid var(--green-shade-1)',
                  }}
                >
                  <PlusIcon
                    size={15}
                    color="white"
                    style={{ strokeWidth: 5, marginRight: '8px' }}
                  />
                  Add to cart
                </BuyButton>
              </AddToCartContainer>
            </PriceContainer>

            {/* Wishlist and Compare */}
            <ActionContainer>
              <ActionButton>
                <img
                  src="/src/assets/images/icons/wishlist-red.svg"
                  alt="Wishlist icon"
                  style={{ width: '16px', height: '16px' }}
                />
                <span>Add to my wish list</span>
              </ActionButton>

              <ActionButton>
                <img
                  src="/src/assets/images/icons/compare.svg"
                  alt="Compare icon"
                  style={{ width: '16px', height: '16px' }}
                />
                <span>Compare</span>
              </ActionButton>
            </ActionContainer>
          </div>

          {/* Tabs Section */}
          <ProductTabs
            description={{
              ...productTabData.description,
              vitamins: productTabData.description.vitamins ?? [],
            }}
            reviews={productTabData.reviews}
            questions={productTabData.questions}
          />
        </ProductDetails>
      </ProductOverview>

      {/* Related Products Section */}

      <RelatedProducts
        currentProductId={product.id}
        subcategory={product.subcategory}
        onProductClick={handleProductClick}
      />
    </Container>
  )
}

export default ProductDetailPage
