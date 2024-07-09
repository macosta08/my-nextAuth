import {
  Field,
  FieldType,
  FileField,
} from '@/components/AtomicDesign/Organisms/AutoForm/types';

/**
 * Uploads a file to S3.
 * @param {Object} params - The parameters for the upload.
 * @param {File} params.file - The file to upload.
 * @param {string} params.url - The URL to upload the file to.
 * @returns {Promise<Object>} The result of the upload operation.
 */
const uploadFileToS3 = async ({ file, url }: { file: File; url: string }) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type, // Set the content type to the file's MIME type
      },
      body: file, // The file data to upload
    });

    if (response.ok) {
      return {
        uploaded: true,
        message: 'File uploaded successfully', // Success message
      };
    } else {
      return {
        uploaded: false,
        message: `Failed to upload file: ${response.statusText}`, // Failure message with status text
      };
    }
  } catch (error) {
    return {
      uploaded: false,
      message: `Failed to upload file: ${error}`, // Error message
    };
  }
};

/**
 * Uploads form data to S3, handling file fields separately.
 * @param {Object} params - The parameters for the upload.
 * @param {Field[]} params.fields - The fields of the form.
 * @param {Object} params.values - The values of the form.
 * @returns {Promise<Object>} The updated form values with uploaded file information.
 */
const uploadFormDataToS3 = async ({
  fields,
  values,
}: {
  fields: Field[];
  values: Record<string, string | number | object>;
}) => {
  const v = { ...values }; // Clone the values object
  await Promise.all(
    fields
      .filter((field) => field.inputType === FieldType.FILE) // Filter file fields
      .map(async (field) => {
        const fieldValues = values[field.name];
        const f = field as FileField;

        if (Array.isArray(fieldValues)) {
          const uploadResponses = await Promise.all(
            fieldValues.map(async (fv: { file: File; url: string }) => {
              const r = await uploadFileToS3({ ...fv });
              if (r.uploaded) {
                return {
                  [f.pathKey ?? 'path']: `${f.path}/${fv.file.name}`, // Construct file path
                  name: fv.file.name, // File name
                };
              }
              // TODO: handle upload error
            })
          );

          v[field.name] = uploadResponses; // Update values with upload responses
        } else {
          const fv = fieldValues as { file: File; url: string };
          const uploadResponse = await uploadFileToS3(fv);
          if (uploadResponse.uploaded) {
            v[f.name] = {
              [f.pathKey ?? 'path']: `${f.path}/${fv.file.name}`, // Construct file path
              name: fv.file.name, // File name
            };
          }
          // TODO: handle upload error?
        }
      })
  );

  return v; // Return updated values
};

export { uploadFileToS3, uploadFormDataToS3 };
