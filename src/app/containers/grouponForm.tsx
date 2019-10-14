/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Box, Container, Button, Stepper, Step, StepLabel, Paper, makeStyles } from '@material-ui/core';
import CreatePart from 'app/groupon-form/create-part';
import CreateGroupoonSelectMeal from 'app/groupon-form/create-groupon-select-meal';
import CreateGrouponCreateList from 'app/groupon-form/create-groupon-create-list';
import { createList_mockData } from 'storage/create-form-mocks';

const steps = ['選擇開始日期', '選擇餐點和人數', '確認發起日期'];
const maxPage = steps.length - 1;

const useStyles = makeStyles({
  root: {
    
  },
  formPart: {
    minHeight: 400,
    padding: 10,
  }
});


const StepPart = ({ pageNow }: { pageNow: number }) => {
  return (
    <Stepper activeStep={pageNow}>
      {steps.map((label, i) => (
        <Step key={i}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};


const GrouponForm = () => {
  const classes = useStyles();
  const createPartRef = useRef({ getName: () => {} });
  const [pageNow, setPage] = useState(0);
  const [formState, setFormState] = useState(createList_mockData);

  const handlePage = useCallback((prevOrNext) => {
    let newPage = pageNow;
    if(prevOrNext === 'prev') {
      newPage = newPage - 1 >= 0 ? newPage - 1 : 0;
    } else {
      newPage = newPage + 1 <= maxPage ? newPage + 1 : maxPage;
    }
    setPage(newPage);
  }, [pageNow]);

  const handleChooseStartDay = (date: Date) => {
    setFormState(form => ({
      ...form,
      startDate: date,
    }));
  };

  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setFormState(form => ({
      ...form,
      title: value,
    }));
  };


  return (
    <Container>
      <StepPart pageNow={pageNow} />
      <Paper className={classes.formPart}>
        {pageNow === 0 && (
          <CreatePart
            ref={createPartRef}
            onChangeNameFn={handleInputName}
            nameValue={formState.title}
            selectedDay={formState.startDate}
            chooseDay={handleChooseStartDay} />
        )}
        {pageNow === 1 && (
          <CreateGroupoonSelectMeal />
        )}
        {pageNow === 2 && (
          <CreateGrouponCreateList {...formState} />
        )}
      </Paper>
      <Box>
        <Button onClick={() => handlePage('prev')}>{'prev'}</Button>
        <Button color={'primary'} onClick={() => handlePage('next')}>
          {pageNow === maxPage ? 'finish' : 'next'}
        </Button>
      </Box>
    </Container>
  );  
};

export default GrouponForm;