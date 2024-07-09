import { Button } from '@/components/AtomicDesign/Atoms/Buttons/Button';
import {
  FileField,
  FileObject,
  FormikInput,
  PresignedURL,
} from '@/components/AtomicDesign/Organisms/AutoForm/types';
import {
  GET_MULTIPLE_SIGNED_URLS_FOR_UPLOAD,
  GET_SIGNED_URL_FOR_UPLOAD,
} from '@/graphql/queries/common';
import { useLazyQuery } from '@apollo/client';
import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import { useState } from 'react';

/**
 * Component for handling file input with formik and presigned URL upload.
 * @param {Object} props - The component props.
 * @param {FileField} props.field - The file field configuration.
 * @param {FormikInput} props.formik - The Formik input props.
 * @param {string} props.error - The error message.
 */
const FileInputComponent = ({
  field,
  formik,
  error,
  initialValue,
}: {
  field: FileField;
  formik: FormikInput;
  error: string;
  initialValue?: FileObject | FileObject[] | undefined;
}) => {
  const [editMode, setEditMode] = useState(initialValue ? false : true);

  // Hook to fetch a single signed URL for file upload
  const [getSignedURL] = useLazyQuery<{ getSignedUrlForUpload: PresignedURL }>(
    GET_SIGNED_URL_FOR_UPLOAD
  );
  // Hook to fetch multiple signed URLs for file uploads
  const [getMultipleSignedURLs] = useLazyQuery<{
    getMultipleSignedUrlsForUpload: PresignedURL[];
  }>(GET_MULTIPLE_SIGNED_URLS_FOR_UPLOAD);

  /**
   * Handler for file input change event.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (field.isMulti && files) {
      // Fetch signed URLs for multiple files
      const signedURLs = await getMultipleSignedURLs({
        variables: {
          files: Array.from(files).map((file) => `${field.path}/${file.name}`),
        },
      });

      // Map files to their corresponding signed URLs
      const filesAndUrls = Array.from(files).map((file) => ({
        file,
        url: signedURLs.data?.getMultipleSignedUrlsForUpload?.find(
          (urlData) => urlData.fileName === `${field.path}/${file.name}`
        )?.url,
      }));

      // Set the field value with the files and their URLs
      formik.setFieldValue(field.name, filesAndUrls);
    }

    if (!field.isMulti && files) {
      // Fetch a signed URL for a single file
      const signedURL = await getSignedURL({
        variables: {
          file: `${field.path}/${files[0].name}`,
        },
      });

      // Set the field value with the file and its URL
      formik.setFieldValue(field.name, {
        url: signedURL.data?.getSignedUrlForUpload.url,
        file: files[0],
      });
    }
  };

  return (
    <div className='flex flex-col '>
      {editMode ? (
        <div>
          <div className='h-full w-full shadow-lg border border-t-0 border-x-0 border-secondary-gray rounded-2xl'>
            <h2 className='text-center'>{field.label}</h2>

            <div className=' p-5 h-full'>
              <div className=' relative flex flex-col p-4  border h-[80%] bg-[#F8F8FF] rounded-md border-dashed border-[#384EB7]'>
                <input
                  type='file'
                  multiple={field.isMulti}
                  onChange={onChange}
                  name={field.name}
                  accept={field.accept}
                  required={field.required}
                  disabled={field.disabled}
                  className='absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer '
                />

                <div className='flex p-3 my-auto flex-col items-center justify-center py-10 text-center'>
                  <Icon
                    className='text-[#F7D046] text-7xl'
                    icon={'mdi-light:cloud-upload'}
                  />
                  <p className='m-0 font-bold text-md text-black font-montserrat text-md '>
                    Drag & drop files or{' '}
                    <span className='text-[#F7D046]'> Browse</span>
                  </p>
                  <p className='text-black mt-5 font-montserrat text-sm font-normal'>
                    Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word,
                    PPT
                  </p>
                </div>
              </div>
              <div className='flex justify-center my-5'>
                <Button
                  type='button'
                  onClick={() =>
                    (
                      document.querySelector(
                        `input[name="${field.name}"]`
                      ) as HTMLInputElement
                    ).click()
                  }
                  text='Select Media'
                  primary={true}
                ></Button>
              </div>
            </div>

            <span>{error}</span>
          </div>
          {initialValue && (
            <Button
              type='button'
              onClick={() => setEditMode(false)}
              text='Cancel'
            ></Button>
          )}
        </div>
      ) : (
        <div>
          <RenderUploadedFiles
            initialValues={initialValue}
            isMulti={field.isMulti}
          />
          <Button
            type='button'
            onClick={() => setEditMode(true)}
            text={field.isMulti ? 'Update files' : 'Update file'}
          ></Button>
        </div>
      )}
    </div>
  );
};

const extractFileName = (url: string) => {
  const regex = /\/([^/?]+)\?/;
  const match = url.match(regex);
  return match ? decodeURIComponent(match[1]) : null;
};

const RenderUploadedFiles = ({
  initialValues,
  isMulti,
}: {
  initialValues: FileObject | FileObject[] | undefined;
  isMulti?: boolean;
}) => {
  if (isMulti) {
    return (
      <div className='flex flex-wrap'>
        {(initialValues as FileObject[]).map((file) => (
          <div
            key={`file-${file.url}`}
            className='flex flex-col justify-center items-center p-2'
          >
            <p className='text-center text-sm'>{extractFileName(file.url)}</p>
            <a href={file.url} target='_blank' rel='noopener noreferrer'>
              <p className='text-center text-sm'>Download file</p>
            </a>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      key={`file-${initialValues}`}
      className='flex flex-col justify-center items-center p-2'
    >
      <p className='text-center text-sm'>
        {extractFileName((initialValues as FileObject).url)}
      </p>
      <a
        href={(initialValues as FileObject).url}
        target='_blank'
        rel='noopener noreferrer'
      >
        <p className='text-center text-sm'>Download file</p>
      </a>
    </div>
  );
};

export { FileInputComponent };
