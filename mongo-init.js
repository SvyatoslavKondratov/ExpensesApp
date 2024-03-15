let isInit = true
try {
  rs.status()
} catch (err) {
  rs.initiate({
    _id: 'rs0',
    members: [{ _id: 0, host: 'host.docker.internal:27017' }],
  })
}

if (isInit) {
  // Create a new database and switch to it
  db = db.getSiblingDB('testdb')

  // Create a user with read and write privileges for the database
  db.createUser({
    user: 'admin',
    pwd: 'pass',
    roles: [{ role: 'readWrite', db: 'testdb' }],
  })

  db.createCollection('User')

  // Create a new collection and insert documents
  db.User.insert([{ name: 'testUser', email: 'some@gmail.com' }])
  isInit = false
}
