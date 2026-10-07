import React, { createContext, useContext, useState, useEffect } from 'react';
import { Car, PageType } from '../types/car';
import { INITIAL_CARS } from '../data/cars';

interface CarContextType {
  cars: Car[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  selectedCarId: string | null;
  setSelectedCarId: (id: string | null) => void;
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  addNewCar: (car: Omit<Car, 'id' | 'createdAt'>) => string;
  currency: 'USD' | 'UZS';
  setCurrency: (c: 'USD' | 'UZS') => void;
  formatPrice: (usd: number, uzs: number) => string;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterBrand: string;
  setFilterBrand: (b: string) => void;
  filterRegion: string;
  setFilterRegion: (r: string) => void;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>(() => {
    const saved = localStorage.getItem('avto_premium_cars');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_CARS;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('avto_premium_favs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return ['mercedes-g63-amg', 'porsche-panamera-gts'];
  });

  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [currency, setCurrency] = useState<'USD' | 'UZS'>('USD');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterRegion, setFilterRegion] = useState('');

  useEffect(() => {
    localStorage.setItem('avto_premium_cars', JSON.stringify(cars));
  }, [cars]);

  useEffect(() => {
    localStorage.setItem('avto_premium_favs', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const addNewCar = (carData: Omit<Car, 'id' | 'createdAt'>): string => {
    const newId = 'car-' + Date.now();
    const newCar: Car = {
      ...carData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCars((prev) => [newCar, ...prev]);
    return newId;
  };

  const formatPrice = (usd: number, uzs: number) => {
    if (currency === 'USD') {
      return '$' + usd.toLocaleString();
    } else {
      return uzs.toLocaleString() + " so'm";
    }
  };

  return (
    <CarContext.Provider
      value={{
        cars,
        favorites,
        toggleFavorite,
        isFavorite,
        selectedCarId,
        setSelectedCarId,
        currentPage,
        setCurrentPage,
        addNewCar,
        currency,
        setCurrency,
        formatPrice,
        searchQuery,
        setSearchQuery,
        filterBrand,
        setFilterBrand,
        filterRegion,
        setFilterRegion
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export const useCars = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCars must be used within CarProvider');
  }
  return context;
};
