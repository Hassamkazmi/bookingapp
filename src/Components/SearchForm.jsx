import "../CSS/searchbox.css";
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const SearchForm = () => {
  const [ArrivalDate, SetArrivalDate] = useState();
  const [DepartDate, SetDepartDate] = useState();
  const [Disable, setDisable] = useState(true);
  const [DataonTable, setDataonTable] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors,DepartDate)

  const ApiSubmission = async (data) => {
    const options = {
      method: "GET",
      url: "https://apidojo-booking-v1.p.rapidapi.com/properties/list",
      params: {
        offset: "1",
        arrival_date: data.arrival_date,
        departure_date: data.departure_date,
        guest_qty: data.guest_qty,
        dest_ids: "-3712125",
        room_qty: data.room_qty,
        search_type: data.searchtype,
        children_qty: data.children_qty,
        children_age: data.ChildrenAge,
        search_id: "none",
        order_by: data.orderby,
        languagecode: "en-us",
        price_filter_currencycode:'USD',
        travel_purpose: data.travel_purpose,
      },
      headers: {
        "X-RapidAPI-Key": "f3b9c80997msh251f038da25364fp13acfdjsn9971553ef46f",
        "X-RapidAPI-Host": "apidojo-booking-v1.p.rapidapi.com",
      },
    };
    SetDepartDate(data.departure_date);

    return await axios
      .request(options)
      .then(function (response) {
        setDataonTable(response.data.result);
        console.log(response);
        return response.data.result;
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const onSubmit = async (data, event) => {
    await ApiSubmission(data);
    setDataonTable(await ApiSubmission(data));
  };
  console.log(DataonTable,'DataonTable');
  var date = new Date();
  function toJSONLocal(date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  }


  const arrivalchange = async (event) => {
    SetArrivalDate(event.target.value);
    setDisable(false);
  };

  const SubmitDisable =  ArrivalDate === '' || DepartDate === ''
  return (
    <div className="SearchForm">
        <div className="SearchFormCard">
        <form
          id="form"
          className=""
          onSubmit={handleSubmit(onSubmit)}
        >
          <input type="text" {...register("Address")} placeholder="Address" />
          <input
            type="text"
            {...register("guest_qty")}
            placeholder="GuestQunatity"
          />
          <input
            type="text"
            {...register("room_qty")}
            placeholder="RoomQunatity"
          />

          <input
            type="date"
            {...register("arrival_date")}
            onChange={arrivalchange}
            min={toJSONLocal(date)}
          />

          <input
            type="date"
            {...register("departure_date")}
            min={ArrivalDate}
            disabled={Disable}
          />
          
          <span className="Childrenclass">
          <input
           type='number'
            name="children_qty"
            {...register("children_qty")}
            placeholder="Number OF Children"
          />
          
          </span>
          <div className="Purposeclass">
         
          <select
            id="travel_purpose"
            name="travel_purpose"
            {...register("travel_purpose")}
          >
            <option>Travel Purpose</option>
            <option value="leisure">leisure</option>
            <option value="business">business</option>
          </select>
          </div>
          <button disabled={SubmitDisable}>Search</button>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
