import createIconSet from '@expo/vector-icons/createIconSet';

const glyphMap = { 'icon-name': 1234, test: '∆' };
const CustomIcon = createIconSet(glyphMap, 'fontFamily', 'custom-icons');

export default CustomIcon;
