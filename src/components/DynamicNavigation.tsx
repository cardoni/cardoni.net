import { getTopCategories } from '@/lib/categories';
import ClientNavigation from './ClientNavigation';

export default async function DynamicNavigation() {
  const topCategories = await getTopCategories(5);
  
  const navItems = [
    { href: '/', label: 'Posts' },
    ...topCategories.map(category => ({
      href: category.href,
      label: category.name,
      count: category.count
    }))
  ];

  return <ClientNavigation navItems={navItems} />;
}