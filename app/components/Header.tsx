import Link from 'next/link';
import { Container } from './Container';
import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
  return (
    <header className="text-center">
      <Container>
        <div className="flex justify-between items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <span className="font-bold text-blue-600 dark:text-blue-400">
              blog
            </span>
            <span className="text-gray-800 dark:text-gray-100">.olly.live</span>
          </Link>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
};
