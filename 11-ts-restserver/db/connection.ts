import { Sequelize } from "sequelize";

const db = new Sequelize("node", "root", "", {
    host: "localhost",
    dialect: "mariadb",
    //logging: false // Cada comando que se haga impacta en la consola
});

export default db;
