1. Export your current Ubuntu distro to a tar on D:

  wsl --export Ubuntu D:\wsl\ubuntu-backup.tar

  2. Unregister the existing Ubuntu distro (this removes the old WSL instance):

  wsl --unregister Ubuntu

  3. Import Ubuntu to a new location on D:

  wsl --import Ubuntu D:\wsl\Ubuntu D:\wsl\ubuntu-backup.tar

  4. Start Ubuntu (will log you in as root initially):

  wsl -d Ubuntu

  5. Set your default user back to your normal user (replace johnb if needed):

  ubuntu config --default-user johnb

  Optional: add a small /etc/wsl.conf to enforce that user:

  sudo tee /etc/wsl.conf <<'EOF'
  [user]
  default=johnb
  EOF

  6. Shut down WSL and restart:

  wsl --shutdown
  wsl -d Ubuntu

  After this, your Linux home is stored under D:\wsl\Ubuntu (still Linux/ext4), which avoids the /mnt/d symlink issues. Then move your repo
  into Linux home (e.g., /home/johnb/dev/microfrontends-setup) and we can resume pnpm install.

  If you want, I can also help move the repo and re-run the install once you’ve moved the distro.