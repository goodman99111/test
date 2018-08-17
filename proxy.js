var proxy = require('redbird')({port: 80, xfwd: false});

proxy.register("test", "http://locahost:8080");
proxy.register("mydomain.me", "http://mydomain.me:3000");