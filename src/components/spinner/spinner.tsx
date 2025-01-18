import {SPINNER_URL} from '@/constants/settings.ts';

export default function Spinner() {
  return (
    <img style={{width: '100%'}} src={SPINNER_URL} alt="loading..."/>
  );
}
