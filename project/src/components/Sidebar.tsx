import { Home, TrendingUp, Library, Compass, Settings, LogOut } from 'lucide-react';
import { Music } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="w-64 bg-black h-full flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 text-red-500">
          <Music size={24} />
          <span className="text-xl font-bold">DreamMusic</span>
        </div>
      </div>

      <nav className="flex-1">
        <div className="px-3">
          <span className="text-sm font-semibold text-zinc-400 px-4">MENU</span>
          <ul className="mt-3 space-y-1">
            {[
              { icon: Home, label: 'Home' },
              { icon: TrendingUp, label: 'Trends' },
              { icon: Library, label: 'Library' },
              { icon: Compass, label: 'Discover' },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href="#"
                  className="flex items-center gap-3 text-sm font-semibold text-zinc-200 px-4 py-3 hover:bg-zinc-800 rounded-lg"
                >
                  <item.icon size={20} />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto px-3 pb-6">
          <span className="text-sm font-semibold text-zinc-400 px-4">GENERAL</span>
          <ul className="mt-3 space-y-1">
            {[
              { icon: Settings, label: 'Settings' },
              { icon: LogOut, label: 'Log Out' },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href="#"
                  className="flex items-center gap-3 text-sm font-semibold text-zinc-200 px-4 py-3 hover:bg-zinc-800 rounded-lg"
                >
                  <item.icon size={20} />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}