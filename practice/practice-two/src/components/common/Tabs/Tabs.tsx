import { Tabs as RadixTabs } from '@radix-ui/themes'
import { renderStars } from '@helpers/renderStar'
import {
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
      {/* Use default Radix components - CSS targets their default class names */}
      <RadixTabs.Root defaultValue="description">
        <RadixTabs.List>
          <RadixTabs.Trigger value="description">Description</RadixTabs.Trigger>
          <RadixTabs.Trigger value="reviews">
            Reviews <TabCount>{reviews.count}</TabCount>
          </RadixTabs.Trigger>
          <RadixTabs.Trigger value="questions">
            Questions <TabCount>{questions.count}</TabCount>
          </RadixTabs.Trigger>
        </RadixTabs.List>

        <RadixTabs.Content
          value="description"
          style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
        >
          <div>
            <SectionTitle>Origins</SectionTitle>
            <SectionText>{description.origins}</SectionText>
          </div>

          <div>
            <SectionTitle>How to cook</SectionTitle>
            <SectionText>{description.cookingInfo}</SectionText>
          </div>

          {description.vitamins && description.vitamins.length > 0 && (
            <div>
              <SectionTitle>Full of Vitamins!</SectionTitle>
              <div style={{ overflowX: 'auto' }}>
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
        </RadixTabs.Content>

        <RadixTabs.Content value="reviews">
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
        </RadixTabs.Content>

        <RadixTabs.Content value="questions">
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
        </RadixTabs.Content>
      </RadixTabs.Root>
    </TabsContainer>
  )
}
export default ProductTabs
