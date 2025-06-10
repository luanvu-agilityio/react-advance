import styled from 'styled-components'
import * as Accordion from '@radix-ui/react-accordion'
import { Box, Container, Flex } from '@radix-ui/themes'

export const StyledContainer = styled(Container)`
  width: 100%;
  width: 1260px;
  margin: 0 auto;
  background-color: transparent;
  padding: 24px 16px 32px;

  @media (min-width: 768px) {
    padding: 32px 45px 48px;
  }
`

export const MobileFooter = styled(Box)`
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
`

export const DesktopFooter = styled(Box)`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`

export const StyledAccordionRoot = styled(Accordion.Root)`
  width: 100%;

  @media (max-width: 767px) {
    margin: 0 -16px;
  }
`
export const StyledAccordionItem = styled(Accordion.Item)`
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

export const StyledAccordionTrigger = styled(Accordion.Trigger)`
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

export const StyledAccordionContent = styled(Accordion.Content)`
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

export const AccordionHeader = styled(Flex)`
  @media (max-width: 767px) {
    min-height: 48px;
  }
`

export const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 767px) {
    padding: 8px 0 16px;
  }
`

export const LinkItem = styled.li`
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
