import { Tabs, TabsContent } from '@radix-ui/react-tabs'
import { renderStars } from '@helpers/renderStar'
import {
  CustomTabsList,
  CustomTabsTrigger,
  QuestionAnswer,
  QuestionItem,
  QuestionMeta,
  QuestionTitle,
  ReviewAuthor,
  ReviewDate,
  ReviewHeader,
  ReviewItem,
  SectionText,
  SectionTitle,
  TabCount,
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TabsContainer,
} from './Tabs.styles'
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
                    {description.vitamins.map((vitamin) => (
                      <TableRow key={`${vitamin.name}-${vitamin.quantity}`}>
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
