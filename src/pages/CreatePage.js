import React, {useContext, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState();
    const [thumbnail, setThumbnail] = useState();

    const pressHandler = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('image', image);
        formData.append('thumbnail', thumbnail);
        await request('/api/create', 'POST', formData, {
            Authorization: `Bearer ${auth.token}`,
        });
        history.push(`/works`)
    };

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        placeholder="Введите название"
                        id="title"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <label>Категория</label>
                <select className="browser-default" onChange={(event) => setCategory(event.target.value)}>
                    <option value="" disabled selected>Выберите категорию</option>
                    <option value="vector">Вектор</option>
                    <option value="bitmap">Битмэп</option>
                    <option value="logo">Лого</option>
                </select>
                <label>Картинка - максимум 1280px</label>
                <div className="input-field">
                    <input type='file' id='single' onChange={(e) => {setImage(e.target.files[0]); console.log(e.target.files[0])}}/>
                </div>
                <label>Маленькая картинка - 320x320px</label>
                <div className="input-field">
                    <input type='file' id='single' onChange={(e) => setThumbnail(e.target.files[0])}/>
                </div>
                <button className="btn" onClick={() => pressHandler()}>Добавить</button>
            </div>
        </div>
    )
};
