# recentPost-App

## Tech

1. React</br>
2. Semantic-UI-React</br>
3. React-router-dom</br>
4. Context API</br>
5. GraphQL</br>
6. Apollo</br>
7. jwt-Decode</br>
8. Node JS</br>
9. mongoose</br>
10. jsonwebtoken</br>
11. bcryptjs</br>

## npm start

1. install MongoDB
   https://docs.mongodb.com/manual/administration/install-community/

2. Run Backend

`$ npm start`

3. Run frontend

`$ cd client`</br>
`$ npm start`

## Skills

1. I built the backend by linking mongoDB and Apollo server. User model for user verification and Post model for post information were designed in the database, and types for resolver input and return values were defined and tokens for authentication in the context option were designed in the Apollo server.

2. Log in after determining if user information is stored in the database. When logging in, the userData received is placed in the context API, while storing only token in localStorage for security purposes. Since I have user information (id, username, email) in token Payload, I brought Payload when I was decoding token and used it as a means of authentication.

3. Only post generation, likes, and comment functions are available when you are logged in, and only your posts and comments can be deleted. Because the generation or deletion of posts is not immediately reflected in the query to receive the entire post on the home screen, the readQuery, writeQuery function has been used to read, modify, and reflect the entire post data of the Apollo cache.

## Video

https://www.youtube.com/watch?v=zlN6aER2Vn8

## Reference

opensource https://github.com/hidjou/classsed-graphql-mern-apollo/
