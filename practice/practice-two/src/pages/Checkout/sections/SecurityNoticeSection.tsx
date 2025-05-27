import { SecurityNotice, SecurityIcon, SecurityText } from '../CheckoutStyle'

export const SecurityNoticeSection: React.FC = () => (
  <SecurityNotice>
    <SecurityIcon>
      <img
        src="https://res.cloudinary.com/ds82onf5q/image/upload/v1748372477/safety_uf3wdi.png"
        alt="Security icon"
      />
    </SecurityIcon>
    <SecurityText>
      All your data are safe
      <span>
        {' '}
        We are using the most advanced security to provide you the best
        experience ever.
      </span>
    </SecurityText>
  </SecurityNotice>
)

export default SecurityNoticeSection
