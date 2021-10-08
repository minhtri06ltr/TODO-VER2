import React, {
  useState,
  useContext,
  useEffect,
} from "react";
import FileBase64 from "react-file-base64";
import Button from "react-bootstrap/Button";
import { UserContext } from "../contexts/UserContext";

function Profile() {
  const [imgData, setImgData] = useState({
    img: "",
  });
  const {
    imgState: { data },
  } = useContext(UserContext);

  const { updateImg, getImg } =
    useContext(UserContext);
  useEffect(() => {
    getImg();
  }, []);
  const onSubmit = async () => {
    await updateImg(imgData);
    setImgData({
      img: null,
    });
    getImg();
  };

  return (
    <>
      <div>
        <FileBase64
          multiple={false}
          accept="image/*"
          type="file"
          value={imgData.img}
          onDone={({ base64 }) =>
            setImgData({
              ...imgData,
              img: base64,
            })
          }
        />
      </div>
      <Button onClick={onSubmit} variant="info">
        Upload
      </Button>
      <img
        src={data}
        style={{
          height: "400px",
          weight: "400px",
        }}
      />
    </>
  );
}

export default Profile;
