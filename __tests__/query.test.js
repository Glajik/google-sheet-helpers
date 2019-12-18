import query, { byKeyValue_, byObj_ } from '../src/query';

describe('query helpers', () => {
  it('byKeyValue_ - should work', () => {
    expect(byKeyValue_('a', 1)({ a: 1 })).toBeTruthy();
    expect(byKeyValue_('a', 1)({ a: '1' })).toBeFalsy();
    expect(byKeyValue_('b', 2)({ a: 1 })).toBeFalsy();
    expect(byKeyValue_('b', 2)({ b: 3 })).toBeFalsy();
  });

  it('byKeyValue_ - shouldn\'t throw', () => {
    expect(byKeyValue_()({ b: 3 })).toBeFalsy();
    expect(byKeyValue_('b', 2)()).toBeFalsy();
  });

  it('byObj_ - should work', () => {
    const cars = [
      { brand: 'bmw', model: 'm4', year: 2013 },
      { brand: 'bmw', model: 'm5', year: 2014 },
      { brand: 'kia', model: 'sorento', year: 2014 },
      { brand: 'kia', model: 'rio', year: 2010 },
      { brand: 'kia', model: 'sportage', year: 2012 },
    ];

    // query
    const list = byObj_({ brand: 'kia', year: 2014 });
    expect(list).toHaveLength(2);

    // test query result
    const [first, second] = list.map(predicate => cars.filter(predicate));
    expect(first).toEqual([
      { brand: 'kia', model: 'sorento', year: 2014 },
      { brand: 'kia', model: 'rio', year: 2010 },
      { brand: 'kia', model: 'sportage', year: 2012 },
    ]);
    expect(second).toEqual([
      { brand: 'bmw', model: 'm5', year: 2014 },
      { brand: 'kia', model: 'sorento', year: 2014 },
    ]);
  });

  it('byObj_ - shouldn\'t throw', () => {
    expect(byObj_({})).toHaveLength(0);
    expect(byObj_()).toHaveLength(0);
    const list = byObj_({ brand: 'kia', year: 2014 });
    const result = list.map(predicate => [].filter(predicate));
    expect(result).toHaveLength(2);
  });
});

describe('query', () => {
  const cars = [
    { brand: 'bmw', model: 'm4', year: 2013 },
    { brand: 'bmw', model: 'm5', year: 2014 },
    { brand: 'kia', model: 'sorento', year: 2014 },
    { brand: 'kia', model: 'rio', year: 2010 },
    { brand: 'kia', model: 'sportage', year: 2012 },
  ];

  const myQuery = query().from(cars).where({ brand: 'kia' });

  it('select - all', () => {
    expect(myQuery.select()).toEqual([
      { brand: 'kia', model: 'sorento', year: 2014 },
      { brand: 'kia', model: 'rio', year: 2010 },
      { brand: 'kia', model: 'sportage', year: 2012 },
    ]);
  });

  it('select - array of values', () => {
    expect(myQuery.select('model')).toEqual(['sorento', 'rio', 'sportage']);
  });

  it('select - list with specified keys', () => {
    expect(myQuery.select(['model', 'year'])).toEqual([
      { model: 'sorento', year: 2014 },
      { model: 'rio', year: 2010 },
      { model: 'sportage', year: 2012 },
    ]);
  });

  it('Order by', () => {
    expect(myQuery.orderBy('year').select('year')).toEqual([2010, 2012, 2014]);
    expect(myQuery.orderBy('year').select('year', 'desc')).toEqual([2010, 2012, 2014]);
  });
});
