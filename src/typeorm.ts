import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",   //process.env.DB_HOST,
  port:3306,                //Number(process.env.DB_PORT),
  username:"root",                                           //process.env.DB_USERNAME,
  database:  "e_commerce",            //process.env.DB_DATABASE,
  password: "root",     //process.env.DB_PASSWORD,
  entities: [__dirname + "/entity/entities/*"],
  synchronize: false,
});