import '@radix-ui/themes/styles.css'
import './styles/index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CategoryPage from '@pages/Category/CategoryPage'
import HomePage from '@pages/HomePage/HomePage'
import ProductDetailsPage from '@pages/ProductDetails/ProductDetails'
import PageLayout from '@pages/PageLayout/PageLayout'
import { CartProvider } from '@contexts/CartContext'
import CartModal from '@pages/Cart/CartModal'
import CheckoutPage from '@pages/Checkout/CheckoutPage'

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
              element={<ProductDetailsPage />}
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
