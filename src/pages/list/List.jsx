import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import SearchItem from "../../components/searchItem/SearchItem";

const List = () => {


  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="SearchItem">
        <SearchItem />
      </div>
      
    </div>
  );
};

export default List;
