import ClientNavigation from './ClientNavigation';

export default async function DynamicNavigation() {
  const navItems = [
    { href: '/', label: 'Posts' },
    { href: '/about', label: 'About' }
  ];

  return <ClientNavigation navItems={navItems} />;
}