import {
  AuthorAvatar,
  AuthorName,
  FeedbackAuthor,
  FeedbackCard,
  FeedbackQuote,
} from './Feedback.style'

interface FeedbackItemProps {
  quote: string
  name: string
}

export const FeedbackItem = ({ quote, name }: FeedbackItemProps) => {
  return (
    <FeedbackCard>
      <FeedbackQuote>"{quote}"</FeedbackQuote>
      <FeedbackAuthor>
        <AuthorName>{name}</AuthorName>
      </FeedbackAuthor>
      <AuthorAvatar>
        <img
          src="https://res.cloudinary.com/ds82onf5q/image/upload/v1748372403/avatar-1_l6rb1m.svg"
          alt="Customer Avatar"
        />
      </AuthorAvatar>
    </FeedbackCard>
  )
}
