import { ReactNode, ButtonHTMLAttributes } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Layout = ({ children, ...props }: LayoutProps) => {
  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <div className="page">{children}</div>
      </div>
    </div>
  );
};

export default Layout;