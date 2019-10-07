import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem } from '@material-ui/core';
import {  } from 'react-router-dom';
import { getDaysAfterToday } from 'lib/fn';
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

const ChooseDayPart = () => {
  const days = getDaysAfterToday(6);
  return (
    <Box className={'chooseDay-container clearfix'}>
      <div className="chooseDay-wrapper">
        <h2>{'請選擇飯團開始日'}</h2>
        <ul className="element-day">
          {days.map((day, i) => (
            <li key={i}>
              {`${day.getMonth() + 1}/${day.getDate()}`}
            </li>
          ))}
        </ul>
      </div>
    </Box>
  );
};


type NameTagPartProps = {
  onChangeNameFn: (e: React.ChangeEvent<HTMLInputElement>) => any
  nameValue: string
  tags: string[]
}
const NameTagPart = ({
  onChangeNameFn,
  nameValue,
  tags
}: NameTagPartProps) => {
  return (
    <Box className={'name-container clearfix'}>
      <Typography variant={'h4'}>
        {'請輸入名稱和選擇飯團標籤'}
      </Typography>
      <div className="input-wrapper grid-12 grid-md-8">
        <h3>
          {'請輸入飯團名稱'}
        </h3>
        <input 
          type="text"
          onChange={onChangeNameFn} 
          placeholder="請輸入飯團名稱" 
          id="grouponTitle" 
          value={nameValue} 
          maxLength={10} />
        <div className="hint">
          {'請輸入3~10個字，或是隨機產生名稱'}
        </div>
        <div className="randomTitle">
          {'隨機產生飯團名稱'}
        </div>    
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

const CreatePart = () => {
  const [name, setName] = useState('');
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };
  return (
    <Box className={'maxWidthWrapper'}>
      <Box className={'step-container clearfix'}>
        <Typography variant={'h4'}>{'發起飯團!'}</Typography>
        <ul className="step-wrapper clearfix">
          <li className="grid-4 active">
            <span className="active">
                  1
            </span>
              選擇開始日期
          </li>
          <li className="grid-4">
            <span>2<div className="decoLine"></div></span>
              選擇餐點和人數
          </li>
          <li className="grid-4">
            <span>3<div className="decoLine"></div></span>
              確認發起日期
          </li>
        </ul>
      </Box>
      <Box className='woodTemp'>
        <ChooseDayPart />
        <NameTagPart 
          nameValue={name}
          onChangeNameFn={handleChangeName}
          tags={tags_mockData} />
      </Box>
    </Box>
  );
};

export default CreatePart;