import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ActionButtons from "./ActionButtons";

const SinglePost = ({
  post: { _id, status, title, description, url },
}) => {
  const getYoutubeIdVideo = (url) => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11
      ? match[7]
      : false;
  };
  let thumbnail = (
    <img
      style={{
        display: "block",
        margin: "15px auto",
        objectFit: "cover",
        height: "100%",
        width: "100%",
      }}
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM2Nv_-i5l7-FIYU4PIhijX6N2R_2U8R9L0g&usqp=CAU"
    />
  );
  if (getYoutubeIdVideo(url) !== false) {
    thumbnail = (
      <img
        style={{
          display: "block",
          margin: "15px auto",
          objectFit: "cover",
          height: "100%",
          width: "100%",
        }}
        src={`https://img.youtube.com/vi/${getYoutubeIdVideo(
          url,
        )}/hqdefault.jpg`}
      />
    );
  }
  return (
    <Card
      className="shadow"
      border={
        status === "Learned"
          ? "success"
          : status === "Learning"
          ? "warning"
          : "danger"
      }
    >
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">
                {title}
              </p>
              <Badge
                pill
                variant={
                  status === "Learned"
                    ? "success"
                    : status === "Learning"
                    ? "warning"
                    : "danger"
                }
              >
                {status}
              </Badge>
            </Col>
            <Col className="text-right">
              <ActionButtons
                url={url}
                _id={_id}
              />
            </Col>
          </Row>
        </Card.Title>
        {thumbnail}
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SinglePost;
