import React, { createContext, useState } from "react";

export const SavedContext = createContext();

export const SavedProvider = ({ children }) => {
    const [savedItems, setSavedItems] = useState([]);

    const toggleSave = (item) => {
        const exists = savedItems.find((i) => i.id === item.id);

        if (exists) {
            setSavedItems(savedItems.filter((i) => i.id !== item.id));
        } else {
            setSavedItems([...savedItems, item]);
        }
    };

    return (
        <SavedContext.Provider value={{ savedItems, toggleSave }}>
            {children}
        </SavedContext.Provider>
    );
};