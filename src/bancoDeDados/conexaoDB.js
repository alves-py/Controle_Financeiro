const { Pool } = require(`pg`);

const conexaoDoBanco = new Pool({
    user: `postgres`,
    host: `localhost`,
    database: `dindin`,
    //password: `bwk><1`,
    password: `postgres`,
    port: 5432,
});

module.exports = conexaoDoBanco