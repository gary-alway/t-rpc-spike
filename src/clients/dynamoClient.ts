import {
  AttributeValue,
  DeleteItemInput,
  DeleteItemOutput,
  DynamoDB,
  GetItemInput,
  GetItemOutput,
  PutItemInput,
  QueryInput,
  QueryOutput,
  UpdateItemInput,
  UpdateItemOutput
} from '@aws-sdk/client-dynamodb'

type Item = Record<string, AttributeValue>

const createDynamoClient = (client: DynamoDB) => {
  const scan = async (TableName: string) => client.scan({ TableName })

  const updateItem = async (
    params: UpdateItemInput
  ): Promise<UpdateItemOutput> => client.updateItem(params)

  const putItem = async <T extends Item>(
    item: T,
    table: string,
    params?: Partial<PutItemInput>
  ) =>
    client.putItem({
      TableName: table,
      Item: item,
      ...params
    })

  const getItem = async (params: GetItemInput): Promise<GetItemOutput> =>
    new Promise<GetItemOutput>((resolve, reject) => {
      client.getItem(params, (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })

  const deleteItem = async (
    params: DeleteItemInput
  ): Promise<DeleteItemOutput> =>
    new Promise<DeleteItemOutput>((resolve, reject) => {
      client.deleteItem(params, (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })

  const query = async (params: QueryInput): Promise<QueryOutput> =>
    new Promise<QueryOutput>((resolve, reject) => {
      client.query(params, (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })

  const getItemKeyAndValue = (item: Item, key?: string) =>
    key ? { [`${key}`]: item[`${key}`] } : {}

  const truncateTable = async (
    TableName: string,
    hash: string,
    range?: string
  ): Promise<void> => {
    const { Items } = await client.scan({ TableName })
    if (!Items) {
      return
    }
    const keys = Items.map(item => ({
      ...getItemKeyAndValue(item, hash),
      ...getItemKeyAndValue(item, range)
    }))
    if (!keys.length) {
      return
    }
    await Promise.all(keys?.map(Key => deleteItem({ TableName, Key })))
  }

  return {
    putItem,
    updateItem,
    deleteItem,
    getItem,
    query,
    truncateTable,
    scan
  }
}

const AWS_CONFIG = {
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  ...(process.env.NODE_ENV === 'dev'
    ? { endpoint: 'http://localhost:8000' }
    : {})
}

export const dynamoClient = createDynamoClient(new DynamoDB(AWS_CONFIG))
