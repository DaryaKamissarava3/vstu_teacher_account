import React from 'react';

import {useParams} from 'react-router-dom';

export const StudentsSchedule = () => {
  const params = useParams();

  return (
    <>
      <h2>Расписание группы {params}</h2>
    </>
  );
};



