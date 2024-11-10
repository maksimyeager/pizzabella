import React from "react";
import { useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import {
    filterSelector,
    filterSortPropertySelector,
    setCategoryId,
    setCurrentPage,
    setFilters,
} from "../redux/slices/filterSlice";
import {
    setIsLoading,
    fetchProducts,
    productsSelector,
} from "../redux/slices/productsSlice";
import { sortList } from "../components/Sort.tsx";
import Categories from "../components/Categories.tsx";
import Sort from "../components/Sort.tsx";
import Product from "../components/Product/Product.tsx";
import Skeleton from "../components/Product/Skeleton.tsx";
import Pagination from "../components/Pagination/Pagination.tsx";
import { SearchContext } from "../App.tsx";

const Home = () => {
    const navigate = useNavigate();

    const { searchValue } = useContext(SearchContext);
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { products, status } = useSelector(productsSelector);

    const { categoryId, currentPage } = useSelector(filterSelector);
    const sortType = useSelector(filterSortPropertySelector);

    const dispatch = useDispatch();

    const onClickCategory = (id: number) => {
        dispatch(setCategoryId(id));
    };

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    // Pizzas Fetch Function
    const getProducts = async () => {
        dispatch(setIsLoading(true));
        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const sortBy = sortType.replace("-", "");
        const order = sortType.includes("-") ? "asc" : "desc";

        dispatch(
            // @ts-ignore
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
            const params = qs.parse(window.location.search.substring(1));
            const sortType = sortList.find(
                (obj) => obj.sortProperty === params.sortType
            );
            dispatch(
                setFilters({
                    ...params,
                    sortType,
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
                <Sort />
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
            <Pagination value={currentPage} onChangePage={onChangePage} />
        </div>
    );
};

export default Home;
