import { fireEvent, render, screen } from '@testing-library/react';
import { Player } from './player';
import { faker } from '@faker-js/faker';

const fakeAudio = faker.internet.url();

describe('Component Player', () => {
  const mockPlay = vi.fn();
  const mockPause = vi.fn();
  const mockClickHandler = vi.fn();

  beforeAll(() => {
    HTMLAudioElement.prototype.play = mockPlay;
    HTMLAudioElement.prototype.pause = mockPause;
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render properly', () => {
    render(
      <Player
        src={fakeAudio}
        isPlaying={false}
        onPlayButtonClick={mockClickHandler}
      />
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveClass('track__button--play');
    expect(screen.getByTestId('audio')).toBeInTheDocument();
  });

  it('should start playing on start', () => {
    render(
      <Player
        src={fakeAudio}
        isPlaying={true}
        onPlayButtonClick={mockClickHandler}
      />
    );
    const audioElement = screen.getByTestId('audio');
    expect(audioElement).toBeInTheDocument();
    expect(mockPause).toHaveBeenCalledTimes(1);
    fireEvent.loadedData(audioElement);
    expect(mockPlay).toHaveBeenCalledTimes(1);
  });

  it('should call call cb handler on user interaction', () => {
    render(
      <Player
        src={fakeAudio}
        isPlaying={true}
        onPlayButtonClick={mockClickHandler}
      />
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockClickHandler).toBeCalledTimes(1);
  });
});
