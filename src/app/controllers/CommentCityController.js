import * as Yup from 'yup';
import City from '../models/City';

class CommentCityController {
  async index(req, res) {
    const comments = await City.findAll();

    return res.json(comments);
  }

  async store(req, res) {
    // const schema = Yup.object().shape({
    //   comment: Yup.string().required,
    // });

    // if (!(await schema.isValid(req.body))) {
    //   return res.status(400).json({ error: 'Was not possible to comment.' });
    // }

    const { id } = req.params;

    const cityIndex = City.findAll({where: {
      id
    }});

    if(cityIndex < 0) {
      return res.status(400).json({ error: 'City not found.' });
    }
    console.log(City[cityIndex].comment);

    const newComment = City[cityIndex].comment;
    newComment = req.body.comment;

    return res.status(200).json({
      id,
      newComment,
    });
  }
}

export default new CommentCityController();