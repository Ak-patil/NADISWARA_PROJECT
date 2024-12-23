import {
  Button,
  ButtonText,
  CheckIcon,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  VStack,
} from "@/components/ui";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import { CircleIcon } from "lucide-react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { Text } from "@/components/ui";
import { Divider } from "@/components/ui/divider";
import { handleNavigation } from "@/nadiswaraPro/Navigation/NaviagationHelper";

interface FormValues {
  hungerLevel: string;
  bowelMovements: string;
  numbness: string;
  headache: string;
  headacheTypes: string[];
}

export const FormTwo: React.FC = () => {
  const { control, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      hungerLevel: "",
      bowelMovements: "",
      numbness: "",
      headache: "",
      headacheTypes: [],
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    handleNavigation("DeviceConnection");
  };

  const headache = watch("headache");

  const headacheOptions = [
    "Back of the Head",
    "One Side of the Head",
    "Top of the Head",
    "Forehead Headache",
    "Whole Head",
  ];

  const toggleCheckbox = (value: string, selectedItems: string[]): string[] => {
    if (selectedItems.includes(value)) {
      return selectedItems.filter((item) => item !== value);
    }
    return [...selectedItems, value];
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 bg-white p-6"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack className="flex-1 bg-white mt-4" space="xl">
          <VStack className="w-full h-[260px] bg-white rounded-[20px] border border-[#ededed] p-6">
            <Text className="text-text-text1 text-2xl font-ClashMedium">
              How would you describe your hunger levels?
            </Text>
            <Controller
              name="hungerLevel"
              control={control}
              rules={{ required: "Please select your hunger level" }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <>
                  {[
                    "No Hunger",
                    "Less Hunger",
                    "Normal Hunger",
                    "More Hunger",
                  ].map((option) => (
                    <>
                      <RadioGroup value={value} onChange={onChange}>
                        <Radio value={option} size="md" className="py-1 mt-2">
                          <RadioIndicator className="border-primary-prime">
                            <RadioIcon
                              as={CircleIcon}
                              className="color-primary-prime"
                            />
                          </RadioIndicator>
                          <RadioLabel className="text-text-text1 text-xl font-ClashRegular">
                            {option}
                          </RadioLabel>
                        </Radio>
                      </RadioGroup>
                      {option !== "More Hunger" && (
                        <Divider className="bg-[#ededed] my-1" />
                      )}
                    </>
                  ))}
                  {error && (
                    <Text className="text-red-600 mt-2">{error.message}</Text>
                  )}
                </>
              )}
            />
          </VStack>

          {/* Bowel Movements */}
          <VStack className="w-full h-[310px] bg-white rounded-[20px] border border-[#ededed] p-6">
            <Text className="text-text-text1 text-2xl font-ClashMedium">
              How would you describe your bowel movements?
            </Text>
            <Controller
              name="bowelMovements"
              control={control}
              rules={{ required: "Please describe your bowel movements" }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <>
                  {[
                    "Constipated Sometimes",
                    "Constipated Always",
                    "Normal Bowel",
                    "Sometimes Loose Stools",
                    "Always Loose Stools",
                  ].map((option) => (
                    <>
                      <RadioGroup value={value} onChange={onChange}>
                        <Radio value={option} size="md" className="py-1 mt-2">
                          <RadioIndicator className="border-primary-prime">
                            <RadioIcon
                              as={CircleIcon}
                              className="color-primary-prime"
                            />
                          </RadioIndicator>
                          <RadioLabel className="text-text-text1 text-xl font-ClashRegular">
                            {option}
                          </RadioLabel>
                        </Radio>
                      </RadioGroup>
                      {option !== "Always Loose Stools" && (
                        <Divider className="bg-[#ededed] my-1" />
                      )}
                    </>
                  ))}
                  {error && (
                    <Text className="text-red-600 mt-2">{error.message}</Text>
                  )}
                </>
              )}
            />
          </VStack>

          {/* Numbness */}
          <VStack className="w-full h-[190px] bg-white rounded-[20px] border border-[#ededed] p-6">
            <Text className="text-text-text1 text-2xl font-ClashMedium">
              Do you experience numbness?
            </Text>
            <Controller
              name="numbness"
              control={control}
              rules={{ required: "Please describe your numbness" }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <>
                  {[
                    "Not Feeling Numbness",
                    "Sometimes Numbness",
                    "Always Numbness",
                  ].map((option) => (
                    <>
                      <RadioGroup value={value} onChange={onChange}>
                        <Radio value={option} size="md" className="py-1 mt-2">
                          <RadioIndicator className="border-primary-prime">
                            <RadioIcon
                              as={CircleIcon}
                              className="color-primary-prime"
                            />
                          </RadioIndicator>
                          <RadioLabel className="text-text-text1 text-xl font-ClashRegular">
                            {option}
                          </RadioLabel>
                        </Radio>
                      </RadioGroup>
                      {option !== "Always Numbness" && (
                        <Divider className="bg-[#ededed] my-1" />
                      )}
                    </>
                  ))}
                  {error && (
                    <Text className="text-red-600 mt-2">{error.message}</Text>
                  )}
                </>
              )}
            />
          </VStack>

          {/* Headaches */}
          <VStack className="w-full h-1/4 bg-white rounded-[20px] border border-[#ededed] p-6">
            <Text className="text-text-text1 text-2xl font-ClashMedium">
              Do you experience headaches?
            </Text>
            <Controller
              name="headache"
              control={control}
              rules={{ required: "Please describe your headache" }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <>
                  {["Not Feeling Headache", "Feeling Headache"].map(
                    (option) => (
                      <VStack key={option}>
                        <>
                          <RadioGroup
                            value={value}
                            onChange={(newValue) => {
                              onChange(newValue);

                              // Reset headacheTypes if "Not Feeling Headache" is selected
                              if (newValue === "Not Feeling Headache") {
                                setValue("headacheTypes", []); // Reset to empty array
                              }
                            }}
                          >
                            <Radio
                              value={option}
                              size="md"
                              className="py-1 mt-2"
                            >
                              <RadioIndicator className="border-primary-prime">
                                <RadioIcon
                                  as={CircleIcon}
                                  className="color-primary-prime"
                                />
                              </RadioIndicator>
                              <RadioLabel className="text-text-text1 text-xl font-ClashRegular">
                                {option}
                              </RadioLabel>
                            </Radio>
                          </RadioGroup>
                          {option !== "Feeling Headache" && (
                            <Divider className="bg-[#ededed] my-1" />
                          )}
                        </>

                        {/* Show headache types if 'Feeling Headache' is selected */}
                        {option === "Feeling Headache" &&
                          value === "Feeling Headache" && (
                            <Controller
                              name="headacheTypes"
                              control={control}
                              render={({
                                field: { value: selectedValues = [], onChange },
                              }) => (
                                <VStack className="pl-6">
                                  {headacheOptions.map((headacheOption) => (
                                    <Checkbox
                                      key={headacheOption}
                                      value={headacheOption}
                                      isChecked={selectedValues.includes(
                                        headacheOption
                                      )}
                                      onChange={() => {
                                        const updatedValues = toggleCheckbox(
                                          headacheOption,
                                          selectedValues
                                        );
                                        onChange(updatedValues); // Update the state
                                      }}
                                    >
                                      <CheckboxIndicator className="border-primary-prime">
                                        <CheckboxIcon
                                          as={CheckIcon}
                                          className="color-primary-prime"
                                        />
                                      </CheckboxIndicator>
                                      <CheckboxLabel className="text-[#0f0f0f] text-lg font-normal">
                                        {headacheOption}
                                      </CheckboxLabel>
                                    </Checkbox>
                                  ))}
                                </VStack>
                              )}
                            />
                          )}
                      </VStack>
                    )
                  )}
                  {error && (
                    <Text className="text-red-600 mt-2">{error.message}</Text>
                  )}
                </>
              )}
            />
          </VStack>
        </VStack>
      </ScrollView>

      <VStack className="pb-8 bg-white mt-1 p-6">
        <Button
          size="xl"
          variant="solid"
          action="primary"
          className="w-full"
          onPress={handleSubmit(onSubmit)}
        >
          <ButtonText className="font-ClashMedium">Continue</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
};
