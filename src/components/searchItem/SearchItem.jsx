import { useState } from "react";
import { useEffect } from "react";
import "./searchItem.css";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from '../loader/Loader'

const SearchItem = () => {
  const [Item, setItem] = useState();
  const [Detail, setDetail] = useState();
  const navigate = useNavigate();

  const { state } = useLocation();

  const { children_qty, dateD, dateA } = state;
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "35de3c2a5fmsh5af517dfb3e19e3p1230cdjsn03d3df0824b2",
        "X-RapidAPI-Host": "apidojo-booking-v1.p.rapidapi.com",
      },
    };

    fetch(
      `https://apidojo-booking-v1.p.rapidapi.com/properties/list?offset=0&arrival_date=${dateA}&departure_date=${dateD}&guest_qty=1&dest_ids=-3712125&room_qty=1&search_type=city&children_qty=${children_qty}&children_age=5&search_id=none&price_filter_currencycode=USD&order_by=popularity&languagecode=en-us&travel_purpose=leisure`,
      options
    )
      .then((response) => response.json())
      .then((response) =>
        setItem(response.result)(setDetail(response.search_id))
      )
      .catch((err) => console.error(err));
  }, [children_qty,dateA,dateD]);
  function handlePage(id) {
    window.open(id);
  }
  function handleOpen(id) {
    navigate(`/hotels/${id}`, { state: { dateD: dateD, dateA: dateA } });
  }
  localStorage.setItem("searchid", Detail);

  return (
    <>
      {Item === undefined ? (
        <Loader />
      ) : (
        <>
          {Item.map((data,index) => {
            return (
              <span
                onClick={() => handleOpen(data.hotel_id)}
                className="linkstyle1"
                key={index}
              >
                <div className="searchItem">
                  <img src={data.main_photo_url} alt="" className="siImg" />
                  <div className="siDesc">
                    <h1 className="siTitle">{data.hotel_name_trans}</h1>
                    <span className="siDistance">
                      {data.distance}km from center
                    </span>
                    <span className="siTaxiOp">
                      {data.is_free_cancellable === "1" ? (
                        <> Paid airport taxi</>
                      ) : (
                        <>Free airport taxi</>
                      )}
                    </span>
                    <span className="siSubtitle">{data.address}</span>
                    <span className="siFeatures">{data.urgency_room_msg}</span>
                    <span className="siCancelOp">Free cancellation </span>
                    <span className="siCancelOpSubtitle">
                      {data.urgency_room_msg}
                    </span>
                  </div>
                  <div className="siDetails">
                    <div className="siRating">
                      <span>{data.review_score_word}</span>
                      <button>{data.review_score === null ? <>NR</> : data.review_score}</button>
                    </div>
                    <div className="siDetailTexts">
                      <span className="siPrice">${data.min_total_price}</span>
                      <span className="siTaxOp">
                        {data.has_free_parking === "1" ? (
                          <>Not Includes taxes and fees </>
                        ) : (
                          <></>
                        )}
                      </span>
                      <button
                        className="siCheckButton"
                        onClick={() => {
                          handlePage(data.url);
                        }}
                      >
                        See availability
                      </button>
                    </div>
                  </div>
                </div>
              </span>
            );
          })}
        </>
      )}
    </>
  );
};

export default SearchItem;
