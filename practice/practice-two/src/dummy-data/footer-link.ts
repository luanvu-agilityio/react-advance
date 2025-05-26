interface FooterSection {
  title: string
  links: {
    text: string
    href: string
  }[]
}

export const footerSections: FooterSection[] = [
  {
    title: 'Get in touch',
    links: [
      { text: 'About Us', href: '/about' },
      { text: 'Careers', href: '/careers' },
      { text: 'Press Releases', href: '/press' },
      { text: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Connections',
    links: [
      { text: 'Facebook', href: 'https://facebook.com' },
      { text: 'Twitter', href: 'https://twitter.com' },
      { text: 'Instagram', href: 'https://instagram.com' },
      { text: 'Youtube', href: 'https://youtube.com' },
      { text: 'LinkedIn', href: 'https://linkedin.com' },
    ],
  },
  {
    title: 'Earnings',
    links: [
      { text: 'Become an Affiliate', href: '/affiliate' },
      { text: 'Advertise your product', href: '/advertise' },
      { text: 'Sell on Market', href: '/sell' },
    ],
  },
  {
    title: 'Account',
    links: [
      { text: 'Your account', href: '/account' },
      { text: 'Returns Centre', href: '/returns' },
      { text: '100 % purchase protection', href: '/protection' },
      { text: 'Chat with us', href: '/chat' },
      { text: 'Help', href: '/help' },
    ],
  },
]
