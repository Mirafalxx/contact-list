import React from 'react'
import './ConctactItem.css'

const ConctactItem = ({id,name,userName,phone}) => {
    return (
        <div className='cardContact'>
            <h3>Name : {name}</h3>
            <p>UserName : {userName}</p>
            <p>Phone : {phone}</p>
            <button className='editBtn'>Edit</button>
        </div>
    )
}

export default ConctactItem
