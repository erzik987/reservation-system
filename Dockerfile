# Use an official Node.js runtime as a parent image
FROM node:18 as build

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./ /app

# Install app dependencies
RUN npm install
RUN npm run build


FROM nginx:latest
# Copy the rest of the application code
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/reservation-system /usr/share/nginx/html
# Expose the port that your app will run on
# EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Define the command to run your app using CMD which will start your Express server
# CMD ["npx", "ts-node", "./src/server.ts"]