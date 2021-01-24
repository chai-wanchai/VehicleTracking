import config from './src/shared/configuration'
import * as dotenv from 'dotenv'
const ENV = process.env.NODE_ENV || 'development';
dotenv.config({ path: `config/env/.${ENV}.env` })
const database = config().database
export = {
	host: database.host,
	type: database.type,
	port: database.port,
	username: database.username,
	password: database.password,
	database: database.database_name,
	entities: [
		'src/model/**.ts'
	],

	migrations: [
		'src/migration/*.ts',
	],
	cli: {
		migrationsDir: 'src/migration',
	}
};