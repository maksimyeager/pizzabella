import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header.tsx";

const Layout: React.FC = () => {
    return (
        <>
            <Header />
            <div className="content">
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
