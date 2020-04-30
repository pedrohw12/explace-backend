import * as Yup from 'yup';
import TuristicPoint from '../models/TuristicPoint';

class TuristicPointController {
  async index(req, res) {
    const turisticPoints = await TuristicPoint.findAll();

    return res.json(turisticPoints);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      city: Yup.string().required(),
      score: Yup.number().required().positive().integer(),
      comment: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Was not possible to create a new Turistic Point.' });
    }

    const turisticPointExists = await TuristicPoint.findOne({ where: { name: req.body.name } });

    if (turisticPointExists) {
      return res.status(400).json({ error: 'Turistic point already exists.' });
    }

    const { id, name, city, score } = await TuristicPoint.create(req.body);
    console.log(req.body)
    return res.json({
      id,
      name,
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