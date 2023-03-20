import { getCurrentMigrations } from './migrationRepository'

Promise.resolve()
  .then(async () => {
    const data = await getCurrentMigrations()

    console.log(data)

    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
