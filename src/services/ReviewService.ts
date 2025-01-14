import { AxiosResponse } from "axios";
import { ApiClient } from "./apiClient";
import {
  BookingStatus,
  GetBookingsResponse,
} from "../interfaces/BookingInterfaces";
import { Review } from "../interfaces/ReviewInterfaces";

const pathURL = "/reviews";
const apiClient = ApiClient(pathURL);

const ReviewService = {
  addReview: async (requestBody: Review): Promise<AxiosResponse<any>> => {
    console.log(requestBody);

    try {
      const res = await apiClient.post("", {
        ...requestBody,
      });
      return res;
    } catch (error) {
      throw new Error(error);
    }
  },

  getReviews: async (carId: string): Promise<Review[]> => {
    try {
      const res = await apiClient.get(`/car/${carId}`);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateBookingStatus: async (
    bookingId: Number,
    status: BookingStatus
  ): Promise<any> => {
    console.log(bookingId, status);
    try {
      const res = await apiClient.put(`/${bookingId}/status`, null, {
        params: {
          status,
        },
      });

      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  //   deleteCar: (carId) => axios.delete(`${API_BASE_URL}/${carId}`),
  //   updateCar: (carId, updates) =>
  //     axios.patch(`${API_BASE_URL}/${carId}`, updates),
  // };
};
export default ReviewService;
