import HandleMessageList from "./handleMessageListToMessageWithDateList";

const checkDateIsToday = (date: Date | string) => {
  return HandleMessageList.checkTwoDateIsSame(new Date(), date);
};

export default checkDateIsToday;