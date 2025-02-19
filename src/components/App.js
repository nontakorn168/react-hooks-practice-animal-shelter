import React, { useEffect, useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  useEffect(() => {
    fetch("http://localhost:3001/pets")
      .then((r) => r.json())
      .then((data) =>setPets(data))
  },[])

  function handleAdoptPet(petId) {
    setPets((prevPets) =>
      prevPets.map((pet) =>
        pet.id === petId ? { ...pet, isAdopted: true } : pet
      )
    );
  }

  function handleChangeType(e) {
    setFilters({ type: e });
  }

  function handleFindPetClick() {
    const url = filters.type === "all"
      ? "http://localhost:3001/pets" 
      : `http://localhost:3001/pets?type=${filters.type}`;
  
    fetch(url)
      .then((r) => r.json())
      .then((data) => setPets(data));
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={handleChangeType} setFilters={setFilters} onFindPetsClick={handleFindPetClick} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;