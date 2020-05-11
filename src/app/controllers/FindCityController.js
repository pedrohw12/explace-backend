import * as Yup from 'yup';
import City from '../models/City';

class FindCityController {
  async index(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Please inform a name.' });
    }

    const cityExists = await City.findOne({ where: { name: req.body.name } });

    if (!cityExists) {
      return res.status(400).json({ message: 'City not found' });
    }

    return res.json(cityExists);
  }
}

export default new FindCityController();