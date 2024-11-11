import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomBackHeader from "../../../BaseModule/Custom/CustomBackHeader";
import { appendObjectToForm } from "../../../BaseModule/Utils/helpers";
import { updateProfileRequest } from "../Redux/Actions/MyprofileAction";
import { getProfileDataSelector } from "../Redux/Reducer/MyprofileSelector";
import { styles } from "../Style/ProfileScreenStyles/EditProfileScreen.styles";

const EditProfile = () => {
  const dispatch = useDispatch();
  const profileState = useSelector((state) => getProfileDataSelector(state));

  const [profileInfo, setProfileInfo] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    age: "",
    gender: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (profileState?.data?.data) {
      const { user_name, phone_number, age, gender, address, email } =
        profileState.data.data;
      setProfileInfo({
        name: user_name || "",
        email: email || "",
        phone_number: phone_number || "",
        address: address || "",
        age: age || "",
        gender: gender || "",
      });
    }
  }, [profileState]);

  const handleProfileInfo = async () => {
    const { name, email, phone_number, address, age, gender } = profileInfo;

    const profileData = {
      user_name: name,
      gender: gender,
      age: age,
      photo_uri: null,
      phone_number: phone_number,
    };
    const updatedForm = appendObjectToForm(profileData);
    dispatch(updateProfileRequest(updatedForm));
  };

  return (
    <>
      <LinearGradient
        colors={["#E5ECF9", "#F6F7F9"]}
        style={styles.mainContainer}
      >
        <CustomBackHeader>Edit Profile</CustomBackHeader>
      </LinearGradient>
    </>
  );
};

export default EditProfile;
