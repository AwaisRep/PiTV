import { NavLink, type NavLinkProps } from "react-router";
import type { ReactNode } from "react";

// Define props interface explicitly for better type inference
interface SidebarNavLinkProps extends Omit<NavLinkProps, "className"> {
  children: ReactNode;
}

// Component with correct typing for NavLink render prop
export const SidebarNavLink = ({ children, ...props }: SidebarNavLinkProps) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }: { isActive: boolean }) => `
        flex items-center p-3 rounded-lg relative transition-all duration-300 ease-in-out
        ${isActive 
          ? 'bg-base-300 bg-opacity-40 text-accent-content' 
          : 'text-base-content hover:bg-base-300 hover:bg-opacity-20 hover:text-primary-content'}
      `}
    >
      <div className="flex items-center w-full relative">
        {/* No React.Children usage, direct rendering */}
        {children}
        
        {/* Left accent indicator */}
        <div className="absolute left-0 top-0 w-1 h-full bg-accent rounded-l opacity-0 transition-opacity duration-300 ease-in-out group-[.active]:opacity-100"></div>
      </div>
    </NavLink>
  );
};
