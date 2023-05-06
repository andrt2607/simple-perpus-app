/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.group(() => {
    Route.resource('buku', 'BooksController').apiOnly()
    Route.resource('kategori', 'CategoriesController').apiOnly()
    Route.get('peminjaman', 'BorrowsController.get')
    Route.get('peminjaman/:id', 'BorrowsController.getById')
    Route.post('buku/:id/peminjaman/', 'BorrowsController.createBorrow')
    Route.post('register', 'UsersController.register')
    Route.post('login', 'UsersController.login')
    Route.post('logout', 'UsersController.logout')
    Route.get('/me', 'UsersController.me').middleware('auth')
    Route.post('/profile', 'UsersController.updateProfile').middleware('auth')
  }).prefix('/v1')
}).prefix('/api')

