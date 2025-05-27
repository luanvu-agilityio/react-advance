import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { PlusIcon } from 'lucide-react'
import { productData } from '@dummy-data/product-data'
import { Button, Theme } from '@radix-ui/themes'
import BuyingUnit from './components/BuyingUnit'
import RelatedProducts from './components/RelatedProducts'
import { useNavigate, useParams } from 'react-router-dom'
import { getTabDataByProductId } from '@dummy-data/tab-data'
import ProductTabs from './components/Tabs'
import { renderStars } from '@helpers/renderStar'
import Breadcrumbs from '@components/layout/Breadcrumb/Breadcrumb'
import { useCart } from '@contexts/CartContext'
import { Suspense } from 'react'

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1.6rem 1.5rem;
  }
`

const ProductOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 992px) {
    flex-direction: row;
    gap: 32px;
  }
`

const ImageContainer = styled.div`
  width: 569px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const DiscountBadge = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  background-color: var(--green-shade-4);
  color: var(--green-color-default);
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
`

const ShippingBadge = styled.div`
  position: absolute;
  top: 16px;
  left: 80px;
  background-color: var(--green-shade-4);
  color: var(--green-color-default);
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
`
const ProductImageContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: 12px;
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;

  @media (min-width: 992px) {
    height: 436px;
    margin-bottom: 1rem;
  }
`

const ProductImage = styled.div`
  height: 100%;
  width: 100%;

  img {
    border-radius: 12px;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`

const ProductDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 992px) {
    gap: 40px;
  }
`

const ProductTitle = styled.h1`
  font-size: 24px;
  font-weight: var(--font-weight-semibold);
  margin-bottom: 0.5rem;
  margin-top: 0;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const ReviewCount = styled.span`
  color: var(--black-shade-2);
  font-family: var(--font-family-secondary);
  font-size: 12px;
  font-weight: var(--font-weight-regular);
`

const ProductDescription = styled.p`
  color: var(--black-color-default);
  font-family: var(--font-family-secondary);
  font-size: 15px;
  font-weight: var(--font-weight-regular);
  line-height: 1.6;

  @media (min-width: 768px) {
    font-size: 17px;
  }
`

const ProductInfoTable = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px 40px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const InfoItem = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: baseline;
`

const InfoLabel = styled.div`
  color: var(--black-shade-2);
  font-family: var(--font-family-secondary);
  font-size: 14px;
  font-weight: var(--font-weight-regular);
  min-width: 100px;
`

const InfoValue = styled.div<{ $inStock?: boolean }>`
  color: ${(props) =>
    props.$inStock
      ? 'var(--green-color-default)'
      : 'var(--black-color-default)'};
  font-family: var(--font-family-secondary);
  font-size: 14px;
  font-weight: var(--font-weight-regular);
`

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 15px;
  border-radius: 12px;
  border: 1px solid var(--black-shade-5);
  width: 100%;

  @media (min-width: 576px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    max-width: 534px;
  }
`

const PriceInfo = styled.div``

const CurrentPrice = styled.div`
  font-size: 26px;
  font-weight: var(--font-weight-semibold);
  color: var(--green-color-default);
`

const OriginalPrice = styled.div`
  font-size: 12px;
  color: var(--black-shade-2);
  font-weight: var(--font-weight-semibold);
  text-decoration: line-through;
`

const AddToCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  @media (min-width: 576px) {
    flex-direction: row;
    align-items: center;
    gap: 24px;
    width: auto;
  }
`

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 14px;
  font-weight: var(--font-weight-bold);
  color: var(--black-color-default);
  padding: 8px 12px;
  border: none;
  background-color: transparent;
  width: 100%;

  @media (min-width: 576px) {
    width: auto;
    font-size: 15px;
    justify-content: flex-start;
  }

  &:hover {
    color: var(--green-color-default);
  }
`

const BuyButton = styled(Button)`
  width: 100%;

  @media (min-width: 576px) {
    width: auto;
  }
`

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

  // Add loading effect
  // Import Suspense at the top of the file if not already imported

  // Replace the loading effect with suspense wrapper
  useEffect(() => {
    if (!productId) {
      throw new Promise((resolve) => {
        setTimeout(resolve, 500)
      })
    }
  }, [productId])

  if (!product) {
    return (
      <Suspense
        fallback={
          <Container>
            <div>Loading...</div>
          </Container>
        }
      >
        <Container>
          <div>Product not found</div>
        </Container>
      </Suspense>
    )
  }

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
