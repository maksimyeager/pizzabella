import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, CartProduct } from "../../redux/slices/cartSlice.ts";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store.ts";

const typeNames: string[] = ["тонкое", "традиционое"];

type ProductProps = {
    id: string;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
    rating: number;
};

const Product: React.FC<ProductProps> = ({
    id,
    imageUrl,
    title,
    types,
    sizes,
    price,
}) => {
    const [activeType, setActiveType] = useState(0);
    const [activeSize, setActiveSize] = useState(0);

    const dispatch = useDispatch();
    const cartProduct = useSelector((state: RootState) =>
        state.cartReducer.products.find((obj) => obj.id === id)
    );
    const addedCount = cartProduct ? cartProduct.count : 0;
    const onClickAddProduct = () => {
        const product: CartProduct = {
            id,
            title,
            price,
            imageUrl,
            type: typeNames[activeType],
            size: sizes[activeSize],
            count: 0
        };
        dispatch(addProduct(product));
        console.log(addedCount);
    };

    return (
        <div className="pizza-block__wrapper">
            <div className="pizza-block">
                <div className="pizza-block__info">
                    <Link to={`/pizza/${id}`}>
                        <img
                            className="pizza-block__image"
                            src={imageUrl}
                            alt="Pizza"
                        />
                        <h4 className="pizza-block__title">{title}</h4>
                    </Link>
                </div>
                <div className="pizza-block__selector">
                    <ul>
                        {types.map((typeId) => {
                            return (
                                <li
                                    key={typeId}
                                    onClick={() => setActiveType(typeId)}
                                    className={
                                        activeType === typeId ? "active" : ""
                                    }
                                >
                                    {typeNames[typeId]}
                                </li>
                            );
                        })}
                    </ul>
                    <ul>
                        {sizes.map((size, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => setActiveSize(index)}
                                    className={
                                        activeSize === index ? "active" : ""
                                    }
                                >
                                    {size} см.
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} ₽</div>
                    <button
                        className="button button--outline button--add"
                        onClick={onClickAddProduct}
                    >
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>
                        {addedCount > 0 && <i>{addedCount}</i>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
