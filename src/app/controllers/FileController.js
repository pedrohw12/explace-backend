import File from '../models/File';
import City from '../models/City';

class FileController {
  async store(req, res) {
    const { city_id } = req.params;
    const { originalname: name, filename: path } = req.file;

    const cityIndex = await City.findByPk(city_id);

    if(!cityIndex) {
      return res.status(400).json({ error: 'City not found.' });
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