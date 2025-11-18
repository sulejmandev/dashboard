import { cn } from '@/lib/utils';
import { SidebarInset, SidebarProvider } from './ui/sidebar';
import { AppSidebar } from './app-sidebar';
import { SiteHeader } from './site-header';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div
              className={cn(
                'flex flex-col gap-4 py-4 md:gap-6 md:py-6',
                className
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
