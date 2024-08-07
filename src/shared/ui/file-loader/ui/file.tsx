import Image from 'next/image';
import { PiFileBold } from 'react-icons/pi';
import { useRef, useState } from 'react';
import { m } from 'framer-motion';

import { Flex } from '../../(layout)/flex';
import { Text } from '../../(layout)/text';
import { useLightbox } from '../../lightbox/model/lightbox-store';

import { DeleteButton } from './delete-button';


interface Props {
  file: File;
  index: number;
  setFileList: (value: File[]) => void;
  fileList: File[];
}

export const FileCard = ({ file, index, setFileList, fileList }: Props) => {
  const imgSize = useRef<{ width: number; height: number } | null>(null);

  const [imgUrl] = useState(URL.createObjectURL(file));
  const { setGallery } = useLightbox();

  const handleDeleteFile = () => {
    const updatedFileList = [...fileList];

    updatedFileList.splice(index, 1);
    setFileList(updatedFileList);
  };

  const handleOpen = () => {
    if (imgSize.current) {
      setGallery(imgUrl, imgSize.current);
    }
  };

  return (
    <m.div layout className='relative gap-4 flex items-center flex-col'>
      <Flex center col className='justify-start text-start flex-shrink' gap={6}>
        <div className='flex items-center w-full aspect-square rounded-xl bg-default overflow-clip relative justify-center flex-shrink-0 shadow-base'>
          {file.type.split('/')[0] === 'image' ? (
            <Image
              fill
              unoptimized
              alt={file.name}
              className='snap-start flex-shrink-0 object-cover h-full z-10 cursor-pointer'
              src={imgUrl}
              onClick={handleOpen}
              onLoad={(e: any) =>
                (imgSize.current = { width: e.target.naturalWidth, height: e.target.naturalHeight })
              }
            />
          ) : (
            <PiFileBold className='opacity-50' size={30} />
          )}
          <DeleteButton handleDeleteFile={handleDeleteFile} />
        </div>

        <Text
          className='flex-shrink break-words line-clamp-2 -mt-3 text-center max-w-full px-1'
          opacity={0.5}
          size={14}
        >
          {file.name}
        </Text>
      </Flex>
    </m.div>
  );
};
