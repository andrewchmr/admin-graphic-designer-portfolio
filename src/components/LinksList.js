import React from 'react'
import {Link} from 'react-router-dom'


export const LinksList = ({links}) => {
    if (!links.length) {
        return <p className="center">Ссылок пока нет</p>
    }

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
                            <button className='btn'>Удалить</button>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}
