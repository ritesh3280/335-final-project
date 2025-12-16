# Deployment Guide

## Deploying to Render (Recommended - Free Tier Available)

### Step 1: Prepare Your Project
1. Make sure `node_modules` is in `.gitignore` (it should be)
2. Ensure all your code is committed to Git
3. Your MongoDB connection string is already configured in `index.js`

### Step 2: Create a Render Account
1. Go to https://render.com/
2. Sign up for a free account (use GitHub, Google, or email)

### Step 3: Deploy Your Application

#### Option A: Connect GitHub Repository
1. Push your code to a GitHub repository
2. In Render dashboard, click "New +" → "Web Service"
3. Connect your GitHub account and select your repository
4. Configure the service:
   - **Name**: `pharmacy-app` (or any name you prefer)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or choose a paid plan)

#### Option B: Deploy from Git Repository
1. In Render dashboard, click "New +" → "Web Service"
2. Connect your Git provider (GitHub, GitLab, Bitbucket)
3. Select your repository
4. Use the same configuration as Option A

### Step 4: Set Environment Variables
1. In your Render service dashboard, go to "Environment"
2. Add the following environment variable:
   - **Key**: `MONGODB_URI`
   - **Value**: `mongodb+srv://vgandhi_db_user:FXKGiNlHYatqOPCs@songs-db.byy1dii.mongodb.net/pharmacy-app?retryWrites=true&w=majority`
3. (Optional) You can also set `PORT` if needed, but Render sets this automatically

### Step 5: Deploy
1. Click "Create Web Service"
2. Render will automatically:
   - Install dependencies (`npm install`)
   - Start your application (`npm start`)
3. Wait for the deployment to complete (usually 2-5 minutes)
4. Your app will be available at: `https://your-app-name.onrender.com`

### Step 6: Update README.md
Update your `README.md` with:
- Your deployed app link (from Step 5)
- Your YouTube video link
- Your contact information

## Alternative: Deploy to Heroku

### Step 1: Install Heroku CLI
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Or download from: https://devcenter.heroku.com/articles/heroku-cli
```

### Step 2: Login to Heroku
```bash
heroku login
```

### Step 3: Create Heroku App
```bash
cd /path/to/your/project
heroku create your-app-name
```

### Step 4: Set Environment Variables
```bash
heroku config:set MONGODB_URI="mongodb+srv://vgandhi_db_user:FXKGiNlHYatqOPCs@songs-db.byy1dii.mongodb.net/pharmacy-app?retryWrites=true&w=majority"
```

### Step 5: Deploy
```bash
git push heroku main
```

### Step 6: Open Your App
```bash
heroku open
```

## Important Notes

1. **MongoDB Atlas**: Your MongoDB connection string is already configured. Make sure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0) or add Render's IP addresses.

2. **Port Configuration**: Your app uses `process.env.PORT || 7003`, which will automatically use Render/Heroku's assigned port.

3. **Build Time**: First deployment may take 5-10 minutes. Subsequent deployments are faster.

4. **Free Tier Limitations**:
   - Render: App may spin down after 15 minutes of inactivity (takes ~30 seconds to wake up)
   - Heroku: Limited free dyno hours per month

5. **Testing**: After deployment, test all features:
   - Search for medicines
   - Submit a purchase
   - Review purchases

## Troubleshooting

- **Build fails**: Check that all dependencies are in `package.json`
- **App crashes**: Check logs in Render/Heroku dashboard
- **MongoDB connection fails**: Verify your connection string and network access in MongoDB Atlas
- **Port errors**: Make sure you're using `process.env.PORT` (already configured)

## Final Checklist Before Submission

- [ ] App is deployed and accessible online
- [ ] All features work on the deployed version
- [ ] README.md has the deployed app link
- [ ] README.md has YouTube video link
- [ ] README.md has all required information
- [ ] `node_modules` folder is removed (for zip submission)
- [ ] All code is working correctly

