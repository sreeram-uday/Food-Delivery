import { useContext } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import './ordercard.css'

export const OrderCard = ({src,quantity,name}) => {
  const {url} = useContext(StoreContext)
  console.log(src,quantity,name)
  return (
    <div className="container">
        <div className="img">
            <img src={url+"/images/"+src} alt="food-img"/>
        </div>
        <div className="food-info">
            {name} x {quantity}
        </div>
    </div>
  )
}
