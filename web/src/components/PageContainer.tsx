export function PageContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`max-w-4xl mx-auto px-6 lg:px-8 py-10 ${className ?? ''}`}>
      {children}
    </div>
  );
}
