import { createQs, QsObj } from './task';

test('createQs', () => {
  const qsObj: QsObj = {
    page: '2',
    pageSize: '10',
    total: '205',
    somethingElse: 'value',
  };

  expect(createQs(qsObj)).toBe(
    '?page=2&pageSize=10&total=205&somethingElse=value'
  );
});
