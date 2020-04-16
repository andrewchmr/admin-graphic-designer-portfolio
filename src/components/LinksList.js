import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";


export const LinksList = ({links, fetch}) => {
    const {loading, request} = useHttp();
    const auth = useContext(AuthContext);

    if (!links.length) {
        return <p className="center">Ссылок пока нет</p>
    }

    const deleteWork = async (id) => {
        await request(`/api/works/${id}`, 'DELETE', null, {
            Authorization: `Bearer ${auth.token}`,
            'Content-Type': 'application/json'
        });
        fetch();
    };

    return (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th></th>
                <th>Название</th>
                <th>Категория</th>
                <th></th>
            </tr>
            </thead>

            <tbody>
            {links.map((link, index) => {
                return (
                    <tr key={link._id}>
                        <td>{index + 1}</td>
                        <td><img className='responsive-img' style={{maxWidth: '100px', maxHeight: '100px'}} src={link.thumbnail}/></td>
                        <td>{link.title}</td>
                        <td>{link.category}</td>
                        <td><Link to={`/work/${link._id}`}>
                            <button className='btn' style={{marginRight: '10px'}}>Редактировать</button>
                        </Link>
                            <button onClick={() => deleteWork(link._id)} className='btn'>Удалить</button>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}
