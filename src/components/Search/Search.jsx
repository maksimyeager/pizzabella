import { useState, useCallback, useContext, useRef } from "react";
import styles from "./Search.module.scss";
import { SearchContext } from "../../App";
import debounce from "lodash.debounce";

const Search = () => {
    const [inputValue, setInputValue] = useState("")
    const { setSearchValue } = useContext(SearchContext);
    const inputRef = useRef();

    const updateSerachValue  = useCallback(
        debounce((str) => {
            setSearchValue(str)
            console.log("Search Update")
        }, 500),
        []
    );

    const onChangeInput = (e) => {
        setInputValue(e.target.value)
        updateSerachValue(e.target.value)
    };

    const onClickSearchClear = () => {
        setInputValue("");
        setSearchValue("");
        inputRef.current.focus();
    };

    return (
        <div className={styles.root}>
            <svg
                className={styles.icon}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" x2="16.65" y1="21" y2="16.65" />
            </svg>
            <input
                ref={inputRef}
                className={styles.input}
                type="text"
                placeholder="Поиск пиццы..."
                value={inputValue}
                onChange={onChangeInput}
            />
            {inputValue ? (
                <svg
                    className={styles.clear}
                    onClick={onClickSearchClear}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
                </svg>
            ) : (
                ""
            )}
        </div>
    );
};

export default Search;
