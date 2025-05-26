import styled from 'styled-components'
const Stars = styled.div`
  display: flex;
  gap: 2px;
`

const Star = styled.span<{ $filled?: boolean }>`
  font-size: 20px;
  color: ${(props) => (props.$filled ? '#f9ca24' : '#ddd')};
`

export const renderStars = (rating: number) => {
  return (
    <Stars>
      {[...Array(5)].map((_, i) => (
        <Star key={i} $filled={i < rating}>
          ★
        </Star>
      ))}
    </Stars>
  )
}
