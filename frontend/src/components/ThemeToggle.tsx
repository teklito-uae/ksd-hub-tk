import { Sun, Moon, Monitor } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';

const modes = [
  { value: 'light' as const, icon: Sun, label: 'Light' },
  { value: 'dark' as const, icon: Moon, label: 'Dark' },
  { value: 'system' as const, icon: Monitor, label: 'System' },
];

export function ThemeToggle() {
  const { theme, setTheme } = useUIStore();

  return (
    <div className="flex items-center bg-gray-100 dark:bg-white/10 rounded-full p-0.5 gap-0.5">
      {modes.map((mode) => (
        <button
          key={mode.value}
          onClick={() => setTheme(mode.value)}
          title={mode.label}
          className={cn(
            "size-7 rounded-full flex items-center justify-center transition-all duration-200",
            theme === mode.value
              ? "bg-white dark:bg-white/20 text-primary shadow-sm"
              : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          )}
        >
          <mode.icon className="size-3.5" />
        </button>
      ))}
    </div>
  );
}
