import { createSlice } from "@reduxjs/toolkit";
const initialState={
    compId:"",
    companyName:"",

}
const compSlice=createSlice({
    name:"comp",
    initialState,
    reducers:

    {
       setCompId:(state , action)=> {
        state.compId=action.payload
       } ,
       setCompanyName:(state , action)=> {
        state.companyName=action.payload
       } 
    }
});

 export const {setCompId , setCompanyName}=compSlice.actions
export default compSlice.reducer