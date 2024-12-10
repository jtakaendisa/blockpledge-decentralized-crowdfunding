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
  darkGray: '#353535',
  darkGreen: '#3c6e71',
  whiteSolid: '#fff',
  whiteTransparent: 'rgba(255, 255, 255, 0.9)',
};
