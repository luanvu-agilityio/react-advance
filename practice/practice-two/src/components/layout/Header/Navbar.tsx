import * as Menubar from '@radix-ui/react-menubar'
import { ChevronDown, ChevronRight } from 'lucide-react'

import { styled } from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import * as Accordion from '@radix-ui/react-accordion'
import { navbarData } from '@data/navbar'

const NavbarWrapper = styled.div`
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

const MenubarRoot = styled(Menubar.Root)`
  display: none; // Hide on mobile

  @media (min-width: 768px) {
    display: flex;
    padding: 0 45px;
    overflow: visible;
  }
`

// Menu styling
const MenubarMenu = styled(Menubar.Menu)`
  position: relative;
`

// Trigger (top-level menu item)
const StyledTrigger = styled(Menubar.Trigger)`
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

  &:hover {
    background-color: var(--black-shade-5);
  }

  &[data-highlighted],
  &[data-state='open'] {
    background-color: var(--black-shade-5);
  }
`

// Portal for dropdown content positioning
const MenubarPortal = styled(Menubar.Portal)`
  z-index: 1000;
`

// Dropdown content container
const MenubarContent = styled(Menubar.Content)`
  min-width: 250px;
  background-color: white;
  border: 1px solid #eee;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  margin: 0 auto;
  z-index: 100;
`

// Sub-menu item content container
const MenubarSubContent = styled(Menubar.SubContent)`
  min-width: 250px;
  background-color: white;
  border: 1px solid #eee;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.15);
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 101;
`

// Individual menu item
const MenuItem = styled(Menubar.Item)`
  display: block;
  padding: 12px 16px;
  color: #555;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: var(--font-weight-medium);

  &:hover,
  &:focus {
    background-color: var(--black-shade-5);
    outline: none;
  }

  &[data-highlighted] {
    background-color: var(--black-shade-5);
  }
`

// Sub-menu trigger
const SubTrigger = styled(Menubar.SubTrigger)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  color: #333;
  outline: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: var(--font-weight-medium);
  &:hover,
  &:focus {
    background-color: var(--black-shade-5);
    outline: none;
  }

  &[data-highlighted],
  &[data-state='open'] {
    background-color: var(--black-shade-5);
  }
`

const MobileMenuButton = styled.button`
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
const MobileMenu = styled.div<{ isOpen: boolean }>`
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
const MenuTitle = styled.p`
  font-size: 14px;
  font-weight: var(--font-weight-semibold);
`

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--black-shade-5);
`

const StyledAccordionRoot = styled(Accordion.Root)`
  width: 100%;
`

const StyledAccordionItem = styled(Accordion.Item)`
  border-bottom: 1px solid var(--black-shade-5);

  &:first-child {
    border-top: 1px solid var(--black-shade-5);
  }
`

const StyledAccordionTrigger = styled(Accordion.Trigger)`
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

const StyledAccordionContent = styled(Accordion.Content)`
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

const MobileSubItem = styled.div`
  padding: 12px 24px;
  color: var(--black-shade-1);
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: var(--black-shade-6);
  }
`

// Helper function to convert label to URL path
const labelToPath = (label: string): string => {
  return label.toLowerCase().replace(/\s+/g, '-')
}

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleCategoryClick = (label: string) => {
    const path = labelToPath(label)
    navigate(`/${path}`)
  }

  return (
    <NavbarWrapper className = "section">
      <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)}>
        <Menu size={24} style={{ marginLeft: '16px' }} />
      </MobileMenuButton>
      <MenubarRoot>
        {navbarData.map((item, index) => (
          <MenubarMenu key={`menu-${item.label}-${index}`}>
            <StyledTrigger onClick={() => handleCategoryClick(item.label)}>
              {item.label}{' '}
              <ChevronDown
                size={12}
                style={{
                  color: 'var(--green-color-default)',
                  strokeWidth: 4,
                }}
              />
            </StyledTrigger>

            <MenubarPortal>
              <MenubarContent align="start" sideOffset={5}>
                {item.categories?.map((category, catIndex) => (
                  <Menubar.Sub key={`category-${category.title}-${catIndex}`}>
                    <SubTrigger>
                      {category.title}
                      <ChevronRight
                        size={12}
                        style={{
                          color: 'var(--green-color-default)',
                          strokeWidth: 4,
                        }}
                      />
                    </SubTrigger>

                    <MenubarPortal>
                      <MenubarSubContent alignOffset={-5} sideOffset={2}>
                        {category.items.map((subItem, itemIndex) => (
                          <MenuItem
                            key={`item-${category.title}-${subItem.title}-${itemIndex}`}
                            asChild
                          >
                            <Link to={subItem.href}>{subItem.title}</Link>
                          </MenuItem>
                        ))}
                      </MenubarSubContent>
                    </MenubarPortal>
                  </Menubar.Sub>
                ))}
              </MenubarContent>
            </MenubarPortal>
          </MenubarMenu>
        ))}
      </MenubarRoot>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileMenuHeader>
          <MenuTitle>Menu</MenuTitle>
          <MobileMenuButton onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </MobileMenuButton>
        </MobileMenuHeader>

        <StyledAccordionRoot type="multiple">
          {navbarData.map((item, index) => (
            <StyledAccordionItem
              key={`mobile-menu-${item.label}-${index}`}
              value={item.label}
            >
              <StyledAccordionTrigger>
                <span>{item.label}</span>
                <ChevronDown
                  size={16}
                  style={{
                    color: 'var(--green-color-default)',
                    strokeWidth: 4,
                  }}
                />
              </StyledAccordionTrigger>
              <StyledAccordionContent>
                {item.categories?.map((category, catIndex) => (
                  <StyledAccordionItem
                    key={`mobile-category-${category.title}-${catIndex}`}
                    value={`${item.label}-${category.title}`}
                  >
                    <StyledAccordionTrigger>
                      <span>{category.title}</span>
                      <ChevronDown
                        size={16}
                        style={{
                          color: 'var(--green-color-default)',
                          strokeWidth: 4,
                        }}
                      />
                    </StyledAccordionTrigger>
                    <StyledAccordionContent>
                      {category.items.map((subItem, itemIndex) => (
                        <MobileSubItem
                          key={`mobile-item-${subItem.title}-${itemIndex}`}
                          onClick={() => {
                            navigate(subItem.href)
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          {subItem.title}
                        </MobileSubItem>
                      ))}
                    </StyledAccordionContent>
                  </StyledAccordionItem>
                ))}
              </StyledAccordionContent>
            </StyledAccordionItem>
          ))}
        </StyledAccordionRoot>
      </MobileMenu>
    </NavbarWrapper>
  )
}
