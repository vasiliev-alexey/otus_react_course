import { parseQs } from './task';

test('parseQs', () => {
  const qs = '?page=2&pageSize=10&total=205&somethingElse=value';
  expect(parseQs(qs)).toEqual({
    page: '2',
    pageSize: '10',
    total: '205',
    somethingElse: 'value',
  });
});
