import * as Yup from 'yup';
import Trade from '../models/Trade';

class TradeController {
  async index(req, res) {
    const trades = await Trade.findAll();

    return res.json(trades);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      daypromo: Yup.string().required(),
      city: Yup.string().required(),
      neighbor: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Was not possible to create a new trade.' });
    }

    const tradeExists = await Trade.findOne({ where: { name: req.body.name } });

    if (tradeExists) {
      return res.status(400).json({ error: 'Trade point already exists.' });
    }

    const { id, name, description, city, daypromo, neighbor } = await Trade.create(req.body);
    console.log(req.body)
    return res.json({
      id,
      name,
      description,
      city,
      daypromo,
      neighbor,
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

export default new TradeController();