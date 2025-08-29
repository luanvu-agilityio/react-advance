'use client'

import { useParams } from 'react-router-dom'
import productApi from '@services/product'
import ProductDetailsClient from './ProductDetailsClient'
import { useQuery } from '@tanstack/react-query'
import { LoadingSpinner } from '@components/common/LoadingSpinner'

export default function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>()
  const id = Number(productId)

  // Fetch product data using Tanstack Query
  const { data: product, isLoading: loadingProduct } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductById(id),
    enabled: !!id,
  })

  const { data: productTabData, isLoading: loadingTabs } = useQuery({
    queryKey: ['productTabData', id],
    queryFn: () => productApi.getTabDataByProductId(id),
    enabled: !!id,
  })

  const { data: relatedProducts, isLoading: loadingRelated } = useQuery({
    queryKey: ['relatedProducts', id, product?.subcategory],
    queryFn: () =>
      productApi.getRelatedProducts(id, product?.subcategory ?? ''),
    enabled: !!id && !!product?.subcategory,
  })

  if (!id) return <div>Invalid product ID</div>
  if (loadingProduct || loadingTabs || loadingRelated) return <LoadingSpinner />
  if (!product) return <div>Product not found</div>
  if (!productTabData) return <div>Tab data not found</div>

  return (
    <ProductDetailsClient
      product={product}
      productTabData={productTabData}
      relatedProducts={relatedProducts ?? []}
    />
  )
}
