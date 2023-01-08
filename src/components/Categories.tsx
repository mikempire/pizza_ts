import React, {useState} from 'react';
import { useWhyDidYouUpdate } from 'ahooks';

type CategoriesProps = {
    categoryId: number;
    onChangeCategory: (index: number) => void
}

const Categories: React.FC <CategoriesProps> = React.memo(({categoryId, onChangeCategory}) => {

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
    return (
        <div className="categories">
            <ul>
                {
                    categories.map((cat, index) =>
                        <li onClick={() => onChangeCategory(index)}
                            className={categoryId === index ? 'active' : ''}
                            key={cat}
                        >{cat}</li>
                    )
                }
            </ul>
        </div>

    );
});

export default Categories;