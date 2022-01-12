import React,{useEffect,useState} from 'react';
import ContactItem from '../ConctactItem/ConctactItem';
import axiosApi from '../../services/axiosApi';
import Fuse from 'fuse.js'
import { saveContactData, loadContactData } from '../../services/localStorage';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './ConctactList.css'

const ConctactList = () => {
    const [contactsList,setContactsList]=useState([]);
    const [searchTerm,setSearchTerm]=useState('');
    const [sortType,setSortType]=useState('asc');


    useEffect(() => {
      const data=loadContactData();
      const fetchContacts = async () => {
      try {
          if (!data)
          {
              const response = await axiosApi.get()
              await saveContactData(response.data);
          }
          setContactsList(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchContacts().catch(console.error());
    }, []);
    
      function handleSearch({ currentTarget = {} })
      {
        const {value}=currentTarget;
        setSearchTerm(value)
      }

      const fuse= new Fuse(contactsList,{
        keys:[
          'name',
          'username'
        ],
        includeScore:true,
        minMatchCharLength:2,
      })


      const fuseSearch=fuse.search(searchTerm);
      const fuseSearchResult= searchTerm  ? fuseSearch.map(result=>result.item):contactsList;
      
      const sortedContact=fuseSearchResult.sort((a,b)=>{
        const isReversed=(sortType ==='asc') ? 1:-1;
        return isReversed *a.name.localeCompare(b.name);
      })


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


      let form = (<></>)
  
    return (
      <div className='wrapper'>
           <div className='searchColumn'>
                  <div className="searchBox">
                      <input type="text" className="searchInput" placeholder="Search.." value={searchTerm} onChange={handleSearch}/>
                    </div>
                    <div className='sortBox'>
                      <button className='sortButton' onClick={()=>setSortType('asc')}>
                        <ArrowDownwardIcon/>
                      </button>
                      <button className='sortButton' onClick={()=>setSortType('desc')}>
                      <ArrowUpwardIcon/>
                      </button>
                    </div>
                  </div>
                  <div className='contactsColumn'>
                    {contactForm(sortedContact)}
                  </div>
        </div>
    )
}

export default ConctactList
