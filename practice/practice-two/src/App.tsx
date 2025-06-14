import '@radix-ui/themes/styles.css'
import './styles/theme.css'
import './styles/index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CategoryPage from '@pages/Category/CategoryPage'
import HomePage from '@pages/HomePage/HomePage'
import PageLayout from '@layouts/PageLayout/PageLayout'
import CheckoutPage from '@pages/Checkout/CheckoutPage'
import { lazy, Suspense } from 'react'
import { LoadingSpinner } from '@components/common/LoadingSpinner'
import ErrorBoundary from '@components/common/ErrorBoundary/ErrorBoundary'
import CartModal from '@components/Cart/CartModal/CartModal'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeWrapper } from './styles/theme-config'
import { ToastRoot } from '@components/common/Toast/ToastRoot'

const ProductDetailsPage = lazy(
  () => import('@pages/ProductDetails/ProductDetails')
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ThemeWrapper>
            <PageLayout>
              <Routes>
                <Route
                  path="/"
                  element={
                    <ErrorBoundary>
                      <HomePage />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/all-products"
                  element={
                    <ErrorBoundary>
                      <CategoryPage />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/search-results"
                  element={
                    <ErrorBoundary>
                      <CategoryPage />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/:categoryPath"
                  element={
                    <ErrorBoundary>
                      <CategoryPage />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <ErrorBoundary>
                      <CheckoutPage />
                    </ErrorBoundary>
                  }
                />
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
              </Routes>
              <CartModal />
              <ToastRoot />
            </PageLayout>
          </ThemeWrapper>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
