import { useState, useEffect } from 'react';
import { useAppDispatch } from './store-hooks';
import {
  incrementErrorCount,
  incrementStep,
} from '../store/slices/game-process-slice/game-process-slice';

const useUserAnswer = (
  expectedAnswer: string,
) => {
  const [userAnswer, setUserAnswer] = useState<string>('');

  const dispatch = useAppDispatch();
  const userAnswerHandler = (answer: string) => setUserAnswer(answer);

  useEffect(() => {
    if (!userAnswer) {
      return;
    }
    if (expectedAnswer === userAnswer) {
      dispatch(incrementStep());
    } else {
      dispatch(incrementStep());
      dispatch(incrementErrorCount());
    }
  }, [userAnswer]);
  return [userAnswerHandler];
};


export { useUserAnswer };
