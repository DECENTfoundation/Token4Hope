FROM node:9.5.0
# setup

ENV NPM_CONFIG_LOGLEVEL error
ENV GIT_SSH="/app/ssh_bitbucket.sh"

RUN mkdir -p /app
WORKDIR /app

COPY ./scripts/ssh_bitbucket_key /app
COPY ./scripts/ssh_bitbucket.sh /app

# build


COPY . /app

RUN chmod 0600 /app/ssh_bitbucket_key && chmod +x /app/ssh_bitbucket.sh && rm -rf node_modules && npm install && npm run build && rm /app/ssh_bitbucket_key && rm /app/ssh_bitbucket.sh

CMD  ["npm", "start"]
EXPOSE 3003