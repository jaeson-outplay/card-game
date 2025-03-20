# Deploying to Render

This guide will walk you through deploying your Card Game API server to Render's free tier.

## Prerequisites

1. A GitHub account
2. Your Card Game repository pushed to GitHub
3. A MongoDB Atlas account with a free cluster set up

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account
2. Create a new cluster (choose the free tier)
3. Set up database access:
   - Click on "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create a username and password (save these for later)
   - Set privileges to "Read and Write to Any Database"
   - Click "Add User"
4. Set up network access:
   - Click on "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (you can restrict this later)
   - Click "Confirm"
5. Get your connection string:
   - Click on "Databases" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user's password
   - Replace `myFirstDatabase` with `card-game`

Your connection string should look like:
```
mongodb+srv://username:password@cluster0.mongodb.net/card-game?retryWrites=true&w=majority
```

## Step 2: Deploy to Render

1. Go to [Render](https://render.com/) and create a free account (sign up with GitHub)
2. Once logged in, click on "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure your web service:
   - **Name**: card-game-api
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node src/api/start.js`
   - **Plan**: Free

5. Add environment variables:
   - Click on "Advanced" to expand additional options
   - Add the following environment variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `NODE_ENV`: production
     - `HUGGINGFACE_API_KEY`: Your Hugging Face API key (if you have one)
     - `ALLOWED_ORIGINS`: Your GitHub Pages URL (e.g., https://yourusername.github.io)

6. Click "Create Web Service"

Render will now build and deploy your API server. This may take a few minutes.

## Step 3: Update Your GitHub Pages Card Viewer

1. Once your Render deployment is complete, copy the URL of your web service (e.g., `https://card-game-api.onrender.com`)
2. Open your GitHub Pages card viewer
3. Enter the URL of your Render deployment in the API URL field
4. Click "Connect"

## Notes About the Free Tier

Render's free tier has some limitations:
- Your service will spin down after 15 minutes of inactivity
- It will spin up again when a new request comes in, but this may take 30-60 seconds
- You get 750 hours of runtime per month

This is perfect for a demo or personal project, but for a production application, you might want to consider upgrading to a paid plan.

## Troubleshooting

### CORS Issues

If you encounter CORS issues, make sure your `ALLOWED_ORIGINS` environment variable is set correctly in Render. It should match the domain where your GitHub Pages site is hosted.

### Connection Issues

If your API server can't connect to MongoDB, double-check your MongoDB Atlas connection string and make sure your database user has the correct permissions.

### Slow Initial Response

Remember that on the free tier, your service will spin down after 15 minutes of inactivity. The first request after this period may take 30-60 seconds to respond as the service spins up again. 