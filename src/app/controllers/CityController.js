import * as Yup from 'yup';
import City from '../models/City';

class CityController {
  async index(req, res) {
    const cities = await City.findAll();

    return res.json(cities);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string(),
      salary: Yup.number().positive().integer(),
      state: Yup.string().required(),
      score: Yup.number().required().positive().integer()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Was not possible to create a new city.' });
    }

    const cityExists = await City.findOne({ where: { name: req.body.name } });

    if (cityExists) {
      return res.status(400).json({ error: 'City already exists.' });
    }

    const { id, name, state, score } = await City.create(req.body);

    return res.json({
      id,
      name,
      state,
      score,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      state: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { name, state } = req.body;

    const city = await City.findByPk(req.cityId);

    if (name !== city.name) {
      const cityExists = await City.findOne({ where: { name } });

      if (cityExists) {
        return res.status(400).json({ error: 'City already exists.' });
      }
    }

    await city.update(req.body);

    return res.json({
      id,
      name,
      description,
      score,
    });
  }
}

export default new CityController();