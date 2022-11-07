import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Loader from "../../components/loader/Loader";
const Hotel = (data) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [Item, setItem] = useState();
  const [Detail, setDetail] = useState();

  const { state } = useLocation();
  const sid = localStorage.getItem("searchid");
  let { id } = useParams();

  const { dateD, dateA } = state;
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "35de3c2a5fmsh5af517dfb3e19e3p1230cdjsn03d3df0824b2",
        "X-RapidAPI-Host": "apidojo-booking-v1.p.rapidapi.com",
      },
    };

    fetch(
      `https://apidojo-booking-v1.p.rapidapi.com/properties/get-description?hotel_ids=${id}&check_out=2023-03-15&languagecode=en-us&check_in=2023-03-13`,
      options
    )
      .then((response) => response.json())
      .then((response) => setItem(...response))
      .catch((err) => console.error(err));

    fetch(
      `https://apidojo-booking-v1.p.rapidapi.com/properties/detail?hotel_id=${id}&search_id=${sid}&departure_date=${dateD}&arrival_date=${dateA}&rec_guest_qty=2&rec_room_qty=1&dest_ids=-3727579&recommend_for=3&languagecode=en-us&currency_code=USD&units=imperial`,
      options
    )
      .then((response) => response.json())
      .then((response) => setDetail(...response))
      .catch((err) => console.error(err));
  }, [dateA,dateD,id,sid]);
  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

  function handlePage(id) {
    window.open(id);
  }
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {Detail === undefined ? (
        <Loader />
      ) : (
        <>
          <div className="hotelContainer">
            {open && (
              <div className="slider">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="close"
                  onClick={() => setOpen(false)}
                />
                <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className="arrow"
                  onClick={() => handleMove("l")}
                />
                <div className="sliderWrapper">
                  <img
                    src={photos[slideNumber].src}
                    alt=""
                    className="sliderImg"
                  />
                </div>
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className="arrow"
                  onClick={() => handleMove("r")}
                />
              </div>
            )}
            <div className="hotelWrapper">
              <button
                className="bookNow"
                onClick={() => {
                  handlePage(Detail.url);
                }}
              >
                Reserve or Book Now!
              </button>
              <h1 className="hotelTitle">{Detail.hotel_name}</h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{Detail.address}</span>
              </div>
              <span className="hotelDistance">{Detail.arrival_date}</span>
              <span className="hotelPriceHighlight">
                Book a stay over $114 at this property and get a free airport
                taxi
              </span>
              <div className="hotelImages">
                {photos.map((photo, i) => (
                  <div className="hotelImgWrapper" key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo.src}
                      alt=""
                      className="hotelImg"
                    />
                  </div>
                ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">Stay in the heart of City</h1>
                  <p className="hotelDesc">
                    {Item.description === undefined ? (
                      <>
                        Providing sea views, Căn hộ hướng Biển -MUONG THANH- Sea
                        View Apartment in Danang provides accommodations, a
                        restaurant, a bar, a shared lounge, a private beach area
                        and a casino. Complimentary WiFi is
                        provided.\n\nFeaturing a kitchen with a microwave and a
                        fridge, each unit also comes with a safety deposit box,
                        a satellite flat-screen TV, ironing facilities, desk and
                        a seating area with a sofa. There's a private bathroom
                        with bidet in some units, along with bathrobes, slippers
                        and a hairdryer.\n\nThe apartment has a terrace.\n\nBoth
                        a bicycle rental service and a car rental service are
                        available at Căn hộ hướng Biển -MUONG THANH
                      </>
                    ) : (
                      Item.description
                    )}
                  </p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>{Detail.urgency_room_string}</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of {Detail.review_nr}!
                  </span>
                  <h2>
                    <b>${Detail.block_price_breakdown.gross_price}</b> (9
                    nights)
                  </h2>
                  <button
                    onClick={() => {
                      handlePage(Detail.url);
                    }}
                  >
                    Reserve or Book Now!
                  </button>
                </div>
              </div>
            </div>
            <MailList />
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default Hotel;

