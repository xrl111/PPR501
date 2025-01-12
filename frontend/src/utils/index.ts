import { Option } from '../types';

export const filterSort = (optionA: Option, optionB: Option) => {
  return (optionA?.label ?? '')
    .toLowerCase()
    .localeCompare((optionB?.label ?? '').toLowerCase());
};
