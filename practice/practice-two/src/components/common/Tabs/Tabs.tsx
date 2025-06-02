import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import styled from 'styled-components'
import { renderStars } from '@helpers/renderStar'

const TabsContainer = styled.div`
  margin-bottom: 2rem;
`

const CustomTabsList = styled(TabsList)`
  display: flex;
  overflow-x: auto;
  border-bottom: 1px solid #eee;
  background-color: transparent;
  margin-bottom: 1.5rem;
  width: 100%;
  justify-content: flex-start;
  padding-bottom: 1px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    gap: 16px;
  }
`

const CustomTabsTrigger = styled(TabsTrigger)`
  padding: 0 63px 16px 0;
  font-weight: var(--font-weight-semibold);
  font-size: 18px;
  border: none;
  background-color: transparent;
  color: var(--black-color-default);
  border-radius: 0;
  display: flex;
  align-items: center;
  gap: 10px;

  &[data-state='active'] {
    border-bottom: 1px solid var(--green-color-default);
    background-color: transparent;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    padding: 0 0 16px 0;
    font-size: 16px;
  }
`

const TabCount = styled.span`
  font-size: 12px;
  background-color: var(--green-shade-4);
  padding: 0 8px;
  border-radius: 12px;
  color: var(--green-color-default);
`

const SectionTitle = styled.h3`
  font-size: 15px;
  font-weight: var(--font-size-medium);
  margin-bottom: 0.75rem;
`

const SectionText = styled.p`
  font-family: var(--font-family-secondary);
  font-size: 14px;
  font-weight: var(--font-size-regular);
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  display: table;
`

const TableHead = styled.thead`
  border-bottom: 1px solid #fdfdfd;
  display: table-header-group;

  tr {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`

const TableRow = styled.tr`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

const TableHeader = styled.th`
  text-align: left;
  padding: 7px 0;
  color: var(--black-color-default);
  font-weight: var(--font-weight-semibold);
  font-size: 12px;
`

const TableCell = styled.td`
  padding: 10.5px 0;
  color: var(--black-shade-1);
  font-size: 14px;
  font-family: var(--font-family-secondary);
  font-weight: var(--font-weight-regular);
`
const ReviewItem = styled.div`
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

const ReviewAuthor = styled.div`
  font-weight: 500;
  font-size: 12px;
  font-weight: var(--font-weight-medium);
`

const ReviewDate = styled.div`
  font-size: 12px;
  color: var(--black-shade-3);
`

const QuestionItem = styled.div`
  border-bottom: 1px solid var(--black-shade-2);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`

const QuestionTitle = styled.div`
  font-weight: var(--font-weight-medium);
  font-size: 14px;
  margin-bottom: 0.5rem;
`

const QuestionAnswer = styled.p`
  margin-bottom: 0.5rem;
  font-size: 14px;
  font-weight: var(--font-weight-regular);
  opacity: 0.7;
`

const QuestionMeta = styled.div`
  font-size: 12px;
  font-family: var(--font-family-secondary);
  color: var(--black-shade-1);
`

interface ProductTabsProps {
  description: {
    origins: string
    cookingInfo: string
    vitamins: Array<{
      name: string
      quantity: string
      dv: string
    }>
  }
  reviews: {
    count: number
    items: Array<{
      author: string
      date: string
      rating: number
      comment: string
    }>
  }
  questions: {
    count: number
    items: Array<{
      question: string
      answer: string
      author: string
      date: string
    }>
  }
}

const ProductTabs = ({ description, reviews, questions }: ProductTabsProps) => {
  return (
    <TabsContainer>
      <Tabs defaultValue="description">
        <CustomTabsList>
          <CustomTabsTrigger value="description">Description</CustomTabsTrigger>
          <CustomTabsTrigger value="reviews">
            Reviews <TabCount>{reviews.count}</TabCount>
          </CustomTabsTrigger>
          <CustomTabsTrigger value="questions">
            Questions <TabCount>{questions.count}</TabCount>
          </CustomTabsTrigger>
        </CustomTabsList>

        <TabsContent
          value="description"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}
        >
          {/* Description content */}
          <div>
            <SectionTitle>Origins</SectionTitle>
            <SectionText>{description.origins}</SectionText>
          </div>

          <div>
            <SectionTitle>How to cook</SectionTitle>
            <SectionText>{description.cookingInfo}</SectionText>
          </div>

          {/* Only show vitamins if they exist */}
          {description.vitamins && description.vitamins.length > 0 && (
            <div>
              <SectionTitle>Full of Vitamins!</SectionTitle>
              <div
                style={{
                  overflowX: 'auto',
                }}
              >
                <Table>
                  <TableHead>
                    <tr>
                      <TableHeader>Vitamins</TableHeader>
                      <TableHeader>Quantity</TableHeader>
                      <TableHeader>% DV</TableHeader>
                    </tr>
                  </TableHead>
                  <tbody>
                    {description.vitamins.map((vitamin, index) => (
                      <TableRow key={index}>
                        <TableCell>{vitamin.name}</TableCell>
                        <TableCell>{vitamin.quantity}</TableCell>
                        <TableCell>{vitamin.dv}</TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="reviews">
          {/* Reviews content */}
          <SectionTitle>Customer Reviews</SectionTitle>
          {reviews.items.length > 0 ? (
            <div>
              {reviews.items.map((review, index) => (
                <ReviewItem key={index}>
                  <ReviewHeader>
                    <ReviewAuthor>{review.author}</ReviewAuthor>
                    <ReviewDate>{review.date}</ReviewDate>
                  </ReviewHeader>
                  {renderStars(review.rating)}
                  <p
                    style={{
                      marginTop: '0.5rem',
                      fontSize: '12px',
                      fontFamily: 'var(--font-family-secondary)',
                    }}
                  >
                    {review.comment}
                  </p>
                </ReviewItem>
              ))}
            </div>
          ) : (
            <SectionText>
              No reviews yet. Be the first to review this product!
            </SectionText>
          )}
        </TabsContent>

        <TabsContent value="questions">
          {/* Questions content */}
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          {questions.items.length > 0 ? (
            <div>
              {questions.items.map((item, index) => (
                <QuestionItem key={index}>
                  <QuestionTitle>{item.question}</QuestionTitle>
                  <QuestionAnswer>{item.answer}</QuestionAnswer>
                  <QuestionMeta>
                    Asked by {item.author} • {item.date}
                  </QuestionMeta>
                </QuestionItem>
              ))}
            </div>
          ) : (
            <SectionText>
              No questions yet. Ask the first question about this product!
            </SectionText>
          )}
        </TabsContent>
      </Tabs>
    </TabsContainer>
  )
}

export default ProductTabs
