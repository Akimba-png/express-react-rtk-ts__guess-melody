import { ComponentType, useState } from 'react';
import { Player } from './../../components/player/player';

type RenderProps = {
  render: (index: number) => JSX.Element;
};

function withPlayer<T>(Component: ComponentType<T>): ComponentType<
  T & RenderProps
> {
  function WithPlayer(props: T) {
    const [ activePlayer, setActivePlayer ] = useState(-1);
    return (
      <Component
        {...props}
        render={(index: number) => {
          return (
            <Player
              isPlaying={activePlayer === index}
              onPlayButtonClick={() => {
                setActivePlayer(
                  activePlayer === index ? -1 : index
                );
              }}
            />
          );
        }}
      />
    );
  }
  return WithPlayer;
}

export { withPlayer };
