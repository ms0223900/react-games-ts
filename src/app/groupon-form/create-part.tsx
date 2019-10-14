import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Box, Typography, Select, MenuItem, TextField, Button } from '@material-ui/core';
import {  } from 'react-router-dom';
import { getDaysAfterToday, checkDatesIsSame } from 'lib/fn';
import { tags_mockData } from 'storage/create-form-mocks';

type TagSelectsProps = {
  tags: string[]
}
const TagSelects = ({ tags }: TagSelectsProps) => {
  return (
    <Select>
      {tags.map((tag, i) => (
        <MenuItem key={i} value={tag}>{tag}</MenuItem>
      ))}
    </Select>
  );
};


type ChooseDayPartProps = {
  selectedDay?: Date
  chooseDay?: (x: Date) => any
}
const ChooseDayPart = ({ selectedDay, chooseDay }: ChooseDayPartProps) => {
  const days = getDaysAfterToday(6);
  return (
    <Box className={'chooseDay-container clearfix'}>
      <div className="chooseDay-wrapper">
        <h2>{'請選擇飯團開始日'}</h2>
        <Box>
          {days.map((day, i) => {
            return (
              <Button
                color={(selectedDay && checkDatesIsSame(selectedDay, day)) ? 'primary' : 'default'}
                variant={'contained'} 
                key={i} 
                onClick={() => chooseDay && chooseDay(day)}
              >
                {`${day.getMonth() + 1}/${day.getDate()}`}
              </Button>
            );
          })}
        </Box>
      </div>
    </Box>
  );
};


type NameTagPartProps = {
  onChangeNameFn?: (e: React.ChangeEvent<HTMLInputElement>) => any
  nameValue?: string
  tags?: string[]
}
const NameTagPart = ({
  onChangeNameFn,
  nameValue,
  tags=tags_mockData
}: NameTagPartProps) => {
  return (
    <Box className={'name-container clearfix'}>
      <Typography variant={'h4'}>
        {'請輸入名稱和選擇飯團標籤'}
      </Typography>
      <div className="input-wrapper grid-12 grid-md-8">
        <TextField
          onChange={onChangeNameFn} 
          placeholder="請輸入飯團名稱" 
          id="grouponTitle" 
          value={nameValue} />
        <div className="hint">
          {'請輸入3~10個字，或是隨機產生名稱'}
        </div>
        <Button className="randomTitle">
          {'隨機產生飯團名稱'}
        </Button>    
      </div>
      <div className="select-wrapper grid-12 grid-md-4">
        <h3>
          {'請選擇此飯團的標籤'}
        </h3>
        <TagSelects tags={tags} />
      </div>
    </Box>
  );
};


type CreatePartProps = ChooseDayPartProps & NameTagPartProps
const CreatePart = (props: CreatePartProps, ref: any) => {
  // const [name, setName] = useState('');
  // const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   setName(value);
  // };
  useImperativeHandle(
    ref,
    () => ({
      sayHi: () => console.log('hi')
    })
  );
  return (
    <Box className={'maxWidthWrapper'}>
      <Box className={'step-container clearfix'}>
        <Typography variant={'h4'}>{'發起飯團!'}</Typography>
        
      </Box>
      <Box className='woodTemp'>
        <ChooseDayPart {...props} />
        <NameTagPart 
          {...props} />
      </Box>
    </Box>
  );
};

export default forwardRef<any, CreatePartProps>(CreatePart) ;