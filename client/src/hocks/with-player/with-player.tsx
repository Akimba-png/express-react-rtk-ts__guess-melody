import { ComponentType, useState } from 'react';
import { Player } from '../../components/player/player';

type RenderProp = {
  render: (id: number, src: string) => JSX.Element;
};

function withPlayer<T>(
  Component: ComponentType<T>
): ComponentType<Omit<T, keyof RenderProp>> {
  function WithPlayer(props: Omit<T, keyof RenderProp>) {
    const [activePlayer, setActivePlayer] = useState(-1);
    return (
      <Component
        {...props as T}
        render={(id: number, src: string) => (
          <Player
            src={src}
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
