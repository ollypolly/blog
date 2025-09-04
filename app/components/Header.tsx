import Link from 'next/link';

export const Header = () => {
  return (
    <header className="text-center py-8">
      <Link href="/" className="hover:opacity-80 transition-opacity">
        <span className="font-bold text-blue-600">blog</span>.olly.live
      </Link>
    </header>
  );
};
