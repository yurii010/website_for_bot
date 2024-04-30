import '../App.css';

import { useTelegram } from '../hooks/useTelegram';
import { useEffect, useState, useCallback } from 'react';

const Form = () => {
    const { tg, userLanguage } = useTelegram();
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [subject, setSubject] = useState('male');
    //userLanguage == 'uk' || 'ru' ? 'чоловіча' : 'male'

    const onSendData = useCallback(() => {
        const data = {
            country,
            city,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [country, city, subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        //(userLanguage == 'uk' || 'ru' ? 'Відправити дані!' : 'Send credentials!')
        tg.MainButton.setParams({
            text: "Send credentials"
        })
    }, [])

    useEffect(() => {
        if (!country || !city) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, city])

    const onChangeCountry = (e) => {
        setCountry(e.target.value);
    }

    const onChangeCity = (e) => {
        setCity(e.target.value);
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value);
    }

    //{userLanguage == 'uk' || 'ru' ? 'Ваші облікові записи' : 'Your credentials'}
    //userLanguage == 'uk' || 'ru' ? 'Ваша країна' : 'Your country'}
    //{userLanguage == 'uk' || 'ru' ? 'Ваше місто' : 'Your city'}

    return (
        <div className='form mt'>
            <h3 className='title-form'>Your credentials</h3>
            <input className='input-form' type="text" placeholder={'Your country'} value={country} onChange={onChangeCountry} />
            <input className='input-form' type="text" placeholder={'Your city'} value={city} onChange={onChangeCity} />
            <select className='select-form' value={subject} onChange={onChangeSubject}>
                <option value={"male"}>Male</option>
                <option value={"female"}>Female</option>
            </select>
        </div>
    );
};
export default Form;

//{userLanguage == 'uk' || 'ru' ? 'Чоловік' : 'Male'}
//{userLanguage == 'uk' || 'ru' ? 'Жінка' : 'Female'}