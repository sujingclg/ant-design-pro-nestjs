const fakeBulletins = [
  {
    id: 1,
    title: '某型号高温合金材料上线提醒',
    body: 'What is the object oriented way to get wealthy ?',
    timestamp: '2018-09-05 06:03:00.359841',
    author: 'wangjing'
  },
  {
    id: 2,
    title: 'Composite数据库培训内容大纲',
    body: 'What happens to a frog\'s car when it breaks down?',
    timestamp: '2018-09-05 06:05:07.341584',
    author: 'xufang'
  },
  {
    id: 3,
    title: '某种增材制造材料上线提醒',
    body: 'To understand what recursion is...',
    timestamp: '2018-09-05 06:07:15.385455',
    author: 'sujing'
  },
  {
    id: 4,
    title: '某种焊接材料上线提醒',
    body: 'You must first understand what recursion is',
    timestamp: '2018-09-05 06:07:39.814034',
    author: 'mafeng'
  },
  {
    id: 5,
    title: 'here we use dva',
    body: 'What do you call a factory that sells passable products?',
    timestamp: '2018-09-29 10:51:35.820394',
    author: 'luliang'
  },
  {
    id: 6,
    title: '某种焊接材料上线提醒',
    body: 'It gets toad away',
    timestamp: '2018-09-29 10:51:35.820394',
    author: 'panxin'
  },
  {
    id: 7,
    title: 'Composite数据库培训内容大纲',
    body: 'Did you hear about the two silk worms in a race?',
    timestamp: '2018-09-29 10:51:35.820394',
    author: 'baojun'
  },
  {
    id: 8,
    title: 'It ended in a tie',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    timestamp: '2018-09-29 10:51:35.820394',
    author: 'huangxiaobo'
  },
];

export default {
  'get /api/bulletins/': function (req: any, res: any) {
    setTimeout(() => {
      const currentPage = req.query.currentPage || 0;
      const pageSize = req.query.pageSize || 5;
      const start = currentPage * pageSize;
      const cards = fakeBulletins.slice(start, start + pageSize);
      const totalCards = fakeBulletins.length;
      res.send({cards, totalCards});
    }, 1000);
  },
};