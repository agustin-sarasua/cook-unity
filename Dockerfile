# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

COPY tsconfig.json ./

# Install app dependencies
RUN npm install --only=production

# Copy the rest of the app source code to the container
COPY . .

# Build the TypeScript source code
RUN npm run build

# Set the environment variable for the server port
ENV PORT=3000

# Expose the port that the app will listen on
EXPOSE $PORT

# Start the app by running the compiled JavaScript file
CMD ["npm", "start"]