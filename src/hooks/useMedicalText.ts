import {safeMedicalText} from '../services/textEncoding';

export function useMedicalText(text: unknown) {
  return safeMedicalText(text);
}

export default useMedicalText;
