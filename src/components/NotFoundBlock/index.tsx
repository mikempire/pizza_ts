import React from 'react';

import styles from './NofFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
    return (
        <div className={styles.root}>
            <h1>Ничего не найдено :(</h1>
            <p>К сожалению, данная страница отсувует на нашем сайте</p>
        </div>
    );
};

export default NotFoundBlock;