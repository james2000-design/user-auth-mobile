
import axios from "axios";
import { TwitterCommunityResponse } from "@/models/twitter";

const API_KEY = process.env.EXPO_PUBLIC_RAPIDAPI_KEY 
export async function getCommunityDetails(
  communityId: string
): Promise<TwitterCommunityResponse> {
    try {
      const url = `https://twitter241.p.rapidapi.com/community-details?communityId=${communityId}`;
    const response = await axios.get<TwitterCommunityResponse>(
        url,
      {
       
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": "twitter241.p.rapidapi.com",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(" Error fetching community details:", error.message);
    throw new Error("Failed to fetch community details");
  }
}
