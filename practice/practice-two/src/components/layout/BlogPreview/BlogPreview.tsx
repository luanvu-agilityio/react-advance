import styled from 'styled-components'
import { ChevronRight } from 'lucide-react'
import { blogPosts, type BlogPostType } from '@dummy-data/blog-posts'
import { BadgeComponent } from '@components/common/Badge'
import Link from '@components/common/Link'
import type { MouseEvent } from 'react'

interface ArticleCardProps {
  post: BlogPostType
  variant: 'large' | 'medium' | 'small'
}

const SectionContainer = styled.section`
  margin: 0 auto;
`

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

const SectionTitle = styled.p`
  &.section-title {
    font-size: 18px;
    font-weight: var(--font-weight-semibold);
    color: var(--black-color-default);
  }
`
const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: var(--font-weight-bold);
  color: var(--black-color-default);
  gap: 6px;
`

const PostsGrid = styled.div`
  display: grid;
  gap: 32px;

  // Mobile
  grid-template-columns: 1fr;

  // Tablet
  @media (min-width: 640px) and (max-width: 1023px) {
    grid-template-columns: 1fr 1fr;
  }

  // Design width (1260px)
  @media (min-width: 1024px) {
    grid-template-columns: 469px 270px 1fr;
  }
`
const LargeCardContainer = styled.div`
  grid-column: span 1;

  @media (min-width: 640px) {
    grid-column: span 2;
  }

  @media (min-width: 1024px) {
    grid-column: span 1;
  }
`

const MediumCardContainer = styled.div`
  width: 100%;

  @media (min-width: 1024px) {
    width: 270px;
  }
`

const SmallCardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (min-width: 1024px) {
    width: auto;
  }
`

const LargeCard = styled.article`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  height: 300px;
  width: 100%;
  cursor: pointer;

  @media (min-width: 768px) {
    height: 400px;
  }

  @media (min-width: 1024px) {
    width: 469px;
    max-width: 100%;
  }
`

const MediumCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
`

const SmallCard = styled.article`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`

const LargeCardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`

const MediumCardImage = styled.img`
  height: 180px;
  width: 100%;
  max-width: 100%;
  border-radius: 0.5rem;
  object-fit: cover;

  @media (min-width: 1024px) {
    width: 269px;
  }
`

const SmallCardImage = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 12px;
  margin-left: auto;
  object-fit: cover;
`

const LargeCardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 206px;
  padding: 24px;
  background: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%);

  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
`

const MediumCardContent = styled.div``

const SmallCardContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const TextContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-direction: column;
`

const BadgeContainer = styled.div`
  margin-bottom: 0.5rem;
`

const LargeCardTitle = styled.h3`
  font-size: 22px;
  font-weight: var(--font-weight-semibold);
  color: var(--white-color);
  margin: 0.5rem 0;
`

const MediumCardTitle = styled.h3`
  font-size: 18px;
  font-weight: var(--font-weight-semibold);
  color: var(--black-color-default);
  margin-bottom: 16px;
`

const SmallCardTitle = styled.h3`
  font-size: 15px;
  font-weight: var(--font-weight-medium);
  color: var(--black-color-default);
`

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #6b7280;
`

const LargeCardMeta = styled(CardMeta)`
  color: #e5e7eb;
`

const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const AuthorAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--black-shade-6);
`

const AuthorName = styled.span`
  margin-right: 0.5rem;
  font-family: var(--font-family-primary);
  font-size: 12px;
  font-weight: var(--font-weight-regular);
`

const PostDate = styled.span`
  font-family: var(--font-family-primary);
  font-size: 12px;
  font-weight: var(--font-weight-regular);
  margin: 0 1rem;
`

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
            <BadgeComponent>{post.category}</BadgeComponent>
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
              <BadgeComponent>{post.category}</BadgeComponent>
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
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
  }

  return (
    <SectionContainer className="section" style={{ margin: 0 }}>
      <SectionHeader>
        <SectionTitle className="section-title">
          Read our Blog posts
        </SectionTitle>
        <StyledLink href="/blog" onClick={handleClick}>
          Go to Blog{' '}
          <ChevronRight
            size={14}
            color="var(--green-color-default"
            strokeWidth={4}
          />
        </StyledLink>
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
