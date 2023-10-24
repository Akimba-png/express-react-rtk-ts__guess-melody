import { ComponentType, useState } from 'react';
import { Player } from '../../components/player/player';

type RenderProp = {
  render: (id: number) => JSX.Element;
};

function withPlayer<T>(
  Component: ComponentType<T & RenderProp>
): ComponentType<T> {
  function WithPlayer(props: T) {
    const [activePlayer, setActivePlayer] = useState(-1);
    return (
      <Component
        {...props}
        render={(id: number) => (
          <Player
            isPlaying={activePlayer === id}
            onPlayButtonClick={() =>
              setActivePlayer(activePlayer === id ? -1 : id)
            }
          />
        )}
      />
    );
  }
  return WithPlayer;
}

export { withPlayer };
