import { fireEvent, render, screen } from '@testing-library/react';
import { GameItem, GameItemProps } from './game-item';
import { faker } from '@faker-js/faker';

describe('Component GameItem', () => {
  let fakeFn: ReturnType<typeof vi.fn>;
  let fakeItemProps: GameItemProps;
  beforeEach(() => {
    fakeFn = vi.fn();
    fakeItemProps = {
      genre: faker.music.genre(),
      index: 1,
      onChange: fakeFn,
      renderPlayer: () => <h3>music player</h3>
    };
  });

  it('should be rendered properly', () => {
    render(<GameItem {...fakeItemProps}/>);
    expect(
      screen.getByRole('checkbox', {name: 'Отметить'})
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {name: 'music player'})
    ).toBeInTheDocument();
  });

  it('should call cb on user interaction', () => {
    render(<GameItem {...fakeItemProps} />);
    const input = screen.getByRole('checkbox', {name: 'Отметить'});
    fireEvent.click(input);
    expect(fakeFn).toBeCalledTimes(1);
  });
});
