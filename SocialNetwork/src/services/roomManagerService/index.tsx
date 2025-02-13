import axiosClient from '../../config/axiosconfig';
import { Amenity, CreateRoomRentalDetailRequest, CreatMonthlyInvoiceRequest, MonthlyInvoiceReSponse, MotelRoom, PageResponse, RoomRentalDetailResponse } from '../../pages/RoomManager/type';


export interface APIResponse{
    message:string,
    status:boolean,
}

export const MonthlyInvoiceService = {
  getAllMonthlyInvoice: async (): Promise<MonthlyInvoiceReSponse[]> => {
    try {
      const {data} = await axiosClient.get('/monthlyInvoice/allMonthlyInvoice');
        return data;
    } catch (error) {
      console.error('Error fetching all monthlyInvoice:', error);
      throw error; 
    }
  },

  getTenantMonthlyInvoice: async (): Promise<MonthlyInvoiceReSponse[]> => {
    try {
      const {data} = await axiosClient.get('/monthlyInvoice/tenantMonthlyInvoice');
        return data;
    } catch (error) {
      console.error('Error fetching all monthlyInvoice:', error);
      throw error; 
    }
  },
  getMyMonthlyInvoice: async (): Promise<MonthlyInvoiceReSponse[]> => {
    try {
      const {data} = await axiosClient.get('/monthlyInvoice/myMonthlyInvoice');
        return data;
    } catch (error) {
      console.error('Error fetching my monthlyInvoice:', error);
      throw error; 
    }
  },
  deletemonthlyInvoice: async (id:number): Promise<APIResponse> => {
    try {
      const {data} = await axiosClient.delete(`/monthlyInvoice/delete/${id}`);
        return data;
    } catch (error) {
      console.error('Error delete monthlyInvoice:', error);
      throw error; 
    }
  },
  updateMonthlyInvoice: async (id:number): Promise<unknown[]> => {
    try {
      const {data} = await axiosClient.put(`/monthlyInvoice/update/${id}`);
        return data;
    } catch (error) {
      console.error('Error update monthlyInvoice:', error);
      throw error; 
    }
  },
  createMonthlyInvoice: async (creatMonthlyInvoiceRequest:CreatMonthlyInvoiceRequest): Promise<APIResponse> => {
    try {
      const {data} = await axiosClient.post(`/monthlyInvoice/create`,creatMonthlyInvoiceRequest);
      if(data.status){
        console.log(data);
        return data;
      }
      else{
        throw new Error("Can not create monthlyInvoice");
      }
    } catch (error) {
      console.error('Error fetching Authorities:', error);
      throw error; 
    }
  },
};


export const RoomRentalDetailService = {
  getAllRoomRentalDetail: async (): Promise<RoomRentalDetailResponse[]> => {
    try {
      const {data} = await axiosClient.get('/roomRentalDetail/allRoomRentalDetail');
        return data;
    } catch (error) {
      console.error('Error fetching all RoomRentalDetails:', error);
      throw error; 
    }
  },

  getTenantRoomRentalDetail: async (): Promise<RoomRentalDetailResponse[]> => {
    try {
      const {data} = await axiosClient.get('/roomRentalDetail/tenantRoomRentalDetails');
        return data;
    } catch (error) {
      console.error('Error fetching all RoomRentalDetails:', error);
      throw error; 
    }
  },
  

  getMyRoomRentalDetail: async (): Promise<RoomRentalDetailResponse[]> => {
    try {
      const {data} = await axiosClient.get('/roomRentalDetail/myRoomRentalDetails');
        return data;
    } catch (error) {
      console.error('Error fetching all RoomRentalDetails:', error);
      throw error; 
    }
  },

  updateRoomRentalDetail: async (id:number,roomRentalDetail:RoomRentalDetailResponse): Promise<APIResponse> => {
    try {
      const {data} = await axiosClient.put(`/roomRentalDetail/update/${id}`,roomRentalDetail);
        return data;
    } catch (error) {
      console.error('Error fetching all RoomRentalDetails:', error);
      throw error; 
    }
  },

  deleteRoomRentalDetail: async (id:number): Promise<APIResponse> => {
    try {
      const {data} = await axiosClient.delete(`/roomRentalDetail/delete/${id}`);
        return data;
    } catch (error) {
      console.error('Error delete RoomRentalDetails:', error);
      throw error; 
    }
  },
  createRoomRentalDetail: async (roomRentalDetail:CreateRoomRentalDetailRequest): Promise<APIResponse> => {
    try {
      const {data} = await axiosClient.post(`/roomRentalDetail/create`,roomRentalDetail);
      if(data.status){
        console.log(data);
        return data;
      }
      else{
        throw new Error("Can not create roomRentalDetails");
      }
    } catch (error) {
      console.error('Error fetching Authorities:', error);
      throw error; 
    }
  },
};


