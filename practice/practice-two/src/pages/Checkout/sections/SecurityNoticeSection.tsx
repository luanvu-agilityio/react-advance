import { SecurityNotice, SecurityIcon, SecurityText } from '../CheckoutStyle'

export const SecurityNoticeSection: React.FC = () => (
  <SecurityNotice>
    <SecurityIcon>
      <img src="/src/assets/images/safety.png" alt="Security icon" />
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
