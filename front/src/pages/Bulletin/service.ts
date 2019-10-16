import axios from "@/utils/axios";

export async function getBulletins(params: {currentPage: number, pageSize: number}) {
  const response = await axios.get('/api/bulletins/', {params,});
  return response.data;
}