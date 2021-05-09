#!/bin/bash
./update-production.sh &&
pm2 update &&
pm2 start server.js &&
echo "SERVER STARTED SUCCESSFULLY"
