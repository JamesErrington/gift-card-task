import React, { useState, useRef, useEffect } from "react";
import type { FunctionComponent } from "react";
import { Image, Icon, Button, Container } from "semantic-ui-react";

interface Props {
  editing: boolean;
  src?: string;
  file: File | null;
  onFileUpload: (file: File) => void;
}

const placeholderImage = "https://react.semantic-ui.com/images/wireframe/white-image.png";

export const ImageUpload: FunctionComponent<Props> = ({ editing, src, file, onFileUpload }) => {
  const [imageSrc, setImageSrc] = useState(placeholderImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileUploadClick() {
    fileInputRef.current?.click();
  }

  function handleFileUploadChange(event: any) {
    onFileUpload(event.target.files[0]);
  }

  useEffect(() => {
    if (editing && file) {
      setImageSrc(URL.createObjectURL(file));
    } else if (src) {
      setImageSrc(src);
    } else if (file) {
      setImageSrc(URL.createObjectURL(file));
    } else {
      setImageSrc(placeholderImage);
    }
  }, [editing, src, file]);

  return (
    <Container textAlign="center">
      <div className="add-card-image-container">
        <Image className="add-card-image" src={imageSrc} bordered centered />
      </div>
      <Button animated primary onClick={handleFileUploadClick}>
        <Button.Content visible>Upload Image</Button.Content>
        <Button.Content hidden>
          <Icon name="upload" />
        </Button.Content>
      </Button>
      <input
        id="card-image-upload-input"
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileUploadChange}
      />
    </Container>
  );
};
