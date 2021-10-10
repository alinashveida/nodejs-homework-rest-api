const { NotFound } = require('http-errors')

const { sendSucces } = require('../helpers')

// const contactsOperations = require('../model/contacts')
const { Contact } = require('../models')

const getAll = async (req, res) => {
  const { page = 1, limit = 20 } = req.query
  const skip = (page - 1) * limit
  const result = await Contact.find({}, '_id name email phone', {
    skip,
    limit: +limit,
  })
  sendSucces(res, { result })
}

const getById = async (req, res) => {
  const { id } = req.params
  const result = await Contact.findById(id)
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found `)
  }
  sendSucces(res, { result })
}

const add = async (req, res) => {
  const result = await Contact.create(req.body)
  sendSucces(res, { result }, 201)
}

const updateById = async (req, res) => {
  const { id } = req.params
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`)
  }
  sendSucces(res, { result })
}

const removeById = async (req, res, next) => {
  const { id } = req.params
  const result = await Contact.findByIdAndDelete(id)
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`)
  }
  sendSucces(res, { message: 'Success delete' })
}

const updateStatusContact = async (req, res) => {
  const { id } = req.params
  const { favorite } = req.body
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true },
  )
  if (!result) {
    throw new NotFound('missing field favorite')
  }
  sendSucces(res, { result })
}

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  removeById,
  updateStatusContact,
}
