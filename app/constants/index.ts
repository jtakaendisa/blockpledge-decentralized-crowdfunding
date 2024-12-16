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
  lightGray: '#e1e1e4',
  gray: '#9b9e9e',
  darkGray: '#353535',
  darkGreen: '#3c6e71',
  whiteSolid: '#fff',
  whiteTransparent: 'rgba(255, 255, 255, 0.9)',
};

export const statusColorMap = {
  0: 'gray',
  1: 'green',
  2: 'gray',
  3: 'red',
  4: 'orange',
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
