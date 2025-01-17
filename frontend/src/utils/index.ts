import { MenuProps } from 'antd';
import { DecodedToken, ExamData, Option } from '../types';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';

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

export const isValidToken = (): boolean => {
  const token = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const username = localStorage.getItem('username');

  if (!token || !refreshToken || !username) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    return false;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp > currentTime) {
      return true;
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('username');
      return false;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    return false;
  }
};

export const convertISOToDate = (isoString: string): string => {
  return dayjs(isoString).format('YYYY-MM-DD HH:mm:ss');
};
