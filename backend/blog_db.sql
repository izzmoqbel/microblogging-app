CREATE TABLE
	IF NOT EXISTS blogs (
		id SERIAL PRIMARY KEY,
		title VARCHAR(255) NOT NULL,
		content TEXT NOT NULL,
		image_url VARCHAR(255),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);

CREATE TABLE
	IF NOT EXISTS admins (
		id SERIAL PRIMARY KEY,
		username VARCHAR(50) NOT NULL,
		password VARCHAR(255) NOT NULL
	);

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO
	admins (username, password)
VALUES
	('admin', crypt ('12345', gen_salt ('bf')));

INSERT INTO
	blogs (title, content)
VALUES
	(
		'Introduction to Micro Blogging',
		'Microblogging is a quick way to share thoughts with the world.'
	);

INSERT INTO
	blogs (title, content)
VALUES
	(
		'How to Start Micro Blogging',
		'Microblogging can be an excellent tool for building a personal brand or sharing quick updates with your audience.'
	);