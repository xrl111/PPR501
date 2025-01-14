import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, Typography, Button, Modal } from 'antd';
import { Wrapper } from '../../atoms';
import { Flex } from 'antd';
import { getExams } from '../../../apis';
import { ExamOption } from '../../../types';
import { CreateExam } from './CreateExam';

const GetExams: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const { data } = useQuery({
    queryKey: ['exams'],
    queryFn: getExams,
    retry: false,
  });

  const columns = [
    {
      title: 'Exam Code',
      dataIndex: 'exam_code',
      key: 'exam_code',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Number of Questions',
      dataIndex: 'num_questions',
      key: 'num_questions',
    },
  ];

  return (
    <Wrapper>
      <Flex justify="space-between" align="center" wrap>
        <Typography.Title level={1}>Danh sách bài thi</Typography.Title>
        <Button type="primary" onClick={showModal}>
          Tạo bài thi
        </Button>
        <Modal open={open} onCancel={handleCancel} footer={null}>
          <CreateExam />
        </Modal>
      </Flex>
      <hr />
      <Table
        columns={columns}
        dataSource={data as ExamOption[]}
        rowKey="id"
        scroll={{ x: 'max-content' }}
      />
    </Wrapper>
  );
};

export { GetExams };
