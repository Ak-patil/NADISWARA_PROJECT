import {
  Button,
  ButtonSpinner,
  ButtonText,
  HStack,
  VStack,
} from "@/components/ui";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon, CircleIcon } from "lucide-react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addPatientRequest } from "../../Home/Redux/Actions/HomeAction";
import { addPatientStateSelector } from "../../Home/Redux/Reducer/HomeSelector";

import { z } from "zod";

// Helper function to check valid date in DD-MM-YYYY format
const isValidDate = (dateString: string) => {
  const [day, month, year] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    date <= new Date() // Date should not be in the future
  );
};

// Schema for validation
const addPatientSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  dateOfBirth: z
    .string()
    .regex(/^\d{2}-\d{2}-\d{4}$/, "Date of Birth must be in DD-MM-YYYY format")
    .refine(isValidDate, "Invalid date or date is in the future"),
  gender: z.enum(["Male", "Female"], "Gender is required"),
  email: z.string().min(1, "Email is required").email(),
  phoneNumber: z
    .string()
    .regex(
      /^[6-9]\d{9}$/,
      "Phone number must be a valid 10-digit Indian phone number"
    ),
});

type addPatientSchemaType = z.infer<typeof addPatientSchema>;

const AddPatient = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<addPatientSchemaType>({
    resolver: zodResolver(addPatientSchema),
    defaultValues: {
      gender: "Male", // Initial value for gender
    },
  });
  const dispatch = useDispatch();
  const addPatientState = useSelector((state) =>
    addPatientStateSelector(state)
  );

  const onSubmit = (data: addPatientSchemaType) => {
    if (data) {
      dispatch(
        addPatientRequest({
          name: data.firstName,
          gender: data.gender,
          age: 24,
          dob: "1997-05-03",
          phone_number: data.phoneNumber,
        })
      );
    } else {
      reset();
    }
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  return (
    <VStack className="w-full bg-white flex-1">
      {/* Form Content */}
      <ScrollView>
        <VStack space="4xl" className="px-[20px] pt-11 flex-grow">
          {/* First Name Input */}
          <FormControl className="w-full">
            <FormControlLabel>
              <FormControlLabelText size="lg" className="font-ClashMedium">
                First Name
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field: { onChange, onBlur, value } }) => (
                <Input size="lg">
                  <InputField
                    className="text-md font-ClashRegular"
                    placeholder="Enter First Name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="next"
                  />
                </Input>
              )}
            />
            {errors.firstName && (
              <FormControlLabelText className="text-red-400 font-ClashRegular">
                {errors.firstName.message}
              </FormControlLabelText>
            )}
          </FormControl>

          {/* Last Name Input */}
          <FormControl className="w-full">
            <FormControlLabel>
              <FormControlLabelText size="lg" className="font-ClashMedium">
                Last Name
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field: { onChange, onBlur, value } }) => (
                <Input size="lg">
                  <InputField
                    className="text-base font-ClashRegular"
                    placeholder="Enter Last Name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="next"
                  />
                </Input>
              )}
            />
            {errors.lastName && (
              <FormControlLabelText className="text-red-400 font-ClashRegular">
                {errors.lastName.message}
              </FormControlLabelText>
            )}
          </FormControl>

          {/* Date of Birth Input */}
          <FormControl className="w-full">
            <FormControlLabel>
              <FormControlLabelText size="lg" className="font-ClashMedium">
                Date of Birth
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="dateOfBirth"
              control={control}
              defaultValue=""
              render={({ field: { onChange, onBlur, value } }) => (
                <Input size="lg">
                  <InputField
                    className="text-base font-ClashRegular"
                    placeholder="DD-MM-YYYY"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="next"
                  />
                </Input>
              )}
            />
            {errors.dateOfBirth && (
              <FormControlLabelText className="text-red-400 font-ClashRegular">
                {errors.dateOfBirth.message}
              </FormControlLabelText>
            )}
          </FormControl>

          {/* Gender Input */}

          <FormControl className="w-full">
            <FormControlLabel>
              <FormControlLabelText size="lg" className="font-ClashMedium">
                Gender
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="gender"
              control={control}
              render={({ field: { value, onChange } }) => (
                <RadioGroup value={value} onChange={onChange}>
                  <HStack space="2xl">
                    <Radio value="Male">
                      <RadioIndicator>
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <RadioLabel className="text-base font-ClashRegular">
                        Male
                      </RadioLabel>
                    </Radio>
                    <Radio value="Female">
                      <RadioIndicator>
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <RadioLabel className="text-base font-ClashRegular">
                        Female
                      </RadioLabel>
                    </Radio>
                  </HStack>
                </RadioGroup>
              )}
            />
            {errors.gender && (
              <FormControlLabelText className="text-red-400 font-ClashRegular">
                {errors.gender.message}
              </FormControlLabelText>
            )}
          </FormControl>

          {/* Rest of the form (Last Name, Email, Gender) */}

          {/* Email Input */}
          <FormControl className="w-full">
            <FormControlLabel>
              <FormControlLabelText size="lg" className="font-ClashMedium">
                Email (optional)
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field: { onChange, onBlur, value } }) => (
                <Input size="lg">
                  <InputField
                    className="text-base font-ClashRegular"
                    placeholder="Enter email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="next"
                  />
                </Input>
              )}
            />
            {errors.email && (
              <FormControlLabelText className="text-red-400 font-ClashRegular">
                {errors.email.message}
              </FormControlLabelText>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.phoneNumber}>
            <FormControlLabel className="mb-2">
              <FormControlLabelText size="lg" className="font-ClashMedium">
                Phone number
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await addPatientSchema.parseAsync({ phoneNumber: value });
                    return true;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <HStack className="gap-1">
                  <Select className="w-[20%]">
                    <SelectTrigger variant="outline" size="lg">
                      <SelectInput
                        placeholder="+91"
                        className="font-ClashRegular"
                      />
                      <SelectIcon className="mr-1" as={ChevronDownIcon} />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <SelectItem label="+91" value="+91" />
                        <SelectItem label="+1" value="+1" />
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                  <Input size="lg" className="flex-1">
                    <InputField
                      className="text-sm font-ClashRegular"
                      placeholder="999*******"
                      type="text"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="number-pad"
                      onBlur={onBlur}
                      onSubmitEditing={handleKeyPress}
                      returnKeyType="done"
                    />
                  </Input>
                </HStack>
              )}
            />
            {errors.phoneNumber && (
              <FormControlLabelText className="text-red-400 font-ClashRegular">
                {errors.phoneNumber.message}
              </FormControlLabelText>
            )}
          </FormControl>
        </VStack>
      </ScrollView>

      {/* Submit Button */}
      <VStack className="px-[20px] pb-2 bg-white mt-8">
        <Button
          size="xl"
          variant="solid"
          action="primary"
          className="w-full"
          onPress={handleSubmit(onSubmit)}
        >
          {addPatientState?.isLoading ? (
            <ButtonSpinner color={"#FFFFFF"} />
          ) : (
            <ButtonText
              size="lg"
              className="font-ClashMedium"
              children={"Add"}
            />
          )}
        </Button>
      </VStack>
    </VStack>
  );
};

export default AddPatient;
