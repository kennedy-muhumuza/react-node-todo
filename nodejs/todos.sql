CREATE DATABASE mytodos;

CREATE TABLE todos_table(
 todo_id SERIAL PRIMARY KEY,
 todo VARCHAR(300) NOT NULL,
 todo_date VARCHAR(35) NOT NULL,
 is_todo_marked_complete BOOLEAN DEFAULT 'false'
);

-- CREATE DATABASE todo;

-- CREATE TABLE todos_table (
--   todo_id SERIAL PRIMARY KEY,
--   todo VARCHAR(300) NOT NULL,
--   todo_date VARCHAR(40) NOT NULL,
--   is_marked_complete BOOLEAN DEFAULT 'false'
-- );


-- -- ALTER TABLE todos ADD COLUMN todo_date VARCHAR(40);
-- -- ALTER TABLE todos ADD COLUMN is_marked_complete BOOLEAN DEFAULT 'false';