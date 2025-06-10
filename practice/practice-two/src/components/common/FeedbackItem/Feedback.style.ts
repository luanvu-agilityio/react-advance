import styled from 'styled-components'

export const FeedbackCard = styled.div`
  flex: 0 0 auto;
  width: 369px;
  min-height: 200px;
  padding: 32px;
  margin-right: 20px;
  background: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  position: relative;
  padding-bottom: 48px;
`

export const FeedbackQuote = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: #333;
  text-align: center;
  margin-bottom: 16px;
  line-height: 1.5;
`

export const FeedbackAuthor = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
`

export const AuthorAvatar = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  & img {
    width: -webkit-fill-available;
    width: -moz-available;
    width: stretch;
  }
`

export const AuthorName = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0;
  text-align: center;
`
