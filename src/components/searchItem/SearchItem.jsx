import { useState } from "react";
import { useEffect } from "react";
import "./searchItem.css";

const SearchItem = () => {

  const [Item , setItem] = useState()
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '4fee570625msh0f4fbee7ecefb73p1e0c35jsnf7b4af6be358',
        'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
      }
    };
    
    fetch('https://apidojo-booking-v1.p.rapidapi.com/properties/list?offset=0&arrival_date=2022-12-14&departure_date=2022-12-15&guest_qty=1&dest_ids=-3712125&room_qty=1&search_type=city&children_qty=2&children_age=5%2C7&search_id=none&price_filter_currencycode=USD&order_by=popularity&languagecode=en-us&travel_purpose=leisure', options)
      .then(response => response.json())
      .then(response => setItem(response.result))
      .catch(err => console.error(err));
  },[])

  console.log(Item,'data is')
  return (
    <>
    {
      Item === undefined ? <>Loading...</> : <>
      {
        Item.map((data) => {
          return(
            <div className="searchItem">
            <img
              src={data.main_photo_url}
              alt=""
              className="siImg"
            />
            <div className="siDesc">
              <h1 className="siTitle">{data.hotel_name}</h1>
              <span className="siDistance">{data.distance}m from center</span>
              <span className="siTaxiOp">{data.urgency_room_msg}</span>
              <span className="siSubtitle">
                Studio Apartment with Air conditioning
              </span>
              <span className="siFeatures">
                Entire studio • 1 bathroom • 21m² 1 full bed
              </span>
              <span className="siCancelOp">Free cancellation </span>
              <span className="siCancelOpSubtitle">
                You can cancel later, so lock in this great price today!
              </span>
            </div>
            <div className="siDetails">
              <div className="siRating">
                <span>Excellent</span>
                <button>{data.review_score}</button>
              </div>
              <div className="siDetailTexts">
                <span className="siPrice">${data.min_total_price}</span>
                <span className="siTaxOp">Includes taxes and fees</span>
                <button className="siCheckButton">See availability</button>
              </div>
            </div>
          </div>
          )
        })
      }
      </>
    }
    </>
  );
};

export default SearchItem;
