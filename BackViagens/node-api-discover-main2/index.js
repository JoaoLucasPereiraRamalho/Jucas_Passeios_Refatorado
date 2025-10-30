const express = require('express');
const cors = require('cors');

const app = express();

app.listen(5000, () => console.log('Rodando na porta 5000'));

app.use(cors());
app.use(express.json());

let viagens = [
  {
    id: 1,
    title: "Mexico",
    description: "Viagem massa demais",
    price: "R$ 3670",
    vehicle: "teste",
    image: "https://media.licdn.com/dms/image/D4D03AQFOgBEbdVanWA/profile-displayphoto-shrink_800_800/0/1674862682516?e=2147483647&v=beta&t=oGaCZ5cI0df9IHne6mcEfolytnqPkBJEKbKcUcjEhXw"
  }
];

app.route('/api').get((req, res) => res.json({
  viagens
}));

app.route('/api/:id').get((req, res) => {
  const viagemId = req.params.id;

  const viagem = viagens.find(viagem => Number(viagem.id) === Number(viagemId));

  if (!viagem) {
    return res.json('Viagem not found!');
  }

  res.json(viagem);
});

app.route('/api').post((req, res) => {
  const lastId = viagens[viagens.length - 1].id;
  viagens.push({
    id: lastId + 1,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    vehicle: req.body.vehicle,
    image: req.body.image
  });
  res.json('Saved viagem');
});

app.route('/api/:id').put((req, res) => {
  const viagemId = req.params.id;

  const viagem = viagens.find(viagem => Number(viagem.id) === Number(viagemId));

  if (!viagem) {
    return res.json('Viagem not found!');
  }

  const updatedViagem = {
    ...viagem,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    vehicle: req.body.vehicle,
    image: req.body.image,
  };

  viagens = viagens.map(viagem => {
    if (Number(viagem.id) === Number(viagemId)) {
      viagem = updatedViagem;
    }
    return viagem;
  });

  res.json("Updated viagem");
});

app.route('/api/:id').delete((req, res) => {
  const viagemId = req.params.id;

  viagens = viagens.filter(viagem => Number(viagem.id) !== Number(viagemId));

  res.json('Deleted Viagem');
});
