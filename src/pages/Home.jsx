import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import {
    setCategoryId,
    setCurrentPage,
    setFilters,
} from "../redux/slices/filterSlice";
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
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const isSearch = useRef(false);
    const isMounted = useRef(false);

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
    const fetchProducts = () => {
        setIsLoading(true);
        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const sortBy = sortType.replace("-", "");
        const order = sortType.includes("-") ? "asc" : "desc";
        axios
            .get(
                `https://6717d67cb910c6a6e02a3843.mockapi.io/products?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
            )
            .then((res) => {
                setProducts(res.data);
                setIsLoading(false);
            });
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
        if (!isSearch.current) {
            fetchProducts();
        }
        isSearch.current = false;
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
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination value={currentPage} onChangePage={onChangePage} />
        </div>
    );
};

export default Home;
