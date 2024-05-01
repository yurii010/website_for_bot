import '../App.css';

import Button from './Button';
import { useEffect, useState } from 'react';
import { useTelegram } from '../hooks/useTelegram';

const Header = () => {
    const { onClose, user, userLanguage } = useTelegram();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data); 
            })
    }, []);

    return (
        <div className='header'>
            <Button className="close-button" onClick={onClose}>{userLanguage == 'uk' || 'ru' ? 'Закрити' : 'Close'}</Button>
            <span className='username'>
                {userLanguage == 'uk' || 'ru' ? 'Ваш нікнейм: ' : 'Your username: '}{user?.username}
                Test: {users.language_code}
            </span>
        </div>
    );
};
export default Header;