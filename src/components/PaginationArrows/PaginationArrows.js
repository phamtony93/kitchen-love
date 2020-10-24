import React from "react";
import "./PaginationArrows.css";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { useStateProviderValue } from "../../StateProvider";

const PaginationArrows = ({next, prev}) => {
  const [{last_visible}, dispatch] = useStateProviderValue();

  return (
    <div className="paginationArrows">
      <button onClick={prev}>
        <NavigateBeforeIcon />
      </button>
      <button onClick={next}>
        <NavigateNextIcon />
      </button>
    </div>
  );
};

export default PaginationArrows;
