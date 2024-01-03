'use client';
import { usePathname } from 'next/navigation';

function Header() {
  const path = usePathname();

  let name = '';
  let message = '';
  if (path === '/') {
    name = 'Dashboard';
    message = 'Welcome to the dashboard';
  } else if (path === '/users') {
    name = 'Users';
  }

  return (
    <div className="flex justify-between px-4 pt-4 pb-2">
      <h2>{name}</h2>
      <h2>{message}</h2>
    </div>
  );
}

export default Header;
