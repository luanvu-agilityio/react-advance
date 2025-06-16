import { useNavigate } from 'react-router-dom'
import {
  useCallback,
  useState,
  memo,
  Suspense,
  lazy,
  useRef,
  useEffect,
} from 'react'
import { navbarData } from '@data/navbar'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  HoverContent,
  HoverMenuItem,
  HoverSubContent,
  HoverSubTrigger,
  MenubarRoot,
  MenuIcon,
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
import { X } from 'lucide-react'

// Helper function to convert label to URL path
const labelToPath = (label: string): string => {
  return label.toLowerCase().replace(/\s+/g, '-')
}

// Memoized components to prevent re-renders
const MemoizedDesktopMenu = memo(
  ({
    onCategoryClick,
    onSubItemClick,
  }: {
    onCategoryClick: (label: string) => void
    onSubItemClick: (href: string) => void
  }) => (
    <MenubarRoot>
      {navbarData.map((item, index) => (
        <MenuWrapper key={`menu-${item.label}-${index}`}>
          <StyledTriggerButton
            data-testid="category-button"
            onClick={() => onCategoryClick(item.label)}
          >
            {item.label} <ChevronDownIcon size={12} />
          </StyledTriggerButton>

          <HoverContent className="dropdown-content">
            {item.categories?.map((category, catIndex) => (
              <HoverSubTrigger key={`category-${category.title}-${catIndex}`}>
                <span>{category.title}</span>
                <ChevronRightIcon size={12} />

                <HoverSubContent className="sub-dropdown">
                  {category.items.map((subItem, itemIndex) => (
                    <HoverMenuItem
                      key={`item-${category.title}-${subItem.title}-${itemIndex}`}
                      onClick={() => onSubItemClick(subItem.href)}
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
  )
)

MemoizedDesktopMenu.displayName = 'MemoizedDesktopMenu'

// Memoized mobile menu component
const MemoizedMobileMenu = memo(
  ({
    isOpen,
    onClose,
    onNavigate,
  }: {
    isOpen: boolean
    onClose: () => void
    onNavigate: (href: string) => void
  }) => (
    <MobileMenu $isOpen={isOpen} data-state={isOpen ? 'open' : 'closed'}>
      <MobileMenuHeader>
        <MenuTitle>Menu</MenuTitle>
        <MobileMenuButton onClick={onClose} aria-label="Close menu">
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
              <ChevronDownIcon size={16} />
            </StyledAccordionTrigger>
            <StyledAccordionContent>
              {item.categories?.map((category, catIndex) => (
                <StyledAccordionItem
                  key={`mobile-category-${category.title}-${catIndex}`}
                  value={`${item.label}-${category.title}`}
                >
                  <StyledAccordionTrigger>
                    <span>{category.title}</span>
                    <ChevronDownIcon size={16} />
                  </StyledAccordionTrigger>
                  <StyledAccordionContent>
                    {category.items.map((subItem, itemIndex) => (
                      <MobileSubItem
                        key={`mobile-item-${subItem.title}-${itemIndex}`}
                        onClick={() => {
                          onNavigate(subItem.href)
                          onClose()
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
  )
)

MemoizedMobileMenu.displayName = 'MemoizedMobileMenu'

const LazyMobileMenu = lazy(() =>
  Promise.resolve({
    default: MemoizedMobileMenu,
  })
)

// Main component wrapped with memo
export const Navbar = memo(() => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const navigateRef = useRef(navigate)

  useEffect(() => {
    navigateRef.current = navigate
  }, [navigate])

  const handleCategoryClick = useCallback((label: string) => {
    const path = labelToPath(label)

    console.log('Navigation triggered:', {
      label,
      path,
      targetUrl: `/${path}`,
    })
    navigateRef.current(`/${path}`)

    setTimeout(() => {
      console.log('Navigation complete check:', {
        currentUrl: window.location.href,
        pathname: window.location.pathname,
      })
    }, 100)
  }, [])

  const handleSubItemClick = useCallback((href: string) => {
    navigateRef.current(href)
  }, [])

  const handleCloseMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  const handleOpenMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true)
  }, [])

  return (
    <NavbarWrapper className="section">
      <MobileMenuButton onClick={handleOpenMobileMenu}>
        <MenuIcon size={24} />
      </MobileMenuButton>

      {/* Desktop Menu with Hover */}
      <MemoizedDesktopMenu
        onCategoryClick={handleCategoryClick}
        onSubItemClick={handleSubItemClick}
      />

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <Suspense fallback={null}>
          <LazyMobileMenu
            isOpen={isMobileMenuOpen}
            onClose={handleCloseMobileMenu}
            onNavigate={handleSubItemClick}
          />
        </Suspense>
      )}
    </NavbarWrapper>
  )
})

Navbar.displayName = 'Navbar'
