# Use an official Node.js runtime as a parent image
FROM node:18-slim



# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm ci --production && npm cache clean --force
# RUN npm run build

# Copy the rest of the application code
COPY . .

# Expose the port that your app will run on
EXPOSE 8080

# Define the command to run your app using CMD which will start your Express server
# CMD ["npm", "run build"]
CMD ["npx", "ts-node", "./src/server.ts"]