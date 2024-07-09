import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useMutation, useQuery } from '@apollo/client';
import * as Yup from 'yup';
import { useToast } from '@/components/AtomicDesign/Atoms/Shadcn/use-toast';
import _ from 'lodash';

// Import utilities
import { getMainQueryName } from '@/utils/apollo/queryParser';
import { getValidationSchema } from './validationSchema';

// Import components custom
import { Button } from '@/components/AtomicDesign/Atoms/Buttons/Button';

// Import of custom hooks
import { useGetRouterId } from '@/hooks/useGetRouterId';

// Import of types
import { FieldType, AutoFormProps } from './types';
import { FormField } from './Fields';
import { uploadFormDataToS3 } from './utils';

// Props types of component

const AutoForm = ({
  fieldGroups,
  mutationData,
  initialData,
  successMessage,
  errorMessage,
  onSuccess,
  disabledButton,
}: AutoFormProps) => {
  const id = useGetRouterId();
  const router = useRouter();

  const fields = useMemo(
    () => fieldGroups.flatMap((group) => group.fields),
    [fieldGroups]
  );

  const { toast } = useToast();

  const mainQueryName = getMainQueryName(initialData.query);
  const { data, loading } = useQuery(initialData.query, {
    variables: initialData.variables,
    skip: !initialData.variables,
  });
  const [mutate, { loading: mutationLoading }] = useMutation(
    mutationData.mutation,
    {
      refetchQueries: mutationData.refetchQueries,
    }
  );

  const initialValues = useMemo(() => {
    if (!data) return {};

    const mainData = data[mainQueryName ?? ''] || {};
    return fields.reduce(
      (values, field) => {
        if (field.dataPath) {
          values[field.name] = _.get(mainData, field.dataPath, '');
        } else {
          values[field.name] = mainData[field.name] ?? '';
        }
        return values;
      },
      {} as Record<string, string | number | object>
    );
  }, [data, mainQueryName, fields]);

  const validationSchema = useMemo(
    () =>
      Yup.object(
        fields.reduce(getValidationSchema, {} as Record<string, Yup.AnySchema>)
      ),
    [fields]
  );

  const onSubmit = async (v: Record<string, string | number | object>) => {
    try {
      let values = { ...v };

      delete values[''];

      if (fields.filter((el) => el.inputType === FieldType.FILE).length > 0) {
        // upload files using the presigned URL
        values = await uploadFormDataToS3({ fields, values });
      }

      const transformedValues = _.reduce(
        fields,

        (acc, field) => {
          if (field.ignoreOnMutation) {
            return acc; // Skip this field and continue with the next one
          }

          let vl = values[field.name];

          if (field?.inputType === FieldType.NUMBER) {
            vl = Number(vl as string);
          }

          if (field?.mutationShape) {
            _.set(acc, field.mutationShape, vl);
          } else {
            acc[field.name] = vl;
          }

          return acc;
        },

        {} as Record<string, string | number | object>
      );

      const result = await mutate({
        variables: {
          where: { ...mutationData.variables.where },
          data: { ...transformedValues, ...mutationData.variables.data },
        },
      });

      toast({
        title: 'Notification:',
        description: successMessage ?? 'Data updated successfully',
      });

      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error) {
      toast({
        title: 'Notification:',
        description: `${errorMessage ?? 'An error occurred with this request'}: ${error}`,
        variant: 'destructive',
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={formik.handleSubmit} className='space-y-5'>
      <div className='form__container'>
        {fieldGroups.map((group) => (
          <div key={group.title} className='flex flex-col gap-2'>
            <h2>{group.title}</h2>
            {group.fields.map((field) => (
              <FormField
                key={field.name}
                field={field}
                formik={formik}
                initialValue={
                  (formik.initialValues[field.name] as string) ?? ''
                }
                error={formik.errors[field.name] ?? ''}
              />
            ))}
          </div>
        ))}
        <div className='form__container--button'>
          <Button
            text='Cancel'
            onClick={() => router?.back()}
            extraClassName='form__button'
          />
          <Button
            type='submit'
            text={id === undefined ? 'Save' : 'Update'}
            primary
            extraClassName='form__button'
            loading={mutationLoading}
            disabled={disabledButton}
          />
        </div>
      </div>
    </form>
  );
};

export { AutoForm };
