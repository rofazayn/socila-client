import * as Yup from 'yup';

const vSchema = Yup.object().shape({
  body: Yup.string()
    .required(`Huh! but it's blank`)
    .min(20, 'Post is too short.')
    .max(280, 'Post is too long.')
});

export default vSchema;
