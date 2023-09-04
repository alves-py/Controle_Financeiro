const { Pool } = require(`pg`);

const conexãoDoBanco = new Pool({
    user: `postgres`,
    host: `localhost`,
    database: `dindin`,
    //password: `bwk><1`,
    password: `postgres`,
    port: 5432,
});

module.exports = conexãoDoBanco