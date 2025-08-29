import { useFormStatus } from 'react-dom'
import { SubmitButton } from '../CheckoutStyle'
import type { FormEvent } from 'react'

function SubmitButtonWithStatus({
  onClick,
}: {
  readonly onClick: (e: FormEvent<HTMLButtonElement>) => void
}) {
  const { pending } = useFormStatus()
  return (
    <SubmitButton type="submit" disabled={pending} onClick={onClick}>
      {pending ? 'Processing...' : 'Complete order'}
    </SubmitButton>
  )
}
export default SubmitButtonWithStatus
