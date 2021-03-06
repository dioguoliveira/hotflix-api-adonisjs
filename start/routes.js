'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.post('/users', 'UserController.create')
Route.post('/login', 'AuthController.login')

Route.group(() => {
  Route.resource('genres', 'GenreController').apiOnly()
  .validator(new Map([
    [['genres.store'], ['GenreRequest']]
  ]))
  Route.resource('movies', 'MovieController').apiOnly()
  .validator(new Map([
    [['movies.store'], ['MovieRequest']],
    [['movies.update'], ['MovieRequest']]
  ]))
}).prefix('api/v1').middleware(['auth'])
