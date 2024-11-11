import React from "react";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterSelector, setSortType } from "../redux/slices/filterSlice.ts";

type SortListItem = {
    name: string;
    sortProperty: "rating" | "-rating" | "price" | "-price" | "title" | "-title";
};

type OutsideClick = MouseEvent & {
    path: Node[]
}


export const sortList: SortListItem[] = [
    { name: "популярности (DESC)", sortProperty: "rating" },
    { name: "популярности (ASC)", sortProperty: "-rating" },
    { name: "цене (DESC)", sortProperty: "price" },
    { name: "цене (ASC)", sortProperty: "-price" },
    { name: "алфавиту (DESC)", sortProperty: "title" },
    { name: "алфавиту (ASC)", sortProperty: "-title" },
];

const Sort = () => {
    const [open, setOpen] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);

    const { sortType } = useSelector(filterSelector);
    const dispatch = useDispatch();

    const handlePopUpClick = (obj:SortListItem) => {
        dispatch(setSortType(obj));
        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutsideSort = (e: MouseEvent) => {
            const _event = e as OutsideClick
            if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
                setOpen(false);
            }
        };

        document.body.addEventListener("click", handleClickOutsideSort);

        return () => {
            document.body.removeEventListener("click", handleClickOutsideSort);
        };
    }, []);

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                {open ? (
                    <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0 1C0 0.83073 0.061849 0.68424 0.185547 0.560547C0.309245 0.436849 0.455729 0.375 0.625 0.375H9.375C9.54427 0.375 9.69075 0.436849 9.81445 0.560547C9.93815 0.68424 10 0.83073 10 1C10 1.16927 9.93815 1.31576 9.81445 1.43945L5.43945 5.81445C5.31576 5.93815 5.16927 6 5 6C4.83073 6 4.68424 5.93815 4.56055 5.81445L0.185547 1.43945C0.061849 1.31576 0 1.16927 0 1Z"
                            fill="#2C2C2C"
                        />
                    </svg>
                ) : (
                    <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                            fill="#2C2C2C"
                        />
                    </svg>
                )}

                <b>Сортировка по:</b>
                <span onClick={() => setOpen(!open)}>{sortType.name}</span>
            </div>

            {open && (
                <div className="sort__popup">
                    <ul>
                        {sortList.map((obj, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => handlePopUpClick(obj)}
                                    className={
                                        sortType.sortProperty ===
                                        obj.sortProperty
                                            ? "active"
                                            : ""
                                    }
                                >
                                    {obj.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Sort;
