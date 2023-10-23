CREATE TABLE users (
	id SERIAL,
	email VARCHAR(64) PRIMARY KEY NOT NULL,
	username VARCHAR(32) NOT NULL,
	password VARCHAR(32) NOT NULL,

	UNIQUE(email)
);
