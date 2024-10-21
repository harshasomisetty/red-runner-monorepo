# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/backend

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./
COPY .api ./.api

# Install project dependencies
RUN yarn install --frozen-lockfile --production
# Add the custom directory to PATH
ENV PATH=/usr/src/backend/node_modules/.bin:$PATH

# Copy the application code to the working directory
COPY . .

# Copy .env file if it exists
COPY .env* ./

# Generate Prisma client
RUN echo "Generating Prisma client..." && \
    npx prisma generate && \
    echo "Prisma client generated successfully"

# Set NODE_ENV to production
ENV NODE_ENV=production

# Use the PORT environment variable
ENV PORT=8080
EXPOSE ${PORT}

CMD ["node", "src/index.js"]
