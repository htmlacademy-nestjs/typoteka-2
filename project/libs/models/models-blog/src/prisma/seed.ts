import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.category.upsert({
    where: { categoryId: 1 },
    update: {},
    create: {
      title: 'Книги',
      posts: {
        create: [
          {
            title: 'Худеющий',
            userId: '13',
            content: 'Недавно прочитал страшный роман «Худеющий».',
            description: 'На мой взгляд, это один из самых страшных романов Стивена Кинга.'
          },
        ]
      },
    }
  });
  await prisma.category.upsert({
    where: { categoryId: 2 },
    update: {},
    create: {
      title: 'Компьютеры',
      posts: {
        create: [
          {
            title: 'Мой ноутбук',
            userId: '13',
            content: 'Это полный текст',
            description: 'Несколько лет назад купил себе MacBook Pro…',
            comments: {
              create: [
                {
                  message: 'Вау! Отличный ноутбук.',
                  userId: '14',
                }
              ]
            }
          },
          {
            title: 'Первый PC',
            userId: '13',
            content: 'Первый PC появился в 2000-м году…',
            description: 'Это был Pentium II, 400 Mhz, 32Mb RAM…'
          }
        ]
      }
    }
  });
  console.info('🤘️ Database was filled')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
