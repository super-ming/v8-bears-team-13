CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS transactions (
  id BOOLEAN PRIMARY KEY,
  transact_desc TEXT
);

INSERT INTO transactions VALUES
    ('0', 'Income'),
    ('1', 'Expense');

CREATE TABLE IF NOT EXISTS categories (
  id BIGSERIAL PRIMARY KEY,
  transact_id BOOLEAN, 
  FOREIGN KEY ("transact_id") REFERENCES "public"."transactions"("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
  category_desc TEXT
);

INSERT INTO categories (transact_id, category_desc) VALUES
    ('0', 'Salary'),
    ('1', 'Groceries'),
    ('1', 'Transportation'),
    ('1', 'Utilities');

CREATE TABLE IF NOT EXISTS balances (
  user_id BIGSERIAL, 
  FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
  balance INT
);

CREATE TABLE IF NOT EXISTS entries (
  id SERIAL PRIMARY KEY,
  user_id BIGSERIAL, 
  transact_id BOOLEAN,
  category_id BIGSERIAL,
  FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
  FOREIGN KEY ("transact_id") REFERENCES "public"."transactions"("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
  FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
  entry_desc TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  full_date DATE,
  created_at TIMESTAMP without time zone DEFAULT now(),
  recurring BOOLEAN
);

CREATE INDEX idx_entries ON entries(user_id);