import { useFormStatus } from 'react-dom'
import { SubmitButton } from '../CheckoutStyle'

function SubmitButtonWithStatus() {
  const { pending } = useFormStatus()

  return (
    <SubmitButton type="submit" disabled={pending}>
      {pending ? 'Processing... ' : 'Complete order'}
    </SubmitButton>
  )
}

export default SubmitButtonWithStatus
