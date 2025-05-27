import '@radix-ui/themes/styles.css'
import './styles/index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CategoryPage from '@pages/Category/CategoryPage'
import HomePage from '@pages/HomePage/HomePage'
import PageLayout from '@pages/PageLayout/PageLayout'
import { CartProvider } from '@contexts/CartContext'
import CartModal from '@components/Cart/CartModal'
import CheckoutPage from '@pages/Checkout/CheckoutPage'
import { lazy, Suspense } from 'react'
import { LoadingSpinner } from '@components/common/LoadingSpinner'
import ErrorBoundary from '@components/common/ErrorBoundary'

const ProductDetailsPage = lazy(
  () => import('@pages/ProductDetails/ProductDetails')
)

function App() {
  return (
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
    </CartProvider>
  )
}

export default App
