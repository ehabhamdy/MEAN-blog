db.createUser({
  user: "system",
  pwd: "mongo",
  roles: [
    {
      role: "readWrite",
      db: "mongo",
    },
  ],
});
