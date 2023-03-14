import { login } from './../../service/UserService';
import { createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';


const saveToken = async (token: string) => {
    return await SecureStore.setItemAsync("token", token);
}

const initialState = {
    currentUser: null,
    userToken: null,
    isLoading: true,
    isSignOut: false,
    loading: true
}

const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        restoreToken: (state, action) => {
            state.userToken = action.payload;
            state.loading = false;
        },
        signIn: (state, action) => {
            state.isSignOut = false;
            state.userToken = action.payload;
        },
        signOut: (state) => {
            state.isSignOut = true;
            state.userToken = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                const { token, ...userData } = action.payload;

                state.userToken = token;
                state.isLoading = false;

                saveToken(token)
                    .then(() => {
                        console.log("Logeado")
                    })
            })
            .addCase(login.rejected, (state) => {
                console.log("Error de loego")
                state.isLoading = false;
            })
    },

});

export const { restoreToken, signIn, signOut } = userSlide.actions;

export default userSlide.reducer;