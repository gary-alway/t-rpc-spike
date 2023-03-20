import { dynamoClient } from './clients/dynamoClient'
import { DYNAMO_DB_TABLE_NAME } from './constants'

export const getCurrentMigrations = () =>
  dynamoClient.scan(DYNAMO_DB_TABLE_NAME).then(r => r.Items || [])
