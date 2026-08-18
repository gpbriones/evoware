import axios from "axios";
import type { SavingsDetailResponse } from "../models/SavingsMovement";

const BASE_URL = import.meta.env.VITE_API_URL;

export interface SavingsDetailRequest{
    access_token:string;
}

export const savingsDetailRequest = async(data:SavingsDetailRequest):
Promise<SavingsDetailResponse>=>{
    const response = await axios.post(
        `${BASE_URL}/user/aportaciones`
        ,data);
    return response.data;
};