import { Box, Flex } from '@radix-ui/themes'
import Link from '@components/common/Link'
import { footerSections } from '@constants/footer-link'
import { ChevronDown } from 'lucide-react'
import { memo, type MouseEvent } from 'react'
import Text from '@components/common/Text/index'
import {
  AccordionHeader,
  DesktopFooter,
  LinkItem,
  LinkList,
  MobileFooter,
  StyledAccordionContent,
  StyledAccordionItem,
  StyledAccordionRoot,
  StyledAccordionTrigger,
  StyledContainer,
} from './FooterLink.styles'

interface FooterLinkProps {
  sections?: {
    title: string
    links: {
      text: string
      href: string
    }[]
  }[]
}

const FooterLink = memo(({ sections = footerSections }: FooterLinkProps) => {
  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault?.()
  }

  return (
    <StyledContainer>
      <MobileFooter>
        <StyledAccordionRoot type="multiple">
          {sections.map((section) => (
            <StyledAccordionItem key={section.title} value={section.title}>
              <StyledAccordionTrigger>
                <AccordionHeader justify="between" align="center">
                  <Text
                    text={section.title}
                    as="h3"
                    style={{
                      color: 'var(--black-color-default)',
                      fontSize: '18px',
                      fontWeight: 'var(--font-weight-semibold)',
                      margin: 0,
                    }}
                  />
                  <ChevronDown
                    size={20}
                    color="var(--black-color-default)"
                    style={{ opacity: 0.7 }}
                  />
                </AccordionHeader>
              </StyledAccordionTrigger>
              <StyledAccordionContent>
                <LinkList>
                  {section.links.map((link) => (
                    <LinkItem key={link.text}>
                      <Link href={link.href} onClick={handleLinkClick}>
                        {link.text}
                      </Link>
                    </LinkItem>
                  ))}
                </LinkList>
              </StyledAccordionContent>
            </StyledAccordionItem>
          ))}
        </StyledAccordionRoot>
      </MobileFooter>

      {/* Desktop Footer with Grid */}
      <DesktopFooter>
        <Flex gap="6" wrap="wrap">
          {sections.map((section) => (
            <Box
              key={section.title}
              style={{
                flex:
                  sections[sections.length - 1].title === section.title
                    ? 'none'
                    : '1 1 200px',
              }}
            >
              <Text
                text={section.title}
                as="h3"
                style={{
                  fontSize: '18px',
                  fontWeight: 'var(--font-weight-semibold)',
                  marginBottom: '12px',
                }}
              />
              <LinkList>
                {section.links.map((link) => (
                  <LinkItem key={link.text}>
                    <Link href={link.href} onClick={handleLinkClick}>
                      {link.text}
                    </Link>
                  </LinkItem>
                ))}
              </LinkList>
            </Box>
          ))}
        </Flex>
      </DesktopFooter>
    </StyledContainer>
  )
})

export default FooterLink
