// src/services/userService.js
import axiosClient from '../../config/axiosconfig';

const userService = {
  // Lấy danh sách người dùng
  getUsers: async (params:string) => {
    try {
      const response = await axiosClient.get('/users', { params });
      return response; // Trả về dữ liệu đã xử lý từ Interceptor
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error; // Đẩy lỗi ra để xử lý thêm nếu cần
    }
  },

  // Tạo người dùng mới
  createUser: async (data:unknown) => {
    try {
      const response = await axiosClient.post('/users', data);
      return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  getUsersByQuery: async (query:string) => {
    try {
      const {data} = await axiosClient.get(`api/users/${query}`);
      console.log(data)
      return data; // Trả về dữ liệu đã xử lý từ Interceptor
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error; // Đẩy lỗi ra để xử lý thêm nếu cần
    }
  },
};

export default userService;
