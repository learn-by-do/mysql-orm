const { pool } = require('./init')
const { getConnection, close } = pool

describe('Test connection', () => {
  test('should connect to 127.0.0.1:3306', async () => {
    const connection = await getConnection()
    connection.query('select 1+1').then(([rows, fields]) => {
      // console.log(rows[0]['1'], fields);
      expect(rows[0]['1+1']).toBe(2)
    })
  })

  // test('should not connect to 127.0.0.1:3307', () => {
  //   // Make sure to add expect.assertions to verify that a certain number of assertions are called.Otherwise a fulfilled promise would not fail the test.
  //   expect.assertions(1);
  //   return getConnection().catch(e => {
  //     console.log(e.msg, e.message)
  //     expect(e.message).toBe('connect ECONNREFUSED 127.0.0.1:3307');
  //   });
  // });

  afterAll(() => {
    return close()
  })
})
