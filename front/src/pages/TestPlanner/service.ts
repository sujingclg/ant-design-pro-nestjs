import axios from "@/utils/axios";


const delay = (millisecond: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, millisecond)
  })
};

export async function getTestPlannerOverviewData() {
  await delay(1000);
  const response = await axios.get('/api/test-planner/overview/');
  return response.data;
}

export async function submitForm(data: any) {
  await delay(1000);
  // const response = await axios.post('/api/test-planner/submit', data);
}