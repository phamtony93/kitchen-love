import React from "react";
import "./PaginationArrows.css";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const PaginationArrows = () => {
  return (
    <div className="paginationArrows">
      <button>
        <NavigateBeforeIcon />
      </button>
      <button>
        <NavigateNextIcon />
      </button>
    </div>
  );
};

export default PaginationArrows;
