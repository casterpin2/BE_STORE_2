/* Replace with your SQL commands *//* Replace with your SQL commands */
CREATE EXTENSION "uuid-ossp";
CREATE TABLE masteruser(
    id uuid not null DEFAULT uuid_generate_v4(),
    username text not null,
    password VARCHAR(5000) not null,
    firstname text,
    lastname text,
    PRIMARY KEY (id)
)