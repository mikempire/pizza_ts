import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import debounce from 'lodash.debounce'
import closeIcon from '../../assets/img/close.svg'
import styles from './Search.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {filterSelector} from "../../redux/slices/filter/selectors";
import {setSearchValue} from "../../redux/slices/filter/slice";


const Search = () => {
    const dispatch = useDispatch();
    const {searchValue} = useSelector(filterSelector);

    const [inputValue, setInputValue] = useState('');
    const inputRef= useRef <HTMLInputElement>(null);


    const onClickClear = () => {
        dispatch(setSearchValue(''));
        setInputValue('');
        // if (inputRef.current) {
        //     inputRef.current.focus();
        // }
        inputRef.current?.focus();
    }

    const getDebounced = useCallback(
        debounce((value: string) => dispatch(setSearchValue(value)), 500),
        []
    )

    const onSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        getDebounced(value);
    }

    return (
        <div className={styles.root}>
            <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"
                 className={styles.icon}
            >
                <path
                    d="M31 28h-1.59l-.55-.55c1.96-2.27 3.14-5.22 3.14-8.45 0-7.18-5.82-13-13-13s-13 5.82-13 13 5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55v1.58l10 9.98 2.98-2.98-9.98-10zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z"/>
                <path d="M0 0h48v48h-48z" fill="none"/>
            </svg>
            <input type="text" placeholder='Поиск пиццы...'
                   ref={inputRef}
                   className={styles.input}
                   value={inputValue}
                   onChange={(e) => onSearchValue(e)}/>
            {
                searchValue && <img src={closeIcon} alt="close"
                                    className={styles.close}
                                    onClick={onClickClear}
                />

            }
        </div>
    )
        ;
};

export default Search;


/*
    const onSearchValue = (e) => {
        setValue(e.target.value);
        console.log(e.target.value)
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout);
        }
        setSearchTimeout(setTimeout(() => {
            setSearchValue(value)
        }, 500))
    }
 */