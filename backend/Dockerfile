# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/backend

# Copy package.json, yarn.lock, and prisma directory
COPY package.json yarn.lock ./
COPY prisma ./prisma
COPY .api ./.api

# Install project dependencies
RUN yarn install --frozen-lockfile
RUN yarn global add prisma

# Add the custom directory to PATH
ENV PATH=/usr/src/backend/node_modules/.bin:/usr/local/share/.config/yarn/global/node_modules/.bin:$PATH

# Generate Prisma client
RUN prisma generate

# Copy the rest of the application code
COPY . .

# Copy .env file if it exists
COPY .env* ./

# Set NODE_ENV to production
ENV NODE_ENV=production

# Use the PORT environment variable
ENV PORT=8080
EXPOSE ${PORT}

CMD ["node", "src/index.js"]
