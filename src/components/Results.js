

import { useHistory } from "react-router-dom";
import { HouseContext } from '../contexts/HouseContext'
import { useState, useEffect, useContext } from "react";


export default function Results() {
  const { cities,fetchHousesByCity2 } = useContext(HouseContext)
  //onst { houses } = useContext(HouseContext)

 // const [cities, setCities] = useState([]);

  const test = c => (

    <div key={c._id}>
      <img style={{
        height: '100px'
      }}
        src={c.pics[0]}
        alt={'picture ' + c.id}

      />

      <h4 style={{ cursor: 'pointer' }}>{c.slogan}</h4><h5>{c.price} USD per night</h5>
      <p>{c.featureIds.map(f => <span style={{fontSize:"10px"}} key={f._id}> {(() => {
        switch (f.name) {
          case "tv": return "\📺 TV";
          case "gym": return "\🏋️ GYM";
          case "animalFriendly": return "\🐶 Animal Friendly";
          case "wifi": return "\📶 WiFi";
          case "pool": return "\🏊 pool";
          case "smoking": return "\🚬 Smoking";
          case "parking": return "\🅿️ Parking";
          case "kitchen": return "\🍳 Kitchen";
          case "breakfast": return "\🍞 Breakfast";


          default: return "#FFFFFF";
        }
      })()}     </span>)}</p>
    </div>
  )
 
 /*  async function cityHouses() {
    let x = JSON.parse(localStorage.getItem('selectedCity')).value
    await fetchHousesByCity2(x)

  }

   useEffect(() => {
    localStorage.getItem('selectedCity')
    cityHouses()
  }, []) */

  return (
    <div>
      <div >
        {cities.map(c => test(c))}
      </div>
    </div>
  )
}