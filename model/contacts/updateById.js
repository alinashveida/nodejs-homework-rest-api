const updateContacts = require('./updateContacts')
const getAll = require('./getAll')

const updateById = async (id, data) => {
  const contacts = await getAll()
  const idx = contacts.findIndex((item) => item.id === id)
  if (idx === -1) {
    return null
  }
  const updateContact = { ...contacts[idx], ...data }
  contacts[idx] = updateContact
  await updateContacts(contacts)
  return updateContact
}

module.exports = updateById
