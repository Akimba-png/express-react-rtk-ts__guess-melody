import { fireEvent, render, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { ArtistItem, type ArtistItemProps } from "./artist-item";

describe('Component ArtistItem', () => {
  let fakeHandler: ReturnType<typeof vi.fn>;
  let fakeItemProps: ArtistItemProps;
  beforeEach(() => {
    fakeHandler = vi.fn();
    fakeItemProps = {
      artist: faker.person.fullName(),
      url: faker.internet.url(),
      onUserAnswer: fakeHandler,
    };
  });

  it('should render properly', () => {
    render(<ArtistItem {...fakeItemProps} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should call cb on user interaction', () => {
    render(<ArtistItem {...fakeItemProps} />);
    const input = screen.getByRole('radio');
    fireEvent.click(input);
    expect(fakeHandler).toHaveBeenCalledTimes(1);
  });
});
