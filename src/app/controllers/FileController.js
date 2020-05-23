import File from '../models/File';
import City from '../models/City';
import { isNull } from 'util';

class FileController {
  async index(req, res) {
    const { city_id } = req.params;

    const file = await File.findOne({ where: { city_id } });

    if (isNull(file)) {
      return res.json({ error: 'This city does not have a photo' });
    }

    return res.json(file);
  }

  async store(req, res) {
    const { city_id } = req.params;
    const { originalname: name, filename: path } = req.file;

    const cityIndex = await City.findByPk(city_id);

    if(!cityIndex) {
      return res.status(400).json({ error: 'City not found.' });
    }

    const fileExists = await File.findOne({ where: { city_id } });

    if (fileExists) {
      return res.json({ message: 'This city already has a photo' });
    }

    const file = await File.create({
      name,
      path,
      city_id,
    });

    return res.json(file);
  }
}

export default new FileController();