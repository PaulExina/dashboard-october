
import dbConnect from '../../lib/dbConnect';
import UserModel from '../../models/user';

export default async function handler (req, res) {
  const { method } = req;

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const users = await UserModel.find({})
        res.status(200).json({  users })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const user = await UserModel.create(req.body)
        res.status(201).json({ user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
