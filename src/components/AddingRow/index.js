import './index.css'

const AddingRow=props=>{
    const {item,activeColumn}=props
    const {id,name,rank,priceUSD,percentChange24h,priceBTC,marketCapUSD}=item
    return(
    <tr>
        <td><input type="checkbox"/></td>
        <td style={{ color: activeColumn === "id" ? 'blue' : 'black' }}>{id}</td>
        <td style={{ color: activeColumn === "name" ? 'blue' : 'black' }}>{name}</td>
        <td style={{ color: activeColumn === "rank" ? 'blue' : 'black' }}>{rank}</td>
        <td style={{ color: activeColumn === "priceUSD" ? 'blue' : 'black' }}>{priceUSD}</td>
        <td style={{ color: activeColumn === "percentChange24h"? 'blue' : 'black' }}>{percentChange24h}</td>
        <td style={{ color: activeColumn === "priceBTC" ? 'blue' : 'black' }}>{priceBTC}</td>
        <td style={{ color: activeColumn === "marketCapUSD" ? 'blue' : 'black' }}>{marketCapUSD}</td>
    </tr>)
}
export default AddingRow