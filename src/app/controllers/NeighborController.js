import * as Yup from 'yup';
import Neighbor from '../models/Neighbor';

class TuristicPointController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      city: Yup.string().required(),
      score: Yup.number().required().positive().integer(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Was not possible to create a new neighbor.' });
    }

    const neighborExists = await Neighbor.findOne({ where: { name: req.body.name } });

    if (neighborExists) {
      return res.status(400).json({ error: 'Neighbor point already exists.' });
    }

    const { id, name, description, city, score } = await Neighbor.create(req.body);
    console.log(req.body)
    return res.json({
      id,
      name,
      description,
      city,
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

    const turisticPoint = await TuristicPoint.findByPk(req.cityId);

    if (name !== turisticPoint.name) {
      const TuristicPointExists = await TuristicPoint.findOne({ where: { name } });

      if (TuristicPointExists) {
        return res.status(400).json({ error: 'City already exists.' });
      }
    }

    await TuristicPoint.update(req.body);

    return res.json({
      id,
      name,
      description,
      score,
      comment,
    });
  }
}

export default new TuristicPointController();