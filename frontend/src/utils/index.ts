import { MenuProps } from 'antd';
import { ExamData, Option } from '../types';
import dayjs from 'dayjs';

export const convertToISOString = (dateObject: any): string => {
  if (dateObject && dateObject.$d) {
    return dayjs(dateObject.$d).toISOString();
  }
  return '';
};

export const filterSort = (optionA: Option, optionB: Option) => {
  return (optionA?.label ?? '')
    .toLowerCase()
    .localeCompare((optionB?.label ?? '').toLowerCase());
};

export const findBreadcrumbLabels = (
  key: string,
  items: MenuProps['items'] | undefined
): string[] => {
  if (!items) return [];

  for (const item of items) {
    if (!item) continue;

    if ('key' in item && item.key === key) {
      if ('label' in item) {
        return [item.label as string];
      }
    }

    if ('children' in item && item.children) {
      const childLabels = findBreadcrumbLabels(key, item.children);
      if (childLabels.length > 0) {
        return [item.label as string, ...childLabels];
      }
    }
  }
  return [];
};

export const validateCreateExamData = (values: ExamData) => {
  const errors: string[] = [];

  if (!values.subject) {
    errors.push('Subject is required.');
  }
  if (!values.exam_code) {
    errors.push('Exam Code is required.');
  }
  if (!values.num_questions || values.num_questions <= 0) {
    errors.push('Number of questions must be a positive number.');
  }
  if (!values.duration || values.duration <= 0) {
    errors.push('Duration must be a positive number.');
  }
  if (values.duration > 1440) {
    errors.push('Duration must be less than 24 hours');
  }

  return errors;
};
