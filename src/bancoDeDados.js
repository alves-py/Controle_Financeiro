const { Pool } = require(`pg`);

const conexãoDoBanco = new Pool({
    user: `postgres`,
    host: `localhost`,
    database: `dindin`,
    password: `bwk><123`,
    port: 5432,
});

module.exports = conexãoDoBanco