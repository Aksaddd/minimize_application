interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function Header({ title, subtitle, actions }: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </header>
  );
}
