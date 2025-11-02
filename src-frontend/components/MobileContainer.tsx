import { ReactNode } from "react";

interface MobileContainerProps {
  children: ReactNode;
}

export function MobileContainer({ children }: MobileContainerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full mx-auto bg-white min-h-screen lg:max-w-7xl">
        {children}
      </div>
    </div>
  );
}
