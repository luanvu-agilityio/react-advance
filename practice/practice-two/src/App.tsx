import '@radix-ui/themes/styles.css'
import './styles/index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CategoryPage from '@pages/Category/CategoryPage'
import HomePage from '@pages/HomePage/HomePage'
import PageLayout from '@layouts/PageLayout/PageLayout'
import { CartProvider } from '@contexts/CartContext'
import CheckoutPage from '@pages/Checkout/CheckoutPage'
import { lazy, Suspense } from 'react'
import { LoadingSpinner } from '@components/common/LoadingSpinner'
import ErrorBoundary from '@components/common/ErrorBoundary/ErrorBoundary'
import CartModal from '@components/Cart/CartModal/CartModal'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const ProductDetailsPage = lazy(
  () => import('@pages/ProductDetails/ProductDetails')
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <PageLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/all-products" element={<CategoryPage />} />
              <Route path="/search-results" element={<CategoryPage />} />
              <Route path="/:categoryPath" element={<CategoryPage />} />
              <Route
                path="/:categoryPath/:subcategory/:productId"
                element={
                  <ErrorBoundary>
                    <Suspense fallback={<LoadingSpinner />}>
                      <ProductDetailsPage />
                    </Suspense>
                  </ErrorBoundary>
                }
              />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
            <CartModal />
          </PageLayout>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </CartProvider>
    </QueryClientProvider>
  )
}

export default App
