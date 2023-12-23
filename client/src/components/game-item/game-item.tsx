export type GameItemProps = {
  genre: string;
  index: number;
  onChange: () => void;
  renderPlayer: () => JSX.Element;
};

function GameItem({
  renderPlayer,
  onChange,
  genre,
  index
}: GameItemProps): JSX.Element {
  return (
    <div className="track">
      {renderPlayer()}
      <div className="game__answer">
        <input
          onChange={onChange}
          className="game__input visually-hidden"
          type="checkbox"
          name="answer"
          value={index}
          id={genre + index}
        />
        <label className="game__check" htmlFor={genre + index}>Отметить</label>
      </div>
    </div>
  );
}

export { GameItem };
