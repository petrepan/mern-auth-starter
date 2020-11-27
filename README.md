# User account starter template

A MERN stack boilerplate with authentication and authorization functionality

## Features

Checkout a live example here: ![mern-auth-starter](mern-auth-starter.netlify.app/)

* Registration with email, username and password
* Email verification
* Resend email verification
* Login with email or username and password
* Forgot password/reset password pages
* Update profile 

## File structure
In a MVC structure, the server side files and folders is at the root folder. It is made in Nodejs with Express. It communicates with the database using moongoose as MongoDb object model.

The frontend is stored in the client folder and built with Reactjs which serves as the view.

## Setting up on your locals

backend
```bash
# clone from github
git clone https://github.com/petrepan/mern-auth-starter.git

```
```bash
# Change directory into root
cd mern-auth-starter
```

```bash
# install NPM dependencies
npm install
```
.env file contains:
*MONGO_URI: environmental variable for mongodb. You can set yours up locally or in the cloud.
*JWT_SECRET: This is a secret random string of your own for jsonwebtoken
*SENDGRID_API_KEY: Register on Sendgrid and set up an api key key
*EMAIL_FROM: email for sending emails
*CLIENT_URL: This is your frontend URL. it could be localhost:3000 for development. Production variable will differ.

```bash
# Then simply start your app
npm run dev
```
you can deploy your backend on your preferred host platform so as to fetch from the frontend

Frontend
```bash
# Change directory into client
cd client
```
```bash
# install NPM dependencies
npm install
```
```bash
# Then simply start your app
npm run start
```
in the client folder, change the URL value in the /src/action/user.js to your backend URL

## Inspiration
My inspiration for building this is the ![proshop_mern](https://github.com/bradtraversy/proshop_mern) by Brad Traversy