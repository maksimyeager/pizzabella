import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductPage: React.FC = () => {
    const [product, setProduct] = useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();
    const { id } = useParams();

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await axios.get(
                    `https://6717d67cb910c6a6e02a3843.mockapi.io/products/${id}`
                );
                setProduct(response.data);
                console.log(response);
            } catch (error) {
                alert("Ошибка при получении продукта!");
            }
        }

        fetchProduct();
    }, [id]);

    if (!product) {
        return;
    }

    return (
        <div className="container">
            {!product ? (
                <p>Загрузка...</p>
            ) : (
                <div className="pizza-block__wrapper">
                    <div className="pizza-block">
                        <div className="pizza-block__info">
                            <img
                                className="pizza-block__image"
                                src={product.imageUrl}
                                alt="Pizza"
                            />
                            <h4 className="pizza-block__title">
                                {product.title}
                            </h4>
                        </div>
                        <div className="pizza-block__selector">
                            <ul>
                                {/* {types.map((typeId) => {
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
                            })} */}
                            </ul>
                            <ul>
                                {/* {sizes.map((size, index) => {
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
                            })} */}
                            </ul>
                        </div>
                        <div className="pizza-block__bottom">
                            <div className="pizza-block__price">
                                от {product.price} ₽
                            </div>
                            <button
                                className="button button--outline button--add"
                                // onClick={onClickAddProduct}
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
                                {/* {addedCount > 0 && <i>{addedCount}</i>} */}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductPage;
