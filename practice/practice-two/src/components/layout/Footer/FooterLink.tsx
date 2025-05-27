import * as Accordion from '@radix-ui/react-accordion'
import { Box, Container, Flex } from '@radix-ui/themes'
import styled from 'styled-components'
import Link from '@components/common/Link'
import { footerSections } from '@dummy-data/footer-link'
import { ChevronDown } from 'lucide-react'
import type { MouseEvent } from 'react'
import Text from '@components/common/Text'

const StyledContainer = styled(Container)`
  width: 100%;
  width: 1260px;
  margin: 0 auto;
  background-color: transparent;
  padding: 24px 16px 32px;

  @media (min-width: 768px) {
    padding: 32px 45px 48px;
  }
`

const MobileFooter = styled(Box)`
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
`

const DesktopFooter = styled(Box)`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`

const StyledAccordionRoot = styled(Accordion.Root)`
  width: 100%;

  @media (max-width: 767px) {
    margin: 0 -16px;
  }
`
const StyledAccordionItem = styled(Accordion.Item)`
  border-bottom: 1px solid var(--black-shade-5);

  @media (max-width: 767px) {
    background: white;
    margin-left: 16px;
    border-radius: 12px;

    &:first-child {
      border-top: none;
    }
  }
`

const StyledAccordionTrigger = styled(Accordion.Trigger)`
  width: 100%;
  border: none;
  background: none;
  padding-left: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  @media (max-width: 767px) {
    &:hover {
      background-color: var(--black-shade-6);
    }

    &[data-state='open'] {
      background-color: var(--black-shade-6);
    }
  }

  svg {
    transition: transform 0.2s ease;
  }

  &[data-state='open'] svg {
    transform: rotate(180deg);
  }
`

const StyledAccordionContent = styled(Accordion.Content)`
  overflow: hidden;

  @media (max-width: 767px) {
    background-color: var(--black-shade-6);
    padding: 0 16px;

    &[data-state='open'] {
      animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);
    }

    &[data-state='closed'] {
      animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);
    }
  }

  @keyframes slideDown {
    from {
      height: 0;
      opacity: 0;
    }
    to {
      height: var(--radix-accordion-content-height);
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      height: var(--radix-accordion-content-height);
      opacity: 1;
    }
    to {
      height: 0;
      opacity: 0;
    }
  }
`

const AccordionHeader = styled(Flex)`
  @media (max-width: 767px) {
    min-height: 48px;
  }
`

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 767px) {
    padding: 8px 0 16px;
  }
`

const LinkItem = styled.li`
  margin-bottom: 16px;
  font-family: var(--font-family-secondary);
  font-size: 13px;
  font-weight: var(--font-weight-regular);

  @media (max-width: 767px) {
    margin-bottom: 12px;

    a {
      display: block;
      padding: 8px 0;
      color: var(--green-color-default);

      &:active {
        opacity: 0.7;
      }
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
`

const FooterLink = () => {
  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    console.log('Link clicked:', event.currentTarget.href)
  }

  return (
    <StyledContainer>
      <MobileFooter>
        <StyledAccordionRoot type="multiple">
          {footerSections.map((section) => (
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
                      <Link
                        href={link.href}
                        onClick={handleLinkClick}
                        target={
                          link.href.startsWith('http') ? '_blank' : '_self'
                        }
                      >
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
          {footerSections.map((section) => (
            <Box
              key={section.title}
              style={{
                flex:
                  footerSections[footerSections.length - 1].title ===
                  section.title
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
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      target={link.href.startsWith('http') ? '_blank' : '_self'}
                    >
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
}

export default FooterLink
