import React, {useEffect, useRef} from 'react';
import qs from 'qs';
import {useSelector, useDispatch} from "react-redux";

import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock, {PizzaBlockProps} from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filter/slice";
import {filterSelector, filterSelectorSort} from "../redux/slices/filter/selectors";
import {useNavigate} from "react-router-dom";
import {fetchPizzas} from "../redux/slices/pizza/slice";
import {pizzaSelector} from "../redux/slices/pizza/selectors";
import {useAppDispatch} from "../redux/store";
// в этой условной функции уже зашита информация о типе и значении(что и куда)

type FetchPizzasParams = {
    currentPage: number,
    itemsOnPage: number,
    sortProperty: string,
    categoryId: number,
    search: string
}

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {currentPage, categoryId, searchValue} = useSelector(filterSelector);
    const {itemsOnPage, status, items} = useSelector(pizzaSelector);
    const sortBy = useSelector(filterSelectorSort);


    const isSearch = useRef(false); // поле
    const isMounted = useRef(false);

    const {} = useSelector(filterSelector);

    const onChangeCategory = React.useCallback((id: number) => {
        dispatch(setCategoryId(id));
    }, [])

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    const getPizzas = async () => {
        const category = categoryId === 0 ? '' : `&category=${categoryId}`;
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            fetchPizzas({
                currentPage,
                itemsOnPage,
                sortBy: sortBy.sortProperty,
                category,
                search
            })
        );
    }

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortBy.sortProperty,
                categoryId,
                currentPage
            });
            navigate(`?${queryString}`)
        }
        isMounted.current = true;
    }, [categoryId, sortBy, searchValue, currentPage])


    useEffect(() => {
        if (window.location.search) {
            const params = (qs.parse(window.location.search.substring(1)) as unknown) as FetchPizzasParams;
            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);

            dispatch(
                setFilters({
                    searchValue,
                    categoryId: Number(params.categoryId),
                    currentPage: Number(params.currentPage),
                    sort: sort || sortList[0],
                })
            )
            isSearch.current = true;
            // console.log('меняем isSearch на тру')
        }
    }, [])


    useEffect(() => {
        window.scrollTo(0, 0);
        if (isSearch.current === false) { // !isSearch.current
            console.log('запрос к БД')
            getPizzas();
        }
        isSearch.current = false;
    }, [categoryId, sortBy, searchValue, currentPage]);


    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);

    const pizzas = items.map((onePizza: PizzaBlockProps) =>
        <PizzaBlock {...onePizza} key={onePizza.id}/>
    )


    return (
        <>
            <div className="content__top">
                <Categories categoryId={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort value={sortBy}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>

            {
                status === 'error' ?
                    <div className="container center">
                        <h2>Ошибка!</h2>
                        <p>
                            Перезагрузите страницу<br/>
                            или зайдите на сайт позже!
                        </p>
                    </div> :
                    <div className="content__items">
                        {
                            status === 'loading' ? skeleton : pizzas
                        }
                    </div>
            }

            <Pagination currentPage={currentPage} setCurrentPage={onChangePage}/>
        </>
    );
};

export default Home;


/*
const pizzas = items.filter((el) => {
    return el.title.toLowerCase().includes(searchValue.toLowerCase())
}).map((onePizza) =>
    <PizzaBlock {...onePizza}
                key={onePizza.title}
    />
) // поиск для статики



//////////////////////////////



    const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating'
    });

    sortType={sortType} onChangeCategory={setSortType}

    const category = categoryId > 0 ? `&category=${categoryId}` : '' ;

 */


