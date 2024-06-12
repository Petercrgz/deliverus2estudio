import RestaurantController from '../controllers/RestaurantController.js'

const loadFileRoutes = function (app) {
  // TODO: Include routes for restaurant described in the lab session README
  app.route('/restaurants') //the endpoint path
  .get( //the http verb that we want to be available at the previous path
    RestaurantController.index) // the function that will attend requests for that http verb and that path
  .post( //we can chain more http verbs for the same endpoint
    RestaurantController.create) // the function that will attend requests for that http verb and that path
    app.route('/restaurants/:restaurantId') //the endpoint path
  .get(RestaurantController.show)
  .put( //the http verb that we want to be available at the previous path
      RestaurantController.update) // the function that will attend requests for that http verb and that path
  .delete( //we can chain more http verbs for the same endpoint
      RestaurantController.destroy) // the function that will attend requests for that http verb and that path
}
export default loadFileRoutes
