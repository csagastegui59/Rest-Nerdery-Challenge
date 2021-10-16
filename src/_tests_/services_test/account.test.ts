// import AccountsService from '../../services/accounts.service'
// import AccountsPublicDto from '../../dtos/accounts/res/accounts-public.dto'

// describe('find', () => {
//   test('Shows an array of all registered accounts', async () => {
//     expect(AccountsService.find()).toEqual(expect.arrayContaining(expect.objectContaining(AccountsPublicDto)))
// })
function find() {
  const array = [{ name: 'hola' }, { name: 'hola2' }]
  return typeOf(array)
}
console.log(find())
describe('find', () => {
  test('show array', () => {
    expect(find()).toEqual(expect.arrayContaining(expect.objectContaining({})))
  })
})
