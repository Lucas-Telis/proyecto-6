### Informacion y intrucciones

http://localhost:4001

Authors

- GET /authors - trae todos los autores.
- GET /authors/:id - trae un autor por id (con `books` poblado).
- POST /authors - crear autor.
- PUT /authors/:id - actualizar campos de autor.
- DELETE /authors/:id - elimina autor.
- PUT /authors/:authorId/books - togglear libro en el array `books` del autor. Body: { "bookId": "<id>" }.

Books

- GET /books - todos los libros.
- GET /books/:id - libro por id (con `author` poblado).
- POST /books - crear libro.
- PUT /books/:id - actualizar campos del libro.
- DELETE /books/:id - borrar libro.
- PUT /books/:id/author - cambiar o eliminar el autor del libro. Body: { "authorId": "<id>" } o { "authorId": null }.

Servidor corre en puerto 4001 y usa mongodb://localhost:27017/proyecto-6 por defecto.
