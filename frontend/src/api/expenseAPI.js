import API from "./axios";

export const addExpense=(data)=>API.post("/add",data);
export const getExpense=()=>API.get("/transactions");
export const updateExpense=(id,data)=>API.put(`/update/${id}`,data);
export const deleteExpense=(id)=>API.delete(`delete/${id}`);