import React, { useEffect, useState } from "react";
import PetCard from "./PetCard";

function Account({
  pets = [
    {
      image: "hh.jp",
      name: "hulo",
      gender: "MF",
      health: "sick",
      description: "fdhdxd xdxutx",
      location: "43,56",
    },
    {
      image: "hh.jp",
      name: "hulo",
      gender: "MF",
      health: "sick",
      description: "fdhdxd xdxutx",
      location: "43,56",
    },
    {
      image: "hh.jp",
      name: "hulo",
      gender: "MF",
      health: "sick",
      description: "fdhdxd xdxutx",
      location: "43,56",
    },
  ],
}) {
  const [data, setData] = useState();
  useEffect(() => {}, []);
  return (
    <div className="pl-4 pr-4">
      <div>Found {pets?.length} result(s)</div>
      <div>
        {pets?.map((e, i) => {
          return (
            <PetCard
              key={i}
              name={e.name}
              description={e.description}
              gender={e.gender}
              health={e.health}
              location={e.location}
              image={e.image}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Account;
