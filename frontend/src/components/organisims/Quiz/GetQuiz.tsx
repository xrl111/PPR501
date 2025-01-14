// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { Table, Typography, Spin, Alert } from 'antd';

// const GetQuiz: React.FC = () => {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ['quizzes'],
//     queryFn: getQuizzes,
//   });

//   if (isLoading) {
//     return <Spin tip="Loading quizzes..." />;
//   }

//   if (error) {
//     return (
//       <Alert
//         message="Error"
//         description="Failed to load quizzes."
//         type="error"
//         showIcon
//       />
//     );
//   }

//   const columns = [
//     {
//       title: 'Quiz Code',
//       dataIndex: 'quiz_code',
//       key: 'quiz_code',
//     },
//     {
//       title: 'Subject',
//       dataIndex: 'subject',
//       key: 'subject',
//     },
//     {
//       title: 'Duration',
//       dataIndex: 'duration',
//       key: 'duration',
//     },
//     {
//       title: 'Number of Questions',
//       dataIndex: 'num_questions',
//       key: 'num_questions',
//     },
//   ];

//   return (
//     <Wrapper>
//       <FLex justify="space-between" align="center" wrap>
//         <Typography.Title level={2}>Danh sách câu hỏi</Typography.Title>
//       </FLex>
//       <Table
//         columns={columns}
//         dataSource={data as QuizOption[]}
//         rowKey="id"
//         scroll={{ x: 'max-content' }}
//       />
//     </Wrapper>
//   );
// };

// export { GetQuiz };
