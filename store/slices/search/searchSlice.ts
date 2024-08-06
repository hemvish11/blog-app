// src/store/slices/search/searchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Blog {
    id: number;
    name: string;
    title: string;
    description: string;
    img: string;
}

interface SearchState {
    query: string;
    filteredItems: Blog[];
}

const initialState: SearchState = {
    query: '',
    filteredItems: []
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
        setFilteredItems(state, action: PayloadAction<Blog[]>) {
            state.filteredItems = action.payload;
        },
        resetFilteredItems(state, action: PayloadAction<Blog[]>) {
            state.filteredItems = action.payload;
        },
    },
});

export const { setQuery, setFilteredItems, resetFilteredItems } = searchSlice.actions;

export default searchSlice.reducer;
