/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Box, Container, Button, Stepper, Step, StepLabel, Paper, makeStyles } from '@material-ui/core';
import CreatePart from 'app/groupon-form/create-part';
import CreateGroupoonSelectMeal from 'app/groupon-form/create-groupon-select-meal';
import CreateGrouponCreateList from 'app/groupon-form/create-groupon-create-list';
import { createList_mockData } from 'storage/create-form-mocks';
import { meals_mockData } from 'app/common-components/storage/mockData';
import { SingleMeal } from 'common-types';
import { getBonusFromMealsAndPeople } from 'lib/fn';

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


type GrouponFormProps = {
  mealsData?: SingleMeal[]
}
const GrouponForm = ({ mealsData=meals_mockData }: GrouponFormProps) => {
  const classes = useStyles();
  const createPartRef = useRef({ getName: () => {} });
  const [pageNow, setPage] = useState(0);
  const [formState, setFormState] = useState(createList_mockData);

  const handlePage = useCallback((prevOrNext) => {
    let newPage = pageNow;
    if(prevOrNext === 'prev') {
      newPage = newPage - 1 >= 0 ? newPage - 1 : 0;
    } else {
      //check state before next page
      if(pageNow === 0) {
        const { startDate, title, tag } = formState;
        if(startDate.getFullYear() === 3000 || !title || !tag) {
          return window.alert('something has lost!');
        }
      }
      if(pageNow === 1) {
        const { meals } = formState;
        if(meals.length === 0) {
          return window.alert('please choose at least 1 meal');
        }
      }
      newPage = newPage + 1 <= maxPage ? newPage + 1 : maxPage;
    }
    setPage(newPage);
  }, [pageNow, formState]);

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

  const handleSelectTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    setFormState(form => ({
      ...form,
      tag: value,
    }));
  };

  const handleSelectMeal = useCallback((mealId: number) => {
    const { meals } = formState;
    const isSelected = meals.find(meal => meal.id === mealId);
    let newMeals = meals;
    //add
    if(!isSelected) {
      const selectedMeal = mealsData.find(m => m.id === mealId);
      newMeals = selectedMeal ? [...formState.meals, selectedMeal] : formState.meals;
    } else {
      //remove
      newMeals = meals.filter(m => m.id !== mealId);
    }
    setFormState(f => ({
      ...f,
      meals: newMeals
    }));
  }, [formState]);

  const handleSetPeople = useCallback((ope='+') => {
    const { peopleRequired } = formState;
    let res = peopleRequired;
    if(ope === '+') {
      res += 1;
    } else {
      res = res - 1 >= 0 ? res - 1 : 0;
    }
    setFormState(f => ({
      ...f,
      peopleRequired: res
    }));
  }, [formState]);

  const selectedMealsId = formState.meals.map(m => m.id);
  const gottenBonus = getBonusFromMealsAndPeople(selectedMealsId.length, formState.peopleRequired);
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
            chooseDay={handleChooseStartDay}
            selectedTag={formState.tag}
            selectTagFn={handleSelectTag} />
        )}
        {pageNow === 1 && (
          <CreateGroupoonSelectMeal
            selectedMealsId={selectedMealsId}
            meals={mealsData}
            selectMealFn={handleSelectMeal}
            peopleRequired={formState.peopleRequired}
            setPeopleFn={handleSetPeople}
            gottenBonus={gottenBonus} />
        )}
        {pageNow === 2 && (
          <CreateGrouponCreateList 
            {...formState}
            gottenBonus={gottenBonus} />
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