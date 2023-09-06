FROM node:16-alpine

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code to the working directory
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Run the app
CMD [ "npm", "run", "start" ]