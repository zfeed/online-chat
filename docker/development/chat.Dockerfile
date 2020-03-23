FROM node:12

ARG USER_ID

USER ${USER_ID}

WORKDIR /home/chat/app
