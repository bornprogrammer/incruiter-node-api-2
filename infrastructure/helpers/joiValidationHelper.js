import BadRequestError from "../errors/BadRequestError.js";

const joiValidationHelper = (joiSchema, input) => {
  const valiatedVals = joiSchema.validate(input);
  if (valiatedVals?.error) {
    throw new BadRequestError(valiatedVals?.error?.details[0]?.message);
  }
  return valiatedVals.value;
};
export default joiValidationHelper;