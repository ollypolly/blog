# Giscus Setup Guide

## Step 1: Enable GitHub Discussions

1. Go to your blog repository on GitHub
2. Click on the **Settings** tab
3. Scroll down to **Features** section
4. Check the **Discussions** checkbox to enable discussions

## Step 2: Install Giscus App

1. Go to https://github.com/apps/giscus
2. Click **Install**
3. Choose to install on your blog repository
4. Grant the necessary permissions

## Step 3: Configure Giscus

1. Go to https://giscus.app/
2. Fill in your repository information:
   - Repository: `your-username/blog` (replace with your actual repo)
   - Choose **"Discussion title contains page `pathname`"** for mapping
   - Choose **"Announcements"** or create a **"Blog Comments"** category

## Step 4: Get Configuration Values

The giscus.app website will generate configuration for you. You'll get:
- `repo`: Your repository name
- `repoId`: Auto-generated repository ID  
- `category`: Discussion category name
- `categoryId`: Auto-generated category ID

## Step 5: Update Comments Component

Replace the placeholder values in `/app/components/Comments.tsx`:

```tsx
// Replace these with your actual values from giscus.app
repo="your-username/blog"
repoId="your-repo-id-from-giscus-app"
category="Blog Comments" // or "Announcements"
categoryId="your-category-id-from-giscus-app"
```

## Step 6: Create Discussion Categories (Optional)

In your GitHub repository:
1. Go to **Discussions** tab
2. Click **Categories** 
3. Create a "Blog Comments" category if you want dedicated comment categories

## Notes

- Comments will appear as GitHub Discussions in your repository
- Users need GitHub accounts to comment
- Perfect for technical blogs where readers likely have GitHub accounts
- Supports markdown, code blocks, and reactions
- Completely free with no ads or tracking