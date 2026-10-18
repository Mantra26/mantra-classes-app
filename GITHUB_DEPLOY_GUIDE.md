# 🚀 How to Go Live on GitHub (GitHub Pages) for Mantra Classes App

This project is fully configured for automated deployment to **GitHub Pages** using GitHub Actions and relative asset paths.

---

## 📋 Prerequisites
1. A free GitHub account at [https://github.com](https://github.com).
2. [GitHub Desktop](https://desktop.github.com/) (recommended) OR Git CLI installed.

---

## 🌟 Method 1: Using GitHub Desktop (Easiest - 2 Minutes)

1. **Download & Open GitHub Desktop**:
   - If not already installed, download it from [desktop.github.com](https://desktop.github.com/) and sign in with your GitHub account.

2. **Add this Project Folder**:
   - In GitHub Desktop, click **File** → **Add Local Repository...** (or press `Ctrl + O`).
   - Click **Choose...** and select:
     `C:\Users\Umesh\.gemini\antigravity\scratch\mantra-classes-app`
   - If it says *"This directory does not appear to be a Git repository"*, click the blue link: **"create a repository"**.
   - Keep the default settings and click **Create Repository**.

3. **Publish to GitHub**:
   - Click the blue **"Publish repository"** button at the top.
   - Name: `mantra-classes-app`
   - Uncheck *"Keep this code private"* if you want students to view it on the free GitHub Pages tier, or keep it private if you have GitHub Pro.
   - Click **"Publish Repository"**.

4. **Enable GitHub Pages**:
   - Open your repository on GitHub in your browser: `https://github.com/<your-username>/mantra-classes-app`.
   - Go to **Settings** (gear icon) → click **Pages** on the left menu.
   - Under **Build and deployment** → **Source**, click the dropdown and choose **GitHub Actions**.
   - GitHub will automatically run the pre-configured workflow (`.github/workflows/deploy.yml`)!

5. **Your Live Student Link**:
   - Within 1–2 minutes, GitHub will display your live URL at the top of the Pages tab:
     👉 **`https://<your-username>.github.io/mantra-classes-app/`**
   - Share this link with students and parents!

---

## 💻 Method 2: Using Git Command Line (If Git is installed)

Open PowerShell or Command Prompt in this folder and run:

```bash
git init
git add .
git commit -m "Initial commit: Mantra Classes CBSE & ICSE Learning App"
git branch -M main
git remote add origin https://github.com/<your-username>/mantra-classes-app.git
git push -u origin main
```

Then in GitHub:
- Go to **Settings** → **Pages** → Source: **GitHub Actions**.
- Your site will be live at `https://<your-username>.github.io/mantra-classes-app/`.

---

## ⚡ Bonus Option: 1-Click Deploy via Vercel with GitHub

Once your repository is on GitHub:
1. Go to [https://vercel.com](https://vercel.com) and click **"Continue with GitHub"**.
2. Click **"Import"** next to `mantra-classes-app`.
3. Click **"Deploy"** (Vite settings are auto-detected).
4. Within 30 seconds, Vercel gives you a permanent, ultra-fast global link (e.g., `https://mantra-classes-app.vercel.app`) with automatic updates every time you push code!
