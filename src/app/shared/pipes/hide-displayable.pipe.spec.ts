import { HideDisplayablePipe } from './hide-displayable.pipe';
import { DisplayOrderSortPipe } from "./display-order-sort.pipe";

describe('HideDisplayablePipe', () => {
  it('create an instance', () => {
    const pipe = new HideDisplayablePipe();
    expect(pipe).toBeTruthy();
  });

  it('hide displayable = false', () => {
    const pipe = new HideDisplayablePipe();
    const testArray = [{status:{displayable: false}},{status:{displayable: false}}, {status:{displayable: false}}, {status:{displayable: true}}]
    expect(pipe.transform(testArray).length).toEqual(1);
  });

  it('hide displayable = false with custom path', () => {
    const pipe = new HideDisplayablePipe();
    const testArray = [{super:{displayable: false}},{super:{displayable: false}}, {super:{displayable: false}}, {super:{displayable: true}}]
    expect(pipe.transform(testArray, 'super.displayable').length).toEqual(1);
  });

});
