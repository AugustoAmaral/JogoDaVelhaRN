import { TouchableOpacity, StyleSheet } from "react-native";

interface GameButtonProps {
  playerSelected?: "X" | "O";
  forceDisable: boolean;
  onPress?: () => void;
}

const GameButton = ({
  playerSelected,
  forceDisable,
  onPress,
}: GameButtonProps) => {
  const buttonStyle: Array<Object> = [styles.button];
  if (playerSelected) {
    buttonStyle.push(styles[playerSelected]);
  }

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={forceDisable || !!playerSelected}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    height: 75,
    width: 75,
    margin: 1,
    backgroundColor: "#AAA",
    borderRadius: 5,
  },
  X: { backgroundColor: "red" },
  O: { backgroundColor: "blue" },
});

export default GameButton;
