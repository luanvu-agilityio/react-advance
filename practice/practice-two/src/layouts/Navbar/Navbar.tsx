import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { navbarData } from '@data/navbar'
import {
  HoverContent,
  HoverMenuItem,
  HoverSubContent,
  HoverSubTrigger,
  MenubarRoot,
  MenuTitle,
  MenuWrapper,
  MobileMenu,
  MobileMenuButton,
  MobileMenuHeader,
  MobileSubItem,
  NavbarWrapper,
  StyledAccordionContent,
  StyledAccordionItem,
  StyledAccordionRoot,
  StyledAccordionTrigger,
  StyledTriggerButton,
} from './Navbar.styles'

// Helper function to convert label to URL path
const labelToPath = (label: string): string => {
  return label.toLowerCase().replace(/\s+/g, '-')
}

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleCategoryClick = useCallback(
    (label: string) => {
      const path = labelToPath(label)
      navigate(`/${path}`)
    },
    [navigate]
  )

  const handleSubItemClick = useCallback(
    (href: string) => {
      navigate(href)
    },
    [navigate]
  )

  return (
    <NavbarWrapper className="section">
      <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)}>
        <Menu size={24} style={{ marginLeft: '16px' }} />
      </MobileMenuButton>

      {/* Desktop Menu with Hover */}
      <MenubarRoot>
        {navbarData.map((item, index) => (
          <MenuWrapper key={`menu-${item.label}-${index}`}>
            <StyledTriggerButton
              onClick={() => handleCategoryClick(item.label)}
            >
              {item.label}{' '}
              <ChevronDown
                size={12}
                style={{
                  color: 'var(--green-color-default)',
                  strokeWidth: 4,
                }}
              />
            </StyledTriggerButton>

            <HoverContent className="dropdown-content">
              {item.categories?.map((category, catIndex) => (
                <HoverSubTrigger key={`category-${category.title}-${catIndex}`}>
                  <span>{category.title}</span>
                  <ChevronRight
                    size={12}
                    style={{
                      color: 'var(--green-color-default)',
                      strokeWidth: 4,
                    }}
                  />

                  <HoverSubContent className="sub-dropdown">
                    {category.items.map((subItem, itemIndex) => (
                      <HoverMenuItem
                        key={`item-${category.title}-${subItem.title}-${itemIndex}`}
                        onClick={() => handleSubItemClick(subItem.href)}
                      >
                        {subItem.title}
                      </HoverMenuItem>
                    ))}
                  </HoverSubContent>
                </HoverSubTrigger>
              ))}
            </HoverContent>
          </MenuWrapper>
        ))}
      </MenubarRoot>

      {/* Mobile Menu - Keep existing implementation */}
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
