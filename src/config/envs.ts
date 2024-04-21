import 'dotenv/config';
import * as joi from 'joi';

//para ver como seran las variables de entorno
interface EnvVars {
  PORT: number;
  DATABASE_URL: string;

  NATS_SERVERS: string[];
}

//defino el esquema de las variables de entorno para validarlas
const envsSchema = joi
  .object({
    PORT: joi.number().required(), //valida que sea un numero
    DATABASE_URL: joi.string().required(), //valida que sea un string
    NATS_SERVERS: joi.array().items(joi.string()).required(), //valida que sea un array de strings Y que sea requerido
  })
  .unknown(true); //acepta otras variables que no esten definidas

//saco el error y el valor de las variables de entorno
const { error, value } = envsSchema.validate({
  ...process.env,
  //esto es para que separe los servidores de nats por comas
  NATS_SERVERS: process.env.NATS_SERVERS.split(','),
});

//si hay un error, lanzo un error
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

//asigno las variables de entorno a una constante
const envVars: EnvVars = value;

//exporto las variables de entorno
export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,

  natsServers: envVars.NATS_SERVERS,
};
