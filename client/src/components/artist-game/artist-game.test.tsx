import { render, screen } from '@testing-library/react';
import { type ArtistGameProps, ArtistGame } from './artist-game';
import { generateArtistQuestion } from '../../utils/mock';

describe('Component ArtistGame', () => {
  let fakeRender: ReturnType<typeof vi.fn<[number, string], JSX.Element>>;
  beforeEach(() => {
    fakeRender = vi.fn((_id, _src) => <h1>player</h1>);
    vi.mock('./../../hooks/useUserAnswer.ts', async (importOriginal) => {
      const mod = await importOriginal<
        typeof import('./../../hooks/useUserAnswer.ts')
      >();
      return {
        ...mod,
        useUserAnswer: () => [vi.fn()],
      };
    });
  });
  it('should be rendered properly', () => {
    const fakeArtistGameProps: ArtistGameProps = {
      question: generateArtistQuestion(),
      render: fakeRender
    };
    render(<ArtistGame {...fakeArtistGameProps}/>);
    expect(screen.getByText(/Кто исполняет эту песню?/)).toBeInTheDocument();
    expect(screen.getByText(/player/)).toBeInTheDocument();
    expect(fakeRender).toHaveBeenCalledTimes(1);
  });
});
