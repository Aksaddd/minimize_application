interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function Header({ title, subtitle, actions }: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-sp-8">
      <div>
        <h1 className="text-heading-1 text-content-primary">{title}</h1>
        {subtitle && (
          <p className="text-body-sm text-content-secondary mt-sp-1">
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-sp-3">{actions}</div>}
    </header>
  );
}
