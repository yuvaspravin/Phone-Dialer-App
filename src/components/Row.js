import { View } from 'react-native';

const Row = ({children, justify="center", align="center", style}) => {
  return <View style={[{flexDirection: 'row', alignItems: align, justifyContent: justify}, style]}>{children}</View>
}

export default Row;