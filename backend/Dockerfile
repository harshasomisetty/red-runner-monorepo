# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/node-app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./
COPY .api ./.api

# Install project dependencies
RUN yarn install --frozen-lockfile
# Add the custom directory to PATH
ENV PATH=/usr/src/node-app/node_modules/.bin:$PATH

# Copy the application code to the working directory
COPY . .

# Expose the application's port
EXPOSE 3000

