import { Button, ButtonText, Text, VStack } from "@/components/ui";
import { Divider } from "@/components/ui/divider";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@/components/ui/slider";
import { handleNavigation } from "@/nadiswaraPro/Navigation/NaviagationHelper";
import { CircleIcon } from "lucide-react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type FormData = {
  urineColor: number;
  urinationTimes: number;
  sleepPattern: string;
  backPain: string;
};

const urineColors = [
  { label: "Transparent", color: "#E9F6FF" }, // Indicates overhydration
  { label: "Pale Yellow", color: "#F7FFAF" }, // Healthy hydration
  { label: "Yellow", color: "#FFF200" }, // Normal hydration
  { label: "Dark Yellow", color: "#FFC300" }, // Mild dehydration
  { label: "Amber", color: "#FFB74D" }, // Dehydration
  { label: "Brown", color: "#8B4513" }, // Severe dehydration or liver issue
];

const sleepOptions = [
  { label: "Disturbed Occasionally", value: "Disturbed" },
  { label: "Late Sleep", value: "Late Sleep" },
  { label: "Normal Sleep", value: "Normal" },
  { label: "Hard to get Sleep", value: "Hard Sleep" },
];

const backPainOptions = ["Sometimes", "Always", "No"];

export const FormOne: React.FC = () => {
  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      urineColor: 50,
      urinationTimes: 1,
      sleepPattern: "",
      backPain: "",
    },
  });

  const urineColor = watch("urineColor");
  const currentColor = urineColors[Math.round(urineColor / 25)].color;

  const onSubmit = (data: FormData) => {
    console.log("Form Data: ", data);
    handleNavigation("FormTwo");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 bg-white p-6"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack className="flex-1 bg-white mt-4" space="2xl">
          {/* Urine Color */}
          <VStack
            space="2xl"
            className="w-full h-[198px] bg-white rounded-[20px] border border-[#ededed] p-6 justify-center"
          >
            <Text className="text-[#0f0f0f] text-2xl font-medium">
              What is the color of your urine most often?
            </Text>
            <Controller
              name="urineColor"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Slider
                  onChange={onChange}
                  defaultValue={25}
                  size="md"
                  value={value}
                  orientation="horizontal"
                  isDisabled={false}
                  isReversed={false}
                >
                  <SliderTrack className="bg-[#e9e6fa] h-3">
                    <SliderFilledTrack
                      style={{ backgroundColor: currentColor }}
                    />
                  </SliderTrack>
                  <SliderThumb
                    size="lg"
                    className="w-[30px] h-[30px] bg-[#6a1b58] rounded-full shadow border-2 border-[#e9e6fa]"
                    style={{ backgroundColor: currentColor }}
                  />
                </Slider>
              )}
            />
            <Text size="lg" className="text-[#848484] font-medium">
              Answer: {urineColors[Math.round(urineColor / 25)].label}
            </Text>
          </VStack>

          {/* Urination Times */}
          <VStack
            space="2xl"
            className="w-full h-[198px] bg-white rounded-[20px] border border-[#ededed] p-6 justify-center"
          >
            <Text className="text-[#0f0f0f] text-2xl font-medium">
              How many times do you urinate at night?
            </Text>
            <Controller
              name="urinationTimes"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Slider
                  minValue={0}
                  maxValue={5}
                  onChange={onChange}
                  defaultValue={30}
                  step={1}
                  size="md"
                  value={value}
                  orientation="horizontal"
                  isDisabled={false}
                  isReversed={false}
                >
                  <SliderTrack className="bg-[#e9e6fa] h-3">
                    <SliderFilledTrack className="bg-primary-prime" />
                  </SliderTrack>
                  <SliderThumb
                    size="lg"
                    className="w-[30px] h-[30px] bg-[#6a1b58] rounded-full shadow border-2 border-white"
                  />
                </Slider>
              )}
            />
            <Text size="lg" className="text-[#848484] font-medium">
              Answer: {watch("urinationTimes")} times
            </Text>
          </VStack>

          {/* Sleep Pattern */}
          <VStack
            space="2xl"
            className="w-full h-[280px] bg-white rounded-[20px] border border-[#ededed] p-6 justify-center"
          >
            <Text className="text-[#0f0f0f] text-2xl font-medium">
              How would you describe your sleep pattern?
            </Text>
            <Controller
              name="sleepPattern"
              control={control}
              render={({ field: { value, onChange } }) => (
                <View style={styles.optionContainer}>
                  {sleepOptions.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.option,
                        value === option.value && styles.optionSelected,
                      ]}
                      className="bg-white rounded-2xl border border-[#dedede]"
                      onPress={() => onChange(option.value)}
                    >
                      <Text
                        className="text-center text-[#6a1a57] text-xl font-medium"
                        style={
                          value === option.value && styles.optionTextSelected
                        }
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            />
          </VStack>

          {/* Back Pain */}

          <VStack className="w-full h-1/5 bg-white rounded-[20px] border border-[#ededed] p-6">
            <Text className="text-[#0f0f0f] text-2xl font-medium">
              Do you experience back pain?
            </Text>
            <Controller
              name="backPain"
              control={control}
              render={({ field: { value, onChange } }) => (
                <>
                  {backPainOptions.map((option) => (
                    <>
                      <RadioGroup value={value} onChange={onChange}>
                        <Radio value={option} size="md" className="py-1 mt-2">
                          <RadioIndicator className="border-primary-prime">
                            <RadioIcon
                              as={CircleIcon}
                              className="color-primary-prime"
                            />
                          </RadioIndicator>
                          <RadioLabel className="text-[#0f0f0f] text-xl font-normal">
                            {option}
                          </RadioLabel>
                        </Radio>
                      </RadioGroup>
                      {option !== "No" && (
                        <Divider className="bg-[#ededed] my-1" />
                      )}
                    </>
                  ))}
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
          <ButtonText className="font-medium">Continue</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  option: {
    width: "48%",
    height: 80,
    margin: "1%",
    justifyContent: "center",
    alignItems: "center",
  },
  optionSelected: {
    backgroundColor: "#6a1a57",
  },

  optionTextSelected: {
    color: "#fff",
  },
});
