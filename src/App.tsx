import React from 'react';
import './scss/app.scss';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";

const Cart = React.lazy(() => import(/* webpackChunkName: 'Cart' */"./pages/Cart"));
const FullPizza = React.lazy(() => import(/* webpackChunkName: 'FullPizza' */ "./pages/FullPizza"));

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path='/cart' element={
                    <React.Suspense fallback={<div style={{textAlign: 'center'}}>Идёт загрузка корзины...</div>}>
                        <Cart/>
                    </React.Suspense>
                }/>
                <Route path='/pizza/:id' element={
                    <React.Suspense fallback={<div style={{textAlign: 'center'}}>Идёт загрузка...</div>}>
                        <FullPizza/>
                    </React.Suspense>
                }/>
                <Route path='*' element={<NotFound/>}/>
            </Route>
        </Routes>
    );
}

export default App;
