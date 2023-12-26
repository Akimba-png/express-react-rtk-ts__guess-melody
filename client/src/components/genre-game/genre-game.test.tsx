import { fireEvent, render, screen } from '@testing-library/react';
import { GenreGame } from './genre-game';
import { type GenreQuestion } from '../../models/data';
import { generateGenreQuestion } from './../../utils/mock';

describe('Component GenreGame', () => {
  const { fakeAnswerHandler, fakeSubmitHandler } = vi.hoisted(() => {
    return {
      fakeAnswerHandler: vi.fn(() => {}),
      fakeSubmitHandler: vi.fn(() => {}),
    };
  });

  const { fakeUseGenreAnswer } = vi.hoisted(() => {
    return {
      fakeUseGenreAnswer: vi.fn(() => [fakeAnswerHandler, fakeSubmitHandler]),
    };
  });

  vi.mock('./../../hooks/useGenreAnwer.ts', () => {
    return {
      useGenreAnswer: fakeUseGenreAnswer,
    };
  });

  let mockGenreQuestion: GenreQuestion;
  const fakeRender: (id: number, src: string) => JSX.Element = vi.fn(
    (_id: number, _src: string) => <h2>Player</h2>
  );

  beforeAll(() => {
    mockGenreQuestion = generateGenreQuestion();
  });

  it('should render properly', () => {
    render(<GenreGame question={mockGenreQuestion} render={fakeRender} />);
    expect(
      screen.getByRole('heading', { name: /^Выберите \w+ треки$/ })
    ).toBeInTheDocument();
  });

  it('should render player', () => {
    render(<GenreGame question={mockGenreQuestion} render={fakeRender} />);
    expect(screen.getAllByText(/Player/).length).toBe(4);
  });

  it('should call custom hook on render, with correct args', () => {
    render(<GenreGame question={mockGenreQuestion} render={fakeRender} />);
    expect(fakeUseGenreAnswer).toHaveBeenCalled();
    expect(fakeUseGenreAnswer).toHaveBeenCalledWith(
      mockGenreQuestion.genre,
      mockGenreQuestion.answers
    );
  });

  it('should process users submit click', () => {
    render(<GenreGame question={mockGenreQuestion} render={fakeRender} />);
    const submitButton = screen.getByRole('button', { name: /Ответить/ });
    fireEvent.click(submitButton);
    expect(fakeSubmitHandler).toHaveBeenCalled();
  });
});
