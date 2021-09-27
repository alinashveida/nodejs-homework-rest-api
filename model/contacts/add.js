const { v4 } = require('uuid')

const updateContacts = require('./updateContacts')
const getAll = require('./getAll')

const add = async (data) => {
  const contacts = await getAll()
  const newContact = { ...data, id: v4() }
  contacts.push(newContact)
  // const newContacts = [...contacts, newContact]
  await updateContacts(contacts)
  // await updateContacts(newContacts)
  return newContact
}

module.exports = add
