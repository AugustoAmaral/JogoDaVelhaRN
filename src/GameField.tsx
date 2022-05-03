import { View, Button, Text } from "react-native";
import { useEffect, useState } from "react";
import GameButton from "./GameButton";

interface GameFieldProps {}

interface ButtonMatrix {
  [key: number]: undefined | "X" | "O";
}

const checkWinner = (gameButtonState: ButtonMatrix): "X" | "O" | undefined => {
  const gbs = gameButtonState;
  // Horizontal
  if (gbs[0] === gbs[1] && gbs[0] === gbs[2]) return gbs[0];
  if (gbs[3] === gbs[4] && gbs[3] === gbs[5]) return gbs[3];
  if (gbs[6] === gbs[7] && gbs[6] === gbs[8]) return gbs[6];
  // Vertical
  if (gbs[0] === gbs[3] && gbs[0] === gbs[6]) return gbs[0];
  if (gbs[1] === gbs[4] && gbs[1] === gbs[7]) return gbs[1];
  if (gbs[2] === gbs[5] && gbs[2] === gbs[8]) return gbs[2];
  // Diagonal
  if (gbs[0] === gbs[4] && gbs[0] === gbs[8]) return gbs[0];
  if (gbs[2] === gbs[4] && gbs[2] === gbs[6]) return gbs[2];
  return undefined;
};

const GameField = ({}: GameFieldProps) => {
  const [player, setPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<"X" | "O" | undefined>();

  const [gameButtonState, setGameButtonState] = useState<ButtonMatrix>({});

  const handlePress = (field: number) => {
    setGameButtonState((oldState) => ({ ...oldState, [field]: player }));
    setPlayer((previousPlayer) => (previousPlayer === "X" ? "O" : "X"));
  };

  useEffect(() => {
    setWinner(checkWinner(gameButtonState));
  }, [gameButtonState]);

  return (
    <View>
      <View>
        {winner && (
          <Text>
            O vencedor é o jogador {winner === "X" ? "Vermelho" : "Azul"}
          </Text>
        )}
        {Object.values(gameButtonState).length === 9 && <Text>Deu velha</Text>}
        <Button title="Resetar" onPress={() => setGameButtonState({})} />
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        {new Array(3).fill(0).map((_, line) => (
          <View key={`line${line}`}>
            {new Array(3).fill(0).map((_, column) => {
              let buttonId = line * 3 + column;
              return (
                <GameButton
                  key={`column${column}`}
                  playerSelected={gameButtonState[buttonId]}
                  forceDisable={!!winner}
                  onPress={() => handlePress(buttonId)}
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

export default GameField;
