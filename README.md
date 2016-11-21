# mysql_access

cp config.js.init to config.js and change the credentials

How to debug:

1. npm install -g node-inspector
   this installs the debugger package
2. node-inspector &
   this opens http://127.0.0.1:8080/?port=5858
3. node --debug-ark ./app.js
   this start the app in debug mode
