import { Link } from '@tanstack/react-router';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  return (
    <header className='border-b'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <div className='flex items-center gap-6'>
          <Link
            to='/'
            className='text-primary text-xl font-bold'
          >
            Santa Gifts
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  render={
                    <Link
                      to='/children'
                      className='data-[status=active]:bg-muted'
                    />
                  }
                >
                  Children
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  render={
                    <Link
                      to='/toys'
                      className='data-[status=active]:bg-muted'
                    />
                  }
                >
                  Toys
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
