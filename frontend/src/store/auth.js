import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated : true,
    isLoading :false,
    name : '',
    email : '',
    userId : '65bbcef312ae3d3f4c7abd8e',
}

 const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        signIn : (state,action) => {
            state.isAuthenticated = true;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.userId = action.payload.userId;
        },
        signOut : (state) => {
            state.isAuthenticated = false;
            state.isLoading = false;
            state.name = '';
            state.email = '';
            state.userId = '';
        }
    }
})

export const {signIn,signOut} = authSlice.actions
export default authSlice.reducer;