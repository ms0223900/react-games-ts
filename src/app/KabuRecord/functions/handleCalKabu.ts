const handleCalKabu = (sundayPrice: number, mondayMorningPrice: number) => {
  if(sundayPrice === 0 || mondayMorningPrice === 0) {
    return 0;
  }
  return (mondayMorningPrice / sundayPrice).toFixed(3);
};

export default handleCalKabu;