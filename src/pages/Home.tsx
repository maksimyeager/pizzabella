import React, { useCallback } from "react";
import { useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import { useSelector } from "react-redux";
import { SearchContext } from "../App.tsx";
import { useAppDispatch } from "../redux/store.ts";
import { fetchProducts } from "../redux/products/slice.ts";
import { filterSelector } from "../redux/filter/selectors.ts";
import { setCategoryId, setCurrentPage, setFilters } from "../redux/filter/slice.ts";
import { SearchProductParams } from "../redux/products/types.ts";
import { productsSelector } from "../redux/products/selectors.ts";
import { sortList } from "../components/Sort.tsx";
import Categories from "../components/Categories.tsx";
import Sort from "../components/Sort.tsx";
import Product from "../components/Product/Product.tsx";
import Skeleton from "../components/Product/Skeleton.tsx";
import Pagination from "../components/Pagination/Pagination.tsx";

const Home = () => {
    const navigate = useNavigate();

    const { searchValue } = useContext(SearchContext);
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { products, status } = useSelector(productsSelector);

    const { categoryId, currentPage, sortType } = useSelector(filterSelector);
    // const  = useSelector(filterSortPropertySelector);

    const dispatch = useAppDispatch();

    const onClickCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id));
    }, []);

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    // Pizzas Fetch Function
    const getProducts = async () => {
        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const sortBy = sortType.sortProperty.replace("-", "");
        const order = sortType.sortProperty.includes("-") ? "asc" : "desc";

        dispatch(
            fetchProducts({
                category,
                sortBy,
                order,
                currentPage,
            })
        );
    };

    // Добавление параметров в URL, если произошел первый рендер и изменились параметры
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortType,
                categoryId,
                currentPage,
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sortType, currentPage]);

    // Проверяем URL - параметры, при первом рендере, и сохраняем их в Redux
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(
                window.location.search.substring(1)
            ) as unknown as SearchProductParams;
            const sortType = sortList.find(
                (obj) => obj.sortProperty === params.sortBy
            );
            dispatch(
                setFilters({
                    currentPage: params.currentPage || 1,
                    categoryId: Number(params.category) || 0,
                    sortType: sortType || sortList[0],
                })
            );
            isSearch.current = true;
        }
    }, []);

    // Запрашиваем пиццы при первом рендере
    useEffect(() => {
        window.scrollTo(0, 0);
        getProducts();
    }, [categoryId, sortType, searchValue, currentPage]);

    // Products Render
    const pizzas = products
        // Поиск пицц из запроса в Seearch
        .filter((product: any) => {
            if (
                product.title.toLowerCase().includes(searchValue.toLowerCase())
            ) {
                return true;
            }

            return false;
        })
        .map((product) => <Product key={product.id} {...product} />);

    const skeletons = [...new Array(6)].map((_, index) => (
        <Skeleton key={index} />
    ));

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onClickCategory={onClickCategory}
                />
                <Sort value={sortType} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === "error" ? (
                <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>
                        К сожалению, не удалось получить питсы. Попробуйте
                        повторить попытку позже.
                    </p>
                </div>
            ) : (
                <div className="content__items">
                    {status === "loading" ? (
                        skeletons
                    ) : pizzas.length > 0 ? (
                        pizzas
                    ) : (
                        <div className="content__error-info">
                            <h2>Произошла ошибка 😕</h2>
                            <p>
                                К сожалению, не удалось получить питсы.
                                Попробуйте повторить попытку позже.
                            </p>
                        </div>
                    )}
                </div>
            )}
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    );
};

export default Home;