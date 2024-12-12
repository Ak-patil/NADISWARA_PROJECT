import { Button, ButtonText, Text, VStack } from "@/components/ui";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { handleNavigation } from "@/nadiswaraPro/Navigation/NaviagationHelper";
import { ChevronDownIcon } from "lucide-react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";

type FormData = {
  chestPain?: string;
  dizziness?: string;
  liver?: string;
  abdomen?: string;
};

const options = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
  { label: "Occasionally", value: "occasionally" },
];

export const Symptoms: React.FC = () => {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      chestPain: "",
      dizziness: "",
      liver: "",
      abdomen: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("data", data);
    handleNavigation("FormTwo");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack className="flex-1 bg-white mt-32" space="xl">
          <VStack
            space="4xl"
            className="w-full flex-1 bg-white p-6 justify-between"
          >
            <Text className="text-primary-prime text-2xl font-ClashMedium">
              Heart symptoms{" "}
              <Text className="text-text-text2 text-2xl font-ClashRegular">
                (Optional)
              </Text>
            </Text>
            <Text className="text-text-text1 text-xl font-ClashMedium">
              Do you experience chest pain or discomfort?
            </Text>
            <Controller
              name="chestPain"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select selectedValue={value} onValueChange={onChange}>
                  <SelectTrigger
                    variant="underlined"
                    size="md"
                    className="justify-between"
                  >
                    <SelectInput
                      size="lg"
                      placeholder="Select answer"
                      className="font-ClashRegular text-text-text1"
                    />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {options.map((option) => (
                        <SelectItem
                          className="text-base font-ClashRegular text-text-text1"
                          key={option.value}
                          label={option.label}
                          value={option.value}
                        />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              )}
            />

            <Text className="text-text-text1 text-xl font-ClashMedium">
              Do you ever feel lightheaded, dizzy, or faint, especially when
              standing up?
            </Text>
            <Controller
              name="dizziness"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select selectedValue={value} onValueChange={onChange}>
                  <SelectTrigger
                    variant="underlined"
                    size="md"
                    className="justify-between"
                  >
                    <SelectInput
                      size="lg"
                      placeholder="Select answer"
                      className="font-ClashRegular text-text-text1"
                    />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {options.map((option) => (
                        <SelectItem
                          className="text-base font-ClashRegular text-text-text1"
                          key={option.value}
                          label={option.label}
                          value={option.value}
                        />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              )}
            />

            <Text className="text-primary-prime text-2xl font-ClashMedium">
              Liver symptoms{" "}
              <Text className="text-text-text2 text-2xl font-ClashRegular">
                (Optional)
              </Text>
            </Text>
            <Text className="text-text-text1 text-xl font-ClashMedium">
              Have you noticed any yellowing of your skin or eyes (jaundice)?
            </Text>
            <Controller
              name="liver"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select selectedValue={value} onValueChange={onChange}>
                  <SelectTrigger
                    variant="underlined"
                    size="md"
                    className="justify-between"
                  >
                    <SelectInput
                      size="lg"
                      placeholder="Select answer"
                      className="font-ClashRegular text-text-text1"
                    />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {options.map((option) => (
                        <SelectItem
                          className="text-base font-ClashRegular text-text-text1"
                          key={option.value}
                          label={option.label}
                          value={option.value}
                        />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              )}
            />

            <Text className="text-text-text1 text-xl font-ClashMedium">
              Do you experience pain or discomfort in the upper right side of
              your abdomen?
            </Text>
            <Controller
              name="abdomen"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select selectedValue={value} onValueChange={onChange}>
                  <SelectTrigger
                    variant="underlined"
                    size="md"
                    className="justify-between"
                  >
                    <SelectInput
                      size="lg"
                      placeholder="Select answer"
                      className="font-ClashRegular text-text-text1"
                    />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {options.map((option) => (
                        <SelectItem
                          className="text-base font-ClashRegular text-text-text1"
                          key={option.value}
                          label={option.label}
                          value={option.value}
                        />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
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
