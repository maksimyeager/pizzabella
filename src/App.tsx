import React from "react";
import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";

import Home from "./pages/Home.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import Cart from "./pages/Cart.tsx";
import NotFound from "./pages/NotFound.tsx";
import Layout from "./layout/Layout.tsx";

type SearchContextType = {
    searchValue: string;
    setSearchValue: any;
};

export const SearchContext = createContext<SearchContextType>();

const App = () => {
    const [searchValue, setSearchValue] = useState("");

    return (
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="" element={<Home />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="pizza/:id" element={<ProductPage />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </SearchContext.Provider>
    );
};

export default App;
