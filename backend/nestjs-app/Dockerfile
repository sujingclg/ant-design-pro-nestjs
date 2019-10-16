# 使用官方的镜像作为父类镜像
FROM node:latest

# 设置容器的工作目录为 /app
WORKDIR /project

# 将当前目录下的文件拷贝到容器的工作目录下面
COPY package.json .

# 执行额刚刚拷贝进来的文件
RUN npm install --production --registry=https://registry.npm.taobao.org

COPY . .

RUN chmod +x ./wait-for-it.sh

# 将容器的8010端口暴露出来，供容器外部访问
EXPOSE 7001

# 定义环境变量
ENV EGG_WORKERS=2 \
  DATABASE_URI="mongodb://192.168.70.170/example"

# 当容器运行起来时执行使用python运行app.py
CMD ["npm", "start"]
