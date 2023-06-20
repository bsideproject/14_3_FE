import "assets/components/loading.css";
const Loading: React.FC = () => {
  const loading = require("../../assets/images/loading/loading.gif");
  return (
    <>
      <>
        <div className="loading-bg" id="alertModal">
          <div
            className="body2-bold"
            style={{ width: "170px", height: "52px", textAlign: "center" }}
          >
            <img src={loading} alt="로딩"></img>
            <div style={{ marginTop: "16px" }}>로딩중이에요.</div>
            <div>잠시만 기다려주세요!</div>
          </div>
        </div>
      </>
    </>
  );
};

export default Loading;
