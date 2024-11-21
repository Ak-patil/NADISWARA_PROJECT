import { Button, ButtonText, HStack, Text, VStack } from "@/components/ui";
import React, { useState } from "react";
import { TextInput } from "react-native";

const EnterAmountComponent: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);

  const handleInputChange = (value: string): void => {
    const numericValue = parseInt(value, 10);
    setAmount(isNaN(numericValue) ? 0 : numericValue);
  };

  const incrementAmount = (value: number): void => {
    setAmount((prevAmount) => prevAmount + value);
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
