# Kachingu - Income & Expense Tracking App
## Description
This is a web app for:
- logging income and expenses
- calculate savings based on income/expenses
- searching income/expenses

### Team
- Ming Ho - [@super-ming](https://github.com/super-ming)
- Philosocode - [@Philosocode](https://github.com/Philosocode)
- Roo - [@rdollent](https://github.com/rdollent)
- VictorCam - [@VictorCam](https://github.com/VictorCam)

### Tech Stack
**Front End**
- React (create-react-app)
- React Router
- Redux

**Back End**
- NodeJS
- Express
- PostgreSQL

## Getting Started
### Pre-Requisites
- NodeJS + `npm`
- PostgreSQL

### Install Node
- You'll need to have `node` (and `npm`) installed.
[Download it here](https://nodejs.org/en/)

### Download Postgres
Instructions obtained from this post: https://www.byteconf.com/blog/building-a-full-stack-application-with-react-and-node

**Windows**<br>
Download from here: https://www.postgresql.org/download/windows/

**Mac**<br>
1. Install Homebrew: https://brew.sh
2. Then, run `brew install postgresql` in your terminal
3. After installing Postgres with Brew, run `brew services start postgresql` in your terminal

### Create The Database
In your terminal, make sure you're in the **root directory of the project.** Run: `createdb <dbname>`. **Do not include the angle brackets < >!**

### Add A Migration
In your terminal, run: `psql -d <dbname> -f api/db/migrations/migration-1554797849605.sql`. 
This will setup the table with the data in the `api/migrations/migration-*.sql` file.

### Set Database Values
In the `api/config` folder, create a file called `keys_dev.js`. Replace `<dbname>` with the name of the database you created in Postgres.

If you created a database user (refer to the guide posted above), you can also replace `postgres` and `''` with your database's user + password.

```javascript
module.exports = {
  databaseName: '<dbname>',     // dbname == the name of the database you created
  user: 'postgres',             // or your database user
  password: '',                 // or your database user's password
  secret: "<secret>"            // secret for JWT strategy
};
```

### Install Dependencies
1. Run `npm install` in the root directory
2. cd into `api` directory and run `npm install`
3. cd into `client` directory and run `npm install`
4. In the `api/config` folder, make sure you added the `keys_dev.js` file (refer to step above).
5. In the root directory, run `npm run dev` to launch the client and the server.


## Start The App
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


## Acknowledgements
- Icons: [Font Awesome](https://fontawesome.com)
