require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'explace',
  database: 'explace',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

// docker run --name explace -e POSTGRES_PASSWORD=explace -p 5432:5432 -d postgres:11