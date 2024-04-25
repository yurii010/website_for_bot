import { useEffect, useCallback } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import ProductItem from '../ProductItem/ProductItem';
import './ProductList.css';

const products = [
    { id: '1', title: 'banana', price: 100, description: 'good' },
    { id: '2', title: 'apple', price: 200, description: 'well' },
    { id: '3', title: 'tomato', price: 300, description: 'awesome' },
    { id: '4', title: 'cabbage', price: 400, description: 'amazing' },
    { id: '5', title: 'onion', price: 500, description: 'pretty' },
    { id: '6', title: 'cucumber', price: 600, description: 'sweet' },
    { id: '7', title: 'orange', price: 700, description: 'cool' },
    { id: '8', title: 'peach', price: 800, description: 'nice' },
    { id: '9', title: 'cherry', price: 900, description: 'bad' },
    { id: '10', title: 'tangerin', price: 1000, description: 'norm' },
]

const ProductList = () => {
    const { tg, queryId, getTotalPrice, addedItems, onAdd } = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        // need change localhost and port /web-data
        fetch('https://128b-95-46-0-45.ngrok-free.app/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems, queryId])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    return (
        <div className='list'>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className='item'
                />
            ))}
        </div>
    );
};
export default ProductList;