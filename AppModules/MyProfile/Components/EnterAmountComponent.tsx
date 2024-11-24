import { Button, ButtonText, HStack, Text, VStack } from "@/components/ui";
import React, { useState } from "react";
import { Keyboard, TextInput } from "react-native";

type EnterAmountComponentProps = {
  onAmountChange: (amount: number) => void;
};

const EnterAmountComponent: React.FC<EnterAmountComponentProps> = ({
  onAmountChange,
}) => {
  const [amount, setAmount] = useState<number>(0);

  const handleInputChange = (value: string): void => {
    const numericValue = parseInt(value, 10);
    const updatedAmount = isNaN(numericValue) ? 0 : numericValue;
    setAmount(updatedAmount);
    onAmountChange(updatedAmount); // Notify the parent of the change
  };

  const incrementAmount = (value: number): void => {
    const updatedAmount = amount + value;
    setAmount(updatedAmount);
    onAmountChange(updatedAmount); // Notify the parent of the change
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
  };

  return (
    <VStack space="lg" className="py-2">
      <Text size="lg" className="font-semibold">
        Enter Amount
      </Text>
      <TextInput
        style={{
          fontSize: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          paddingVertical: 4,
          marginBottom: 8,
        }}
        placeholder="Enter Amount"
        value={amount.toString()}
        onChangeText={handleInputChange}
        onSubmitEditing={handleKeyPress}
        returnKeyType="done"
        keyboardType="numeric"
      />
      <HStack space="lg" className="space-between">
        {[100, 250, 500, 1000].map((value) => (
          <Button
            key={value}
            variant="outline"
            size="md"
            onPress={() => incrementAmount(value)}
          >
            <ButtonText>+{value}</ButtonText>
          </Button>
        ))}
      </HStack>
    </VStack>
  );
};

export default EnterAmountComponent;
