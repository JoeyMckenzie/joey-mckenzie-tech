import { VFC } from 'react';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import ActiveLink from '@/components/ActiveLink';
import { NAVIGATION_LINKS } from '@/lib/constants';

const Navbar: VFC = () => (
  <nav className="fixed top-0 z-10 w-full bg-opacity-50 shadow backdrop-blur backdrop-filter">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 justify-between">
        <div className="flex">
          <div className="flex flex-shrink-0 items-center">
            <Logo />
          </div>
        </div>
        <div className="-ml-16 hidden flex-row items-center space-x-4 font-ubuntu sm:flex">
          {NAVIGATION_LINKS.map((link) => (
            <ActiveLink
              key={link.href}
              activeClassName="text-gray-900 dark:text-gray-200"
              defaultClassName="text-gray-600 dark:text-gray-500"
              href={link.href}
            >
              {link.name}
            </ActiveLink>
          ))}
        </div>
        <div className="flex items-center sm:ml-6">
          <ThemeToggle />
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
