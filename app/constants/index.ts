export const routes = {
  home: '/',
  projects: '/projects',
  userDashboard: '/user_dashboard',
  adminDashboard: '/admin_dashboard',
  auth: '/auth',
} as const;

export const pathnameMap = {
  '/': 'Home',
  '/projects': 'Projects',
  '/user_dashboard': 'My Dashboard',
  '/admin_dashboard': 'Admin Dashboard',
  '/auth': 'Auth',
};

export const colors = {
  white: '#fff',
  whiteTransparent: 'rgba(255, 255, 255, 0.9)',
  lightGray: '#e1e1e4',
  baseGray: '#747474',
  darkGray: '#353535',
  darkGrayTransparent: 'rgba(53, 53, 53, 0.25)',
  darkGreen: '#3c6e71',
  orange: '#d86029',
  red: '#ca3931',
  mauve: '#553a41',
  blackTransparent: 'rgba(0, 0, 0, 0.8)',
};

export const statusMap = {
  0: 'Open',
  1: 'Approved',
  2: 'Reverted',
  3: 'Deleted',
  4: 'Paid out',
  5: 'Pending approval',
} as const;

export const statusColorMap = {
  0: 'gray',
  1: 'green',
  2: 'red',
  3: 'red',
  4: 'green',
  5: 'orange',
};

export const socials = [
  { slug: 'nav_email', href: 'mailto:james.takaendisa01@gmail.com' },
  {
    slug: 'nav_linkedin',
    href: 'https://www.linkedin.com/in/james-takaendisa-0b0b68b7/',
  },
  {
    slug: 'nav_github',
    href: 'https://github.com/jtakaendisa',
  },
];
