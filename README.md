
# API Movies

This is a practice API that retrieve a list of movies with get method from Mysql Database.

Uses the following technologies:

- Javascript
- NodeJS
- Express
- Morgan
- Mysql2
- Sequelize


## The list has the next Json format:

{

	total: int,
	total_pages: int,
	next_link: string,
	previous_link: string,
	page: int,
	per_page: int,
	results: Array[]
}

## Receives the following filters, all optional
1. popularity: double
2. release_date: dateTime
3. adult: boolean
4. original_title: string
5. page: int
6. size: int

## The url is:
**/api/populars**

## Author
Jesus Adrian Herrera Corrales
