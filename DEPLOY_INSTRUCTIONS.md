# Deployment Guide for Custom Server (VPS)

## 1. Local Computer: Build the App
Before uploading to the server, create the production files.
Run this command in your project folder:

```bash
npm run build
```

This will create a `dist` folder. These are the only files you need to upload.

## 2. Server Setup (Ubuntu)
Login to your VPS via SSH and run these commands:

```bash
# Update software
sudo apt update
sudo apt install nginx -y

# Create directory for website
sudo mkdir -p /var/www/taungoo-directory/dist
```

## 3. Upload Files
Use an SFTP client (like FileZilla) or the `scp` command to upload the contents of your local `dist` folder to the server's `/var/www/taungoo-directory/dist` folder.

## 4. Configure Nginx
1. Copy the content of `nginx.conf` from this project.
2. On the server, create the config file:
   ```bash
   sudo nano /etc/nginx/sites-available/taungoo
   ```
3. Paste the config content.
4. Enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/taungoo /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## 5. Connect Domain (DNS)
Go to your Domain Registrar (Namecheap/GoDaddy):
1. Create an **A Record**.
2. Host: `@`
3. Value: `YOUR_SERVER_IP_ADDRESS` (e.g., 128.199.xx.xx)

Your website should now be live at your domain!
