# Use a lightweight Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose the port for the development server
EXPOSE 3000

# Set the environment to production
ENV NODE_ENV=production

# Command to start the React development server
CMD ["npm", "start"]
