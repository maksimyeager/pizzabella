import { useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import {
    setCategoryId,
    setCurrentPage,
    setFilters,
} from "../redux/slices/filterSlice";
import { setIsLoading, fetchProducts } from "../redux/slices/productsSlice";
import { sortList } from "../components/Sort";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Product from "../components/Product/Product";
import Skeleton from "../components/Product/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import { SearchContext } from "../App";

const Home = () => {
    const navigate = useNavigate();

    const { searchValue } = useContext(SearchContext);
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const products = useSelector((state) => state.productsReducer.products);
    const isLoading = useSelector((state) => state.productsReducer.isLoading);
    const status = useSelector((state) => state.productsReducer.status);
    const categoryId = useSelector((state) => state.filterReducer.categoryId);
    const sortType = useSelector(
        (state) => state.filterReducer.sortType.sortProperty
    );
    const currentPage = useSelector((state) => state.filterReducer.currentPage);
    const dispatch = useDispatch();

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number));
    };

    // Pizzas Fetch Function
    const getProducts = async () => {
        dispatch(setIsLoading(true));
        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const sortBy = sortType.replace("-", "");
        const order = sortType.includes("-") ? "asc" : "desc";

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
        .filter((product) => {
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
                    <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
                </div>
            ) : (
                <div className="content__items">
                    {status === "loading" ? skeletons : pizzas}
                </div>
            )}
            <Pagination value={currentPage} onChangePage={onChangePage} />
        </div>
    );
};

export default Home;
