'use client'

import { useParams } from 'react-router-dom'
import ProductDetailsView from './ProductDetailsView'
import { LoadingSpinner } from '@components/common/LoadingSpinner'
import {
  useProductDetails,
  useProductTabData,
  useRelatedProducts,
} from '@hooks/useProductQuery'

export default function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>()
  const id = Number(productId)

  const { data: product, isLoading: loadingProduct } =
    useProductDetails(productId)

  const { data: productTabData, isLoading: loadingTabs } = useProductTabData(id)

  const { data: relatedProducts, isLoading: loadingRelated } =
    useRelatedProducts(id, product?.subcategory)

  if (!id) return <div>Invalid product ID</div>
  if (loadingProduct || loadingTabs || loadingRelated) return <LoadingSpinner />
  if (!product) return <div>Product not found</div>
  if (!productTabData) return <div>Tab data not found</div>

  return (
    <ProductDetailsView
      product={product}
      productTabData={productTabData}
      relatedProducts={relatedProducts ?? []}
    />
  )
}
