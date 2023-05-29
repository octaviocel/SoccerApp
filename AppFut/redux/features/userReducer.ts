import { login } from './../../service/UserService';
import { createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import User from '../../models/User';
import { useToast } from 'react-native-toast-notifications';


const saveToken = async (token: string) => {
    return await SecureStore.setItemAsync("token", token);
}

const removeToken = async () => {
    return await SecureStore.deleteItemAsync("token");
}

interface UserState {
    currentUser: User | null
    userToken: string | null
    isLoading: boolean
    isSignOut: boolean
    loading: boolean
    error: boolean
}


const initialState: UserState = {
    currentUser: null,
    userToken: null,
    isLoading: true,
    isSignOut: false,
    loading: true,
    error: false
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
            state.userToken = '';
            state.currentUser = null;
            state.loading = true;
            removeToken();
            //console.log("Se salio de sesion")
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
                state.currentUser = userData;

                saveToken(token)
                    .then(() => {
                        console.log("Logeado")
                                                
                    })
            })
            .addCase(login.rejected, (state) => {
                console.log("Error de logeo")
                state.isLoading = false;
                state.error = true;
            })
    },

});

export const { restoreToken, signIn, signOut } = userSlide.actions;

export default userSlide.reducer;