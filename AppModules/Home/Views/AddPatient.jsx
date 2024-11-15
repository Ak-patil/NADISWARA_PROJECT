import { Text, VStack } from "@/components/ui";
import { useState } from "react";

const AddPatient = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  return (
    <VStack className="w-full flex-1 bg-white px-[16px]">
      <Text>Hello world</Text>
    </VStack>
  );
};

export default AddPatient;
