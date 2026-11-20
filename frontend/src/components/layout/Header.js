
import {
  Bell,
  Search,
  Menu,
  ChevronDown,
  HelpCircle,
} from "lucide-react";

export default function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-[#EAE4D9]/80 bg-white/90 px-5 backdrop-blur-xl sm:px-8">

      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-[#280A47] transition hover:bg-[#F4F0F7] lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>

        <div>
          <h2 className="text-sm font-bold tracking-tight text-[#28212D] sm:text-base">
            Institutional Dashboard
          </h2>
          <p className="mt-0.5 hidden text-[11px] text-[#89818E] sm:block">
            Polytechnic Institute of Northern Canada
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4">

        {/* Search */}
        <div className="hidden h-10 items-center gap-2 rounded-xl border border-[#EAE4D9] bg-[#FAF9F7] px-3 transition focus-within:border-[#280A47]/40 md:flex">
          <Search size={17} className="text-[#938B98]" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-36 bg-transparent text-xs outline-none placeholder:text-[#A9A2AC] lg:w-48"
          />
          <span className="rounded-md border border-[#E5DFE8] bg-white px-1.5 py-1 text-[9px] text-[#938B98]">
            ⌘ K
          </span>
        </div>

        {/* Help */}
        <button
          aria-label="Help"
          className="hidden rounded-xl p-2.5 text-[#716B76] transition hover:bg-[#F4F0F7] hover:text-[#280A47] sm:block"
        >
          <HelpCircle size={19} />
        </button>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="relative rounded-xl p-2.5 text-[#716B76] transition hover:bg-[#F4F0F7] hover:text-[#280A47]"
        >
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-[#B02D30]" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2.5 border-l border-[#EAE4D9] pl-3 sm:pl-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#280A47] text-sm font-bold text-white shadow-sm">
            A
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-xs font-bold text-[#28212D]">
              Administrator
            </p>
            <p className="mt-0.5 text-[10px] text-[#938B98]">
              System Admin
            </p>
          </div>

          <ChevronDown size={15} className="hidden text-[#938B98] sm:block" />
        </button>

      </div>
    </header>
  );
}
