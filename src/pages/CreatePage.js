import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {Loader} from "../components/Loader";

export const CreatePage = () => {
        const history = useHistory();
        const auth = useContext(AuthContext);
        const {loading, error, request, clearError} = useHttp();
        const [imgDimError, setImgDimError] = useState(false);
        const [thumbnailDimError, setThumbnailDimError] = useState(false);
        const [title, setTitle] = useState('');
        const [category, setCategory] = useState('');
        const [image, setImage] = useState();
        const [thumbnail, setThumbnail] = useState();

        useEffect(() => {
            if (loading) {
                clearError()
            }
        }, [loading, clearError]);

        const pressHandler = async () => {
            try {
                const formData = new FormData();
                formData.append('title', title);
                formData.append('category', category);
                formData.append('image', image);
                formData.append('thumbnail', thumbnail);
                await request('/api/works', 'POST', formData, {
                    Authorization: `Bearer ${auth.token}`,
                });
                history.push(`/works`);
            } catch (e) {
            }
        };

        const handleThumbnailLoad = (e) => {
            if (e.target.files[0]) {
                setThumbnail(e.target.files[0]);
                const img = new Image();
                img.src = window.URL.createObjectURL(e.target.files[0]);
                img.onload = () => {
                    setThumbnailDimError(img.width !== 320 || img.height !== 320);
                }
            }
        };

        const handleImageLoad = (e) => {
            if (e.target.files[0]) {
                setImage(e.target.files[0]);
                const img = new Image();
                img.src = window.URL.createObjectURL(e.target.files[0]);
                img.onload = () => {
                    setImgDimError(img.width > 1280 || img.height > 1280);
                };
            }
        };


        const isDisabled = () => {
            const isValid = title && category && image && thumbnail;
            return imgDimError || thumbnailDimError || !isValid;
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
                        <input type='file' onChange={handleImageLoad}/>
                    </div>
                    <label>Маленькая картинка - 320x320px</label>
                    <div className="input-field">
                        <input type='file' onChange={handleThumbnailLoad}/>
                    </div>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    {imgDimError && <p style={{color: 'red'}}>Картинка должна быть максимум 1280px</p>}
                    {thumbnailDimError && <p style={{color: 'red'}}>Thumbnail должен быть 320x320px</p>}
                    {loading ? <Loader/> :
                        <button disabled={isDisabled()} className="btn"
                                onClick={() => pressHandler()}>Добавить</button>}
                </div>
            </div>
        )
    }
;
