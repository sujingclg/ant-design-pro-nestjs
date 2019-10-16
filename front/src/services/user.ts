import axios from '@/utils/axios';

export async function queryUsers() {
  const response = await axios.get('/api/users/');
  return response.data;
}

export async function queryCurrentUser() {
  const response = await axios.get('/api/user/access/current');
  return response.data;
}