export const MotelRoomService = {
  getMotelRoom: async (id:string|undefined): Promise<MotelRoom> => {
    try {
      const {data} = await axiosClient.get(`/motelRoom/${id}`);
        return data;

    } catch (error) {
      console.error('Error fetching all MotelRoom:', error);
      throw error; 
    }
  },

  getMyMotelRoom: async (): Promise<MotelRoom[]> => {
    try {
      const {data} = await axiosClient.get('/motelRoom/myMotelRoom');
        return data;

    } catch (error) {
      console.error('Error fetching all MotelRoom:', error);
      throw error; 
    }
  },

  getTenantMotelRoom: async (): Promise<MotelRoom[]> => {
    try {
      const {data} = await axiosClient.get('/motelRoom/tenantMotelRoom');
        return data;

    } catch (error) {
      console.error('Error fetching all MotelRoom:', error);
      throw error; 
    }
  },

    getAllMotelRoom: async (): Promise<MotelRoom[]> => {
      try {
        const {data} = await axiosClient.get('/motelRoom/allMotelRoom');
          return data;

      } catch (error) {
        console.error('Error fetching all MotelRoom:', error);
        throw error; 
      }
    },
    getPageMotelRoom: async (page:number ): Promise<PageResponse<MotelRoom>> => {
      try {
        const {data} = await axiosClient.get(`/motelRoom/allMotelRoomV2?page=${page}`);
        console.log(data)
          return data;

      } catch (error) {
        console.error('Error fetching page MotelRoom:', error);
        throw error; 
      }
    },
    getAllMotelRoomWithKey: async (key:string): Promise<MotelRoom[]> => {
      try {
        const {data} = await axiosClient.get(`/motelRoom/search?key=${key}`);
          return data;

      } catch (error) {
        console.error('Error fetching search MotelRoom:', error);
        throw error; 
      }
    },

    deleteMotelRoomById: async (id:number): Promise<APIResponse> => {
      try {
        const {data} = await axiosClient.delete(`/motelRoom/delete/${id}`);
          return data;

      } catch (error) {
        console.error('Error delelte a MotelRoom:', error);
        throw error; 
      }
    },

    UpdateMotelRoom: async (id:number,motelRoomUpdate:MotelRoom): Promise<APIResponse> => {
      try {
        const {data} = await axiosClient.put(`/motelRoom/update/${id}`,motelRoomUpdate);
          return data;

      } catch (error) {
        console.error('Error update a MotelRoom:', error);
        throw error; 
      }
    },

    createMotelRoom: async (motelRoom:MotelRoom): Promise<APIResponse> => {
      try {
        const {data} = await axiosClient.post(`/motelRoom/create`,motelRoom);
        if(data.status){
          console.log(data);
          return data;
        }
        else{
          throw new Error("Can not create Room");
        }
      } catch (error) {
        console.error('Error fetching Authorities:', error);
        throw error; 
      }
    },
};

export const AmenityService = {
  getAllAmenity: async (): Promise<Amenity[]> => {
    try {
      const {data} = await axiosClient.get('/amenity/allAmenity');
        return data;
    } catch (error) {
      console.error('Error fetching all aminity:', error);
      throw error; 
    }
  },
  createAmenity: async (amenity:Amenity): Promise<APIResponse[]> => {
    try {
      const {data} = await axiosClient.post(`/amenity/create`,amenity);
      if(data.status){
        console.log(data);
        return data;
      }
      else{
        throw new Error("Can not create aminity");
      }
    } catch (error) {
      console.error('Error fetching Authorities:', error);
      throw error; 
    }
  },
};

