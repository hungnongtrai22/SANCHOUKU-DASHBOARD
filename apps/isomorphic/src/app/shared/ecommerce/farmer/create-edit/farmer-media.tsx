import { useFormContext } from 'react-hook-form';
import UploadZone from '@core/ui/file-upload/upload-zone';
import FormGroup from '@/app/shared/form-group';
import cn from '@core/utils/class-names';

interface ProductMediaProps {
  className?: string;
}

export default function FarmerMedia({ className }: ProductMediaProps) {
  const { getValues, setValue } = useFormContext();

  return (
    <FormGroup
      title="Tải lên hình ảnh "
      description="Tải lên những hình ảnh liên quan"
      className={cn(className)}
    >
      {/* <UploadZone
        className="col-span-full"
        name="avatar"
        getValues={getValues}
        setValue={setValue}
        label="Hình ảnh nông dân"
      /> */}

       <UploadZone
        className="col-span-full"
        name="avatar"
        getValues={getValues}
        setValue={setValue}
        label="Hình ảnh nông dân"
      />

      <UploadZone
        className="col-span-full"
        name="gallery"
        getValues={getValues}
        setValue={setValue}
        label="Hình ảnh vùng trồng"
      />

       <UploadZone
        className="col-span-full"
        name="video"
        getValues={getValues}
        setValue={setValue}
        label="Video giới thiệu vùng trồng"
      />
    </FormGroup>
  );
}
