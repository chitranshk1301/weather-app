import React, { createContext, useState, useContext, useEffect } from 'react';

const LocationContext = createContext();

export const useLocationContext = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    // Load previously selected location from local storage
    const storedLocation = localStorage.getItem('selectedLocation');
    if (storedLocation) {
      setSelectedLocation(storedLocation);
    }
  }, []);

  const updateSelectedLocation = (newLocation) => {
    setSelectedLocation(newLocation);
    // Save the selected location to local storage
    localStorage.setItem('selectedLocation', newLocation);
  };

  return (
    <LocationContext.Provider value={{ selectedLocation, updateSelectedLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
