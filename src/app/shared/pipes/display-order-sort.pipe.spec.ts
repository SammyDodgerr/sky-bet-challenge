import { DisplayOrderSortPipe } from './display-order-sort.pipe';

describe('DisplayOrderSortPipe', () => {
  it('create an instance', () => {
    const pipe = new DisplayOrderSortPipe();
    expect(pipe).toBeTruthy();
  });

  it('sort via display order', () => {
    const pipe = new DisplayOrderSortPipe();
    const testArray = [{value:{displayOrder: 10}}, {value:{displayOrder: 800}}, {value:{displayOrder: 1}}, {value:{displayOrder: -55}}]
    expect(pipe.transform(testArray)).toEqual(
      [{value:{displayOrder: -55}}, {value:{displayOrder: 1}}, {value:{displayOrder: 10}}, {value:{displayOrder: 800}}]
    );
  });

  it('sort via display order and by name', () => {
    const pipe = new DisplayOrderSortPipe();
    const testArray = [{value:{displayOrder: 10, name: 'sam'}}, {value:{displayOrder: 10, name: 'bob'}}, {value:{displayOrder: 10, name: 'zeus'}}, {value:{displayOrder: -55}}]
    expect(pipe.transform(testArray)).toEqual(
      [{value:{displayOrder: -55}}, {value:{displayOrder: 10, name: 'bob'}}, {value:{displayOrder: 10, name: 'sam'}}, {value:{displayOrder: 10,  name: 'zeus'}}]
    );
  });
});
