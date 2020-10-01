import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { getListings } from "../firebase";
import FoodCard from "../components/FoodCard/FoodCard";
import ItemConfirmation from "../components/ItemConfirmation/ItemConfirmation";
import { useStateProviderValue } from "../StateProvider";

const Feed = () => {
  const [{ listings, cart, search }, dispatch] = useStateProviderValue();

  let [showConfirmation, setShowConfirmation] = useState(false);
  let [itemIdToConfirm, setItemIdToConfirm] = useState(null);

  const handleShowConfirmation = () => setShowConfirmation(true);
  const handleCloseConfirmation = () => setShowConfirmation(false);

  //use useEffect here to only trigger getListings once
  //we can also add clean up function to useEffect to be triggered (such as when component unmounts)
  useEffect(() => {
    getListings().then((listings) => {
      dispatch({
        type: "SET_LISTINGS",
        listings: listings,
      });
    });
  }, []);

  let filteredListings = search
    ? listings.filter((listing) => {
        return (
          listing.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
          listing.description.toLowerCase().indexOf(search.toLowerCase()) !== -1
        );
      })
    : listings;

  const getDetailsFromListings = (id) => {
    if (id === null) return null;
    return listings.find((obj) => obj.id === itemIdToConfirm);
  };

  //Convert array into array of td FoodCards
  let listingsToFoodCards = listings
    ? filteredListings.map((listing) => {
        return (
          <td key={listing.id}>
            <FoodCard
              listing={listing}
              handleShowConfirmation={handleShowConfirmation}
              setItemIdToConfirm={setItemIdToConfirm}
            />
          </td>
        );
      })
    : [];

  let foodCardsRows = [];

  //Convert array of FoodCards into nested arrays for each row
  for (let i = 0; i < listingsToFoodCards.length; i += 3) {
    const lastRowCheck = Math.min(i + 3, listingsToFoodCards.length);
    foodCardsRows.push(listingsToFoodCards.slice(i, lastRowCheck));
  }

  return (
    <div>
      <Table bordered={false} id="listing-table">
        <tbody>
          {filteredListings
            ? foodCardsRows.map((row) => <tr>{row}</tr>)
            : "Finding tasty meals.."}
        </tbody>
      </Table>
      <ItemConfirmation
        showConfirmation={showConfirmation}
        handleCloseConfirmation={handleCloseConfirmation}
        details={getDetailsFromListings(itemIdToConfirm)}
      />
      {/* Calling a functional component as a function is faster, as it does not call React.createElement but it may result in errors */}
      {/* {ItemConfirmation(showConfirmation, getDetailsFromListings(itemIdToConfirm))} */}
    </div>
  );
};

export default Feed;
