FROM node:8.9.1

LABEL maintainer="Ben"

# 全局安装yarn
RUN apt-get update && apt-get install -y curl apt-transport-https && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

RUN yarn global add pm2 gulp


# 创建工作目录
WORKDIR /IMPACT_annihilate

# 复制全部文件到容器
COPY ./ /IMPACT_annihilate

# nginx日志path和配置path
# RUN chown www:www -R /home/www; \
#     mkdir -p -m 755 /var/log/project_logs; \
#     chown www:www -R /var/log/project_logs; \
#     rm -f /etc/nginx/vhost/*.conf

# ADD ./hotelEnd.conf /etc/nginx/vhost

# 安装依赖,构建项目
RUN yarn install

RUN yarn run build

# 检查容器状态
HEALTHCHECK CMD node healthcheck.js

# 暴露的端口
EXPOSE 80 443 3007

# run容器起来时,所带的命令会追加到这些命令之后，不会覆盖
ENTRYPOINT pm2 start ecosystem.config.js

