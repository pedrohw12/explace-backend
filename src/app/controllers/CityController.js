import * as Yup from "yup";
import City from "../models/City";
import File from "../models/File";

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
      score: Yup.number().required().positive().integer(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: "Was not possible to create a new city." });
    }

    const cityExists = await City.findOne({ where: { name: req.body.name } });

    if (cityExists) {
      return res.status(400).json({ error: "City already exists." });
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
    const { originalname: name, path } = req.file; // [ OK ]

    const city_id = req.params.city_id; // [ OK ]

    const city = await City.findByPk(city_id); // [ OK ]

    console.log("CITY", city.name);

    // salva o nome da imagem no banco de dados
    const newFile = await File.create({
      name,
      path,
    }); // [ OK ] add na tabela de files

    console.log('NEW FILE ID', newFile.id);

    const { city_name } = req.body;
    const file_id = newFile.id;

    // atualiza a tabela de cidades com o novo nome e o id da imagem.

    await city.update({ city_name, file_id });

    console.log('APÓS O UPDATE DA CITY _ NEWFILE ID ', file_id);

    const { id, file } = await City.findByPk(req.params.city_id, {
      include: [
        {
          model: File,
          as: "file",
          attributes: ["id", "path", "url"],
        },
      ],
    });

    return res.json({
      id,
      city_name,
      description,
      score,
      file,
    });
  }
}

export default new CityController();
