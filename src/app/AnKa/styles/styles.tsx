export const basicHoverEffectStyle = (hoveredBGcolor: string='#ddd') => ({
  transition: '0.2s',
  cursor: 'pointer',
  '&:hover': {
    transition: '0.2s',
    backgroundColor: hoveredBGcolor
  }
});