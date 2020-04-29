// import * as Yup from 'yup';
// import Jogo from '../models/User';

// class UserController {
//   async store(req, res) {
//     const schema = Yup.object().shape({
//       number: Yup.number().required(),
//     });

//     if (!(await schema.isValid(req.body))) {
//       return res.status(400).json({ error: 'Validation failed' });
//     }

//     const jogoExists = await Jogo.findOne({ where: { number: req.body.number } });

//     if (jogoExists) {
//       return res.status(400).json({ error: 'This game already exists.' });
//     }

//     console.log(jogoExists);

//     const { number } = await Jogo.create(req.body);

//     return res.json({
//       number,
//     });
//   }

//     async index(req, res) {
//     const jogos = await Jogo.findAll();

//     return res.send(jogos);
//   }
// };

// export default new UserController();