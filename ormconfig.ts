import config from './backend/shared/configuration'
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
		'backend/model/**.ts'
	],

	migrations: [
		'backend/migration/*.ts',
	],
	cli: {
		migrationsDir: 'backend/migration',
	}
};