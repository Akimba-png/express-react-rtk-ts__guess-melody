import { ComponentType } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';


type TestComponentProps = {
  render: (id: number, src: string) => JSX.Element;
};

const mockProps = {
  id: 0,
  src: faker.internet.url,
}

function TestComponent({render}: TestComponentProps): JSX.Element {
  return (
    <>
      <h1>Test component</h1>
      {render(mockProps.id, mockProps.src())}
    </>
  );
};


describe('HOC withPlayer', () => {
  let WrappedComponent: ComponentType;
  beforeAll(() => {
    HTMLAudioElement.prototype.pause = vi.fn();
  });
  afterEach(() => {
    vi.resetModules();
  });

  it('should call render prop Player declared inside HOC', async () => {
    const mockedPlayer = vi.fn();
    vi.doMock('./../../components/player/player.tsx', () => {
      return {
        Player: mockedPlayer,
      };
    });
    const {withPlayer} = await import('./with-player');
    WrappedComponent = withPlayer(TestComponent);
    render(<WrappedComponent />);
    expect(
      screen.getByRole('heading', {name: 'Test component'})
    ).toBeInTheDocument();
    expect(mockedPlayer).toHaveBeenCalledTimes(1);
    vi.doUnmock('./../../components/player/player.tsx');
  });

  it('should render player properly', async () => {
    const {withPlayer} = await import('./with-player');
    WrappedComponent = withPlayer(TestComponent);
    render(<WrappedComponent />);
    expect(
      screen.getByRole('heading', {name: 'Test component'})
    ).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId(/audio/)).toBeInTheDocument();
  });

  it('should start playing on user click', async () => {
    const {withPlayer} = await import('./with-player');
    WrappedComponent = withPlayer(TestComponent);
    render(<WrappedComponent />);
    expect(
      screen.getByRole('heading', {name: 'Test component'})
    ).toBeInTheDocument();
    const button = screen.getByRole('button');
    fireEvent.click(button)
    expect(button).toHaveClass('track__button--play');
  });
});
