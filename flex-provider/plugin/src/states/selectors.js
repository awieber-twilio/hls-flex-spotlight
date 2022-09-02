export const mobilePhone = (flexState) => {
  const telecomArray = flexState["hls-emr"].taskState.patientInfo?.telecom
  if (telecomArray) {
    const mobileNumberSearch = telecomArray.find((number) => !!number.value && number.use === "mobile");
    if (mobileNumberSearch) return mobileNumberSearch.value;
  }
  return "111-222-3333"
}