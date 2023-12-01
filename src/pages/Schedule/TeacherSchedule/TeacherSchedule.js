import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

import {russianToEnglishWeekdays} from '../../../assets/utils/arrays';
import {matchLessonTime} from '../../../assets/utils/functions';

import './style.css';
import {Link} from "react-router-dom";

export const TeacherSchedule = () => {
  const scheduleArray = useSelector((state) => state.schedule.teacherScheduleData);

  const rowStyle = {background: 'white'};

  const getRowStyle = params => {
    if (params.node.rowIndex % 2 === 0) {
      return {background: '#fafafa'};
    }
  };

  const CustomCellRenderer = ({ value }) => {
    console.log(value)
    return <Link to={`/group/${value}`}>{value}</Link>;
  };

  const gridOptions = {
    components: {
      customCellRenderer: CustomCellRenderer
    }
  };
  const [colDefs, setColDefs] = useState([
    {field: "lessonNumber", headerName: "Пара", width: 70},
    {field: "lessonDay", headerName: "День", width: 150},
    {field: "lessonTime", headerName: "Время", width: 130},
    {field: "location", headerName: "Аудитория", width: 120},
    {field: "typeClassName", headerName: " ", width: 100},
    {field: "disciplineName", headerName: "Дисциплина", width: 320},
    {field: "groupName", headerName: "Группа",cellRenderer: 'customCellRenderer', width: 150}
  ]);

  const [filteredSchedule, setFilteredSchedule] = useState([]);

  useEffect(() => {
    const data = filterAndSortSchedule(scheduleArray);
    console.log(data);
    const data2 = mergeObjectsWithSameValues(data);
    setFilteredSchedule(data2)

  }, [scheduleArray]);


  const filterAndSortSchedule = (schedule) => {
    const dayOrder = {};
    russianToEnglishWeekdays.forEach((day, index) => {
      dayOrder[day.dayInRussian] = index + 1;
    });

    return schedule
      .map(item => ({
        ...item,
        lessonDay: russianToEnglishWeekdays.find(day => day.dayInEnglish === item.lessonDay)?.dayInRussian,
        lessonTime: matchLessonTime(item.lessonNumber)
      }))
      .filter(item => item.lessonDay)
      .sort((a, b) => {
        if (dayOrder[a.lessonDay] === dayOrder[b.lessonDay]) {
          return a.lessonNumber - b.lessonNumber;
        }
        return dayOrder[a.lessonDay] - dayOrder[b.lessonDay];
      });
  };

  const mergeObjectsWithSameValues = (schedule) => {
    const mergedSchedule = [];
    schedule.forEach((item) => {
      const existingItem = mergedSchedule.find((mergedItem) => (
        mergedItem.lessonDay === item.lessonDay &&
        mergedItem.lessonNumber === item.lessonNumber &&
        mergedItem.lessonTime === item.lessonTime &&
        mergedItem.typeClassName === item.typeClassName &&
        mergedItem.disciplineName === item.disciplineName
      ));

      if (existingItem) {
        existingItem.groupName += `, ${item.groupName}`;
      } else {
        mergedSchedule.push({...item});
      }
    });

    return mergedSchedule;
  };

  return (
    <>
      <h2 className="schedule-title">Расписание</h2>
      <div className="ag-theme-quartz" style={{height: '100%', width: '100%'}}>
        <AgGridReact
          rowData={filteredSchedule}
          columnDefs={colDefs}
          domLayout='autoHeight'
          rowStyle={rowStyle}
          getRowStyle={getRowStyle}
          gridOptions={gridOptions}
        />
      </div>
    </>
  );
};
