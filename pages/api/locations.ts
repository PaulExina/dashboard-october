
import dbConnect from '../../lib/dbConnect';
import LocationModel from '../../models/location';

export default async function handler (req, res) {
  const { method } = req;

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const locations = await LocationModel.find({})
        res.status(200).json({  locations })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const location = await LocationModel.create(req.body)
        res.status(201).json({ location })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
