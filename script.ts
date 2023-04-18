import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      email: '',
      phone: '',
      name: '',
      given_name: '',
      family_name: '',
      locale: '',
    },
  })
}

main()
  .catch(e => console.error(e.message))
  .finally(async () => {
    await prisma.$disconnect()
  })
