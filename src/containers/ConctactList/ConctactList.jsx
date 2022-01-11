import React,{useEffect,useState} from 'react';
import ContactItem from '../ConctactItem/ConctactItem';
import axiosApi from '../../services/axiosApi';
import { saveContactData, loadContactData } from '../../services/localStorage';
import './ConctactList.css'

const ConctactList = () => {
    const [contactsList,setContactsList]=useState([]);
    
      useEffect(() => {
        const fetchContacts = async () => {
        try {
            const data=loadContactData();
            if (!data)
            {
                const response = await axiosApi.get()
                saveContactData(response.data);
                console.log(response.data);
            }
            setContactsList(data);
        } catch (e) {
          console.error(e);
        }
      };
      fetchContacts().catch(console.error());
      }, []);
      const contactForm=(data)=>{
          if (data)
          {
              return data.map(()=>(<ContactItem name={'Maxim'}/>))
          }
      }
    return (
        <div className='wrapper'>
            {contactForm(contactsList)}
        </div>
    )
}

export default ConctactList
