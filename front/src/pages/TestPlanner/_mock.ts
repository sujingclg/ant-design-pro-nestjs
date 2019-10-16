const overviewData = [
  {
    key: '1',
    matClass: 'composite',
    matType: 'Fiber',
    lotNum: 'LMN-AGP193-PW',
    publisher: 'XuFang',
    supplier: 'ABC',
    date: '2016-05-09T07:10:16.526991Z',
    status: 'Finished',
  },
  {
    key: '2',
    matClass: 'metals',
    matType: 'Alloy',
    lotNum: 'LMN-AGP193-PW',
    publisher: 'LuLiang',
    supplier: 'EDD',
    date: '2017-04-23T13:10:16.526991Z',
    status: 'Refused',
  },
  {
    key: '3',
    matClass: 'composite',
    matType: 'Laminate',
    lotNum: 'LMN-AGP193-PW',
    publisher: 'LuLiang',
    supplier: 'EDD',
    date: '2017-09-20T13:10:16.526991Z',
    status: 'Testing',
  },
  {
    key: '4',
    matClass: 'weld',
    matType: '基材',
    lotNum: 'LMN-AGP193-PW',
    publisher: 'LuLiang',
    supplier: 'EDD',
    date: `2018-01-29T13:10:16.526991Z`,
    status: 'Checked',
  },
  {
    key: '5',
    matClass: 'weld',
    matType: '焊料',
    lotNum: 'LMN-AGP193-PW',
    publisher: 'LuLiang',
    supplier: 'EDD',
    date: `2018-01-01T13:10:16.526991Z`,
    status: 'Created',
  },
];

export default {
  'GET /api/test-planner/overview': (req: any, res: any) => {
    setTimeout(() => {
      res.send({overviewData,});
    }, 1000);
  },

  'POST /api/test-planner/submit' : (req: any, res: any) => {
    setTimeout(() => {
      // console.log(req.body);
      overviewData.push(req.body);
      res.send();
    }, 1000);
  }
}
