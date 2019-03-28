# Bears 13 (V8)
**Do not push to master**. Make commits to `dev` and create feature branches as needed.

## Installation
In the root directory, run:
```
1. npm install
2. npm run client-install
```
## Database Setup
Instructions obtained from this post: https://www.byteconf.com/blog/building-a-full-stack-application-with-react-and-node

### Download & Install
**Windows**  
Download from here: https://www.postgresql.org/download/windows/

**Mac**  
1. Install Homebrew: https://brew.sh
2. Then, run `brew install postgresql` in your terminal
3. After installing Postgres with Brew, run `brew services start postgresql` in your terminal

### Create The Database
In your terminal, make sure you're in the root directory of the project. Run: `createdb <dbname>`. **Do not include the angle brackets < >!**

### Add A Migration
In your terminal, run: `psql -d <dbname> -f db/migrations/migration-1553750532676.sql`. 
This will setup the table with the data in the `migrations/migration-*.sql` file.

### Populate Data With A Seed
In your terminal, run: `psql -d <dbname> -f db/seeds/users.sql`. This will insert a user into the database.

### Set Database Name
In the `config` folder, create a new file called `keys_dev.js` (you should also see two files there: `keys_prod.js` and `keys.js`).

Put this inside `keys_dev.js`:
```javascript
module.exports = {
  databaseName: '<dbname>' 
};
```


## Starting The App
Make sure you're in the root directory.

To start both the server and the client, run:
```
npm run dev
```

To start just the server, run:
```
npm run server
```

To start just the client, run:
```
npm run client
```