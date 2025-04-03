import Popup from '../modal/popup';
import { CustomError } from '../api/test';

export const ErrorModalHandler = (error: Error, onClose: () => void) => {
  return <Popup message={error.message} onClose={onClose} />;
};
