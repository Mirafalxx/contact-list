import React from 'react';
import './Search.css'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const Search = ({searchVal,onChange,onClickAsc,onClickDesc}) => {
    return (
        <>
              <div className="searchBox">
                      <input type="text" className="searchInput" placeholder="Search.." value={searchVal} onChange={onChange}/>
                    </div>
                    <div className='sortBox'>
                      <button className='sortButton' onClick={onClickAsc}>
                        <ArrowDownwardIcon/>
                      </button>
                      <button className='sortButton' onClick={onClickDesc}>
                      <ArrowUpwardIcon/>
                      </button>
                    </div>
        </>
    )
}

export default Search
