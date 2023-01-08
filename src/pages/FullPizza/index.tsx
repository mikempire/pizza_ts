import React from 'react';
import styles from './FullPizza.module.scss'
import {useParams} from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => { // : React.FunctionComponent
    const [pizza, setPizza] = React.useState<{
        imageUrl: string,
        title: string,
        price: number
    }>(); // {}
    const {id} = useParams();


    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get(`https://637146dd07858778617a157d.mockapi.io/pizza/${id}`);
                setPizza(data);
            } catch (e) {
                alert('Ошибка получения пиццы')
                console.log(e);

            }
        }

        fetchPizza();
    }, [])


    if (!pizza) {
        return (
            <div className={styles.item}>
                <h2>Loading ...</h2>
            </div>
        )
    }

    return (
        <div className={styles.item}>
            <img
                src={pizza.imageUrl}
                alt=""/>
            <h2>{pizza.title}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet animi, atque blanditiis,
                consectetur delectus eos error ex itaque iusto, magni natus porro ullam? Doloribus in incidunt molestiae
                repellendus sint.
            </p>
            <h3>{pizza.price} p.</h3>
        </div>
    );
};

export default FullPizza;