interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <div
      className={`px-6 py-8 sm:px-8 lg:px-10 mx-auto max-w-2xl w-full ${className}`}
    >
      {children}
    </div>
  );
};
