import { ChevronRight } from 'lucide-react'
import { blogPosts, type BlogPostType } from '@data/blog-posts'
import Badge from '@components/common/Badge'
import {
  AuthorAvatar,
  AuthorContainer,
  AuthorName,
  BadgeContainer,
  CardMeta,
  LargeCard,
  LargeCardContainer,
  LargeCardContent,
  LargeCardImage,
  LargeCardMeta,
  LargeCardTitle,
  MediumCard,
  MediumCardContainer,
  MediumCardContent,
  MediumCardImage,
  MediumCardTitle,
  PostDate,
  PostsGrid,
  SectionContainer,
  SectionHeader,
  SectionTitle,
  SmallCard,
  SmallCardContent,
  SmallCardImage,
  SmallCardsContainer,
  SmallCardTitle,
  StyledLinkButton,
  TextContent,
} from '../Homepage.styles'

interface ArticleCardProps {
  post: BlogPostType
  variant: 'large' | 'medium' | 'small'
}

const getImageUrl = (post: BlogPostType, size: string): string => {
  if (post.imageUrl) {
    return post.imageUrl
  }
  return `/api/placeholder/${size}`
}

const ArticleCard = ({ post, variant }: ArticleCardProps) => {
  if (variant === 'large') {
    return (
      <LargeCard>
        {post.category && (
          <BadgeContainer
            style={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              zIndex: 1,
            }}
          >
            <Badge>{post.category}</Badge>
          </BadgeContainer>
        )}
        <LargeCardImage src={getImageUrl(post, '600/400')} alt={post.title} />
        <LargeCardContent>
          <LargeCardTitle>{post.title}</LargeCardTitle>
          <AuthorContainer>
            <AuthorAvatar />
            <LargeCardMeta>
              <AuthorName>{post.author}</AuthorName>
              <PostDate>{post.date}</PostDate>
            </LargeCardMeta>
          </AuthorContainer>
        </LargeCardContent>
      </LargeCard>
    )
  }

  if (variant === 'medium') {
    return (
      <MediumCard>
        <MediumCardImage src={getImageUrl(post, '270/180')} alt={post.title} />
        <MediumCardContent>
          {post.category && (
            <BadgeContainer>
              <Badge>{post.category}</Badge>
            </BadgeContainer>
          )}
          <MediumCardTitle>{post.title}</MediumCardTitle>
          <CardMeta>
            <AuthorName>{post.author}</AuthorName>
            <PostDate>{post.date}</PostDate>
          </CardMeta>
        </MediumCardContent>
      </MediumCard>
    )
  }

  return (
    <SmallCard>
      <SmallCardContent>
        <TextContent>
          <SmallCardTitle>{post.title}</SmallCardTitle>
          <CardMeta>
            <AuthorName>{post.author}</AuthorName>
            <PostDate>{post.date}</PostDate>
          </CardMeta>
        </TextContent>
        <SmallCardImage src={getImageUrl(post, '96/96')} alt={post.title} />
      </SmallCardContent>
    </SmallCard>
  )
}

// Main Component
export default function BlogPreviewSection() {
  return (
    <SectionContainer className="section">
      <SectionHeader>
        <SectionTitle className="section-title">
          Read our Blog posts
        </SectionTitle>
        <StyledLinkButton to="/blog">
          Go to Blog{' '}
          <ChevronRight
            size={14}
            color="var(--green-color-default"
            strokeWidth={4}
          />
        </StyledLinkButton>
      </SectionHeader>

      <PostsGrid>
        <LargeCardContainer>
          <ArticleCard post={blogPosts[0]} variant="large" />
        </LargeCardContainer>

        <MediumCardContainer>
          <ArticleCard post={blogPosts[1]} variant="medium" />
        </MediumCardContainer>

        <SmallCardsContainer>
          {blogPosts.slice(2, 5).map((post) => (
            <ArticleCard key={post.id} post={post} variant="small" />
          ))}
        </SmallCardsContainer>
      </PostsGrid>
    </SectionContainer>
  )
}
