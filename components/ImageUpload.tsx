'use client'
import React, { useState } from 'react';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone } from '@mantine/dropzone';
import { Group, Text, rem, Image, Flex, Box, Progress } from '@mantine/core';
import { app } from '../config/firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

function ImageUpload(props) {
  const [secureUrl, setSecureUrl] = useState<string>(''); 
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const storage = getStorage(app);

  const handleDrop = async (acceptedFiles) => {

    setSecureUrl('');
    setUploadProgress(0);

    for (const file of acceptedFiles) {
      const storageRef = ref(storage, `blogs/${file.name}`);
      
      try {
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
          (snapshot) => {
            // Get task progress by calling snapshot.bytesTransferred / snapshot.totalBytes
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          }, 
          (error) => {
            console.error('Erro ao fazer upload da imagem:', error);
          }, 
          () => {
            // Upload completed successfully
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setSecureUrl(downloadURL);
              if (props.onSecureUrl) {
                props.onSecureUrl(downloadURL);
              }
            });
          }
        );
      } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error);
      }
    }
  }

  const previews = secureUrl ? (
    <Image src={secureUrl} />
  ) : null;

  return (
    <Flex justify="flex-center" align="flex-center" direction="column">
      <Box maw='500'>
        <Dropzone
          onDrop={handleDrop}
          onReject={(files) => console.log('rejected files', files)}
          maxSize={3 * 1024 ** 2}
          accept=".jpg,.png"
          {...props}
        >
          <Group justify="center" gap="md" mih={220} style={{ pointerEvents: 'none', marginTop: '1em' }}>
            <Dropzone.Accept>
              <IconUpload
                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto
                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                stroke={1.5}
              />
            </Dropzone.Idle>
            <div>
              <Text size="xl" class='text-center font-bold p-5' inline>
                Arraste imagens ou clique para fazer o upload
              </Text>
            </div>
          </Group>
        </Dropzone>
        {previews}
        <Progress value={uploadProgress} max={100} />
      </Box>
    </Flex>
  );
}

export default ImageUpload;
