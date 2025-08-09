import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import DealService from '../services/DealService';


export const fetchDeals = createAsyncThunk('deals/fetchDeals',async ()=>{
    return await DealService.getDeals();
});

export const fetchDealsByID = createAsyncThunk('deals/fetchDealsByID',async (id)=>{
    return await DealService.getDealById(id);
});

export const createDeal = createAsyncThunk('fetch/createDeal',async (dealData)=>{
    return await DealService.createDeal(dealData);
});

const dealSlice = new createSlice({
    name:'deals',
    initialState:{
        deals:[],
        selectedDeal:null,
        loading:false,
        error:null,        
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        //pending,fulfilled,rejected for the fetchDeals method
        .addCase(fetchDeals.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchDeals.fulfilled,(state,action)=>{
            state.loading = false;
            state.deals = action.payload;
            console.log(state.deals);
        })
        .addCase(fetchDeals.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
        //pending,fulfilled,rejected fo rthe fetchDeals by ID method
        .addCase(fetchDealsByID.pending,(state)=>{
            state.loading = true;  
            state.error = null;      
        })  
        .addCase(fetchDealsByID.fulfilled,(state,action)=>{
            state.loading = false;
            state.selectedDeal = action.payload;           
        })      
        .addCase(fetchDealsByID.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
          //pending,fulfilled,rejected for creating new Deal method
        .addCase(createDeal.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })  
        .addCase(createDeal.fulfilled,(state,action)=>{
            state.loading = false;
            state.deals.push(action.payload);
        })
        .addCase(createDeal.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        });
    },
})
 export default dealSlice.reducer