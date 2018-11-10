#!/bin/bash
echo "This script will create environment for your brand new game!"
echo "Specify some info for me, please:"
echo "Game name: "
read name
host="localhost.$name"
echo "development host is $host"
hostSymLink="/etc/nginx/sites-available/$host"
echo "Copying scr files..."
cp -r ./game-template $name
chown $USERNAME:$USERNAM $name
echo "Done!"
docRoot=$(readlink -f "$name/public")
echo "Doc root will be $docRoot"
echo "Configouring nginx and hosts..."
echo 'server {' > $hostSymLink
echo '       listen 80;' >> $hostSymLink
echo '       listen [::]:80;' >> $hostSymLink
echo "       root $docRoot;" >> $hostSymLink
echo '       index index.html index.htm index.nginx-debian.html;' >> $hostSymLink
echo "       server_name $host www.$host;" >> $hostSymLink
echo "       location / {" >> $hostSymLink
echo '               try_files $uri $uri/ =404;' >> $hostSymLink
echo "       }" >> $hostSymLink
echo "}" >> $hostSymLink
ln -s $hostSymLink /etc/nginx/sites-enabled/
echo "127.0.0.1 $host" >> /etc/hosts
systemctl restart nginx

echo "Done! All routines is ok. Enjoy."

