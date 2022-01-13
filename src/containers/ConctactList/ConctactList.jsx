import React,{useEffect,useState} from 'react';
import ContactItem from '../ConctactItem/ConctactItem';
import axiosApi from '../../services/axiosApi';
import Fuse from 'fuse.js'
import { saveContactData, loadContactData } from '../../services/localStorage';
import Search from '../../Components/Search/Search';
import './ConctactList.css'


const ConctactList = () => {
  const [contactsList,setContactsList]=useState([]);
  const [fuseSearchContacts,setFuseSearchContacts]=useState([]);
  const [searchTerm,setSearchTerm]=useState('');
    const [sortType,setSortType]=useState('asc');



    const fetchContacts = async () => {
      const data=loadContactData();
      try {
          if (!data)
          {
              const response = await axiosApi.get()
              saveContactData(response.data);
          }
          setContactsList(data);
      } catch (e) {
        console.error(e);
      }
    };

    useEffect(()=>{
      if (contactsList)
        {
          contactsList.sort((a,b)=>{
            const isReversed=(sortType ==='asc') ? 1:-1;
            return isReversed *a.name.localeCompare(b.name);
          });
        }
    })
    
    
    useEffect(() => {
    fetchContacts().catch(console.error());
    }, []);



    
    
      const handleSearch=(e)=>{
        const fuse= new Fuse(fuseSearchContacts,{
          keys:[
            'name',
          ],
          includeScore:true,
          minMatchCharLength:1,
        });

        const result = fuse.search(e.target.value).map((contact) => contact.item);
        setSearchTerm(e.target.value);
          if (searchTerm === '') setFuseSearchContacts(contactsList);
            else setFuseSearchContacts(result);
    }
    
  
      const contactForm=(data)=>{
        if (data)
        {
            return data.map((con)=>(<ContactItem
              key={con.id}  
              name={con.name} 
              id={con.id}
              username={con.username} 
              email={con.email} 
              phone={con.phone}
              editContact={()=>console.log(con.id)}
              />))
        }
    }
      const contactsIsExist=searchTerm ?contactForm(fuseSearchContacts) : contactForm(contactsList)

      
    return (
      <div className='wrapper'>
           <div className='searchColumn'>
                    <Search  searchVal={searchTerm} onChange={handleSearch} onClickAsc={()=>setSortType('asc')} onClickDesc={()=>setSortType('desc')}/>
                  </div>
                  <div className='contactsColumn'>
                    {contactsList? contactsIsExist :<h2>Обновите страницу</h2>}
                  </div>
        </div>
    )
}

export default ConctactList
