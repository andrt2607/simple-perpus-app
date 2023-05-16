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
    // Route.resource('buku', 'BooksController').apiOnly().middleware({ '*' : 'verify'})
    Route.get('/buku', 'BooksController.index').middleware('verify,access')
    Route.get('/buku/:id', 'BooksController.show').middleware('verify,access')
    Route.post('/buku', 'BooksController.store').middleware('verify,access')
    Route.put('/buku/:id', 'BooksController.update').middleware('verify,access')
    Route.delete('/buku/:id', 'BooksController.destroy').middleware('verify')
    // Route.resource('kategori', 'CategoriesController').apiOnly()
    // .middleware({ 'create' : 'verify', 'index' : 'verify', 'update' : 'verify'})
    Route.get('/kategori', 'CategoriesController.index').middleware('verify,access')
    Route.get('/kategori/:id', 'CategoriesController.show').middleware('verify,access')
    Route.post('/kategori', 'CategoriesController.store').middleware('verify,access')
    Route.put('/kategori/:id', 'CategoriesController.update').middleware('verify,access')
    Route.delete('/kategori/:id', 'CategoriesController.destroy').middleware('verify')
    Route.get('/peminjaman/:id', 'BorrowsController.getById').middleware('verify')
    Route.get('/peminjaman', 'BorrowsController.get').middleware('verify')
    Route.post('/buku/:id/peminjaman/', 'BorrowsController.createBorrow').middleware('verify')
    Route.post('/register', 'UsersController.register')
    Route.post('/login', 'UsersController.login')
    Route.post('/logout', 'UsersController.logout').middleware('verify')
    Route.get('/me', 'UsersController.me').middleware('auth')
    Route.post('/profile', 'UsersController.updateProfile').middleware('auth')
    Route.post('/otp-verif', 'UsersController.otpConfirmation')
  }).prefix('/v1')
}).prefix('/api')

