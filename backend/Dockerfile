# Use a base image with Node.js
FROM node:14

# Install Java
RUN apt-get update && apt-get install -y openjdk-11-jdk

# Set the working directory
WORKDIR /opt/render/project/src/backend

# Copy your project files
COPY . .

COPY ./scripts/jplag.jar /opt/render/project/src/backend/scripts/

# Install dependencies
RUN npm install

# Start the application
CMD ["npm", "start"]
