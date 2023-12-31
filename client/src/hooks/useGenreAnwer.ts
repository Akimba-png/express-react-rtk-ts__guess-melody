import { useState } from 'react';
import { useAppDispatch } from './store-hooks';
import {
  incrementErrorCount,
  incrementStep
} from '../store/slices/game-process-slice/game-process-slice';

export type Variant = {
  src: string;
  genre: string;
}

type UseGenreAnswerReturn = [(id: number) => void, () => void];

const useGenreAnswer = (
  correctValue: string,
  variants: Variant[]
): UseGenreAnswerReturn => {

  const [userAnswers, setUserAnswers] = useState<boolean[]>(
    new Array(variants.length).fill(false)
  );
  const dispatch = useAppDispatch();

  const answerHandler = (id: number) => {
    const answers = userAnswers.slice();
    answers[id] = !answers[id];
    setUserAnswers(answers);
  };

  const submitHandler = () => {
    let isCorrect;
    for (let i = 0; i < variants.length; i++) {
      isCorrect = correctValue === variants[i].genre;
      if (isCorrect !== userAnswers[i]) {
        dispatch(incrementStep());
        dispatch(incrementErrorCount());
        return;
      }
    }
    dispatch(incrementStep());
  }

  return [ answerHandler, submitHandler ];
};

export { useGenreAnswer };
