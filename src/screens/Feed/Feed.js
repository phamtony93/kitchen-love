import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { getListings, nextPage, prevPage } from "../../firebase";
import FoodCard from "../../components/FoodCard/FoodCard";
import ItemConfirmation from "../../components/ItemConfirmation/ItemConfirmation";
import PaginationArrows from "../../components/PaginationArrows/PaginationArrows.js";
import { useStateProviderValue } from "../../StateProvider";
import "./Feed.css";

const Feed = () => {
  const [{ listings, cart, last_visible_listing }, dispatch] = useStateProviderValue();

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
        listings: listings.data,
      });
      dispatch({
        type: "SET_LAST_VISIBLE_LISTING",
        last_visible_listing: listings.last_visible
      })
    });
  }, []);

  const getDetailsFromListings = (id) => {
    if (id === null) return null;
    return listings.find((obj) => obj.skuId === itemIdToConfirm);
  };

  const nextListingsPage = async () => {
    const listings = await nextPage(last_visible_listing);
    dispatch({
      type: "SET_LISTINGS",
      listings: listings.data
    })
    dispatch({
      type: "SET_LAST_VISIBLE_LISTING",
      last_visible_listing: listings.last_visible
    })
    dispatch({
      type: "SET_FIRST_VISIBLE_LISTING",
      first_visible_listing: listings.first_visible
    })
  }

  const prevListingsPage = async () => {
    const listings = await prevPage(last_visible_listing);
    console.log('listings >>>>>>>', listings)
    dispatch({
      type: "SET_LISTINGS",
      listings: listings.data
    })
    dispatch({
      type: "SET_LAST_VISIBLE_LISTING",
      last_visible_listing: listings.last_visible
    })
    dispatch({
      type: "SET_FIRST_VISIBLE_LISTING",
      first_visible_listing: listings.first_visible
    })    
  }
  //Convert array into array of td FoodCards
  let listingsToFoodCards = listings
    ? listings.map((listing) => {
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

  // console.log('listings >>> ', listings)

  return (
    <div className="feed">
      <Table bordered={false} id="listing-table">
        <tbody>
          {listings
            ? foodCardsRows.map((row) => <tr>{row}</tr>)
            : "Finding tasty meals.."}
        </tbody>
      </Table>
      <div className="feed__pagination">
        <PaginationArrows next={nextListingsPage} prev={prevListingsPage}/>
      </div>
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
