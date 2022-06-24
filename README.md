• For run this project:
1. clone the repo
2. install "nodejs" (last LTS version would be great)


• Running on production:
1. run this command in the project root folder: "npm run build"
- after running this command, all build files would be on /build folder, these files should serve with a webserver (if user request a file that not exist, the index.html file would send to user)
- also, a node server could be run with "pm2 start server.js" on the selected port, you can change the port on .env file: "REACT_APP_PORT", this server is just for bots (have some ssr in it).
- on any pull or any update, the "npm run build" would call to update and recreate /build

• Running on development:
1. run "npm i"
2. run "npm start"
   the project would start on http://localhost:3000