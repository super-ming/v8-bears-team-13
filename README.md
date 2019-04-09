# Bears 13 (V8)
**Do not push to master**. Push commits to `dev` and create feature branches as needed.


## Installation
1. Run `npm install` in the root directory
2. cd into `api` directory and run `npm install`
3. cd into `client` directory and run `npm install`
4. In the `api/config` folder, you should see two files: `keys.js` and `keys_prod.js`. In `api/config`, add a new file called `keys_dev.js` and put this inside:

```javascript
module.exports = {
  databaseName: '<dbname>',
  user: '<dbuser>' || 'postgres',
  password: '<dbpassword>' || ''
};
```
5. In the root directory, run `npm run dev` to launch the client and the server.


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
In your terminal, run: `psql -d <dbname> -f api/db/migrations/migration-1554797849605.sql`. 
This will setup the table with the data in the `api/migrations/migration-*.sql` file.

### Populate Data With A Seed
In your terminal, run: `psql -d <dbname> -f api/db/seeds/users.sql`. This will insert a user into the database.

### Set Database Values
In the `api/config` folder, you should've created a file called `keys_dev.js`. Now, replace `<dbname>` with the name of the database you created in Postgres.

If you created a database user, you can also replace `<dbuser>` and `<dbpassword>`.

```javascript
module.exports = {
  databaseName: '<dbname>',       // dbname == the name of the database you created
  user: '<dbuser>' || 'postgres', // don't have to change
  password: '<dbpassword>' || ''  // don't have to change
};
```


## Starting The App
Make sure you're in the root directory.

To start both the server and the client, run:
```
npm run dev
```

To start just the API server, run:
```
npm run start:api
```

To start just the React client, run:
```
npm run start:client
```