import { createSlice } from '@reduxjs/toolkit'

const rootSlice = createSlice({
    name: "root",
    initialState: {
        title: "Title",
        isbn: "ISBN",
        author_name: "Author",
        book_length: "book Length",
        book_type: "Book Type"
    },
    reducers: {
        chooseTitle: (state, action) => { state.title = action.payload},
        chooseISBN: (state, action) => { state.isbn = action.payload},
        chooseAuthor: (state, action) => { state.author_name = action.payload},
        chooseLength: (state, action) => { state.book_length = action.payload},
        chooseType: (state,action) => { state.book_type = action.payload}
    }
})

export const reducer = rootSlice.reducer;
export const {chooseTitle, chooseISBN, chooseAuthor, chooseLength, chooseType} = rootSlice.actions