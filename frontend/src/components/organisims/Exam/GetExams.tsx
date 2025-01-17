import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, Typography, Button, Modal } from 'antd';
import { Wrapper } from '../../atoms';
import { Flex } from 'antd';
import { getExams, getSubjects } from '../../../apis';
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
  const { data: examList, refetch: refetchExam } = useQuery({
    queryKey: ['exams'],
    queryFn: getExams,
    retry: false,
  });
  const { data: subjectList, refetch: refetchSubject } = useQuery({
    queryKey: ['subjects'],
    queryFn: getSubjects,
    retry: false,
  });

  const data = examList?.map(
    (item: {
      id: string;
      exam_code: string;
      subject: string;
      duration: number;
      num_questions: number;
    }) => ({
      id: item.id,
      exam_code: item.exam_code,
      subject: subjectList?.find(
        (subject: { id: string; name: string }) => subject.id === item.subject
      )?.name,
      duration: `${item.duration} minutes`,
      num_questions: item.num_questions,
    })
  );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
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
  const handleCancelRefetch = () => {
    refetchExam();
    refetchSubject();
    handleCancel();
  };
  return (
    <Wrapper>
      <Flex justify="space-between" align="center" wrap>
        <Typography.Title level={1}>Danh sách bài thi</Typography.Title>
        <Button type="primary" onClick={showModal}>
          Tạo bài thi
        </Button>
        <Modal open={open} onCancel={handleCancelRefetch} footer={null}>
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
