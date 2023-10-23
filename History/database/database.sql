CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  action VARCHAR(32),
  old_value VARCHAR(32),
  new_value VARCHAR(32),
  time_stamp TIMESTAMP
);