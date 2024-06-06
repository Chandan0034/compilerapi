# # Use an official node runtime as a parent image
# FROM node:14
# # Set the working directory
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Install additional languages and compilers
# RUN apt-get update && apt-get install -y \
#     gcc \
#     g++ \
#     openjdk-11-jdk \
#     python3 \
#     python3-pip \
#     dart \
#     && apt-get clean

# # Copy the rest of the application code to the working directory
# COPY . .

# # Expose the port the app runs on
# EXPOSE 5000

# # Define the command to run the app
# CMD ["node", "app.js"]
# Use a Node.js base image
# FROM ubuntu

# # Set the working directory
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install npm dependencies
# RUN apt-get update 
# RUN apt-get  install -y curl
# RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
# RUN  apt-get upgrade -y
# RUN apt-get install -y nodejs
# RUN npm install
# RUN apt-get update 
# RUN apt-get install -y python3 python3-pip
# # Install additional packages
# # RUN apt-get update && apt-get install -y \
# #     gcc \
# #     g++ \
# #     default-jdk \
# #     python3 \
# #     python3-pip \
# #     && apt-get clean

# # Copy the rest of the application code
# COPY . .

# # Expose port 5000
# EXPOSE 5000

# # Command to run the application
# CMD ["node", "app.js"]
# FROM node:14

# # Set the working directory
# WORKDIR /app

# # Install system dependencies and clean up
# RUN apt-get update \
#     && apt-get install -y \
#     gcc \
#     g++ \
#     default-jdk \
#     python3 \
#     python3-pip \
#     && apt-get clean

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install npm dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Expose port 5000
# EXPOSE 5000

# # Command to run the application
# CMD ["node", "app.js"]

# FROM ubuntu

# RUN apt-get update
# RUN apt-get install -y curl
# RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
# RUN  apt-get upgrade -y
# RUN apt-get install -y nodejs

# RUN apt-get update && \ 
#     apt-get install -y \
#     python3 \
#     python3-pip \
#     default-jdk \
#     g++ \
#     curl \
#     gnupg \
#     && apt-get clean
# EXPOSE 5000
# COPY . .
# RUN  npm install
# ENTRYPOINT [ "node","app.js" ]

# Use an official Ubuntu base image
# Use an official Ubuntu base image
# FROM ubuntu
# WORKDIR /usr/src/app
# COPY package*.json ./

# RUN apt-get update 
# RUN apt-get  install -y curl
# RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
# RUN  apt-get upgrade -y
# RUN apt-get install -y nodejs
# COPY . .
# RUN npm install
# EXPOSE 5000
# CMD [ "node",'app.js' ]

# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Install Python
RUN apt-get update && \
    apt-get install -y python3 python3-pip

RUN apt-get update && apt-get install -y \
    build-essential \
    g++
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc
RUN apt-get update && apt-get install -y \
    openjdk-11-jdk
# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD [ "node", "app.js" ]