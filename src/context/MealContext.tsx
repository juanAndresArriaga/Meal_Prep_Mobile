import React, { createContext, useState, useContext } from 'react';

type FamilyInfo = {
  size: number;
  dietaryRestrictions: string;
  goals: string;
};

type Meal = {
  title: string;
  description: string;
  videoLink: string;
};

type MealPlan = {
  [day: string]: Meal[];
};

type GroceryItem = {
  id: string;
  name: string;
  crossedOff: boolean;
};

type MealContextType = {
  familyInfo: FamilyInfo;
  setFamilyInfo: (info: FamilyInfo) => void;
  mealPlan: MealPlan;
  setMealPlan: (plan: MealPlan) => void;
  groceries: GroceryItem[];
  setGroceries: (groceries: GroceryItem[]) => void;
  toggleGroceryItem: (id: string) => void;
};

const defaultFamilyInfo: FamilyInfo = {
  size: 1,
  dietaryRestrictions: '',
  goals: '',
};

const MealContext = createContext<MealContextType | undefined>(undefined);

export const MealProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [familyInfo, setFamilyInfo] = useState<FamilyInfo>(defaultFamilyInfo);
  const [mealPlan, setMealPlan] = useState<MealPlan>({});
  const [groceries, setGroceries] = useState<GroceryItem[]>([]);

  const toggleGroceryItem = (id: string) => {
    setGroceries((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, crossedOff: !item.crossedOff } : item
      )
    );
  };

  return (
    <MealContext.Provider
      value={{
        familyInfo,
        setFamilyInfo,
        mealPlan,
        setMealPlan,
        groceries,
        setGroceries,
        toggleGroceryItem,
      }}
    >
      {children}
    </MealContext.Provider>
  );
};

export const useMealContext = () => {
  const context = useContext(MealContext);
  if (!context) {
    throw new Error('useMealContext must be used within a MealProvider');
  }
  return context;
};
