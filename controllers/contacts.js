const { NotFound } = require('http-errors')

const { sendSucces } = require('../helpers')

const contactsOperations = require('../model/contacts')

const getAll = async (req, res) => {
  const result = await contactsOperations.getAll()
  sendSucces(res, { result })
}

const getById = async (req, res) => {
  const { id } = req.params
  const result = await contactsOperations.getById(id)
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found `)
  }
  sendSucces(res, { result })
}

const add = async (req, res) => {
  const result = await contactsOperations.add(req.body)
  sendSucces(res, { result }, 201)
}

const updateById = async (req, res) => {
  const { id } = req.params
  const result = await contactsOperations.updateById(id, req.body)
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`)
  }
  sendSucces(res, { result })
}

const removeById = async (req, res, next) => {
  const { id } = req.params
  const result = await contactsOperations.removeById(id)
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`)
  }
  sendSucces(res, { message: 'Success delete' })
}

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  removeById,
}
