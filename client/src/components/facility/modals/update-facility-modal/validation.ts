import { AnyObject, ObjectSchema, array, object, string } from 'yup';

export type UpdateFacilityFormValues = {
  name?: string;
  address?: string;
  code?: string;
  farmProductTypes?: string[];
};

export const updateFacilityDefaultValues: UpdateFacilityFormValues = {
  name: '',
  address: '',
  code: '',
  farmProductTypes: []
};

export const useFacilityUpdateFormSchema = (): ObjectSchema<
  UpdateFacilityFormValues,
  AnyObject,
  {
    name: undefined;
    address: undefined;
    code: undefined;
    farmProductTypes: '';
  },
  ''
> => {
  return object({
    name: string().min(3, 'Name must be at least 3 characters'),
    address: string().min(3, 'Address must be at least 3 characters'),
    code: string().matches(/^\d{8}$/, 'Must be valid EDRPOU'),
    farmProductTypes: array().of(string().required()).required()
  });
};