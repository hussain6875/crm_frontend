import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../services/UserService";

export const fetchUsersByID = createAsyncThunk(
    "users/fetchUsersById",
    async(id)=>{
        return await UserService.getUserById(id);
    }
);

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async()=>{
        return await UserService.getUsers();
    }
);


export const createUser = createAsyncThunk(
    "users/createUser",
    async(userData)=>{
        return await UserService.createUser(userData);
    }
);

const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchUsersByID.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsersByID.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUsersByID.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer;
