const { User } = require('../../models')
const fs = require('fs/promises')
const path = require('path')
const { sendSucces, jimp } = require('../../helpers')

const updateAvatar = async (req, res, err) => {
  // -----------------------------Варіант 1-----------

  // const avatarDir = path.join(__dirname, '../../', 'public/avatars')
  // const { path: tempStorage, originalname } = req.file
  // const { _id } = req.user
  // // await jimp(tempStorage)

  // const [extention] = originalname.split('.').reverse()
  // const newFileName = `avatar_main-image_${_id}.${extention}`
  // const resultStorage = path.join(avatarDir, newFileName)
  // await fs.rename(tempStorage, resultStorage)
  // const avatarURL = path.join('public/avatars', newFileName)

  // const user = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true })
  // res.status(201).json({
  //   result: user,
  // })
  // ----------------------------------------Варіант 2---------
  const { filename, originalname, path: tmpPath } = req.file

  await jimp(tmpPath)

  const uniqueName = filename + originalname
  const uploadDir = path.join(__dirname, '../../', 'public')
  const filePath = path.join(uploadDir, '/avatars', uniqueName)

  try {
    await fs.rename(tmpPath, filePath)
  } catch (error) {
    await fs.unlink(tmpPath)
  }

  const avatarURL = path.join('/public/avatars', uniqueName)
  const { _id } = req.user
  await User.findByIdAndUpdate(
    _id,
    { avatarURL },
    {
      new: true,
    },
  )

  sendSucces(res, { avatarURL })
}

module.exports = updateAvatar
