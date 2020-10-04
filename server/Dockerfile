FROM node

# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

# Copy configs
COPY ormconfig.js ./dist/

# Production
# COPY .env.production ./dist/.env 
# OR local dev
# COPY .env ./dist/.env 

# Expose and Run App
EXPOSE 4000
CMD node dist/index.js