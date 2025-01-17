import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, Typography, Button, Modal, Image } from 'antd';
import { getQuestion, getSubjects } from '../../../apis';
import { Wrapper } from '../../atoms';
import { ImportQuiz } from './ImportQuiz';
import { convertISOToDate, getImgUrl } from '../../../utils';

interface QuizOption {
  id: string;
  quiz_code: string;
  subject: string;
  duration: string;
  num_questions: number;
  image?: string;
}

const GetQuiz: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const { data: questionList, refetch: refetchQuestions } = useQuery({
    queryKey: ['quizzes'],
    queryFn: getQuestion,
    retry: false,
  });

  const { data: subjectList, refetch: refetchSubjects } = useQuery({
    queryKey: ['subjects'],
    queryFn: getSubjects,
    retry: false,
  });
  const data = questionList?.map(
    (item: {
      id: string;
      subject: string;
      question_text: string;
      created_at: string;
      image: string;
    }) => ({
      id: item.id,
      subject: subjectList?.find(
        (subject: { id: string; name: string }) => subject.id === item.subject
      )?.name,
      question_text: item.question_text,
      created_at: convertISOToDate(item.created_at),
      image: item.image,
    })
  );
  const handleCancelRefetch = () => {
    refetchQuestions();
    refetchSubjects();
    handleCancel();
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Question Text',
      dataIndex: 'question_text',
      key: 'question_text',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => {
        const getImage = getImgUrl(image);
        console.log(getImage);
        return (
          <Image
            width={100}
            height={100}
            src={`${getImage}`}
            alt="image"
            sizes="cover"
          />
        );
      },
    },
  ];

  return (
    <Wrapper>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Typography.Title level={2}>Danh sách câu hỏi</Typography.Title>
        <Button type="primary" onClick={showModal}>
          Tạo câu hỏi
        </Button>
        <Modal
          open={open}
          onCancel={handleCancelRefetch}
          footer={null}
          width={1000}
        >
          <ImportQuiz />
        </Modal>
      </div>
      <Table
        columns={columns}
        dataSource={data as QuizOption[]}
        rowKey="id"
        scroll={{ x: 'max-content' }}
      />
    </Wrapper>
  );
};

export { GetQuiz };
