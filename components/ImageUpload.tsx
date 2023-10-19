import React, { useState } from 'react';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { Group, Text, rem, Image, SimpleGrid, Flex, Box } from '@mantine/core';
import { app } from '../config/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function ImageUpload(props) {
  const [secureUrl, setSecureUrl] = useState<string>(''); 

  const storage = getStorage(app);

  const handleDrop = async (acceptedFiles) => {

    setSecureUrl('');

    for (const file of acceptedFiles) {
      const storageRef = ref(storage, `blogs/${file.name}`);
      
      try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        setSecureUrl(downloadURL);
      } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error);
      }
    }

    // Passe a URL segura para o componente pai
    if (props.onSecureUrl) {
      props.onSecureUrl(secureUrl);
    }
  }

  const previews = secureUrl ? (
    <Image src={secureUrl} />
  ) : null;

  return (
    <Flex justify="flex-center" align="flex-center" direction="column">
      <Box maw='500' bg="gray.1">
        <Dropzone
          onDrop={handleDrop}
          onReject={(files) => console.log('rejected files', files)}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
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
      </Box>
    </Flex>
  );
}

export default ImageUpload;
