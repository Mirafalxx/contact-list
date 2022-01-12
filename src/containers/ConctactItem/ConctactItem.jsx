import React, { useState } from 'react'
import './ConctactItem.css'
import Modal from '../../Components/Modal/Modal';

const ConctactItem = ({id,name,username,phone,email}) => {
    const [showModal,setShowModal]=useState(false);

    return (
        <>
        <div className='contactCard'>
            <h3>Name : {name}</h3>
            <p>Phone : {phone}</p>
            <button className='editBtn' onClick={()=>setShowModal(true)}>Edit</button>
            <Modal displayModal={showModal} closeModal={()=>setShowModal(false)} id={id} name={name} username={username} email={email} phone={phone}/>
        </div>
        </>
        
    )
}

export default ConctactItem
