import styled from 'styled-components'
import * as Menubar from '@radix-ui/react-menubar'
import * as Accordion from '@radix-ui/react-accordion'

export const NavbarWrapper = styled.div`
  width: 100%;
  background-color: var(--black-shade-6);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 5px 0;

  @media (min-width: 768px) {
    padding: 0;
  }
`

export const MenubarRoot = styled(Menubar.Root)`
  display: none; // Hide on mobile

  @media (min-width: 768px) {
    display: flex;
    padding: 0 45px;
    overflow: visible;
  }
`

export const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;

  background: none;
  border: none;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`

// Add mobile menu component
export const MobileMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 1000;
  transform: translateX(${(props) => (props.isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease;
  padding: 16px;
  overflow-y: auto;

  @media (min-width: 768px) {
    display: none;
  }
`
export const MenuTitle = styled.p`
  font-size: 14px;
  font-weight: var(--font-weight-semibold);
`

export const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--black-shade-5);
`

export const StyledAccordionRoot = styled(Accordion.Root)`
  width: 100%;
`

export const StyledAccordionItem = styled(Accordion.Item)`
  border-bottom: 1px solid var(--black-shade-5);

  &:first-child {
    border-top: 1px solid var(--black-shade-5);
  }
`

export const StyledAccordionTrigger = styled(Accordion.Trigger)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  background: none;
  border: none;
  color: var(--black-color-default);
  font-size: 15px;
  font-weight: var(--font-weight-medium);
  cursor: pointer;

  &[data-state='open'] {
    svg {
      transform: rotate(180deg);
    }
  }

  svg {
    transition: transform 0.2s ease;
  }
`

export const StyledAccordionContent = styled(Accordion.Content)`
  overflow: hidden;

  &[data-state='open'] {
    animation: slideDown 200ms ease-out;
  }

  &[data-state='closed'] {
    animation: slideUp 200ms ease-out;
  }

  @keyframes slideDown {
    from {
      height: 0;
    }
    to {
      height: var(--radix-accordion-content-height);
    }
  }

  @keyframes slideUp {
    from {
      height: var(--radix-accordion-content-height);
    }
    to {
      height: 0;
    }
  }
`

export const MobileSubItem = styled.div`
  padding: 12px 24px;
  color: var(--black-shade-1);
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: var(--black-shade-6);
  }
`
export const MenuWrapper = styled.div`
  position: relative;

  &:hover .dropdown-content {
    display: block;
  }
`

export const HoverContent = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 250px;
  background-color: white;
  border: 1px solid #eee;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;

  &.dropdown-content {
    display: none;
  }
`

export const HoverSubContent = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 100%;
  min-width: 250px;
  background-color: white;
  border: 1px solid #eee;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1001;
`

export const HoverMenuItem = styled.div`
  display: block;
  padding: 12px 16px;
  color: #555;
  text-decoration: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: var(--font-weight-medium);

  &:hover {
    background-color: var(--black-shade-5);
  }
`

export const HoverSubTrigger = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  color: #333;
  cursor: pointer;
  font-size: 15px;
  font-weight: var(--font-weight-medium);
  position: relative;

  &:hover {
    background-color: var(--black-shade-5);

    .sub-dropdown {
      display: block;
    }
  }
`

// Update the trigger to handle both hover and click
export const StyledTriggerButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 16px 20px;
  color: #000;
  font-family: var(--font-family-primary);
  font-size: 15px;
  font-weight: var(--font-weight-medium);
  background-color: transparent;
  outline: none;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: var(--black-shade-5);
  }

  &[data-highlighted],
  &[data-state='open'] {
    background-color: var(--black-shade-5);
  }

  ${MenuWrapper}:first-child & {
    padding-left: 0;
  }
`
