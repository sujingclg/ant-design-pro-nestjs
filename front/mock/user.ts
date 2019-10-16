export default {

  "POST /api/user/access/login": (req: any, res: any) => {
    setTimeout(() => {
      const {username, password} = req.body;
      console.log({username, password});
      if (username === "admin") {
        res.send({status: "ok", currentAuthority: "admin"});
      } else if (username === "user") {
        res.send({status: "ok", currentAuthority: "user"});
      } else {
        res.send({status: "error", currentAuthority: "guest"});
      }
    }, 1000);
  },

  "GET /api/user/access/current": {
    username: "zhangsan",
    name: "张三",
    unreadCount: 0,
  },
};
