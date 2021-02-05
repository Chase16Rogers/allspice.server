import { recipeService } from '../services/RecipeService'
import BaseController from '../utils/BaseController'

export class RecipesController extends BaseController {
  constructor() {
    super('api/recipes')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .post('', this.create)
      .post('/:id/ingredients', this.addIngredient)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
      .delete('/:recipeId/ingredients/:id', this.deleteIngredient)
  }

  async getAll(req, res, next) {
    try {
      const data = await recipeService.find(req.query)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const data = await recipeService.findOne({ _id: req.params.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const data = await recipeService.create(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async addIngredient(req, res, next) {
    try {
      req.body.recipeId = req.params.id
      const data = await recipeService.addIngredient(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      delete req.body.ingredients
      const data = await recipeService.update(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const query = { _id: req.params.id, creatorId: req.userInfo.id }
      await recipeService.delete(query)
      res.send({ message: 'Successfully Deleted' })
    } catch (error) {
      next(error)
    }
  }

  async deleteIngredient(req, res, next) {
    try {
      const query = { recipeId: req.params.recipeId, creatorId: req.userInfo.id, ingredientId: req.params.id }
      await recipeService.removeIngredient(query)
      res.send({ message: 'Successfully Deleted' })
    } catch (error) {
      next(error)
    }
  }
}
