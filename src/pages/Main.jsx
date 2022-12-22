import React from "react";
import Card from "../components/Card";

export default ({ goods, api, setFav, user }) => {
  return (
    <>
      <h1>
        <center>Любимые продукты</center>
      </h1>
      <div className="cards-container">
        {goods?.map((d, i) => (
          <Card
            key={d._id}
            {...d}
            api={api}
            setFav={setFav}
            userId={user?._id}
          />
        ))}
      </div>
    </>
  );
};
