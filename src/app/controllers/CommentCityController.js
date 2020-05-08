import * as Yup from 'yup';
import CityComment from '../models/CityComment';
import City from '../models/City';

class CommentCityController {
  async store(req, res) {
    // const schema = Yup.object().shape({
    //   comment: Yup.string().required,
    // });

    // if (!(await schema.isValid(req.body))) {
    //   return res.status(400).json({ error: 'Was not possible to comment.' });
    // }

    const { city_id } = req.params;
    console.log(city_id)

    const cityIndex = await City.findByPk(city_id);
    console.log('CONSOLE LOG CITY INDEX',cityIndex);

    if(!cityIndex) {
      return res.status(400).json({ error: 'City not found.' });
    }

    const { comment } = req.body;

    const newComment = await CityComment.create({
      comment,
      city_id,
      author_id: req.userId,
    });
    return res.status(200).json(newComment);
}}

export default new CommentCityController();