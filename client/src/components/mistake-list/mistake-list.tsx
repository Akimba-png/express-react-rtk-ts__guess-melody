import { useAppSelector } from '../../hooks/store-hooks';

function MistakeList(): JSX.Element {
const { errorCount } = useAppSelector(state => state.gameProcess);
  const errors = new Array(errorCount).fill(null);
  return (
    <div className="game__mistakes">
      {
        errors.map((_) => {
          const key = crypto.randomUUID();
          return <div className="wrong" key={key}></div>
        })
      }
    </div>
  );
}

export { MistakeList };
