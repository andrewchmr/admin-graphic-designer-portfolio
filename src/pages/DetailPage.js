import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'

export const DetailPage = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [link, setLink] = useState(null)
  const linkId = useParams().id;

  useEffect(() => {
    async function f() {
      try {
        const fetched = await request('/api/works', 'GET', null, {
          Authorization: `Bearer ${token}`
        });

        const link = fetched.filter((link) => link._id === linkId)[0];
        setLink(link)
      } catch (e) {}
    };
    f();
  }, [token, request]);

  return (
    <>
      {link &&    <>
        <h2>Работа</h2>
        <p>Название: {link.title}</p>
        <p>Категория: {link.category}</p>
        <p>Цвет: {link.color}</p>
        <p><img style={{maxWidth: '300px', maxHeight: '300px'}} src={link.image} className='responsive-img'/></p>
        <p><img style={{maxWidth: '200px', maxHeight: '200px'}} src={link.thumbnail} className='responsive-img'/>
        </p>
        <button className={'btn'}>Сохранить</button>
      </>}
    </>
  )
};
