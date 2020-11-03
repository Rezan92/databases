/* 
1-How can you convert the table into 1NF ?
 In the first normal form each column should have atomic value but in the provided table 
 the columns "food_code" and "food_description" have multiple values, to solve that we have
 to create a row for each value.
*/

/*
2-What are the super, candidate, primary keys in the table created in step (1)?
Superkey is set of columns that uniquely identify each row.
In the provided table; 
only member_id or member_name or any unique column can be a superkey.
member_id + member_name can be a superkey.
member_id + other columns can be a superkey.
any set of columns + (member_id or member_name or member_address) can be a superkey

Candidate key is the manimum of columns from the superkey that required to uniquely identify each row.
member_id or member_name can be a candidate key.

Peimary key is a column that uniquely identify each row;
member_id can be a primary key.
*/

/*
3-How can you develop the set of 2NF tables? (Think of relationships between different tables).

To make that provided table comply with the second normal form, we have to split up the table into four tables.
-members table (member_id(PK), member_name, member_address, dinner_id(FK)).

-dinner table (dinner_id(PK), dinner_date, venue_code, venue_description).

-food_dinner table (dinner_id(FK), food_id(FK))

-food table (food_id(PK), food_code, food_description)

In the provided table the relationship between members and dinner table is one-to-many, 
one dinner can be attended by many members, foreign key will be in the members table to reference the dinner table.

The relationship between dinner and food table is many-to-many, so we have to create the bridge table food_dinner with two
foreign keys columns, each column reference one table.
*/

/*
4-How can you develop the set of 3NF tables?
In the 3NF attribute should not depend on non-key attribute and this done in the step 3.
*/
