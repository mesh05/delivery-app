import { Grid, Link } from "@mui/material";
import { useEffect, useState } from "react";

function StallList() {
  const [stalls, setStalls] = useState([]);
  useEffect(() => {
    fetch("https://ruchulu.live/api/stalls")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStalls(data.stalls);
      });
  }, []);
  return (
    // <div>
    //   {stalls.map((stall) => {
    //     return (
    //       <div key={stall} style={{ height: "100px", width: "100px" }}>
    //         <button>{stall}</button>
    //       </div>
    //     );
    //   })}
    // </div>
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {stalls.map((stall) => (
        <Grid item xs={2} key={stall}>
          <Link href={`/${stall}`}>
            <button>{stall}</button>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

export default StallList;
