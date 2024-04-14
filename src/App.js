import {Component} from 'react'
import AddingRow from './components/AddingRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFileExport, faFilter, faMagnifyingGlass, faPlus, faSortUp,faSortDown, faSquareMinus, faTrash} from '@fortawesome/free-solid-svg-icons'
import './App.css';



class App extends Component{
  state={cryptoData:[],searchedInput:"",sortBy:"rank",sortType:"asc",activeColumn:null}

  record=event=>{
    this.setState({searchedInput:event.target.value})
  }

  sortz = col => {
    const { sortBy, sortType } = this.state;
    if (sortBy === col) {
      this.setState({ sortType: sortType === 'asc' ? 'desc' : 'asc' });
    } else {
      this.setState({ sortBy: col, sortType: 'asc' });
    }
    this.setState({activeColumn:col})
  };



  fetchingData=async()=>{
    try{
      const response=await fetch("https://api.coinlore.net/api/tickers/")
      const rawData=await response.json()
      const {data}=rawData
      const alteredData=data.map(each=>({
      id:Number(`${each.id}`),
      name:`${each.name}`,
      rank:Number(`${each.rank}`),
      priceUSD:Number(`${each.price_usd}`),
      percentChange24h:Number(`${each.percent_change_24h}`),
      priceBTC:Number(`${each.price_btc}`),
      marketCapUSD:Number(`${each.market_cap_usd}`)
    }))
    this.setState({cryptoData:alteredData})
    }catch(error){
      console.log('There has been a problem with your fetch operation: ', error.message);
    }
    
  }

  componentDidMount(){
    this.fetchingData()
  }
  render(){
    const {cryptoData,searchedInput,sortBy,sortType,activeColumn}=this.state
    const filteredData=cryptoData.filter(each=>String(each.id).includes(searchedInput) || each.name.toLowerCase().includes(searchedInput.toLowerCase()))
    const sortedData = filteredData.sort((a, b) => {
      if (sortBy==="name"){
        if (sortType==='asc'){
          return (a.name.localeCompare(b.name))
        }
        else{
          return(b.name.localeCompare(a.name))
        }
      }
      else{

      
      if (sortType === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    }
    });

    

    return(
      <div className='bg'>
        <div className='card'>
          <div className='part-1'>
            <div className='search-container'>
              <h1 className='heading'>Headline</h1>
              <label htmlFor="search">Search</label>
              <div id="search" className='search-bar'>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input onChange={this.record} value={searchedInput}  type="search" placeholder='search'/>
              </div>
            </div>
            <div className='filter-container'>
              <div className="button-container">
                <FontAwesomeIcon icon={faTrash}/>
                <p className='para'>Delete</p>
              </div>
              <div className="button-container">
                <FontAwesomeIcon icon={faFilter}/>
                <p className='para'>Filter</p>
              </div>
              <div className="button-container export">
                <FontAwesomeIcon icon={faFileExport}/>
                <p className='para'>Export</p>
              </div>
              <div className="button-container plus">
                <FontAwesomeIcon icon={faPlus}/>
                <p className='para'>Add new CTA</p>
              </div>

            </div>
          </div>
          <div className='part-2'>
            <table>
              <thead>
                <tr>
                  <th><FontAwesomeIcon icon={faSquareMinus}/></th>
                  <th >
                    <div onClick={()=>this.sortz("id")} className='table-heading'>
                      
                      <p>ID</p>
                      {activeColumn ==="id"?(sortType==="asc"?<FontAwesomeIcon icon={faSortUp}/>:<FontAwesomeIcon icon={faSortDown}/>):null}
                      
                     
                    
                    </div>
                  </th>
                  <th>
                    <div onClick={()=>this.sortz("name")} className='table-heading'>
                      
                      <p>Name</p>
                      {activeColumn ==="name"?(sortType==="asc"?<FontAwesomeIcon icon={faSortUp}/>:<FontAwesomeIcon icon={faSortDown}/>):null}
                      
                    </div>
                  </th>
                  <th>
                    <div onClick={()=>this.sortz("rank")} className='table-heading'>
                      
                      <p>Rank</p>
                      {activeColumn ==="rank"?(sortType==="asc"?<FontAwesomeIcon icon={faSortUp}/>:<FontAwesomeIcon icon={faSortDown}/>):null}
        
                    </div>
                  </th>
                  
                  <th >
                    <div onClick={()=>this.sortz("priceUSD")} className='table-heading'>
                      
                      <p>Price(USD)</p>
                      {activeColumn ==="priceUSD"?(sortType==="asc"?<FontAwesomeIcon icon={faSortUp}/>:<FontAwesomeIcon icon={faSortDown}/>):null}
    
                    </div>
                  </th>
                    
                  <th>
                    <div onClick={()=>this.sortz("percentChange24h")} className='table-heading'>
                      
                      <p>Percent Change (24h)</p>
                      {activeColumn ==="percentChange24h"?(sortType==="asc"?<FontAwesomeIcon icon={faSortUp}/>:<FontAwesomeIcon icon={faSortDown}/>):null}
                      

                    </div>
                  </th>

                  <th >
                    <div onClick={()=>this.sortz("priceBTC")} className='table-heading'>
                      
                      <p>Price (BTC)</p>
                      {activeColumn ==="priceBTC"?(sortType==="asc"?<FontAwesomeIcon icon={faSortUp}/>:<FontAwesomeIcon icon={faSortDown}/>):null}
                    </div></th>
                  <th >
                    <div onClick={()=>this.sortz("marketCapUSD")} className='table-heading'>
                      
                      <p>Market Cap (USD)</p>
                      {activeColumn ==="marketCapUSD"?(sortType==="asc"?<FontAwesomeIcon icon={faSortUp}/>:<FontAwesomeIcon icon={faSortDown}/>):null}
                      

                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map(each=><AddingRow key={each.id} activeColumn={activeColumn} item={each}/>)}

              </tbody>
            </table>
            </div> 
        </div>

      </div>
    )
  }
}

export default App
