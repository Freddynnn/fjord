# Use a Node.js base image
FROM node:16 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Use an NGINX base image to serve the build files
FROM nginx:stable-alpine

# Copy the built application from the build stage to NGINX's serving directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the NGINX default port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
