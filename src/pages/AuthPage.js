import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from "../components/Loader";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        username: '', password: ''
    });

    useEffect(() => {
        if (loading) {
            clearError()
        }
    }, [loading, clearError]);

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    };

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form}, {
                Authorization: `Bearer ${auth.token}`,
                'Content-Type': 'application/json'
            });
            auth.login(data.token, data.userId)
        } catch (e) {
        }
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Vernal Bloom</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите логин"
                                    id="username"
                                    type="text"
                                    name="username"
                                    className="yellow-input"
                                    value={form.username}
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                            </div>
                            {error && <p>{error}</p>}
                        </div>
                    </div>
                    <div className="card-action">
                        {loading ? <Loader/> : <button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Войти
                        </button>}
                    </div>
                </div>
            </div>
        </div>
    )
};
