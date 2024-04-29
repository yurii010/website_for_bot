import '../App.css';

import Button from './Button';
import { useTelegram } from '../hooks/useTelegram';

const Header = () => {
    const { onClose, user } = useTelegram();

    return (
        <div className='header'>
            <Button className="close-button" onClick={onClose}>Close</Button>
            <span className='username'>
                Your username: {user?.username}
            </span>
        </div>
    );
};
export default Header;