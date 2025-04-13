// components/Sidebar.tsx
import { useState } from 'react';
import { NavLink } from 'react-router';
import { SidebarNavLink } from './SidebarNavLink';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative h-screen">
      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ${
          isCollapsed ? '-translate-x-full' : 'translate-x-0'
        } w-64 bg-base-200 text-base-content`}
        aria-label="Sidebar"
        data-theme="dark"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-base-200 flex flex-col justify-between">
          {/* Logo Section */}
          <NavLink to="/" className="flex items-center ps-2.5 mb-5">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-primary-content">
              PiTV
            </span>
          </NavLink>

          {/* Sidebar Menu */}
          <ul className="space-y-2 font-medium my-auto">
            <li>
              <SidebarNavLink to="/" end>
                <svg
                  className="shrink-0 w-6 h-6 text-neutral-content group-hover:text-primary-content transition duration-75"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="ms-3 text-lg font-medium translate-y-0.5">Home</span>
              </SidebarNavLink>
            </li>

            <li>
              <SidebarNavLink to="/playlists">
                <svg
                  className="shrink-0 w-6 h-6 text-neutral-content group-hover:text-primary-content transition duration-75"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M18 3a1 1 0 00-1-1h-4a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V3zM8 3a1 1 0 00-1-1H3a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V3zm10 8a1 1 0 00-1-1h-4a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1v-4zM8 11a1 1 0 00-1-1H3a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1v-4z" />
                </svg>
                <span className="ms-3 text-lg font-medium">Playlists</span>
              </SidebarNavLink>
            </li>

            <li>
              <SidebarNavLink to="/proxy">
                <svg
                  className="shrink-0 w-6 h-6 text-neutral-content group-hover:text-primary-content transition duration-75"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.962 13.453C20.962 17.546 17.547 20.96 13.455 20.96L12.9 19.958C12.9 19.958 13.131 19.868 13.131 19.623C13.131 19.341 12.878 19.044 12.387 19.044C10.842 19.044 8.782 15.352 8.782 13.843C8.782 13.843 7.597 14.651 6.731 14.651C4.916 14.651 3 11.969 3 10.297C3 8.625 4.26 8.297 4.26 8.297L7.318 9.605L9.1 7.823L7.792 4.764C7.792 4.764 8.12 3.505 9.791 3.505C11.463 3.505 14.146 5.42 14.146 7.236C14.146 8.102 13.338 9.287 13.338 9.287C14.847 9.287 18.539 11.347 18.539 12.892C18.539 13.383 18.836 13.636 19.117 13.636C19.363 13.636 19.452 13.405 19.452 13.405L20.962 13.453Z"/>
                  <path d="M13.897 16.25C13.897 14.656 15.186 13.367 16.781 13.367C18.375 13.367 19.664 14.656 19.664 16.25C19.664 17.845 18.375 19.134 16.781 19.134C15.186 19.134 13.897 17.845 13.897 16.25Z"/>
                  <path d="M4.562 11.297C4.562 9.703 5.851 8.414 7.446 8.414C9.04 8.414 10.329 9.703 10.329 11.297C10.329 12.892 9.04 14.181 7.446 14.181C5.851 14.181 4.562 12.892 4.562 11.297Z"/>
                </svg>
                <span className="ms-3 text-lg font-medium">Proxy</span>
              </SidebarNavLink>
            </li>

            <li>
              <SidebarNavLink to="/about">
                <svg
                  className="shrink-0 w-6 h-6 text-neutral-content group-hover:text-primary-content transition duration-75"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="ms-3 text-lg font-medium">About</span>
              </SidebarNavLink>
            </li>
          </ul>
        </div>
      </aside>

      {/* Toggle button remains unchanged */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`fixed top-1/2 -translate-y-1/2 z-50 
          p-2 rounded-full 
          bg-success text-primary-content 
          shadow-lg
          hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] 
          hover:bg-primary-focus
          hover:scale-110
          hover:rotate-3
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'left-0' : 'left-64 -mr-3'}`}
        aria-label="Toggle sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transform transition-transform duration-300 ease-in-out ${
            isCollapsed ? 'rotate-180' : 'rotate-0'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M15 19l-7-7 7-7" 
          />
        </svg>
      </button>
    </div>
  );
};

export default Sidebar;
