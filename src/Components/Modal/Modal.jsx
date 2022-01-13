import './Modal.css';
import React, { useState } from 'react';
import  Backdrop  from '../Backdrop/Backdrop';
import { loadContactData, saveContactData } from '../../services/localStorage';

const Modal = ({ id, name, username, email, phone,displayModal, closeModal }) => {
  const [state, setState] = useState({
    name,
    username,
    email,
    phone,
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };
  const handlerFunc = (id) => {
    const localStorageContacts = loadContactData();
    try {
      localStorageContacts[id].name = state.name;
      localStorageContacts[id].phone = state.phone;
      localStorageContacts[id].username = state.username;
      localStorageContacts[id].email = state.email;
      saveContactData(localStorageContacts);
      closeModal();
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Backdrop show={displayModal} onClick={closeModal}/>
        <div
          className="modal"
          style={{
            transform: displayModal ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: displayModal ? '1' : '0',
          }}
        >
        <div className="contact">
          <label htmlFor="name">Name</label>
          <input placeholder="name" value={state.name} onChange={inputChangeHandler} name="name"  id='name'/>
          <label htmlFor="username">UserName</label>
          <input placeholder="UserName" value={state.username} onChange={inputChangeHandler} name="username"  id='username'/>
          <label htmlFor="email">Email</label>
          <input placeholder="Email" value={state.email} onChange={inputChangeHandler} name="email"  id='email'/>
          <label htmlFor="phone">Phone</label>
          <input placeholder="Phone" value={state.phone} onChange={inputChangeHandler} name="phone" id='phone' />
          <button className="saveBtn" onClick={() => handlerFunc(id)}>
            save
          </button>
        </div>
        </div>
    </>
  );
};

export default Modal;
