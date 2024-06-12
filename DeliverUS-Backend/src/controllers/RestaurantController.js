import { Restaurant, Product, RestaurantCategory, ProductCategory } from '../models/models.js'

const index = async function (req, res) {
  try {
    const restaurants = await Restaurant.findAll(
      {
        attributes: { exclude: ['userId'] },
        include:
      {
        model: RestaurantCategory,
        as: 'restaurantCategory'
      },
        order: [[{ model: RestaurantCategory, as: 'restaurantCategory' }, 'name', 'ASC']]
      }
    )
    res.json(restaurants)
  } catch (err) {
    res.status(500).send(err)
  }
}

// TODO: Complete the following functions

const create = async function (req, res) {
  try {
    const newRestaurant = Restaurant.build(req.body)
    // newRestaurant.userId = req.user.id // authenticated user
    newRestaurant.userId = 1
    const restaurant = await newRestaurant.save()
    res.json(restaurant)
  } catch (err) {
      res.status(500).send(err)
  }
}

const show = async function (req, res) {
  try {
    const restaurants = await Restaurant.findByPk(req.params.restaurantId,
      {
        attributes: { exclude: ['userId'] },
        include: [{
          model: Product,
          as: 'products',
          include: {model: ProductCategory, as:'productCategory' }
        },
      {
        model: RestaurantCategory,
        as: 'restaurantCategory'
      }],
        order: [[{ model: RestaurantCategory, as: 'restaurantCategory' }, 'name', 'ASC']]
      }
    )
    res.json(restaurants)
  } catch (err) {
    res.status(500).send(err)
  } 
}


const update = async function (req, res) {
  try{
    await Restaurant.update(req.body, {where: {id: req.params.restaurantId}})
    const upRestaurant = await Restaurant.findByPk(req.params.restaurantId)
    res.json(upRestaurant) 
  }catch (err) {
  res.status(500).send(err)
  }
}

const destroy = async function (req, res) {
  try{
    const deleted = await Restaurant.destroy({where :{id : req.params.restaurantId}})
    if(deleted ===1){
      res.json('exit')
    } else {res.json('fail')}
  }catch (err) {
    res.status(500).send(err)
  }
}

const RestaurantController = {
  index,
  create,
  show,
  update,
  destroy
}
export default RestaurantController
