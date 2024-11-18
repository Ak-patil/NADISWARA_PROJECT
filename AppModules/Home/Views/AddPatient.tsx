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
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleIcon } from "lucide-react-native";
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
          phone_number: "9234567890",
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
              <FormControlLabelText size="lg">First Name</FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field: { onChange, onBlur, value } }) => (
                <Input size="lg">
                  <InputField
                    className="text-md"
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
              <FormControlLabelText className="text-red-400">
                {errors.firstName.message}
              </FormControlLabelText>
            )}
          </FormControl>

          {/* Last Name Input */}
          <FormControl className="w-full">
            <FormControlLabel>
              <FormControlLabelText size="lg">Last Name</FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field: { onChange, onBlur, value } }) => (
                <Input size="lg">
                  <InputField
                    className="text-base"
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
              <FormControlLabelText className="text-red-400">
                {errors.lastName.message}
              </FormControlLabelText>
            )}
          </FormControl>

          {/* Date of Birth Input */}
          <FormControl className="w-full">
            <FormControlLabel>
              <FormControlLabelText size="lg">
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
                    className="text-base"
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
              <FormControlLabelText className="text-red-400">
                {errors.dateOfBirth.message}
              </FormControlLabelText>
            )}
          </FormControl>

          {/* Gender Input */}

          <FormControl className="w-full">
            <FormControlLabel>
              <FormControlLabelText size="lg">Gender</FormControlLabelText>
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
                      <RadioLabel className="text-base">Male</RadioLabel>
                    </Radio>
                    <Radio value="Female">
                      <RadioIndicator>
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <RadioLabel className="text-base">Female</RadioLabel>
                    </Radio>
                  </HStack>
                </RadioGroup>
              )}
            />
            {errors.gender && (
              <FormControlLabelText className="text-red-400">
                {errors.gender.message}
              </FormControlLabelText>
            )}
          </FormControl>

          {/* Rest of the form (Last Name, Email, Gender) */}

          {/* Email Input */}
          <FormControl className="w-full">
            <FormControlLabel>
              <FormControlLabelText size="lg">Email</FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field: { onChange, onBlur, value } }) => (
                <Input size="lg">
                  <InputField
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
              <FormControlLabelText className="text-red-400">
                {errors.email.message}
              </FormControlLabelText>
            )}
          </FormControl>

          {/* Other Form Fields (Last Name, Date of Birth, Gender, Email) */}
          {/* ... */}
        </VStack>
      </ScrollView>

      {/* Submit Button */}
      <VStack className="px-[20px] pb-2 bg-white mt-4">
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
            <ButtonText className="font-medium" children={"Add"} />
          )}
        </Button>
      </VStack>
    </VStack>
  );
};

export default AddPatient;
