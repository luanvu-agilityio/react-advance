import { Button } from '@radix-ui/themes'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 600px;
  text-align: center;
`

const ErrorTitle = styled.h2`
  color: var(--red-500);
  margin-bottom: 1rem;
`

const ErrorMessage = styled.p`
  margin-bottom: 2rem;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`

interface CheckoutErrorFallbackProps {
  onRetry?: () => void
}

const CheckoutErrorFallback = ({ onRetry }: CheckoutErrorFallbackProps) => {
  const navigate = useNavigate()

  return (
    <ErrorContainer>
      <ErrorTitle>Checkout Error</ErrorTitle>
      <ErrorMessage>
        We encountered a problem processing your checkout. This could be due to
        a temporary issue with our system.
      </ErrorMessage>
      <ButtonContainer>
        <Button onClick={onRetry}>Retry Checkout</Button>
        <Button variant="outline" onClick={() => navigate('/cart')}>
          Return to Cart
        </Button>
      </ButtonContainer>
    </ErrorContainer>
  )
}

export default CheckoutErrorFallback
